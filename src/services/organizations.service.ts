import { createApi } from '@reduxjs/toolkit/query/react';
import { CursorsType } from '../configs/constant';
import { setOrganizations } from '../state/modules/organization/organizationReducer';
import { queryRootConfig, ResponsiveInterface } from './http.service';

export interface IOrganization {
  id?: string;
  parent_id: string | null;
  parentId: string | null;
  tag: string;
  name: string;
  address: string;
  level: number;
  active: boolean;
  username: string;
  count_locations: number;
  count_devices: number;
}

export interface OrganizationResponsiveInterface extends ResponsiveInterface {
    data: IOrganization;
  }
  
  export interface OrganizationsResponsiveInterface extends ResponsiveInterface {
    data: IOrganization[];
    cursor: CursorsType;
  }
  
  export interface OrganizationRequestInterface {
    parent_uuid?: string;
    organization: IOrganization;
  }

export const organizationsApi = createApi({
  ...queryRootConfig,
  reducerPath: 'organizationsApi',
  tagTypes: ['Organization'],
  endpoints: (build) => ({
    getListOrganizations: build.query<OrganizationsResponsiveInterface, { agency_id?: string; params?: any }>({
      query: (body) => ({ url: `agencies/${body.agency_id}/organizations`, params: body.params }),
      providesTags() {
        return [{ type: 'Organization' }];
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const {
            data: { data, cursor },
          } = await queryFulfilled;
          const dataParse = data.map((item) => ({
            ...item,
            parentId: item.parent_id || null,
          }));
          dispatch(
            setOrganizations({
              organizations: dataParse,
              cursors: {
                before: cursor.before || undefined,
                after: cursor.after || undefined,
              },
            })
          );
        } catch (error) {}
      },
    }),
    createOrganization: build.mutation<OrganizationResponsiveInterface, OrganizationRequestInterface>({
      query: ({ organization, parent_uuid }) => {
        try {
          return {
            url: `agencies/${parent_uuid}/organizations`,
            method: 'POST',
            body: organization,
          };
        } catch (error: any) {
          throw new error.message();
        }
      },
      invalidatesTags: (result, error, data) => (error ? [] : [{ type: 'Organization' }]),
    }),
    updateOrganization: build.mutation<OrganizationResponsiveInterface, OrganizationRequestInterface>({
      query: ({ organization, parent_uuid }) => {
        try {
          return {
            url: `agencies/${parent_uuid}/organizations/${organization.id}`,
            method: 'PUT',
            body: organization,
          };
        } catch (error: any) {
          throw new error.message();
        }
      },
      invalidatesTags: (result, error, data) => (error ? [] : [{ type: 'Organization' }]),
    }),
    deleteOrganization: build.mutation<null, { id: string; parent_uuid?: string }>({
      query: (body) => {
        try {
          return {
            url: `agencies/${body.parent_uuid}/organizations/${body.id}`,
            method: 'DELETE',
          };
        } catch (error: any) {
          throw new error.message();
        }
      },
      invalidatesTags: (result, error, data) => (error ? [] : [{ type: 'Organization' }]),
    }),
  }),
});

export const {
  useCreateOrganizationMutation,
  useDeleteOrganizationMutation,
  useGetListOrganizationsQuery,
  useLazyGetListOrganizationsQuery,
  useUpdateOrganizationMutation,
} = organizationsApi;
