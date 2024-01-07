import { createApi } from '@reduxjs/toolkit/query/react';
import { CursorType } from '../configs/constant';
import { setGateways } from '../state/modules/gateway/gatewayReducer';
import { queryRootConfig, ResponsiveInterface } from './http.service';

export interface IGateway {
  id?: string;
  agency_id?: string;
  location_id?: string;
  gateway_type_id: string;
  name?: string;
  sim?: string;
  serial: string;
  hardware_version: string;
  firmware_version?: string;
  mfg: Date | string;
  alert?: number;
  blocking?: boolean;
  testing?: boolean;
  state?: null;
  status?: string;
  secure_code?: string;
  enable_callcenter?: boolean;
  description?: string;
}

export interface IGatewayType {
  id: string;
  code: string;
  name: string;
  project: string;
  schema?: string;
  can_stop_alert: boolean;
  permission?: string;
  created_at: string;
}

export interface DeltailGatewayResponsiveInterface extends ResponsiveInterface {
  data: IGateway;
}

export interface GatewaysResponsiveInterface extends ResponsiveInterface {
  data: IGateway[];
  cursor: CursorType;
  total: number;
}
export interface GatewayTypesResponsiveInterface extends ResponsiveInterface {
  data: IGatewayType[];
  cursor: CursorType;
}

export interface GatewayRequestInterface {
  parent_uuid?: string;
  gateway: {
    id?: string;
    gateway_type_id: string;
    serial: string;
    version: string;
    mfg: number;
  };
}

export const gatewaysApi = createApi({
  ...queryRootConfig,
  reducerPath: 'gatewaysApi',
  tagTypes: ['Gateway', 'GatewayType'],
  endpoints: (build) => ({
    getListGateway: build.query<GatewaysResponsiveInterface, { agency_id?: string; params: any }>({
      query: (body) => ({ url: `agencies/${body.agency_id}/gateways`, params: body.params }),
      providesTags(result) {
        return [{ type: 'Gateway' }];
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const {
            data: { data, cursor, total },
          } = await queryFulfilled;
          dispatch(
            setGateways({
              gateways: data,
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
    createGateway: build.mutation<DeltailGatewayResponsiveInterface, GatewayRequestInterface>({
      query: ({ gateway, parent_uuid }) => {
        try {
          return {
            url: `agencies/${parent_uuid}/gateways`,
            method: 'POST',
            body: gateway,
          };
        } catch (error: any) {
          throw new error.message();
        }
      },
      invalidatesTags: (result, error, data) => (error ? [] : [{ type: 'Gateway' }]),
    }),
    updateGateway: build.mutation<DeltailGatewayResponsiveInterface, GatewayRequestInterface>({
      query: ({ gateway, parent_uuid }) => {
        try {
          return {
            url: `agencies/${parent_uuid}/gateways/${gateway.id}`,
            method: 'PUT',
            body: gateway,
          };
        } catch (error: any) {
          throw new error.message();
        }
      },
      invalidatesTags: (result, error, data) => (error ? [] : [{ type: 'Gateway' }]),
    }),
    extendGateway: build.mutation<DeltailGatewayResponsiveInterface, { data: any; agencyId: string }>({
      query: ({ data, agencyId }) => {
        try {
          return {
            url: `agencies/${agencyId}/gateways/subscription/extend`,
            method: 'PUT',
            body: data,
          };
        } catch (error: any) {
          throw new error.message();
        }
      },
      invalidatesTags: (result, error, data) => (error ? [] : [{ type: 'Gateway' }]),
    }),
    achieveGateway: build.mutation<any, { parent_uuid?: string; gateway_ids: (string | number)[] }>({
      query: (body) => {
        try {
          return {
            url: `agencies/${body.parent_uuid}/gateways/achieve`,
            method: 'POST',
            body: { gateway_ids: body.gateway_ids },
          };
        } catch (error: any) {
          throw new error.message();
        }
      },
      invalidatesTags: (result, error, data) => (error ? [] : [{ type: 'Gateway' }]),
    }),
    moveGateway: build.mutation<any, { gateway_ids?: (string | number)[]; agency_id: string; parent_uuid?: string }>({
      query: ({ agency_id, gateway_ids, parent_uuid }) => {
        try {
          return {
            url: `agencies/${parent_uuid}/gateways/move`,
            method: 'POST',
            body: { gateway_ids, agency_id },
          };
        } catch (error: any) {
          throw new error.message();
        }
      },
      invalidatesTags: (result, error, data) => (error ? [] : [{ type: 'Gateway' }]),
    }),
    deleteGateway: build.mutation<null, { ids: (number | string)[]; parent_uuid?: string }>({
      query: (body) => {
        try {
          return {
            url: `agencies/${body.parent_uuid}/gateways`,
            method: 'DELETE',
            body: { ids: body.ids },
          };
        } catch (error: any) {
          throw new error.message();
        }
      },
      invalidatesTags: (result, error, data) => (error ? [] : [{ type: 'Gateway' }]),
    }),
    importGateway: build.mutation<null, any>({
      query: ({ file, parent_uuid }) => {
        const body = new FormData();
        body.append('Content-Type', file.type);
        body.append('file', file);
        try {
          return {
            url: `agencies/${parent_uuid}/gateways/upload`,
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
    getGatewayTypes: build.query<any, null>({
      query: (body) => ({ url: `gatewaytypes` }),
      providesTags() {
        return [{ type: 'GatewayType' }];
      },
      transformResponse: (response: { data: IGatewayType[] }, meta, arg) => response.data,
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
  useDeleteGatewayMutation,
  useGetGatewayTypesQuery,
  useExtendGatewayMutation,
} = gatewaysApi;
