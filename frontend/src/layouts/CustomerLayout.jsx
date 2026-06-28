import { Outlet } from 'react-router-dom';
import PageTransition from '../components/PageTransition';

const CustomerLayout = () => (
  <PageTransition>
    <Outlet />
  </PageTransition>
);

export default CustomerLayout;

