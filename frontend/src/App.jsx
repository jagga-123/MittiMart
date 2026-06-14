import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Loader from './components/Loader';
import AuthPage from './pages/Auth';
import CartPage from './pages/Cart';
import WishlistPage from './pages/Wishlist';
import SellerDashboard from './pages/SellerDashboard';
import ProductDetails from './pages/ProductDetails';
import TrackingPage from './pages/Tracking';
import NotificationsPage from './pages/Notifications';
import ArtistShop from './pages/ArtistShop';

function App() {
  const [route, setRoute] = useState(window.location.hash.slice(1) || 'home');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(window.location.hash.slice(1) || 'home');
    };
    window.addEventListener('hashchange', handleHashChange);
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      clearTimeout(timer);
    };
  }, []);

  const navigate = (newRoute) => {
    window.location.hash = newRoute;
    setRoute(newRoute);
  };

  const renderPage = () => {
    if (route === 'home') return <Home onNavigate={navigate} />;
    if (route === 'auth') return <AuthPage onNavigate={navigate} />;
    if (route === 'cart') return <CartPage onNavigate={navigate} />;
    if (route === 'wishlist') return <WishlistPage onNavigate={navigate} />;
    if (route === 'seller') return <SellerDashboard onNavigate={navigate} />;
    if (route === 'tracking') return <TrackingPage />;
    if (route === 'notifications') return <NotificationsPage />;
    if (route.startsWith('product/')) return <ProductDetails slug={route.split('/')[1]} onNavigate={navigate} />;
    if (route.startsWith('artist/')) return <ArtistShop slug={route.split('/')[1]} onNavigate={navigate} />;
    return <Home onNavigate={navigate} />;
  };

  return (
    <AnimatePresence>
      {loading && <Loader />}
      {!loading && (
        <div className="min-h-screen flex flex-col">
          <Navbar onNavigate={navigate} currentRoute={route} />
          <main className="flex-1">
            {renderPage()}
          </main>
        </div>
      )}
    </AnimatePresence>
  );
}

export default App;
