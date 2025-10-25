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
        className="absolute inset-0 bg-black/40 dark:bg-black/60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
      />
    </div>
  );
}

// ✅ PropTypes
HeroBackground.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentIndex: PropTypes.number.isRequired,
};

// ✅ Default props
HeroBackground.defaultProps = {
  images: [],
  currentIndex: 0,
};
