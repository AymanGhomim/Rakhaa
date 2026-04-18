import { motion, AnimatePresence } from "framer-motion";
import { X, Droplets, Leaf, Beaker, Award, Globe, Info } from "lucide-react";
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
  hidden: { scale: 0.9, opacity: 0, y: 40 },
  visible: {
    scale: 1,
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: PRESTIGE_EASE },
  },
  exit: {
    scale: 0.95,
    opacity: 0,
    y: 30,
    transition: { duration: 0.4, ease: PRESTIGE_EASE },
  },
};

const contentVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { y: 25, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: PRESTIGE_EASE },
  },
};

const specRowVariants = {
  hidden: { x: -20, opacity: 0 },
  visible: (i: number) => ({
    x: 0,
    opacity: 1,
    transition: { delay: i * 0.05, duration: 0.4, ease: PRESTIGE_EASE },
  }),
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

  // تحديد لون الفئة
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "أسمدة":
        return {
          bg: "from-emerald-700 to-emerald-900",
          icon: Leaf,
          accent: "emerald",
        };
      case "عناصر صغرى":
        return {
          bg: "from-amber-700 to-amber-900",
          icon: Beaker,
          accent: "amber",
        };
      case "منظمات النمو":
        return {
          bg: "from-violet-700 to-violet-900",
          icon: Droplets,
          accent: "violet",
        };
      case "مواد ناشرة":
        return { bg: "from-sky-700 to-sky-900", icon: Award, accent: "sky" };
      default:
        return {
          bg: "from-stone-700 to-stone-900",
          icon: Globe,
          accent: "stone",
        };
    }
  };

  if (!product) return null;

  const categoryStyle = getCategoryColor(product.category);
  const CategoryIcon = categoryStyle.icon;

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* الخلفية المظللة */}
          <motion.div
            className="absolute inset-0 bg-[rgba(20,15,10,0.92)] backdrop-blur-md"
            onClick={onClose}
          />

          {/* النافذة الرئيسية - تصميم البرشور الفاخر */}
          <motion.div
            className="relative w-full max-w-[1100px] max-h-[95vh] overflow-hidden bg-[#faf8f3] rounded-[28px] shadow-[0_35px_100px_rgba(0,0,0,0.4)]"
            variants={panelVariants}
            dir="rtl"
          >
            {/* زر الإغلاق */}
            <motion.button
              className="absolute top-5 left-5 z-50 w-12 h-12 flex items-center justify-center rounded-full bg-white/90 text-stone-700 cursor-pointer shadow-lg border border-stone-200 hover:bg-stone-100 transition-colors"
              onClick={onClose}
              whileHover={{ rotate: 90, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <X size={20} />
            </motion.button>

            {/* الشريط العلوي الملون حسب الفئة */}
            <div
              className={`bg-gradient-to-r ${categoryStyle.bg} p-6 sm:p-8 relative overflow-hidden`}
            >
              {/* نمط زخرفي */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
              </div>

              <motion.div
                className="relative flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6"
                variants={contentVariants}
                initial="hidden"
                animate="visible"
              >
                {/* أيقونة الفئة */}
                <motion.div
                  className="w-20 h-20 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/20 shadow-inner"
                  variants={itemVariants}
                >
                  <CategoryIcon size={36} className="text-white" />
                </motion.div>

                <div className="flex-1">
                  <motion.span
                    className="inline-flex items-center gap-2 font-mono font-semibold text-[11px] uppercase tracking-[0.2em] text-white/80 mb-2 px-3 py-1 rounded-full bg-white/10 border border-white/20"
                    variants={itemVariants}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    {product.category}
                  </motion.span>

                  <motion.h2
                    className="font-sans font-bold text-2xl sm:text-4xl text-white mb-2 leading-tight"
                    variants={itemVariants}
                  >
                    {product.title}
                  </motion.h2>

                  <motion.div
                    className="flex items-center gap-3 text-white/70"
                    variants={itemVariants}
                  >
                    <Globe size={16} />
                    <span className="font-sans text-sm">
                      بلد المنشأ: {product.origin}
                    </span>
                  </motion.div>
                </div>
              </motion.div>
            </div>

            {/* المحتوى الرئيسي */}
            <div className="overflow-y-auto max-h-[calc(95vh-180px)]">
              <motion.div
                className="p-6 sm:p-8"
                variants={contentVariants}
                initial="hidden"
                animate="visible"
              >
                {/* قسم الصورة والوصف الرئيسي */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
                  {/* الصورة */}
                  <motion.div className="lg:col-span-5" variants={itemVariants}>
                    <div className="relative bg-white rounded-[24px] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-stone-100">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-56 sm:h-72 object-contain rounded-[16px]"
                      />

                      {/* شارة الجودة */}
                      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2">
                        <div
                          className={`bg-gradient-to-r ${categoryStyle.bg} text-white px-5 py-2 rounded-full shadow-lg flex items-center gap-2`}
                        >
                          <Award size={16} />
                          <span className="font-medium text-sm">
                            منتج ممتاز
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* الوصف المفصل */}
                  <motion.div className="lg:col-span-7" variants={itemVariants}>
                    <div className="bg-white rounded-[24px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-stone-100 h-full">
                      <h3 className="font-sans font-bold text-xl text-stone-800 mb-4 flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-xl bg-${categoryStyle.accent}-100 flex items-center justify-center`}
                        >
                          <Info
                            size={20}
                            className={`text-${categoryStyle.accent}-700`}
                          />
                        </div>
                        <span>نبذة عن المنتج</span>
                      </h3>

                      <p className="font-sans text-base text-stone-600 leading-[2] text-justify">
                        {product.description}
                      </p>

                      {/* مميزات سريعة */}
                      <div className="mt-6 grid grid-cols-2 gap-3">
                        {[
                          { label: "جودة عالية", value: "مضمونة" },
                          { label: "الأصل", value: product.origin },
                          { label: "التصنيف", value: product.category },
                          { label: "التوافر", value: "متوفر" },
                        ].map((item, i) => (
                          <div
                            key={i}
                            className="bg-stone-50 rounded-xl p-3 border border-stone-100"
                          >
                            <span className="block text-xs text-stone-400 mb-1">
                              {item.label}
                            </span>
                            <span className="font-medium text-sm text-stone-700">
                              {item.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* جدول المواصفات التفصيلي */}
                <motion.div variants={itemVariants}>
                  <div className="bg-white rounded-[24px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-stone-100">
                    {/* رأس الجدول */}
                    <div className={`bg-gradient-to-r ${categoryStyle.bg} p-5`}>
                      <h3 className="font-sans font-bold text-lg text-white flex items-center gap-3">
                        <Beaker size={22} />
                        <span>المواصفات الفنية والتركيبة</span>
                      </h3>
                    </div>

                    {/* محتوى الجدول */}
                    <div className="p-2">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {product.specs.map((spec, i) => (
                          <motion.div
                            key={i}
                            className="flex items-center justify-between p-4 rounded-xl bg-stone-50 hover:bg-stone-100 transition-colors border border-stone-100"
                            custom={i}
                            variants={specRowVariants}
                            initial="hidden"
                            animate="visible"
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-8 h-8 rounded-lg bg-${categoryStyle.accent}-100 flex items-center justify-center`}
                              >
                                <span className="text-xs font-bold text-stone-500">
                                  {i + 1}
                                </span>
                              </div>
                              <span className="font-sans font-semibold text-sm text-stone-700">
                                {spec.label}
                              </span>
                            </div>
                            <span
                              className={`font-mono font-bold text-sm text-${categoryStyle.accent}-700 bg-white px-3 py-1.5 rounded-lg border border-stone-200 shadow-sm`}
                            >
                              {spec.value}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* معلومات إضافية */}
                <motion.div
                  className="mt-6 bg-amber-50 rounded-[20px] p-5 border border-amber-100"
                  variants={itemVariants}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
                      <Info size={24} className="text-amber-700" />
                    </div>
                    <div>
                      <h4 className="font-sans font-bold text-amber-900 mb-2">
                        تعليمات هامة للاستخدام
                      </h4>
                      <p className="font-sans text-sm text-amber-800 leading-relaxed">
                        يُرجى اتباع معدلات الاستخدام الموضحة في الجدول أعلاه.
                        يُفضل الرش في الصباح الباكر أو المساء. تجنب الاستخدام
                        خلال ساعات الحرارة العالية والظهيرة. يُرج جيداً قبل
                        الاستخدام. قابلية الخلط: يمكن خلطه مع الأسمدة والمبيدات
                        ما لم يُذكر خلاف ذلك.
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* أزرار التواصل */}
                <motion.div
                  className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-stone-200"
                  variants={itemVariants}
                >
                  <div className="text-center sm:text-right">
                    <p className="font-sans font-bold text-stone-800 text-lg">
                      هل تحتاج إلى مساعدة؟
                    </p>
                    <p className="font-sans text-sm text-stone-500 mt-1">
                      فريق المبيعات متوفر للإجابة على جميع استفساراتك
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <motion.a
                      href="#products"
                      onClick={onClose}
                      className="inline-flex items-center justify-center gap-2 bg-stone-100 text-stone-700 font-sans font-medium text-sm px-6 py-3.5 rounded-xl hover:bg-stone-200 transition-colors border border-stone-200"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span>العودة للمنتجات</span>
                    </motion.a>

                    <motion.a
                      href="#contact"
                      onClick={onClose}
                      className={`inline-flex items-center justify-center gap-2 bg-gradient-to-r ${categoryStyle.bg} text-white font-sans font-bold text-sm px-8 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all`}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span>طلب عرض سعر</span>
                      <motion.span
                        animate={{ x: [0, -4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        ←
                      </motion.span>
                    </motion.a>
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* التذييل */}
            <div
              className={`bg-gradient-to-r ${categoryStyle.bg} p-4 flex items-center justify-center gap-3`}
            >
              <div className="w-2 h-2 rounded-full bg-white/40" />
              <span className="text-white/80 text-xs font-mono tracking-widest uppercase">
                UNISOL Premium Agricultural Solutions
              </span>
              <div className="w-2 h-2 rounded-full bg-white/40" />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
