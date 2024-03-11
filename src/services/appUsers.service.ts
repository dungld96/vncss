import { createApi } from '@reduxjs/toolkit/query/react';
import { ResponsiveInterface, queryRootConfig } from './http.service';
import { setCurrentUser } from '../state/modules/auth/authReducer';
import type { IUser } from './auth.service';
import { setUsers } from '../state/modules/user/userReducer';
import { CursorType } from '../configs/constant';


export interface UsersResponsiveInterface extends ResponsiveInterface {
  data: IUser[];
  cursors: CursorType;
}

export const appUsersApi = createApi({
  ...queryRootConfig,
  reducerPath: 'appUsersApi',
  tagTypes: ['AppUsers', 'AllAppUsers'],
  endpoints: (build) => ({
    
    getAllUsers: build.query<UsersResponsiveInterface, { agencyId?: string; params: any }>({
      query: ({ agencyId, params }) => ({ url: `agencies/${agencyId}/users`, params }),
      providesTags(result) {
        if (result) {
          return [{ type: 'AllAppUsers' }];
        }
        return [{ type: 'AllAppUsers' }];
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
  useGetAllUsersQuery,
  useLazyGetAllUsersQuery,
} = appUsersApi;
