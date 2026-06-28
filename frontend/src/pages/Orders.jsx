import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ClipboardList, Package, Truck } from 'lucide-react';
import PageShell from '../components/PageShell';

const orders = [
  { id: 'MM-1209', status: 'Shipped', amount: 2400, icon: Truck },
  { id: 'MM-1210', status: 'Processing', amount: 1800, icon: Package },
  { id: 'MM-1211', status: 'Delivered', amount: 950, icon: ClipboardList },
];

const OrdersPage = () => {
  const navigate = useNavigate();

  return (
    <PageShell
      eyebrow="Orders"
      title="Your order history"
      description="This customer route is protected and ready for a live backend to feed actual order records."
      actions={
        <button
          onClick={() => navigate('/')}
          className="px-5 py-2.5 rounded-full bg-brand-cream border border-brand-brown/15 text-brand-brown font-bold text-sm"
        >
          Shop More
        </button>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {orders.map((order, index) => {
          const Icon = order.icon;
          return (
            <motion.article
              key={order.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white border border-brand-brown/10 rounded-2xl p-5 shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-2xl bg-brand-orange/10 text-brand-orange flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-muted">{order.status}</span>
              </div>
              <h3 className="font-heading text-xl font-bold text-brand-brown">{order.id}</h3>
              <p className="text-sm text-brand-muted mt-1">₹{order.amount.toLocaleString('en-IN')}</p>
              <button
                onClick={() => navigate('/tracking')}
                className="mt-4 px-4 py-2 rounded-full bg-brand-brown text-white text-xs font-bold"
              >
                Track Order
              </button>
            </motion.article>
          );
        })}
      </div>
    </PageShell>
  );
};

export default OrdersPage;