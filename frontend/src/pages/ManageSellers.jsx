import { Store, BadgeCheck } from 'lucide-react';
import PageShell from '../components/PageShell';

const sellers = [
  { name: 'Sunita Devi', shop: 'Madhubani Studio', status: 'Active' },
  { name: 'Rukmini Kumari', shop: 'Village Loom', status: 'Pending' },
];

const ManageSellersPage = () => {
  return (
    <PageShell
      eyebrow="Admin"
      title="Manage sellers"
      description="Approve, review, and monitor seller accounts."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sellers.map((seller) => (
          <article key={seller.shop} className="bg-white border border-brand-brown/10 rounded-2xl p-5 shadow-sm">
            <div className="w-11 h-11 rounded-2xl bg-brand-orange/10 text-brand-orange flex items-center justify-center mb-4">
              <Store className="w-5 h-5" />
            </div>
            <h3 className="font-heading text-xl font-bold text-brand-brown">{seller.name}</h3>
            <p className="text-sm text-brand-muted mt-1">{seller.shop}</p>
            <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-cream border border-brand-brown/10 text-xs font-bold text-brand-brown">
              <BadgeCheck className="w-3.5 h-3.5" />
              {seller.status}
            </div>
          </article>
        ))}
      </div>
    </PageShell>
  );
};

export default ManageSellersPage;

