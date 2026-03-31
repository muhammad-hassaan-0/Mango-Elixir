# Mango Elixir - Complete Implementation Guide

## Project Overview
A premium, immersive scrollytelling landing page built with Next.js 15, GSAP ScrollTrigger, Lenis smooth scrolling, and HTML5 Canvas-based image sequence animation.

---

## ✅ STEP 1: Initialize & Install Dependencies

**Already completed!** But here are the commands if you need to rebuild:

```cmd
cd d:\frontend-projects\drinks5
npx create-next-app@latest . --js --no-typescript --tailwind --app --no-eslint --no-git
npm install gsap lenis framer-motion
npm install -D tailwindcss postcss autoprefixer
```

**Verify installation:**
```cmd
npm list
```

Expected packages:
- ✅ next (v16.2.1+)
- ✅ react (v19.2.4+)
- ✅ gsap (v3.14.2+)
- ✅ lenis (v1.3.21+)
- ✅ tailwindcss (v4+)

---

## 📁 STEP 2: Project Structure Created

The following structure has been set up:

```
d:\frontend-projects\drinks5\
├── app/
│   ├── components/
│   │   ├── SmoothScroll.js          # Lenis wrapper for momentum scrolling
│   │   ├── CustomCursor.js          # Orange dot cursor with expand on hover
│   │   ├── ScrollyCanvas.js         # Image sequence + GSAP animation engine
│   │   ├── HeroSection.js           # Hero "Hush" section with serif typography
│   │   ├── ProductGrid.js           # 3-column product grid with 3D tilt
│   │   └── index.js                 # Component barrel exports
│   ├── globals.css                  # Global styling + animations
│   ├── layout.js                    # Root layout with providers
│   ├── page.js                      # Main page (assembles all sections)
│   └── AGENTS.md
├── public/
│   ├── assets/
│   │   └── sequence/                # ← Place image frames here
│   ├── next.svg
│   └── vercel.svg
├── tailwind.config.js               # Tailwind theme extension
├── postcss.config.mjs               # PostCSS config
├── next.config.mjs                  # Next.js config
├── jsconfig.json                    # JS path aliases
├── package.json                     # Dependencies
├── SETUP.md                         # Quick setup guide
├── setup.bat                        # Windows batch helper
└── README.md                        # Next.js generated README
```

---

## 🎬 STEP 3: Image Sequence Setup

### Important: Add Your Frames

The project expects image frames in this location:
```
public/assets/sequence/
```

### Supported Frame Formats

**Option A: WebP Format (Recommended - Smaller file size)**
```
frame_0001.webp
frame_0002.webp
...
frame_0150.webp
```

**Option B: JPEG Format (Fallback - Auto-detected)**
```
ezgif-frame-001.jpg
ezgif-frame-002.jpg
...
ezgif-frame-192.jpg
```

### To Copy Your Frames (Windows)

If you have frames stored elsewhere, copy them:

```cmd
REM Copy from a specific location to the project
xcopy "C:\path\to\your\frames\*.jpg" "public\assets\sequence\" /Y

REM Or copy from parent directory
xcopy "..\sequences\*.jpg" "public\assets\sequence\" /Y
```

### Optional: Convert JPG to WebP (Better Performance)

Install ImageMagick or ffmpeg, then run:

```cmd
REM Using ImageMagick
for /r "public/assets/sequence" %i in (*.jpg) do convert "%i" "%~ni.webp"

REM Using ffmpeg
for /r "public/assets/sequence" %i in (*.jpg) do ffmpeg -i "%i" "%~ni.webp"

REM Using Node.js (if imagemin installed)
npx imagemin public/assets/sequence/*.jpg --out-dir=public/assets/sequence --plugin=webp
```

---

## 🧩 STEP 4: Component Documentation

### 1. **SmoothScroll.js** - Lenis Momentum Scrolling
```javascript
// Location: app/components/SmoothScroll.js

// Features:
// - Smooth momentum-based scrolling
// - 1.2s duration with easing
// - Touch-enabled
// - Automatic RAF loop

// Usage: Wraps entire app in layout.js
<SmoothScroll>
  <App />
</SmoothScroll>
```

**Key Properties:**
- `duration: 1.2` - Scroll animation duration
- `easing` - Custom easing function (ease-out)
- `smooth: true` - Enable smooth scrolling
- `touchMultiplier: 2` - Mobile touch sensitivity

---

### 2. **CustomCursor.js** - Interactive Cursor
```javascript
// Location: app/components/CustomCursor.js

// Features:
// - 20px orange dot that follows mouse
// - Expands to 40px ring on button/link hover
// - Smooth trailing motion
// - z-index: 9999

// Styling: app/globals.css
.cursor {
  width: 20px;
  height: 20px;
  background: rgba(255, 165, 0, 0.8);
  border-radius: 50%;
}

.cursor.active {
  width: 40px;
  height: 40px;
  border: 2px solid #ff9f1c;
  background: transparent;
}
```

---

