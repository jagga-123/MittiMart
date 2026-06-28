import { ClipboardList } from 'lucide-react';
import PageShell from '../components/PageShell';
import { initialOrders } from '../data/mockData';

const AdminOrdersPage = () => {
  return (
    <PageShell
      eyebrow="Admin"
      title="All orders"
      description="Global order monitoring for admin oversight."
    >
      <div className="space-y-3">
        {initialOrders.map((order) => (
          <article key={order.id} className="bg-white border border-brand-brown/10 rounded-2xl p-5 shadow-sm flex items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-2xl bg-brand-cream text-brand-orange flex items-center justify-center">
                <ClipboardList className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading text-lg font-bold text-brand-brown">{order.id}</h3>
                <p className="text-sm text-brand-muted">{order.buyerCity}</p>
              </div>
            </div>
            <span className="text-sm font-bold text-brand-brown">₹{order.amount}</span>
          </article>
        ))}
      </div>
    </PageShell>
  );
};

export default AdminOrdersPage;

