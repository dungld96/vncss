import { createApi } from '@reduxjs/toolkit/query/react';
import { ResponsiveInterface, queryRootConfig } from './http.service';
import { setCurrentUser } from '../state/modules/auth/authReducer';
import type { IUser } from './auth.service';
import { IAgency } from 'screens/Agencies/mockData';

export interface CurrentAgencyResponsiveInterface extends ResponsiveInterface {
  data: {
    agency: IAgency;
  };
}

export interface CurrentUserRequestInterface {
  agency: IAgency;
}

export const agenciesApi = createApi({
  ...queryRootConfig,
  reducerPath: 'agenciesApi',
  tagTypes: ['Agencies'],
  endpoints: (build) => ({
    getCurrentArgency: build.query<CurrentAgencyResponsiveInterface, { id: string }>({
      query: (body) => ({ url: `agencies/${body.id}` }),
      providesTags(result) {
        if (result) {
          return [{ type: 'Agencies', id: result.data.agency.id }];
        }
        return [{ type: 'Agencies', id: 'LIST' }];
      },
    }),
    updateAgency: build.mutation<CurrentAgencyResponsiveInterface, CurrentUserRequestInterface>({
      query: (body) => {
        try {
          return {
            url: `agencies/${body.agency.id}`,
            method: 'PUT',
            body,
          };
        } catch (error: any) {
          throw new error.message();
        }
      },
      invalidatesTags: (result, error, data) => (error ? [] : [{ type: 'Agencies', id: data.agency.id }]),
    }),
  }),
});

export const { useGetCurrentArgencyQuery, useUpdateAgencyMutation } = agenciesApi;
