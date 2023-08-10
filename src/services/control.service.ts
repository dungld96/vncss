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
  version?: string;
  mfg: string;
  alert: number;
  blocking: boolean;
  testing: boolean;
  state: { battery: number; charge: number; gsmLevel: number; hum: number; temp: number; timestamp: number } | null;
  status: string;
  secure_code: 'string';
  enable_callcenter: boolean;
  active_at?: string;
  subscription_end_at?: string;
}
export type NoteStateType = {
  battery: number;
  hum: number;
  nType: string;
  status: number;
  temp: number;
  timestamp: number;
};
export interface ControlLocationNodeType {
  id: string;
  agency_id: string;
  node_type_id: string;
  name: string;
  serial: string;
  version: string;
  mfg: string;
  alert: number;
  state: NoteStateType | null;
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

export interface ControlLocationCameraBoxType {
  id: string;
  serial: string;
  agency_id: string;
  version: string;
  status: number;
  blocking: boolean;
}

export interface ControlLocationLogType {
  timestamp: number;
  kind: string;
  gateway_serial: string;
  message: string;
}

export const controlApi = createApi({
  ...queryRootConfig,
  reducerPath: 'controlApi',
  tagTypes: [
    'Control',
    'AddCamera',
    'AddGateway',
    'AddNode',
    'UpdateControlLocation',
    'UpdateGatewayControl',
    'UpdateNodeControl',
    'handleAlertControl',
  ],
  endpoints: (build) => ({
    getControlLocations: build.query<any, { agency_id?: string; params?: any }>({
      query: (body) => ({ url: `agencies/${body.agency_id}/monitoring/locations/status`, params: body.params }),
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
      query: (body) => ({ url: `agencies/${body.agencyId}/monitoring/locations/${body.locationId}` }),
      providesTags() {
        return [{ type: 'Control' }];
      },
      transformResponse: (response: { data: LocationType }, meta, arg) => response.data,
    }),
    getControlLocationGateways: build.query<any, { agencyId: string; locationId: string }>({
      query: (body) => ({ url: `agencies/${body.agencyId}/monitoring/locations/${body.locationId}/gateways` }),
      providesTags() {
        return [{ type: 'Control' }];
      },
      transformResponse: (response: { data: ControlLocationGatewayType }, meta, arg) => response.data,
    }),
    getControlLocationGatewayNodes: build.query<any, { agencyId: string; locationId: string; gatewayId: string }>({
      query: (body) => ({
        url: `agencies/${body.agencyId}/monitoring/locations/${body.locationId}/gateways/${body.gatewayId}/nodes`,
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
            url: `agencies/${agencyId}/monitoring/locations/${locationId}/addgateway`,
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
            url: `agencies/${agencyId}/monitoring/locations/${locationId}/gateways/${gatewayId}/addnode`,
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
            url: `agencies/${agencyId}/monitoring/locations/${locationId}/cameraboxes`,
            method: 'POST',
            body: data,
          };
        } catch (error: any) {
          throw new error.message();
        }
      },
      invalidatesTags: (result, error, data) => (error ? [] : [{ type: 'AddCamera' }]),
    }),
    getControlLocationCameras: build.query<any, { agencyId: string; locationId: string; cameraBoxId: string }>({
      query: (body) => ({
        url: `agencies/${body.agencyId}/monitoring/locations/${body.locationId}/cameraboxes/${body.cameraBoxId}/cameras`,
      }),
      providesTags() {
        return [{ type: 'Control' }];
      },
      transformResponse: (response: { data: ControlLocationCameraType }, meta, arg) => response.data,
    }),
    getControlLocationCameraBoxs: build.query<any, { agencyId: string; locationId: string }>({
      query: (body) => ({
        url: `agencies/${body.agencyId}/monitoring/locations/${body.locationId}/cameraboxes`,
      }),
      providesTags() {
        return [{ type: 'Control' }];
      },
      transformResponse: (response: { data: ControlLocationCameraType }, meta, arg) => response.data,
    }),
    getControlLocationLogs: build.query<any, { agencyId: string; locationId: string }>({
      query: (body) => ({
        url: `agencies/${body.agencyId}/monitoring/locations/${body.locationId}/logs`,
      }),
      providesTags() {
        return [{ type: 'Control' }];
      },
      transformResponse: (response: { data: ControlLocationLogType }, meta, arg) => response.data,
    }),
    getControlLocationCameraImage: build.query<
      any,
      { agencyId: string; locationId: string; cameraboxeId: string; cameraId: string }
    >({
      query: (body) => ({
        url: `agencies/${body.agencyId}/monitoring/locations/${body.locationId}/cameraboxes/${body.cameraboxeId}/cameras/${body.cameraId}/images`,
      }),
      providesTags() {
        return [{ type: 'Control' }];
      },
      transformResponse: (response: { data: ControlLocationCameraType }, meta, arg) => response.data,
    }),
    updateLocationControl: build.mutation<ResponsiveInterface, any>({
      query: ({ data, agencyId, locationId }) => {
        try {
          return {
            url: `agencies/${agencyId}/monitoring/locations/${locationId}`,
            method: 'PUT',
            body: data,
          };
        } catch (error: any) {
          throw new error.message();
        }
      },
      invalidatesTags: (result, error, data) => (error ? [] : [{ type: 'UpdateControlLocation' }]),
    }),
    updateGatewayControl: build.mutation<ResponsiveInterface, any>({
      query: ({ data, agencyId, locationId, gatewayId }) => {
        try {
          return {
            url: `agencies/${agencyId}/monitoring/locations/${locationId}/gateways/${gatewayId}`,
            method: 'PUT',
            body: data,
          };
        } catch (error: any) {
          throw new error.message();
        }
      },
      invalidatesTags: (result, error, data) => (error ? [] : [{ type: 'UpdateGatewayControl' }]),
    }),
    updateNodeControl: build.mutation<ResponsiveInterface, any>({
      query: ({ data, agencyId, locationId, gatewayId, nodeId }) => {
        try {
          return {
            url: `agencies/${agencyId}/monitoring/locations/${locationId}/gateways/${gatewayId}/nodes/${nodeId}`,
            method: 'PUT',
            body: data,
          };
        } catch (error: any) {
          throw new error.message();
        }
      },
      invalidatesTags: (result, error, data) => (error ? [] : [{ type: 'UpdateNodeControl' }]),
    }),
    handleAlertControl: build.mutation<ResponsiveInterface, { agencyId: string; locationId: string }>({
      query: ({ agencyId, locationId }) => {
        try {
          return {
            url: `agencies/${agencyId}/monitoring/locations/${locationId}/handlealert`,
            method: 'POST',
          };
        } catch (error: any) {
          throw new error.message();
        }
      },
      invalidatesTags: (result, error, data) => (error ? [] : [{ type: 'handleAlertControl' }]),
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
  useUpdateLocationControlMutation,
  useUpdateGatewayControlMutation,
  useUpdateNodeControlMutation,
  useGetControlLocationLogsQuery,
  useLazyGetControlLocationLogsQuery,
  useLazyGetControlLocationCameraBoxsQuery,
  useHandleAlertControlMutation,
} = controlApi;
