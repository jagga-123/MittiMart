import { Outlet } from 'react-router-dom';
import PageTransition from '../components/PageTransition';

const PublicLayout = () => (
  <PageTransition>
    <Outlet />
  </PageTransition>
);

export default PublicLayout;

