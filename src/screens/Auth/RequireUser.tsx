import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useGetCurrentUserQuery } from '../../services/users.service';
import FullScreenLoader from '../../common/Loader/FullScreenLoader';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const RequireUser = () => {
  const location = useLocation();
  const [token] = useLocalStorage<string>('access_token', '');
  const { data, isLoading, isFetching } = useGetCurrentUserQuery(null);

  const loading = isLoading || isFetching;

  if (loading) {
    return <FullScreenLoader />;
  }

  return token || data ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
};

export default RequireUser;
