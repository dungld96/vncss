import styled from '@emotion/styled';
import { Avatar, Stack } from '@mui/material';
import React, { useRef, useState } from 'react';
import DefaultAvatar from '../../assets/img/avatar.svg';

import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { useAuth } from '../../hooks/useAuth';
import ModalChangePassword from './ModalChangePassword';
import ModalProfileStore from './ModalProfileStore';
import ModalProfileUser from './ModalProfileUser';
import { UpdateCurrentUserRequestInterface } from '../../services/users.service';

const ProfileContainer = styled.div({
  width: '100%',
  background: '#FFFFFF',
  height: '100%',
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
  margin: 0,
  marginTop: '30px',
});

const ProfileInfor = styled.div({
  marginTop: '100px',
  display: 'flex',
  justifyContent: 'space-between',
});

const InforUser = styled.div({
  width: '384px',
  maxWidth: '384px',
});
const SeperateLine = styled.div({
  border: '0.5px solid #EEF2FA',
  maxHeight: '270px',
});

const Title = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '40px',
  '& p': {
    fontSize: '20px',
    fontWeight: '700',
    margin: 0,
    color: '#52535C',
  },
  '& button': {
    fontFamily: 'Roboto',
    border: 'none',
    background: 'none',
    outline: 'none',
    color: '#8F0A0C',
    fontSize: '14px',
    lineHeight: '22px',
    fontWeight: '500',
    cursor: 'pointer',
  },
});

const LabelInfor = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '32px',
  '& .label': {
    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '22px',
    color: '#8B8C9B',
    margin: 0,
  },
  '& .infor': {
    fontWeight: '700',
    fontSize: '14px',
    lineHeight: '22px',
    margin: 0,
    color: '#1E2323',
    '&.button': {
      cursor: 'pointer',
      color: '#8F0A0C',
    },
  },
});

const RenderTitle = ({ title, action }: { title: string; action: () => void }) => {
  return (
    <Title>
      <p>{title}</p>
      <button onClick={() => action()}>Chỉnh sửa</button>
    </Title>
  );
};

const RenderInfor = ({ label, infor, action }: { label: string; infor: string; action?: () => void }) => {
  return (
    <LabelInfor>
      <p className="label">{label}</p>
      <p className={`infor ${action ? 'button' : ''}`} onClick={() => action?.()}>
        {infor}
      </p>
    </LabelInfor>
  );
};

const Profile: React.FC = () => {
  const inputRef = useRef<any>();
  const [showModalUser, setShowtModalUser] = useState(false);
  const [showModalStore, setShowModalStore] = useState(false);
  const [modalChangePass, setModalChangePass] = useState({ show: false });
  const {
    auth: { currentUser, currentAgency },
  } = useAuth();

  const initialUserValues = {
    id: currentUser?.id ?? '',
    first_name: currentUser?.first_name ?? '',
    last_name: currentUser?.last_name ?? '',
    email: currentUser?.email ?? '',
    phone: currentUser?.phone ?? '',
  };
  const initialAgencyValues = {
    id: currentAgency?.id ?? '',
    name: currentAgency?.name ?? '',
    address: currentAgency?.address ?? '',
  };

  const showModalUserClick = () => {
    setShowtModalUser(true);
  };

  const showModalStoreClick = () => {
    setShowModalStore(true);
  };

  return (
    <>
      <ModalProfileUser
        show={showModalUser}
        onClose={() => setShowtModalUser(false)}
        initialValues={initialUserValues}
      />
      <ModalProfileStore
        show={showModalStore}
        onClose={() => setShowModalStore(false)}
        initialValues={initialAgencyValues}
      />
      <ModalChangePassword {...modalChangePass} onClose={() => setModalChangePass({ show: false })} />
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
                    width: '60%',
                    height: '60%',
                    borderRadius: '50%',
                    color: '#144DD1',
                  }}
                />
              </IconChange>
              <input ref={inputRef} type="file" accept="image/x-png,image/jpeg" style={{ display: 'none' }} />
            </AvatarWrapper>
            <FullName>{`${currentUser?.first_name} ${currentUser?.last_name}`}</FullName>
          </Stack>
          <ProfileInfor>
            <InforUser>
              <RenderTitle title={'Thông tin'} action={showModalUserClick} />
              <RenderInfor label="Tên đăng nhập" infor={currentUser?.username || '--'} />
              <RenderInfor label="Tên người sử dụng" infor={`${currentUser?.first_name} ${currentUser?.last_name}`} />
              <RenderInfor label="Email" infor={currentUser?.email || '--'} />
              <RenderInfor label="Số điện thoại" infor={currentUser?.phone || '--'} />
              <RenderInfor
                label="Mật khẩu"
                infor="Thay đổi mật khẩu"
                action={() => setModalChangePass({ show: true })}
              />
            </InforUser>
            <SeperateLine />
            <InforUser>
              <RenderTitle title={'Thông tin'} action={showModalStoreClick} />
              <RenderInfor label="Tên cửa hàng" infor={currentAgency?.name || ''} />
              <RenderInfor label="Địa chỉ" infor={currentAgency?.address || ''} />
              <RenderInfor label="Level" infor={`${currentAgency?.level}` || '--'} />
              <RenderInfor label="Trạng thái" infor={currentAgency?.active ? 'Hoạt động' : 'Không hoạt động'} />
            </InforUser>
          </ProfileInfor>
        </ProfileWrapper>
      </ProfileContainer>
    </>
  );
};

export default Profile;
