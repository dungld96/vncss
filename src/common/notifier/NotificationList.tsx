import { CircularProgress, Box } from '@mui/material';
import { sensorMapped } from '../../utils/sensorMapping';
import { NotificationType } from '../../state/modules/notification/notificationReducer';
import dayjs from 'dayjs';

const getComponentType = (typeId = '') => {
  return typeId.split('-').length > 1 ? typeId.split('-')[1] : '-';
};

export const NotificationList = ({
  notifications,
  onClickNotification,
  handleLoadMoreNotification,
  notificationsLoading,
}: {
  notifications: NotificationType[];
  onClickNotification: (notification: NotificationType) => void;
  handleLoadMoreNotification: () => void;
  notificationsLoading: boolean;
}) => {
  const image = sensorMapped as any;
  return (
    <Box style={{ overflow: 'auto', maxHeight: 'inherit', backgroundColor: '#ffffff' }}>
      {notifications.map((entry) => {
        const productType = entry.data.nType;
        const code = getComponentType(productType);
        return (
          <Box
            key={entry.timestamp}
            onClick={() => onClickNotification(entry)}
            style={{
              padding: ' 10px 30px 0 4px',
              display: 'flex',
              flexDirection: 'row',
              justifyItems: 'center',
              backgroundColor: entry.readed ? 'rgb(255, 255, 255)' : 'rgba(255, 145, 145, 0.25)',
              cursor: 'pointer',
            }}
          >
            <Box
              style={{
                width: '30px',
                padding: '0 25px',
                display: 'flex',
                position: 'relative',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img alt="" style={{ width: 56 }} src={image[code !== '-' ? code : 'icon_error']} />
            </Box>
            <Box style={{ flex: 1, minWidth: 0, color: '#03294a' }}>
              <Box
                style={{
                  fontStyle: 'normal',
                  fontWeight: entry.readed ? 500 : 'bold',
                  fontSize: '14px',
                  lineHeight: '20px',
                  alignItems: 'center',
                  textAlign: 'justify',
                }}
              >
                {entry.message}
              </Box>
              <Box
                style={{
                  fontStyle: 'normal',
                  fontWeight: 'normal',
                  fontSize: '12px',
                  lineHeight: '14px',
                  color: '#828282',
                  padding: '10px 0',
                }}
              >
                {dayjs(entry.timestamp).format('HH:mm:ss DD-MM-YYYY')}
              </Box>
            </Box>
          </Box>
        );
      })}

      {notificationsLoading ? (
        <Box style={{ textAlign: 'center', padding: '10px 0' }}>
          <CircularProgress />
        </Box>
      ) : (
        // <Box
        //   onClick={onClickLoadmore}
        //   style={{
        //     textAlign: 'center',
        //     cursor: 'pointer',
        //     color: '#1262a5',
        //     padding: '10px',
        //     textDecoration: 'underline',
        //   }}
        // >
        //   Xem thêm
        // </Box>
        <></>
      )}
    </Box>
  );
};
