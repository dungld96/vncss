import React, { useRef, useState } from 'react';
import styled from '@emotion/styled';
import { Avatar, Stack } from '@mui/material';
import DefaultAvatar from '../../assets/img/avatar.svg';

import CameraAltIcon from '@mui/icons-material/CameraAlt';
import ModalProfileUser from './ModalProfileUser';
import ModalProfileStore from './ModalProfileStore';
import ModalChangePassword from './ModalChangePassword';
import { useAuth } from 'hooks/useAuth';
import { IUser } from 'services/auth.service';
import { useGetCurrentArgencyQuery } from 'services/agencies.service';
import { CurrentUserRequestInterface } from 'services/users.service';

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
  const [modalUser, setModalUser] = useState({
    show: false,
    initialValues: { uuid: '', firstName: '', lastName: '', email: '', phone: '' },
  });
  const [modalStore, setModalStore] = useState({ show: false, initialValues: { id: '', name: '', address: '' } });
  const [modalChangePass, setModalChangePass] = useState({ show: false });

  const {
    auth: { currentUser },
  } = useAuth() as any;

  const { data: agency } = useGetCurrentArgencyQuery({ id: currentUser?.agency_id });

  const currentAgency: any = agency?.data?.agency;

  const showModalUser = () => {
    setModalUser({
      show: true,
      initialValues: {
        uuid: currentUser.uuid,
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
        phone: currentUser.phone,
      },
    });
  };

  const showModalStore = () => {
    setModalStore({
      show: true,
      initialValues: {
        id: currentAgency.id,
        name: currentAgency.name,
        address: currentAgency.address,
      },
    });
  };

  return (
    <>
      <ModalProfileUser {...modalUser} onClose={() => setModalUser({ ...modalUser, show: false })} />
      <ModalProfileStore {...modalStore} onClose={() => setModalStore({ ...modalStore, show: false })} />
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
            <FullName>{currentUser?.name}</FullName>
          </Stack>
          <ProfileInfor>
            <InforUser>
              <RenderTitle title={'Thông tin'} action={showModalUser} />
              <RenderInfor label="Tên đăng nhập" infor={currentUser?.username} />
              <RenderInfor label="Tên người sử dụng" infor={currentUser?.name} />
              <RenderInfor label="Email" infor={currentUser?.email} />
              <RenderInfor label="Số điện thoại" infor={currentUser?.phone} />
              <RenderInfor
                label="Mật khẩu"
                infor="Thay đổi mật khẩu"
                action={() => setModalChangePass({ show: true })}
              />
            </InforUser>
            <SeperateLine />
            <InforUser>
              <RenderTitle title={'Thông tin'} action={showModalStore} />
              <RenderInfor label="Tên cửa hàng" infor={currentAgency?.name || ''} />
              <RenderInfor label="Địa chỉ" infor={currentAgency?.address || ''} />
              <RenderInfor label="Level" infor={currentAgency?.level} />
              <RenderInfor
                label="Trạng thái"
                infor={currentAgency?.status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
              />
            </InforUser>
          </ProfileInfor>
        </ProfileWrapper>
      </ProfileContainer>
    </>
  );
};

export default Profile;
