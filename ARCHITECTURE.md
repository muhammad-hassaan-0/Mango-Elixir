# Mango Elixir - Architecture & Data Flow

## Project Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                   BROWSER (User Interface)                   │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              Layout.js (Provider Wrapper)            │  │
│  │  ├─ SmoothScroll (Lenis Setup)                      │  │
│  │  │  └─ requestAnimationFrame loop                   │  │
│  │  ├─ CustomCursor (Mouse Tracking)                   │  │
│  │  │  └─ Cursor position update @ 60fps               │  │
│  │  └─ {children} → page.js                            │  │
│  └──────────────────────────────────────────────────────┘  │
│                         ↓                                     │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                  Page.js (Main Page)                 │  │
│  │  ├─ HeroSection Component                           │  │
│  │  │  ├─ Gradient text animation (GSAP)               │  │
│  │  │  └─ Scroll indicator bounce                       │  │
│  │  │                                                   │  │
│  │  ├─ ScrollyCanvas Container (300vh height)          │  │
│  │  │  └─ ScrollyCanvas Component                      │  │
│  │  │      ├─ Image Preloader (useEffect)              │  │
│  │  │      ├─ Canvas Renderer (drawFrame)              │  │
│  │  │      └─ GSAP ScrollTrigger (scrub: 1.5)          │  │
│  │  │         └─ Frame playhead animation              │  │
│  │  │                                                   │  │
│  │  ├─ ProductGrid Component                           │  │
│  │  │  ├─ Product 1 Card (3D Tilt)                     │  │
│  │  │  ├─ Product 2 Card (3D Tilt)                     │  │
│  │  │  ├─ Product 3 Card (3D Tilt)                     │  │
│  │  │  └─ CTA Button                                   │  │
│  │  │                                                   │  │
│  │  └─ Footer                                          │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

---

## Component Hierarchy

```
RootLayout
├── SmoothScroll (Provider)
│   └── Lenis Initialization
├── CustomCursor (Global)
│   └── Mouse Tracking
└── Page
    ├── HeroSection
    │   ├── Gradient Background Orbs
    │   ├── Serif Typography
    │   ├── GSAP Text Animation
    │   └── Scroll Indicator
    │
    ├── ScrollyCanvas Container (300vh)
    │   └── ScrollyCanvas
    │       ├── Frame Preloader
    │       │   └── All 192 images loaded to cache
    │       ├── Canvas Element
    │       │   └── HTML5 Canvas API
    │       ├── GSAP PlayHead Animation
    │       │   ├── frame: 0 → 191
    │       │   ├── ScrollTrigger Integration
    │       │   └── Scrub: 1.5 (viscous)
    │       └── Frame Renderer (onUpdate)
    │           └── drawFrame() function
    │
    ├── ProductGrid
    │   ├── Section Header
    │   ├── Product Card 1 (Original Gold)
    │   │   ├─ Glassmorphism Container
    │   │   ├─ 3D Tilt Detector (mousemove)
    │   │   ├─ Product Info
    │   │   └─ CTA Button
    │   │
    │   ├── Product Card 2 (Midnight Mango)
    │   │   └─ [Same structure]
    │   │
    │   ├── Product Card 3 (Habanero Heat)
    │   │   └─ [Same structure]
    │   │
    │   └── Catalog Button
    │
    └── Footer
        └── Copyright Info
```

---

## Data Flow Diagram

```
USER INTERACTION
      ↓
┌─────────────────────────────────────────┐
│         Mouse Movement Event            │
└─────────────────────────────────────────┘
      ↓                    ↓
    CustomCursor      ProductCard 3D Tilt
  (Position Update)   (Rotation Update)
      ↓                    ↓
   CSS Transform      CSS Transform


┌─────────────────────────────────────────┐
│         Scroll Event (Lenis)            │
└─────────────────────────────────────────┘
      ↓
  Scroll Position (0-300vh in Canvas)
      ↓
  GSAP ScrollTrigger
      ↓
  PlayHead Animation (frame: 0-191)
      ↓
  ScrollTrigger.onUpdate()
      ↓
  drawFrame(ctx, canvas, image)
      ↓
  Canvas.getContext('2d').drawImage()
      ↓
  Browser Render (60fps)
      ↓
  USER SEES IMAGE ANIMATION
```

---

## State Management & Data Flow

### ScrollyCanvas State
```javascript
// In useEffect hook
const [frameCount] = useState(192);                    // Total frames
const imagesRef = useRef([]);                         // Image cache
const frameCountRef = useRef(0);                      // Current frame

// GSAP PlayHead (external to React)
gsap.to(playhead, {
  frame: frameCount - 1,                             // Target frame
  snap: 'frame',                                     // Force integer
  ease: 'none',                                      // Linear
  scrollTrigger: {
    trigger: canvas.parentElement,
    scrub: 1.5                                       // Link to scroll
  },
  onUpdate: () => {
    // Rendered immediately, not through React state
    drawFrame(ctx, canvas, imagesRef.current[frameIndex]);
  }
});
```

