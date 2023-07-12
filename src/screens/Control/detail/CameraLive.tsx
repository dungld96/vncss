import { useEffect, useRef, useState, useCallback } from 'react';
import { Box } from '@mui/material';
import SoNamPlayer from '../../../assets/libs/SoNam/SoNamPlayer.oc';
import { ControlLocationCameraType } from '../../../services/control.service';

export const CameraLive = ({ camera }: { camera: ControlLocationCameraType }) => {
  const sonamPlayerRef = useRef<SoNamPlayer>();

  const handlePlay = useCallback(() => {
    if (!camera) {
      alert('Camera not null!');
      return;
    }
    //init player
    if (sonamPlayerRef.current) sonamPlayerRef.current.stop();
    sonamPlayerRef.current = new SoNamPlayer('sonam-camera', { transport: camera.websocketstream });
  }, [camera]);

  useEffect(() => {
    handlePlay();
    return () => {
      sonamPlayerRef.current?.stop();
    };
  }, [handlePlay]);

  return (
    <Box pl={1}>
      <video id="sonam-camera" width="100%" controls autoPlay src="" muted></video>
    </Box>
  );
};
