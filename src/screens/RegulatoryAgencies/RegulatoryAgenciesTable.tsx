import { CustomTreeData, TreeDataState } from '@devexpress/dx-react-grid';
import { Grid, Table, TableHeaderRow, TableTreeColumn } from '@devexpress/dx-react-grid-material-ui';
import { Paper, Typography } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import {
  CustomFieldType,
  ExpandButtonTableTree,
  getTableCell,
  TableHeaderCell,
  TableHeaderContent,
  TableTreeCell,
} from '../../common/DxTable/DxTableCommon';

import { Box } from '@mui/system';
import { useSelector } from 'react-redux';
import Button from '../../common/button/Button';
import Select from '../../common/Select/Select';
import ModalChangePassword from '../Users/ModalChangePassword';
import {
  IRegulatory,
  useChangePasswordRegulatoryMutation,
  useLazyGetListRegulatoriesChildsQuery,
} from '../../services/regulatory.service';
import { selectRegulatories } from '../../state/modules/regulatory/regulatoryReducer';
import useApp from 'hooks/useApp';
import { useSnackbar } from 'hooks/useSnackbar';

const getChildRows = (row: IRegulatory, rootRows: IRegulatory[]) => {
  const childRows = rootRows.filter((r) => r.parentId === (row ? row.id : null));
  return childRows.length ? childRows : [];
};

const ActionCellContent = ({
  cellProps,
  onActionClick,
}: {
  cellProps: Table.DataCellProps;
  onActionClick: (type: string, id: string) => void;
}) => {
  const rowId = useMemo(() => cellProps.row?.id, [cellProps]);

  return (
    <div>
      <Typography
        style={{ fontSize: '14px', color: '#E13153', cursor: 'pointer' }}
        onClick={() => onActionClick('change-pass', rowId)}
      >
        Đổi mật khẩu
      </Typography>
    </div>
  );
};

const getRowId = (row: any) => row.id;

