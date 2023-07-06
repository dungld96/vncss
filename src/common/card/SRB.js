//Remote SOS
/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import cx from 'classnames';
import styles from './styles.module.scss';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import _ from 'lodash';
import Switch from '@material-ui/core/Switch';
import images from '../../resources/image';
import { getMinutesDiffNow } from '../../helper/util';

export default function DefaultCard({
  data = {},
  nodeTypes = [],
  onClickCard
}) {
  const nodeTypeName = nodeTypes.filter(
    item => item.id === data.product_type_id
  );
  const { state = '' } = data;
  const name = data.name ? data.name : nodeTypeName[0].name;
  const stylesStatus = data.power ? styles['active'] : styles['deactive'];
  const handleClick = () => {
    onClickCard({ ...data, nodeType: nodeTypeName[0].name });
  };

  const status =
    getMinutesDiffNow(_.get(JSON.parse(state), 'timestamp')) < 130 &&
    _.get(JSON.parse(state), 'status') === 1;

  return (
    <Card onClick={handleClick} className={cx(styles['card'], stylesStatus)}>
      <CardHeader className={cx(styles['card__header'])} title={name} />
      <CardContent className={cx([styles['card__front'], stylesStatus])}>
        <div style={{ minHeight: 78 }}>
          <img src={images.remote_sos_sensor} />
        </div>
        {/* <div className={cx([styles['card__content'], styles['center']])}>
          {data.power ? (
            <img src={images.status_on} />
          ) : (
            <img src={images.status_off} />
          )}
        </div> */}
      </CardContent>
      <CardActions disableSpacing className={cx([styles['card__bottom']])}>
        <div className={cx(styles['power-dot'])}>
          {status ? (
            <img src={images.power_on_dot} />
          ) : (
            <img src={images.power_off_dot} />
          )}
        </div>
        <div className={cx(styles['action-card'])} aria-label="settings">
          {_.get(JSON.parse(state), 'battery', 0) === 100 ? (
            <img className={cx(styles['power-icon'])} src={images.power_100} />
          ) : (
            <img className={cx(styles['power-icon'])} src={images.power_75} />
          )}
          <span> {_.get(JSON.parse(state), 'battery', 0)}%</span>
        </div>
      </CardActions>
    </Card>
  );
}
