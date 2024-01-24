import React from 'react';
import { Box, Badge, Button, IconButton, Popover, Tooltip, CircularProgress } from '@mui/material';
import { NotificationsNone as NotificationIcon } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { NotificationList } from './NotificationList';
import {
  NotificationType,
  selectNotifications,
  selectNotificationsCursor,
} from '../../state/modules/notification/notificationReducer';
import {
  useLazyGetListNotificationsQuery,
  useReadNotificationMutation,
  useLazyGetMoreListNotificationsQuery,
} from '../../services/notifications.service';
import { useAuth } from '../../hooks/useAuth';
import { ROUTE_CONTROL } from '../../utils/routesMap';
import dayjs from 'dayjs';

export const Notifier = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isAlertView, setIsAlertView] = React.useState(true);
  const [getListNotificationsQuery, { isLoading }] = useLazyGetListNotificationsQuery();
  const [getMoreListNotificationsQuery, { isLoading: isLoadingMore }] = useLazyGetMoreListNotificationsQuery();
  const [readNotificationMutation] = useReadNotificationMutation();
  const {
    auth: { currentUser },
  } = useAuth();

  const notifications = useSelector(selectNotifications);
  const cursor = useSelector(selectNotificationsCursor);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (currentUser) {
      getListNotificationsQuery({});
    }
  }, [currentUser]);

  const showNotifications = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const hideNotification = () => {
    setAnchorEl(null);
  };
  const handleLoadMoreNotification = () => {
    getMoreListNotificationsQuery({
      params: {
        ...cursor,
      },
    });
  };

  const onClickNotification = (notification: NotificationType) => {
    const agencyId = currentUser?.sub_id;
    const timestamp = dayjs(notification.timestamp).unix();
    const locationId = notification.location_id;
    if (!notification.readed && agencyId) {
      readNotificationMutation({ timestamp }).then(() => getListNotificationsQuery({}));
    }
    setAnchorEl(null);
    navigate(`${ROUTE_CONTROL}?locationId=${locationId}`);
  };

  const readAll = () => {
    const agencyId = currentUser?.sub_id;
    if (agencyId) {
      readNotificationMutation({}).then(() => getListNotificationsQuery({}));
    }
  };

  const numUnreadNotifications = notifications.filter((item) => !item.readed).length;
  const filteredNotifications = isAlertView
    ? notifications.filter((item) => item.type === 'alert')
    : notifications.filter((item) => item.type !== 'alert');

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Tooltip title={'Thông báo'}>
        <span style={{ display: 'inline-block' }}>
          <IconButton onClick={showNotifications} data-vncss-element="notification-button" edge="end">
            {numUnreadNotifications > 0 && !anchorEl ? (
              <Badge color="primary" badgeContent={numUnreadNotifications}>
                <NotificationIcon color="primary" style={{ color: '#90a0b7' }} />
              </Badge>
            ) : (
              <NotificationIcon color="primary" style={{ color: '#90a0b7' }} />
            )}
          </IconButton>
        </span>
      </Tooltip>

      <Popover
        disableRestoreFocus
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        onClose={hideNotification}
      >
        <div style={{ width: '516px', height: '100%', color: 'white', backgroundColor: 'rgba(255, 145, 145, 0.25)' }}>
          <div
            style={{
              backgroundColor: '#ffffff',
              fontSize: '14px',
              fontWeight: 500,
              lineHeight: '48px',
              padding: '0 16px',
              color: '#03294a',

              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: 'row',
              border: '1px solid #e6e9ed',
            }}
          >
            <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
              <Box display={'flex'} alignItems="center" py={1}>
                <Box
                  style={{
                    fontSize: '20px',
                    fontWeight: 600,
                    color: isAlertView ? '#1E2323' : '#C5C6D2',
                    cursor: 'pointer',
                  }}
                  onClick={() => setIsAlertView(true)}
                  mr={2}
                >
                  Cảnh báo
                </Box>
                <Box
                  style={{
                    fontSize: '20px',
                    fontWeight: 600,
                    color: !isAlertView ? '#1E2323' : '#C5C6D2',
                    cursor: 'pointer',
                  }}
                  onClick={() => setIsAlertView(false)}
                >
                  Lưu ý
                </Box>
              </Box>
              <Box
                onClick={readAll}
                style={{
                  minWidth: 0,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  margin: '0 10px',
                  cursor: 'pointer',
                }}
              >
                Đánh dấu tất cả là đã đọc
              </Box>
            </Box>
          </div>
          <div style={{ height: 'auto', maxHeight: '736px' }}>
            {Boolean(anchorEl) && (
              <NotificationList
                notifications={filteredNotifications}
                onClickNotification={onClickNotification}
                handleLoadMoreNotification={handleLoadMoreNotification}
                notificationsLoading={isLoadingMore}
              />
            )}
          </div>
        </div>
      </Popover>
    </div>
  );
};
