import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { products } from '../data/mockData';

const MittiAI = ({ onNavigate }) => {
  const [step, setStep] = useState(1);
  const [buyingFor, setBuyingFor] = useState('Mother');
  const [occasion, setOccasion] = useState('Birthday');
  const [budget, setBudget] = useState(2500);
  const [artStyle, setArtStyle] = useState('Traditional');
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState(null);

  const stepsList = [
    { num: 1, title: 'Buying For' },
    { num: 2, title: 'Occasion' },
    { num: 3, title: 'Budget' },
    { num: 4, title: 'Style' }
  ];

  const handleNext = () => {
    if (step < 4) setStep(prev => prev + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(prev => prev - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setRecommendations(null);

    setTimeout(() => {
      // Find products matching the budget and rank by rating
      const candidates = products
        .filter((p) => p.price <= budget)
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 3);

      const results = candidates.length > 0 ? candidates : products.slice(0, 2);

      setRecommendations(results);
      setLoading(false);
    }, 1400);
  };

  const handleReset = () => {
    setStep(1);
    setRecommendations(null);
  };

  return (
    <div className="bg-brand-card border border-brand-brown/10 rounded-xl p-5 md:p-7 shadow-premium backdrop-blur-md max-w-2xl mx-auto font-body">
      <div className="text-center mb-6">
        <span className="text-xs font-bold text-brand-orange uppercase bg-brand-orange/10 px-3 py-1 rounded-full">
          Ask Mitti AI
        </span>
        <h3 className="font-heading text-2xl font-bold text-brand-brown mt-2">
          Confused What To Buy?
        </h3>
        <p className="text-brand-muted text-sm mt-1">
          Your Personal Gift Guide
        </p>
      </div>

      {/* Progress indicators */}
      <div className="flex justify-center items-center gap-2 mb-8">
        {stepsList.map((s) => (
          <div key={s.num} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                step >= s.num ? 'bg-brand-brown text-white' : 'bg-brand-cream border border-brand-brown/20 text-brand-brown'
              }`}
            >
              {s.num}
            </div>
            {s.num < 4 && <div className={`w-8 h-0.5 ${step > s.num ? 'bg-brand-brown' : 'bg-brand-brown/25'}`} />}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {!loading && !recommendations && (
          <motion.form
            key="gift-form"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-6"
          >
            {step === 1 && (
              <div className="flex flex-col gap-3">
                <label className="text-sm font-bold text-brand-brown">Step 1: Who are you buying for?</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {['Mother', 'Friend', 'Partner', 'Home Decor', 'Wedding', 'Corporate Gift'].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setBuyingFor(opt)}
                      className={`px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all ${
                        buyingFor === opt
                          ? 'bg-brand-brown border-brand-brown text-white'
                          : 'bg-white border-brand-brown/10 text-brand-brown hover:bg-brand-cream/50'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="flex flex-col gap-3">
                <label className="text-sm font-bold text-brand-brown">Step 2: What's the occasion?</label>
                <div className="grid grid-cols-2 gap-2.5">
                  {['Birthday', 'Anniversary', 'Festival', 'Just Like That'].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setOccasion(opt)}
                      className={`px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all ${
                        occasion === opt
                          ? 'bg-brand-brown border-brand-brown text-white'
                          : 'bg-white border-brand-brown/10 text-brand-brown hover:bg-brand-cream/50'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="flex flex-col gap-3">
                <label className="text-sm font-bold text-brand-brown flex justify-between">
                  <span>Step 3: What is your budget?</span>
                  <span className="text-brand-orange font-extrabold">₹{budget.toLocaleString('en-IN')}</span>
                </label>
                <input
                  type="range"
                  min="200"
                  max="10000"
                  step="100"
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="w-full h-2 bg-brand-cream border border-brand-brown/10 rounded-lg appearance-none cursor-pointer accent-brand-orange"
                />
                <div className="flex justify-between text-xs text-brand-muted font-semibold">
                  <span>Min: ₹200</span>
                  <span>Max: ₹10,000</span>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="flex flex-col gap-3">
                <label className="text-sm font-bold text-brand-brown">Step 4: Choose your preferred Art Style</label>
                <div className="grid grid-cols-2 gap-2.5">
                  {['Traditional', 'Modern', 'Minimalist', 'Colourful'].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setArtStyle(opt)}
                      className={`px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all ${
                        artStyle === opt
                          ? 'bg-brand-brown border-brand-brown text-white'
                          : 'bg-white border-brand-brown/10 text-brand-brown hover:bg-brand-cream/50'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Form actions */}
            <div className="flex items-center justify-between border-t border-brand-brown/5 pt-4">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-5 py-2.5 bg-brand-cream text-brand-brown border border-brand-brown/15 hover:bg-brand-cream/90 font-bold text-xs rounded-full transition-colors"
                >
                  Back
                </button>
              ) : (
                <div />
              )}

              {step < 4 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-2.5 bg-brand-brown text-white hover:bg-brand-brown/95 font-bold text-xs rounded-full transition-colors"
                >
                  Next Step
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-gradient-to-r from-brand-brown to-brand-orange text-white font-bold text-xs rounded-full shadow-md hover:scale-105 transition-transform"
                >
                  Find Perfect Gifts
                </button>
              )}
            </div>
          </motion.form>
        )}

        {loading && (
          <motion.div
            key="gift-loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-10"
          >
            <div className="text-6xl animate-grow select-none mb-4">🌱</div>
            <p className="text-brand-brown font-heading text-lg font-bold">Mitti AI is finding the perfect gift...</p>
          </motion.div>
        )}

        {recommendations && (
          <motion.div
            key="gift-results"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex flex-col gap-4"
          >
            <div className="bg-brand-cream/50 border border-brand-brown/5 rounded-2xl p-4 mb-2 flex items-center justify-between">
              <span className="text-xs text-brand-brown font-semibold leading-relaxed">
                Matches for: <strong>{buyingFor}</strong> &middot; <strong>{occasion}</strong> &middot; Budget up to <strong>₹{budget}</strong>
              </span>
              <button
                onClick={handleReset}
                className="text-xs font-bold text-brand-orange hover:underline"
              >
                Reset Finder
              </button>
            </div>

            <div className="flex flex-col gap-3">
              {recommendations.map((product) => (
                <div
                  key={product.slug}
                  className="bg-white border border-brand-brown/5 rounded-2xl p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 rounded-xl object-cover border border-brand-brown/5"
                    />
                    <div>
                      <h4 className="font-heading font-bold text-brand-brown leading-snug">{product.name}</h4>
                      <p className="text-xs text-brand-muted font-medium mb-1">Handmade by {product.artist} &middot; ₹{product.price}</p>
                      <p className="text-xs text-brand-green font-semibold italic">
                        Why this fits: The {product.craft.toLowerCase()} details carry a {artStyle.toLowerCase()} styling tailored for your budget.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => onNavigate(`product/${product.slug}`)}
                    className="w-full sm:w-auto px-4 py-2 bg-brand-brown hover:bg-brand-brown/95 text-white font-bold text-xs rounded-full transition-colors text-center"
                  >
                    View Product
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MittiAI;
