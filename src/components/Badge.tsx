import { motion } from 'framer-motion';

interface BadgeProps {
  text: string;
  className?: string;
}

const PRESTIGE_EASE = [0.22, 1, 0.36, 1] as const;

export default function Badge({ text, className = '' }: BadgeProps) {
  return (
    <motion.span
      className={`inline-block bg-brushed-gold text-luxury-white font-mono font-semibold text-[11px] uppercase tracking-[0.12em] px-4 py-1.5 rounded-full ${className}`}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3, ease: PRESTIGE_EASE }}
    >
      {text}
    </motion.span>
  );
}
