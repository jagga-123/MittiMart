import { Trash2, UserCheck } from 'lucide-react';
import PageShell from '../components/PageShell';

const rows = [
  { name: 'Aarav Customer', email: 'customer@mittimart.test', role: 'Customer' },
  { name: 'Sunita Devi', email: 'seller@mittimart.test', role: 'Seller' },
  { name: 'MittiMart Admin', email: 'admin@mittimart.test', role: 'Admin' },
];

const ManageUsersPage = () => {
  return (
    <PageShell
      eyebrow="Admin"
      title="Manage users"
      description="Admin-only access for user moderation and verification."
    >
      <div className="bg-white border border-brand-brown/10 rounded-2xl overflow-hidden shadow-sm">
        {rows.map((row) => (
          <div key={row.email} className="p-5 border-b border-brand-brown/5 last:border-b-0 flex items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold text-brand-brown">{row.name}</h3>
              <p className="text-sm text-brand-muted">{row.email}</p>
              <span className="inline-flex mt-2 text-xs font-bold bg-brand-cream text-brand-brown px-2.5 py-1 rounded-full">{row.role}</span>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 rounded-full bg-brand-brown text-white text-xs font-bold inline-flex items-center gap-2">
                <UserCheck className="w-3.5 h-3.5" />
                Verify
              </button>
              <button className="px-4 py-2 rounded-full bg-brand-cream border border-brand-brown/15 text-brand-brown text-xs font-bold inline-flex items-center gap-2">
                <Trash2 className="w-3.5 h-3.5" />
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </PageShell>
  );
};

export default ManageUsersPage;

