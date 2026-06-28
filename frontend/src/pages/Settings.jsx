import { ShieldCheck, Bell, Palette } from 'lucide-react';
import PageShell from '../components/PageShell';

const SettingsPage = () => {
  return (
    <PageShell
      eyebrow="Admin"
      title="Settings"
      description="Admin preferences and platform controls."
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { icon: ShieldCheck, title: 'Security', text: 'Access and auth defaults for the platform.' },
          { icon: Bell, title: 'Notifications', text: 'Alerts, moderation, and operational events.' },
          { icon: Palette, title: 'Brand', text: 'Theme tokens and UI preferences.' },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <article key={item.title} className="bg-white border border-brand-brown/10 rounded-2xl p-5 shadow-sm">
              <div className="w-11 h-11 rounded-2xl bg-brand-cream text-brand-orange flex items-center justify-center mb-4">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="font-heading text-xl font-bold text-brand-brown">{item.title}</h3>
              <p className="text-sm text-brand-muted mt-2">{item.text}</p>
            </article>
          );
        })}
      </div>
    </PageShell>
  );
};

export default SettingsPage;

