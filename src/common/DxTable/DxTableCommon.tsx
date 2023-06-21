import React from 'react';
import { Table, TableHeaderRow, TableTreeColumn, TableSelection } from '@devexpress/dx-react-grid-material-ui';

export const TableTreeCell = (props: TableTreeColumn.CellProps) => (
  <TableTreeColumn.Cell {...props} style={{ borderBottom: '1px solid #d9d9d9', color: '#1E2323' }} />
);

export const ExpandButtonTableTree = (props: TableTreeColumn.ExpandButtonProps) => (
  <TableTreeColumn.ExpandButton {...props} style={{ color: '#C5C6D2' }} />
);

export type CustomFieldType = {
  [columnName: string]: {
    renderContent: (props: Table.DataCellProps) => React.ReactNode;
  };
};

export const getTableCell = (
  props: Table.DataCellProps,
  actionCellContent: React.ReactNode,
  customField?: CustomFieldType
) => {
  const {
    value,
    column: { name },
  } = props;

  const customRenderer = customField && customField[name] && customField[name].renderContent;

  return (
    <Table.Cell
      {...props}
      style={{
        padding: '0 8px 0 24px',
        borderBottom: '1px solid #d9d9d9',
        color: '#1E2323',
        paddingTop: 0,
        paddingBottom: 0,
        height: '46px',
      }}
    >
      {name === 'action' && actionCellContent
        ? actionCellContent
        : customRenderer
        ? customRenderer(props)
        : value
        ? value
        : '--'}
    </Table.Cell>
  );
};

export const TableRowContent = (props: Table.DataCellProps) => (
  <Table.Cell {...props} style={{ padding: '0 8px 0 24px', color: '#1E2323', height: '46px' }} />
);
export const TableHeaderContent = (props: TableHeaderRow.ContentProps) => (
  <TableHeaderRow.Content {...props} style={{ color: '#8B8C9B', opacity: 0.5 }} />
);

export const TableHeaderCell = (props: TableHeaderRow.CellProps) => (
  <TableHeaderRow.Cell
    {...props}
    style={{ padding: '0 8px 0 24px', height: '47px', borderBottom: '1px solid #d9d9d9' }}
  />
);

export const TableSelectionCell = (props: TableSelection.CellProps) => (
  <TableSelection.Cell {...props} sx={{ svg: { fontSize: '21px' }, borderBottom: '1px solid #d9d9d9' }} />
);
export const TableSelectionHeaderCell = (props: TableSelection.HeaderCellProps) => (
  <TableSelection.HeaderCell
    {...props}
    sx={{ svg: { color: '#C5C6D2', fontSize: '21px' }, borderBottom: '1px solid #d9d9d9' }}
  />
);
