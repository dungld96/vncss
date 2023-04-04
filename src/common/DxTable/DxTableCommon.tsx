import React from 'react';
import { Table, TableHeaderRow, TableTreeColumn } from '@devexpress/dx-react-grid-material-ui';

export const TableTreeCell = (props: TableTreeColumn.CellProps) => (
  <TableTreeColumn.Cell {...props} style={{ borderBottom: '1px solid #EEF2FA', color: '#1E2323' }} />
);

export const getTableCell = (props: Table.DataCellProps, actionCellContent: React.ReactNode) => {
  const {
    value,
    column: { name },
  } = props;

  return (
    <Table.Cell
      {...props}
      style={{
        borderBottom: '1px solid #EEF2FA',
        color: '#1E2323',
        paddingTop: 0,
        paddingBottom: 0,
        height: '48px !important',
      }}
    >
      {name === 'action' && actionCellContent ? actionCellContent : value}
    </Table.Cell>
  );
};

export const TableHeaderContent = (props: TableHeaderRow.ContentProps) => (
  <TableHeaderRow.Content {...props} style={{ color: '#8B8C9B', opacity: 0.5 }} />
);

export const TableHeaderCell = (props: TableHeaderRow.CellProps) => (
  <TableHeaderRow.Cell {...props} style={{ padding: '0 24px', height: '48px', borderBottom: '1px solid #EEF2FA' }} />
);

export const ExpandButtonTableTree = (props: TableTreeColumn.ExpandButtonProps) => (
  <TableTreeColumn.ExpandButton {...props} style={{ color: '#C5C6D2' }} />
);
