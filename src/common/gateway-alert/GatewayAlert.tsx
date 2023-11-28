import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { Button, Box, Dialog, DialogContent, DialogContentText, IconButton } from '@mui/material';
import { Cancel } from '@mui/icons-material';
import AlertImage from '../../assets/sensor/alert.svg';
import { useAuth } from '../../hooks/useAuth';
import {
  selectNotificationsAlertQueue,
  NotificationAlertType,
  removeNotificationAlertFromQueue,
} from '../../state/modules/notification/notificationReducer';
import { ROUTE_CONTROL } from '../../utils/routesMap';
import { useHandleAlertControlMutation } from '../../services/control.service';

export const GatewayAlert = () => {
  const dispatch = useDispatch();
  const [currentNotify, setCurrentNotify] = useState<NotificationAlertType>();
  const [open, setOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement>();
  const navigate = useNavigate();
  const [handleNotification] = useHandleAlertControlMutation();

  const {
    auth: { currentUser },
  } = useAuth();

  const notificationsAlertQueue = useSelector(selectNotificationsAlertQueue);

  useEffect(() => {
    if (open) {
      audioRef.current = new Audio('http://pic.pikbest.com/00/25/35/888piC1N888piCh4S.mp3');
      let timer = setInterval(() => {
        const playPromise = audioRef.current?.play();
        if (playPromise) {
          playPromise
            .then((_) => {
              // Automatic playback started!
              // Show playing UI.
              // console.log('audio played auto');
            })
            .catch((error) => {
              // Auto-play was prevented
              // Show paused UI.
              // eslint-disable-next-line no-console
              console.log('playback prevented', error);
            });
        }
      }, 3000);
      return () => {
        clearInterval(timer);
      };
    }
  }, [open]);

  useEffect(() => {
    if (notificationsAlertQueue.length > 1 && currentNotify) {
      handleClose();
    } else if (notificationsAlertQueue.length > 0) {
      const currentNotify = notificationsAlertQueue[0];
      setTimeout(() => {
        setCurrentNotify(currentNotify);
      }, 500);
    }
  }, [notificationsAlertQueue.length]);

  useEffect(() => {
    if (currentNotify) {
      setOpen(true);
    }
  }, [currentNotify]);

  if (!currentUser) return null;

  const handleClose = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    if (currentNotify) {
      dispatch(removeNotificationAlertFromQueue(currentNotify));
    }
    setCurrentNotify(undefined);
    setOpen(false);
  };

  const handleProcessed = () => {
    if (currentNotify && currentUser) {
      handleNotification({ agencyId: currentUser.sub_id, locationId: currentNotify.locationId });
    }
    handleClose();
  };

  const handleRoute = () => {
    const locationId = currentNotify?.locationId;
    navigate(`${ROUTE_CONTROL}?locationId=${locationId}`);
    handleClose();
  };

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={handleClose} aria-labelledby="max-width-dialog-title">
      <DialogContent style={{ padding: '16px' }}>
        <Box display="flex">
          <IconButton
            style={{ padding: 0, marginLeft: 'auto' }}
            color="primary"
            aria-label="add to shopping cart"
            onClick={handleClose}
          >
            <Cancel />
          </IconButton>
        </Box>
        <Box display="flex" justifyContent="center" mb={1}>
          <img alt="#" src={AlertImage} />
        </Box>
        <DialogContentText
          style={{ fontSize: 16, fontWeight: 500, color: '#03294A', textAlign: 'center', padding: '0 10px' }}
        >
          {`${currentNotify?.locationName || '--'} - Địa chỉ: ${currentNotify?.notificationText || '--'}`}
        </DialogContentText>
        <DialogContentText
          style={{ fontSize: 16, fontWeight: 500, color: '#03294A', textAlign: 'center', padding: '0 10px' }}
        >
          Yêu cầu kiểm tra xử lý!
        </DialogContentText>
        <DialogContentText style={{ color: '#BDBDBD', textAlign: 'center', fontSize: 12 }}>
          {currentNotify ? dayjs(currentNotify.timestamp).format('HH:mm:ss DD/MM/YYYY') : '--'}
        </DialogContentText>
        <Box display="flex" justifyContent="center" mt={1}>
          <Button style={{ margin: '4px' }} color="primary" variant="outlined" onClick={handleProcessed}>
            ĐÃ XỬ LÝ
          </Button>
          <Button style={{ margin: '4px' }} color="primary" variant="contained" onClick={handleRoute}>
            XEM CHI TIẾT
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
