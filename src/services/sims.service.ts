import { createApi } from '@reduxjs/toolkit/query/react';
import { setSims } from '../state/modules/sim/simReducer';
import { queryRootConfig } from './http.service';

export interface ISimType {
  id: string;
  code: string;
  name: string;
  schema?: string;
  can_stop_alert: boolean;
  permission?: string;
  created_at: string;
  updated_at: string;
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
            data: { data, cursors },
          } = await queryFulfilled;
          dispatch(
            setSims({
              sims: data,
              cursors: {
                before: cursors.before || undefined,
                after: cursors.after || undefined,
              },
            })
          );
        } catch (error) {}
      },
    }),
    createSim: build.mutation<any, any>({
      query: ({ sim, parent_uuid }) => {
        try {
          return {
            url: `agencies/${parent_uuid}/sims`,
            method: 'POST',
            body: sim,
          };
        } catch (error: any) {
          throw new error.message();
        }
      },
      invalidatesTags: (result, error, data) => (error ? [] : [{ type: 'Sim' }]),
    }),
    updateSim: build.mutation<any, any>({
      query: ({ sim, parent_uuid }) => {
        try {
          return {
            url: `agencies/${parent_uuid}/sims/${sim.id}`,
            method: 'PUT',
            body: sim,
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
    deleteSim: build.mutation<null, { ids: (string | number)[]; parent_uuid?: string }>({
      query: (body) => {
        try {
          return {
            url: `agencies/${body.parent_uuid}/sims`,
            method: 'DELETE',
            body: { ids: body.ids },
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
