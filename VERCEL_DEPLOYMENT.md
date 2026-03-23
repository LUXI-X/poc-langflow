# Vercel Deployment Guide

## Problem
जब आप Vercel पर deploy करते हो, तो Ollama models नहीं मिलते क्योंकि Vercel cloud-based है और localhost:11434 को access नहीं कर सकता।

## Solution

### Option 1: Ollama को Public URL के साथ Expose करें

अगर आपके पास एक server है जहां Ollama चल रहा है:

1. **Vercel Environment Variables में add करें:**
   - Vercel Dashboard → Project Settings → Environment Variables
   - Variable name: `NEXT_PUBLIC_OLLAMA_BASE_URL`
   - Value: `https://your-ollama-server.com` (अपना actual URL डालें)

2. **Redeploy करें:**
   ```bash
   git push
   ```

### Option 2: Ngrok से Tunnel बनाएं (Testing के लिए)

अगर आप locally Ollama चला रहे हो:

1. **Ngrok install करें:**
   ```bash
   # Windows
   choco install ngrok
   
   # Mac
   brew install ngrok
   
   # Linux
   curl https://bin.equinox.io/c/bNyj1mQVY4c/ngrok-v3-stable-linux-amd64.zip -o ngrok.zip
   unzip ngrok.zip
   ```

2. **Ollama के लिए tunnel बनाएं:**
   ```bash
   ngrok http 11434
   ```

3. **Ngrok से मिला URL (जैसे `https://abc123.ngrok.io`) को Vercel में add करें:**
   - `NEXT_PUBLIC_OLLAMA_BASE_URL=https://abc123.ngrok.io`

### Option 3: Docker के साथ Deploy करें

अगर आप Ollama को cloud server पर चलाना चाहते हो:

1. **Server पर Ollama चलाएं:**
   ```bash
   docker run -d -p 11434:11434 ollama/ollama
   ```

2. **Ollama को public करें (Nginx reverse proxy के साथ):**
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       
       location / {
           proxy_pass http://localhost:11434;
       }
   }
   ```

3. **Vercel में environment variable add करें:**
   - `NEXT_PUBLIC_OLLAMA_BASE_URL=https://your-domain.com`

## Local Development

Local development के लिए कोई change नहीं चाहिए। बस `.env.local` में:

```
NEXT_PUBLIC_OLLAMA_BASE_URL=http://localhost:11434
```

## Troubleshooting

### "No Ollama models found" error

1. **Check करें कि Ollama URL सही है:**
   - Settings में "Check Status" button click करें
   - अगर red दिखे तो URL गलत है

2. **Ollama में models install करें:**
   ```bash
   ollama pull llama2
   ollama pull mistral
   ```

3. **CORS issue हो सकता है:**
   - Ollama को CORS के साथ चलाएं:
   ```bash
   OLLAMA_ORIGINS=* ollama serve
   ```

## Best Practices

- Production में sensitive URLs को environment variables में रखें
- Ollama को always HTTPS के साथ expose करें
- Rate limiting add करें अगर public expose कर रहे हो
- Authentication layer add करने पर विचार करें
