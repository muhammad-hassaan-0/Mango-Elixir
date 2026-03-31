# Windows Command Prompt (cmd) - Complete Setup Commands

All commands are Windows Command Prompt (cmd) compatible. Copy and paste directly.

## Quick Start (All-in-One)

```cmd
@REM Navigate to project
cd d:\frontend-projects\drinks5

@REM Install all dependencies
npm install

@REM Start development server
npm run dev
```

Open browser to: http://localhost:3000

---

## Step-by-Step Setup

### Step 1: Navigate to Project Directory
```cmd
cd d:\frontend-projects\drinks5
```

### Step 2: Install Dependencies (Already Done)
```cmd
@REM Core dependencies
npm install next react react-dom

@REM Animation libraries
npm install gsap lenis framer-motion

@REM Styling
npm install -D tailwindcss postcss autoprefixer
```

### Step 3: Verify Installation
```cmd
npm list
npm list gsap
npm list lenis
```

### Step 4: Setup Image Frames Directory
```cmd
@REM Create directories (already exists)
mkdir public\assets\sequence

@REM Copy frames from external location (example)
xcopy "C:\your-frames\*.jpg" "public\assets\sequence\" /Y
xcopy "C:\your-frames\*.webp" "public\assets\sequence\" /Y
```

### Step 5: Convert JPG to WebP (Optional)
```cmd
@REM Using ImageMagick (must be installed first)
for /r "public\assets\sequence" %i in (*.jpg) do convert "%i" "%~ni.webp"

@REM Or using ffmpeg (must be installed first)
for /r "public\assets\sequence" %i in (*.jpg) do ffmpeg -i "%i" "%~ni.webp"
```

### Step 6: Start Development Server
```cmd
npm run dev
```

Expected output:
```
▲ Next.js 16.2.1
- Local:        http://localhost:3000
```

Open: http://localhost:3000

---

## Build Commands

### Build for Production
```cmd
npm run build
```

### Start Production Server
```cmd
npm start
```

### Clean Build (Delete cache and rebuild)
```cmd
rmdir /s /q .next
npm run build
npm start
```

---

## Useful Development Commands

### Check Node/NPM Versions
```cmd
node --version
npm --version
```

### List Installed Packages
```cmd
npm list
npm list --depth=0
```

### Check for Outdated Packages
```cmd
npm outdated
```

### Update Packages
```cmd
npm update
npm update gsap
npm update lenis
```

### Clear Node Modules and Reinstall
```cmd
rmdir /s /q node_modules
del package-lock.json
npm install
```

### Check Project Structure
```cmd
tree /f
dir /s /b
Get-ChildItem -Recurse -Name
```

---

## File and Folder Management

### Create Directories
```cmd
mkdir public\assets\sequence
mkdir app\components
```

### Copy Files
```cmd
@REM Copy single file
copy "source\file.jpg" "dest\file.jpg"

@REM Copy all files with filter
xcopy "source\*.jpg" "dest\" /Y

@REM Copy directory recursively
xcopy "source\*" "dest\" /E /Y

@REM Copy files and keep directory structure
robocopy "source" "dest" /E
```

### Move/Rename Files
```cmd
move "old-name.js" "new-name.js"
move "source\file.js" "dest\file.js"
ren "old-name.js" "new-name.js"
```

### Delete Files/Folders
```cmd
@REM Delete file
del "filename.js"

@REM Delete folder and contents
rmdir /s /q "foldername"

@REM Delete all files with pattern
del "public\assets\sequence\*.jpg"
```

### List Directory Contents
```cmd
dir
dir /s /b
dir /s /b *.js
tree
```

---

## Image Processing Commands

### Copy Sequence Frames from Backup (if exists)
```cmd
@REM Check if backup exists first
if exist "sequences_backup\*.jpg" (
  xcopy "sequences_backup\*.jpg" "public\assets\sequence\" /Y
) else (
  echo Backup not found. Place frames manually in public\assets\sequence\
)
```

### Rename JPG Files to Sequential Pattern
```cmd
@REM Rename to frame_XXXX format
setlocal enabledelayedexpansion
set /a counter=1
for %%i in (public\assets\sequence\*.jpg) do (
  set /a num=1000+!counter!
  set num=!num:~-4!
  ren "%%i" "frame_!num!.jpg"
  set /a counter+=1
)
```