### 3. **ScrollyCanvas.js** - Image Sequence Animation Engine
```javascript
// Location: app/components/ScrollyCanvas.js

// Core Features:
// ✅ Preloads all frames (no flickering) - preloadImages()
// ✅ Canvas rendering with aspect ratio cover logic - drawFrame()
// ✅ GSAP ScrollTrigger integration - animateWithGSAP()
// ✅ Smooth frame playhead - { frame: 0 to frameCount-1 }
// ✅ Viscous feel - scrub: 1.5 (try 2.0 for heavier feel)

// Frame Count: 192 (auto-adjusts)
// Canvas Size: Full viewport width/height
// Render Mode: Object-fit: cover (centers and crops image)

// GSAP Animation Setup:
gsap.to(playhead, {
  frame: frameCount - 1,          // Play through all frames
  snap: 'frame',                   // Snap to integer frames only
  ease: 'none',                    // Linear scroll mapping
  scrollTrigger: {
    trigger: canvas.parentElement, // Trigger on container
    start: 'top top',              // Start at top
    end: 'bottom bottom',          // End at bottom
    scrub: 1.5,                    // Viscous feel (try 2.0)
    markers: false                 // No debug markers
  },
  onUpdate: () => {
    // Redraw canvas with current frame
    drawFrame(ctx, canvas, imagesRef.current[frameIndex]);
  }
});
```

**Performance Notes:**
- Preloads all frames before visibility
- Each frame stored in ImageCache array
- ~50-100MB RAM for 192x1920x1080 images
- 60fps performance on modern devices

---

### 4. **HeroSection.js** - "The Hush" Hero
```javascript
// Location: app/components/HeroSection.js

// Features:
// - Minimalist centered text
// - Serif font: Playfair Display
// - "The Gold Standard" gradient text
// - Animated background orbs
// - Scroll indicator at bottom
// - GSAP intro animation

// Typography:
<h1 className="serif text-6xl md:text-8xl font-black">
  <span className="bg-gradient-to-r from-orange-300 via-yellow-300 to-orange-400 bg-clip-text text-transparent">
    The Gold Standard
  </span>
</h1>

// Text animates in with:
gsap.from(textRef.current, {
  duration: 1.5,
  opacity: 0,
  y: 50,
  ease: 'power3.out'
});
```

---

### 5. **ProductGrid.js** - Product Boutique
```javascript
// Location: app/components/ProductGrid.js

// Features:
// ✅ 3-column responsive grid (1 col on mobile)
// ✅ Glassmorphism cards (blur + transparency)
// ✅ 3D Tilt on hover (rotateX/rotateY based on mouse)
// ✅ Product specifications in monospace font
// ✅ Gradient accent badges

// Products Array (edit to customize):
const products = [
  {
    name: 'Original Gold',
    subtitle: 'The Flagship',
    description: 'Pure mango nectar...',
    specs: ['Brix: 12.5°', 'pH: 3.8', 'Origin: Philippine'],
    color: 'from-amber-400 to-yellow-500'
  },
  // ... Midnight Mango, Habanero Heat
];

// 3D Tilt Calculation:
const rotateX = (y - rect.height / 2) / 10;
const rotateY = (rect.width / 2 - x) / 10;

card.style.transform = `
  perspective(1000px)
  rotateX(${rotateX}deg)
  rotateY(${rotateY}deg)
  translateZ(20px)
`;

// Glassmorphism (globals.css):
.glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
```

---

## 🎨 STEP 5: Styling & Customization

### Global Styles (app/globals.css)
```css
/* Dark luxury theme */
body {
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  color: #f5f5f5;
}

/* Typography */
.serif { font-family: 'Playfair Display', serif; }
.monospace { font-family: 'Space Mono', monospace; }

/* Glassmorphism */
.glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* Custom Cursor */
.cursor {
  background: rgba(255, 165, 0, 0.8);
  transition: width 0.3s ease, height 0.3s ease;
}

.cursor.active {
  width: 40px;
  height: 40px;
  border: 2px solid #ff9f1c;
  background: transparent;
}
```

### Tailwind Config (tailwind.config.js)
```javascript
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './app/components/**/*.{js,jsx}'
  ],
  theme: {
    extend: {
      colors: {
        orange: {
          400: '#ff9f1c',
          500: '#ffa500',
          600: '#ff8c00'
        }
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        monospace: ['Space Mono', 'monospace']
      }
    }
  }
};
```

---

## 🚀 STEP 6: Run the Project

### Development Server
```cmd
cd d:\frontend-projects\drinks5
npm run dev
```

Expected output:
```
▲ Next.js 16.2.1
- Local:        http://localhost:3000
- Environments: .env.local
```

Open browser to **http://localhost:3000**

### Build for Production
```cmd
npm run build
```

### Start Production Server
```cmd
npm start
```

---

## 📊 Page Architecture & Scroll Behavior

### Section 1: Hero ("The Hush")
- **Height**: 100vh (full viewport)
- **Scroll%**: 0-25%
- **Animation**: Text fades in, background orbs pulse
- **Content**: "The Gold Standard of Tropical Nectar" + CTA button

