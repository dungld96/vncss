import React, { useRef } from 'react';
import styled from '@emotion/styled';
import { Avatar, Stack } from '@mui/material';
import DefaultAvatar from '../../assets/img/avatar.svg';

import CameraAltIcon from '@mui/icons-material/CameraAlt';

const ProfileContainer = styled.div({
  width: '100%',
});

const ProfileWrapper = styled.div({
  maxWidth: 968,
  margin: '0 auto',
});

const AvatarWrapper = styled.div({
  width: '120px',
  height: '120px',
  position: 'relative',
  marginTop: '36px',
});
const IconChange = styled.div({
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  background: '#fff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  position: 'absolute',
  bottom: '0',
  right: '5px',
});

const FullName = styled.h2({
  fontWeight: '700',
  fontSize: '24px',
  lineHeight: '36px',
  display: 'flex',
  aligItems: 'center',
});

const Profile: React.FC = () => {
  const inputRef = useRef<any>();

  return (
    <ProfileContainer>
      <ProfileWrapper>
        <Stack flexDirection="column" justifyContent="center" alignItems="center">
          <AvatarWrapper>
            <Avatar
              src={DefaultAvatar}
              sx={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
              }}
            />
            <IconChange onClick={() => inputRef.current.click()}>
              <CameraAltIcon
                sx={{
                  color: '#144DD1',
                  fontSize: '20px',
                }}
              />
            </IconChange>
            <input ref={inputRef} type="file" accept="image/x-png,image/jpeg" style={{ display: 'none' }} />
          </AvatarWrapper>
          <FullName>Thomas Nguyen</FullName>
        </Stack>
      </ProfileWrapper>
    </ProfileContainer>
  );
};

export default Profile;