### ProductCard State
```javascript
// Card 3D tilt state (computed from mouse position)
const card = cardRef.current;

// On mousemove:
const rotateX = (y - rect.height / 2) / 10;
const rotateY = (rect.width / 2 - x) / 10;

card.style.transform = `
  perspective(1000px)
  rotateX(${rotateX}deg)
  rotateY(${rotateY}deg)
  translateZ(20px)
`;

// On mouseleave:
card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
```

### CustomCursor State
```javascript
// Smooth trailing cursor (smoothing factor: 0.2)
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;

const animate = () => {
  cursorX += (mouseX - cursorX) * 0.2;  // Easing interpolation
  cursorY += (mouseY - cursorY) * 0.2;
  
  cursor.style.left = cursorX - 10 + 'px';      // Offset to center
  cursor.style.top = cursorY - 10 + 'px';
  
  requestAnimationFrame(animate);  // Loop @ 60fps
};
```

---

## Animation Timeline (Scroll-Based)

```
USER SCROLL POSITION
      ↓
   0vh (Hero Visible)
      ↓
   Frame: 0 (Image 1 - No animation yet)
      ↓
Text Fade In (GSAP 1.5s)
Scroll Indicator Bounce (AOS)
      ↓
═══════════════════════════════════════════════════════════
      ↓
  25vh (Hero Exits, Canvas Enters)
      ↓
  Frame: Start scrolling images at frame 0
      ↓
  0% → 30% of 300vh = 0-90vh
    └─ Frame 0 → 64
       └─ Juice swirl wraps bottle
      ↓
30% → 60% of 300vh = 90vh-180vh
    └─ Frame 64 → 128
       └─ Mango cubes fly in (parallax effect)
      ↓
60% → 100% of 300vh = 180vh-300vh  
    └─ Frame 128 → 192
       └─ Bubbles appear, condensation, label fades
      ↓
═══════════════════════════════════════════════════════════
      ↓
  75vh (ProductGrid Comes Into View)
      ↓
Product Cards Enter (fade in with stagger)
3D Tilt Effects Active (mousemove)
ProductGrid Buttons Interactive
      ↓
User scrolls within ProductGrid
3D Tilt updates on mouse movement
Button hover expands custom cursor
      ↓
100vh (Footer Visible)
      ↓
Page scroll ends
```

---

## Component Communication

### Props Flow (Unidirectional)
```
Layout.js
  ├─ No props needed
  ├─ Provides: SmoothScroll context (via Lenis RAF)
  └─ {children} → Page.js

Page.js
  └─ No props needed
     ├─ Renders: HeroSection
     ├─ Renders: ScrollyCanvas (in 300vh container)
     └─ Renders: ProductGrid

HeroSection
  └─ No props
     └─ Uses GSAP directly (window global)

ScrollyCanvas
  └─ Manages own state (useRef for cache)
     └─ Uses GSAP + ScrollTrigger directly

ProductGrid
  ├─ Local state: products array (const)
  └─ ProductCard (rendered via .map())
      └─ product prop (from products array)
```

### External State (Not React State)

The app uses **non-React state** for performance:

1. **GSAP PlayHead** (ScrollyCanvas)
   - Not a React state
   - Updated directly by GSAP
   - Triggers canvas rerender via `onUpdate`

2. **Mouse Position** (CustomCursor)
   - Not React state
   - Stored in `let` variables
   - Updated @ 60fps without React re-render

3. **Scroll Position** (Lenis)
   - Handled by Lenis library
   - Not React state
   - Automatically synced by ScrollTrigger

**Why?** Performance! Avoiding React re-renders for 60fps updates.

---

## File Dependencies

```
layout.js
├─ imports: SmoothScroll
│   └─ imports: Lenis (node_modules)
├─ imports: CustomCursor
│   └─ (no other imports)
└─ imports: all components (index.js)

page.js
├─ imports: HeroSection
│   ├─ imports: useEffect (React)
│   └─ imports: gsap (node_modules)
├─ imports: ScrollyCanvas
│   ├─ imports: useEffect, useRef (React)
│   ├─ imports: gsap (node_modules)
│   └─ imports: ScrollTrigger from gsap
└─ imports: ProductGrid
    ├─ imports: useEffect, useRef (React)
    └─ (no other libraries)

globals.css
├─ imports: Playfair Display font (Google Fonts)
├─ imports: Space Mono font (Google Fonts)
└─ defines: all utility classes

tailwind.config.js
└─ defines: theme extensions
```

