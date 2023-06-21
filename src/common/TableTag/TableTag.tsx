import {
  Box,
  Divider,
  FormHelperText,
  IconButton,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { ImageIcon } from '../../utils/UtilsComponent';

import deleteIconGray from '../../assets/icons/trash-icon-gray.svg';

interface TagType {
  tagName: string;
  agency: string;
}
interface Props {
  tags: TagType[];
  hideButtonAdd?: boolean;
  data: TagType[];
  onSelected?: (tags: TagType[]) => void;
  error?: string;
  errorEmpty?: boolean;
}

const TableTag: React.FC<Props> = ({ tags, hideButtonAdd, data, error, onSelected, errorEmpty }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const touched = useRef(false);

  useEffect(() => {
    if (errorEmpty) touched.current = true;
  }, [errorEmpty]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'filter-simple-popover' : undefined;

  let noItem = !data.length;

  const newData = data.map((item) => {
    const hide = tags?.some((i) => i.tagName === item.tagName);

    noItem = hide;

    return {
      ...item,
      hide,
    };
  });

  const handleSelect = (tag: TagType) => {
    onSelected?.([...tags, tag]);
    if (noItem) {
      setAnchorEl(null);
    }
  };
  const handleRemove = (tag: TagType) => {
    const newTags = tags.filter((i) => i.tagName !== tag.tagName);
    onSelected?.(newTags);
    setAnchorEl(null);
  };

  const errorText = !open && touched.current && !tags.length ? error : undefined;

  return (
    <TableContainer
      sx={{
        border: 'none',
        borderRadius: '4px',
      }}
    >
      <Table
        border={1}
        sx={{
          borderCollapse: 'collapse',
          tableLayout: 'auto',
          border: 'none',
          overflow: 'hidden',
          borderRadius: '4px',
        }}
      >
        <TableHead
          sx={{
            background: '#EEF2FA',
            border: 'none',
            borderRadius: 0,
          }}
        >
          <TableRow>
            <TableCell align="center" width={'45%'} sx={{ borderRightColor: 'rgba(224, 224, 224, 1)' }}>
              Thẻ tag
            </TableCell>
            <TableCell align="center" width={'45%'} sx={{ borderRightColor: 'rgba(224, 224, 224, 1)' }}>
              Tên cơ quan, đơn vị
            </TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tags.map(({ tagName, agency }) => (
            <TableRow
              key={tagName}
              sx={{
                border: 'none',
              }}
            >
              <TableCell align="center" width={'45%'} sx={{ fontSize: '14px', fontWeight: '400', color: '#8F0A0C' }}>
                {tagName}
              </TableCell>
              <TableCell align="center" width={'45%'} sx={{ fontSize: '14px', fontWeight: '500', color: '#1E2323' }}>
                {agency}
              </TableCell>
              <TableCell align="center">
                <IconButton onClick={() => handleRemove({ tagName, agency })}>
                  <ImageIcon image={deleteIconGray} />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
          {!hideButtonAdd && !noItem && (
            <TableRow
              sx={{
                border: 'none',
              }}
            >
              <TableCell colSpan={3} align="center" width={'100%'}>
                <Box>
                  <Typography
                    aria-describedby={id}
                    onClick={handleClick}
                    sx={{
                      color: '#0075FF',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: '400',
                    }}
                  >
                    Thêm tag cơ quan, đơn vị quản lý
                  </Typography>
                  <Menu
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'center',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'center',
                    }}
                    PaperProps={{
                      sx: {
                        p: '8px 20px',
                        width: '375px',
                        borderRadius: '12px',
                        boxSizing: 'border-box',
                      },
                    }}
                  >
                    {newData.map((i) => (
                      <Box>
                        <MenuItem
                          key={i.tagName}
                          sx={{
                            height: '56px',
                            display: i?.hide ? 'none' : 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            justifyContent: 'space-between',
                          }}
                          onClick={() => handleSelect(i)}
                        >
                          <Typography sx={{ fontSize: '14px', fontWeight: '700', lineHeight: '22px' }}>
                            {i.agency}
                          </Typography>
                          <Typography
                            sx={{ fontSize: '12px', fontWeight: '400', lineHeight: '22px', color: '#8B8C9B' }}
                          >
                            {i.tagName}
                          </Typography>
                        </MenuItem>
                        <Divider sx={{ margin: '0 16px !important', borderColor: '#EEF2FA' }} />
                      </Box>
                    ))}
                  </Menu>
                </Box>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <FormHelperText error style={{ marginTop: 8, marginBottom: 10, textAlign: 'center' }}>
        {errorText}
      </FormHelperText>
    </TableContainer>
  );
};

export default TableTag;
