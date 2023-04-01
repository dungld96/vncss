import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../state/store';

export const BASE_URL = 'https://api.vncss.net';
export interface ResponsiveInterface {
  message: string;
  status: string;
}

export const queryRootConfig = {
  keepUnusedDataFor: 10,
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders(headers) {
      const token = localStorage.getItem('access_token');
      headers.set('Content-Type', 'application/json');
      if (token) {
        headers.set('authorization', `Bearer ${JSON.parse(token)}`);
      }
      return headers;
    },
  }),
};
