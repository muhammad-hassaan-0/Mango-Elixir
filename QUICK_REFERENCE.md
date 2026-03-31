# 🥭 Mango Elixir - Quick Reference Card

## ⚡ Get Started in 3 Steps

### Step 1: Add Your Image Frames
```cmd
REM Copy your 192 image frames to:
REM public\assets\sequence\

REM Supported formats:
REM - frame_0001.webp through frame_0150.webp (recommended)
REM - ezgif-frame-001.jpg through ezgif-frame-192.jpg (fallback)

xcopy "C:\your\frames\*.jpg" "public\assets\sequence\" /Y
```

### Step 2: Start Dev Server
```cmd
cd d:\frontend-projects\drinks5
npm run dev
```

### Step 3: Open in Browser
```
http://localhost:3000
```

---

## 📋 What Was Built

### 5 Custom React Components
1. **SmoothScroll** - Lenis momentum scrolling wrapper
2. **CustomCursor** - Interactive orange cursor
3. **ScrollyCanvas** - GSAP + Canvas image sequence engine
4. **HeroSection** - Hero section with animations
5. **ProductGrid** - 3-column product showcase with 3D tilt

### 3 Global Configurations
1. **globals.css** - Premium styling & animations
2. **tailwind.config.js** - Theme customization
3. **layout.js** - Root wrapper with providers

### Complete Page Structure
1. **Hero Section** - "The Gold Standard" title + CTA
2. **300vh Sticky Canvas** - Image sequence animation
3. **Product Boutique** - 3 products with glassmorphism
4. **Footer** - Copyright info

---

## 🎯 Key Features

| Feature | Technology | File |
|---------|-----------|------|
| Scroll Animation | GSAP ScrollTrigger | ScrollyCanvas.js |
| Smooth Scroll | Lenis | SmoothScroll.js |
| Image Playback | HTML5 Canvas | ScrollyCanvas.js |
| Custom Cursor | Vanilla JS | CustomCursor.js |
| 3D Tilt | CSS Transform | ProductGrid.js |
| Styling | Tailwind CSS | globals.css |
| Typography | Google Fonts | globals.css |

---

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| **README.md** | Project overview |
| **IMPLEMENTATION_GUIDE.md** | Complete step-by-step guide (50+ pages) |
| **ARCHITECTURE.md** | Technical architecture & diagrams |
| **SETUP.md** | Quick setup instructions |
| **CMD_COMMANDS.md** | All Windows cmd commands |
| **QUICK_REFERENCE.md** | This file |

---

## 🔧 Common Commands

```cmd
# Start development
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Check dependencies
npm list

# Clear cache and reinstall
npm cache clean --force
npm ci

# Copy image frames
xcopy "source\*.jpg" "public\assets\sequence\" /Y

# Check frame count
dir /b public\assets\sequence\ | find /c /v ""
```

---

## 🎨 Customization Hotspots

### Adjust Animation Speed
**File**: `app/components/ScrollyCanvas.js` (line ~111)
```javascript
scrub: 1.5  // 1.0 = faster, 2.0 = slower, 1.5 = default
```

### Change Products
**File**: `app/components/ProductGrid.js` (line ~7)
```javascript
const products = [
  { name: 'Your Product', ... }
];
```

### Modify Hero Text
**File**: `app/components/HeroSection.js` (line ~28)
```javascript
<h1>Your Text Here</h1>
```

### Update Colors
**File**: `tailwind.config.js` (line ~15)
```javascript
colors: {
  orange: {
    400: '#ff9f1c',  // Change this
  }
}
```

---

## 📊 Performance Specs

| Metric | Value |
|--------|-------|
| Frames | 192 |
| Resolution | 1920x1080 |
| Frame Size | 50-150MB (WebP) |
| Load Time | 5-30s (WiFi) |
| Animation FPS | 60fps |
| Memory Usage | 100-150MB |
| CSS Framework | Tailwind 4 |
| React Version | 19.2.4 |
| Next.js Version | 16.2.1 |

---

## 🐛 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| Images not showing | Check `public/assets/sequence/` folder |
| Scroll feels jerky | Reduce scrub value to 1.0 |
| Cursor not visible | Verify in browser DevTools |
| Build fails | Run `npm ci` to reinstall |
| Port 3000 busy | Use `npm run dev -- --port 3001` |

---

## 🚀 Deployment

### Vercel (Recommended)
```cmd
npm install -g vercel
vercel
```

### Traditional Server
```cmd
npm run build
npm start
```

### Docker
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY . .
RUN npm install && npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

---

## 📦 Dependencies

```
next@16.2.1
react@19.2.4
react-dom@19.2.4
gsap@3.14.2 (ScrollTrigger)
lenis@1.3.21
tailwindcss@4
framer-motion@12.38.0
```

---

## 💡 Pro Tips

1. **Use WebP format** for images (smaller file size)
2. **Preload frames** before showing page
3. **Test on real device** not just browser emulator
4. **Monitor Network tab** during frame loading
5. **Use DevTools Performance** tab to profile animation
6. **Keep frame count under 200** for performance

---

## 🎬 Page Scroll Map

```
0vh     ├─ Hero Section
        │  ├─ Title animation
        │  ├─ Scroll indicator
        │  └─ CTA button
        │
25vh    ├─ Canvas Sticky Area (300vh tall)
        │  ├─ Frame 0-64: Juice swirl
        │  ├─ Frame 64-128: Mango cubes
        │  └─ Frame 128-192: Bubbles & label
        │
75vh    ├─ Product Boutique
        │  ├─ Original Gold
        │  ├─ Midnight Mango
        │  └─ Habanero Heat
        │
95vh+   └─ Footer
```

---

## 🎯 Next Steps

1. ✅ Add image frames to `public/assets/sequence/`
2. ✅ Run `npm run dev`
3. ✅ Open http://localhost:3000
4. ✅ Test scroll animation
5. ✅ Customize colors/text if needed
6. ✅ Build & deploy

---

## 📞 Resource Links

- [IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md) - Detailed guide
- [ARCHITECTURE.md](./ARCHITECTURE.md) - Technical docs
- [GSAP Docs](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)
- [Lenis Docs](https://lenis.darkroom.engineering/)
- [Tailwind CSS](https://tailwindcss.com/)

---

**Start Here:**
```cmd
npm run dev
```

Open: http://localhost:3000

Enjoy your premium scrollytelling experience! 🚀
