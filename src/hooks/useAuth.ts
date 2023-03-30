import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../state/modules/auth/reducer';

export const useAuth = () => {
  const user = useSelector(selectCurrentUser);

  return useMemo(() => ({ user }), [user]);
};
