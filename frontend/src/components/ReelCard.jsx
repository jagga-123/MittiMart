import { motion } from 'framer-motion';
import { Play, Heart, Eye } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ReelCard = ({ reel, onOpenReel }) => {
  const { addToCart } = useCart();

  const handleBuy = (e) => {
    e.stopPropagation();
    addToCart(reel.productSlug, 1);
  };

  return (
    <motion.article
      whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(92, 61, 46, 0.1)' }}
      className="bg-brand-card border border-brand-brown/10 rounded-2xl overflow-hidden flex flex-col shadow-sm select-none cursor-pointer"
      onClick={() => onOpenReel(reel)}
    >
      {/* Video Thumbnail */}
      <div className="relative h-60 bg-brand-dark overflow-hidden flex items-center justify-center group">
        <img
          src={reel.image}
          alt={`${reel.artist} crafting ${reel.craft}`}
          className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-white/90 border border-brand-brown/10 flex items-center justify-center hover:scale-110 active:scale-95 transition-all text-brand-orange shadow-md">
            <Play className="w-6 h-6 fill-current translate-x-0.5" />
          </div>
        </div>
        <div className="absolute bottom-3 left-3">
          <span className="bg-brand-cream/90 text-brand-brown text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
            {reel.location}
          </span>
        </div>
      </div>

      {/* Description */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <strong className="block text-brand-brown text-base font-heading font-bold">{reel.artist}</strong>
          <span className="block text-brand-muted text-xs font-semibold mb-3">{reel.craft}</span>

          <div className="flex items-center justify-between text-[11px] text-brand-muted font-bold border-b border-brand-brown/5 pb-3 mb-3">
            <span className="flex items-center gap-1">
              <Heart className="w-3.5 h-3.5 fill-brand-orange/10 text-brand-orange" />
              {reel.likes} Likes
            </span>
            <span className="flex items-center gap-1">
              <Eye className="w-3.5 h-3.5 text-brand-brown/60" />
              {reel.views} Views
            </span>
          </div>
        </div>

        <button
          onClick={handleBuy}
          className="w-full py-2 bg-brand-orange hover:bg-brand-orange/95 text-white font-bold text-xs rounded-full shadow-md transition-all text-center"
        >
          Buy This Product
        </button>
      </div>
    </motion.article>
  );
};

export default ReelCard;
