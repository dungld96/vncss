import { createApi } from '@reduxjs/toolkit/query/react';
import { ResponsiveInterface, queryRootConfig } from './http.service';
import { setCurrentUser } from '../state/modules/auth/reducer';
import type { IUser } from './auth.service';

export interface CurrentUserResponsiveInterface extends ResponsiveInterface {
  data: {
    user: IUser;
  };
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
  }),
});

export const { useGetCurrentUserQuery } = usersApi;
