import { createApi } from '@reduxjs/toolkit/query/react';
import { CursorType } from '../configs/constant';
import { setOrganizations, setOrganizationChilds } from '../state/modules/organization/organizationReducer';
import { queryRootConfig, ResponsiveInterface } from './http.service';

export interface IOrganization {
  id?: string;
  parent_id: string | null;
  parentId?: string | null;
  tag: string;
  name: string;
  address: string;
  level?: number;
  active?: boolean;
  username: string;
  count_locations?: number;
  count_devices?: number;
  password?: string;
}

export interface OrganizationResponsiveInterface extends ResponsiveInterface {
  data: IOrganization;
}

export interface OrganizationsResponsiveInterface extends ResponsiveInterface {
  data: IOrganization[];
  cursor: CursorType;
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
              cursor: {
                before: cursor.before || undefined,
                after: cursor.after || undefined,
              },
            })
          );
        } catch (error) {}
      },
    }),
    getListOrganizationChilds: build.query<
      OrganizationsResponsiveInterface,
      { agency_id?: string; orgId: string; params?: any }
    >({
      query: (body) => ({ url: `agencies/${body.agency_id}/organizations/${body.orgId}/list`, params: body.params }),
      providesTags() {
        return [{ type: 'Organization' }];
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const {
            data: { data },
          } = await queryFulfilled;
          const dataParse = data.map((item) => ({
            ...item,
            parentId: item.parent_id || null,
          }));
          dispatch(
            setOrganizationChilds({
              organizations: dataParse,
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
    deleteOrganization: build.mutation<null, { id: string; agencyId: string }>({
      query: (body) => {
        try {
          return {
            url: `agencies/${body.agencyId}/organizations/${body.id}`,
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
  useLazyGetListOrganizationChildsQuery,
} = organizationsApi;
