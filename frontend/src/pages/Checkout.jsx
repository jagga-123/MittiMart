import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CreditCard, MapPin, ShieldCheck } from 'lucide-react';
import PageShell from '../components/PageShell';
import { useCart } from '../context/CartContext';
import { products } from '../data/mockData';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cart, cartCount, clearCart } = useCart();

  const cartProducts = cart
    .map((item) => {
      const product = products.find((entry) => entry.slug === item.slug);
      return product ? { ...product, qty: item.qty } : null;
    })
    .filter(Boolean);

  const subtotal = cartProducts.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = cartProducts.length ? 99 : 0;
  const total = subtotal + shipping;

  return (
    <PageShell
      eyebrow="Checkout"
      title="Secure mock checkout"
      description="This customer-only route stays protected by RBAC and can later plug directly into a backend checkout and payment service."
      actions={
        <button
          onClick={() => navigate('/cart')}
          className="px-5 py-2.5 rounded-full bg-brand-cream border border-brand-brown/15 text-brand-brown font-bold text-sm"
        >
          Back to Cart
        </button>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 bg-white border border-brand-brown/10 rounded-2xl p-6 shadow-sm"
        >
          <h2 className="font-heading text-2xl font-bold text-brand-brown mb-4">Shipping details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input className="px-4 py-3 rounded-full border border-brand-brown/15 outline-none" placeholder="Full name" />
            <input className="px-4 py-3 rounded-full border border-brand-brown/15 outline-none" placeholder="Phone number" />
            <input className="px-4 py-3 rounded-full border border-brand-brown/15 outline-none sm:col-span-2" placeholder="Address line" />
            <input className="px-4 py-3 rounded-full border border-brand-brown/15 outline-none" placeholder="City" />
            <input className="px-4 py-3 rounded-full border border-brand-brown/15 outline-none" placeholder="State" />
          </div>

          <div className="mt-6 flex items-start gap-3 text-sm text-brand-muted bg-brand-cream/60 rounded-2xl p-4">
            <ShieldCheck className="w-5 h-5 text-brand-green flex-shrink-0 mt-0.5" />
            <p>Payment, delivery, and verification hooks can later be swapped with real API-backed flows without changing this screen.</p>
          </div>
        </motion.section>

        <aside className="bg-white border border-brand-brown/10 rounded-2xl p-6 shadow-premium sticky top-24 h-fit">
          <h2 className="font-heading text-xl font-bold text-brand-brown mb-4">Order summary</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-brand-muted">Items</span>
              <span className="font-semibold text-brand-brown">{cartCount}</span>
            </div>
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
            onClick={() => {
              clearCart();
              navigate('/orders');
            }}
            className="w-full mt-6 py-3 rounded-full bg-gradient-to-r from-brand-brown to-brand-orange text-white font-bold shadow-md inline-flex items-center justify-center gap-2"
          >
            <CreditCard className="w-4 h-4" />
            Place Order
          </button>

          <div className="mt-4 text-xs text-brand-muted flex items-center gap-2">
            <MapPin className="w-4 h-4 text-brand-orange" />
            Delivery estimation and payment gateway can be wired later.
          </div>
        </aside>
      </div>
    </PageShell>
  );
};

export default CheckoutPage;