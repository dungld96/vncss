import { createApi } from '@reduxjs/toolkit/query/react';
import { setLocations, LocationType } from '../state/modules/location/locationReducer';
import { queryRootConfig } from './http.service';

export const loactionsApi = createApi({
  ...queryRootConfig,
  reducerPath: 'loactionsApi',
  tagTypes: ['Location'],
  endpoints: (build) => ({
    getListLocations: build.query<any, { agency_id?: string; params: any }>({
      query: (body) => ({ url: `agencies/${body.agency_id}/locations`, params: body.params }),
      providesTags() {
        return [{ type: 'Location' }];
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const {
            data: { data, cursor },
          } = await queryFulfilled;
          const dataParse = data.map((item: any) => ({
            ...item,
            addressString: `${item.address && item.address + ','} ${item.commune && item.commune + ','} ${
              item.district && item.district + ','
            } ${item.province}`,
          }));
          dispatch(
            setLocations({
              locations: dataParse,
              cursor,
            })
          );
        } catch (error) {}
      },
    }),
    getLocation: build.query<any, { agencyId?: string; locationId?: string }>({
      query: (body) => ({ url: `agencies/${body.agencyId}/locations/${body.locationId}` }),
      providesTags() {
        return [{ type: 'Location' }];
      },
      transformResponse: (response: { data: LocationType }, meta, arg) => response.data,
    }),
    createLocation: build.mutation<any, any>({
      query: ({ location, parent_uuid }) => {
        try {
          return {
            url: `agencies/${parent_uuid}/locations`,
            method: 'POST',
            body: location,
          };
        } catch (error: any) {
          throw new error.message();
        }
      },
      invalidatesTags: (result, error, data) => (error ? [] : [{ type: 'Location' }]),
    }),
    updateLocation: build.mutation<any, any>({
      query: ({ location, parent_uuid }) => {
        try {
          return {
            url: `agencies/${parent_uuid}/locations/${location.id}`,
            method: 'PUT',
            body: location,
          };
        } catch (error: any) {
          throw new error.message();
        }
      },
      invalidatesTags: (result, error, data) => (error ? [] : [{ type: 'Location' }]),
    }),
    deleteLocation: build.mutation<null, { id: string; parent_uuid?: string }>({
      query: (body) => {
        try {
          return {
            url: `agencies/${body.parent_uuid}/locations/${body.id}`,
            method: 'DELETE',
          };
        } catch (error: any) {
          throw new error.message();
        }
      },
      invalidatesTags: (result, error, data) => (error ? [] : [{ type: 'Location' }]),
    }),
  }),
});

export const {
  useGetListLocationsQuery,
  useLazyGetListLocationsQuery,
  useCreateLocationMutation,
  useDeleteLocationMutation,
  useUpdateLocationMutation,
  useGetLocationQuery,
} = loactionsApi;
