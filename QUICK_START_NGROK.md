# Quick Start: Local Ollama को Vercel पर Use करो

## 5 मिनट में Setup करो

### 1️⃣ Ngrok Install करो (2 मिनट)

**Windows:**
```bash
choco install ngrok
```

**Mac:**
```bash
brew install ngrok
```

### 2️⃣ Ngrok Account बनाओ (1 मिनट)

1. https://ngrok.com पर जाओ
2. Sign up करो (free)
3. Authtoken copy करो

### 3️⃣ Ngrok Configure करो (30 सेकंड)

```bash
ngrok config add-authtoken YOUR_TOKEN_HERE
```

### 4️⃣ Tunnel Start करो (30 सेकंड)

**Windows:**
```bash
start-ollama-tunnel.bat
```

**Mac/Linux:**
```bash
bash start-ollama-tunnel.sh
```

या manually:
```bash
ngrok http 11434
```

### 5️⃣ URL को Vercel में Add करो (1 मिनट)

1. Ngrok से मिला URL copy करो (जैसे `https://abc123.ngrok.io`)
2. Vercel Dashboard खोलो
3. Settings → Environment Variables
4. Add करो:
   - Name: `NEXT_PUBLIC_OLLAMA_BASE_URL`
   - Value: `https://abc123.ngrok.io`
5. Save करो

### 6️⃣ Redeploy करो

```bash
git push
```

## ✅ Done!

अब Vercel पर deploy किया हुआ app तुम्हारे local Ollama को access कर सकेगा।

## Testing

1. Vercel पर जाओ
2. Settings खोलो
3. "Check Status" click करो
4. Green दिखे तो ✅ काम कर रहा है

## ⚠️ Important

- Ngrok URL हर बार बदलता है जब tunnel restart हो
- Tunnel बंद करने से पहले Vercel में URL update करो
- Local में Ollama हमेशा चलता रहना चाहिए

## Models Install करो

अगर कोई model नहीं है:

```bash
ollama pull llama2
ollama pull mistral
ollama pull neural-chat
```

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Ngrok नहीं मिल रहा | `choco install ngrok` या `brew install ngrok` |
| Ollama नहीं चल रहा | `ollama serve` run करो |
| Models नहीं दिख रहे | `ollama pull llama2` से model install करो |
| "Ollama is not running" | Ngrok URL सही है? Vercel में update किया? |

## Next Steps

- **Permanent Solution:** Cloud server पर Ollama deploy करो
- **Pro Ngrok:** Static domain के लिए Ngrok Pro ($5/month)
- **Self-Hosted:** अपना server setup करो
