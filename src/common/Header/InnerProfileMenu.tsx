import {
  ListSubheader,
  Avatar,
  Button,
  Box,
  Divider,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { Logout as LogoutIcon } from '@mui/icons-material';
import avatarEx from '../../assets/img/avatar-ex.png';
import { useAuth } from '../../hooks/useAuth';

interface Props {
  handleLogout: () => void;
  goProfile: () => void;
}

export const InnerProfileMenu = ({ handleLogout, goProfile }: Props) => {
  const {
    auth: { currentUser },
  } = useAuth();

  return (
    <>
      <ListSubheader key="header" sx={{ display: 'flex' }}>
        <Box pr={2}>
          <Avatar src={avatarEx} />
        </Box>
        <Box display="flex" flexDirection="column" alignItems="left">
          <Typography variant="body2">
            {currentUser?.first_name ? `${currentUser?.first_name} ${currentUser?.last_name}` : currentUser?.username}
          </Typography>
          <Typography variant="caption">{currentUser?.role}</Typography>
          <Box pt="6px" pb="12px">
            <Button variant="contained" color="primary" onClick={goProfile}>
              Thông tin tài khoản
            </Button>
          </Box>
        </Box>
      </ListSubheader>
      <Divider />
      <MenuItem key="logout" onClick={handleLogout}>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary="Log out" />
      </MenuItem>
    </>
  );
};
