import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { setArea } from '../state/modules/app/appReducer';
import { useAppDispatch } from '../state/store';
import { selectArea } from './../state/modules/app/appReducer';

export default function useApp() {
  const dispatch = useAppDispatch();
  const area = useSelector(selectArea);

  return useMemo(
    () => ({
      area,
      fetchArea: () => {
        fetch('/dvhcvn.json')
          .then((res) => res.json())
          .then(({ data }) => {
            dispatch(setArea({area:data}))
          });
      },
    }),
    [dispatch,JSON.stringify(area)]
  );
}
