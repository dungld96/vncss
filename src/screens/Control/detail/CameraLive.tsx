import { useEffect, useRef, useState, useCallback } from 'react';
import { Box } from '@mui/material';
import dayjs from 'dayjs';
import SoNamPlayer from '../../../assets/libs/SoNam/SoNamPlayer.oc';

export const CameraLive = () => {
  const [message, setMessage] = useState('cam2');
  const [event, setEvent] = useState('');
  const sonamPlayerRef = useRef<SoNamPlayer>();
  const wsEventRef = useRef<WebSocket>();

  const handlePlay = useCallback(() => {
    if (!message) {
      alert('Url not null!');
      return;
    }
    //init player
    if (sonamPlayerRef.current) sonamPlayerRef.current.stop();
    const ws_server = 'wss://vnt.sonam.vn';
    const ws_url = `${ws_server}/evup/${Date.now()}/${message}`;
    sonamPlayerRef.current = new SoNamPlayer('sonam-camera', { transport: ws_url });
    //handle event
    const ws_event_url = `${ws_server}/event/${Date.now()}/all`;
    wsEventRef.current = new WebSocket(ws_event_url);

    wsEventRef.current.onmessage = (msg) => {
      const event_data = JSON.parse(msg.data);
      if (event_data.motionType === 'START_DETECTED') {
        setEvent(
          `Phát hiện chuyển động tại Cam: ${event_data.camId}, IP: ${event_data.ip}, Thời điểm: ${dayjs(
            event_data.time
          ).format('DD-MM-YYYY HH:mm:ss')}`
        );
      } else {
        setEvent(
          `Kết thúc chuyển động tại Cam: ${event_data.camId}, IP: ${event_data.ip}, Thời điểm: ${dayjs(
            event_data.time
          ).format('DD-MM-YYYY HH:mm:ss')}`
        );
      }
    };
  }, [message]);

  useEffect(() => {
    handlePlay();
    return () => {
      sonamPlayerRef.current?.stop();
      wsEventRef.current?.close();
    };
  }, [handlePlay]);

  return (
    <Box>
      <video id="sonam-camera" width="100%" controls autoPlay src="" muted></video>
    </Box>
  );
};
