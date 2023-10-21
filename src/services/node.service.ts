import { createApi } from '@reduxjs/toolkit/query/react';
import { setNodes } from '../state/modules/node/nodeReducer';
import { queryRootConfig } from './http.service';

export interface INodeType {
  id: string;
  code: string;
  name: string;
  schema?: string;
  can_stop_alert: boolean;
  permission?: string;
  created_at: string;
  updated_at: string;
}

export const nodesApi = createApi({
  ...queryRootConfig,
  reducerPath: 'nodesApi',
  tagTypes: ['Node', 'NodeType'],
  endpoints: (build) => ({
    getListNode: build.query<any, { agency_id?: string; params: any }>({
      query: (body) => ({ url: `agencies/${body.agency_id}/nodes`, params: body.params }),
      providesTags() {
        return [{ type: 'Node' }];
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const {
            data: { data, cursor },
          } = await queryFulfilled;
          dispatch(
            setNodes({
              nodes: data,
              cursor: cursor,
            })
          );
        } catch (error) {}
      },
    }),
    createNode: build.mutation<any, any>({
      query: ({ node, parent_uuid }) => {
        try {
          return {
            url: `agencies/${parent_uuid}/nodes`,
            method: 'POST',
            body: node,
          };
        } catch (error: any) {
          throw new error.message();
        }
      },
      invalidatesTags: (result, error, data) => (error ? [] : [{ type: 'Node' }]),
    }),
    updateNode: build.mutation<any, any>({
      query: ({ node, parent_uuid }) => {
        try {
          return {
            url: `agencies/${parent_uuid}/nodes/${node.id}`,
            method: 'PUT',
            body: node,
          };
        } catch (error: any) {
          throw new error.message();
        }
      },
      invalidatesTags: (result, error, data) => (error ? [] : [{ type: 'Node' }]),
    }),
    achieveNode: build.mutation<any, { parent_uuid?: string; node_ids: (string | number)[] }>({
      query: (body) => {
        try {
          return {
            url: `agencies/${body.parent_uuid}/nodes/achieve`,
            method: 'POST',
            body: { node_ids: body.node_ids },
          };
        } catch (error: any) {
          throw new error.message();
        }
      },
      invalidatesTags: (result, error, data) => (error ? [] : [{ type: 'Node' }]),
    }),
    moveNode: build.mutation<any, { node_ids?: (string | number)[]; agency_id: string; parent_uuid?: string }>({
      query: ({ agency_id, node_ids, parent_uuid }) => {
        try {
          return {
            url: `agencies/${parent_uuid}/nodes/move`,
            method: 'POST',
            body: { node_ids, agency_id },
          };
        } catch (error: any) {
          throw new error.message();
        }
      },
      invalidatesTags: (result, error, data) => (error ? [] : [{ type: 'Node' }]),
    }),
    deleteNode: build.mutation<null, { ids: (string | number)[]; parent_uuid?: string }>({
      query: (body) => {
        try {
          return {
            url: `agencies/${body.parent_uuid}/nodes`,
            method: 'DELETE',
            body: { ids: body.ids },
          };
        } catch (error: any) {
          throw new error.message();
        }
      },
      invalidatesTags: (result, error, data) => (error ? [] : [{ type: 'Node' }]),
    }),
    importNode: build.mutation<null, any>({
      query: ({ file, parent_uuid }) => {
        const body = new FormData();
        body.append('Content-Type', file.type);
        body.append('file', file);
        try {
          return {
            url: `agencies/${parent_uuid}/nodes/upload`,
            method: 'POST',
            body: body,
            formData: true,
          };
        } catch (error: any) {
          throw new error.message();
        }
      },
      invalidatesTags: (result, error, data) => (error ? [] : [{ type: 'Node' }]),
    }),
    getNodeTypes: build.query<any, null>({
      query: (body) => ({ url: `nodetypes` }),
      providesTags() {
        return [{ type: 'NodeType' }];
      },
      transformResponse: (response: { data: INodeType[] }, meta, arg) => response.data,
    }),
  }),
});

export const {
  useAchieveNodeMutation,
  useCreateNodeMutation,
  useDeleteNodeMutation,
  useGetListNodeQuery,
  useImportNodeMutation,
  useLazyGetListNodeQuery,
  useMoveNodeMutation,
  useUpdateNodeMutation,
  useGetNodeTypesQuery,
} = nodesApi;
