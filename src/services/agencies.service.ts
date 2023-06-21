import { createApi } from '@reduxjs/toolkit/query/react';
import { setAgencies } from '../state/modules/agency/agencyReducer';
import { queryRootConfig, ResponsiveInterface } from './http.service';

export interface IAgency {
  id?: string;
  parent_id?: string | null;
  name: string;
  address: string;
  level?: string | number;
  username?: string;
  password?: string;
  phone?: string;
  user?: {
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
  parent_uuid?: string;
  agency: IAgency;
}

export const agenciesApi = createApi({
  ...queryRootConfig,
  reducerPath: 'agenciesApi',
  tagTypes: ['Agencies', 'AllAgencies'],
  endpoints: (build) => ({
    getAgency: build.query<CurrentAgencyResponsiveInterface, { id: string }>({
      query: (body) => ({ url: `agencies/${body.id}` }),
      providesTags(result) {
        if (result) {
          return [{ type: 'Agencies', id: result.data.id }];
        }
        return [{ type: 'Agencies', id: 'LIST' }];
      },
    }),
    getAllAgencies: build.query<AgenciesResponsiveInterface, { id: string; params?: any }>({
      query: (body) => ({ url: `agencies/${body.id}/list`, params: body.params }),
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
          const dataParse = data.map((item) => ({
            ...item,
            phone: item.user?.phone,
            username: item.user?.username,
            parentId: item.parent_id || null,
          }));
          dispatch(
            setAgencies({
              agencies: dataParse,
            })
          );
        } catch (error) {}
      },
    }),
    addlAgency: build.mutation<CurrentAgencyResponsiveInterface, AgencyRequestInterface>({
      query: ({ parent_uuid, agency }) => {
        try {
          return {
            url: `agencies/${parent_uuid}`,
            method: 'POST',
            body: agency,
          };
        } catch (error: any) {
          throw new error.message();
        }
      },
      invalidatesTags: (result, error, data) => (error ? [] : [{ type: 'AllAgencies' }]),
    }),
    updateCurrentAgency: build.mutation<CurrentAgencyResponsiveInterface, AgencyRequestInterface>({
      query: ({ agency }) => {
        try {
          return {
            url: `agencies/${agency.id}`,
            method: 'PUT',
            body: agency,
          };
        } catch (error: any) {
          throw new error.message();
        }
      },
      invalidatesTags: (result, error, data) => {
        return error ? [] : [{ type: 'Agencies', id: data.agency.id }];
      },
    }),
    updateAgency: build.mutation<CurrentAgencyResponsiveInterface, AgencyRequestInterface>({
      query: ({ agency }) => {
        try {
          return {
            url: `agencies/${agency.id}`,
            method: 'PUT',
            body: agency,
          };
        } catch (error: any) {
          throw new error.message();
        }
      },
      invalidatesTags: (result, error, data) => {
        return error ? [] : [{ type: 'AllAgencies' }];
      },
    }),
    deleteAgency: build.mutation<null, { id: string }>({
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

export const {
  useGetAgencyQuery,
  useUpdateAgencyMutation,
  useGetAllAgenciesQuery,
  useLazyGetAllAgenciesQuery,
  useAddlAgencyMutation,
  useDeleteAgencyMutation,
  useUpdateCurrentAgencyMutation,
  useLazyGetAgencyQuery,
} = agenciesApi;