---

## Call Stack for Scroll Animation

```
1. User scrolls mouse wheel
   ↓ (via Lenis smooth scroll)
   
2. Lenis.raf(time) - requestAnimationFrame
   ↓ (every frame ~16.67ms at 60fps)
   
3. ScrollTrigger detects scroll
   ↓ maps scroll position to animation progress
   
4. GSAP updates playhead.frame value
   ↓ (0 → 191 based on scroll position)
   
5. ScrollTrigger.onUpdate() callback
   ↓ (called every frame update)
   
6. drawFrame(ctx, canvas, image)
   ├─ Canvas context calculates layout (cover mode)
   ├─ Clears canvas
   ├─ Draws image to canvas
   └─ Returns (no state update)
   
7. Browser render
   ├─ Canvas pixels updated
   ├─ DOM unchanged
   └─ No React re-render triggered
   
8. Display updated to user
   ↓ (appears as smooth animation)
```

---

## Performance Characteristics

### Memory Usage
```
+ Initial Page Load
  ├─ React: ~0.5MB
  ├─ GSAP: ~0.3MB
  ├─ Lenis: ~0.2MB
  └─ CSS/HTML: ~0.5MB
  ├─ Total: ~1.5MB

+ Image Cache (192 frames @ 1920x1080)
  ├─ Uncompressed: ~1.5GB (never happens - browser loads on demand)
  ├─ WebP: ~50-100MB (typical)
  └─ JPEG: ~80-150MB (typical)

+ Canvas Buffer
  └─ ~8-16MB (single frame in memory)

+ Total Typical: ~100-150MB
```

### CPU/Threading
```
Main Thread (single-threaded JavaScript):
├─ Lenis RAF loop @ ~60fps (~16.67ms per frame)
├─ Mouse move handler (100+ fps possible)
├─ GSAP calculations (sub-ms)
├─ Canvas drawImage() (~1-2ms)
└─ Browser render

No Web Workers used (can be added for optimization)
```

### Network (Image Loading)
```
Preload Phase:
├─ All 192 frames load in parallel (browser limit ~6-8)
├─ Total size: 50-150MB (depending on format)
├─ Typical load time: 5-30 seconds (WiFi)
├─ Show splash screen while loading
└─ Prevent page interaction until ready

Runtime:
└─ No additional network requests (cached)
    ├─ Smooth 60fps animation
    └─ Zero network latency
```

---

## Responsiveness Strategy

```
Desktop (1920x1080+)
├─ Full animation at native resolution
├─ 3-column product grid
├─ Hover effects enabled
└─ Custom cursor visible

Tablet (768-1200px)
├─ Canvas scales proportionally
├─ Animation continues smoothly
├─ 2-column product grid (if adjusted)
└─ Touch-friendly cursor (larger hit areas)

Mobile (< 768px)
├─ Canvas scales 100% width
├─ Animation continues smoothly
├─ 1-column product grid (auto via media query)
├─ Touch-based smooth scroll (Lenis)
├─ Custom cursor disabled (use OS pointer)
└─ 3D tilt disabled on ProductCard (touch not compatible)
```

---

## Key Performance Optimizations

1. **Non-React State for Animation**
   - PlayHead stored outside React
   - Mouse position stored in `let` variables
   - Avoid React re-renders

2. **Image Preloading**
   - All frames loaded before visibility
   - Prevents flicker during scroll
   - Cache hit on every frame

3. **Canvas Rendering**
   - Single canvas (not per-image)
   - Single `drawImage()` call per frame
   - No DOM elements added

4. **CSS over JavaScript Animation**
   - 3D Tilt uses `transform` CSS property
   - No layout reflow
   - GPU-accelerated

5. **Lazy Styling**
   - Tailwind: Only used classes compiled
   - CSS custom properties minimized
   - Gzip compression active

---

## Debugging Tips

### Check Frame Loading
```javascript
// Open DevTools Console
console.log(imagesRef.current.length);  // Should be 192
console.log(imagesRef.current[0]);      // Should show Image object
```

### Monitor Scroll Animation
```javascript
// Add to ScrollyCanvas.onUpdate:
onUpdate: () => {
  console.log(`Frame: ${Math.floor(playhead.frame)}`);
}
```

### Profile Animation Performance
```javascript
// DevTools → Performance tab
// Record while scrolling for 10 seconds
// Look for:
// - JavaScript time (should be <1ms per frame)
// - Rendering time (should be <5ms per frame)
// - Paint time (should be minimal)
```

### Inspect Cursor Trail
```javascript
// DevTools → Elements → Find cursor div
document.querySelector('.cursor');
```

---

This architecture ensures smooth 60fps animation with minimal memory overhead and excellent performance on both desktop and mobile devices.
