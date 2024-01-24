import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import { CursorType } from 'configs/constant';

export interface NotificationAlertType {
  id: string;
  type: string;
  timestamp: number;
  locationId: string;
  locationName: string;
  notificationText: string;
}
export interface NotificationType {
  receiver: string;
  timestamp: number;
  title: string;
  message: string;
  location_id: string;
  gateway_serial: string;
  readed: boolean;
  type: string;
  data: {
    nType: string;
    nId: string;
    timestamp: number;
    status: number;
    battery: number;
  };
}

type NotificationState = {
  notifications: NotificationType[];
  notificationsAlertQueue: NotificationAlertType[];
  cursor: CursorType;
  limit: number;
};

const initialState: NotificationState = { notifications: [], notificationsAlertQueue: [], cursor: {}, limit: 50 };

const slice = createSlice({
  name: 'notificationState',
  initialState: initialState,
  reducers: {
    setNotifications: (
      state,
      { payload: { notifications, cursor } }: PayloadAction<{ cursor: CursorType; notifications: NotificationType[] }>
    ) => {
      state.notifications = notifications;
      state.cursor = cursor;
    },
    addNotifications: (
      state,
      { payload: { notifications, cursor } }: PayloadAction<{ cursor: CursorType; notifications: NotificationType[] }>
    ) => {
      state.notifications = [...state.notifications, ...notifications];
      state.cursor = cursor;
    },
    addNotificationsAlertQueue: (state, { payload: notificationAlert }: PayloadAction<NotificationAlertType>) => {
      const isInQueue = state.notificationsAlertQueue.find((item) => item.locationId === notificationAlert.locationId);
      const newState = isInQueue
        ? [...state.notificationsAlertQueue]
        : [...state.notificationsAlertQueue, notificationAlert];
      state.notificationsAlertQueue = [...newState];
    },
    removeNotificationAlertFromQueue: (state, { payload: notificationAlert }: PayloadAction<NotificationAlertType>) => {
      state.notificationsAlertQueue = state.notificationsAlertQueue.filter((item) => item.id !== notificationAlert.id);
    },
  },
});

export const { setNotifications, addNotifications, addNotificationsAlertQueue, removeNotificationAlertFromQueue } =
  slice.actions;

export default slice.reducer;

export const selectNotificationState = (state: RootState) => state.notificationState;
export const selectNotifications = (state: RootState) => state.notificationState.notifications;
export const selectNotificationsAlertQueue = (state: RootState) => state.notificationState.notificationsAlertQueue;
export const selectNotificationsCursor = (state: RootState) => state.notificationState.cursor;
