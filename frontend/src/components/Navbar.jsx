import React, { useState, useEffect, useRef } from 'react';
import { Search, Mic, Bell, Heart, ShoppingCart, User, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import { useVoice } from '../context/VoiceContext';
import { products, artists, stateData } from '../data/mockData';

const Navbar = ({ onNavigate, currentRoute }) => {
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, logout } = useAuth();
  const { startVoiceInput, speak } = useVoice();

  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [recentSearches, setRecentSearches] = useState(() => {
    try {
      const saved = localStorage.getItem('mittimart-recent-searches');
      return saved ? JSON.parse(saved) : ["Madhubani", "Sunita Devi"];
    } catch {
      return ["Madhubani", "Sunita Devi"];
    }
  });

  const searchRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('mittimart-recent-searches', JSON.stringify(recentSearches));
  }, [recentSearches]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchChange = (val) => {
    setSearch(val);
    if (!val.trim()) {
      setSuggestions([]);
      return;
    }
    const q = val.toLowerCase();
    const matches = [];

    products.forEach((p) => {
      if ([p.name, p.artist, p.craft, p.state].join(' ').toLowerCase().includes(q)) {
        matches.push({ type: 'product', label: p.name, slug: p.slug });
      }
    });

    artists.forEach((a) => {
      if ([a.name, a.location, a.crafts.join(' ')].join(' ').toLowerCase().includes(q)) {
        matches.push({ type: 'artist', label: a.name, slug: a.slug });
      }
    });

    stateData.forEach((s) => {
      if ([s.name, s.desc].join(' ').toLowerCase().includes(q)) {
        matches.push({ type: 'state', label: `${s.name} Crafts`, slug: s.name });
      }
    });

    // Remove duplicates
    const unique = Array.from(new Map(matches.map(m => [m.label, m])).values()).slice(0, 6);
    setSuggestions(unique);
    setShowSuggestions(true);
  };

  const handleSelectSuggestion = (item) => {
    setSearch(item.label);
    setShowSuggestions(false);
    saveSearch(item.label);

    if (item.type === 'product') {
      onNavigate(`product/${item.slug}`);
    } else if (item.type === 'artist') {
      onNavigate(`artist/${item.slug}`);
    } else {
      onNavigate('home', { filterState: item.slug });
    }
  };

  const saveSearch = (term) => {
    if (!term.trim()) return;
    setRecentSearches(prev => [
      term,
      ...prev.filter(item => item !== term)
    ].slice(0, 8));
  };

  const handleVoiceSearch = () => {
    startVoiceInput((result) => {
      setSearch(result);
      saveSearch(result);
      // Trigger search navigation or search updates
      onNavigate('home', { search: result });
    }, 'hi-IN');
  };

  const triggerSearchSubmit = (e) => {
    if (e.key === 'Enter') {
      saveSearch(search);
      setShowSuggestions(false);
      onNavigate('home', { search });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-brand-cream/90 backdrop-blur-md border-b border-brand-brown/10 px-4 py-3 flex flex-wrap items-center justify-between gap-4">
      {/* Brand logo */}
      <button
        onClick={() => onNavigate('home')}
        className="flex items-center gap-3 bg-transparent text-left"
      >
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-brown to-brand-orange text-white font-extrabold flex items-center justify-center text-lg shadow-md hover:scale-105 transition-transform">
          MM
        </div>
        <div>
          <strong className="block text-brand-dark text-lg font-heading tracking-wide">MittiMart</strong>
          <small className="block text-brand-muted text-xs font-medium -mt-1 font-body">Apni Mitti Ka Hunar, Har Ghar Tak</small>
        </div>
      </button>

      {/* Search Input Bar */}
      <div ref={searchRef} className="relative flex-1 max-w-lg min-w-[280px]">
        <div className="relative flex items-center">
          <input
            type="search"
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            onFocus={() => {
              setShowSuggestions(true);
              if (!search.trim()) {
                setSuggestions(recentSearches.map(s => ({ type: 'recent', label: s })));
              }
            }}
            onKeyDown={triggerSearchSubmit}
            placeholder="Search by product, artist, craft or state"
            className="w-full bg-white border border-brand-brown/20 rounded-full px-5 py-2.5 pr-20 text-sm outline-none shadow-sm focus:border-brand-orange/60 focus:ring-4 focus:ring-brand-orange/10 transition-all font-body text-brand-dark"
          />
          <div className="absolute right-3 flex items-center gap-1">
            <button
              onClick={handleVoiceSearch}
              className="p-1.5 rounded-full hover:bg-brand-cream text-brand-brown transition-colors"
              title="Voice search"
            >
              <Mic className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                saveSearch(search);
                onNavigate('home', { search });
              }}
              className="p-1.5 rounded-full hover:bg-brand-cream text-brand-orange transition-colors"
              title="Search"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>
        </div>

        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 border border-brand-brown/10 rounded-2xl shadow-premium backdrop-blur-md overflow-hidden z-50">
            {suggestions.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectSuggestion(item)}
                className="w-full text-left px-5 py-3 hover:bg-brand-cream text-brand-dark text-sm border-b border-brand-brown/5 last:border-b-0 flex items-center justify-between transition-colors"
              >
                <span>{item.label}</span>
                <span className="text-xs text-brand-muted capitalize italic">{item.type}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="flex items-center gap-2 md:gap-4 font-body font-semibold">
        <button
          onClick={() => onNavigate('home')}
          className={`px-3 py-2 rounded-full text-sm transition-all hover:translate-y-[-1px] ${
            currentRoute === 'home'
              ? 'bg-brand-brown text-white shadow-md'
              : 'bg-white/80 text-brand-brown border border-brand-brown/10 hover:shadow-sm'
          }`}
        >
          Home
        </button>
        <button
          onClick={() => onNavigate('wishlist')}
          className={`px-3 py-2 rounded-full text-sm transition-all flex items-center gap-1.5 ${
            currentRoute === 'wishlist'
              ? 'bg-brand-brown text-white shadow-md'
              : 'bg-white/80 text-brand-brown border border-brand-brown/10 hover:shadow-sm'
          }`}
        >
          <Heart className="w-4 h-4 fill-current" />
          <span className="hidden sm:inline">Wishlist</span>
          {wishlistCount > 0 && (
            <span className="bg-brand-orange/10 text-brand-orange text-xs rounded-full px-2 py-0.5 ml-1">
              {wishlistCount}
            </span>
          )}
        </button>
        <button
          onClick={() => onNavigate('cart')}
          className={`px-3 py-2 rounded-full text-sm transition-all flex items-center gap-1.5 ${
            currentRoute === 'cart'
              ? 'bg-brand-brown text-white shadow-md'
              : 'bg-white/80 text-brand-brown border border-brand-brown/10 hover:shadow-sm'
          }`}
        >
          <ShoppingCart className="w-4 h-4" />
          <span className="hidden sm:inline">Cart</span>
          {cartCount > 0 && (
            <span className="bg-brand-orange/10 text-brand-orange text-xs rounded-full px-2 py-0.5 ml-1">
              {cartCount}
            </span>
          )}
        </button>
        <button
          onClick={() => onNavigate('tracking')}
          className={`px-3 py-2 rounded-full text-sm transition-all ${
            currentRoute === 'tracking'
              ? 'bg-brand-brown text-white shadow-md'
              : 'bg-white/80 text-brand-brown border border-brand-brown/10 hover:shadow-sm'
          }`}
        >
          Track
        </button>
        <button
          onClick={() => onNavigate(user?.type === 'seller' ? 'seller' : 'auth')}
          className={`px-3 py-2 rounded-full text-sm transition-all ${
            currentRoute === 'seller'
              ? 'bg-brand-brown text-white shadow-md'
              : 'bg-white/80 text-brand-brown border border-brand-brown/10 hover:shadow-sm'
          }`}
        >
          {user?.type === 'seller' ? 'Seller Panel' : 'Become Seller'}
        </button>
      </nav>

      {/* Action Buttons & Dropdowns */}
      <div className="flex items-center gap-2 relative">
        <button
          onClick={() => setShowNotifications(!showNotifications)}
          className="w-10 h-10 rounded-full bg-white/80 border border-brand-brown/10 flex items-center justify-center hover:scale-105 active:scale-95 transition-all text-brand-brown shadow-sm"
          title="Notifications"
        >
          <Bell className="w-5 h-5" />
        </button>

        {/* User login toggle */}
        {user ? (
          <div className="flex items-center gap-2 bg-white/80 border border-brand-brown/10 rounded-full pl-3 pr-2 py-1 shadow-sm">
            <span className="text-sm text-brand-brown font-semibold max-w-[80px] truncate">{user.name}</span>
            <button
              onClick={() => {
                logout();
                onNavigate('home');
              }}
              className="px-2.5 py-1 bg-brand-orange text-white text-xs font-bold rounded-full hover:bg-brand-orange/90 transition-colors"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={() => onNavigate('auth')}
            className="px-4 py-2 bg-gradient-to-r from-brand-brown to-brand-orange text-white text-sm font-bold rounded-full hover:translate-y-[-2px] active:translate-y-0 shadow-md transition-all flex items-center gap-1.5"
          >
            <User className="w-4 h-4" />
            Login
          </button>
        )}

        {/* Notifications Dropdown Panel */}
        {showNotifications && (
          <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-brand-brown/10 rounded-2xl shadow-premium z-50 p-4 font-body animate-fadeIn">
            <div className="flex items-center justify-between border-b border-brand-brown/5 pb-2 mb-3">
              <h3 className="font-heading text-lg font-bold text-brand-brown">Notifications</h3>
              <button
                onClick={() => {
                  setShowNotifications(false);
                  onNavigate('notifications');
                }}
                className="text-xs text-brand-orange hover:underline flex items-center gap-1 font-semibold"
              >
                See all <ArrowRight className="w-3 h-3" />
              </button>
            </div>
            <ul className="flex flex-col gap-3 max-h-60 overflow-y-auto pr-1">
              <li className="flex gap-2.5 text-xs text-brand-dark hover:bg-brand-cream/50 p-1.5 rounded-lg transition-colors">
                <span className="w-2.5 h-2.5 mt-1 rounded-full bg-brand-orange flex-shrink-0" />
                <div>
                  <p className="font-semibold text-brand-brown">New order from Mumbai</p>
                  <span className="text-brand-muted text-[10px]">2 mins ago</span>
                </div>
              </li>
              <li className="flex gap-2.5 text-xs text-brand-dark hover:bg-brand-cream/50 p-1.5 rounded-lg transition-colors">
                <span className="w-2.5 h-2.5 mt-1 rounded-full bg-brand-green flex-shrink-0" />
                <div>
                  <p className="font-semibold text-brand-brown">Payment received for Madhubani Painting</p>
                  <span className="text-brand-muted text-[10px]">19 mins ago</span>
                </div>
              </li>
              <li className="flex gap-2.5 text-xs text-brand-dark hover:bg-brand-cream/50 p-1.5 rounded-lg transition-colors">
                <span className="w-2.5 h-2.5 mt-1 rounded-full bg-blue-400 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-brand-brown">Price drop on your wishlist item</p>
                  <span className="text-brand-muted text-[10px]">1 hour ago</span>
                </div>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
