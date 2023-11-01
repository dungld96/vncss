import { createApi } from '@reduxjs/toolkit/query/react';
import { ResponsiveInterface } from './http.service';
import { queryRootConfig } from './http.service';
import { usersApi } from './users.service';

export interface IUser {
  id: string;
  type: string;
  sub_id: string;
  role: string;
  username: string;
  phone: string;
  email: string;
  first_name: string;
  last_name: string;
  status: string;
  avatar: string;
}

interface AuthRequestInterface {
  username: string;
  password: string;
}

export interface AuthResponsiveInterface extends ResponsiveInterface {
  data: {
    access_token: string;
    refresh_token: string;
  };
}

export const authApi = createApi({
  ...queryRootConfig,
  reducerPath: 'authApi',
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
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const {
            data: {
              data: { access_token, refresh_token },
            },
          } = await queryFulfilled;
          localStorage.setItem('access_token', JSON.stringify(access_token));
          localStorage.setItem('refresh_token', JSON.stringify(refresh_token));
          await dispatch(usersApi.endpoints.getCurrentUser.initiate(null));
          window.location.reload();
        } catch (error) {}
      },
    }),
  }),
});

export const { useLoginMutation } = authApi;
