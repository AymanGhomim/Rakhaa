import { useEffect } from 'react';
import Lenis from 'lenis';
import Navbar from '@/sections/Navbar';
import HeroSection from '@/sections/HeroSection';
import TrustStripSection from '@/sections/TrustStripSection';
import VisionSection from '@/sections/VisionSection';
import ProductsSection from '@/sections/ProductsSection';
import CTASection from '@/sections/CTASection';
import Footer from '@/sections/Footer';

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      duration: 1.2,
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative">
      {/* Global Grain Overlay */}
      <div className="grain-overlay" />

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main>
        <HeroSection />
        <TrustStripSection />
        <div id="about">
          <VisionSection />
        </div>
        <ProductsSection />
        <CTASection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
