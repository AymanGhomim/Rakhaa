import { motion } from 'framer-motion';

interface WordRevealProps {
  text: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  duration?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';
}

const PRESTIGE_EASE = [0.22, 1, 0.36, 1] as const;

export default function WordReveal({
  text,
  className = '',
  delay = 0,
  staggerDelay = 0.08,
  duration = 0.5,
  as: Tag = 'div',
}: WordRevealProps) {
  const words = text.split(' ');

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };

  const wordVariants = {
    hidden: {
      y: 40,
      opacity: 0,
    },
    visible: {
      y: 0,
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
        {words.map((word, index) => (
          <span key={index} className="inline-block overflow-hidden mr-[0.3em]">
            <motion.span
              className="inline-block"
              variants={wordVariants}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
