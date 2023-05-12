import { createApi } from '@reduxjs/toolkit/query/react';
import { setCursors, setGateways } from 'state/modules/gateway/gatewayReducer';
import { queryRootConfig } from './http.service';
export const gatewaysApi = createApi({
  ...queryRootConfig,
  reducerPath: 'gatewaysApi',
  tagTypes: ['Gateway'],
  endpoints: (build) => ({
    getListGateway: build.query<any, any>({
      query: (body) => ({ url: `agencies/${body.id}/gateways`, params: body.params }),
      providesTags(result) {
        return [{ type: 'Gateway' }];
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const {
            data: { data, cursor },
          } = await queryFulfilled;
          dispatch(setGateways({ gateways: data }));
          dispatch(
            setCursors({
              cursors: {
                before: cursor.before || undefined,
                after: cursor.after || undefined,
              },
            })
          );
        } catch (error) {}
      },
    }),
    createGateway: build.mutation<any, any>({
      query: (body) => {
        try {
          return {
            url: 'agencies/2/gateways',
            method: 'POST',
            body: body,
          };
        } catch (error: any) {
          throw new error.message();
        }
      },
      invalidatesTags: (result, error, data) => (error ? [] : [{ type: 'Gateway' }]),
    }),
    updateGateway: build.mutation<any, any>({
      query: (body) => {
        try {
          return {
            url: `agencies/2/gateways/${body.id}`,
            method: 'PUT',
            body: body,
          };
        } catch (error: any) {
          throw new error.message();
        }
      },
      invalidatesTags: (result, error, data) => (error ? [] : [{ type: 'Gateway' }]),
    }),
    achieveGateway: build.mutation<any, any>({
      query: (body) => {
        try {
          return {
            url: `agencies/2/gateways/achieve`,
            method: 'POST',
            body: body,
          };
        } catch (error: any) {
          throw new error.message();
        }
      },
      invalidatesTags: (result, error, data) => (error ? [] : [{ type: 'Gateway' }]),
    }),
    moveGateway: build.mutation<any, any>({
      query: (body) => {
        try {
          return {
            url: `agencies/2/gateways/move`,
            method: 'POST',
            body: body,
          };
        } catch (error: any) {
          throw new error.message();
        }
      },
      invalidatesTags: (result, error, data) => (error ? [] : [{ type: 'Gateway' }]),
    }),
    importGateway: build.mutation<any, any>({
      query: (body) => {
        try {
          return {
            url: `agencies/2/gateways/upload`,
            method: 'POST',
            body: body,
            formData: true,
          };
        } catch (error: any) {
          throw new error.message();
        }
      },
      invalidatesTags: (result, error, data) => (error ? [] : [{ type: 'Gateway' }]),
    }),
  }),
});

export const {
  useAchieveGatewayMutation,
  useCreateGatewayMutation,
  useGetListGatewayQuery,
  useImportGatewayMutation,
  useLazyGetListGatewayQuery,
  useMoveGatewayMutation,
  useUpdateGatewayMutation,
} = gatewaysApi;
