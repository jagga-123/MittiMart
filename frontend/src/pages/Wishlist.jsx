import { motion } from 'framer-motion';
import { Heart, ShoppingCart, ArrowLeft } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { products } from '../data/mockData';

const WishlistPage = ({ onNavigate }) => {
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  const wishlistProducts = wishlist
    .map(slug => products.find(p => p.slug === slug))
    .filter(Boolean);

  if (wishlistProducts.length === 0) {
    return (
      <div className="min-h-screen bg-brand-cream flex items-center justify-center p-4">
        <div className="text-center bg-white border border-brand-brown/10 rounded-2xl p-10 max-w-md shadow-premium">
          <Heart className="w-16 h-16 mx-auto text-brand-orange mb-4" />
          <h2 className="font-heading text-2xl font-bold text-brand-brown mb-2">Your Wishlist is Empty</h2>
          <p className="text-brand-muted mb-6">Save your favorite handmade treasures for later.</p>
          <button
            onClick={() => onNavigate('home')}
            className="px-6 py-3 bg-gradient-to-r from-brand-brown to-brand-orange text-white font-bold rounded-full shadow-md"
          >
            Discover Treasures
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-cream">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 text-brand-brown hover:text-brand-orange font-semibold"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </button>
          <h1 className="font-heading text-3xl font-bold text-brand-brown">Your Wishlist</h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {wishlistProducts.map((product) => (
            <motion.div
              key={product.slug}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-brand-brown/10 rounded-2xl overflow-hidden shadow-sm hover:shadow-premium transition-shadow cursor-pointer group"
              onClick={() => onNavigate(`product/${product.slug}`)}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(product.slug);
                  }}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center text-brand-orange"
                >
                  <Heart className="w-4 h-4 fill-current" />
                </button>
              </div>
              <div className="p-4">
                <h3 className="font-heading font-bold text-brand-brown text-lg mb-1 line-clamp-1">
                  {product.name}
                </h3>
                <p className="text-xs text-brand-muted mb-3">
                  Made by {product.artist} &middot; {product.location}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-extrabold text-brand-orange">
                    ₹{product.price}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product.slug, 1);
                    }}
                    className="px-3 py-1.5 bg-brand-brown text-white text-xs font-bold rounded-full flex items-center gap-1"
                  >
                    <ShoppingCart className="w-3 h-3" />
                    Add
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;