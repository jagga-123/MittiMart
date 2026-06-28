import { AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageShell from '../components/PageShell';

const NotFoundPage = () => {
  return (
    <PageShell
      eyebrow="Not Found"
      title="404 - We could not find that page."
      description="The route may not exist yet or the URL may have changed."
    >
      <div className="bg-white border border-brand-brown/10 rounded-2xl p-8 shadow-sm max-w-2xl">
        <div className="w-16 h-16 rounded-3xl bg-brand-cream text-brand-orange flex items-center justify-center mb-4">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <p className="text-sm text-brand-muted leading-relaxed">
          Use the main navigation to return to a valid section.
        </p>
        <div className="mt-6">
          <Link to="/" className="px-5 py-2.5 rounded-full bg-gradient-to-r from-brand-brown to-brand-orange text-white font-bold text-sm">
            Back to Home
          </Link>
        </div>
      </div>
    </PageShell>
  );
};

export default NotFoundPage;

