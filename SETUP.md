# Mango Elixir - Premium Scrollytelling Experience

A high-end, immersive landing page for "Mango Elixir" featuring GSAP ScrollTrigger animations, Lenis smooth scrolling, and canvas-based image sequence playback.

## Quick Start

### 1. Install Dependencies
All dependencies are already installed. If you need to reinstall:
```cmd
npm install
```

### 2. Setup Image Sequences
The project expects image frames in `/public/assets/sequence/`. The ScrollyCanvas component automatically tries to load:
- **Primary format**: `frame_0001.webp` through `frame_0150.webp` (WebP format)
- **Fallback format**: `ezgif-frame-001.jpg` through `ezgif-frame-192.jpg` (JPEG format)

**To add your image sequences:**

If you have JPG frames, copy them to:
```
public/assets/sequence/
```

If you have WebP frames, place them with the naming pattern:
```
frame_0001.webp, frame_0002.webp, ... frame_0150.webp
```

**Convert JPG to WebP (optional but recommended for performance):**
```cmd
REM Using ImageMagick (if installed):
for /r "public/assets/sequence" %i in (*.jpg) do convert "%i" "%~ni.webp"

REM Or use ffmpeg:
for /r "public/assets/sequence" %i in (*.jpg) do ffmpeg -i "%i" "%~ni.webp"
```

### 3. Run Development Server
```cmd
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
drinks5/
├── app/
│   ├── components/
│   │   ├── SmoothScroll.js      # Lenis smooth scroll wrapper
│   │   ├── CustomCursor.js      # Interactive custom cursor
│   │   ├── ScrollyCanvas.js     # GSAP + Canvas image sequence
│   │   ├── HeroSection.js       # Hero "Hush" section
│   │   ├── ProductGrid.js       # Product boutique with 3D tilt
│   │   └── index.js             # Component exports
│   ├── globals.css              # Global styling & animations
│   ├── layout.js                # Root layout with providers
│   └── page.js                  # Main page assembling all sections
├── public/
│   └── assets/
│       └── sequence/            # Place image frames here
├── tailwind.config.js           # Tailwind configuration
├── next.config.mjs              # Next.js configuration
└── package.json
```

## Features

### 1. Hero Section ("The Hush")
- Minimalist typography with Playfair Display serif font
- Gradient text effect
- Smooth scroll indicator
- Premium gradient background

### 2. Sticky Canvas Assembly
- **300vh scroll trigger** for immersive experience
- Image sequence playback synchronized with scroll
- **GSAP ScrollTrigger** with 1.5-2 scrub value for "viscous" feel
- **Canvas rendering** with aspect ratio preservation (cover mode)
- Preloads all frames before display to prevent flickering

### 3. Product Boutique Grid
- 3-column responsive grid (1-column on mobile)
- **Glassmorphism** cards with blur effect
- **3D Tilt hover** effect using mouse position
- Premium product specifications in Space Mono monospace font
- Product highlights:
  - Original Gold (flagship pure mango)
  - Midnight Mango (dark berry blend)
  - Habanero Heat (spicy kick)

### 4. Premium Polish
- **Custom Cursor**: Orange dot expanding to ring on hover
- **Smooth Scrolling**: Lenis momentum scrolling
- **Typography Mix**: Playfair Display for elegance, Space Mono for tech
- **Dark Theme**: Gradient backgrounds and glassmorphism effects

## Technology Stack

- **Framework**: Next.js 15+ (App Router)
- **Styling**: Tailwind CSS
- **Animation**: GSAP + ScrollTrigger
- **Smooth Scroll**: Lenis
- **Canvas**: HTML5 Canvas API
- **Language**: JavaScript (no TypeScript)

## Dependencies

```json
{
  "next": "^15+",
  "react": "^19+",
  "react-dom": "^19+",
  "gsap": "^3.12+",
  "lenis": "^1.0+",
  "tailwindcss": "^4+",
  "tailwindcss/postcss": "^1+"
}
```

## Customization

### Modify Product Data
Edit `/app/components/ProductGrid.js` - Update the `products` array

### Adjust Animation Timing
- **ScrollTrigger Scrub**: Edit `ScrollyCanvas.js` line with `scrub: 1.5`
- **Scroll Duration**: Edit `SmoothScroll.js` duration value

### Change Colors
Update gradients in:
- `globals.css`: Color variables and utilities
- `tailwind.config.js`: Extend theme colors
- Component files: Inline Tailwind classes

### Customize Fonts
Edit `globals.css` @import Google Fonts section or `tailwind.config.js` fontFamily theme

## Performance Notes

1. **Image Optimization**: WebP format is preferred (smaller file size)
2. **Preloading**: All frames load before page visibility to eliminate flicker
3. **Canvas Rendering**: Maintains 60fps scroll performance
4. **Memory**: ~192-200MB for 192 frames at 1920x1080 resolution

## Browser Support

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support (requires iOS 15+ for backdrop-filter)
- Mobile: ✅ Works with touch scroll

## Development Commands

```cmd
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Analyze bundle
npm run build -- --analyze
```

## Troubleshooting

### Images not loading?
1. Check frame files are in `/public/assets/sequence/`
2. Verify file naming matches expected pattern
3. Check browser console for 404 errors

### Scrolling feels jerky?
1. Ensure all frames are preloaded (check network tab)
2. Reduce `scrub` value for faster response
3. Disable other CSS animations temporarily

### Custom cursor not showing?
1. Verify `CustomCursor` component is rendered in layout
2. Check z-index values in globals.css
3. Ensure mouse events aren't prevented by other elements

## Additional Resources

- [GSAP ScrollTrigger Docs](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)
- [Lenis Documentation](https://lenis.darkroom.engineering/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Next.js App Router](https://nextjs.org/docs/app)

## License

Built as a premium demo experience. Customize and extend for your needs.
