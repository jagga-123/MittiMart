import { User, Mail, ShieldCheck, MapPin } from 'lucide-react';
import PageShell from '../components/PageShell';
import { useAuth } from '../hooks/useAuth';
import { getRoleLabel } from '../permissions/permissions';

const ProfilePage = () => {
  const { user, role } = useAuth();

  const fields = [
    { icon: User, label: 'Name', value: user?.name || 'Customer Demo' },
    { icon: Mail, label: 'Email', value: user?.email || 'customer@mittimart.test' },
    { icon: ShieldCheck, label: 'Role', value: getRoleLabel(role) },
    { icon: MapPin, label: 'Location', value: 'Madhubani, Bihar' },
  ];

  return (
    <PageShell
      eyebrow="Profile"
      title="Your account details"
      description="The RBAC session stores id, name, email, role, and a mock JWT in localStorage for easy backend swap-in later."
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-1 bg-white border border-brand-brown/10 rounded-2xl p-6 shadow-sm">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-brand-brown to-brand-orange text-white flex items-center justify-center text-2xl font-extrabold mb-4">
            {user?.name?.slice(0, 1) || 'C'}
          </div>
          <h2 className="font-heading text-2xl font-bold text-brand-brown">{user?.name || 'Customer Demo'}</h2>
          <p className="text-sm text-brand-muted mt-1">{user?.email || 'customer@mittimart.test'}</p>
          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-cream border border-brand-brown/10 text-xs font-bold text-brand-brown">
            {getRoleLabel(role)}
          </div>
        </div>

        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {fields.map((field) => {
            const Icon = field.icon;
            return (
              <div key={field.label} className="bg-white border border-brand-brown/10 rounded-2xl p-5 shadow-sm flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-brand-cream text-brand-orange flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider font-bold text-brand-muted">{field.label}</div>
                  <div className="font-semibold text-brand-brown">{field.value}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </PageShell>
  );
};

export default ProfilePage;

