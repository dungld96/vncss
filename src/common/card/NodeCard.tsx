//Loa đèn cảnh báo
import React from 'react';
import styled from '@emotion/styled';
import { Box, Card, Typography } from '@mui/material';
import { sensorMapped } from '../../utils/sensorMapping';
import { ControlLocationNodeType } from '../../services/control.service';

const DLNodeCard = styled(Card)({
  cursor: 'pointer',
  backgroundColor: '#F6F9FC',
  boxShadow: 'none',
  border: '1.5px solid #EEF2FA',
  borderRadius: '8px',
  padding: '16px',
});

type Props = {
  data: ControlLocationNodeType;
  nodeTypes: any[];
  onClickCard: () => void;
};

export const NodeCard = ({ data, nodeTypes, onClickCard }: Props) => {
  const nodeTypeName = nodeTypes.filter((item) => item.id === data.node_type_id);
  const name = data.name ? data.name : nodeTypeName[0].name;
  const { state = '' } = data;
  const handleClick = () => {
    // onClickCard({ ...data, nodeType: nodeTypeName[0].name });
  };

  return (
    <DLNodeCard onClick={handleClick}>
      <Box display="flex" justifyContent="space-between" alignItems="center" pb={2}>
        <Box>
          {data.status === 'activated' ? (
            <img src={sensorMapped.power_on_dot} alt="" />
          ) : (
            <img src={sensorMapped.power_off_dot} alt="" />
          )}
        </Box>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Box style={{ fontSize: '12px' }}>100%</Box>
          <img style={{ width: '20px', margin: '5px' }} src={sensorMapped.power_100} alt="" />
        </Box>
      </Box>
      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <Box style={{ minHeight: 78 }}>
          <img src={sensorMapped.SSHB} alt="" />
        </Box>
        <Box py={2}>
          <Typography style={{ fontWeight: 500, lineHeight: '22px' }}>{data.name}</Typography>
        </Box>
      </Box>
    </DLNodeCard>
  );
};
