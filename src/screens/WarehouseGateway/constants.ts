export const LIST_STATUS_GATEWAY = {
  ALL: '0',
  ACTIVE: 'activated',
  WARRANTY: 'repared',
  SAVE: 'stock',
  FREE: 'free',
};

const { ALL, ACTIVE, FREE, WARRANTY, SAVE } = LIST_STATUS_GATEWAY;

export const mappingStatusGateway = {
  [ALL]: 'Tất cả trạng thái',
  [ACTIVE]: 'Kích hoạt',
  [WARRANTY]: 'Bảo hành',
  [SAVE]: 'Lưu kho',
  [FREE]: 'Tự do',
};

export const statusGatewayList = [
  { label: 'Kích hoạt', value: ACTIVE },
  { label: 'Bảo hành', value: WARRANTY },
  { label: 'Lưu kho', value: SAVE },
  { label: 'Tự do', value: FREE },
];

export const mappingStatusGatewayColor = {
  [ACTIVE]: '#27AE60',
  [WARRANTY]: '#F2994A',
  [SAVE]: '#8B8C9B',
  [FREE]: '#0c8ce9',
};

export const listStatusGateway = Object.keys(mappingStatusGateway).map((item) => ({
  value: item,
  label: mappingStatusGateway[item],
}));

export const listStatusGatewayLess = listStatusGateway.slice(1);
