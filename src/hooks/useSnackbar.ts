import { useSelector } from 'react-redux';
import { setSnackbar, SnackbarType, selectSnackbar } from '../state/modules/app/appReducer';
import { useAppDispatch } from '../state/store';

export const useSnackbar = () => {
  const snackbar = useSelector(selectSnackbar);

  const dispatch = useAppDispatch();
  return { setSnackbar: (data: SnackbarType) => dispatch(setSnackbar(data)), snackbar };
};
