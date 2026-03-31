@echo off
REM Mango Elixir - Setup Script
REM This script helps set up image sequences for the project

echo.
echo ========================================
echo   Mango Elixir - Project Setup
echo ========================================
echo.

REM Check if public/assets/sequence directory exists
if not exist "public\assets\sequence\" (
    echo Creating public/assets/sequence directory...
    mkdir public\assets\sequence
    echo Directory created successfully!
) else (
    echo Directory public/assets/sequence already exists.
)

echo.
echo ========================================
echo   NEXT STEPS
echo ========================================
echo.
echo 1. Place your image frames in:
echo    public\assets\sequence\
echo.
echo    Supported formats:
echo    - frame_0001.webp through frame_0150.webp (WebP - Recommended)
echo    - ezgif-frame-001.jpg through ezgif-frame-192.jpg (JPEG - Fallback)
echo.
echo 2. Start the development server:
echo    npm run dev
echo.
echo 3. Open http://localhost:3000 in your browser
echo.

if exist "..\sequences\*.jpg" (
    echo Found potential frame files in parent directory!
    echo Would you like to copy them? (Y/N)
    set /p choice=
    if /i "%choice%"=="Y" (
        echo Copying frames...
        xcopy "..\sequences\*.jpg" "public\assets\sequence\" /Y
        echo Frames copied successfully!
    )
) else (
    echo No frames found in parent directory.
)

echo.
echo Setup complete! Run: npm run dev
echo.
pause
