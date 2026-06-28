import ProtectedRoute from './ProtectedRoute';

const PermissionGuard = ({ permission, children }) => (
  <ProtectedRoute permission={permission}>{children}</ProtectedRoute>
);

export default PermissionGuard;

