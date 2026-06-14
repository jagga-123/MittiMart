import { motion } from 'framer-motion';
import { ArrowLeft, Bell, ShoppingBag, CreditCard, MessageCircle, Trash2 } from 'lucide-react';
import { notificationsFeed } from '../data/mockData';

const NotificationsPage = () => {
  const iconMap = {
    orange: ShoppingBag,
    green: CreditCard,
    blue: MessageCircle
  };

  return (
    <div className="min-h-screen bg-brand-cream p-6">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-brand-brown hover:text-brand-orange font-semibold mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <div className="flex items-center justify-between mb-6">
          <h1 className="font-heading text-2xl font-bold text-brand-brown">Notifications</h1>
          <button className="px-4 py-2 bg-brand-cream border border-brand-brown/10 text-brand-brown font-semibold rounded-full text-xs">
            Mark All Read
          </button>
        </div>

        <div className="space-y-3">
          {notificationsFeed.map((notification, idx) => {
            const Icon = iconMap[notification.type] || Bell;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white border border-brand-brown/10 rounded-2xl p-4 shadow-sm flex items-start gap-4 hover:shadow-premium transition-shadow"
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  notification.type === 'orange' ? 'bg-brand-orange/10 text-brand-orange' :
                  notification.type === 'green' ? 'bg-brand-green/10 text-brand-green' :
                  'bg-blue-100 text-blue-600'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-brand-brown text-sm">{notification.title}</h3>
                  <p className="text-xs text-brand-muted mt-1">{notification.body}</p>
                  <span className="text-[10px] text-brand-brown/50 mt-2 block">{notification.time}</span>
                </div>
                <button className="p-1.5 rounded-full hover:bg-brand-cream text-brand-muted">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;