import { MessageCircle } from 'lucide-react';
import PageShell from '../components/PageShell';
import { chatThreads } from '../data/mockData';

const SellerMessagesPage = () => {
  return (
    <PageShell
      eyebrow="Seller Messages"
      title="Messages from buyers"
      description="A protected inbox screen for seller workflows."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {chatThreads.map((thread) => (
          <article key={thread.name} className="bg-white border border-brand-brown/10 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-heading text-lg font-bold text-brand-brown">{thread.name}</h3>
              <span className="text-xs text-brand-muted">{thread.lastSeen}</span>
            </div>
            <p className="text-xs text-brand-muted mb-2">{thread.city}</p>
            <p className="text-sm text-brand-dark leading-relaxed line-clamp-3">
              {thread.messages[thread.messages.length - 1]?.text}
            </p>
            <button className="mt-4 px-4 py-2 rounded-full bg-brand-brown text-white text-xs font-bold inline-flex items-center gap-2">
              <MessageCircle className="w-3.5 h-3.5" />
              Reply
            </button>
          </article>
        ))}
      </div>
    </PageShell>
  );
};

export default SellerMessagesPage;

