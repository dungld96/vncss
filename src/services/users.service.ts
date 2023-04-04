import { createApi } from '@reduxjs/toolkit/query/react';
import { ResponsiveInterface, queryRootConfig } from './http.service';
import { setCurrentUser } from '../state/modules/auth/reducer';
import type { IUser } from './auth.service';

export interface CurrentUserResponsiveInterface extends ResponsiveInterface {
  data: {
    user: IUser;
  };
}

export interface CurrentUserRequestInterface {
  id: string | number;
  name: string;
  email: string;
  phone: string;
}
export interface PasswordRequestInterface {
  current_password:string
  new_password:string
}

export const usersApi = createApi({
  ...queryRootConfig,
  reducerPath: 'usersApi',
  endpoints: (build) => ({
    getCurrentUser: build.query<CurrentUserResponsiveInterface, null>({
      query: () => ({ url: 'users/current-user' }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const {
            data: {
              data: { user },
            },
          } = await queryFulfilled;
          localStorage.setItem('current_user', JSON.stringify(user));
          dispatch(setCurrentUser({ currentUser: user }));
        } catch (error) {}
      },
    }),
    updateCurrentUser: build.mutation<CurrentUserResponsiveInterface, CurrentUserRequestInterface>({
      query: (body) => {
        try {
          return {
            url: `users/${body.id}`,
            method: 'PUT',
            body,
          };
        } catch (error: any) {
          throw new error.message();
        }
      },
      async onQueryStarted(args, { dispatch }) {
        try {
          // await dispatch(usersApi.endpoints.getCurrentUser.initiate(null));
        } catch (error) {}
      },
    }),
    changePassword: build.mutation<any,PasswordRequestInterface>({
      query: (body) => {
        try {
          return {
            url: 'users/change-password',
            method: 'POST',
            body,
          };
        } catch (error: any) {
          throw new error.message();
        }
      },
      async onQueryStarted(args, { dispatch }) {
        try {
          await dispatch(usersApi.endpoints.getCurrentUser.initiate(null));
        } catch (error) {}
      },
    })
  }),
});

export const { useGetCurrentUserQuery, useUpdateCurrentUserMutation,useChangePasswordMutation } = usersApi;
