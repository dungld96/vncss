import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';

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

type ControlState = {
  notifications: NotificationType[];
  notificationsAlertQueue: NotificationAlertType[];
};

const initialState: ControlState = { notifications: [], notificationsAlertQueue: [] };

const slice = createSlice({
  name: 'notificationState',
  initialState: initialState,
  reducers: {
    setNotifications: (state, { payload: { notifications } }: PayloadAction<{ notifications: NotificationType[] }>) => {
      state.notifications = notifications;
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

export const { setNotifications, addNotificationsAlertQueue, removeNotificationAlertFromQueue } = slice.actions;

export default slice.reducer;

export const selectNotificationState = (state: RootState) => state.notificationState;
export const selectNotifications = (state: RootState) => state.notificationState.notifications;
export const selectNotificationsAlertQueue = (state: RootState) => state.notificationState.notificationsAlertQueue;
