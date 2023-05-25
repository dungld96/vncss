import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import styled from '@emotion/styled';
import Button from 'common/button/Button';
import Success from '../../assets/img/Success.svg';
import Failed from '../../assets/img/Failed.svg';
import Warning from '../../assets/img/Warning.svg';
import { ModalConfirmState } from '../../state/modules/modalConfirm/reducer';

const DialogWrapper = styled.div({
  alignItems: 'center',
  padding: '40px 48px',
});
const Title = styled(DialogTitle)({
  fontStyle: 'normal',
  fontWeight: '700',
  fontSize: '24px',
  lineHeight: '36px',
  textAlign: 'center',
  color: '#1E2323',
  padding: 0,
});
const Content = styled(DialogContent)({
  marginTop: 24,
  fontWeight: '400',
  fontSize: '16px',
  lineHeight: '24px',
  textAlign: 'center',
  color: '#52535C',
  padding: 0,
});
const Action = styled(DialogActions)({
  display: 'flex',
  alignItems: 'center',
  padding: 0,
  marginTop: 32,
});

const IconStatus = styled.img({
  width: '80px',
});

const IconStatusWrapper = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: 20,
});

const ModalConfirm: React.FC<ModalConfirmState> = (props) => {
  const { show = false, title, content, confirm, cancel, type } = props;
  const renderIcon = () => {
    switch (type) {
      case 'success':
        return <IconStatus src={Success} />;
      case 'warning':
        return <IconStatus src={Warning} />;
      case 'failed':
        return <IconStatus src={Failed} />;
      default:
        return null;
    }
  };

  return (
    <Dialog
      open={show}
      maxWidth="xs"
      sx={{
        '.MuiPaper-root': {
          borderRadius: '12px',
          maxWidth: '392px',
          width:'392px'
        },
      }}
    >
      <DialogWrapper>
        <IconStatusWrapper>{renderIcon()}</IconStatusWrapper>
        <Title>{title}</Title>
        <Content>{content}</Content>
        <Action>
          {!!cancel && (
            <Button fullWidth color="primary" variant="outlined" onClick={cancel?.action}>
              {cancel?.text || 'Quay lại'}
            </Button>
          )}
          <Button fullWidth color="primary" variant="contained" onClick={confirm?.action}>
            {confirm?.text || 'Đã hiểu'}
          </Button>
        </Action>
      </DialogWrapper>
    </Dialog>
  );
};

export default ModalConfirm;
