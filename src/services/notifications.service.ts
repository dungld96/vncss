import { createApi } from '@reduxjs/toolkit/query/react';
import { setNotifications } from 'state/modules/notification/notificationReducer';
import { queryRootConfig, ResponsiveInterface } from './http.service';

export const notificationsApi = createApi({
  ...queryRootConfig,
  reducerPath: 'notificationsApi',
  tagTypes: ['Notification', 'SubNotification'],
  endpoints: (build) => ({
    getListNotifications: build.query<any, { agency_id?: string; params?: any }>({
      query: (body) => ({ url: `agencies/${body.agency_id}/notifications`, params: body.params }),
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
    subNotification: build.mutation<ResponsiveInterface, { data: { token: string }; agencyId: string }>({
      query: ({ data, agencyId }) => {
        try {
          return {
            url: `agencies/${agencyId}/notifications/subscribe`,
            method: 'POST',
            body: data,
          };
        } catch (error: any) {
          throw new error.message();
        }
      },
      invalidatesTags: (result, error, data) => (error ? [] : [{ type: 'SubNotification' }]),
    }),
  }),
});

export const { useSubNotificationMutation } = notificationsApi;
