import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface FloatingBlobProps {
  color: string;
  size: number;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  blur?: number;
  scrollRange?: [number, number];
  xOffset?: number;
  yOffset?: number;
}

export default function FloatingBlob({
  color,
  size,
  top,
  left,
  right,
  bottom,
  blur = 80,
  scrollRange = [0, 1],
  xOffset = 30,
  yOffset = 30,
}: FloatingBlobProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const x = useTransform(scrollYProgress, scrollRange, [-xOffset, xOffset]);
  const y = useTransform(scrollYProgress, scrollRange, [-yOffset, yOffset]);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute rounded-full"
        style={{
          background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
          width: size,
          height: size,
          top,
          left,
          right,
          bottom,
          filter: `blur(${blur}px)`,
          x,
          y,
        }}
      />
    </div>
  );
}