### Check Frame Count
```cmd
@REM Count JPG files
dir /b "public\assets\sequence\*.jpg" | find /c /v ""

@REM Count WebP files
dir /b "public\assets\sequence\*.webp" | find /c /v ""

@REM List all frame files
dir /b "public\assets\sequence\"
```

---

## Port Management

### Check What's Using Port 3000
```cmd
netstat -ano | findstr :3000
```

### Kill Process on Port 3000 (if needed)
```cmd
taskkill /pid XXXX /f
```

### Use Different Port
```cmd
npm run dev -- --port 3001
```

### Open Browser to Localhost
```cmd
start http://localhost:3000
```

---

## Troubleshooting Commands

### Check Node Modules Integrity
```cmd
npm ci
```

### Validate Package Integrity
```cmd
npm audit
npm audit fix
```

### Clear npm Cache
```cmd
npm cache clean --force
```

### Reinstall from Scratch
```cmd
rmdir /s /q node_modules
del package-lock.json
npm install
```

### Check if Port is Accessible
```cmd
curl http://localhost:3000
powershell -Command "(New-Object Net.WebClient).DownloadString('http://localhost:3000')" 2>nul | head -c 100
```

### View Project Size
```cmd
dir /s
du -sh .
```

### Find Large Files
```cmd
dir /s *.webp | sort /r +4
```

---

## Git Commands (Optional)

### Initialize Git
```cmd
git init
git add .
git commit -m "Initial commit - Mango Elixir setup"
```

### Check Git Status
```cmd
git status
git log --oneline
```

### Create Branch
```cmd
git checkout -b feature/image-optimization
```

---

## Environment & Configuration

### Check Environment Variables
```cmd
set PATH
set NODE_ENV
echo %NODE_ENV%
```

### Set Environment Variables (Temporary)
```cmd
set NODE_ENV=production
npm run build
set NODE_ENV=development
```

### Create .env.local File
```cmd
echo NEXT_PUBLIC_API_URL=http://localhost:3000 > .env.local
type .env.local
```

---

## Performance & Monitoring

### Check CPU and Memory Usage
```cmd
tasklist | findstr node
wmic process list brief
```

### Monitor npm Script
```cmd
npm run dev 2>&1 | find "Compiled client"
```

### Check Build Time
```cmd
@setlocal enabledelayedexpansion
@for /f "delims=." %%a in ('powershell -Command "Get-Date -Format yyyy-MM-dd_HH-mm-ss"') do @set datetime=%%a
npm run build
echo Build completed at !datetime!
```

---

## Common Workflows

### Full Project Setup from Scratch
```cmd
cd d:\frontend-projects\drinks5
rmdir /s /q .next node_modules
del package-lock.json
npm cache clean --force
npm install
mkdir public\assets\sequence
echo Place image frames in public\assets\sequence\
npm run dev
```

### Add New Component
```cmd
@REM Create component file
echo. > app\components\NewComponent.js

@REM Start editor
code app\components\NewComponent.js
```

### Build and Deploy
```cmd
npm run build
npm start
```

### Reset to Clean State
```cmd
git clean -fd
git reset --hard HEAD
npm install
npm run dev
```

---

## Tips & Best Practices

1. **Always commit before running cleanup commands:**
   ```cmd
   git add .
   git commit -m "Save current state before cleanup"
   ```

2. **Use development mode while designing:**
   ```cmd
   npm run dev
   ```

3. **Switch to production for deployment:**
   ```cmd
   npm run build
   npm start
   ```

4. **Keep frame files optimized:**
   - Use WebP format (best)
   - Resize to appropriate dimensions
   - Use quality: 80-85 for compression

5. **Monitor Performance:**
   - Open DevTools (F12)
   - Check Network tab for load times
   - Use Lighthouse tab for audit

---

## Quick Reference Card

```cmd
@REM Navigate and start
cd d:\frontend-projects\drinks5
npm run dev

@REM Check status
npm list
npm audit

@REM Manage frames
dir public\assets\sequence\
xcopy "source\*.jpg" "public\assets\sequence\" /Y

@REM Build
npm run build
npm start

@REM Clean and rebuild
rmdir /s /q .next && npm run dev

@REM Troubleshoot
npm cache clean --force
npm ci
npm audit fix
```

---

## Need Help?

- **IMPLEMENTATION_GUIDE.md** - Full detailed guide
- **SETUP.md** - Quick start instructions  
- **app/components/** - Component source code with comments
- **package.json** - All installed dependencies

Happy building! 🥭✨
