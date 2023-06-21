export const LIST_STATUS_NODE = {
  ALL: '0',
  ACTIVE: 'activated',
  WARRANTY: 'repared',
  SAVE: 'stock',
  FREE: 'free',
};

const { ALL, ACTIVE, FREE, WARRANTY, SAVE } = LIST_STATUS_NODE;

export const mappingStatusNode = {
  [ALL]: 'Tất cả trạng thái',
  [ACTIVE]: 'Kích hoạt',
  [WARRANTY]: 'Bảo hành',
  [SAVE]: 'Lưu kho',
  [FREE]: 'Tự do',
};

export const mappingStatusNodeColor = {
  [ACTIVE]: '#27AE60',
  [WARRANTY]: '#F2994A',
  [SAVE]: '#8B8C9B',
  [FREE]: '#0c8ce9',
};

export const listStatusNode = Object.keys(mappingStatusNode).map((item) => ({
  value: item,
  label: mappingStatusNode[item],
}));

export const listStatusNodeLess = listStatusNode.slice(1);

export const defaultInitialValues = {
  id: '',
  type: 'none',
  description: '',
  serial: '',
  version: '',
  startDate: '',
};
