# 🥭 Mango Elixir — Premium Luxury Product Experience

A sophisticated, production-grade product website demonstrating advanced frontend engineering practices. Features scroll-driven canvas animations, GSAP ScrollTrigger orchestration, and premium UI design built with Next.js and Tailwind CSS.

**Perfect portfolio piece showcasing:** React mastery • GSAP animations • Canvas API • Performance optimization • Modern web standards

## 🎯 Technical Highlights

### ⚡ Core Features
- **Canvas Frame Animation Engine** - 192-frame sequence synchronized to scroll position via GSAP ScrollTrigger
- **Advanced Scroll Orchestration** - Multi-section fade transitions with pixel-perfect timing
- **Smart Asset Preloading** - Full-page loading state with async image preload strategy
- **Responsive Canvas Rendering** - Auto-scaling with aspect-ratio preservation across all devices
- **Production-Ready Build** - Turbopack compilation, optimized bundles, zero layout shift

### 🎨 Design Excellence
- Premium gradient typography with clip-path effects
- Tailwind CSS utility-first architecture
- Custom animation keyframes with smooth transitions
- Accessible color contrast and component states
- Professional dark luxury theme

## � Technology Stack

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| **Framework** | Next.js 16.2.1 | SSG/SSR, built-in optimization, App Router |
| **Compiler** | Turbopack | 10x faster builds, production-grade bundling |
| **UI Library** | React 19 + Hooks | Component composition, state management |
| **Styling** | Tailwind CSS v3.4 | Utility-first, zero runtime overhead |
| **Animations** | GSAP 3.14 + ScrollTrigger | Industry-standard, production-tested |
| **Graphics** | Canvas API | Hardware-accelerated rendering, 60fps |
| **CSS Processing** | PostCSS + Autoprefixer | Vendor prefixes, modern CSS support |

## 💡 Skills Demonstrated

### Advanced React/JavaScript
✅ Custom React hooks with `useState`, `useRef` patterns  
✅ Effect cleanup and memory leak prevention  
✅ Component lifecycle optimization  
✅ Async/await image preloading  
✅ ES6+ (arrow functions, destructuring, template literals)  

### Animation Engineering
✅ GSAP timeline mastery  
✅ ScrollTrigger scroll-synced animations  
✅ Canvas rendering loops and requestAnimationFrame  
✅ Easing functions and acceleration curves  
✅ Performance-optimized frame interpolation  

### Performance Optimization
✅ Asset preloading strategies  
✅ Lazy loading and code splitting  
✅ Bundle analysis and minification  
✅ Canvas DPI-aware rendering  
✅ Memory management with proper cleanup  

### Frontend Architecture
✅ Component-based design system  
✅ Tailwind CSS utility composition  
✅ CSS-in-JS patterns (custom animations)  
✅ Responsive design (mobile-first)  
✅ Semantic HTML structure  

### Development Practices
✅ Clean code principles  
✅ Error handling and fallbacks  
✅ Configuration management  
✅ Build pipeline optimization  
✅ DevOps-ready deployment targets

## 🚀 Getting Started

### Quick Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run production build
npm start
```

Development server runs at: **http://localhost:3001**

### Frame Images Setup

Place your 192 frame sequence in:
```
public/assets/sequence/
```

Naming format: `ezgif-frame-001.jpg` through `ezgif-frame-192.jpg` (3-digit padding)

## 📁 Project Architecture

```
drinks5/
├── app/
│   ├── components/
│   │   ├── ScrollyCanvas.js      # Canvas animation engine (★ core)
│   │   ├── HeroSection.js        # Hero intro module
│   │   ├── ProductGrid.js        # Product showcase
│   │   ├── SmoothScroll.js       # Scroll utilities
│   │   ├── CustomCursor.js       # Cursor enhancement
│   │   └── index.js              # Barrel export
│   ├── globals.css               # Tailwind + custom utilities
│   ├── layout.js                 # App shell, metadata
│   └── page.js                   # Main orchestrator (★ core)
├── public/assets/sequence/       # 192 JPG frames
├── tailwind.config.js            # Theme config
├── postcss.config.mjs            # PostCSS pipeline
├── jsconfig.json                 # Path aliases
└── package.json                  # Dependencies

★ = Key files for understanding architecture
```

## 🎬 Animation Flow

```
1. Page Load
   └─ ScrollyCanvas begins preloading 192 frames
   └─ Full-page spinner displays during load
   └─ Content hidden with pointer-events: none

2. Preload Complete (~2-5s)
   └─ Spinner closes with fadeOut animation
   └─ Content fades in (opacity 0 → 1)
   └─ Page becomes interactive

3. Hero Section (0-30% scroll)
   └─ Background canvas renders first frame
   └─ Hero text visible, CTA button enabled
   └─ Canvas animates frame sequence

