import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import RoleBasedNavbar from './components/RoleBasedNavbar';
import Loader from './components/Loader';
import { useAuth } from './hooks/useAuth';

// Layouts
import PublicLayout from './layouts/PublicLayout';
import CustomerLayout from './layouts/CustomerLayout';
import SellerLayout from './layouts/SellerLayout';
import AdminLayout from './layouts/AdminLayout';

// Route Guards
import ProtectedRoute from './routes/ProtectedRoute';
import GuestRoute from './routes/GuestRoute';
import RoleGuard from './routes/RoleGuard';

// Pages - Public
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import ProductDetails from './pages/ProductDetails';
import ArtistShop from './pages/ArtistShop';
import AuthPage from './pages/Auth';
import NotFoundPage from './pages/NotFoundPage';
import UnauthorizedPage from './pages/UnauthorizedPage';

// Pages - Customer
import CartPage from './pages/Cart';
import WishlistPage from './pages/Wishlist';
import CheckoutPage from './pages/Checkout';
import OrdersPage from './pages/Orders';
import ProfilePage from './pages/Profile';
import ChatPage from './pages/Chat';
import NotificationsPage from './pages/Notifications';
import TrackingPage from './pages/Tracking';

// Pages - Seller
import SellerDashboard from './pages/SellerDashboard';
import SellerAddProductPage from './pages/SellerAddProduct';
import SellerEditProductPage from './pages/SellerEditProduct';
import SellerProductsPage from './pages/SellerProducts';
import SellerOrdersPage from './pages/SellerOrders';
import SellerMessagesPage from './pages/SellerMessages';
import SellerAnalyticsPage from './pages/SellerAnalytics';

// Pages - Admin
import AdminDashboardPage from './pages/AdminDashboard';
import ManageUsersPage from './pages/ManageUsers';
import ManageSellersPage from './pages/ManageSellers';
import ManageProductsPage from './pages/ManageProducts';
import AdminOrdersPage from './pages/AdminOrders';
import ReportsPage from './pages/Reports';
import SettingsPage from './pages/Settings';

// Roles
import { ROLES } from './permissions/permissions';

function App() {
  const { isAuthReady } = useAuth();

  if (!isAuthReady) {
    return <Loader />;
  }

  return (
    <AnimatePresence mode="wait">
      <div className="min-h-screen flex flex-col bg-brand-cream">
        <RoleBasedNavbar />
        <main className="flex-1">
          <Routes>
            {/* Public Routes */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/product/:slug" element={<ProductDetails />} />
              <Route path="/artist/:slug" element={<ArtistShop />} />
              <Route path="/403" element={<UnauthorizedPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>

            {/* Guest-only Routes (login/register) */}
            <Route element={<GuestRoute />}>
              <Route path="/login" element={<AuthPage mode="login" />} />
              <Route path="/register" element={<AuthPage mode="register" />} />
            </Route>

            {/* Customer Routes */}
            <Route element={<ProtectedRoute allowedRoles={[ROLES.CUSTOMER]} />}>
              <Route element={<CustomerLayout />}>
                <Route path="/cart" element={<CartPage />} />
                <Route path="/wishlist" element={<WishlistPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/orders" element={<OrdersPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/chat" element={<ChatPage />} />
                <Route path="/notifications" element={<NotificationsPage />} />
                <Route path="/tracking" element={<TrackingPage />} />
              </Route>
            </Route>

            {/* Seller Routes */}
            <Route element={<ProtectedRoute allowedRoles={[ROLES.SELLER, ROLES.ADMIN]} />}>
              <Route element={<SellerLayout />}>
                <Route path="/seller/dashboard" element={<SellerDashboard />} />
                <Route path="/seller/add-product" element={<SellerAddProductPage />} />
                <Route path="/seller/edit-product/:slug" element={<SellerEditProductPage />} />
                <Route path="/seller/products" element={<SellerProductsPage />} />
                <Route path="/seller/orders" element={<SellerOrdersPage />} />
                <Route path="/seller/messages" element={<SellerMessagesPage />} />
                <Route path="/seller/analytics" element={<SellerAnalyticsPage />} />
              </Route>
            </Route>

            {/* Admin Routes */}
            <Route element={<ProtectedRoute allowedRoles={[ROLES.ADMIN]} />}>
              <Route element={<AdminLayout />}>
                <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
                <Route path="/admin/users" element={<ManageUsersPage />} />
                <Route path="/admin/sellers" element={<ManageSellersPage />} />
                <Route path="/admin/products" element={<ManageProductsPage />} />
                <Route path="/admin/orders" element={<AdminOrdersPage />} />
                <Route path="/admin/reports" element={<ReportsPage />} />
                <Route path="/admin/settings" element={<SettingsPage />} />
              </Route>
            </Route>
          </Routes>
        </main>
      </div>
    </AnimatePresence>
  );
}

export default App;