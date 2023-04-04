import { createApi } from '@reduxjs/toolkit/query/react';
import { ResponsiveInterface } from './http.service';
import { queryRootConfig } from './http.service';
import { usersApi } from './users.service';
export interface IUser {
  id: string | number;
  name: string;
  email: string;
  phone: string;
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
    user: IUser;
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
            url: 'login',
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
              data: { user, access_token },
            },
          } = await queryFulfilled;
          localStorage.setItem('access_token', JSON.stringify(access_token));
          localStorage.setItem('current_user', JSON.stringify(user));
          await dispatch(usersApi.endpoints.getCurrentUser.initiate(null));
        } catch (error) {}
      },
    }),
  }),
});

export const { useLoginMutation } = authApi;
