import * as React from 'react';
import { Box, AppBar, Toolbar, Typography, IconButton, Avatar, Menu } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

import AvatarImage from '../../assets/img/avatar-ex.png';
import VNLang from '../../assets/icons/vietnam.svg';
import { InnerProfileMenu } from './InnerProfileMenu';
import { logout } from '../../state/modules/auth/authReducer';
import { useAppDispatch } from '../../state/store';
import { Notifier } from '../../common/notifier/Notifer';
import { unRegisterServiceWorker } from '../../serviceWorker';
import { useUnSubNotificationMutation } from '../../services/notifications.service';
import { useAuth } from '../../hooks/useAuth';
import { routeTitle } from '../../utils/routesMap';

export default function AppBarHeader({ fcmToken }: { fcmToken?: string }) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [unSubNotification] = useUnSubNotificationMutation();
  const {
    auth: { currentUser },
  } = useAuth();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    unRegisterServiceWorker();
    if (currentUser && fcmToken) {
      unSubNotification({ data: { token: fcmToken } }).then(() => {
        dispatch(logout);
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('current_user');
        navigate('/login');
        window.location.reload();
      });
      return;
    }
    dispatch(logout);
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('current_user');
    navigate('/login');
  };

  const goProfile = () => {
    navigate('/profile');
  };

  const path = location.pathname;
  const route = path.split('/')[1];
  const routeTitleList = routeTitle as any;
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          width: 'auto',
          backgroundColor: '#ffffff',
          marginLeft: '56px',
          boxShadow: 'none',
          // boxShadow: '1px 0 8px 0 rgba(0, 0, 0, 0.1),0 2px 5px 0 rgba(0, 0, 0, 0.1)!important',
        }}
      >
        <Toolbar>
          <Box flexGrow={1}>
            <Typography sx={{ textTransform: 'uppercase', color: '#8B8C9B', fontSize: 14, fontWeight: 500 }}>
              Hệ thống an ninh tập trung Việt Nam
            </Typography>
            <Typography
              sx={{ textTransform: 'uppercase', color: '#E13153', fontSize: 18, fontWeight: 700, lineHeight: '28px' }}
            >
              {routeTitleList[route]}
            </Typography>
          </Box>
          <Box mr={2}>
            <Notifier />
          </Box>
          <Box mr={1}>
            <IconButton edge="end" color="inherit" aria-label="open drawer">
              <Avatar src={VNLang} style={{ height: 30, width: 30 }} />
            </IconButton>
          </Box>
          <Box>
            <IconButton edge="end" color="inherit" aria-label="open drawer" onClick={handleMenu}>
              <Avatar src={AvatarImage} sx={{ height: 30, width: 30, border: '1px solid #8f0a0c' }} />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <InnerProfileMenu handleLogout={handleLogout} goProfile={goProfile} />
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
