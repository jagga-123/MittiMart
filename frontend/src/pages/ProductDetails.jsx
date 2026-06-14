import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Heart, Minus, Plus, ArrowLeft } from 'lucide-react';
import { products } from '../data/mockData';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const ProductDetails = ({ slug, onNavigate }) => {
  const product = products.find(p => p.slug === slug) || products[0];
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const handleBuyNow = () => {
    addToCart(product.slug, quantity);
    onNavigate('cart');
  };

  return (
    <div className="min-h-screen bg-brand-cream">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2 text-brand-brown hover:text-brand-orange mb-6 font-semibold"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div className="aspect-square rounded-2xl overflow-hidden bg-brand-dark relative border border-brand-brown/10 shadow-premium">
              <img
                src={product.gallery[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-brand-orange text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                  Handmade
                </span>
              </div>
            </div>

            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === idx ? 'border-brand-orange' : 'border-brand-brown/10'
                  }`}
                >
                  <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <span className="text-xs uppercase font-bold text-brand-orange bg-brand-orange/10 px-3 py-1 rounded-full">
                {product.craft}
              </span>
              <h1 className="font-heading text-3xl font-bold text-brand-brown mt-3">
                {product.name}
              </h1>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map(star => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${star <= Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-brand-brown/20'}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-brand-muted font-medium">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
            </div>

            <p className="text-brand-muted leading-relaxed">
              {product.description}
            </p>

            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-brand-muted uppercase">Made by:</span>
              <button
                onClick={() => onNavigate(`artist/${product.artistSlug}`)}
                className="text-brand-brown font-semibold hover:text-brand-orange underline underline-offset-2"
              >
                {product.artist}
              </button>
            </div>

            <div className="bg-brand-card border border-brand-brown/10 rounded-2xl p-5 shadow-sm">
              <h3 className="font-heading text-lg font-bold text-brand-brown mb-3">Product Journey</h3>
              <div className="space-y-3">
                {product.timeline.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-sm">
                    <span className="text-lg">
                      {idx === 0 ? '🌱' : idx === 1 ? '🎨' : idx === 2 ? '✨' : '📦'}
                    </span>
                    <span className="text-brand-dark">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-brand-muted uppercase">Quantity:</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-full bg-brand-cream border border-brand-brown/10 flex items-center justify-center hover:bg-brand-orange/10"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="w-8 text-center font-bold text-brand-brown">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-full bg-brand-cream border border-brand-brown/10 flex items-center justify-center hover:bg-brand-orange/10"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>
              <div className="text-xs text-brand-green font-semibold bg-brand-green/10 px-3 py-1 rounded-full">
                Crafted in {product.makingDays}
              </div>
            </div>

            <div className="flex items-center gap-4 pt-4">
              <button
                onClick={() => toggleWishlist(product.slug)}
                className={`w-12 h-12 rounded-full border border-brand-brown/15 flex items-center justify-center hover:scale-105 transition-transform ${
                  isWishlisted(product.slug) ? 'bg-brand-orange/10 text-brand-orange' : 'bg-white text-brand-brown'
                }`}
              >
                <Heart className="w-5 h-5" />
              </button>
              <button
                onClick={() => addToCart(product.slug, quantity)}
                className="flex-1 py-3 bg-brand-cream border border-brand-brown/15 text-brand-brown font-bold rounded-full hover:bg-brand-cream/80"
              >
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 py-3 bg-gradient-to-r from-brand-brown to-brand-orange text-white font-bold rounded-full shadow-md hover:scale-102 transition-transform"
              >
                Buy Now
              </button>
            </div>
          </motion.div>
        </div>

        {/* Reviews Section */}
        <section className="mt-12">
          <h2 className="font-heading text-2xl font-bold text-brand-brown mb-6">Customer Reviews</h2>
          <div className="space-y-4">
            {product.reviewsList.map((review, idx) => (
              <div key={idx} className="bg-white border border-brand-brown/10 rounded-2xl p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-brand-orange/10 flex items-center justify-center font-bold text-brand-orange">
                    {review.name.charAt(0)}
                  </div>
                  <strong className="text-brand-brown font-semibold">{review.name}</strong>
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map(star => (
                      <Star
                        key={star}
                        className={`w-3 h-3 ${star <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-brand-brown/20'}`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-brand-muted text-sm">{review.text}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductDetails;