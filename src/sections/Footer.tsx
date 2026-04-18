const footerColumns = [
  {
    heading: "الشركة",
    links: [
      { label: "من نحن", href: "#about" },
      { label: "رؤيتنا", href: "#vision" },
      { label: "معايير الجودة", href: "#" },
      { label: "الاستدامة", href: "#" },
    ],
  },
  {
    heading: "المنتجات",
    links: [
      { label: "الهيل", href: "#products" },
      { label: "الأرز", href: "#products" },
      { label: "التمور", href: "#products" },
      { label: "البقوليات", href: "#products" },
    ],
  },
  {
    heading: "تواصل معنا",
    links: [
      { label: "info@rakhaa-eg.com", href: "mailto:info@rakhaa-eg.com" },
      { label: "+20 100 683 3573", href: "tel:+201006833573" },
      { label: "المنصورة، مصر", href: "#" },
    ],
  },
];

export default function Footer() {
  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (href.startsWith("#") && href !== "#") {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <footer dir="rtl" className="w-full bg-forest-green">
      <div className="max-w-[1280px] mx-auto px-5 md:px-10 py-16">
        {/* الصف العلوي */}
        <div className="flex flex-col lg:flex-row-reverse justify-between gap-12">
          {/* اللوجو والوصف */}
          <div className="lg:max-w-[300px] text-right">
            <img
              src="/assets/rakhaa-logo.png"
              alt="رخاء"
              className="h-12 w-auto mb-4 ml-auto"
              style={{ filter: "brightness(0) invert(1)" }}
            />
            <p className="font-sans text-sm text-[rgba(248,250,249,0.6)]">
              نزرع تجارة عالمية
            </p>
          </div>

          {/* الأعمدة */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 lg:gap-16 text-right">
            {footerColumns.map((column) => (
              <div key={column.heading}>
                <h4 className="font-sans font-semibold text-sm text-luxury-white uppercase tracking-[0.04em] mb-4">
                  {column.heading}
                </h4>
                <ul className="space-y-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        onClick={(e) => handleClick(e, link.href)}
                        className="font-sans text-sm text-[rgba(248,250,249,0.6)] hover:text-brushed-gold transition-colors duration-300"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* خط فاصل */}
        <div className="border-t border-[rgba(248,250,249,0.1)] my-12" />

        {/* الصف السفلي */}
        <div className="flex flex-col sm:flex-row-reverse justify-between items-center gap-4 text-right">
          <p className="font-mono text-xs text-[rgba(248,250,249,0.4)]">
            © 2025 رخاء للاستيراد والتصدير الزراعي. جميع الحقوق محفوظة.
          </p>

          <div className="flex gap-6">
            <a
              href="#"
              className="font-mono text-xs text-[rgba(248,250,249,0.4)] hover:text-brushed-gold transition-colors duration-300"
            >
              سياسة الخصوصية
            </a>
            <a
              href="#"
              className="font-mono text-xs text-[rgba(248,250,249,0.4)] hover:text-brushed-gold transition-colors duration-300"
            >
              شروط الاستخدام
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