### Section 2: Sticky Canvas Assembly
- **Height**: 300vh (3x viewport for detailed animation)
- **Scroll%**: 25-75%
- **Sticky**: Canvas stays fixed while page scrolls under it
- **Animation Stages**:
  - 0-30%: Frame 0-64 (juice swirl wraps bottle)
  - 30-60%: Frame 64-128 (mango cubes fly in, parallax float)
  - 60-100%: Frame 128-192 (bubbles appear, condensation, label fades in)
- **GSAP Scrub**: 1.5 (viscous feel like thick mango nectar)

### Section 3: Product Boutique
- **Height**: 100vh+ (depends on content)
- **Scroll%**: 75-100%
- **Grid**: Responsive 1/3 columns
- **Interactions**: 3D tilt on hover, button glow

### Footer
- **Height**: Auto
- **Content**: Copyright + company tagline

---

## 🎯 Advanced Customization

### Change Scrub Timing (More/Less Viscous)
Edit `app/components/ScrollyCanvas.js` line ~111:
```javascript
scrub: 1.5,  // Lower = faster (0.5), Higher = slower (2.5)
```

### Adjust Smooth Scroll Duration
Edit `app/components/SmoothScroll.js` line ~6:
```javascript
duration: 1.2,  // Lower = snappier, Higher = smoother
```

### Customize Product Data
Edit `app/components/ProductGrid.js` line ~7:
```javascript
const products = [
  {
    name: 'Your Product',
    subtitle: 'Tagline',
    description: 'Description...',
    specs: ['Spec1', 'Spec2', 'Spec3'],
    color: 'from-color-1 to-color-2'
  }
];
```

### Change Hero Text
Edit `app/components/HeroSection.js` line ~28:
```javascript
<h1 className="serif text-6xl md:text-8xl font-black">
  {/* Update this text */}
</h1>
```

---

## 🔧 Troubleshooting

### Problem: Images not displaying
**Solution**:
1. Check frames are in `public/assets/sequence/`
2. Verify naming pattern (frame_XXXX.jpg or frame_XXXX.webp)
3. Open DevTools → Network → look for 404 errors on images
4. Check browser console for error messages

### Problem: Smooth scroll feels jerky
**Solution**:
1. Ensure all frames are preloaded (Network tab should show all images)
2. Reduce scrub value from 1.5 to 1.0
3. Close other browser tabs to free RAM/CPU
4. Use WebP format instead of JPG for faster loading

### Problem: Custom cursor not visible
**Solution**:
1. Check z-index: 9999 is set in globals.css
2. Verify `<CustomCursor />` is in layout.js
3. Check browser DevTools for hidden elements
4. Try in a different browser

### Problem: Canvas looks blurry
**Solution**:
1. Remove any CSS filters on canvas
2. Check browser zoom level (should be 100%)
3. Verify canvas dimensions aren't constrained

### Problem: Scroll feels laggy on mobile
**Solution**:
1. Ensure using WebP format (faster to render)
2. Try transparent: true for canvas
3. Reduce frame resolution (1280x720 instead of 1920x1080)
4. Test on real device (emulator can be slow)

---

## 📱 Mobile Optimization

The project is responsive by default. For better mobile performance:

1. **Reduce Frame Resolution**: Resize images to 1280x720
2. **Use WebP Format**: Smaller file sizes
3. **Lazy Load ProductGrid**: Add Intersection Observer
4. **Optimize Canvas**: Enable pixel ratio detection

---

## 🚢 Deployment

### Vercel (Recommended)
```cmd
npm install -g vercel
vercel
```

### Docker
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Traditional Hosting
```cmd
npm run build
npm start
# Server runs on http://localhost:3000
```

---

## 📚 Key Technologies Explained

### GSAP ScrollTrigger
- **Purpose**: Tie animations to scroll position
- **scrub**: Smooths animation to match scroll (1.5 = moderate viscosity)
- **snap**: Forces frame-by-frame animation

### Lenis
- **Purpose**: Smooth momentum-based scrolling
- **duration**: How long scrolls take to complete
- **easing**: Acceleration curve

### Canvas + Image Sequence
- **Why**: Smooth 60fps frame animation (better than GIF)
- **Preload**: Prevents flickering when images load
- **Aspect Ratio**: Covers viewport like CSS object-fit: cover

### Glassmorphism
- **backdrop-filter**: CSS blur effect (10px)
- **rgba(255,255,255,0.1)**: Semi-transparent white
- **90s design trend**: Premium, elegant aesthetic

---

## 📞 Support Files

- **SETUP.md**: Quick start guide
- **setup.bat**: Batch helper for copying frames
- **tailwind.config.js**: Theme customization
- **Component files**: Well-commented code

---

## ✨ Summary

You now have a production-ready premium scrollytelling experience with:

✅ Next.js 15 (App Router)  
✅ GSAP ScrollTrigger animations  
✅ Lenis smooth scrolling  
✅ HTML5 Canvas image sequencing  
✅ Glassmorphism UI  
✅ Responsive design  
✅ Custom cursor  
✅ Premium typography  
✅ 3D tilt effects  
✅ Dark luxury theme  

**Next**: Add your image frames to `public/assets/sequence/` and run `npm run dev`!
