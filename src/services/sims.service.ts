import { createApi } from '@reduxjs/toolkit/query/react';
import { setSims } from '../state/modules/sim/simReducer';
import { queryRootConfig } from './http.service';

export interface ISimType {
  id?: string;
  activated_at: string;
  agencyID: string;
  created_at: string;
  imei: string;
  phone: string;
  status: number;
}

export const simsApi = createApi({
  ...queryRootConfig,
  reducerPath: 'simsApi',
  tagTypes: ['Sim'],
  endpoints: (build) => ({
    getListSim: build.query<any, { agency_id?: string; params: any }>({
      query: (body) => ({ url: `agencies/${body.agency_id}/sims`, params: body.params }),
      providesTags() {
        return [{ type: 'Sim' }];
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const {
            data: { data, cursor, total },
          } = await queryFulfilled;
          dispatch(
            setSims({
              sims: data,
              cursor: {
                before: cursor.before || undefined,
                after: cursor.after || undefined,
              },
              total,
            })
          );
        } catch (error) {}
      },
    }),
    createSim: build.mutation<any, any>({
      query: ({ data, agencyId }) => {
        try {
          return {
            url: `agencies/${agencyId}/sims`,
            method: 'POST',
            body: data,
          };
        } catch (error: any) {
          throw new error.message();
        }
      },
      invalidatesTags: (result, error, data) => (error ? [] : [{ type: 'Sim' }]),
    }),
    updateSim: build.mutation<any, any>({
      query: ({ data, agencyId }) => {
        try {
          return {
            url: `agencies/${agencyId}/sims/${data.id}`,
            method: 'PUT',
            body: data,
          };
        } catch (error: any) {
          throw new error.message();
        }
      },
      invalidatesTags: (result, error, data) => (error ? [] : [{ type: 'Sim' }]),
    }),
    achieveSim: build.mutation<any, { parent_uuid?: string; sim_ids: (string | number)[] }>({
      query: (body) => {
        try {
          return {
            url: `agencies/${body.parent_uuid}/sims/achieve`,
            method: 'POST',
            body: { sim_ids: body.sim_ids },
          };
        } catch (error: any) {
          throw new error.message();
        }
      },
      invalidatesTags: (result, error, data) => (error ? [] : [{ type: 'Sim' }]),
    }),
    moveSim: build.mutation<any, { sim_ids?: (string | number)[]; agency_id: string; parent_uuid?: string }>({
      query: ({ agency_id, sim_ids, parent_uuid }) => {
        try {
          return {
            url: `agencies/${parent_uuid}/sims/move`,
            method: 'POST',
            body: { sim_ids, agency_id },
          };
        } catch (error: any) {
          throw new error.message();
        }
      },
      invalidatesTags: (result, error, data) => (error ? [] : [{ type: 'Sim' }]),
    }),
    deleteSim: build.mutation<null, { id: string; agencyId: string }>({
      query: (body) => {
        try {
          return {
            url: `agencies/${body.agencyId}/sims/${body.id}`,
            method: 'DELETE',
          };
        } catch (error: any) {
          throw new error.message();
        }
      },
      invalidatesTags: (result, error, data) => (error ? [] : [{ type: 'Sim' }]),
    }),
    importSim: build.mutation<null, any>({
      query: ({ file, parent_uuid }) => {
        const body = new FormData();
        body.append('Content-Type', file.type);
        body.append('file', file);
        try {
          return {
            url: `agencies/${parent_uuid}/sims/upload`,
            method: 'POST',
            body: body,
            formData: true,
          };
        } catch (error: any) {
          throw new error.message();
        }
      },
      invalidatesTags: (result, error, data) => (error ? [] : [{ type: 'Sim' }]),
    }),
  }),
});

export const {
  useAchieveSimMutation,
  useCreateSimMutation,
  useDeleteSimMutation,
  useGetListSimQuery,
  useImportSimMutation,
  useLazyGetListSimQuery,
  useMoveSimMutation,
  useUpdateSimMutation,
} = simsApi;
