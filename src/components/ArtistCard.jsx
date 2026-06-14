import { motion } from 'framer-motion';

const ArtistCard = ({ artist, onWatchStory, onNavigate }) => {
  return (
    <motion.article
      whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(92, 61, 46, 0.1)' }}
      className="bg-brand-card border border-brand-brown/10 rounded-2xl p-5 flex flex-col justify-between min-h-[300px] shadow-sm select-none cursor-pointer"
      onClick={() => onNavigate(`artist/${artist.slug}`)}
    >
      <div className="flex items-center gap-4">
        <img
          src={artist.image}
          alt={artist.name}
          className="w-16 h-16 rounded-full object-cover border-2 border-brand-orange/30 bg-brand-orange/10"
        />
        <div>
          <h3 className="font-heading text-lg font-bold text-brand-brown leading-snug">
            {artist.name}
          </h3>
          <p className="text-xs text-brand-muted font-medium mb-1">
            {artist.location} · {artist.exp} yrs exp
          </p>
          <span className="inline-flex bg-brand-green/10 text-brand-green text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
            Verified Artist ✓
          </span>
        </div>
      </div>

      <p className="text-brand-dark text-sm italic leading-relaxed my-4 border-l-2 border-brand-orange/20 pl-3">
        “{artist.story.split('.')[0]}.”
      </p>

      <div className="border-t border-brand-brown/5 pt-4 flex gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onWatchStory(artist);
          }}
          className="flex-1 py-2 bg-brand-cream/80 hover:bg-brand-cream border border-brand-brown/10 hover:border-brand-orange/40 text-brand-brown font-bold text-xs rounded-full transition-colors text-center"
        >
          Watch Story
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNavigate(`artist/${artist.slug}`);
          }}
          className="flex-1 py-2 bg-brand-brown hover:bg-brand-brown/95 text-white font-bold text-xs rounded-full transition-colors text-center"
        >
          View Shop
        </button>
      </div>
    </motion.article>
  );
};

export default ArtistCard;
