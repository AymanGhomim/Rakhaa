import { motion } from 'framer-motion';

interface CharacterRevealProps {
  text: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  duration?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';
}

const PRESTIGE_EASE = [0.22, 1, 0.36, 1] as const;

export default function CharacterReveal({
  text,
  className = '',
  delay = 0,
  staggerDelay = 0.02,
  duration = 0.6,
  as: Tag = 'div',
}: CharacterRevealProps) {
  const characters = Array.from(text);
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };

  const characterVariants = {
    hidden: {
      y: '100%',
      opacity: 0,
    },
    visible: {
      y: '0%',
      opacity: 1,
      transition: {
        duration,
        ease: PRESTIGE_EASE,
      },
    },
  };

  return (
    <Tag className={className}>
      <motion.span
        className="inline-flex flex-wrap"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        {characters.map((char, index) => (
          <span key={index} className="inline-block overflow-hidden">
            <motion.span
              className="inline-block"
              variants={characterVariants}
              style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
