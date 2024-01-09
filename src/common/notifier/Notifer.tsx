import React from 'react';
import { Badge, IconButton, Popover, Tooltip } from '@mui/material';
import { NotificationsNone as NotificationIcon } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { NotificationList } from './NotificationList';
import { NotificationType, selectNotifications } from '../../state/modules/notification/notificationReducer';
import { useLazyGetListNotificationsQuery, useReadNotificationMutation } from '../../services/notifications.service';
import { useAuth } from '../../hooks/useAuth';
import { ROUTE_CONTROL } from '../../utils/routesMap';
import dayjs from 'dayjs';

export const Notifier = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [getListNotificationsQuery, { isLoading }] = useLazyGetListNotificationsQuery();
  const [readNotificationMutation] = useReadNotificationMutation();
  const {
    auth: { currentUser },
  } = useAuth();

  const notifications = useSelector(selectNotifications);
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

  const handleLoadMoreNotification = () => {
    setAnchorEl(null);
  };
  const readAll = () => {
    const agencyId = currentUser?.sub_id;
    if (agencyId) {
      readNotificationMutation({}).then(() => getListNotificationsQuery({}));
    }
  };

  const numUnreadNotifications = notifications.filter((item) => !item.readed).length;

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
            <div style={{ display: 'flex' }}>
              <div
                style={{
                  minWidth: 0,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  fontSize: '18px',
                }}
              >
                {'Thông báo'}
              </div>
              {/* <div
                style={{
                  height: '16px',
                  fontSize: '10px',
                  lineHeight: '15px',
                  padding: '1px 10px 0',
                  borderRadius: '8px',
                  marginTop: '16px',
                  marginLeft: '20px',
                  backgroundColor: '#8f0a0c',
                  color: '#ffffff',
                }}
              >
                {numUnreadNotifications}
              </div> */}
            </div>
            <div
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
            </div>
          </div>
          <div style={{ height: 'auto', maxHeight: '352px' }}>
            {Boolean(anchorEl) && (
              <NotificationList
                notifications={notifications}
                onClickNotification={onClickNotification}
                handleLoadMoreNotification={handleLoadMoreNotification}
                notificationsLoading={isLoading}
              />
            )}
          </div>
        </div>
      </Popover>
    </div>
  );
};
