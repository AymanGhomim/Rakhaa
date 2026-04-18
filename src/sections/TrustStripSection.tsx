import { motion } from 'framer-motion';

const PRESTIGE_EASE = [0.22, 1, 0.36, 1] as const;

// Abstract monochrome trust logos rendered as inline SVGs
const trustLogos = [
  // Globe with trade arrows
  <svg key="1" viewBox="0 0 120 48" fill="currentColor" className="w-[120px] h-12 opacity-60">
    <circle cx="24" cy="24" r="14" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <ellipse cx="24" cy="24" rx="7" ry="14" stroke="currentColor" strokeWidth="1" fill="none" />
    <line x1="10" y1="24" x2="38" y2="24" stroke="currentColor" strokeWidth="1" />
    <path d="M50 18 L60 24 L50 30" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <path d="M70 18 L60 24 L70 30" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <text x="78" y="28" fontSize="10" fontFamily="sans-serif" fill="currentColor">GLOBAL TRADE</text>
  </svg>,
  // Wheat sheaf
  <svg key="2" viewBox="0 0 120 48" fill="currentColor" className="w-[120px] h-12 opacity-60">
    <path d="M24 8 Q28 20 24 36" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <path d="M18 14 Q22 22 18 32" stroke="currentColor" strokeWidth="1" fill="none" />
    <path d="M30 14 Q26 22 30 32" stroke="currentColor" strokeWidth="1" fill="none" />
    <ellipse cx="20" cy="16" rx="3" ry="5" stroke="currentColor" strokeWidth="1" fill="none" />
    <ellipse cx="28" cy="16" rx="3" ry="5" stroke="currentColor" strokeWidth="1" fill="none" />
    <ellipse cx="18" cy="26" rx="3" ry="5" stroke="currentColor" strokeWidth="1" fill="none" />
    <ellipse cx="30" cy="26" rx="3" ry="5" stroke="currentColor" strokeWidth="1" fill="none" />
    <text x="42" y="28" fontSize="10" fontFamily="sans-serif" fill="currentColor">AGRINEXUS</text>
  </svg>,
  // Shipping container
  <svg key="3" viewBox="0 0 120 48" fill="currentColor" className="w-[120px] h-12 opacity-60">
    <rect x="8" y="14" width="32" height="20" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <line x1="16" y1="14" x2="16" y2="34" stroke="currentColor" strokeWidth="1" />
    <line x1="24" y1="14" x2="24" y2="34" stroke="currentColor" strokeWidth="1" />
    <line x1="32" y1="14" x2="32" y2="34" stroke="currentColor" strokeWidth="1" />
    <text x="48" y="28" fontSize="10" fontFamily="sans-serif" fill="currentColor">LOGISTICA</text>
  </svg>,
  // Handshake with leaves
  <svg key="4" viewBox="0 0 120 48" fill="currentColor" className="w-[120px] h-12 opacity-60">
    <path d="M14 30 L20 24 L26 28 L32 22" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    <path d="M32 22 L36 18" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    <circle cx="14" cy="30" r="2" fill="currentColor" />
    <circle cx="36" cy="18" r="2" fill="currentColor" />
    <path d="M38 14 Q42 10 44 16" stroke="currentColor" strokeWidth="1" fill="none" />
    <path d="M40 18 Q44 14 46 20" stroke="currentColor" strokeWidth="1" fill="none" />
    <text x="52" y="28" fontSize="10" fontFamily="sans-serif" fill="currentColor">TRUSTLINK</text>
  </svg>,
  // Certificate seal
  <svg key="5" viewBox="0 0 120 48" fill="currentColor" className="w-[120px] h-12 opacity-60">
    <circle cx="24" cy="24" r="12" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <circle cx="24" cy="24" r="8" stroke="currentColor" strokeWidth="1" fill="none" />
    <path d="M24 16 L26 20 L30 20 L27 23 L28 27 L24 25 L20 27 L21 23 L18 20 L22 20 Z" fill="currentColor" />
    <text x="44" y="28" fontSize="10" fontFamily="sans-serif" fill="currentColor">CERTIFIED</text>
  </svg>,
];

export default function TrustStripSection() {
  // Duplicate for seamless loop
  const allLogos = [...trustLogos, ...trustLogos, ...trustLogos, ...trustLogos];

  return (
    <section className="w-full bg-luxury-white border-y border-[rgba(20,83,45,0.06)] py-12">
      <motion.p
        className="text-center font-mono font-medium text-xs uppercase tracking-[0.08em] text-soft-gray mb-8"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: PRESTIGE_EASE }}
      >
        Trusted by Global Partners
      </motion.p>

      <div className="overflow-hidden">
        <div className="marquee-track flex items-center gap-20 w-max">
          {allLogos.map((logo, index) => (
            <div key={index} className="flex-shrink-0 text-[#9CA3AF]">
              {logo}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
