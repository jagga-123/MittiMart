import { ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageShell from '../components/PageShell';

const UnauthorizedPage = () => {
  return (
    <PageShell
      eyebrow="Access Denied"
      title="403 - You do not have access to this page."
      description="The RBAC guard redirected you here because your current role cannot use this route."
    >
      <div className="bg-white border border-brand-brown/10 rounded-2xl p-8 shadow-sm max-w-2xl">
        <div className="w-16 h-16 rounded-3xl bg-brand-orange/10 text-brand-orange flex items-center justify-center mb-4">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <p className="text-sm text-brand-muted leading-relaxed">
          You can go back to the home page or sign in with a role that has access to this section.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link to="/" className="px-5 py-2.5 rounded-full bg-brand-brown text-white font-bold text-sm">
            Go Home
          </Link>
          <Link to="/login" className="px-5 py-2.5 rounded-full bg-brand-cream border border-brand-brown/15 text-brand-brown font-bold text-sm">
            Login
          </Link>
        </div>
      </div>
    </PageShell>
  );
};

export default UnauthorizedPage;

