import { useEffect, useMemo, useRef, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight, Bell, Heart, Mic, Search, ShoppingCart, User } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../hooks/useAuth';
import { useVoice } from '../context/VoiceContext';
import { getNavigationItems, getRoleLabel } from '../permissions/permissions';
import { products, artists, stateData } from '../data/mockData';
import { resolveAppPath, toAppNavigate } from '../utils/navigation';

const RoleBasedNavbar = ({ onNavigate }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const handleNavigate = onNavigate || toAppNavigate(navigate);
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, role, logout } = useAuth();
  const { startVoiceInput } = useVoice();

  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [recentSearches, setRecentSearches] = useState(() => {
    try {
      const saved = localStorage.getItem('mittimart-recent-searches');
      return saved ? JSON.parse(saved) : ['Madhubani', 'Sunita Devi'];
    } catch {
      return ['Madhubani', 'Sunita Devi'];
    }
  });

  const searchRef = useRef(null);
  const navItems = useMemo(() => getNavigationItems(role), [role]);

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

  const saveSearch = (term) => {
    if (!term.trim()) return;
    setRecentSearches((prev) => [term, ...prev.filter((item) => item !== term)].slice(0, 8));
  };

  const handleSearchChange = (value) => {
    setSearch(value);
    if (!value.trim()) {
      setSuggestions([]);
      return;
    }

    const query = value.toLowerCase();
    const matches = [];

    products.forEach((product) => {
      if ([product.name, product.artist, product.craft, product.state].join(' ').toLowerCase().includes(query)) {
        matches.push({ type: 'product', label: product.name, slug: product.slug });
      }
    });

    artists.forEach((artist) => {
      if ([artist.name, artist.location, artist.crafts.join(' ')].join(' ').toLowerCase().includes(query)) {
        matches.push({ type: 'artist', label: artist.name, slug: artist.slug });
      }
    });

    stateData.forEach((state) => {
      if ([state.name, state.desc].join(' ').toLowerCase().includes(query)) {
        matches.push({ type: 'state', label: `${state.name} Crafts`, slug: state.name });
      }
    });

    const unique = Array.from(new Map(matches.map((item) => [item.label, item])).values()).slice(0, 6);
    setSuggestions(unique);
    setShowSuggestions(true);
  };

  const handleSelectSuggestion = (item) => {
    setSearch(item.label);
    setShowSuggestions(false);
    saveSearch(item.label);

    if (item.type === 'product') {
      handleNavigate(`product/${item.slug}`);
      return;
    }

    if (item.type === 'artist') {
      handleNavigate(`artist/${item.slug}`);
      return;
    }

    handleNavigate('home', { search: item.slug });
  };

  const handleVoiceSearch = () => {
    startVoiceInput((result) => {
      setSearch(result);
      saveSearch(result);
      handleNavigate('home', { search: result });
    }, 'hi-IN');
  };

  const routeKey = location.pathname === '/' ? 'home' : location.pathname.replace(/^\//, '');
  const navClasses = (path) =>
    `px-3 py-2 rounded-full text-sm transition-all hover:translate-y-[-1px] ${
      routeKey === path.replace(/^\//, '') || location.pathname === path
        ? 'bg-brand-brown text-white shadow-md'
        : 'bg-white/80 text-brand-brown border border-brand-brown/10 hover:shadow-sm'
    }`;

  const publicActionButtons = !user ? (
    <div className="flex items-center gap-2">
      <button
        onClick={() => handleNavigate('login')}
        className="px-4 py-2 bg-white/80 border border-brand-brown/10 text-brand-brown text-sm font-bold rounded-full hover:shadow-sm transition-all"
      >
        Login
      </button>
      <button
        onClick={() => handleNavigate('register')}
        className="px-4 py-2 bg-gradient-to-r from-brand-brown to-brand-orange text-white text-sm font-bold rounded-full hover:translate-y-[-2px] shadow-md transition-all"
      >
        Register
      </button>
    </div>
  ) : (
    <div className="flex items-center gap-2 bg-white/80 border border-brand-brown/10 rounded-full pl-3 pr-2 py-1 shadow-sm">
      <span className="text-xs uppercase tracking-wider text-brand-muted font-bold">
        {getRoleLabel(role)}
      </span>
      <span className="text-sm text-brand-brown font-semibold max-w-[100px] truncate">
        {user.name}
      </span>
      <button
        onClick={() => {
          logout();
          handleNavigate('home');
        }}
        className="px-2.5 py-1 bg-brand-orange text-white text-xs font-bold rounded-full hover:bg-brand-orange/90 transition-colors"
      >
        Logout
      </button>
    </div>
  );

  return (
    <header className="sticky top-0 z-40 bg-brand-cream/90 backdrop-blur-md border-b border-brand-brown/10 px-4 py-3 flex flex-wrap items-center justify-between gap-4">
      <button
        onClick={() => handleNavigate('home')}
        className="flex items-center gap-3 bg-transparent text-left"
      >
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-brown to-brand-orange text-white font-extrabold flex items-center justify-center text-lg shadow-md hover:scale-105 transition-transform">
          MM
        </div>
        <div>
          <strong className="block text-brand-dark text-lg font-heading tracking-wide">MittiMart</strong>
          <small className="block text-brand-muted text-xs font-medium -mt-1 font-body">
            Apni Mitti Ka Hunar, Har Ghar Tak
          </small>
        </div>
      </button>

      <div ref={searchRef} className="relative flex-1 max-w-lg min-w-[280px]">
        <div className="relative flex items-center">
          <input
            type="search"
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            onFocus={() => {
              setShowSuggestions(true);
              if (!search.trim()) {
                setSuggestions(recentSearches.map((item) => ({ type: 'recent', label: item })));
              }
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                saveSearch(search);
                setShowSuggestions(false);
                handleNavigate('home', { search });
              }
            }}
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
                handleNavigate('home', { search });
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
                key={`${item.label}-${idx}`}
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

      <nav className="flex items-center gap-2 md:gap-4 font-body font-semibold overflow-x-auto no-scrollbar max-w-full">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={navClasses(item.path)}
          >
            <span className="inline-flex items-center gap-1.5">
              {item.icon ? <item.icon className="w-4 h-4" /> : null}
              <span className="whitespace-nowrap">{item.label}</span>
            </span>
          </NavLink>
        ))}
      </nav>

      <div className="flex items-center gap-2 relative">
        {user && (
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="w-10 h-10 rounded-full bg-white/80 border border-brand-brown/10 flex items-center justify-center hover:scale-105 active:scale-95 transition-all text-brand-brown shadow-sm"
            title="Notifications"
          >
            <Bell className="w-5 h-5" />
          </button>
        )}

        {!user && publicActionButtons}

        {user && (
          <div className="flex items-center gap-2 bg-white/80 border border-brand-brown/10 rounded-full pl-3 pr-2 py-1 shadow-sm">
            <span className="text-sm text-brand-brown font-semibold max-w-[80px] truncate">{user.name}</span>
            <button
              onClick={() => {
                logout();
                handleNavigate('home');
              }}
              className="px-2.5 py-1 bg-brand-orange text-white text-xs font-bold rounded-full hover:bg-brand-orange/90 transition-colors"
            >
              Logout
            </button>
          </div>
        )}

        {showNotifications && user && (
          <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-brand-brown/10 rounded-2xl shadow-premium z-50 p-4 font-body animate-fadeIn">
            <div className="flex items-center justify-between border-b border-brand-brown/5 pb-2 mb-3">
              <h3 className="font-heading text-lg font-bold text-brand-brown">Notifications</h3>
              <button
                onClick={() => {
                  setShowNotifications(false);
                  handleNavigate('notifications');
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

export default RoleBasedNavbar;

