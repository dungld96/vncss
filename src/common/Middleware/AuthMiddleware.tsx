import React from 'react';
import FullScreenLoader from '../Loader/FullScreenLoader';
import { usersApi } from '../../services/users.service';
import { useLocalStorage } from '../../hooks/useLocalStorage';

type IAuthMiddleware = {
  children: React.ReactElement;
};

const AuthMiddleware: React.FC<IAuthMiddleware> = ({ children }) => {
  const [token] = useLocalStorage<string>('access_token', '');
  const { isLoading } = usersApi.endpoints.getCurrentUser.useQuery(null, {
    skip: !token,
  });

  if (isLoading) {
    return <FullScreenLoader />;
  }

  return children;
};

export default AuthMiddleware;