export const RegulatoryAgenciesTable = ({
  fetchFilter,
  refetch,
}: {
  fetchFilter: (p?: string, d?: string) => void;
  refetch: () => void;
}) => {
  const [changePassword, { isLoading }] = useChangePasswordRegulatoryMutation();
  const [getListRegulatoriesChilds] = useLazyGetListRegulatoriesChildsQuery();
  const [modalChangePass, setModalChangePass] = useState({ show: false, id: '' });
  const regulatoryAgencies = useSelector(selectRegulatories);
  const [province, setProvince] = useState<string>();
  const [district, setDistrict] = useState<string>();
  const [expandedRowIds, setExpandedRowIds] = useState<Array<string | number>>([]);
  const { area, fetchArea } = useApp();
  const { setSnackbar } = useSnackbar();

  useEffect(() => {
    fetchArea();
  }, []);

  const dataCity = area.find((item: any) => item.name === province);
  const districtList = dataCity?.level2s?.map((item: any) => ({ label: item.name, value: item.name }));

  const [columns] = useState([
    { name: 'name', title: 'Tên cơ quan' },
    { name: 'address', title: 'Địa chỉ' },
    { name: 'username', title: 'Tài khoản' },
    { name: 'tag', title: 'Thẻ Tag' },
    { name: 'count_locations', title: 'Vị trí triển khai' },
    { name: 'count_devices', title: 'Số thiết bị' },
    { name: 'action', title: 'Hành động' },
  ]);

  const [tableColumnExtensions] = useState<Table.ColumnExtension[]>([
    { columnName: 'name', width: 280 },
    { columnName: 'action', width: 200, align: 'center' },
    { columnName: 'tag', width: 200 },
    { columnName: 'count_locations', width: 140 },
    { columnName: 'count_devices', width: 120 },
  ]);

  const handleClick = (type: string, id: string) => {
    if (type === 'change-pass') {
      setModalChangePass({ show: true, id });
    }
  };

  const customField: CustomFieldType = {
    tag: {
      renderContent: ({ row }) => {
        return (
          <>
            <Typography>
              {`@${row.tag}`}
            </Typography>
          </>
        );
      },
    },
    address: {
      renderContent: ({ row }) => {
        return (
          <>
            <Typography>
              {`${row?.address}${row?.commune ? `, ${row?.commune}` : ''}${row?.district ? `, ${row?.district}` : ''}${
                row?.province ? `, ${row?.province}` : ''
              }`}
            </Typography>
          </>
        );
      },
    },
    count_locations: {
      renderContent: ({ row }) => {
        return (
          <>
            <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: '-20px' }}>
              <Typography sx={{ textAlign: 'right', width: '36px' }}>
                {row?.count_locations?.toLocaleString('en-US')}
              </Typography>
              {/* <IconButton>
                <ImageIcon image={GroupIcon} />
              </IconButton> */}
            </Box>
          </>
        );
      },
    },
    count_devices: {
      renderContent: ({ row }) => {
        return (
          <>
            <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: '-20px' }}>
              <Typography sx={{ textAlign: 'right', width: '36px' }}>
                {row?.count_devices?.toLocaleString('en-US')}
              </Typography>
              {/* <IconButton>
                <ImageIcon image={GroupIcon} />
              </IconButton> */}
            </Box>
          </>
        );
      },
    },
  };

  const handelChangePass = async (password: string, id: string) => {
    changePassword({ id, password })
      .then((res: any) => {
        if (res.error) {
          setSnackbar({ open: true, message: 'Có lỗi khi đổi mật khẩu', severity: 'error' });
          return;
        }
        setSnackbar({ open: true, message: 'Đổi mật khẩu thành công', severity: 'success' });
        setModalChangePass({ ...modalChangePass, show: false });
      })
      .catch(() => {
        setSnackbar({ open: true, message: 'Có lỗi khi đổi mật khẩu', severity: 'error' });
      });
  };

  const handleFilter = () => {
    fetchFilter(province, district);
  };

  const handleClearFilter = () => {
    setProvince(undefined);
    setDistrict(undefined);
    refetch();
  };
  const handleExpanded = (ids: Array<string | number>) => {
    const rowIdsWithNotLoadedChilds = [...ids].filter((rowId) => expandedRowIds.every((item) => item !== rowId));
    if (rowIdsWithNotLoadedChilds.length) {
      Promise.all(rowIdsWithNotLoadedChilds.map((rowId) => getListRegulatoriesChilds({ id: `${rowId}` })));
    }
    setExpandedRowIds(ids);
  };

  return (
    <>
      <ModalChangePassword
        {...modalChangePass}
        onClose={() => setModalChangePass({ ...modalChangePass, show: false })}
        onSubmit={(pass, id) => handelChangePass(pass, id)}
        isLoading={isLoading}
      />
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-end',
          marginBottom: '20px',
          '& > *': {
            marginRight: '16px',
          },
        }}
      >
        <Select
          noMarginTop
          topLable="Tỉnh thành"
          data={area?.map((item: any) => ({ label: item.name, value: item.name }))}
          selected={province}
          setSelected={(p) => {
            setProvince(p);
            setDistrict(undefined);
          }}
          placeholder="Tất cả tỉnh thành"
        />
        <Select
          noMarginTop
          topLable="Quận, huyện"
          data={districtList}
          selected={district}
          setSelected={(p) => setDistrict(p)}
          placeholder="Tất cả quận huyện"
        />
        <Box>
          <Button variant="contained" style={{ width: '140px', marginRight: '8px' }} onClick={handleFilter}>
            Lọc
          </Button>
          <Button variant="outlined" style={{ width: '140px' }} onClick={handleClearFilter}>
            Huỷ bộ lọc
          </Button>
        </Box>
      </Box>
      <Paper sx={{ boxShadow: 'none' }}>
        <Grid rows={regulatoryAgencies} columns={columns} getRowId={getRowId}>
          <TreeDataState expandedRowIds={expandedRowIds} onExpandedRowIdsChange={handleExpanded} />
          <CustomTreeData getChildRows={getChildRows} />
          <Table
            columnExtensions={tableColumnExtensions}
            cellComponent={(props) =>
              getTableCell(props, <ActionCellContent cellProps={props} onActionClick={handleClick} />, customField)
            }
          />
          <TableHeaderRow cellComponent={TableHeaderCell} contentComponent={TableHeaderContent} />
          <TableTreeColumn for="name" cellComponent={TableTreeCell} expandButtonComponent={ExpandButtonTableTree} />
        </Grid>
      </Paper>
    </>
  );
};
