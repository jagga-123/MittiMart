import ProtectedRoute from './ProtectedRoute';

const RequireAuth = ({ children }) => <ProtectedRoute>{children}</ProtectedRoute>;

export default RequireAuth;

