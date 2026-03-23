@echo off
REM Ollama Tunnel Starter Script for Windows

echo.
echo 🚀 Starting Ollama Ngrok Tunnel...
echo.

REM Check करो कि ngrok installed है या नहीं
where ngrok >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Ngrok installed नहीं है!
    echo.
    echo Install करने के लिए:
    echo   choco install ngrok
    echo.
    echo या https://ngrok.com/download से download करो
    pause
    exit /b 1
)

REM Check करो कि Ollama चल रहा है या नहीं
echo 🔍 Checking if Ollama is running...
curl -s http://localhost:11434/api/tags >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Ollama नहीं चल रहा है!
    echo.
    echo Ollama start करने के लिए:
    echo   ollama serve
    echo.
    pause
    exit /b 1
)

echo ✅ Ollama is running!
echo.
echo 🌐 Starting Ngrok tunnel on port 11434...
echo.
echo ⚠️  Ngrok URL को copy करो और Vercel में add करो!
echo.

REM Ngrok tunnel start करो
ngrok http 11434

echo.
echo ⚠️  Tunnel बंद हो गया!
echo अगर फिर से चलाना है तो यह script फिर से run करो।
pause
