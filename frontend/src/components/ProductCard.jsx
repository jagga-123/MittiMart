import { motion } from 'framer-motion';
import { Star, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const ProductCard = ({ product, onNavigate }) => {
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    toggleWishlist(product.slug);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product.slug, 1);
  };

  const wishlisted = isWishlisted(product.slug);

  return (
    <motion
      whileHover={{ y: -6, boxShadow: '0 24px 48px rgba(92, 61, 46, 0.12)' }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      onClick={() => onNavigate(`product/${product.slug}`)}
      className="bg-brand-card border border-brand-brown/10 rounded-2xl overflow-hidden relative flex flex-col cursor-pointer group shadow-sm"
    >
      {/* Wishlist Heart Icon */}
      <button
        onClick={handleWishlistClick}
        className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 border border-brand-brown/5 shadow-sm flex items-center justify-center text-brand-brown hover:scale-110 active:scale-95 transition-all"
        title="Add to wishlist"
      >
        <Heart className={`w-5 h-5 ${wishlisted ? 'fill-brand-orange text-brand-orange' : 'text-brand-brown'}`} />
      </button>

      {/* Image Block */}
      <div className="h-56 overflow-hidden relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute bottom-3 left-3">
          <span className="bg-brand-orange text-white text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full shadow-md">
            Crafted in {product.makingDays}
          </span>
        </div>
      </div>

      {/* Content Block */}
      <div className="p-4 md:p-5 flex-1 flex flex-col justify-between">
        <div>
          <span className="text-[11px] text-brand-muted font-semibold tracking-wide uppercase font-body block mb-1">
            Handmade by {product.artist}
          </span>
          <h3 className="font-heading text-lg font-bold text-brand-brown group-hover:text-brand-orange transition-colors leading-snug line-clamp-1 mb-2">
            {product.name}
          </h3>

          {/* Rating details */}
          <div className="flex items-center gap-1.5 mb-3">
            <div className="flex items-center text-yellow-500">
              <Star className="w-3.5 h-3.5 fill-current" />
            </div>
            <span className="text-xs font-semibold text-brand-dark">{product.rating}</span>
            <span className="text-[10px] text-brand-muted font-medium">({product.reviews} reviews)</span>
          </div>
        </div>

        <div className="border-t border-brand-brown/5 pt-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xl font-extrabold text-brand-orange font-body">
              ₹{product.price}
            </span>
            <span className="text-[10px] text-brand-green font-bold bg-brand-green/10 px-2 py-0.5 rounded-full uppercase">
              {product.sellerType}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNavigate(`product/${product.slug}`);
              }}
              className="w-full px-3 py-2 bg-brand-cream/80 text-brand-brown border border-brand-brown/10 hover:bg-brand-cream hover:text-brand-orange font-bold text-xs rounded-full transition-all text-center"
            >
              View Journey
            </button>
            <button
              onClick={handleAddToCart}
              className="w-full px-3 py-2 bg-gradient-to-r from-brand-brown to-brand-orange text-white hover:from-brand-brown/95 hover:to-brand-orange/95 font-bold text-xs rounded-full shadow-md transition-all text-center"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </motion>
  );
};

export default ProductCard;
