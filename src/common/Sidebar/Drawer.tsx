import { useState, ReactNode } from 'react';
import { Box, Drawer, List, ListItemIcon, ListItem, ListItemText } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { ImageIcon } from '../../utils/UtilsComponent';
import {
  DEPLOY_LOCATION,
  MONITOR_DEPARTMENT,
  ROUTE_AGENCY,
  ROUTE_HOME,
  ROUTE_REGULATORY_AGENCY,
  ROUTE_REPORTS,
  ROUTE_USER,
  ROUTE_VEHICLE_PROTECT,
  ROUTE_VITAL_VEHICLE,
  ROUTE_WAREHOUSE_NODE,
  ROUTE_WAREHOUSESIM,
  ROUTE_WAREHOUSE_GATEWAY,
} from '../../utils/routesMap';
import RegulatoryAgencyIcon from '../../assets/icons/regulatory-agency-icon.svg';
import RegulatoryAgencyActiveIcon from '../../assets/icons/regulatory-agency-active-icon.svg';
import dashboardIcon from '../../assets/icons/dashboard-icon.svg';
import dashboardActiveIcon from '../../assets/icons/dashboard-active-icon.svg';
import agencyIcon from '../../assets/icons/agency-icon.svg';
import agencyActiveIcon from '../../assets/icons/agency-active-icon.svg';
import usersIcon from '../../assets/icons/users-icon.svg';
import usersActiveIcon from '../../assets/icons/users-active-icon.svg';
import reportsIcon from '../../assets/icons/report-icon.svg';
import reportsActiveIcon from '../../assets/icons/report-active-icon.svg';
import simIcon from '../../assets/icons/sim-icon.svg';
import simActiveIcon from '../../assets/icons/sim-active-icon.svg';
import vehicleVitalIcon from '../../assets/icons/vehicle-vital-icon.svg';
import vehicleVitalActiveIcon from '../../assets/icons/vehicle-vital-active-icon.svg';
import CarProtectIcon from '../../assets/icons/car-protect-icon.svg';
import CarProtectActiveIcon from '../../assets/icons/car-protect-active-icon.svg';
import MonitorDepartmentIcon from '../../assets/icons/monitor-department-icon.svg';
import MonitorDepartmentActiveIcon from '../../assets/icons/monitor-department-active-icon.svg';
import MapIcon from '../../assets/icons/map-icon.svg';
import MapActiveIcon from '../../assets/icons/map-active-icon.svg';
import NodeIcon from '../../assets/icons/node-icon.svg';
import NodeActiveIcon from '../../assets/icons/node-active-icon.svg';
import GatewayIcon from '../../assets/icons/gateway-icon.svg';
import GatewayActiveIcon from '../../assets/icons/gateway-icon-active.svg';
import LogoSmall from '../../assets/img/logo-small.svg';
import Logo from '../../assets/img/logo.svg';

interface IRouteItem {
  id: string;
  title: string;
  icon: ReactNode;
  activeIcon: ReactNode;
  permission: string[];
  route: string;
}

