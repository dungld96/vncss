import { createApi } from '@reduxjs/toolkit/query/react';
import { setNotifications } from 'state/modules/notification/notificationReducer';
import { queryRootConfig, ResponsiveInterface } from './http.service';

export const notificationsApi = createApi({
  ...queryRootConfig,
  reducerPath: 'notificationsApi',
  tagTypes: ['Notification', 'SubNotification', 'readNotification', 'unSubNotification', 'handleNotification'],
  endpoints: (build) => ({
    getListNotifications: build.query<any, { params?: any }>({
      query: (body) => ({ url: `notifications`, params: body.params }),
      providesTags() {
        return [{ type: 'Notification' }];
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const {
            data: { data },
          } = await queryFulfilled;
          dispatch(
            setNotifications({
              notifications: data,
            })
          );
        } catch (error) {}
      },
    }),
    subNotification: build.mutation<ResponsiveInterface, { data: { token: string } }>({
      query: ({ data }) => {
        try {
          return {
            url: `notifications/subscribe`,
            method: 'POST',
            body: data,
          };
        } catch (error: any) {
          throw new error.message();
        }
      },
      invalidatesTags: (result, error, data) => (error ? [] : [{ type: 'SubNotification' }]),
    }),
    unSubNotification: build.mutation<ResponsiveInterface, { data: { token: string } }>({
      query: ({ data }) => {
        try {
          return {
            url: `notifications/unsubscribe`,
            method: 'POST',
            body: data,
          };
        } catch (error: any) {
          throw new error.message();
        }
      },
      invalidatesTags: (result, error, data) => (error ? [] : [{ type: 'unSubNotification' }]),
    }),
    readNotification: build.mutation<ResponsiveInterface, { timestamp?: number }>({
      query: ({ timestamp }) => {
        try {
          return {
            url: `notifications/read${timestamp ? `?timestamp=${timestamp}` : ''}`,
            method: 'POST',
          };
        } catch (error: any) {
          throw new error.message();
        }
      },
      invalidatesTags: (result, error, data) => (error ? [] : [{ type: 'readNotification' }]),
    }),
    handleNotification: build.mutation<ResponsiveInterface, { timestamp: number }>({
      query: ({ timestamp }) => {
        try {
          return {
            url: `notifications/handle?timestamp=${timestamp}`,
            method: 'POST',
          };
        } catch (error: any) {
          throw new error.message();
        }
      },
      invalidatesTags: (result, error, data) => (error ? [] : [{ type: 'handleNotification' }]),
    }),
  }),
});

export const {
  useLazyGetListNotificationsQuery,
  useSubNotificationMutation,
  useReadNotificationMutation,
  useUnSubNotificationMutation,
  useHandleNotificationMutation,
} = notificationsApi;
