import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Package, Truck, CheckCircle2, Clock, MapPin } from 'lucide-react';

const TrackingPage = () => {
  const [orderId, setOrderId] = useState('');
  const [trackingData, setTrackingData] = useState(null);

  const handleTrack = (e) => {
    e.preventDefault();
    if (orderId) {
      setTrackingData({
        id: orderId,
        status: 'In Transit',
        timeline: [
          { status: 'Order Placed', date: 'Today, 10:00 AM', completed: true, icon: Package },
          { status: 'Artist Creating', date: 'Today, 2:30 PM', completed: true, icon: Clock },
          { status: 'Quality Check', date: 'Tomorrow, 11:00 AM', completed: false, icon: Clock },
          { status: 'Shipped', date: 'Scheduled', completed: false, icon: Truck },
          { status: 'Delivered', date: 'Expected Friday', completed: false, icon: CheckCircle2 }
        ]
      });
    }
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

        <h1 className="font-heading text-2xl font-bold text-brand-brown mb-6">Track Your Order</h1>

        <div className="bg-white border border-brand-brown/10 rounded-2xl p-6 shadow-premium mb-8">
          <form onSubmit={handleTrack} className="flex gap-3">
            <input
              type="text"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="Enter order ID (e.g., MM-1209)"
              className="flex-1 px-4 py-2.5 border border-brand-brown/15 rounded-full text-sm outline-none focus:border-brand-orange"
            />
            <button
              type="submit"
              className="px-6 py-2.5 bg-brand-orange text-white font-bold rounded-full shadow-md hover:scale-102 transition-transform"
            >
              Track
            </button>
          </form>
        </div>

        {trackingData && (
          <div className="bg-white border border-brand-brown/10 rounded-2xl p-6 shadow-premium">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-heading text-lg font-bold text-brand-brown">Order {trackingData.id}</h2>
                <p className="text-sm text-brand-muted">Current Status: {trackingData.status}</p>
              </div>
              <div className="w-14 h-14 rounded-full bg-brand-orange/10 flex items-center justify-center">
                <Package className="w-6 h-6 text-brand-orange" />
              </div>
            </div>

            <div className="relative">
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-brand-brown/10" />
              <div className="space-y-6">
                {trackingData.timeline.map((item, idx) => (
                  <div key={idx} className="relative flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center z-10 ${
                      item.completed ? 'bg-brand-green/10 text-brand-green' : 'bg-brand-cream text-brand-muted'
                    }`}>
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 pt-2">
                      <div className="font-semibold text-brand-brown">{item.status}</div>
                      <div className="text-xs text-brand-muted">{item.date}</div>
                    </div>
                    {item.completed && (
                      <CheckCircle2 className="w-4 h-4 text-brand-green self-center" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 p-4 bg-brand-cream/50 rounded-xl">
              <div className="flex items-center gap-2 text-sm text-brand-muted">
                <MapPin className="w-4 h-4 text-brand-orange" />
                Estimated Delivery: Friday, June 20, 2026
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackingPage;