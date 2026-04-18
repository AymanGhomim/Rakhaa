import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import type { ReactNode } from 'react';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  variant?: 'fadeUp' | 'clipReveal' | 'fadeIn';
}

const PRESTIGE_EASE = [0.22, 1, 0.36, 1] as const;

const fadeUpVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const fadeUpChildVariants: Variants = {
  hidden: {
    y: 40,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: PRESTIGE_EASE,
    },
  },
};

const clipRevealVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const clipRevealChildVariants: Variants = {
  hidden: {
    y: '100%',
  },
  visible: {
    y: '0%',
    transition: {
      duration: 0.8,
      ease: PRESTIGE_EASE,
    },
  },
};

const fadeInVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const fadeInChildVariants: Variants = {
  hidden: {
    y: 20,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: PRESTIGE_EASE,
    },
  },
};

export const sectionVariants = {
  fadeUp: fadeUpVariants,
  clipReveal: clipRevealVariants,
  fadeIn: fadeInVariants,
};

export const childVariants = {
  fadeUp: fadeUpChildVariants,
  clipReveal: clipRevealChildVariants,
  fadeIn: fadeInChildVariants,
};

export default function AnimatedSection({
  children,
  className = '',
  delay = 0,
  staggerDelay = 0.12,
  variant: _variant = 'fadeUp',
}: AnimatedSectionProps) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: delay,
          },
        },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedItem({
  children,
  className = '',
  variant = 'fadeUp',
}: {
  children: ReactNode;
  className?: string;
  variant?: 'fadeUp' | 'clipReveal' | 'fadeIn';
}) {
  return (
    <motion.div className={variant === 'clipReveal' ? 'overflow-hidden' : className} variants={childVariants[variant]}>
      {variant === 'clipReveal' ? (
        <div className={className}>{children}</div>
      ) : (
        children
      )}
    </motion.div>
  );
}
