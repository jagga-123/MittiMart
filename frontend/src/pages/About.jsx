import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Globe2, HandCoins, Truck } from 'lucide-react';
import PageShell from '../components/PageShell';

const AboutPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: HandCoins,
      title: 'Fair earnings',
      text: 'Every order is designed to send more value directly to artisans and village entrepreneurs.',
    },
    {
      icon: Globe2,
      title: 'Made for local craft',
      text: 'MittiMart keeps the visual language rooted in handmade products, not generic marketplace noise.',
    },
    {
      icon: ShieldCheck,
      title: 'Trust and access',
      text: 'RBAC keeps each role on the right screens while staying ready for a backend JWT integration later.',
    },
    {
      icon: Truck,
      title: 'Fulfillment support',
      text: 'Shipping, tracking, and seller workflows remain mock-first but structured for live APIs later.',
    },
  ];

  return (
    <PageShell
      eyebrow="About MittiMart"
      title="A marketplace built around artisans, not abstractions."
      description="This frontend-only RBAC layer keeps the existing storefront intact while adding role-aware access, reusable guards, and auth state that can connect to a real backend later."
      actions={
        <button
          onClick={() => navigate('/')}
          className="px-5 py-2.5 rounded-full bg-brand-brown text-white font-bold text-sm shadow-md"
        >
          Back Home
        </button>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <article key={feature.title} className="bg-white border border-brand-brown/10 rounded-2xl p-5 shadow-sm">
              <div className="w-11 h-11 rounded-2xl bg-brand-orange/10 text-brand-orange flex items-center justify-center mb-4">
                <Icon className="w-5 h-5" />
              </div>
              <h2 className="font-heading text-xl font-bold text-brand-brown mb-2">{feature.title}</h2>
              <p className="text-sm text-brand-muted leading-relaxed">{feature.text}</p>
            </article>
          );
        })}
      </div>
    </PageShell>
  );
};

export default AboutPage;