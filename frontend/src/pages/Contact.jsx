import { useNavigate } from 'react-router-dom';
import { Mail, MapPin, Phone, MessageCircle } from 'lucide-react';
import PageShell from '../components/PageShell';

const ContactPage = () => {
  const navigate = useNavigate();

  const contactItems = [
    { icon: Phone, label: 'Phone', value: '+91 98765 43210' },
    { icon: Mail, label: 'Email', value: 'support@mittimart.test' },
    { icon: MapPin, label: 'Office', value: 'Motihari, Bihar' },
  ];

  return (
    <PageShell
      eyebrow="Contact"
      title="Need help with your orders or shop setup?"
      description="This is a mock contact page for the frontend RBAC build. The layout stays aligned with the current design system."
      actions={
        <button
          onClick={() => navigate('/chat')}
          className="px-5 py-2.5 rounded-full bg-brand-orange text-white font-bold text-sm shadow-md inline-flex items-center gap-2"
        >
          <MessageCircle className="w-4 h-4" />
          Open Chat
        </button>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <section className="bg-white border border-brand-brown/10 rounded-2xl p-6 shadow-sm">
          <h2 className="font-heading text-2xl font-bold text-brand-brown mb-4">Send a message</h2>
          <div className="space-y-4">
            <input className="w-full px-4 py-3 rounded-full border border-brand-brown/15 outline-none" placeholder="Your name" />
            <input className="w-full px-4 py-3 rounded-full border border-brand-brown/15 outline-none" placeholder="Your email" />
            <textarea className="w-full px-4 py-3 rounded-2xl border border-brand-brown/15 outline-none min-h-32" placeholder="How can we help?" />
            <button className="px-5 py-3 rounded-full bg-brand-brown text-white font-bold shadow-md">
              Submit
            </button>
          </div>
        </section>

        <section className="space-y-4">
          {contactItems.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.label} className="bg-white border border-brand-brown/10 rounded-2xl p-5 shadow-sm flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-brand-cream text-brand-orange flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider font-bold text-brand-muted">{item.label}</div>
                  <div className="font-semibold text-brand-brown">{item.value}</div>
                </div>
              </article>
            );
          })}
        </section>
      </div>
    </PageShell>
  );
};

export default ContactPage;