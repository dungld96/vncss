import { createApi } from '@reduxjs/toolkit/query/react';
import { setAgencies } from '../state/modules/agency/agencyReducer';
import { ResponsiveInterface, queryRootConfig } from './http.service';

export interface IAgency {
  id: string;
  parent_id: string | null;
  name: string;
  address: string;
  level: string | number;
  user: {
    phone: string;
    username: string;
  };
}
export interface CurrentAgencyResponsiveInterface extends ResponsiveInterface {
  data: IAgency;
}
export interface AgenciesResponsiveInterface extends ResponsiveInterface {
  data: IAgency[];
}

export interface AgencyRequestInterface {
  agency: IAgency;
}

export const agenciesApi = createApi({
  ...queryRootConfig,
  reducerPath: 'agenciesApi',
  tagTypes: ['Agencies', 'AllAgencies'],
  endpoints: (build) => ({
    getArgency: build.query<CurrentAgencyResponsiveInterface, { id: string }>({
      query: (body) => ({ url: `agencies/${body.id}` }),
      providesTags(result) {
        if (result) {
          console.log(result);
          return [{ type: 'Agencies', id: result.data.id }];
        }
        return [{ type: 'Agencies', id: 'LIST' }];
      },
    }),
    getAllAgencies: build.query<AgenciesResponsiveInterface, { id: string }>({
      query: (body) => ({ url: `agencies/${body.id}/list` }),
      providesTags(result) {
        if (result) {
          return [{ type: 'AllAgencies' }];
        }
        return [{ type: 'AllAgencies' }];
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const {
            data: { data },
          } = await queryFulfilled;
          console.log(data);
          const dataParse = data.map((item) => ({
            ...item,
            phone: item.user.phone,
            username: item.user.username,
            parentId: item.parent_id || null,
          }));
          dispatch(setAgencies({ agencies: dataParse }));
        } catch (error) {}
      },
    }),
    addlAgency: build.mutation<CurrentAgencyResponsiveInterface, AgencyRequestInterface>({
      query: (body) => {
        try {
          return {
            url: 'agencies/1',
            method: 'POST',
            body: body.agency,
          };
        } catch (error: any) {
          throw new error.message();
        }
      },
      invalidatesTags: (result, error, data) => (error ? [] : [{ type: 'AllAgencies' }]),
    }),
    updateAgency: build.mutation<CurrentAgencyResponsiveInterface, AgencyRequestInterface>({
      query: (body) => {
        try {
          return {
            url: `agencies/${body.agency.id}`,
            method: 'PUT',
            body: body.agency,
          };
        } catch (error: any) {
          throw new error.message();
        }
      },
      invalidatesTags: (result, error, data) => (error ? [] : [{ type: 'Agencies', id: data.agency.id }]),
    }),
    deleteAgency: build.mutation<null, any>({
      query: (body) => {
        try {
          return {
            url: `agencies/${body.id}`,
            method: 'DELETE',
          };
        } catch (error: any) {
          throw new error.message();
        }
      },
      invalidatesTags: (result, error, data) => (error ? [] : [{ type: 'AllAgencies' }]),
    }),
  }),
});

export const { useGetArgencyQuery, useUpdateAgencyMutation, useGetAllAgenciesQuery, useLazyGetAllAgenciesQuery } =
  agenciesApi;
