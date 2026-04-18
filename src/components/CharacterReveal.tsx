import { motion } from "framer-motion";

type SplitType = "chars" | "words" | "none";

interface CharacterRevealProps {
  text: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  duration?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  split?: SplitType;
}

const PRESTIGE_EASE = [0.22, 1, 0.36, 1] as const;

export default function CharacterReveal({
  text,
  className = "",
  delay = 0,
  staggerDelay = 0.04,
  duration = 0.6,
  as: Tag = "div",
  split = "words", // 👈 الافتراضي كلمات (أفضل UX)
}: CharacterRevealProps) {
  const items =
    split === "chars"
      ? Array.from(text)
      : split === "words"
        ? text.split(" ")
        : [text];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: split === "none" ? 0 : staggerDelay,
        delayChildren: delay,
      },
    },
  };

  const itemVariants = {
    hidden: {
      y: "100%",
      opacity: 0,
    },
    visible: {
      y: "0%",
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
        viewport={{ once: true, amount: 0.2 }}
      >
        {items.map((item, index) => (
          <span
            key={index}
            className="inline-block overflow-hidden"
            style={{
              marginRight: split === "words" ? "0.25em" : 0,
            }}
          >
            <motion.span
              className="inline-block"
              variants={itemVariants}
              style={{
                display: "inline-block",
                whiteSpace: "pre",
              }}
            >
              {item}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
