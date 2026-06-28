import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Plus, ShoppingBag, IndianRupee, BarChart3, CheckCircle2, Clock } from 'lucide-react';
import { products, initialOrders, chatThreads, analyticsBars } from '../data/mockData';

const SellerDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { label: "Today's Orders", value: initialOrders.length, icon: ShoppingBag, color: 'brand-orange' },
    { label: 'Total Earnings', value: '₹4,200', icon: IndianRupee, color: 'brand-green' },
    { label: 'Shop Views', value: '1.8K', icon: BarChart3, color: 'brand-brown' },
    { label: 'Reviews', value: '24', icon: CheckCircle2, color: 'brand-orange' }
  ];

  return (
    <div className="min-h-screen bg-brand-cream">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-heading text-3xl font-bold text-brand-brown">Namaste Sunita Ji 👋</h1>
            <p className="text-brand-muted font-medium">Welcome back to your MittiMart Seller Panel</p>
          </div>
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-brand-brown hover:text-brand-orange font-semibold"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white border border-brand-brown/10 rounded-2xl p-5 shadow-sm"
            >
              <div className={`w-10 h-10 rounded-full bg-${stat.color}/10 flex items-center justify-center mb-3`}>
                <stat.icon className={`w-5 h-5 text-${stat.color}`} />
              </div>
              <div className="text-2xl font-extrabold text-brand-brown">{stat.value}</div>
              <div className="text-xs uppercase font-bold text-brand-muted">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* AI Tools Section */}
        <div className="bg-gradient-to-r from-brand-brown to-brand-orange rounded-2xl p-6 md:p-8 mb-8 shadow-premium">
          <div className="text-white max-w-xl">
            <span className="text-xs uppercase font-bold bg-white/20 px-3 py-1 rounded-full">
              AI Seller Tools
            </span>
            <h2 className="font-heading text-2xl font-bold mt-3 mb-2">
              Let AI Help You Sell Better
            </h2>
            <p className="text-white/80 text-sm mb-4">
              Our AI tools can generate descriptions, enhance your product photos, and suggest pricing.
            </p>
            <div className="flex flex-wrap gap-3">
              <button className="px-4 py-2 bg-white text-brand-brown font-bold text-xs rounded-full shadow-md">
                AI Description Generator
              </button>
              <button className="px-4 py-2 bg-white/20 hover:bg-white/30 border border-white/20 text-white font-bold text-xs rounded-full">
                Photo Enhancer
              </button>
              <button className="px-4 py-2 bg-white/20 hover:bg-white/30 border border-white/20 text-white font-bold text-xs rounded-full">
                Sales Suggestions
              </button>
            </div>
          </div>
        </div>

        {/* Quick Add Product */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/seller/add-product')}
            className="px-6 py-3 bg-brand-orange text-white font-bold rounded-full shadow-md flex items-center gap-2 hover:scale-102 transition-transform"
          >
            <Plus className="w-4 h-4" />
            Add New Product
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {['overview', 'products', 'orders', 'messages'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-sm font-semibold capitalize ${
                activeTab === tab
                  ? 'bg-brand-brown text-white'
                  : 'bg-white border border-brand-brown/10 text-brand-brown'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              {/* Recent Orders */}
              <div className="bg-white border border-brand-brown/10 rounded-2xl p-6 shadow-sm">
                <h3 className="font-heading text-lg font-bold text-brand-brown mb-4">Recent Orders</h3>
                <div className="space-y-3">
                  {initialOrders.map((order) => {
                    const product = products.find(p => p.slug === order.productSlug);
                    return (
                      <div key={order.id} className="flex items-center justify-between p-3 bg-brand-cream/50 rounded-xl">
                        <div>
                          <strong className="text-brand-brown">{order.id}</strong>
                          <p className="text-xs text-brand-muted">{product?.name}</p>
                          <p className="text-xs text-brand-muted">From: {order.buyerCity}</p>
                        </div>
                        <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                          order.status === 'orange' ? 'bg-brand-orange/10 text-brand-orange' :
                          order.status === 'blue' ? 'bg-blue-100 text-blue-600' :
                          'bg-brand-green/10 text-brand-green'
                        }`}>
                          {order.status === 'orange' ? 'Pending' : order.status === 'blue' ? 'Processing' : 'Shipped'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Growth Analytics */}
              <div className="bg-white border border-brand-brown/10 rounded-2xl p-6 shadow-sm">
                <h3 className="font-heading text-lg font-bold text-brand-brown mb-4">Growth Analytics</h3>
                <div className="flex items-end justify-between h-32">
                  {analyticsBars.map((bar, idx) => (
                    <div key={idx} className="flex flex-col items-center">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${bar.value}%` }}
                        transition={{ delay: idx * 0.1 }}
                        className="w-8 bg-gradient-to-t from-brand-orange to-brand-brown rounded-full"
                        style={{ height: `${bar.value * 2}px` }}
                      />
                      <span className="text-[10px] text-brand-muted mt-1">{bar.month}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'products' && (
            <motion.div
              key="products"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
            >
              {products.filter(p => p.artistSlug === 'sunita-devi-madhubani').map(product => (
                <div key={product.slug} className="bg-white border border-brand-brown/10 rounded-2xl overflow-hidden shadow-sm">
                  <img src={product.image} alt={product.name} className="w-full h-40 object-cover" />
                  <div className="p-4">
                    <h4 className="font-heading font-bold text-brand-brown text-sm mb-1">{product.name}</h4>
                    <p className="text-xs text-brand-muted mb-2">₹{product.price} &middot; {product.rating}★</p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => navigate(`/seller/edit-product/${product.slug}`)}
                        className="flex-1 py-1.5 bg-brand-cream border border-brand-brown/10 text-xs font-semibold rounded-full"
                      >
                        Edit
                      </button>
                      <button className="flex-1 py-1.5 bg-brand-green/10 text-brand-green text-xs font-semibold rounded-full">
                        Live
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'orders' && (
            <motion.div
              key="orders"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white border border-brand-brown/10 rounded-2xl p-6 shadow-sm"
            >
              <h3 className="font-heading text-lg font-bold text-brand-brown mb-4">All Orders</h3>
              <div className="space-y-3">
                {initialOrders.map((order) => {
                  const product = products.find(p => p.slug === order.productSlug);
                  return (
                    <div key={order.id} className="flex items-center justify-between p-4 border border-brand-brown/5 rounded-xl">
                      <div className="flex-1">
                        <strong className="text-brand-brown block">{order.id} - {product?.name}</strong>
                        <p className="text-xs text-brand-muted">Buyer: {order.buyerCity} &middot; Amount: ₹{order.amount}</p>
                      </div>
                      <select className="ml-4 px-3 py-1.5 border border-brand-brown/15 rounded-full text-xs font-semibold">
                        <option>Pending</option>
                        <option>Processing</option>
                        <option>Shipped</option>
                        <option>Delivered</option>
                      </select>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {activeTab === 'messages' && (
            <motion.div
              key="messages"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white border border-brand-brown/10 rounded-2xl p-6 shadow-sm"
            >
              <h3 className="font-heading text-lg font-bold text-brand-brown mb-4">Messages</h3>
              <div className="space-y-3">
                {chatThreads.map((thread, idx) => (
                  <div key={idx} className="p-4 border border-brand-brown/5 rounded-xl hover:bg-brand-cream/30 cursor-pointer">
                    <div className="flex items-center justify-between mb-2">
                      <strong className="text-brand-brown">{thread.name}</strong>
                      <span className="text-xs text-brand-muted">{thread.lastSeen}</span>
                    </div>
                    <p className="text-xs text-brand-muted">From: {thread.city}</p>
                    <p className="text-xs text-brand-dark mt-1 truncate">
                      {thread.messages[thread.messages.length - 1]?.text}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SellerDashboard;