import * as React from 'react';
import { Box, AppBar, Toolbar, Typography, IconButton, Avatar, Menu } from '@mui/material';
import AvatarImage from '../../assets/img/avatar-ex.png';
import { InnerProfileMenu } from './InnerProfileMenu';
export default function AppBarHeader() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          width: 'auto',
          backgroundColor: '#ffffff',
          marginLeft: '56px',
          boxShadow: '1px 0 8px 0 rgba(0, 0, 0, 0.1),0 2px 5px 0 rgba(0, 0, 0, 0.1)!important',
        }}
      >
        <Toolbar>
          <Typography
            component="h1"
            variant="h6"
            sx={{ flexGrow: 1, textTransform: 'uppercase', color: '#8F0A0C', fontSize: 18, fontWeight: 600 }}
          >
            Hệ thông an ninh tập trung Việt Nam
          </Typography>
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
              <InnerProfileMenu />
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