const listFeature = [
  {
    id: '31cbc275-67f2-44e9-9c86-4ecbf1e84459',
    title: 'Thống kê',
    icon: <ImageIcon image={dashboardIcon} />,
    activeIcon: <ImageIcon image={dashboardActiveIcon} />,
    permission: ['overview'],
    route: ROUTE_HOME,
  },
  {
    id: '68d536e2-eff0-4388-84ad-739c31867c8b',
    title: 'Cơ quan quản lý',
    icon: <ImageIcon image={RegulatoryAgencyIcon} />,
    activeIcon: <ImageIcon image={RegulatoryAgencyActiveIcon} />,
    permission: ['regulatory_agency'],
    route: ROUTE_REGULATORY_AGENCY,
  },
  {
    id: '68d536e2-eff0-4388-84ad-739c31867coo',
    title: 'Đơn vị giám sát',
    icon: <ImageIcon image={MonitorDepartmentIcon} />,
    activeIcon: <ImageIcon image={MonitorDepartmentActiveIcon} />,
    permission: ['monitor_department'],
    route: MONITOR_DEPARTMENT,
  },
  {
    id: '68d536e2-eff0-4388-84ad-739c31867cpp',
    title: 'Vị trí triển khai',
    icon: <ImageIcon image={MapIcon} />,
    activeIcon: <ImageIcon image={MapActiveIcon} />,
    permission: ['deploy_location'],
    route: DEPLOY_LOCATION,
  },
  {
    id: '11115061-4494-4bdc-8a6e-5a59aadec58f',
    title: 'Nhân viên',
    icon: <ImageIcon image={usersIcon} />,
    activeIcon: <ImageIcon image={usersActiveIcon} />,
    permission: ['users'],
    route: ROUTE_USER,
  },
  {
    id: '11115061-4494-4bdc-8a6e-5a59aadec5ii',
    title: 'Kho Gateway',
    icon: <ImageIcon image={GatewayIcon} />,
    activeIcon: <ImageIcon image={GatewayActiveIcon} />,
    permission: ['warehouse-gateway'],
    route: ROUTE_WAREHOUSE_GATEWAY,
  },
  {
    id: '11115061-4494-4bdc-8a6e-5a59aadec500',
    title: 'Kho Node',
    icon: <ImageIcon image={NodeIcon} />,
    activeIcon: <ImageIcon image={NodeActiveIcon} />,
    permission: ['warehouse-node'],
    route: ROUTE_WAREHOUSE_NODE,
  },
  {
    id: '0b2e42ed-00f9-4dbe-a1d3-37b76f2671a5',
    title: 'Đại lý',
    icon: <ImageIcon image={agencyIcon} />,
    activeIcon: <ImageIcon image={agencyActiveIcon} />,
    permission: ['agency'],
    route: ROUTE_AGENCY,
  },
  {
    id: '0b2e42ed-00f9-4dbe-a1d3-37b76f2671cc',
    title: 'Phương tiện tuần tra',
    icon: <ImageIcon image={vehicleVitalIcon} />,
    activeIcon: <ImageIcon image={vehicleVitalActiveIcon} />,
    permission: [''],
    route: ROUTE_VITAL_VEHICLE,
  },
  {
    id: '0b2e42ed-00f9-4dbe-a1d3-37b76f2671aa',
    title: 'Phương tiện trọng yếu',
    icon: <ImageIcon image={CarProtectIcon} />,
    activeIcon: <ImageIcon image={CarProtectActiveIcon} />,
    permission: [''],
    route: ROUTE_VEHICLE_PROTECT,
  },
  {
    id: '0b2e42ed-00f9-4dbe-a1d3-37b76f2671ff',
    title: 'Kho Sim',
    icon: <ImageIcon image={simIcon} />,
    activeIcon: <ImageIcon image={simActiveIcon} />,
    permission: ['warehouse-sim'],
    route: ROUTE_WAREHOUSESIM,
  },
  {
    id: '0b2e42ed-00f9-4dbe-a1d3-37b76f2671ss',
    title: 'Báo cáo',
    icon: <ImageIcon image={reportsIcon} />,
    activeIcon: <ImageIcon image={reportsActiveIcon} />,
    permission: ['report'],
    route: ROUTE_REPORTS,
  },
];

interface Props {
  open?: boolean;
}
export default function DrawerSidebar({ open }: Props) {
  const [expanded, setExpanded] = useState([]);
  const [hovering, setHovering] = useState(false);
  const navigate = useNavigate();
  const localtion = useLocation();

  const handleMouseEnterChild = () => {
    setHovering(true);
  };
  const handleMouseLeaveChild = () => {
    setHovering(false);
  };

  const onClickDrawerItem = (item: IRouteItem) => {
    const route = item.route;
    navigate(route);
  };

  const highlighting = (item: IRouteItem) => {
    // const subItemIds = _.get(item, 'subItems', []).map((subitem) => subitem.id);
    // if (!open && !hovering && _.includes(subItemIds, currentRouteId)) {
    //   return true;
    // }
    return item.route === localtion.pathname;
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
            width: open || hovering ? 240 : 60,
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
            boxShadow: open || hovering ? '0px 24px 40px rgba(2, 8, 61, 0.12)' : 'none',
            // boxShadow: '6px 0px 18px rgba(0, 0, 0, 0.06)',
            // boxShadow: '0px 24px 40px rgba(2, 8, 61, 0.12)',

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
              <ListItem
                button
                onClick={() => onClickDrawerItem(item)}
                style={{
                  backgroundColor: highlighting(item) ? '#FFF3F4' : '',
                  borderLeft: highlighting(item) ? '4px solid #A53B3D' : '',
                  padding: highlighting(item) ? '12px 16px' : '12px 16px 12px 20px',
                }}
              >
                <ListItemIcon sx={{ color: '#8B8C9B', minWidth: 40 }}>
                  {highlighting(item) ? item.activeIcon : item.icon}
                </ListItemIcon>
                <ListItemText
                  sx={{
                    color: highlighting(item) ? '#8F0A0C' : '#8B8C9B',
                    fontWeight: '500 !important',
                    fontSize: '14px !important',
                  }}
                  primary={item.title}
                  primaryTypographyProps={{
                    sx: {
                      color: highlighting(item) ? '#8F0A0C' : '#8B8C9B',
                      fontWeight: '500 !important',
                      fontSize: '14px !important',
                    },
                  }}
                ></ListItemText>
              </ListItem>
            </List>
          ))}
        </Box>
      </Drawer>
    </Box>
  );
}
