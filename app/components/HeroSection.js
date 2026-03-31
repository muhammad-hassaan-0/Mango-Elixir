'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const heroRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    // Initial animation on load
    if (textRef.current) {
      gsap.from(textRef.current, {
        duration: 1.5,
        opacity: 0,
        y: 50,
        ease: 'power3.out',
      });
    }

    // Fade out hero text after 150vh scroll, synchronized with next section
    if (textRef.current) {
      gsap.fromTo(
        textRef.current,
        { opacity: 1 },
        {
          opacity: 0,
          scrollTrigger: {
            trigger: 'body',
            start: 'top+=150vh',
            end: 'top+=210vh',
            scrub: 1,
            markers: false,
          },
        }
      );
    }
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden"
    >
      {/* Content */}
      <div ref={textRef} className="relative z-10 text-center max-w-4xl px-8">
        <p className="text-orange-400 text-sm tracking-widest mb-6">PREMIUM TROPICAL NECTAR</p>

        <h1 className="serif text-6xl md:text-8xl font-black mb-8 leading-tight">
          <span className="bg-gradient-to-r from-orange-300 via-yellow-300 to-orange-400 bg-clip-text text-transparent">
            The Gold Standard
          </span>
          <br />
          <span className="text-white">of Tropical Nectar</span>
        </h1>

        <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-12">
          Experience the ultimate expression of tropical perfection. Mango Elixir represents luxury,
          craftsmanship, and the essence of paradise in every sip.
        </p>

        {/* CTA Button */}
        <button className="inline-block px-10 py-4 bg-gradient-to-r from-orange-400 to-orange-600 text-black font-bold rounded-full hover:shadow-2xl hover:shadow-orange-500/50 transition-all interactive text-lg">
          Begin The Experience
        </button>
      </div>
    </section>
  );
}
