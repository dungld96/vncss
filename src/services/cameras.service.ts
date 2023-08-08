import { createApi } from '@reduxjs/toolkit/query/react';
import { setCameras } from '../state/modules/camera/cameraReducer';
import { queryRootConfig } from './http.service';

export interface ICameraType {
  id: string;
  code: string;
  name: string;
  schema?: string;
  can_stop_alert: boolean;
  permission?: string;
  created_at: string;
  updated_at: string;
}

export const camerasApi = createApi({
  ...queryRootConfig,
  reducerPath: 'CamerasApi',
  tagTypes: ['Camera', 'CameraType'],
  endpoints: (build) => ({
    getListCamera: build.query<any, { agencyId?: string; params: any }>({
      query: (body) => ({ url: `agencies/${body.agencyId}/cameraboxs`, params: body.params }),
      providesTags() {
        return [{ type: 'Camera' }];
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const {
            data: { data, cursor },
          } = await queryFulfilled;
          dispatch(
            setCameras({
              cameras: data,
              cursors: cursor,
            })
          );
        } catch (error) {}
      },
    }),
    createCamera: build.mutation<any, any>({
      query: ({ data, agencyId }) => {
        try {
          return {
            url: `agencies/${agencyId}/cameraboxs`,
            method: 'POST',
            body: data,
          };
        } catch (error: any) {
          throw new error.message();
        }
      },
      invalidatesTags: (result, error, data) => (error ? [] : [{ type: 'Camera' }]),
    }),
  }),
});

export const { useCreateCameraMutation, useGetListCameraQuery, useLazyGetListCameraQuery } = camerasApi;
