import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectAuth } from '../state/modules/auth/authReducer';

export const useAuth = () => {
  const auth = useSelector(selectAuth);

  return useMemo(() => ({ auth }), [auth]);
};
