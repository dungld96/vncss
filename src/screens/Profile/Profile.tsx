import React, { useRef,useState } from 'react';
import styled from '@emotion/styled';
import { Avatar, Stack } from '@mui/material';
import DefaultAvatar from '../../assets/img/avatar.svg';

import CameraAltIcon from '@mui/icons-material/CameraAlt';
import ModalProfileUser from './ModalProfileUser';
import ModalProfileStore from './ModalProfileStore';
import MadalChangPassword from './MadalChangPassword';

const ProfileContainer = styled.div({
  width: '100%',
  background:'#FFFFFF',
  height:'100%'
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
    maxHeight:'270px'
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
    margin:0,
  },
  '& .infor': {
    fontWeight: '700',
    fontSize: '14px',
    lineHeight: '22px',
    margin:0,
    color: '#1E2323',
    '&.button': {
      cursor:'pointer',
      color:'#8F0A0C'
    }
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
  const [modalUser,setModalUser] = useState({show:false})
  const [modalStore,setModalStore] = useState({show:false})
  const [modalChangePass,setModalChangePass] = useState({show:false})

  return (
    <>
    <ModalProfileUser {...modalUser} onClose={() => setModalUser({show:false})} />
    <ModalProfileStore {...modalStore} onClose={() => setModalStore({show:false})} />
    <MadalChangPassword {...modalChangePass} onClose={() => setModalChangePass({show:false})} />
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
        <ProfileInfor>
          <InforUser>
            <RenderTitle title={'Thông tin'} action={() => setModalUser({show:true})} />
            <RenderInfor label='Tên đăng nhập' infor='Admin' />
            <RenderInfor label='Tên người sử dụng' infor='Thomas Nguyen' />
            <RenderInfor label='Email' infor='Admin@email.com' />
            <RenderInfor label='Số điện thoại' infor='0988488999' />
            <RenderInfor label='Mật khẩu' infor='Thay đổi mật khẩu' action={() => setModalChangePass({show:true})} />
          </InforUser>
          <SeperateLine />
          <InforUser>
            <RenderTitle title={'Thông tin'} action={() => setModalStore({show:true})} />
            <RenderInfor label='Tên cửa hàng' infor='Nhà phân phối' />
            <RenderInfor label='Địa chỉ' infor='Hà Nội, Việt Nam' />
            <RenderInfor label='Level' infor='01' />
            <RenderInfor label='Trạng thái' infor='Hoạt động' />
          </InforUser>
        </ProfileInfor>
      </ProfileWrapper>
    </ProfileContainer>
    </>
  );
};

export default Profile;
