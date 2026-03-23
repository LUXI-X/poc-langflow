@echo off
echo 🚀 Setting up Langflow Next.js Chat Interface...

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    pause
    exit /b 1
)

REM Check if npm is installed
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm is not installed. Please install npm first.
    pause
    exit /b 1
)

echo 📦 Installing dependencies...
npm install

echo 🔧 Creating environment file...
if not exist .env.local (
    copy .env.local.example .env.local
    echo ✅ Created .env.local file. Please update it with your API configuration.
) else (
    echo ⚠️  .env.local already exists. Skipping...
)

echo.
echo 🎉 Setup complete!
echo.
echo To start the development server:
echo   npm run dev
echo.
echo Then open http://localhost:3000 in your browser.
echo.
echo Don't forget to:
echo 1. Update your API key in the settings (gear icon)
echo 2. Configure your Langflow API URL in .env.local if needed
echo.
pause