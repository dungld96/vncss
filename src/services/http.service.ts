import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { Mutex } from 'async-mutex';
import { AuthResponsiveInterface } from './auth.service';

export const BASE_URL = 'https://stg-api.sesaco.vn/v1';
export interface ResponsiveInterface {
  error: string;
  success: string;
}

// Create a new mutex
const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders(headers) {
    const token = localStorage.getItem('access_token');
    headers.set('Content-Type', 'application/json');
    if (token) {
      headers.set('authorization', `Bearer ${JSON.parse(token)}`);
    }
    return headers;
  },
});

const customFetchBase: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const refreshToken = localStorage.getItem('refresh_token') || '';
        const refreshResult = (await fetchBaseQuery({
          baseUrl: BASE_URL,
          headers: {
            'content-type': 'application/json',
          },
        })(
          {
            url: 'auth/refresh',
            method: 'POST',
            body: JSON.stringify({ refresh_token: JSON.parse(refreshToken) }),
          },
          api,
          extraOptions
        )) as { data: AuthResponsiveInterface };

        if (refreshResult.data) {
          const data = refreshResult.data.data;
          localStorage.setItem('access_token', JSON.stringify(data.access_token));
          localStorage.setItem('refresh_token', JSON.stringify(data.refresh_token));
          result = await baseQuery(args, api, extraOptions);
        } else {
          // api.dispatch(logout());
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          localStorage.removeItem('current_user');
          window.location.href = '/login';
        }
      } finally {
        // release must be called once the mutex should be released again.
        release();
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};

export const queryRootConfig = {
  keepUnusedDataFor: 10,
  baseQuery: customFetchBase,
};
