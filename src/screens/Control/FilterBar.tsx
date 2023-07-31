import React from 'react';
import { ListItem, ListItemIcon, ListItemText, Box, Icon, Tooltip } from '@mui/material';
import { ExpandLess as ExpandLessIcon } from '@mui/icons-material';
import Gateway from '../../assets/icons/product-icon-filter.svg';

export const locationStatus = ['Hoạt động', 'Đang cảnh báo', 'Lỗi cảm biến', 'Mất kết nối'];

export const FilterBar = ({
  locationListLength,
  filterExpand,
  onStatusClick,
  onFilterExpandClick,
  isFitering,
}: {
  locationListLength: any;
  filterExpand: boolean;
  isFitering: boolean;
  onStatusClick: () => void;
  onFilterExpandClick: () => void;
}) => {
  return (
    <Box
      style={{
        display: 'flex',
        height: 48,
        minWidth: filterExpand ? 670 : 450,
        boxShadow: filterExpand ? 'none' : '0px 1px 4px rgba(0, 0, 0, 0.1)',
        background: '#fff',
        borderRadius: '5px',
      }}
      component="nav"
      aria-label="main mailbox folders"
    >
      <ListItem
        style={{
          paddingRight: '8px !important',
          borderRight: '1px solid #ddd',
        }}
        data-status={5}
        onClick={onStatusClick}
      >
        <ListItemIcon style={{ minWidth: '45px' }}>
          <Icon
            style={{ width: '0.85em', height: '0.85em', textAlign: 'center', marginLeft: '16px', fontSize: '20px' }}
          >
            <img
              style={{
                width: '100%',
                position: 'relative',
                top: '-4px',
                marginRight: '8px',
              }}
              src={Gateway}
              alt=""
            />
          </Icon>
        </ListItemIcon>
        {!filterExpand ? (
          <ListItemText>
            <span style={{ fontSize: '13px', color: '#08477c', whiteSpace: 'nowrap', marginRight: '4px' }}>
              Tổng: {locationListLength.total}
            </span>
          </ListItemText>
        ) : (
          <ListItemText>
            <span style={{ fontSize: '13px', color: '#08477c', whiteSpace: 'nowrap', marginRight: '10px' }}>
              Tổng: {locationListLength.total} thiết bị
            </span>
          </ListItemText>
        )}
      </ListItem>
      <ListItem
        style={{
          padding: '0 16px',
        }}
        data-status={1}
        onClick={onStatusClick}
      >
        <ListItemIcon style={{ minWidth: '20px' }}>
          <div
            style={{
              backgroundColor: '#00A550',
              cursor: 'pointer',
              width: '13px',
              height: '13px',
              borderRadius: '50%',
              position: 'absolute',
              transform: 'rotate(-45deg)',
              left: '36px',
              top: '80%',
              margin: '-20px 0 0 -20px',
            }}
          />
        </ListItemIcon>
        {!filterExpand ? (
          <Tooltip title="Hoạt động">
            <ListItemText>
              <span style={{ fontSize: '13px', color: '#08477c', whiteSpace: 'nowrap', marginRight: '4px' }}>
                {locationListLength.connected}
              </span>
            </ListItemText>
          </Tooltip>
        ) : (
          <ListItemText>
            <span style={{ fontSize: '13px', color: '#08477c', whiteSpace: 'nowrap', marginRight: '10px' }}>
              Hoạt động ({locationListLength.connected})
            </span>
          </ListItemText>
        )}
      </ListItem>
      <ListItem
        style={{
          padding: '0 16px',
        }}
        data-status={2}
        onClick={onStatusClick}
      >
        <ListItemIcon style={{ minWidth: '20px' }}>
          <div
            style={{
              backgroundColor: 'red',
              cursor: 'pointer',
              width: '13px',
              height: '13px',
              borderRadius: '50%',
              position: 'absolute',
              transform: 'rotate(-45deg)',
              left: '36px',
              top: '80%',
              margin: '-20px 0 0 -20px',
            }}
          />
        </ListItemIcon>
        {!filterExpand ? (
          <Tooltip title="Cảnh báo">
            <ListItemText>
              <span style={{ fontSize: '13px', color: '#08477c', whiteSpace: 'nowrap', marginRight: '4px' }}>
                {locationListLength.alert}
              </span>
            </ListItemText>
          </Tooltip>
        ) : (
          <ListItemText>
            <span style={{ fontSize: '13px', color: '#08477c', whiteSpace: 'nowrap', marginRight: '10px' }}>
              Cảnh báo ({locationListLength.alert})
            </span>
          </ListItemText>
        )}
      </ListItem>
      <ListItem
        style={{
          padding: '0 16px',
        }}
        data-status={3}
        onClick={onStatusClick}
      >
        <ListItemIcon style={{ minWidth: '20px' }}>
          <div
            style={{
              backgroundColor: 'orange',
              cursor: 'pointer',
              width: '13px',
              height: '13px',
              borderRadius: '50%',
              position: 'absolute',
              transform: 'rotate(-45deg)',
              left: '36px',
              top: '80%',
              margin: '-20px 0 0 -20px',
            }}
          />
        </ListItemIcon>
        {!filterExpand ? (
          <Tooltip title="Cảm biến">
            <ListItemText>
              <span style={{ fontSize: '13px', color: '#08477c', whiteSpace: 'nowrap', marginRight: '4px' }}>
                {locationListLength.warning}
              </span>
            </ListItemText>
          </Tooltip>
        ) : (
          <ListItemText>
            <span style={{ fontSize: '13px', color: '#08477c', whiteSpace: 'nowrap', marginRight: '10px' }}>
              Cảm biến ({locationListLength.warning})
            </span>
          </ListItemText>
        )}
      </ListItem>
      <ListItem
        style={{
          padding: '0 16px',
        }}
        data-status={4}
        onClick={onStatusClick}
      >
        <ListItemIcon style={{ minWidth: '20px' }}>
          <div
            style={{
              backgroundColor: '#989898',
              cursor: 'pointer',
              width: '13px',
              height: '13px',
              borderRadius: '50%',
              position: 'absolute',
              transform: 'rotate(-45deg)',
              left: '36px',
              top: '80%',
              margin: '-20px 0 0 -20px',
            }}
          />
        </ListItemIcon>
        {!filterExpand ? (
          <Tooltip title="Mất kết nối">
            <ListItemText>
              <span style={{ fontSize: '13px', color: '#08477c', whiteSpace: 'nowrap', marginRight: '4px' }}>
                {locationListLength.disconnected}
              </span>
            </ListItemText>
          </Tooltip>
        ) : (
          <ListItemText>
            <span style={{ fontSize: '13px', color: '#08477c', whiteSpace: 'nowrap', marginRight: '10px' }}>
              Mất kết nối ({locationListLength.disconnected})
            </span>
          </ListItemText>
        )}
      </ListItem>
      {/* <Tooltip title={isFitering ? 'Đang áp dụng bộ lọc' : 'Bộ lọc'}>
        <Box display="flex" alignItems="center" px="8px" style={{ cursor: 'pointer' }} onClick={onFilterExpandClick}>
          {!filterExpand && <ExpandLessIcon style={{ color: isFitering ? '#8F0A0C' : 'unset' }} />}
        </Box>
      </Tooltip> */}
    </Box>
  );
};
