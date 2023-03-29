import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../state/store'

export const BASE_URL = 'https://api.vncss.net';
export interface ResponsiveInterface {
  message: string;
  status: string;
}

export const queryRootConfig = {
  keepUnusedDataFor: 10,
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders(headers, { getState }) {
      const token = (getState() as RootState).auth.accessToken;
      headers.set('authorization', `Bearer ${token}`);
      return headers;
    },
  }),
};
