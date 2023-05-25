import { createApi } from '@reduxjs/toolkit/query/react';
import { setLocations } from '../state/modules/location/locationReducer';
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
            data: { data },
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
            })
          );
        } catch (error) {}
      },
    }),
    createLocation: build.mutation<any, any>({
      query: ({ Location, parent_uuid }) => {
        try {
          return {
            url: `agencies/${parent_uuid}/locations`,
            method: 'POST',
            body: Location,
          };
        } catch (error: any) {
          throw new error.message();
        }
      },
      invalidatesTags: (result, error, data) => (error ? [] : [{ type: 'Location' }]),
    }),
    updateNode: build.mutation<any, any>({
      query: ({ Location, parent_uuid }) => {
        try {
          return {
            url: `agencies/${parent_uuid}/locations/${Location.id}`,
            method: 'PUT',
            body: Location,
          };
        } catch (error: any) {
          throw new error.message();
        }
      },
      invalidatesTags: (result, error, data) => (error ? [] : [{ type: 'Location' }]),
    }),
    deleteNode: build.mutation<null, { id: string; parent_uuid?: string }>({
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
  useDeleteNodeMutation,
  useUpdateNodeMutation,
} = loactionsApi;
