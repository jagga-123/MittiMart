import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Loader from '../components/Loader';
import { useAuth } from '../hooks/useAuth';
import { hasPermission, getRoleHomePath } from '../permissions/permissions';

const ProtectedRoute = ({ allowedRoles = null, permission = null, children }) => {
  const { user, role, isAuthReady } = useAuth();
  const location = useLocation();

  if (!isAuthReady) {
    return <Loader />;
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/403" replace />;
  }

  if (permission && !hasPermission(role, permission)) {
    return <Navigate to="/403" replace />;
  }

  return children || <Outlet />;
};

export default ProtectedRoute;

