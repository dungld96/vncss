import { createApi } from '@reduxjs/toolkit/query/react';
import { ResponsiveInterface, queryRootConfig } from './http.service';
import { setCurrentUser } from '../state/modules/auth/authReducer';
import type { IUser } from './auth.service';
import { setUsers } from '../state/modules/user/userReducer';
import { CursorType } from '../configs/constant';

export interface CurrentUserResponsiveInterface extends ResponsiveInterface {
  data: IUser;
}

export interface CurrentUserRequestInterface {
  uuid: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}
export interface PasswordRequestInterface {
  current_password: string;
  new_password: string;
}

export interface UsersResponsiveInterface extends ResponsiveInterface {
  data: IUser[];
  cursors: CursorType;
}

export const usersApi = createApi({
  ...queryRootConfig,
  reducerPath: 'usersApi',
  tagTypes: ['Users', 'AllUsers'],
  endpoints: (build) => ({
    getCurrentUser: build.query<CurrentUserResponsiveInterface, null>({
      query: () => ({ url: 'users/whoami' }),
      providesTags(result) {
        if (result) {
          return [{ type: 'Users', id: result.data?.id }];
        }
        return [{ type: 'Users', id: 'LIST' }];
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const {
            data: { data },
          } = await queryFulfilled;
          const currentUser = {
            ...data,
            firstName: data.first_name,
            lastName: data.last_name,
          };

          localStorage.setItem('current_user', JSON.stringify(currentUser));
          dispatch(setCurrentUser({ currentUser: currentUser }));
        } catch (error) {}
      },
    }),
    updateCurrentUser: build.mutation<CurrentUserResponsiveInterface, CurrentUserRequestInterface>({
      query: (body) => {
        try {
          return {
            url: 'users',
            method: 'PUT',
            body: { ...body, first_name: body.firstName, last_name: body.lastName },
          };
        } catch (error: any) {
          throw new error.message();
        }
      },
      invalidatesTags: (result, error, data) => (error ? [] : [{ type: 'Users', id: data.uuid }]),
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
    getAllUsers: build.query<UsersResponsiveInterface, { agencyId?: string; params: any }>({
      query: ({ agencyId, params }) => ({ url: `agencies/${agencyId}/users`, params }),
      providesTags(result) {
        if (result) {
          return [{ type: 'AllUsers' }];
        }
        return [{ type: 'AllUsers' }];
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const {
            data: { data, cursors },
          } = await queryFulfilled;

          const dataParse = data.map((item) => ({
            ...item,
            name: `${item.first_name} ${item.last_name}`,
            roleName: parseRoleName(item.role),
          }));
          dispatch(
            setUsers({
              users: dataParse,
              cursor: cursors,
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
    addlUser: build.mutation<any, any>({
      query: (body) => {
        try {
          return {
            url: 'users',
            method: 'POST',
            body: body.user,
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
            url: 'users',
            method: 'PUT',
            body: body.user,
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

export const parseRoleName = (role: string) => {
  switch (role) {
    case 'manager':
      return 'Quản trị viên';
    case 'technician':
      return 'Nhân viên kỹ thuật';

    default:
      return 'Nhân Viên';
  }
};

export const {
  useGetCurrentUserQuery,
  useUpdateCurrentUserMutation,
  useChangePasswordMutation,
  useGetAllUsersQuery,
  useLazyGetAllUsersQuery,
  useChangeDetailUserMutation,
  useAddlUserMutation,
  useDeletelUserMutation,
} = usersApi;
