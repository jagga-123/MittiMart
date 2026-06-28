import { Navigate, Outlet } from 'react-router-dom';
import Loader from '../components/Loader';
import { useAuth } from '../hooks/useAuth';
import { getRoleHomePath } from '../permissions/permissions';

const GuestRoute = ({ children }) => {
  const { user, role, isAuthReady } = useAuth();

  if (!isAuthReady) {
    return <Loader />;
  }

  if (user) {
    return <Navigate to={getRoleHomePath(role)} replace />;
  }

  return children || <Outlet />;
};

export default GuestRoute;

