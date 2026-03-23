#!/bin/bash

echo "🚀 Setting up Langflow Next.js Chat Interface..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "📦 Installing dependencies..."
npm install

echo "🔧 Creating environment file..."
if [ ! -f .env.local ]; then
    cp .env.local.example .env.local
    echo "✅ Created .env.local file. Please update it with your API configuration."
else
    echo "⚠️  .env.local already exists. Skipping..."
fi

echo "🎉 Setup complete!"
echo ""
echo "To start the development server:"
echo "  npm run dev"
echo ""
echo "Then open http://localhost:3000 in your browser."
echo ""
echo "Don't forget to:"
echo "1. Update your API key in the settings (gear icon)"
echo "2. Configure your Langflow API URL in .env.local if needed"