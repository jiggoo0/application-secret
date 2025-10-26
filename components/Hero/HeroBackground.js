'use client';

import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';

/**
 * 🖼️ HeroBackground
 * - Slideshow background
 * - Smooth fade animation with Framer Motion
 * - Overlay for better contrast
 * - Responsive & dark mode friendly
 */
export default function HeroBackground({ images, currentIndex }) {
  if (!images?.length) return null;

  return (
    <div className="absolute inset-0 h-full w-full overflow-hidden" aria-hidden="true">
      <AnimatePresence>
        {images.map((img, idx) =>
          idx === currentIndex ? (
            <motion.div
              key={idx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: 'easeInOut' }}
              className="absolute inset-0 h-full w-full bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${img})` }}
            />
          ) : null,
        )}
      </AnimatePresence>

      {/* Overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-transparent dark:from-black/70 dark:via-black/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
      />
    </div>
  );
}

HeroBackground.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentIndex: PropTypes.number.isRequired,
};

HeroBackground.defaultProps = {
  images: [],
  currentIndex: 0,
};
