import { createApi } from '@reduxjs/toolkit/query/react';
import { setNodes } from '../state/modules/node/nodeReducer';
import { queryRootConfig } from './http.service';

export const nodesApi = createApi({
  ...queryRootConfig,
  reducerPath: 'nodesApi',
  tagTypes: ['Node'],
  endpoints: (build) => ({
    getListNode: build.query<any, any>({
      query: (body) => ({ url: `agencies/${body.id}/node`, params: body.params }),
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
              cursors: {
                before: cursor.before || undefined,
                after: cursor.after || undefined,
              },
            })
          );
        } catch (error) {}
      },
    }),
    createNode: build.mutation<any, any>({
      query: (body) => {
        try {
          return {
            url: 'agencies/2/node',
            method: 'POST',
            body: body,
          };
        } catch (error: any) {
          throw new error.message();
        }
      },
      invalidatesTags: (result, error, data) => (error ? [] : [{ type: 'Node' }]),
    }),
    updateNode: build.mutation<any, any>({
      query: (body) => {
        try {
          return {
            url: `agencies/2/node/${body.id}`,
            method: 'PUT',
            body: body,
          };
        } catch (error: any) {
          throw new error.message();
        }
      },
      invalidatesTags: (result, error, data) => (error ? [] : [{ type: 'Node' }]),
    }),
    achieveNode: build.mutation<any, any>({
      query: (body) => {
        try {
          return {
            url: `agencies/2/node/achieve`,
            method: 'POST',
            body: body,
          };
        } catch (error: any) {
          throw new error.message();
        }
      },
      invalidatesTags: (result, error, data) => (error ? [] : [{ type: 'Node' }]),
    }),
    moveNode: build.mutation<any, any>({
      query: (body) => {
        try {
          return {
            url: `agencies/2/node/move`,
            method: 'POST',
            body: body,
          };
        } catch (error: any) {
          throw new error.message();
        }
      },
      invalidatesTags: (result, error, data) => (error ? [] : [{ type: 'Node' }]),
    }),
    deleteNode: build.mutation<null, { id: string }>({
      query: (body) => {
        try {
          return {
            url: `agencies/2/node/${body.id}`,
            method: 'DELETE',
          };
        } catch (error: any) {
          throw new error.message();
        }
      },
      invalidatesTags: (result, error, data) => (error ? [] : [{ type: 'Node' }]),
    }),
    importNode: build.mutation<null, any>({
      query: (file) => {
        const body = new FormData();
        body.append('Content-Type', file.type);
        body.append('file', file);
        try {
          return {
            url: `agencies/2/node/upload`,
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
  }),
});

export const {} = nodesApi;
