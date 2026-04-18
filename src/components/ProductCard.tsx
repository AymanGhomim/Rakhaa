import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Badge from "./Badge";

export interface Product {
  id: string;
  title: string;
  origin: string;
  description: string;
  image: string;
  featured?: boolean;
  category: string;
  specs: {
    label: string;
    value: string;
  }[];
}

interface ProductCardProps {
  product: Product;
  onOpen: (product: Product) => void;
  index?: number;
}

const PRESTIGE_EASE = [0.22, 1, 0.36, 1] as const;

const cardVariants = {
  hidden: { y: 40, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      delay: i * 0.12,
      ease: PRESTIGE_EASE,
    },
  }),
};

export default function ProductCard({
  product,
  onOpen,
  index = 0,
}: ProductCardProps) {
  const isFeatured = product.featured;

  if (isFeatured) {
    return (
      <motion.div
        className="col-span-full md:col-span-2 bg-luxury-white border border-[rgba(20,83,45,0.08)] rounded-xl overflow-hidden cursor-pointer group"
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        custom={0}
        whileHover={{ y: -8 }}
        transition={{ duration: 0.5 }}
        onClick={() => onOpen(product)}
      >
        <div className="flex flex-col md:flex-row">
          <div className="relative md:w-1/2 overflow-hidden">
            <Badge text="مميز" className="absolute top-4 left-4 z-10" />
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-64 md:h-full object-cover transition-transform duration-600 group-hover:scale-105"
            />
          </div>

          <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
            <span className="font-mono font-medium text-xs uppercase tracking-[0.08em] text-soft-gray mb-2">
              {product.category}
            </span>

            <h3 className="font-sans font-semibold text-xl md:text-2xl text-deep-charcoal mb-2">
              {product.title}
            </h3>

            <p className="font-sans text-sm text-soft-gray mb-3">
              المنشأ: {product.origin}
            </p>

            <p className="font-sans text-sm text-soft-gray mb-4 line-clamp-2">
              {product.description}
            </p>

            <span className="inline-flex items-center gap-2 text-forest-green font-sans text-sm font-medium group-hover:text-vibrant-green transition-colors duration-300">
              عرض التفاصيل
              <ArrowRight size={16} />
            </span>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="bg-luxury-white border border-[rgba(20,83,45,0.08)] rounded-xl overflow-hidden cursor-pointer group"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      custom={index}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.5 }}
      onClick={() => onOpen(product)}
    >
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-105"
        />
      </div>

      <div className="p-6">
        <span className="font-mono font-medium text-xs uppercase tracking-[0.08em] text-soft-gray mb-2 block">
          {product.category}
        </span>

        <h3 className="font-sans font-semibold text-xl text-deep-charcoal mb-2">
          {product.title}
        </h3>

        <p className="font-sans text-sm text-soft-gray mb-4">
          المنشأ: {product.origin}
        </p>

        <span className="inline-flex items-center gap-2 text-forest-green font-sans text-sm font-medium group-hover:text-vibrant-green transition-colors duration-300">
          عرض التفاصيل
          <ArrowRight size={16} />
        </span>
      </div>
    </motion.div>
  );
}
