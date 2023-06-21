import { createApi } from '@reduxjs/toolkit/query/react';
import { setControlLocations } from '../state/modules/control/controlReducer';
import { LocationType } from '../state/modules/location/locationReducer';
import { queryRootConfig, ResponsiveInterface } from './http.service';

export interface AddGatewayResponsiveInterface extends ResponsiveInterface {}
export interface AddGatewayRequestInterface {
  data: { name: string; serial: string; sim: string; enableCallCenter: boolean };
  agencyId: string;
  locationId: string;
}

export const controlApi = createApi({
  ...queryRootConfig,
  reducerPath: 'controlApi',
  tagTypes: ['Control'],
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
      invalidatesTags: (result, error, data) => (error ? [] : [{ type: 'Control' }]),
    }),
  }),
});

export const {
  useGetControlLocationsQuery,
  useLazyGetControlLocationsQuery,
  useAddGatewayMutation,
  useGetControlLocationQuery,
  useLazyGetControlLocationQuery,
} = controlApi;
