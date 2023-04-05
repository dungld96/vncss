import { createApi } from '@reduxjs/toolkit/query/react';
import { ResponsiveInterface, queryRootConfig } from './http.service';
import { setCurrentUser } from '../state/modules/auth/reducer';
import type { IUser } from './auth.service';
import { IAgency } from 'screens/Agencies/mockData';

export interface CurrentUserResponsiveInterface extends ResponsiveInterface {
  data: {
    agency: IAgency;
  };
}

export interface CurrentUserRequestInterface {
  agency: IAgency;
}

export const usersApi = createApi({
  ...queryRootConfig,
  reducerPath: 'usersApi',
  tagTypes: ['Agencies'],
  endpoints: (build) => ({
    getCurrentArgency: build.query<CurrentUserResponsiveInterface, null>({
      query: () => ({ url: 'users/current-agency' }),
      providesTags(result) {
        if (result) {
          return [{ type: 'Agencies', id: result.data.agency.id }];
        }
        return [{ type: 'Agencies', id: 'LIST' }];
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const {
            data: {
              data: { agency },
            },
          } = await queryFulfilled;
          //   return agency
        } catch (error) {}
      },
    }),
    // updateCurrentUser: build.mutation<CurrentUserResponsiveInterface, CurrentUserRequestInterface>({
    //   query: (body) => {
    //     try {
    //       return {
    //         url: `users/${body.agency.id}`,
    //         method: 'PUT',
    //         body,
    //       };
    //     } catch (error: any) {
    //       throw new error.message();
    //     }
    //   },
    //   invalidatesTags: (result, error, data) => (error ? [] : [{ type: 'Agencies', id: data.agency.id }]),
    // }),
  }),
});

export const {} = usersApi;
