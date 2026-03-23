# Local Ollama को Vercel पर Use करने के लिए Setup

## समस्या
- Local में Ollama चल रहा है (localhost:11434)
- Vercel पर deploy करने के बाद Ollama access नहीं हो रहा
- Vercel cloud-based है, localhost को access नहीं कर सकता

## समाधान: Ngrok से Tunnel बनाएं

### Step 1: Ngrok Install करें

**Windows (Chocolatey के साथ):**
```bash
choco install ngrok
```

**Windows (Manual):**
1. https://ngrok.com/download से download करो
2. Extract करो
3. Command prompt में जाओ और ngrok folder में जाओ

**Mac:**
```bash
brew install ngrok
```

**Linux:**
```bash
curl https://bin.equinox.io/c/bNyj1mQVY4c/ngrok-v3-stable-linux-amd64.zip -o ngrok.zip
unzip ngrok.zip
sudo mv ngrok /usr/local/bin
```

### Step 2: Ngrok Account बनाओ (Free)

1. https://ngrok.com पर जाओ
2. Sign up करो (free account)
3. Dashboard में जाओ
4. Authtoken copy करो

### Step 3: Ngrok को Configure करो

```bash
ngrok config add-authtoken YOUR_AUTH_TOKEN_HERE
```

### Step 4: Ollama के लिए Tunnel बनाओ

```bash
ngrok http 11434
```

Output कुछ ऐसा दिखेगा:
```
ngrok                                                       (Ctrl+C to quit)

Session Status                online
Account                       your-email@gmail.com (Plan: Free)
Version                       3.3.0
Region                        India (in)
Forwarding                    https://abc123def456.ngrok.io -> http://localhost:11434
```

**`https://abc123def456.ngrok.io` को copy करो** - यह तुम्हारा public Ollama URL है!

### Step 5: Vercel में Environment Variable add करो

1. Vercel Dashboard खोलो
2. अपना project select करो
3. Settings → Environment Variables
4. नया variable add करो:
   - **Name:** `NEXT_PUBLIC_OLLAMA_BASE_URL`
   - **Value:** `https://abc123def456.ngrok.io` (अपना ngrok URL डालो)
5. Save करो

### Step 6: Redeploy करो

```bash
git push
```

या Vercel Dashboard से manually redeploy करो।

## अब काम करेगा!

अब Vercel पर deploy किया हुआ app तुम्हारे local Ollama को access कर सकेगा।

## Important Notes

⚠️ **Ngrok URL हर बार बदलता है जब तुम tunnel restart करो**

अगर tunnel restart हो जाए तो:
1. नया URL copy करो
2. Vercel में environment variable update करो
3. Redeploy करो

### Permanent Solution के लिए:

अगर तुम हमेशा के लिए चाहते हो, तो:

**Option A: Ngrok Pro (Paid)**
- Static domain मिलेगा जो कभी नहीं बदलेगा
- $5/month से शुरू

**Option B: Cloud Server पर Ollama Deploy करो**
- AWS EC2, DigitalOcean, या Linode पर Ollama चलाओ
- Permanent URL मिलेगा
- 24/7 available रहेगा

**Option C: Local Machine को Server बनाओ**
- Port forwarding करो router में
- Static IP setup करो
- Domain name point करो

## Testing

Vercel पर deploy करने के बाद:
1. Settings खोलो
2. "Check Status" button click करो
3. अगर green दिखे तो ✅ काम कर रहा है
4. "Auto-Select" button से model select करो

## Troubleshooting

### "Ollama is not running" error
- Check करो कि local में Ollama चल रहा है
- Ngrok tunnel चल रहा है
- URL सही है

### Models नहीं दिख रहे
```bash
# Local में check करो
ollama list

# अगर कोई model नहीं है तो install करो
ollama pull llama2
ollama pull mistral
```

### CORS Error
Ollama को CORS के साथ start करो:
```bash
OLLAMA_ORIGINS=* ollama serve
```

## Local Development

Local development के लिए कोई change नहीं चाहिए:
- `.env.local` में `NEXT_PUBLIC_OLLAMA_BASE_URL=http://localhost:11434` रखो
- Local में Ollama चलाओ
- `npm run dev` करो
- काम करेगा!
