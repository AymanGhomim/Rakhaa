import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";
import type { Product } from "./ProductCard";

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

const PRESTIGE_EASE = [0.22, 1, 0.36, 1] as const;

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

const panelVariants = {
  hidden: { y: 60, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: PRESTIGE_EASE },
  },
  exit: {
    y: 60,
    opacity: 0,
    transition: { duration: 0.4, ease: PRESTIGE_EASE },
  },
};

const contentVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: PRESTIGE_EASE },
  },
};

export default function ProductModal({ product, onClose }: ProductModalProps) {
  useEffect(() => {
    if (product) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [product]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-[rgba(60,40,20,0.9)] backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Panel - تصميم البرشور */}
          <motion.div
            className="relative w-full max-w-[1000px] max-h-[95vh] overflow-y-auto bg-[#f5f0e8] rounded-[24px] z-10 shadow-[0_25px_80px_rgba(0,0,0,0.3)]"
            variants={panelVariants}
          >
            {/* Close Button */}
            <motion.button
              className="absolute top-4 left-4 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-[rgba(139,90,43,0.9)] text-white cursor-pointer shadow-lg"
              onClick={onClose}
              whileHover={{ rotate: 90, scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <X size={18} />
            </motion.button>

            {/* Header Section - شريط علوي بني */}
            <div className="bg-gradient-to-r from-[#8B5A2B] to-[#A0522D] p-6 md:p-8 rounded-t-[24px]">
              <motion.div
                className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                variants={contentVariants}
                initial="hidden"
                animate="visible"
              >
                {/* شعار أو أيقونة المنتج */}
                <motion.div
                  className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center border-2 border-[#D4A574]/30"
                  variants={itemVariants}
                >
                  <span className="text-2xl">🌿</span>
                </motion.div>
                <div className="text-right" dir="rtl">
                  <motion.span
                    className="font-mono font-semibold text-[11px] uppercase tracking-[0.15em] text-[#D4A574] mb-2 block"
                    variants={itemVariants}
                  >
                    {product.category}
                  </motion.span>
                  <motion.h2
                    className="font-sans font-bold text-2xl md:text-3xl text-white mb-1 leading-tight"
                    variants={itemVariants}
                  >
                    {product.title}
                  </motion.h2>
                  <motion.p
                    className="font-sans text-sm text-[#E8D5C4]"
                    variants={itemVariants}
                  >
                    Origins: {product.origin}
                  </motion.p>
                </div>
              </motion.div>
            </div>

            {/* Main Content */}
            <motion.div
              className="p-6 md:p-8"
              variants={contentVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Product Image - في النص */}
              <motion.div
                className="relative w-full max-w-[500px] mx-auto mb-8"
                variants={itemVariants}
              >
                <div className="relative bg-white rounded-[20px] p-6 shadow-[0_10px_40px_rgba(139,90,43,0.15)] border border-[#D4A574]/20">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-64 md:h-80 object-contain rounded-[12px]"
                  />
                  {/* زخرفة صغيرة */}
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#8B5A2B] text-white px-4 py-1 rounded-full text-xs font-medium">
                    منتج ممتاز
                  </div>
                </div>
              </motion.div>

              {/* Two Column Layout - النص على اليمين والجدول على اليسار */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8" dir="rtl">
                {/* Right Column - الوصف */}
                <motion.div className="text-right" variants={itemVariants}>
                  <h3 className="font-sans font-bold text-lg text-[#8B5A2B] mb-4 flex items-center gap-2 justify-end">
                    <span>وصف المنتج</span>
                    <div className="w-8 h-[2px] bg-[#D4A574]"></div>
                  </h3>
                  <p className="font-sans text-base text-[#4A3728] leading-[1.8] mb-6">
                    {product.description}
                  </p>

                  {/* مميزات إضافية */}
                  <div className="bg-white rounded-[16px] p-5 border border-[#D4A574]/20 shadow-sm">
                    <h4 className="font-sans font-semibold text-sm text-[#8B5A2B] mb-3">
                      المميزات الرئيسية
                    </h4>
                    <ul className="space-y-2 text-right">
                      {[
                        "جودة عالية",
                        "تصدير عالمي",
                        "شهادات معتمدة",
                        "تغليف ممتاز",
                      ].map((feature, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-2 justify-end text-sm text-[#5C4033]"
                        >
                          <span>{feature}</span>
                          <span className="w-2 h-2 rounded-full bg-[#8B5A2B]"></span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>

                {/* Left Column - جدول المواصفات */}
                <motion.div variants={itemVariants}>
                  <h3
                    className="font-sans font-bold text-lg text-[#8B5A2B] mb-4 flex items-center gap-2 justify-end"
                    dir="rtl"
                  >
                    <span>المواصفات الفنية</span>
                    <div className="w-8 h-[2px] bg-[#D4A574]"></div>
                  </h3>

                  <div
                    className="bg-white rounded-[16px] overflow-hidden border border-[#D4A574]/20 shadow-sm"
                    dir="rtl"
                  >
                    {/* Table Header */}
                    <div className="bg-gradient-to-r from-[#8B5A2B] to-[#A0522D] text-white p-3 text-center">
                      <span className="font-sans font-bold text-sm">
                        العناصر الغذائية
                      </span>
                    </div>

                    {/* Table Body */}
                    <div className="divide-y divide-[#D4A574]/10">
                      {product.specs.map((spec, i) => (
                        <div
                          key={i}
                          className="flex justify-between items-center p-3 hover:bg-[#f9f5f0] transition-colors"
                        >
                          <span className="font-sans font-medium text-sm text-[#8B5A2B]">
                            {spec.value}
                          </span>
                          <span className="font-mono text-xs uppercase tracking-wider text-[#5C4033]">
                            {spec.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* معلومات إضافية */}
                  <div
                    className="mt-4 bg-[#8B5A2B]/5 rounded-[12px] p-4 border border-[#D4A574]/10"
                    dir="rtl"
                  >
                    <p className="text-xs text-[#5C4033] leading-relaxed text-right">
                      <span className="font-bold text-[#8B5A2B]">ملاحظة:</span>{" "}
                      جميع القيم تقريبية وقد تختلف حسب ظروف النمو والتخزين.
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* CTA Section */}
              <motion.div
                className="mt-8 pt-6 border-t border-[#D4A574]/20 flex flex-col sm:flex-row items-center justify-between gap-4"
                variants={itemVariants}
              >
                <a
                  href="#contact"
                  onClick={onClose}
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#8B5A2B] to-[#A0522D] text-white font-sans font-medium text-sm px-8 py-3.5 rounded-xl hover:shadow-lg hover:shadow-[#8B5A2B]/25 transition-all duration-300"
                >
                  <span>طلب عرض سعر</span>
                  <motion.span
                    animate={{ x: [0, -4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    ←
                  </motion.span>
                </a>

                <div className="text-right" dir="rtl">
                  <p className="text-sm text-[#5C4033]">
                    هل تريد معرفة المزيد؟
                  </p>
                  <p className="text-xs text-[#8B5A2B]/70">
                    فريق المبيعات جاهز لمساعدتك
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* Footer - زخرفة */}
            <div className="bg-gradient-to-r from-[#8B5A2B] to-[#A0522D] p-4 rounded-b-[24px] flex items-center justify-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#D4A574]/50"></div>
              <span className="text-[#E8D5C4] text-xs font-mono tracking-wider">
                UNISOL PREMIUM QUALITY
              </span>
              <div className="w-2 h-2 rounded-full bg-[#D4A574]/50"></div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
