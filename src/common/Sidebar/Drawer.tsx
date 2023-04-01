import { useState, ReactNode } from 'react';
import { Box, Drawer, List, ListItemIcon, ListItem, Icon, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ROUTE_HOME, ROUTE_REGULATORY_AGENCY, ROUTE_USER } from '../../utils/routesMap';
import RegulatoryAgencyIcon from '../../assets/icons/regulatory_agency.svg';
import dashboardIcon from '../../assets/icons/dashboard-icon.svg';
import usersIcon from '../../assets/icons/users.svg';
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
    route: ROUTE_HOME,
  },
  {
    id: '68d536e2-eff0-4388-84ad-739c31867c8b',
    title: 'Cơ quan quản lý',
    icon: imageIcon(RegulatoryAgencyIcon),
    permission: ['regulatory_agency'],
    route: ROUTE_REGULATORY_AGENCY,
  },
  {
    id: '11115061-4494-4bdc-8a6e-5a59aadec58f',
    title: 'Nhân viên',
    icon: imageIcon(usersIcon),
    permission: ['users'],
    route: ROUTE_USER,
  },
];

interface Props {
  open?: boolean;
}
export default function DrawerSidebar({ open }: Props) {
  const [expanded, setExpanded] = useState([]);
  const [hovering, setHovering] = useState(false);
  const navigate = useNavigate();

  const handleMouseEnterChild = () => {
    setHovering(true);
  };
  const handleMouseLeaveChild = () => {
    setHovering(false);
  };

  const onClickDrawerItem = (item: {
    id: string;
    title: string;
    icon: ReactNode;
    permission: string[];
    route: string;
  }) => {
    const route = item.route;
    navigate(route);
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
          {listFeature.map((item) => (
            <List key={item.id} component="div" disablePadding>
              <ListItem button onClick={() => onClickDrawerItem(item)}>
                <ListItemIcon sx={{ color: '#8F0A0C', minWidth: 40 }}>{item.icon}</ListItemIcon>
                <ListItemText sx={{ color: '#8F0A0C' }} primary={item.title}></ListItemText>
              </ListItem>
            </List>
          ))}
        </Box>
      </Drawer>
    </Box>
  );
}
