import { Outlet, useNavigate } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import RoleBasedSidebar from '../components/RoleBasedSidebar';
import { ROLES } from '../permissions/permissions';
import { toAppNavigate } from '../utils/navigation';

const AdminLayout = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-brand-cream flex">
      <RoleBasedSidebar role={ROLES.ADMIN} onNavigate={toAppNavigate(navigate)} />
      <main className="flex-1 min-w-0">
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
    </div>
  );
};

export default AdminLayout;