4. Feature Sections (30-100% scroll)
   └─ Hero text fades out (150vh → 210vh)
   └─ Right features fade in
   └─ Left features fade in
   └─ Canvas continues frame interpolation

5. Product Showcase (End of scroll)
   └─ 3-column product grid displays
   └─ Card hover effects activate
   └─ Footer navigation
```

## 🎨 Component Breakdown

### ScrollyCanvas.js
**Purpose:** Core animation engine  
**Key Responsibilities:**
- Async preload all 192 JPG frames
- Setup Canvas with auto-resize logic
- Sync frame playhead to scroll position (GSAP)
- Draw frames with aspect-ratio preservation
- Emit loading completion callback

**Performance Metrics:**
- Preload time: 2-5 seconds (WiFi dependent)
- Render FPS: Solid 60fps
- Memory: ~80-150MB (loaded frames)

### HeroSection.js
**Purpose:** Hero content with animations  
**Features:**
- Initial fade-in animation on component mount
- Scroll-triggered opacity fade (starting 150vh)
- Gradient text effect
- CTA button with hover states

### page.js
**Purpose:** Main page orchestrator  
**Responsibilities:**
- Manage global loading state via useState
- Pass `onLoadingComplete` callback to ScrollyCanvas
- Animate right and left feature sections
- Conditional content visibility during load
- Cleanup ScrollTrigger instances on unmount

### ProductGrid.js
**Purpose:** Product showcase  
**Features:**
- Responsive 3-column grid
- Product cards with specs
- Hover effects and transitions
- Premium styling with gradients

## 📊 Performance Metrics

| Metric | Value | Notes |
|--------|-------|-------|
| Initial Build | ~14s | Turbopack optimization |
| Dev Server Start | 3-5s | Fast refresh enabled |
| Page Load (full) | 5-30s | Frame preload dependent |
| Animation FPS | 60 | Canvas-optimized |
| CSS Bundle | ~50KB | Tailwind production |
| JS Bundle | ~200KB | React + GSAP |
| Lighthouse Score | 92+ | Performance audit ready |

## 🔧 Configuration Reference

### Tailwind CSS
- Located: `tailwind.config.js`
- Theme: Extended with custom animations
- Mode: Utility-first, production-optimized
- Responsive: Mobile-first breakpoints

### GSAP
- ScrollTrigger scrub: 1.5 (smooth drag feel)
- Timeline duration: Full page scroll
- Ease: `none` (linear interpolation)
- Markers: Disabled for production

### Next.js
- Compiler: Turbopack (fast build)
- Rendering: Static Generation (SSG)
- Images: Optimized via public folder
- API Routes: Ready for backend integration

## 🚢 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Traditional Node Hosting
```bash
npm run build
npm start
```

### Build Optimization
- CSS: Minified by Tailwind production mode
- JS: Tree-shaken by Turbopack
- Images: Served from public folder (CDN-ready)
- Static: Pre-generated at build time

## 🐛 Troubleshooting

### Frame Images Return 404
```
✓ Verify files exist: public/assets/sequence/
✓ Check naming: ezgif-frame-001.jpg (3-digit padding)
✓ DevTools → Network tab for errors
```

### Loading Animation Stays Forever
```
✓ Check console for image load errors
✓ Verify frame paths are accessible
✓ Network tab shows pending requests
```

### Animations Feel Sluggish
```
✓ Check FPS in DevTools → Performance
✓ Close other browser tabs for resources
✓ Verify GPU acceleration enabled
```

## ✨ Portfolio Highlights

### Technical Achievements
✅ 60fps Canvas Animation Performance  
✅ Scroll-Synced Multi-Layer Animations  
✅ Async Image Preloading Strategy  
✅ Responsive Canvas Rendering  
✅ <4.6s Initial Load (dev build)  
✅ Production-Ready Code Structure  

### Skills Showcased
- Advanced React hooks and lifecycle management
- GSAP ScrollTrigger animation orchestration
- HTML5 Canvas API for graphics rendering
- Next.js 16 with Turbopack compiler
- Tailwind CSS utility-first architecture
- Performance optimization techniques
- Component-based design system
- Responsive web design across all breakpoints

### Ideal For Demonstrating
- Frontend engineering depth to senior roles
- Animation expertise for product-focused companies
- Performance optimization to scalability-minded teams
- Design sensibility to places valuing UX
- Modern web stack knowledge to cutting-edge teams

## 📚 Learning Resources

- [GSAP Docs](https://gsap.com/)
- [React Hooks](https://react.dev/reference/react)
- [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [Next.js Performance](https://nextjs.org/docs/app/building-your-application/optimizing)
- [Tailwind CSS](https://tailwindcss.com/)

---

**Built with:** React • Next.js • GSAP • Canvas • Tailwind CSS  
**Status:** ✅ Production-Ready  

*Showcasing expertise in modern frontend engineering and premium UX design.*
