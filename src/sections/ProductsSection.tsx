import { useState } from "react";
import { motion } from "framer-motion";
import CharacterReveal from "@/components/CharacterReveal";
import ProductCard, { type Product } from "@/components/ProductCard";
import ProductModal from "@/components/ProductModal";

const products: Product[] = [
  {
    id: "cardamom",
    title: "الهيل الأخضر",
    category: "توابل",
    origin: "غواتيمالا، الهند، سريلانكا",
    description:
      'حبوب هيل كاملة فاخرة تُعرف بـ "ملكة التوابل"، تتميز برائحة قوية ونكهة مميزة. يتم اختيارها بعناية وتجفيفها تحت الشمس وفرزها لضمان أعلى جودة ممكنة. مناسبة للطهي والمشروبات وخلطات التوابل.',
    image: "/assets/product-cardamom.jpg",
    featured: true,
    specs: [
      { label: "الدرجة", value: "كبير، كبير جدًا" },
      { label: "اللون", value: "أخضر داكن" },
      { label: "الرطوبة", value: "بحد أقصى 12%" },
      { label: "التعبئة", value: "أكياس خيش 25/50 كجم" },
    ],
  },
  {
    id: "pulses",
    title: "البقوليات المجففة",
    category: "حبوب",
    origin: "مصر، الهند، كندا",
    description:
      "مجموعة متنوعة من البقوليات عالية الجودة تشمل العدس، الحمص، الفاصوليا، والفول. يتم اختيارها من مزارع معتمدة وتخضع لاختبارات جودة دقيقة.",
    image: "/assets/product-pulses.jpg",
    specs: [
      { label: "الأنواع", value: "عدس، حمص، فاصوليا" },
      { label: "النقاء", value: "99.5% على الأقل" },
      { label: "الرطوبة", value: "بحد أقصى 14%" },
      { label: "التعبئة", value: "أكياس PP 25/50 كجم" },
    ],
  },
  {
    id: "rice",
    title: "أرز فاخر",
    category: "حبوب",
    origin: "مصر، الهند، تايلاند",
    description:
      "أرز أبيض طويل ومتوسط الحبة بجودة عالية، يتم تلميعه وطحنه بدقة للحصول على أفضل جودة.",
    image: "/assets/product-rice.jpg",
    specs: [
      { label: "طول الحبة", value: "6.5 - 8.2 مم" },
      { label: "الحبوب المكسورة", value: "بحد أقصى 5%" },
      { label: "الرطوبة", value: "بحد أقصى 13%" },
      { label: "التعبئة", value: "أكياس PP 25/50 كجم" },
    ],
  },
  {
    id: "maize",
    title: "ذرة صفراء",
    category: "حبوب",
    origin: "أوكرانيا، البرازيل، الأرجنتين",
    description:
      "ذرة صفراء عالية الجودة للاستهلاك البشري والأعلاف الحيوانية، مطابقة للمعايير الدولية.",
    image: "/assets/product-maize.jpg",
    specs: [
      { label: "البروتين", value: "8% على الأقل" },
      { label: "الرطوبة", value: "بحد أقصى 14%" },
      { label: "الوزن الحجمي", value: "70 كجم/هكتولتر" },
      { label: "التعبئة", value: "سائب / أكياس 50 كجم" },
    ],
  },
  {
    id: "dates",
    title: "تمر فاخر",
    category: "فواكه",
    origin: "مصر، السعودية، تونس",
    description:
      "تمر فاخر بأنواعه المختلفة مثل المجدول والدقلة، يتم اختياره عند أعلى درجة نضج.",
    image: "/assets/product-dates.jpg",
    specs: [
      { label: "الأنواع", value: "مجدول، دقلة نور" },
      { label: "الحجم", value: "كبير جدًا، كبير، متوسط" },
      { label: "الرطوبة", value: "بحد أقصى 20%" },
      { label: "التعبئة", value: "كرتون 5/10 كجم" },
    ],
  },
  {
    id: "spices",
    title: "توابل مشكلة",
    category: "توابل",
    origin: "الهند، فيتنام، إندونيسيا",
    description:
      "مجموعة عطرية من التوابل الطبيعية مثل القرفة، الفلفل الأسود، القرنفل، والفلفل الحار.",
    image: "/assets/product-spices.jpg",
    specs: [
      { label: "الأنواع", value: "قرفة، فلفل، قرنفل" },
      { label: "الشكل", value: "كامل / مطحون" },
      { label: "الزيوت الطيارة", value: "2% على الأقل" },
      { label: "التعبئة", value: "أكياس متعددة الطبقات 25 كجم" },
    ],
  },
];

export default function ProductsSection() {
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);

  return (
    <>
      <section
        id="products"
        dir="rtl"
        className="relative w-full bg-luxury-white py-20 md:py-32"
      >
        <div className="max-w-[1280px] mx-auto px-5 md:px-10">
          {/* العنوان */}
          <div className="mb-12 md:mb-16 text-right">
            {/* العنوان الرئيسي أكبر وأفخم */}
            <motion.span className="font-mono font-bold text-[18px] md:text-[22px] uppercase tracking-[0.25em] text-brushed-gold mb-4 block">
              منتجاتنا
            </motion.span>

            {/* عنوان تقليدي أنيق */}
            <motion.h2
              className="font-sans font-semibold text-3xl md:text-[44px] text-deep-charcoal text-right leading-snug tracking-normal"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              منتجات زراعية فاخرة
            </motion.h2>

            <motion.p className="font-sans text-base text-soft-gray max-w-[600px] text-right">
              يتم اختيارها من أفضل مناطق الإنتاج، مع فحص دقيق وتوصيل وفق أعلى
              المعايير العالمية.
            </motion.p>
          </div>

          {/* المنتجات */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                onOpen={setActiveProduct}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      <ProductModal
        product={activeProduct}
        onClose={() => setActiveProduct(null)}
      />
    </>
  );
}
