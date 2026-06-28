import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Volume2 } from 'lucide-react';
import IndiaMap from '../components/IndiaMap';
import ProductCard from '../components/ProductCard';
import ArtistCard from '../components/ArtistCard';
import ReelCard from '../components/ReelCard';
import MittiAI from '../components/MittiAI';
import { useVoice } from '../context/VoiceContext';
import { useCart } from '../context/CartContext';
import { products, artists, reels, stateData } from '../data/mockData';

const Home = () => {
  const navigate = useNavigate();
  const { speak } = useVoice();
  const [selectedState, setSelectedState] = useState('Rajasthan');
  const [searchFilter, setSearchFilter] = useState('');
  const [stateFilter, setStateFilter] = useState('');
  const [craftFilter, setCraftFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState(10000);
  const [timeFilter, setTimeFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState(0);
  const [sortBy, setSortBy] = useState('Newest');

  // Modal States
  const [storyModalArtist, setStoryModalArtist] = useState(null);
  const [reelModal, setReelModal] = useState(null);

  // Impact Counter refs
  const [animatedCounters, setAnimatedCounters] = useState(false);
  const [counters, setCounters] = useState({ artists: 0, states: 0, products: 0 });
  const impactRef = useRef(null);

  // Intersection Observer for counters
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animatedCounters) {
          setAnimatedCounters(true);
          const duration = 1500;
          const start = performance.now();

          const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            setCounters({
              artists: Math.round(2400 * progress),
              states: Math.round(28 * progress),
              products: Math.round(14000 * progress)
            });
            if (progress < 1) {
              requestAnimationFrame(tick);
            }
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );

    if (impactRef.current) {
      observer.observe(impactRef.current);
    }
    return () => observer.disconnect();
  }, [animatedCounters]);

  // Read state craft aloud on state click
  const handleSelectState = (stateName) => {
    setSelectedState(stateName);
    const state = stateData.find(s => s.name === stateName);
    if (state) {
      speak(`${state.name} ki famous kala: ${state.desc}`, 'hi-IN');
    }
  };

  // Filter and sort products
  const filteredProducts = products.filter((p) => {
    const matchesSearch = [p.name, p.artist, p.craft, p.state].join(' ').toLowerCase().includes(searchFilter.toLowerCase());
    const matchesState = stateFilter ? p.state === stateFilter : true;
    const matchesCraft = craftFilter ? p.craft === craftFilter : true;
    const matchesPrice = p.price <= priceFilter;
    const matchesTime = timeFilter ? p.timeBucket === timeFilter : true;
    const matchesRating = p.rating >= ratingFilter;
    return matchesSearch && matchesState && matchesCraft && matchesPrice && matchesTime && matchesRating;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'Price Low-High') return a.price - b.price;
    if (sortBy === 'Price High-Low') return b.price - a.price;
    if (sortBy === 'Most Loved') return b.rating - a.rating;
    return b.price - a.price;
  });

  const activeFilterChips = [];
  if (stateFilter) activeFilterChips.push({ key: 'state', label: `State: ${stateFilter}`, clear: () => setStateFilter('') });
  if (craftFilter) activeFilterChips.push({ key: 'craft', label: `Craft: ${craftFilter}`, clear: () => setCraftFilter('') });
  if (priceFilter < 10000) activeFilterChips.push({ key: 'price', label: `Price <= ₹${priceFilter}`, clear: () => setPriceFilter(10000) });
  if (timeFilter) activeFilterChips.push({ key: 'time', label: `Time: ${timeFilter}`, clear: () => setTimeFilter('') });
  if (ratingFilter > 0) activeFilterChips.push({ key: 'rating', label: `Rating >= ${ratingFilter}★`, clear: () => setRatingFilter(0) });

  return (
    <div className="font-body text-brand-dark flex flex-col gap-12">
      {/* SECTION 1 — Cinematic Hero Section */}
      <section className="relative min-h-[85vh] rounded-3xl overflow-hidden flex items-center px-6 md:px-12 py-12 text-white shadow-premium">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 bg-brand-dark/50 z-10" />
        <img
          src="https://images.unsplash.com/photo-1524492449090-3f58dbe8a6a7?auto=format&fit=crop&w=1800&q=80"
          alt="Indian artisan painting pottery"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="relative z-20 max-w-2xl flex flex-col items-start gap-4">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white/20 border border-white/20 rounded-full text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
            Apni Mitti Ka Hunar, Har Ghar Tak
          </span>
          <h1 className="font-heading text-6xl md:text-7xl font-bold leading-none select-none">
            MittiMart
          </h1>
          <p className="font-heading text-2xl md:text-3xl font-medium leading-tight">
            Discover handmade treasures crafted by real Indian artists and bring their stories into your home.
          </p>
          <div className="flex flex-wrap items-center gap-4 mt-4">
            <button
              onClick={() => document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-6 py-3 bg-gradient-to-r from-brand-brown to-brand-orange text-white font-bold rounded-full shadow-lg hover:scale-105 active:scale-95 transition-transform flex items-center gap-2"
            >
              Explore Crafts <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigate('/register?role=seller')}
              className="px-6 py-3 bg-white/10 hover:bg-white/25 border border-white/30 text-white font-bold rounded-full backdrop-blur-sm transition-colors"
            >
              Become a Seller
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 2 — Impact Counter */}
      <section ref={impactRef} className="text-center py-6">
        <span className="text-xs uppercase font-extrabold tracking-wider text-brand-orange">
          Real Artists. Real Impact.
        </span>
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-brand-brown mt-2 mb-8">
          Empowering Village Talent Across India
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {[
            { value: `${counters.artists.toLocaleString('en-IN')}+`, label: 'Artists Supported' },
            { value: `${counters.states}`, label: 'States Represented' },
            { value: `${counters.products.toLocaleString('en-IN')}+`, label: 'Products Handmade' },
            { value: '₹1.2 Cr+', label: 'Total Earned by Artisans' }
          ].map((item, idx) => (
            <article key={idx} className="bg-white border border-brand-brown/10 rounded-2xl p-5 shadow-sm">
              <div className="text-3xl md:text-4xl font-extrabold text-brand-orange font-body mb-1">
                {item.value}
              </div>
              <div className="text-xs font-semibold text-brand-muted uppercase tracking-wider">
                {item.label}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* SECTION 3 — Interactive India Craft Map */}
      <section className="flex flex-col gap-6">
        <div className="text-center">
          <span className="text-xs uppercase font-extrabold tracking-wider text-brand-orange">
            Regional Diversity
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-brand-brown mt-1">
            Explore India's Hidden Talent
          </h2>
          <p className="text-brand-muted text-sm max-w-md mx-auto mt-2">
            Click on the state highlights to discover their rich traditional craftsmanship.
          </p>
        </div>

        <IndiaMap selectedState={selectedState} onSelectState={handleSelectState} />
      </section>

      {/* SECTION 4 — Artist Story Cards Carousel */}
      <section className="flex flex-col gap-6">
        <div>
          <span className="text-xs uppercase font-extrabold tracking-wider text-brand-orange">
            The Hands Behind Your Home
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-brand-brown mt-1">
            Meet Our Master Artisans
          </h2>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar scroll-smooth snap-x snap-mandatory">
          {artists.map((artist) => (
            <div key={artist.slug} className="min-w-[290px] sm:min-w-[360px] snap-start flex-shrink-0">
              <ArtistCard
                artist={artist}
                onWatchStory={(art) => setStoryModalArtist(art)}
                onNavigate={(path) => navigate(path)}
              />
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 5 — Product Section (Storytelling Cards) */}
      <section id="products-section" className="flex flex-col gap-6 scroll-mt-20">
        <div>
          <span className="text-xs uppercase font-extrabold tracking-wider text-brand-orange">
            Not Just Products. Stories.
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-brand-brown mt-1">
            Shop Handmade Heritages
          </h2>
        </div>

        {/* Filters Header Row */}
        <div className="bg-brand-card border border-brand-brown/10 rounded-2xl p-4 md:p-6 shadow-sm flex flex-col gap-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {/* Filter by State */}
            <label className="flex flex-col gap-1.5 text-xs font-bold text-brand-brown">
              State
              <select
                value={stateFilter}
                onChange={(e) => setStateFilter(e.target.value)}
                className="w-full bg-white border border-brand-brown/10 rounded-full px-3.5 py-2 text-xs font-semibold outline-none"
              >
                <option value="">All States</option>
                {stateData.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}
              </select>
            </label>

            {/* Filter by Craft */}
            <label className="flex flex-col gap-1.5 text-xs font-bold text-brand-brown">
              Craft Type
              <select
                value={craftFilter}
                onChange={(e) => setCraftFilter(e.target.value)}
                className="w-full bg-white border border-brand-brown/10 rounded-full px-3.5 py-2 text-xs font-semibold outline-none"
              >
                <option value="">All Crafts</option>
                <option value="Painting">Painting</option>
                <option value="Pottery">Pottery</option>
                <option value="Textile">Textile</option>
                <option value="Weaving">Weaving</option>
              </select>
            </label>

            {/* Price Slider */}
            <label className="flex flex-col gap-1.5 text-xs font-bold text-brand-brown">
              Price Range (Max: ₹{priceFilter})
              <input
                type="range"
                min="0"
                max="10000"
                step="500"
                value={priceFilter}
                onChange={(e) => setPriceFilter(Number(e.target.value))}
                className="w-full appearance-none h-1.5 bg-brand-cream border border-brand-brown/15 rounded-lg cursor-pointer accent-brand-orange"
              />
            </label>

            {/* Making Time */}
            <label className="flex flex-col gap-1.5 text-xs font-bold text-brand-brown">
              Making Time
              <select
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
                className="w-full bg-white border border-brand-brown/10 rounded-full px-3.5 py-2 text-xs font-semibold outline-none"
              >
                <option value="">All Duration</option>
                <option value="1-3 days">1-3 Days</option>
                <option value="3-7 days">3-7 Days</option>
                <option value="7+ days">7+ Days</option>
              </select>
            </label>

            {/* Sorting */}
            <label className="flex flex-col gap-1.5 text-xs font-bold text-brand-brown">
              Sort By
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-white border border-brand-brown/10 rounded-full px-3.5 py-2 text-xs font-semibold outline-none animate-scale"
              >
                <option>Newest</option>
                <option>Most Loved</option>
                <option>Price Low-High</option>
                <option>Price High-Low</option>
              </select>
            </label>
          </div>

          {/* Active Chips */}
          {activeFilterChips.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 border-t border-brand-brown/5 pt-4">
              <span className="text-[10px] uppercase font-bold text-brand-muted">Active Filters:</span>
              {activeFilterChips.map((chip) => (
                <button
                  key={chip.key}
                  onClick={chip.clear}
                  className="bg-brand-cream/80 hover:bg-brand-cream text-brand-brown border border-brand-brown/15 rounded-full px-3 py-1 text-[11px] font-bold transition-all hover:scale-102 flex items-center gap-1.5 shadow-sm"
                >
                  {chip.label} <span className="text-brand-orange text-xs">×</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {sortedProducts.map((p) => (
            <ProductCard key={p.slug} product={p} onNavigate={(path) => navigate(path)} />
          ))}
          {sortedProducts.length === 0 && (
            <div className="col-span-full bg-white border border-brand-brown/10 rounded-2xl py-12 text-center text-brand-muted font-bold">
              No products match the selected filters.
            </div>
          )}
        </div>
      </section>

      {/* SECTION 7 — Instagram Reels inspired Vertical Video Grid */}
      <section className="flex flex-col gap-6">
        <div>
          <span className="text-xs uppercase font-extrabold tracking-wider text-brand-orange">
            Watch It Being Made
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-brand-brown mt-1">
            Artisan Reels & Creations
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {reels.map((reel) => (
            <ReelCard
              key={reel.slug}
              reel={reel}
              onOpenReel={(r) => setReelModal(r)}
            />
          ))}
        </div>
      </section>

      {/* SECTION 8 — AI Gift Finder */}
      <section className="py-6">
        <MittiAI onNavigate={(path) => navigate(path)} />
      </section>

      {/* SECTION 9 — Mitra Card Helper */}
      <section className="bg-brand-brown text-white rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-premium">
        <div className="max-w-xl text-left">
          <span className="text-xs uppercase font-bold text-brand-orange tracking-widest bg-white/10 px-3 py-1.5 rounded-full">
            MittiMart Mitra Program
          </span>
          <h3 className="font-heading text-3xl font-bold mt-4 mb-2">
            Need Help Uploading or Selling?
          </h3>
          <p className="text-white/80 text-sm leading-relaxed">
            Our local village volunteers (Mitras) are always nearby to assist you with setting up your profile, taking product photographs, and listing items by voice.
          </p>
        </div>
        <div className="flex items-center gap-4 bg-white/10 border border-white/20 p-4 rounded-2xl backdrop-blur-sm flex-shrink-0">
          <div className="w-12 h-12 rounded-full bg-brand-orange flex items-center justify-center font-bold text-white text-lg">
            RK
          </div>
          <div>
            <strong className="block text-sm font-semibold text-white">Ravi Kumar</strong>
            <p className="text-xs text-white/70">Mitra &bull; Motihari, Bihar</p>
            <p className="text-xs italic text-brand-orange font-bold mt-1">"Koi bhi problem ho, main hoon!"</p>
          </div>
        </div>
        <button
          onClick={() => speak('Aapke paas ka Mitra Ravi Kumar hai. Unka number nau aath satyaasi che chaurasi teen sau do hai. Unhe call lagaya ja raha hai.', 'hi-IN')}
          className="px-6 py-3 bg-brand-orange hover:bg-brand-orange/90 text-white font-bold rounded-full shadow-md transition-colors"
        >
          📞 Call Mitra Now
        </button>
      </section>

      {/* MODAL SECTION: Artist Story Player */}
      <AnimatePresence>
        {storyModalArtist && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-brand-cream max-w-2xl w-full border border-brand-brown/15 rounded-3xl overflow-hidden shadow-premium p-6 relative font-body text-brand-dark"
            >
              <button
                onClick={() => setStoryModalArtist(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-brand-brown/10 text-brand-brown hover:bg-brand-brown/25 flex items-center justify-center text-xl font-bold"
              >
                &times;
              </button>

              <div className="flex items-start gap-4 mb-4">
                <img
                  src={storyModalArtist.image}
                  alt={storyModalArtist.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-brand-orange/30"
                />
                <div>
                  <span className="text-[10px] font-bold text-brand-orange uppercase bg-brand-orange/10 px-2.5 py-0.5 rounded-full">
                    Artisan Story
                  </span>
                  <h3 className="font-heading text-2xl font-bold text-brand-brown mt-1.5">{storyModalArtist.name}</h3>
                  <p className="text-xs text-brand-muted font-medium">{storyModalArtist.location} &middot; {storyModalArtist.exp} Years Exp</p>
                </div>
              </div>

              {/* Video Mock */}
              <div className="h-64 rounded-2xl bg-brand-dark relative overflow-hidden flex items-center justify-center mb-4 border border-brand-brown/10 shadow-inner">
                <img
                  src="https://images.unsplash.com/photo-1513208700085-cf0d7f6b2d6f?auto=format&fit=crop&w=1200&q=80"
                  alt="artisan work video"
                  className="absolute inset-0 w-full h-full object-cover opacity-60"
                />
                <button
                  onClick={() => speak(storyModalArtist.story, 'hi-IN')}
                  className="w-16 h-16 rounded-full bg-white/95 border border-brand-brown/10 text-brand-orange flex items-center justify-center hover:scale-105 transition-transform shadow-md"
                  title="Play artist voice story"
                >
                  <Volume2 className="w-8 h-8" />
                </button>
              </div>

              <p className="text-brand-brown text-sm leading-relaxed mb-6 font-medium">
                {storyModalArtist.story}
              </p>

              <div className="flex gap-3 justify-end border-t border-brand-brown/5 pt-4">
                <button
                  onClick={() => {
                    setStoryModalArtist(null);
                    navigate(`/artist/${storyModalArtist.slug}`);
                  }}
                  className="px-5 py-2.5 bg-brand-brown text-white font-bold text-xs rounded-full hover:bg-brand-brown/95 transition-colors"
                >
                  Visit Artist Shop
                </button>
                <button
                  onClick={() => setStoryModalArtist(null)}
                  className="px-5 py-2.5 bg-brand-cream border border-brand-brown/15 hover:bg-brand-cream/80 text-brand-brown font-bold text-xs rounded-full transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL SECTION: Reels Player */}
      <AnimatePresence>
        {reelModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-brand-cream max-w-3xl w-full border border-brand-brown/15 rounded-3xl overflow-hidden shadow-premium p-6 relative font-body text-brand-dark flex flex-col md:flex-row gap-6"
            >
              <button
                onClick={() => setReelModal(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-brand-brown/10 text-brand-brown hover:bg-brand-brown/25 flex items-center justify-center text-xl font-bold z-10"
              >
                &times;
              </button>

              {/* Left Column: Vertical Video */}
              <div className="w-full md:w-1/2 h-96 rounded-2xl bg-brand-dark relative overflow-hidden flex items-center justify-center border border-brand-brown/10 shadow-inner flex-shrink-0">
                <img
                  src={reelModal.image}
                  alt="Reel thumbnail"
                  className="absolute inset-0 w-full h-full object-cover opacity-80"
                />
                <button
                  onClick={() => speak(`Watch Sunita Devi create this classic Madhubani Painting. Woven with organic pigments.`, 'en-IN')}
                  className="w-14 h-14 rounded-full bg-white/95 border border-brand-brown/10 text-brand-orange flex items-center justify-center hover:scale-105 transition-transform shadow-md"
                >
                  <Volume2 className="w-6 h-6" />
                </button>
              </div>

              {/* Right Column: Product Info & Actions */}
              <div className="flex-1 flex flex-col justify-between py-2 text-left">
                <div>
                  <span className="text-[10px] font-bold text-brand-orange uppercase bg-brand-orange/10 px-2.5 py-0.5 rounded-full block w-fit mb-2">
                    Craft Reel
                  </span>
                  <h3 className="font-heading text-2xl font-bold text-brand-brown leading-snug">{reelModal.artist}</h3>
                  <p className="text-xs text-brand-muted font-medium mb-4">{reelModal.craft} &middot; {reelModal.location}</p>

                  <div className="bg-white border border-brand-brown/5 rounded-2xl p-4 mb-4">
                    <strong className="block text-sm text-brand-brown font-heading font-bold mb-1">
                      Featured Creation
                    </strong>
                    <p className="text-xs text-brand-muted leading-relaxed">
                      This creation represents generations of tribal wall painters in Bihar. Add it directly to your shopping basket.
                    </p>
                  </div>
                </div>

<div className="flex flex-col gap-2">
                   <button
                     onClick={() => {
                       setReelModal(null);
                       navigate('/cart');
                     }}
                     className="w-full py-3 bg-gradient-to-r from-brand-brown to-brand-orange text-white font-bold text-xs rounded-full shadow-md hover:scale-102 transition-transform text-center"
                   >
                     Buy Featured Creation Now
                   </button>
                   <button
                     onClick={() => setReelModal(null)}
                     className="w-full py-2.5 bg-brand-cream border border-brand-brown/15 hover:bg-brand-cream/80 text-brand-brown font-bold text-xs rounded-full transition-colors text-center"
                   >
                     Close Reel
                   </button>
                 </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;