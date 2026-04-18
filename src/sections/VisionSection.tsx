import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import CharacterReveal from '@/components/CharacterReveal';
import WordReveal from '@/components/WordReveal';

const PRESTIGE_EASE = [0.22, 1, 0.36, 1] as const;

export default function VisionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const arcRef = useRef<SVGSVGElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const arcRotation = useTransform(scrollYProgress, [0, 1], [-5, 5]);

  return (
    <section
      id="vision"
      ref={sectionRef}
      className="relative w-full bg-luxury-white py-20 md:py-32"
    >
      <div className="max-w-[900px] mx-auto px-5 md:px-10">
        {/* Vision Card */}
        <div className="relative bg-[rgba(248,250,249,0.8)] backdrop-blur-[24px] saturate-[200%] border border-[rgba(200,164,93,0.15)] shadow-[0_12px_48px_rgba(20,83,45,0.06)] rounded-[20px] p-8 md:p-12 lg:p-16 overflow-hidden">
          {/* Grain Texture Overlay */}
          <div
            className="absolute inset-0 pointer-events-none mix-blend-multiply"
            style={{
              opacity: 0.03,
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'repeat',
              backgroundSize: '256px 256px',
            }}
          />

          {/* Decorative Arc */}
          <motion.svg
            ref={arcRef}
            className="absolute -top-20 -right-20 w-[400px] h-[400px] pointer-events-none"
            viewBox="0 0 400 400"
            fill="none"
            style={{ rotate: arcRotation }}
          >
            <path
              d="M50 350 A300 300 0 0 1 350 50"
              stroke="rgba(200, 164, 93, 0.08)"
              strokeWidth="1"
              fill="none"
            />
          </motion.svg>

          {/* Content */}
          <div className="relative z-10">
            <motion.span
              className="font-mono font-semibold text-[11px] uppercase tracking-[0.12em] text-brushed-gold mb-6 block"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, ease: PRESTIGE_EASE }}
            >
              OUR VISION
            </motion.span>

            <CharacterReveal
              text="From the Land of the Nile to the World"
              as="h2"
              className="font-sans font-semibold text-3xl md:text-[40px] text-deep-charcoal leading-[1.15] tracking-[-0.01em] max-w-[600px] mb-6"
              staggerDelay={0.015}
              duration={0.6}
            />

            <div className="mb-10">
              <WordReveal
                text="Rakhaa was founded on a simple conviction: that the finest agricultural products from Egypt and beyond deserve a global stage. We bridge the gap between local farmers and international markets, ensuring every grain, every pod, every date meets the highest standards of quality and sustainability. Our mission is to nourish the world while empowering the communities that cultivate it."
                as="p"
                className="font-sans text-base md:text-lg text-deep-charcoal leading-[1.7] max-w-[640px]"
                staggerDelay={0.03}
                duration={0.4}
              />
            </div>

            <motion.blockquote
              className="border-l-[3px] border-brushed-gold pl-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: 0.3, ease: PRESTIGE_EASE }}
            >
              <p className="font-sans font-medium text-lg md:text-xl text-forest-green leading-[1.5] italic">
                "We don't just trade commodities. We cultivate relationships, honor the land, and deliver nature's finest harvest to tables across the globe."
              </p>
            </motion.blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
