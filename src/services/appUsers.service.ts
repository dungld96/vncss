import { createApi } from '@reduxjs/toolkit/query/react';
import { ResponsiveInterface, queryRootConfig } from './http.service';
import { setAppUsers } from '../state/modules/app-user/appUserReducer';
import { CursorType } from '../configs/constant';


export interface AppUsersResponsiveInterface extends ResponsiveInterface {
  data: {
    id: string;
    phone: string;
    username: string;
    dob: string;
    gender: string;
    email: string;
  }[];
  cursor: CursorType;
  total: number;
}

export const appUsersApi = createApi({
  ...queryRootConfig,
  reducerPath: 'appUsersApi',
  tagTypes: ['AppUsers', 'AllAppUsers'],
  endpoints: (build) => ({
    
    getAllAppUsers: build.query<AppUsersResponsiveInterface, { params: any }>({
      query: ({ params }) => ({ url: `app-users`, params }),
      providesTags(result) {
        if (result) {
          return [{ type: 'AllAppUsers' }];
        }
        return [{ type: 'AllAppUsers' }];
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const {
            data: { data, cursor, total },
          } = await queryFulfilled;

          dispatch(
            setAppUsers({
              appUsers: data,
              cursor: cursor,
              total: total,
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});


export const {
  useGetAllAppUsersQuery,
  useLazyGetAllAppUsersQuery,
} = appUsersApi;
