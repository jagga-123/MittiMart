import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, Star, Send, MapPin, Share2 } from 'lucide-react';
import { artists, products } from '../data/mockData';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const ArtistShop = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const artist = artists.find(a => a.slug === slug) || artists[0];
  const artistProducts = products.filter(p => p.artistSlug === slug);
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const [message, setMessage] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      alert(`Message sent to ${artist.name}: ${message}`);
      setMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-brand-cream">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-brand-brown hover:text-brand-orange font-semibold mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </button>

        {/* Artist Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
          <img
            src={artist.image}
            alt={artist.name}
            className="w-24 h-24 rounded-full object-cover border-4 border-brand-orange/20 flex-shrink-0"
          />
          <div className="flex-1">
            <h1 className="font-heading text-3xl font-bold text-brand-brown">{artist.name}</h1>
            <p className="text-brand-muted flex items-center gap-1.5 mt-1">
              <MapPin className="w-4 h-4" /> {artist.location}
            </p>
            <div className="flex items-center gap-2 mt-3">
              <span className="bg-brand-green/10 text-brand-green text-xs font-bold px-2 py-0.5 rounded-full">
                {artist.exp} Years Experience
              </span>
              <span className="text-sm text-brand-orange">★ 4.9 Rating</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleSendMessage}
              className="px-4 py-2 bg-brand-cream border border-brand-brown/10 text-brand-brown font-semibold rounded-full text-sm flex items-center gap-1.5 hover:bg-brand-orange/10"
            >
              <Send className="w-4 h-4" /> Message
            </button>
            <button className="px-4 py-2 bg-brand-orange text-white font-semibold rounded-full text-sm flex items-center gap-1.5">
              <Share2 className="w-4 h-4" /> Share
            </button>
          </div>
        </div>

        {/* Artist Story */}
        <div className="bg-white border border-brand-brown/10 rounded-2xl p-6 shadow-sm mb-8">
          <h2 className="font-heading text-lg font-bold text-brand-brown mb-3">Artist Story</h2>
          <p className="text-brand-muted leading-relaxed italic">"{artist.story}"</p>
        </div>

        {/* Chat Section */}
        <div className="bg-white border border-brand-brown/10 rounded-2xl p-6 shadow-sm mb-8">
          <h3 className="font-heading text-base font-bold text-brand-brown mb-4">Ask {artist.name.split(' ')[0]} Ji</h3>
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={`Message ${artist.name.split(' ')[0]} Ji...`}
              className="flex-1 px-4 py-2.5 border border-brand-brown/15 rounded-full text-sm outline-none focus:border-brand-orange"
            />
            <button
              type="submit"
              className="w-10 h-10 rounded-full bg-brand-orange text-white flex items-center justify-center"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Products Grid */}
        <div>
          <h2 className="font-heading text-xl font-bold text-brand-brown mb-4">Products by {artist.name.split(' ')[0]} Ji</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {artistProducts.map((product) => (
              <motion.div
                key={product.slug}
                whileHover={{ y: -4 }}
                className="bg-white border border-brand-brown/10 rounded-2xl overflow-hidden shadow-sm cursor-pointer group"
                onClick={() => navigate(`/product/${product.slug}`)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product.slug);
                    }}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center"
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted(product.slug) ? 'fill-brand-orange text-brand-orange' : 'text-brand-brown'}`} />
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="font-heading font-bold text-brand-brown text-sm mb-1 line-clamp-1">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-1.5 mb-3">
                    <div className="flex items-center">
                      <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                    </div>
                    <span className="text-xs text-brand-muted">{product.rating} ({product.reviews})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-extrabold text-brand-orange">
                      ₹{product.price}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product.slug, 1);
                      }}
                      className="px-3 py-1.5 bg-brand-cream border border-brand-brown/10 text-brand-brown text-xs font-semibold rounded-full"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistShop;