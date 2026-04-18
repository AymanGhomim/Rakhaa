import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'ghost' | 'gold';
  inverted?: boolean;
  onClick?: () => void;
  className?: string;
  href?: string;
  size?: 'default' | 'large';
}

const PRESTIGE_EASE = [0.22, 1, 0.36, 1] as const;

export default function Button({
  children,
  variant = 'primary',
  inverted = false,
  onClick,
  className = '',
  href,
  size = 'default',
}: ButtonProps) {
  const isLarge = size === 'large';
  const baseClasses = `inline-flex items-center justify-center rounded-lg font-sans font-medium transition-all duration-400 cursor-pointer ${
    isLarge ? 'px-12 py-[18px] text-base' : 'px-8 py-3.5 text-sm'
  } ${className}`;

  const variantClasses = {
    primary: inverted
      ? 'bg-forest-green text-luxury-white hover:bg-vibrant-green'
      : 'bg-forest-green text-luxury-white hover:bg-vibrant-green',
    ghost: inverted
      ? 'bg-transparent border border-luxury-white text-luxury-white hover:bg-luxury-white hover:text-forest-green'
      : 'bg-transparent border border-forest-green text-forest-green hover:bg-forest-green hover:text-luxury-white',
    gold: 'bg-brushed-gold text-luxury-white hover:bg-luxury-white hover:text-forest-green shadow-[0_8px_32px_rgba(200,164,93,0.3)]',
  };

  const Component = href ? motion.a : motion.button;

  return (
    <Component
      href={href}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.4, ease: PRESTIGE_EASE }}
    >
      {children}
    </Component>
  );
}
