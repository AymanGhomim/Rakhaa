import CharacterReveal from '@/components/CharacterReveal';
import WordReveal from '@/components/WordReveal';
import Button from '@/components/Button';
import FloatingBlob from '@/components/FloatingBlob';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function CTASection() {
  return (
    <section
      id="contact"
      className="relative w-full py-24 md:py-32 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #14532D 0%, #0F3D22 50%, #14532D 100%)',
      }}
    >
      {/* Floating Gradient Blobs */}
      <FloatingBlob
        color="rgba(34, 197, 94, 0.12)"
        size={600}
        top="-100px"
        left="-100px"
        blur={80}
        xOffset={30}
        yOffset={20}
      />
      <FloatingBlob
        color="rgba(200, 164, 93, 0.1)"
        size={500}
        bottom="-100px"
        right="-100px"
        blur={80}
        xOffset={-20}
        yOffset={30}
      />
      <FloatingBlob
        color="rgba(20, 83, 45, 0.2)"
        size={400}
        top="50%"
        left="50%"
        blur={80}
        xOffset={15}
        yOffset={-25}
      />

      {/* Content */}
      <div className="relative z-10 max-w-[700px] mx-auto px-5 md:px-10 text-center">
        <CharacterReveal
          text="Ready to Source Premium Agricultural Products?"
          as="h2"
          className="font-sans font-bold text-3xl md:text-5xl text-luxury-white leading-[1.1] tracking-[-0.01em] mb-6"
          staggerDelay={0.015}
          duration={0.6}
        />

        <div className="mb-10">
          <WordReveal
            text="Let's discuss how Rakhaa can meet your commodity needs. Whether you're looking for bulk cardamom, premium rice, or seasonal dates — we deliver quality you can trust."
            as="p"
            className="font-sans text-base md:text-lg text-[rgba(248,250,249,0.8)] leading-[1.7] max-w-[560px] mx-auto"
            staggerDelay={0.03}
            duration={0.4}
          />
        </div>

        <Button variant="gold" size="large" href="mailto:info@rakhaa-eg.com">
          Start a Conversation
        </Button>

        {/* Contact Info Row */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
          <a
            href="mailto:info@rakhaa-eg.com"
            className="flex items-center gap-2 text-[rgba(248,250,249,0.8)] hover:text-luxury-white transition-opacity duration-300"
          >
            <Mail size={16} className="flex-shrink-0" />
            <span className="font-sans text-sm">info@rakhaa-eg.com</span>
          </a>
          <a
            href="tel:+201006833573"
            className="flex items-center gap-2 text-[rgba(248,250,249,0.8)] hover:text-luxury-white transition-opacity duration-300"
          >
            <Phone size={16} className="flex-shrink-0" />
            <span className="font-sans text-sm">+20 100 683 3573</span>
          </a>
          <span className="flex items-center gap-2 text-[rgba(248,250,249,0.8)]">
            <MapPin size={16} className="flex-shrink-0" />
            <span className="font-sans text-sm">10 El-Gomhoreya St, Mansoura</span>
          </span>
        </div>
      </div>
    </section>
  );
}
