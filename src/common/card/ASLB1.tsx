//Loa đèn cảnh báo
import React from 'react';
import styles from './styles.module.scss';
import { Card, CardActions, CardHeader } from '@mui/material';
import { sensorMapped } from '../../utils/sensorMapping';
import { ControlLocationNodeType } from '../../services/control.service';

type Props = {
  data: ControlLocationNodeType;
  nodeTypes: any[];
  onClickCard: () => void;
};

export const ASLB1 = ({ data, nodeTypes, onClickCard }: Props) => {

  const nodeTypeName = nodeTypes.filter((item) => item.id === data.node_type_id);
  const name = data.name ? data.name : nodeTypeName[0].name;
  const { state = '' } = data;
  const stylesStatus = data.state === 'activate' ? styles['active'] : styles['deactive'];
  const handleClick = () => {
    // onClickCard({ ...data, nodeType: nodeTypeName[0].name });
  };

  return (
    // <Card onClick={handleClick}>
    //   <CardHeader className={cx(styles['card__header'])} title={name} />
    //   <CardContent className={cx([styles['card__front'], stylesStatus])}>
    //     <div style={{ minHeight: 78 }}>
    //       <img src={images.speaker_sensor} />
    //     </div>
    //     {/* <div className={cx([styles['card__content'], styles['center']])}>
    //   {data.power ? (
    //     <img src={images.status_on} />
    //   ) : (
    //     <img src={images.status_off} />
    //   )}
    // </div> */}
    //   </CardContent>
    //   <CardActions disableSpacing className={cx([styles['card__bottom']])}>
    //     <div className={cx(styles['power-dot'])}>
    //       {status ? <img src={images.power_on_dot} /> : <img src={images.power_off_dot} />}
    //     </div>
    //     <div className={cx(styles['action-card'])} aria-label="settings">
    //       {_.get(JSON.parse(state), 'battery', 0) === 100 ? (
    //         <img className={cx(styles['power-icon'])} src={images.power_100} />
    //       ) : (
    //         <img className={cx(styles['power-icon'])} src={images.power_75} />
    //       )}
    //       <span> {_.get(JSON.parse(state), 'battery', 0)}%</span>
    //     </div>
    //   </CardActions>
    // </Card>
    <></>
  );
};
