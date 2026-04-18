import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import CharacterReveal from "@/components/CharacterReveal";
import WordReveal from "@/components/WordReveal";

const PRESTIGE_EASE = [0.22, 1, 0.36, 1] as const;

export default function VisionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const arcRef = useRef<SVGSVGElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const arcRotation = useTransform(scrollYProgress, [0, 1], [-5, 5]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]);
  const imageY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section
      id="vision"
      ref={sectionRef}
      dir="rtl"
      className="relative w-full bg-luxury-white py-20 md:py-32 overflow-hidden"
    >
      {/* خلفية زخرفية متدرجة */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f8faf9] via-white to-[#f0f7f4] pointer-events-none" />

      {/* دوائر زخرفية متحركة في الخلفية */}
      <motion.div
        className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full border border-[rgba(200,164,93,0.08)]"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute -bottom-60 -left-60 w-[800px] h-[800px] rounded-full border border-[rgba(20,83,45,0.05)]"
        animate={{ rotate: -360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
      />

      <div className="max-w-[1200px] mx-auto px-5 md:px-10 relative z-10">
        {/* كارت الرؤية الرئيسي */}
        <div className="relative bg-[rgba(248,250,249,0.9)] backdrop-blur-[24px] saturate-[200%] border border-[rgba(200,164,93,0.15)] shadow-[0_24px_80px_rgba(20,83,45,0.08)] rounded-[32px] overflow-hidden">
          {/* تأثير الحبيبات */}
          <div
            className="absolute inset-0 pointer-events-none mix-blend-multiply"
            style={{
              opacity: 0.03,
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              backgroundRepeat: "repeat",
              backgroundSize: "256px 256px",
            }}
          />

          {/* القوس الزخرفي */}
          <motion.svg
            ref={arcRef}
            className="absolute top-10 left-10 w-[300px] h-[300px] pointer-events-none opacity-50"
            viewBox="0 0 400 400"
            fill="none"
            style={{ rotate: arcRotation }}
          >
            <path
              d="M50 350 A300 300 0 0 1 350 50"
              stroke="rgba(200, 164, 93, 0.15)"
              strokeWidth="1.5"
              fill="none"
            />
            <circle cx="350" cy="50" r="4" fill="rgba(200, 164, 93, 0.3)" />
          </motion.svg>

          {/* المحتوى الرئيسي - تصميم من عمودين */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* العمود الأيمن: الصورة */}
            <motion.div
              className="relative h-[500px] lg:h-auto overflow-hidden"
              style={{ scale: imageScale, y: imageY }}
            >
              {/* إطار الصورة الزخرفي */}
              <div className="absolute inset-4 md:inset-8 z-10">
                <div className="relative w-full h-full rounded-[24px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.15)]">
                  {/* الصورة */}
                  <img
                    src="https://images.stockcake.com/public/a/5/2/a5231138-a539-4ef3-b117-08fef34a850c_large/elegant-business-portrait-stockcake.jpg"
                    alt="صاحب الشركة"
                    className="w-full h-full object-cover object-center"
                  />

                  {/* طبقة متدرجة فوق الصورة */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(20,83,45,0.4)] via-transparent to-transparent" />

                  {/* اسم صاحب الشركة */}
                  <motion.div
                    className="absolute bottom-6 right-6 left-6 text-right"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: 0.5,
                      duration: 0.6,
                      ease: PRESTIGE_EASE,
                    }}
                  >
                    <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-[rgba(200,164,93,0.9)] mb-1">
                      المؤسس والرئيس التنفيذي
                    </p>
                    <h3 className="font-sans font-semibold text-2xl text-white">
                      أحمد الرخاوي
                    </h3>
                  </motion.div>

                  {/* زخرفة ذهبية في الزاوية */}
                  <div className="absolute top-4 left-4 w-16 h-16 border-l-2 border-t-2 border-[rgba(200,164,93,0.5)] rounded-tl-[12px]" />
                </div>
              </div>

              {/* خط فاصل متدرج */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-[60%] bg-gradient-to-b from-transparent via-[rgba(200,164,93,0.3)] to-transparent hidden lg:block" />
            </motion.div>

            {/* العمود الأيسر: الرؤية */}
            <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center text-right">
              <motion.span
                className="font-mono font-semibold text-[11px] uppercase tracking-[0.12em] text-brushed-gold mb-6 block"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6, ease: PRESTIGE_EASE }}
              >
                رؤيتنا
              </motion.span>

              <CharacterReveal
                text="من أرض النيل إلى العالم"
                as="h2"
                className="font-sans font-semibold text-3xl md:text-[42px] text-deep-charcoal leading-[1.15] tracking-[-0.01em] mb-8"
                staggerDelay={0.015}
                duration={0.6}
              />

              <div className="mb-10">
                <WordReveal
                  text="تأسست رخاء على قناعة بسيطة: أن أجود المنتجات الزراعية من مصر ومن مختلف أنحاء العالم تستحق أن تصل إلى الأسواق العالمية. نحن نربط بين المزارعين المحليين والأسواق الدولية، مع ضمان أن كل حبة وكل محصول يحقق أعلى معايير الجودة والاستدامة."
                  as="p"
                  className="font-sans text-base md:text-lg text-deep-charcoal leading-[1.8] mb-6"
                  staggerDelay={0.03}
                  duration={0.4}
                />

                <motion.p
                  className="font-sans text-base md:text-lg text-deep-charcoal leading-[1.8]"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: 0.4,
                    duration: 0.6,
                    ease: PRESTIGE_EASE,
                  }}
                >
                  مهمتنا هي تغذية العالم مع تمكين المجتمعات التي تقوم بزراعته.
                </motion.p>
              </div>

              <motion.blockquote
                className="border-r-[3px] border-brushed-gold pr-6 bg-gradient-to-l from-[rgba(200,164,93,0.05)] to-transparent py-4 px-6 rounded-l-[12px]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6, delay: 0.3, ease: PRESTIGE_EASE }}
              >
                <p className="font-sans font-medium text-lg md:text-xl text-forest-green leading-[1.6] italic">
                  "نحن لا نتاجر في السلع فقط، بل نبني علاقات، نحترم الأرض، ونقدم
                  أفضل ما تجود به الطبيعة إلى موائد العالم."
                </p>
              </motion.blockquote>

              {/* زر CTA */}
              <motion.button
                className="mt-8 self-start px-8 py-4 bg-forest-green text-white font-sans font-medium text-sm rounded-full hover:bg-[#14532d] transition-colors duration-300 shadow-[0_4px_20px_rgba(20,83,45,0.3)] flex items-center gap-2 group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6, ease: PRESTIGE_EASE }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>اكتشف رحلتنا</span>
                <motion.span
                  className="inline-block"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  ←
                </motion.span>
              </motion.button>
            </div>
          </div>
        </div>

        {/* إحصائيات سريعة تحت الكارت
        <motion.div
          className="grid grid-cols-3 gap-4 mt-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8, ease: PRESTIGE_EASE }}
        >
          {[
            { number: "+15", label: "عاماً من الخبرة" },
            { number: "+50", label: "دولة نصدر إليها" },
            { number: "+10K", label: "مزارع شريك" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center p-6 bg-white/50 backdrop-blur-sm rounded-[16px] border border-[rgba(200,164,93,0.1)]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.7 + index * 0.1,
                duration: 0.6,
                ease: PRESTIGE_EASE,
              }}
            >
              <p className="font-sans font-bold text-3xl md:text-4xl text-forest-green mb-1">
                {stat.number}
              </p>
              <p className="font-sans text-sm text-deep-charcoal/70">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div> */}
      </div>
    </section>
  );
}
