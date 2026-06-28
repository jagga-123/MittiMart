import { Users, Store, Package, FileText } from 'lucide-react';
import PageShell from '../components/PageShell';

const cards = [
  { label: 'Users', value: '1,248', icon: Users },
  { label: 'Sellers', value: '84', icon: Store },
  { label: 'Products', value: '14,000+', icon: Package },
  { label: 'Reports', value: '12', icon: FileText },
];

const AdminDashboardPage = () => {
  return (
    <PageShell
      eyebrow="Admin"
      title="Admin control center"
      description="Admin screens are guarded separately from seller routes and are built to accept real backend data later."
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <article key={card.label} className="bg-white border border-brand-brown/10 rounded-2xl p-5 shadow-sm">
              <div className="w-11 h-11 rounded-2xl bg-brand-cream text-brand-orange flex items-center justify-center mb-4">
                <Icon className="w-5 h-5" />
              </div>
              <div className="text-3xl font-extrabold text-brand-brown">{card.value}</div>
              <div className="text-xs uppercase tracking-wider text-brand-muted font-bold">{card.label}</div>
            </article>
          );
        })}
      </div>
    </PageShell>
  );
};

export default AdminDashboardPage;

