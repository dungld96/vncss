import { createApi } from '@reduxjs/toolkit/query/react';
import { setRegulatories } from 'state/modules/regulatory/regulatoryReducer';
import { queryRootConfig } from './http.service';

export interface IRegulatory {
  id: string;
  parentId: string | null;
  name: string;
  address: string;
  account: string;
  tag: string;
  count_locations: number;
  count_devices: number;
}

export const regulatoryApi = createApi({
  ...queryRootConfig,
  reducerPath: 'regulatoryApi',
  tagTypes: ['Regulatory'],
  endpoints: (build) => ({
    getListRegulatories: build.query<any, any>({
      query: (params) => ({ url: 'regulatories', params }),
      providesTags() {
        return [{ type: 'Regulatory' }];
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const {
            data: { data, cursor },
          } = await queryFulfilled;
          const dataParse = data.map((item: any) => ({
            ...item,
            parentId: item.parent_id || null,
          }));
          dispatch(
            setRegulatories({
              cursor: cursor,
              regulatories: dataParse,
            })
          );
        } catch (error) {}
      },
    }),
    changePasswordRegulatory: build.mutation<any, { password: string; id: string }>({
      query: ({ id, password }) => {
        try {
          return {
            url: `regulatories/${id}/changepassword`,
            method: 'PUT',
            body: { password },
          };
        } catch (error: any) {
          throw new error.message();
        }
      },
      invalidatesTags: (result, error, data) => (error ? [] : [{ type: 'Regulatory' }]),
    }),
  }),
});

export const { useGetListRegulatoriesQuery, useLazyGetListRegulatoriesQuery, useChangePasswordRegulatoryMutation } =
  regulatoryApi;
