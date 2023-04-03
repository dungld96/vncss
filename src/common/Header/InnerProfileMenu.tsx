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

interface Props {
  handleLogout: () => void;
  goProfile: () => void;
}

export const InnerProfileMenu = ({ handleLogout, goProfile }: Props) => {
  return (
    <>
      <ListSubheader key="header" sx={{ display: 'flex' }}>
        <Box pr={2}>
          <Avatar src={avatarEx} />
        </Box>
        <Box display="flex" flexDirection="column" alignItems="left">
          <Typography variant="body2">Super Admin</Typography>
          <Typography variant="caption">admin</Typography>
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
