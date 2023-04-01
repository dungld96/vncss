import { useState } from 'react';
import { Box, Drawer, List, ListItemIcon, ListItem, Icon, ListItemText } from '@mui/material';
import RegulatoryAgencyIcon from '../../assets/icons/regulatory_agency.svg';
import dashboardIcon from '../../assets/icons/dashboard-icon.svg';
import LogoSmall from '../../assets/img/logo-small.svg';
import Logo from '../../assets/img/logo.svg';

const imageIcon = (image: string) => {
  return (
    <Icon sx={{ width: '0.85em', height: '0.85em' }}>
      <img style={{ width: '100%', position: 'relative', top: '-4px' }} src={image} alt="" />
    </Icon>
  );
};

const listFeature = [
  {
    id: '31cbc275-67f2-44e9-9c86-4ecbf1e84459',
    title: 'Thống kê',
    icon: imageIcon(dashboardIcon),
    permission: ['overview'],
    // route: ROUTE_HOME,
  },
  {
    id: '68d536e2-eff0-4388-84ad-739c31867c8b',
    title: 'Cơ quan quản lý',
    icon: imageIcon(RegulatoryAgencyIcon),
    permission: ['regulatory_agency'],
    // route: ROUTE_CATEGORIES,
  },
];

interface Props {
  open?: boolean;
}
export default function DrawerSidebar({ open }: Props) {
  const [expanded, setExpanded] = useState([]);
  const [hovering, setHovering] = useState(false);
  const handleMouseEnterChild = () => {
    setHovering(true);
  };
  const handleMouseLeaveChild = () => {
    setHovering(false);
  };
  return (
    <Box>
      <Drawer
        onMouseEnter={handleMouseEnterChild}
        onMouseLeave={handleMouseLeaveChild}
        variant="permanent"
        open={open || hovering}
        PaperProps={{
          sx: {
            position: 'fixed',
            whiteSpace: 'nowrap',
            width: open || hovering ? 240 : 56,
            transition: (theme) =>
              theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration:
                  open || hovering
                    ? theme.transitions.duration.leavingScreen
                    : theme.transitions.duration.enteringScreen,
              }),
            borderRight: 'none !important',
            zIndex: 1202,
            boxShadow: '6px 0px 18px rgba(0, 0, 0, 0.06)',
            overflowX: open || hovering ? '' : 'hidden',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 10px',
            backgroundColor: '#ffffff',
            color: 'white',
            boxShadow: 'none',
            minHeight: '100px !important',
          }}
        >
          <Box display="table" maxWidth="80px">
            {open || hovering ? (
              <img src={Logo} alt="VNCSS" style={{ width: '100%' }} />
            ) : (
              <img src={LogoSmall} alt="VNCSS" style={{ width: '100%' }} />
            )}
          </Box>
        </Box>
        <Box sx={{ height: '100%', backgroundColor: '#ffffff', paddingTop: '10px' }}>
          {listFeature.map(({ id, icon, title }) => (
            <List key={id} component="div" disablePadding>
              <ListItem button>
                <ListItemIcon sx={{ color: '#8F0A0C', minWidth: 40 }}>{icon}</ListItemIcon>
                <ListItemText sx={{ color: '#8F0A0C' }} primary={title}></ListItemText>
              </ListItem>
            </List>
          ))}
        </Box>
      </Drawer>
    </Box>
  );
}
