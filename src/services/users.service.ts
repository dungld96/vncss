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
  user: IUser;
}
export interface PasswordRequestInterface {
  current_password: string;
  new_password: string;
}

export interface UsersResponsiveInterface extends ResponsiveInterface {
  data: {
    user: IUser[];
  };
}

export const usersApi = createApi({
  ...queryRootConfig,
  reducerPath: 'usersApi',
  tagTypes: ['Users', 'AllUsers'],
  endpoints: (build) => ({
    getCurrentUser: build.query<CurrentUserResponsiveInterface, null>({
      query: () => ({ url: 'users/current-user' }),
      providesTags(result) {
        if (result) {
          return [{ type: 'Users', id: result.data?.user.id }];
        }
        return [{ type: 'Users', id: 'LIST' }];
      },
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
            url: `users/${body.user.id}`,
            method: 'PUT',
            body,
          };
        } catch (error: any) {
          throw new error.message();
        }
      },
      invalidatesTags: (result, error, data) => (error ? [] : [{ type: 'Users', id: data.user.id }]),
    }),
    changePassword: build.mutation<any, PasswordRequestInterface>({
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
    }),
    getAllUsers: build.query<UsersResponsiveInterface, null>({
      query: () => ({ url: 'users' }),
      providesTags(result) {
        if (result) {
          return [{ type: 'AllUsers' }];
        }
        return [{ type: 'AllUsers' }];
      },
    }),
    addlUser: build.mutation<any, any>({
      query: (body) => {
        try {
          return {
            url: 'users',
            method: 'POST',
            body,
          };
        } catch (error: any) {
          throw new error.message();
        }
      },
      invalidatesTags: (result, error, data) => (error ? [] : [{ type: 'AllUsers' }]),
    }),
    changeDetailUser: build.mutation<any, any>({
      query: (body) => {
        try {
          return {
            url: `users/${body.user.id}`,
            method: 'PUT',
            body,
          };
        } catch (error: any) {
          throw new error.message();
        }
      },
      invalidatesTags: (result, error, data) => (error ? [] : [{ type: 'AllUsers' }]),
    }),
    deletelUser: build.mutation<null, any>({
      query: (body) => {
        try {
          return {
            url: `users/${body.id}`,
            method: 'DELETE',
          };
        } catch (error: any) {
          throw new error.message();
        }
      },
      invalidatesTags: (result, error, data) => (error ? [] : [{ type: 'AllUsers' }]),
    }),
  }),
});

export const {
  useGetCurrentUserQuery,
  useUpdateCurrentUserMutation,
  useChangePasswordMutation,
  useGetAllUsersQuery,
  useChangeDetailUserMutation,
  useAddlUserMutation,
  useDeletelUserMutation
} = usersApi;
