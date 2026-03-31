'use client';

import { useEffect, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { HeroSection, ScrollyCanvas, ProductGrid } from './components';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Animate right features section - fade in as hero fades out
    const rightSection = document.querySelector('.opacity-section-right');
    if (rightSection) {
      gsap.fromTo(
        rightSection,
        { opacity: 0 },
        {
          opacity: 1,
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

    // Animate left features section - fade in as right fades out
    const leftSection = document.querySelector('.opacity-section-left');
    if (leftSection) {
      gsap.fromTo(
        leftSection,
        { opacity: 0 },
        {
          opacity: 1,
          scrollTrigger: {
            trigger: 'body',
            start: 'top+=270vh',
            end: 'top+=300vh',
            scrub: 1,
            markers: false,
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="w-full bg-black">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
          <div className="flex flex-col items-center gap-6">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 rounded-full border-4 border-orange-900" />
              <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-orange-500 border-r-orange-500 animate-spin" />
            </div>
            <p className="text-orange-400 text-sm tracking-widest font-semibold">Loading Experience...</p>
          </div>
        </div>
      )}

      {/* Sticky Canvas Background - plays throughout scroll */}
      <div className="fixed top-0 left-0 w-full h-screen z-0">
        <ScrollyCanvas onLoadingComplete={() => setIsLoading(false)} />
      </div>

      {/* Scrollable content container */}
      <div className={`relative z-10 transition-opacity duration-1000 ${isLoading ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        {/* Section 1: Hero (0-30% of scroll) - height: ~100vh */}
        <div style={{ height: '100vh' }}>
          <HeroSection />
        </div>

        {/* Section 2: Right Features (30-70% of scroll) - height: ~200vh */}
        <div style={{ height: '200vh' }} className="flex items-center justify-end pr-12">
          <div className="w-full max-w-2xl">
            <div className="space-y-12 opacity-section-right">
              <div className="text-white">
                <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-orange-300 to-yellow-300 bg-clip-text text-transparent">
                  Crafted for Excellence
                </h2>
                <div className="space-y-6 text-gray-300 text-lg">
                  <div className="flex items-start gap-4">
                    <span className="text-orange-400 font-bold text-2xl">✓</span>
                    <div>
                      <h3 className="text-white font-semibold mb-2">Premium Mango Selection</h3>
                      <p>Hand-picked from the finest tropical orchards, each fruit is tested for optimal ripeness and flavor complexity.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="text-orange-400 font-bold text-2xl">✓</span>
                    <div>
                      <h3 className="text-white font-semibold mb-2">Cold Extraction Process</h3>
                      <p>Preserves nutritional integrity and natural flavors without heat degradation, ensuring maximum potency.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="text-orange-400 font-bold text-2xl">✓</span>
                    <div>
                      <h3 className="text-white font-semibold mb-2">Zero Additives</h3>
                      <p>No artificial flavors, preservatives, or refined sugars. Pure tropical nectar in its most authentic form.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Left Features (70-100% of scroll) - height: ~200vh */}
        <div style={{ height: '200vh' }} className="flex items-center justify-start pl-12">
          <div className="w-full max-w-2xl">
            <div className="space-y-12 opacity-section-left">
              <div className="text-white">
                <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                  The Experience
                </h2>
                <div className="space-y-6 text-gray-300 text-lg">
                  <div className="flex items-start gap-4">
                    <span className="text-yellow-400 font-bold text-2xl">◆</span>
                    <div>
                      <h3 className="text-white font-semibold mb-2">Sensory Journey</h3>
                      <p>Each sip unfolds layers of tropical complexity. Sweet mango notes blend seamlessly with subtle floral undertones.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="text-yellow-400 font-bold text-2xl">◆</span>
                    <div>
                      <h3 className="text-white font-semibold mb-2">Wellness in Every Drop</h3>
                      <p>Rich in vitamin C, antioxidants, and naturally occurring enzymes that support vitality and natural energy.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="text-yellow-400 font-bold text-2xl">◆</span>
                    <div>
                      <h3 className="text-white font-semibold mb-2">Luxury Redefined</h3>
                      <p>From the pristine orchards to your glass—luxury is not just the product, it's the entire philosophy.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Product Boutique */}
        <ProductGrid />

        {/* Footer */}
        <footer className="bg-black border-t border-white/10 px-8 py-12">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-gray-400 text-sm mb-2">© 2026 Mango Elixir. All rights reserved.</p>
            <p className="text-gray-500 text-xs">Crafted with precision. Delivered with passion.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
