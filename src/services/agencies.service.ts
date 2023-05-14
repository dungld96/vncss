import { createApi } from '@reduxjs/toolkit/query/react';
import { CursorsType } from 'configs/constant';
import { setAgencies } from '../state/modules/agency/agencyReducer';
import { queryRootConfig, ResponsiveInterface } from './http.service';

export interface IAgency {
  id: string;
  parent_id?: string | null;
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
  cursors: CursorsType;
}

export interface AgencyRequestInterface {
  id?: string;
  name: string;
  username?: string;
  password?: string;
  phone: string;
  parent_uuid?: string;
  address: string;
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
            data: { data, cursors },
          } = await queryFulfilled;
          const dataParse = data.map((item) => ({
            ...item,
            phone: item.user.phone,
            username: item.user.username,
            parentId: item.parent_id || null,
          }));
          dispatch(
            setAgencies({
              agencies: dataParse,
              cursors: {
                before: cursors.before || undefined,
                after: cursors.after || undefined,
              },
            })
          );
        } catch (error) {}
      },
    }),
    addlAgency: build.mutation<CurrentAgencyResponsiveInterface, AgencyRequestInterface>({
      query: (body) => {
        try {
          return {
            url: 'agencies/1',
            method: 'POST',
            body: body,
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
            url: `agencies/${body.id}`,
            method: 'PUT',
            body: body,
          };
        } catch (error: any) {
          throw new error.message();
        }
      },
      invalidatesTags: (result, error, data) => (error ? [] : [{ type: 'Agencies', id: data.id }]),
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
  useGetArgencyQuery,
  useUpdateAgencyMutation,
  useGetAllAgenciesQuery,
  useLazyGetAllAgenciesQuery,
  useAddlAgencyMutation,
  useDeleteAgencyMutation,
} = agenciesApi;
