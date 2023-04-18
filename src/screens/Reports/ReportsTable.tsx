import { Grid, Table, TableHeaderRow } from '@devexpress/dx-react-grid-material-ui';
import { Box, Paper, Popover, Typography } from '@mui/material';
import { Input } from 'common';
import Button from 'common/button/Button';
import { useState, useRef } from 'react';
import { ImageIcon } from 'utils/UtilsComponent';
import SearchIcon from '../../assets/icons/search-icon.svg';
import ExportIcon from '../../assets/icons/export-icon.svg';
import { TableHeaderCell, TableHeaderContent, TableRowContent } from '../../common/DxTable/DxTableCommon';
import { reports } from './mockData';
import FilterBox from './FilterBox';

const ReportsTable = () => {
  const [columns] = useState([
    { name: 'seri', title: 'Serial' },
    { name: 'name', title: 'Tên thiết bị' },
    { name: 'type', title: 'Loại thiết bị' },
    { name: 'time', title: 'Thời gian' },
    { name: 'diary_type', title: 'Loại nhật ký' },
    { name: 'status', title: 'Trạng thái' },
    { name: 'diary', title: 'Nội dung nhật ký' },
  ]);

  const [tableColumnExtensions] = useState<Table.ColumnExtension[]>([]);

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <Input
          style={{ width: 311, background: '#FFFFFF' }}
          placeholder="Tìm kiếm tên nhân viên"
          iconStartAdorment={<ImageIcon image={SearchIcon} />}
        />
        <Box sx={{ display: 'flex' }}>
          <FilterBox />
          <Button style={{ marginLeft: 16 }} variant="contained" onClick={() => {}}>
            <ImageIcon image={ExportIcon} />
            <Typography sx={{ marginLeft: '8px' }}>Xuất excel</Typography>
          </Button>
        </Box>
      </Box>
      <Paper sx={{ boxShadow: 'none' }}>
        <Grid rows={reports} columns={columns}>
          <Table columnExtensions={tableColumnExtensions} cellComponent={TableRowContent}/>
          <TableHeaderRow cellComponent={TableHeaderCell} contentComponent={TableHeaderContent} />
        </Grid>
      </Paper>
    </>
  );
};

export default ReportsTable;
