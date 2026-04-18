const footerColumns = [
  {
    heading: 'Company',
    links: [
      { label: 'About', href: '#about' },
      { label: 'Our Vision', href: '#vision' },
      { label: 'Quality Standards', href: '#' },
      { label: 'Sustainability', href: '#' },
    ],
  },
  {
    heading: 'Products',
    links: [
      { label: 'Cardamom', href: '#products' },
      { label: 'Rice', href: '#products' },
      { label: 'Dates', href: '#products' },
      { label: 'Pulses', href: '#products' },
    ],
  },
  {
    heading: 'Contact',
    links: [
      { label: 'info@rakhaa-eg.com', href: 'mailto:info@rakhaa-eg.com' },
      { label: '+20 100 683 3573', href: 'tel:+201006833573' },
      { label: 'Mansoura, Egypt', href: '#' },
    ],
  },
];

export default function Footer() {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#') && href !== '#') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="w-full bg-forest-green">
      <div className="max-w-[1280px] mx-auto px-5 md:px-10 py-16">
        {/* Top Row */}
        <div className="flex flex-col lg:flex-row justify-between gap-12">
          {/* Logo & Tagline */}
          <div className="lg:max-w-[300px]">
            <img
              src="/assets/rakhaa-logo.png"
              alt="Rakhaa"
              className="h-12 w-auto mb-4"
              style={{ filter: 'brightness(0) invert(1)' }}
            />
            <p className="font-sans text-sm text-[rgba(248,250,249,0.6)]">
              Cultivating Global Trade
            </p>
          </div>

          {/* Link Columns */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 lg:gap-16">
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

        {/* Divider */}
        <div className="border-t border-[rgba(248,250,249,0.1)] my-12" />

        {/* Bottom Row */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-mono text-xs text-[rgba(248,250,249,0.4)]">
            &copy; 2025 Rakhaa Agricultural Import & Export. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="font-mono text-xs text-[rgba(248,250,249,0.4)] hover:text-brushed-gold transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="#" className="font-mono text-xs text-[rgba(248,250,249,0.4)] hover:text-brushed-gold transition-colors duration-300">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
