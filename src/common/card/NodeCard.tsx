//Loa đèn cảnh báo
import React from 'react';
import styled from '@emotion/styled';
import { Box, Card, Typography } from '@mui/material';
import { sensorMapped } from '../../utils/sensorMapping';
import DefaultNode from '../../assets/sensor/default-node.svg';
import { ControlLocationNodeType } from '../../services/control.service';
import { INodeType } from '../../services/node.service';
import { getMinutesDiffNow } from '../../utils/UtilsFunctions';

const DLNodeCard = styled(Card)({
  cursor: 'pointer',
  backgroundColor: '#F6F9FC',
  boxShadow: 'none',
  border: '1.5px solid #EEF2FA',
  borderRadius: '8px',
  padding: '16px 16px 8px',
});

type Props = {
  data: ControlLocationNodeType;
  nodeTypes: INodeType[];
  onClickCard: () => void;
  showPin?: boolean;
};

export const NodeCard = ({ data, nodeTypes, onClickCard, showPin = true }: Props) => {
  const nodeType = nodeTypes.find((item) => item.id === data.node_type_id);
  const nodeCodeType = nodeType?.code.split('-')[1];

  const status = data.state && getMinutesDiffNow(data.state?.timestamp) < 130 && data.state?.status === 0;

  return (
    <DLNodeCard onClick={onClickCard}>
      <Box display="flex" justifyContent="space-between" alignItems="center" pb={2}>
        <Box>
          {status ? <img src={sensorMapped.power_on_dot} alt="" /> : <img src={sensorMapped.power_off_dot} alt="" />}
        </Box>
        {showPin ? (
          <Box display="flex" justifyContent="center" alignItems="center">
            <Box style={{ fontSize: '12px' }}>{data.state?.battery || 100}%</Box>
            <img style={{ width: '20px', margin: '5px' }} src={sensorMapped.power_100} alt="" />
          </Box>
        ) : (
          <Box display="flex" justifyContent="center" alignItems="center"></Box>
        )}
      </Box>
      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <Box style={{ minHeight: 78 }}>
          {nodeCodeType && (sensorMapped as any)[nodeCodeType] ? (
            <img src={(sensorMapped as any)[nodeCodeType]} alt="" />
          ) : (
            <img src={DefaultNode} alt="" />
          )}
        </Box>
        <Box mt={1} minHeight={'48px'}>
          <Typography style={{ fontWeight: 500, lineHeight: '22px', textAlign: 'center' }}>{data.name}</Typography>
        </Box>
      </Box>
    </DLNodeCard>
  );
};
