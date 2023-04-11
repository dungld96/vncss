import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { Mutex } from 'async-mutex';
import { logout } from '../state/modules/auth/reducer';

export const BASE_URL = 'https://api.vncss.net';
export interface ResponsiveInterface {
  message: string;
  status: string;
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
  if ((result.data as any).status === 'error' && (result.data as any).code === 'SS103') {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();

      try {
        // const refreshResult = await baseQuery({ credentials: 'include', url: 'auth/refresh' }, api, extraOptions);
        // if (refreshResult.data) {
        //   // Retry the initial query
        //   result = await baseQuery(args, api, extraOptions);
        // } else {
        //   api.dispatch(logout());
        //   window.location.href = '/login';
        // }
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
