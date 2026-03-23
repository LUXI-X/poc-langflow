#!/bin/bash

# Ollama Tunnel Starter Script
# यह script Ollama के लिए Ngrok tunnel बनाता है

echo "🚀 Starting Ollama Ngrok Tunnel..."
echo ""

# Check करो कि ngrok installed है या नहीं
if ! command -v ngrok &> /dev/null; then
    echo "❌ Ngrok installed नहीं है!"
    echo ""
    echo "Install करने के लिए:"
    echo "  Mac: brew install ngrok"
    echo "  Windows: choco install ngrok"
    echo "  Linux: curl https://bin.equinox.io/c/bNyj1mQVY4c/ngrok-v3-stable-linux-amd64.zip -o ngrok.zip && unzip ngrok.zip && sudo mv ngrok /usr/local/bin"
    exit 1
fi

# Check करो कि Ollama चल रहा है या नहीं
echo "🔍 Checking if Ollama is running..."
if ! curl -s http://localhost:11434/api/tags > /dev/null; then
    echo "❌ Ollama नहीं चल रहा है!"
    echo ""
    echo "Ollama start करने के लिए:"
    echo "  ollama serve"
    exit 1
fi

echo "✅ Ollama is running!"
echo ""
echo "🌐 Starting Ngrok tunnel on port 11434..."
echo ""

# Ngrok tunnel start करो
ngrok http 11434

echo ""
echo "⚠️  Tunnel बंद हो गया!"
echo "अगर फिर से चलाना है तो यह script फिर से run करो।"
