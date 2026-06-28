import { ClipboardList, Truck } from 'lucide-react';
import PageShell from '../components/PageShell';
import { initialOrders, products } from '../data/mockData';

const SellerOrdersPage = () => {
  return (
    <PageShell
      eyebrow="Seller Orders"
      title="Order management"
      description="Role-protected order view for sellers and admins."
    >
      <div className="space-y-3">
        {initialOrders.map((order) => {
          const product = products.find((item) => item.slug === order.productSlug);
          return (
            <article key={order.id} className="bg-white border border-brand-brown/10 rounded-2xl p-5 shadow-sm flex items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-brand-orange/10 text-brand-orange flex items-center justify-center">
                  <ClipboardList className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-brand-brown">{order.id}</h3>
                  <p className="text-sm text-brand-muted">{product?.name} - {order.buyerCity}</p>
                  <p className="text-sm font-semibold text-brand-brown mt-1">₹{order.amount}</p>
                </div>
              </div>
              <button className="px-4 py-2 rounded-full bg-brand-cream border border-brand-brown/15 text-brand-brown text-xs font-bold inline-flex items-center gap-2">
                <Truck className="w-3.5 h-3.5" />
                Update status
              </button>
            </article>
          );
        })}
      </div>
    </PageShell>
  );
};

export default SellerOrdersPage;

