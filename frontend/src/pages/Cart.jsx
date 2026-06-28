import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Minus, Plus, ShoppingCart, Heart, CreditCard } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { products } from '../data/mockData';

const CartPage = () => {
  const navigate = useNavigate();
  const { cart, adjustCart, removeFromCart, cartCount } = useCart();
  const { wishlist, toggleWishlist, isWishlisted } = useWishlist();

  const cartProducts = cart.map(item => {
    const product = products.find(p => p.slug === item.slug);
    return product ? { ...product, qty: item.qty } : null;
  }).filter(Boolean);

  const subtotal = cartProducts.reduce((sum, p) => sum + (p.price * p.qty), 0);
  const shipping = 99;
  const total = subtotal + shipping;

  if (cartProducts.length === 0) {
    return (
      <div className="min-h-screen bg-brand-cream flex items-center justify-center p-4">
        <div className="text-center bg-white border border-brand-brown/10 rounded-2xl p-10 max-w-md shadow-premium">
          <ShoppingCart className="w-16 h-16 mx-auto text-brand-orange mb-4" />
          <h2 className="font-heading text-2xl font-bold text-brand-brown mb-2">Your Cart is Empty</h2>
          <p className="text-brand-muted mb-6">Discover handmade treasures crafted by real Indian artists.</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-gradient-to-r from-brand-brown to-brand-orange text-white font-bold rounded-full shadow-md"
          >
            Explore Crafts
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
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-brand-brown hover:text-brand-orange font-semibold"
          >
            <ArrowLeft className="w-4 h-4" /> Continue Shopping
          </button>
          <h1 className="font-heading text-3xl font-bold text-brand-brown">Your Cart ({cartCount} items)</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartProducts.map((product) => (
              <motion.div
                key={product.slug}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border border-brand-brown/10 rounded-2xl p-5 shadow-sm flex gap-4"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-24 h-24 rounded-xl object-cover border border-brand-brown/10 cursor-pointer"
                  onClick={() => navigate(`/product/${product.slug}`)}
                />
                <div className="flex-1">
                  <h3
                    className="font-heading font-bold text-brand-brown cursor-pointer hover:text-brand-orange"
                    onClick={() => navigate(`/product/${product.slug}`)}
                  >
                    {product.name}
                  </h3>
                  <p className="text-xs text-brand-muted font-medium">
                    Handmade by {product.artist} &middot; {product.location}
                  </p>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => adjustCart(product.slug, -1)}
                        className="w-7 h-7 rounded-full bg-brand-cream border border-brand-brown/10 flex items-center justify-center hover:bg-brand-orange/10"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-sm font-bold text-brand-brown">{product.qty}</span>
                      <button
                        onClick={() => adjustCart(product.slug, 1)}
                        className="w-7 h-7 rounded-full bg-brand-cream border border-brand-brown/10 flex items-center justify-center hover:bg-brand-orange/10"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <span className="text-xl font-extrabold text-brand-orange">
                      ₹{(product.price * product.qty).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    if (isWishlisted(product.slug)) {
                      removeFromCart(product.slug);
                    }
                    toggleWishlist(product.slug);
                  }}
                  className="self-start p-2 text-brand-muted hover:text-brand-orange"
                >
                  <Heart className={`w-4 h-4 ${isWishlisted(product.slug) ? 'fill-brand-orange text-brand-orange' : ''}`} />
                </button>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-brand-brown/10 rounded-2xl p-6 shadow-premium sticky top-24">
              <h2 className="font-heading text-xl font-bold text-brand-brown mb-4">Order Summary</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-brand-muted">Subtotal</span>
                  <span className="font-semibold text-brand-brown">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-brand-muted">Shipping</span>
                  <span className="font-semibold text-brand-brown">₹{shipping}</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-brand-brown/10 text-lg">
                  <span className="font-bold text-brand-brown">Total</span>
                  <span className="font-extrabold text-brand-orange">₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="w-full mt-6 py-3 bg-gradient-to-r from-brand-brown to-brand-orange text-white font-bold rounded-full shadow-md hover:scale-102 transition-transform flex items-center justify-center gap-2"
              >
                <CreditCard className="w-4 h-4" />
                Proceed to Checkout
              </button>

              <div className="mt-4 text-xs text-brand-muted text-center">
                Secure payment with Razorpay &middot; Supporting real artists
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;