import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import CharacterReveal from "@/components/CharacterReveal";
import WordReveal from "@/components/WordReveal";
import Button from "@/components/Button";

const PRESTIGE_EASE = [0.22, 1, 0.36, 1] as const;

const stats = [
  { number: "+50", label: "دولة نخدمها" },
  { number: "+12", label: "سنة من الخبرة" },
  { number: "100%", label: "جودة مضمونة" },
];

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const cardY = useTransform(scrollYProgress, [0, 1], [0, -75]);

  return (
    <section
      ref={sectionRef}
      dir="rtl"
      className="relative min-h-[100dvh] w-full overflow-hidden flex items-center"
      style={{ minHeight: "700px" }}
    >
      {/* الخلفية */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        <div className="absolute inset-0 ken-burns">
          <img
            src="/assets/hero-aerial-farm.jpg"
            alt="منظر جوي لحقول زراعية"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-[rgba(20,83,45,0.72)]" />
      </motion.div>

      {/* المحتوى */}
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-5 md:px-10 lg:px-20 py-32">
        {/* 👇 التعديل الأساسي هنا */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-32">
          {/* النص */}
          <div className="w-full lg:w-[55%] text-center lg:text-right">
            <CharacterReveal
              text="تجارة زراعية عالمية برؤية جديدة"
              as="h1"
              className="font-sans font-bold text-4xl md:text-5xl lg:text-[64px] text-luxury-white leading-[1.05] tracking-[-0.02em] max-w-[640px] mx-auto lg:mx-0"
              delay={0.3}
              staggerDelay={0.02}
              duration={0.6}
            />

            <div className="mt-6">
              <WordReveal
                text="نربط مزارع مصر بالعالم. هيل فاخر، أرز عالي الجودة، تمور مميزة، والمزيد — مصادرنا موثوقة وتسليمنا يتم بأعلى معايير الاحتراف."
                as="p"
                className="font-sans text-base md:text-lg text-[rgba(248,250,249,0.85)] leading-relaxed max-w-[480px] mx-auto lg:mx-0"
                delay={0.8}
                staggerDelay={0.04}
                duration={0.5}
              />
            </div>

            <motion.div
              className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0, ease: PRESTIGE_EASE }}
            >
              <Button variant="primary" href="#products">
                استعرض المنتجات
              </Button>
              <Button variant="ghost" inverted href="#contact">
                تواصل معنا
              </Button>
            </motion.div>
          </div>

          {/* الكارت */}
          <div className="w-full lg:w-[45%] flex justify-center lg:justify-start">
            <motion.div
              style={{ y: cardY }}
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 1.2, ease: PRESTIGE_EASE }}
              className="relative"
            >
              {/* قوس زخرفي */}
              <motion.svg
                className="absolute -inset-8 md:-inset-12 w-[calc(100%+64px)] md:w-[calc(100%+96px)] h-[calc(100%+64px)] md:h-[calc(100%+96px)] pointer-events-none"
                viewBox="0 0 400 400"
                fill="none"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 0.15, scale: 1 }}
                transition={{ duration: 1, delay: 1.4, ease: PRESTIGE_EASE }}
              >
                <path
                  d="M50 200 A150 150 0 0 1 350 200"
                  stroke="#C8A45D"
                  strokeWidth="1"
                  fill="none"
                />
              </motion.svg>

              {/* الكارت */}
              <div className="bg-[rgba(248,250,249,0.72)] backdrop-blur-[20px] saturate-[180%] border border-white/30 shadow-[0_8px_32px_rgba(20,83,45,0.08)] rounded-xl p-6 md:p-8 min-w-[260px]">
                <div className="space-y-5">
                  {stats.map((stat, index) => (
                    <div key={stat.label}>
                      {index > 0 && (
                        <div className="border-t border-white/10 mb-5" />
                      )}
                      <div className="text-center">
                        <span className="font-mono font-semibold text-3xl md:text-4xl text-luxury-white block">
                          {stat.number}
                        </span>
                        <span className="font-mono font-medium text-xs uppercase tracking-[0.08em] text-[rgba(248,250,249,0.7)] mt-1 block">
                          {stat.label}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
