import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Store, Mail, Lock, Phone, MapPin, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AuthPage = ({ onNavigate, defaultTab = 'buyer' }) => {
  const { loginBuyer, loginSeller } = useAuth();
  const [tab, setTab] = useState(defaultTab);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (tab === 'buyer') {
      loginBuyer(formData.email);
      onNavigate('home');
    } else {
      loginSeller(formData);
      onNavigate('seller');
    }
  };

  return (
    <div className="min-h-screen bg-brand-cream flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2 text-brand-brown hover:text-brand-orange font-semibold mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-brand-brown/10 rounded-2xl p-6 shadow-premium"
        >
          <h1 className="font-heading text-2xl font-bold text-brand-brown mb-6 text-center">
            Welcome to MittiMart
          </h1>

          <div className="flex gap-2 mb-6 bg-brand-cream rounded-full p-1.5 border border-brand-brown/10">
            <button
              onClick={() => setTab('buyer')}
              className={`flex-1 py-2 rounded-full font-semibold text-sm flex items-center justify-center gap-2 ${
                tab === 'buyer' ? 'bg-gradient-to-r from-brand-brown to-brand-orange text-white' : 'text-brand-brown'
              }`}
            >
              <User className="w-4 h-4" /> Buyer
            </button>
            <button
              onClick={() => setTab('seller')}
              className={`flex-1 py-2 rounded-full font-semibold text-sm flex items-center justify-center gap-2 ${
                tab === 'seller' ? 'bg-gradient-to-r from-brand-brown to-brand-orange text-white' : 'text-brand-brown'
              }`}
            >
              <Store className="w-4 h-4" /> Seller
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-brand-brown mb-1.5 block">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={tab === 'seller' ? 'Your shop/artist name' : 'Your name'}
                  className="w-full pl-10 pr-4 py-2.5 border border-brand-brown/15 rounded-full text-sm outline-none focus:border-brand-orange"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-brand-brown mb-1.5 block">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-2.5 border border-brand-brown/15 rounded-full text-sm outline-none focus:border-brand-orange"
                  required
                />
              </div>
            </div>

            {tab === 'seller' && (
              <>
                <div>
                  <label className="text-sm font-semibold text-brand-brown mb-1.5 block">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 XXXXXXXXXX"
                      className="w-full pl-10 pr-4 py-2.5 border border-brand-brown/15 rounded-full text-sm outline-none focus:border-brand-orange"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-brand-brown mb-1.5 block">
                    Location / Village
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted" />
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="Madhubani, Bihar"
                      className="w-full pl-10 pr-4 py-2.5 border border-brand-brown/15 rounded-full text-sm outline-none focus:border-brand-orange"
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="text-sm font-semibold text-brand-brown mb-1.5 block">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  className="w-full pl-10 pr-4 py-2.5 border border-brand-brown/15 rounded-full text-sm outline-none focus:border-brand-orange"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-brand-brown to-brand-orange text-white font-bold rounded-full shadow-md hover:scale-102 transition-transform"
            >
              {tab === 'buyer' ? 'Login as Buyer' : 'Register as Seller'}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthPage;