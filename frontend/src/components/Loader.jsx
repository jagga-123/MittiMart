import { motion } from 'framer-motion';

const Loader = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: 'easeInOut' } }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-brand-cream text-brand-dark"
    >
      <div className="text-8xl animate-grow select-none">
        🌱
      </div>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0, transition: { delay: 0.4, duration: 0.6 } }}
        className="mt-6 font-heading text-2xl font-semibold tracking-wide text-brand-brown"
      >
        Finding India's Hidden Artists...
      </motion.p>
    </motion.div>
  );
};

export default Loader;
