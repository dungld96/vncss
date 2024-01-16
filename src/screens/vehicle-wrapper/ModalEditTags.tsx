import Modal from '../../common/modal/Modal';
import { dataTag, TagType } from '../../common/TableTag/dataSelectTag';
import TableTag from '../../common/TableTag/TableTag';
import React, { useEffect, useState } from 'react';
import { DialogActions } from '@mui/material';
import Button from '../../common/button/Button';
import { LocationType } from 'state/modules/location/locationReducer';
import { useUpdateLocationMutation } from 'services/location.service';
import { useSnackbar } from 'hooks/useSnackbar';
import { useAuth } from 'hooks/useAuth';
import dayjs from 'dayjs';

interface Props {
  show: boolean;
  onClose: () => void;
  handleSuccess: () => void;
  location: LocationType;
}
export const tagsList = [
  { agency: 'Công an Hà Nội', tagName: 'CA_hanoi' },
  { agency: 'Hội sở Vietcombank', tagName: 'vietcombank_hoiso' },
];
const ModalEditTags: React.FC<Props> = ({ show, onClose, location, handleSuccess }) => {
  const [tags, setTags] = useState<TagType[]>([]);
  const [updateLocation] = useUpdateLocationMutation();
  const { setSnackbar } = useSnackbar();
  const {
    auth: { currentUser },
  } = useAuth();

  useEffect(() => {
    const tags = location.tags.map((item) => ({
      tagName: item,
      agency: tagsList.find((t) => t.tagName === item)?.agency || '',
    }));
    setTags(tags);
  }, [location]);

  const submit = () => {
    const body = {
      id: location.id,
      tags: tags.map((item) => item.tagName),
    };
    updateLocation({ location: body, parent_uuid: currentUser?.sub_id })
      .then((res: any) => {
        if (res.error) {
          setSnackbar({ open: true, message: 'Có lỗi khi cập nhật thẻ tag ví trí', severity: 'error' });
          return;
        }
        setSnackbar({ open: true, message: 'Cập nhật thẻ tag vị trí thành công', severity: 'success' });
        handleSuccess();
      })
      .catch(() => setSnackbar({ open: true, message: 'Có lỗi khi cập nhật thẻ tag ví trí', severity: 'error' }));
    onClose();
  };

  return (
    <Modal size="sm" show={show} close={onClose} title="Chỉnh sửa thẻ tag">
      <TableTag data={tagsList} tags={tags} onSelected={(selectedTags) => setTags(selectedTags)} />
      <DialogActions sx={{ padding: 0, marginTop: '32px' }}>
        <Button style={{ width: 131 }} variant="outlined" onClick={onClose}>
          Quay lại
        </Button>
        <Button style={{ width: 131 }} variant="contained" onClick={submit}>
          Lưu lại
        </Button>
      </DialogActions>
    </Modal>
  );
};

export default ModalEditTags;
