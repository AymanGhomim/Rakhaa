import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect } from 'react';
import type { Product } from './ProductCard';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

const PRESTIGE_EASE = [0.22, 1, 0.36, 1] as const;

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

const panelVariants = {
  hidden: { y: 60, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: PRESTIGE_EASE },
  },
  exit: {
    y: 60,
    opacity: 0,
    transition: { duration: 0.4, ease: PRESTIGE_EASE },
  },
};

const contentVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: PRESTIGE_EASE },
  },
};

export default function ProductModal({ product, onClose }: ProductModalProps) {
  useEffect(() => {
    if (product) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [product]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-[rgba(20,83,45,0.85)]"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            className="relative w-full max-w-[900px] max-h-[90vh] overflow-y-auto bg-luxury-white rounded-2xl z-10"
            variants={panelVariants}
          >
            {/* Close Button */}
            <motion.button
              className="absolute top-4 right-4 z-20 w-12 h-12 flex items-center justify-center rounded-xl bg-[rgba(248,250,249,0.72)] backdrop-blur-[20px] border border-white/30 text-deep-charcoal cursor-pointer"
              onClick={onClose}
              whileHover={{ rotate: 90, backgroundColor: '#14532D', color: '#F8FAF9' }}
              transition={{ duration: 0.3 }}
            >
              <X size={20} />
            </motion.button>

            <motion.div
              className="flex flex-col md:flex-row"
              variants={contentVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Image */}
              <motion.div className="md:w-[45%] overflow-hidden" variants={itemVariants}>
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-64 md:h-full object-cover md:rounded-l-2xl"
                />
              </motion.div>

              {/* Content */}
              <div className="md:w-[55%] p-6 md:p-10">
                <motion.span
                  className="font-mono font-semibold text-[11px] uppercase tracking-[0.12em] text-brushed-gold mb-3 block"
                  variants={itemVariants}
                >
                  {product.category}
                </motion.span>

                <motion.h2
                  className="font-sans font-bold text-2xl md:text-[32px] text-deep-charcoal mb-2 leading-tight"
                  variants={itemVariants}
                >
                  {product.title}
                </motion.h2>

                <motion.p
                  className="font-sans text-sm text-soft-gray mb-4"
                  variants={itemVariants}
                >
                  Origins: {product.origin}
                </motion.p>

                <motion.p
                  className="font-sans text-base text-deep-charcoal leading-relaxed mb-6"
                  variants={itemVariants}
                >
                  {product.description}
                </motion.p>

                {/* Specs */}
                <motion.div className="space-y-3" variants={itemVariants}>
                  <h4 className="font-sans font-semibold text-sm text-forest-green uppercase tracking-wider">
                    Specifications
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {product.specs.map((spec, i) => (
                      <div
                        key={i}
                        className="bg-[rgba(20,83,45,0.04)] rounded-lg p-3"
                      >
                        <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-soft-gray block mb-1">
                          {spec.label}
                        </span>
                        <span className="font-sans font-medium text-sm text-deep-charcoal">
                          {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* CTA */}
                <motion.div className="mt-6" variants={itemVariants}>
                  <a
                    href="#contact"
                    onClick={onClose}
                    className="inline-flex items-center justify-center bg-forest-green text-luxury-white font-sans font-medium text-sm px-8 py-3.5 rounded-lg hover:bg-vibrant-green transition-all duration-400"
                  >
                    Inquire About This Product
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
