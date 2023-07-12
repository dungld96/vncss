import { createApi } from '@reduxjs/toolkit/query/react';
import { setControlLocations } from '../state/modules/control/controlReducer';
import { LocationType } from '../state/modules/location/locationReducer';
import { queryRootConfig, ResponsiveInterface } from './http.service';

export interface AddGatewayResponsiveInterface extends ResponsiveInterface {}
export interface AddGatewayRequestInterface {
  data: { name: string; serial: string; enableCallCenter: boolean };
  agencyId: string;
  locationId: string;
}

export interface AddCameraRequestInterface {
  data: { serial: string };
  agencyId: string;
  locationId: string;
}

export interface AddNodeRequestInterface {
  data: { name: string; serial: string };
  agencyId: string;
  locationId: string;
  gatewayId: string;
}

export interface ControlLocationGatewayType {
  id: string;
  agency_id: string;
  gateway_type_id: string;
  name: string;
  sim: string;
  serial: string;
  hardware_version: string;
  firmware_version: string;
  mfg: string;
  alert: number;
  blocking: boolean;
  testing: boolean;
  state: string | null;
  status: string;
  secure_code: 'string';
  enable_callcenter: boolean;
}

export interface ControlLocationNodeType {
  id: string;
  agency_id: string;
  node_type_id: string;
  name: string;
  serial: string;
  version: string;
  mfg: string;
  alert: number;
  state: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface ControlLocationCameraType {
  camId: string;
  rtsp: string;
  name: string;
  status: string;
  camip: string;
  onvifhost: string;
  onvifport: string;
  onvifusername: string;
  onvifpassword: string;
  audiocodec: string;
  videocodec: string;
  boxid: string;
  boxserial: string;
  boxip: string;
  rtspstream: string;
  websocketstream: string;
}

export const controlApi = createApi({
  ...queryRootConfig,
  reducerPath: 'controlApi',
  tagTypes: ['Control', 'AddCamera', 'AddGateway', 'AddNode'],
  endpoints: (build) => ({
    getControlLocations: build.query<any, { agency_id?: string; params?: any }>({
      query: (body) => ({ url: `agencies/${body.agency_id}/locations/status`, params: body.params }),
      providesTags() {
        return [{ type: 'Control' }];
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const {
            data: { data },
          } = await queryFulfilled;
          dispatch(
            setControlLocations({
              locations: data,
            })
          );
        } catch (error) {}
      },
    }),
    getControlLocation: build.query<any, { agencyId: string; locationId: string }>({
      query: (body) => ({ url: `agencies/${body.agencyId}/locations/${body.locationId}` }),
      providesTags() {
        return [{ type: 'Control' }];
      },
      transformResponse: (response: { data: LocationType }, meta, arg) => response.data,
    }),
    getControlLocationGateways: build.query<any, { agencyId: string; locationId: string }>({
      query: (body) => ({ url: `agencies/${body.agencyId}/locations/${body.locationId}/gateways` }),
      providesTags() {
        return [{ type: 'Control' }];
      },
      transformResponse: (response: { data: ControlLocationGatewayType }, meta, arg) => response.data,
    }),
    getControlLocationGatewayNodes: build.query<any, { agencyId: string; locationId: string; gatewayId: string }>({
      query: (body) => ({
        url: `agencies/${body.agencyId}/locations/${body.locationId}/gateways/${body.gatewayId}/nodes`,
      }),
      providesTags() {
        return [{ type: 'Control' }];
      },
      transformResponse: (response: { data: ControlLocationNodeType }, meta, arg) => response.data,
    }),
    addGateway: build.mutation<AddGatewayResponsiveInterface, AddGatewayRequestInterface>({
      query: ({ data, agencyId, locationId }) => {
        try {
          return {
            url: `agencies/${agencyId}/locations/${locationId}/addgateway`,
            method: 'POST',
            body: data,
          };
        } catch (error: any) {
          throw new error.message();
        }
      },
      invalidatesTags: (result, error, data) => (error ? [] : [{ type: 'AddGateway' }]),
    }),
    addNode: build.mutation<AddGatewayResponsiveInterface, AddNodeRequestInterface>({
      query: ({ data, agencyId, locationId, gatewayId }) => {
        try {
          return {
            url: `agencies/${agencyId}/locations/${locationId}/gateways/${gatewayId}/addnode`,
            method: 'POST',
            body: data,
          };
        } catch (error: any) {
          throw new error.message();
        }
      },
      invalidatesTags: (result, error, data) => (error ? [] : [{ type: 'AddNode' }]),
    }),
    addCamera: build.mutation<AddGatewayResponsiveInterface, AddCameraRequestInterface>({
      query: ({ data, agencyId, locationId }) => {
        try {
          return {
            url: `agencies/${agencyId}/locations/${locationId}/cameraboxes`,
            method: 'POST',
            body: data,
          };
        } catch (error: any) {
          throw new error.message();
        }
      },
      invalidatesTags: (result, error, data) => (error ? [] : [{ type: 'AddCamera' }]),
    }),
    getControlLocationCameras: build.query<any, { agencyId: string; locationId: string }>({
      query: (body) => ({
        url: `agencies/${body.agencyId}/locations/${body.locationId}/cameras`,
      }),
      providesTags() {
        return [{ type: 'Control' }];
      },
      transformResponse: (response: { data: ControlLocationCameraType }, meta, arg) => response.data,
    }),
    getControlLocationCameraImage: build.query<
      any,
      { agencyId: string; locationId: string; cameraboxeId: string; cameraId: string }
    >({
      query: (body) => ({
        url: `agencies/${body.agencyId}/locations/${body.locationId}/cameraboxes/${body.cameraboxeId}/cameras/${body.cameraId}/images`,
      }),
      providesTags() {
        return [{ type: 'Control' }];
      },
      transformResponse: (response: { data: ControlLocationCameraType }, meta, arg) => response.data,
    }),
  }),
});

export const {
  useGetControlLocationsQuery,
  useLazyGetControlLocationsQuery,
  useAddGatewayMutation,
  useGetControlLocationQuery,
  useLazyGetControlLocationQuery,
  useGetControlLocationGatewaysQuery,
  useLazyGetControlLocationGatewaysQuery,
  useGetControlLocationGatewayNodesQuery,
  useLazyGetControlLocationGatewayNodesQuery,
  useLazyGetControlLocationCamerasQuery,
  useAddNodeMutation,
  useAddCameraMutation,
  useLazyGetControlLocationCameraImageQuery,
} = controlApi;
