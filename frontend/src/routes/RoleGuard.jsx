import ProtectedRoute from './ProtectedRoute';

const RoleGuard = ({ allowedRoles, children }) => (
  <ProtectedRoute allowedRoles={allowedRoles}>{children}</ProtectedRoute>
);

export default RoleGuard;

