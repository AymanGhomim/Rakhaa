import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/Button";

const NAV_LINKS = [
  { label: "من نحن", href: "#about" },
  { label: "الرؤية", href: "#vision" },
  { label: "المنتجات", href: "#products" },
  { label: "تواصل معنا", href: "#contact" },
];

const PRESTIGE_EASE = [0.22, 1, 0.36, 1] as const;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    setMobileOpen(false);
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        dir="rtl"
        className="fixed top-0 left-0 right-0 z-50 w-full px-6 md:px-16 py-1 flex items-center justify-between transition-all duration-400"
        style={{
          background: scrolled
            ? "rgba(248, 250, 249, 0.95)"
            : "rgba(248, 250, 249, 0.85)",
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          borderBottom: "1px solid rgba(200, 164, 93, 0.2)",
          boxShadow: scrolled ? "0 4px 24px rgba(20, 83, 45, 0.06)" : "none",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: PRESTIGE_EASE }}
      >
        {/* Logo (يمين) */}
        <a href="#" className="flex-shrink-0">
          <img
            src="/assets/rakhaa-logo.png"
            alt="ركاء"
            className="h-14 md:h-18 w-auto"
          />
        </a>
        

        {/* Links (النص) */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="link-underline font-sans font-medium text-sm text-deep-charcoal hover:text-vibrant-green transition-colors duration-300 tracking-[0.02em]"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA (شمال) */}
        <div className="hidden md:block">
          <Button href="#contact" size="default">
            تواصل الآن
          </Button>
        </div>

        {/* Mobile Button */}
        <button
          className="md:hidden flex flex-col gap-[6px] p-2 cursor-pointer"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="فتح القائمة"
        >
          <motion.span
            className="block w-6 h-[2px] bg-deep-charcoal origin-center"
            animate={mobileOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.4, ease: PRESTIGE_EASE }}
          />
          <motion.span
            className="block w-6 h-[2px] bg-deep-charcoal"
            animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
          <motion.span
            className="block w-6 h-[2px] bg-deep-charcoal origin-center"
            animate={mobileOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.4, ease: PRESTIGE_EASE }}
          />
        </button>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-luxury-white flex flex-col items-center justify-center gap-8 md:hidden"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: PRESTIGE_EASE }}
          >
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="font-sans font-semibold text-3xl text-deep-charcoal hover:text-vibrant-green transition-colors duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.1 + i * 0.08,
                  duration: 0.4,
                  ease: PRESTIGE_EASE,
                }}
              >
                {link.label}
              </motion.a>
            ))}

            <Button href="#contact" onClick={() => setMobileOpen(false)}>
              تواصل الآن
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
