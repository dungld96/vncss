import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL, ResponsiveInterface } from './http.service';

export interface User {
    name: string
    status: string
  }

interface AuthRequestInterface {
  username: string;
  password: string;
}

interface AuthResponsiveInterface extends ResponsiveInterface {
  data: {
    access_token: string;
    expires_in: number;
    refresh_token: string;
  };
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders(headers) {
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  endpoints: (build) => ({
    login: build.mutation<AuthResponsiveInterface, AuthRequestInterface>({
      query(body) {
        try {
          return {
            url: 'auth/login',
            method: 'POST',
            body,
          };
        } catch (error: any) {
          throw new error.message();
        }
      },
    }),
  }),
});

export const { useLoginMutation } = authApi;
