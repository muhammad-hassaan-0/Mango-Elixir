'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function ScrollyCanvas({ onLoadingComplete }) {
  const canvasRef = useRef(null);
  const frameCountRef = useRef(0);
  const imagesRef = useRef([]);
  const loadingRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const frameCount = 192; // Total frames available

    // Set canvas size
    const resizeCanvas = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Preload images
    const preloadImages = async () => {
      if (loadingRef.current) return;
      loadingRef.current = true;

      const images = [];
      const loadPromises = [];

      for (let i = 1; i <= frameCount; i++) {
        const promise = new Promise((resolve) => {
          const img = new Image();
          const frameNum = String(i).padStart(3, '0');
          
          img.onload = () => {
            images[i - 1] = img;
            resolve();
          };

          img.onerror = () => resolve();
          img.src = `/assets/sequence/ezgif-frame-${frameNum}.jpg`;
        });

        loadPromises.push(promise);
      }

      await Promise.all(loadPromises);
      imagesRef.current = images;

      // Draw first frame
      if (images[0]) {
        drawFrame(ctx, canvas, images[0]);
      }

      // Animate with GSAP
      animateWithGSAP();

      // Notify parent that loading is complete
      if (onLoadingComplete) {
        onLoadingComplete();
      }
    };

    const drawFrame = (context, canvasEl, image) => {
      if (!image) return;

      const canvasWidth = canvasEl.width;
      const canvasHeight = canvasEl.height;
      const imageAspect = image.width / image.height;
      const canvasAspect = canvasWidth / canvasHeight;

      let drawWidth, drawHeight, x, y;

      if (imageAspect > canvasAspect) {
        // Image is wider
        drawHeight = canvasHeight;
        drawWidth = canvasHeight * imageAspect;
        x = (canvasWidth - drawWidth) / 2;
        y = 0;
      } else {
        // Image is taller
        drawWidth = canvasWidth;
        drawHeight = canvasWidth / imageAspect;
        x = 0;
        y = (canvasHeight - drawHeight) / 2;
      }

      context.fillStyle = '#1a1a1a';
      context.fillRect(0, 0, canvasWidth, canvasHeight);
      context.drawImage(image, x, y, drawWidth, drawHeight);
    };

    const animateWithGSAP = () => {
      const playhead = { frame: 0 };

      gsap.to(playhead, {
        frame: frameCount - 1,
        snap: 'frame',
        ease: 'none',
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.5,
          markers: false,
        },
        onUpdate: () => {
          const frameIndex = Math.floor(playhead.frame);
          if (imagesRef.current[frameIndex]) {
            drawFrame(ctx, canvas, imagesRef.current[frameIndex]);
          }
        },
      });
    };

    preloadImages();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div className="canvas-container w-full h-full">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}
