# N8N Chat Assistant Integration

## Overview

यह project अब एक beautiful AI Chat Assistant popup के साथ आता है जो N8N के साथ integrate है।

## Features

✨ **Beautiful UI**
- Modern gradient design
- Smooth animations
- Responsive layout
- Dark mode support

🤖 **AI Powered**
- N8N workflow integration
- Real-time streaming responses
- Session management
- Message history

⚡ **Performance**
- Lazy loading
- Optimized bundle size
- Fast initialization

## Setup

### 1. N8N Webhook URL

अपना N8N workflow का webhook URL यहाँ add करो:

**File:** `app/page.tsx`

```tsx
<N8nChatAssistant
  webhookUrl="YOUR_N8N_WEBHOOK_URL"
  isOpen={showN8nChat}
  onClose={() => setShowN8nChat(false)}
/>
```

Default URL:
```
https://luci1111.app.n8n.cloud/webhook/7711bfb2-b409-4207-995c-6275599b46df/chat
```

### 2. N8N Workflow Setup

अपने N8N workflow में ये steps follow करो:

1. **Chat Trigger Node** add करो
2. **Allowed Origins** में अपना domain add करो (CORS के लिए)
3. **Streaming response** enable करो (optional लेकिन recommended)
4. Workflow को **Active** करो

### 3. Environment Variables

`.env.local` में add करो (optional):

```env
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://your-webhook-url
```

फिर component में use करो:

```tsx
<N8nChatAssistant
  webhookUrl={process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL}
  isOpen={showN8nChat}
/>
```

## Usage

### Basic Usage

```tsx
import N8nChatAssistant from '@/components/N8nChatAssistant';

export default function App() {
  const [showChat, setShowChat] = useState(false);

  return (
    <>
      <button onClick={() => setShowChat(!showChat)}>
        Open Chat
      </button>
      
      <N8nChatAssistant
        webhookUrl="YOUR_WEBHOOK_URL"
        isOpen={showChat}
        onClose={() => setShowChat(false)}
      />
    </>
  );
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `webhookUrl` | string | N8N webhook URL | N8N workflow का webhook URL |
| `isOpen` | boolean | true | Chat window को show/hide करने के लिए |
| `onClose` | function | - | Chat close होने पर callback |

## Customization

### Theme Colors

`components/N8nChatAssistant.tsx` में CSS variables को modify करो:

```css
.n8n-chat-container {
  --chat-primary-color: #3b82f6;      /* Primary blue */
  --chat-secondary-color: #1e40af;    /* Dark blue */
  --chat-accent-color: #10b981;       /* Green */
  --chat-text-color: #1f2937;         /* Dark gray */
  --chat-bg-color: #ffffff;           /* White */
  --chat-border-color: #e5e7eb;       /* Light gray */
}
```

### Welcome Messages

Component में `initialMessages` को customize करो:

```tsx
initialMessages: [
  'Hi there! 👋',
  'I am your AI Assistant. How can I help you today?'
],
```

### Input Placeholder

```tsx
i18n: {
  en: {
    inputPlaceholder: 'Type your question here...',
    title: 'AI Assistant 🤖',
    subtitle: 'Get instant help from our AI. Available 24/7',
  },
},
```

## Styling

### Custom CSS

अपनी custom styling add करने के लिए:

```css
/* Override default styles */
.n8n-chat-button {
  background: linear-gradient(135deg, #your-color-1 0%, #your-color-2 100%);
}

.n8n-chat-window {
  border-radius: 20px; /* More rounded */
}
```

### Responsive Design

Mobile पर automatically responsive है:
- Desktop: 400px width, 600px height
- Mobile: Full screen

## Features

### Session Management
- Previous chat sessions को automatically load करता है
- Chat history को browser में store करता है

### Streaming Responses
- Real-time message streaming
- Better user experience

### Metadata
- Source tracking
- Timestamp logging
- Custom metadata support

## Troubleshooting

### Chat नहीं दिख रहा है

1. Check करो कि `isOpen={true}` है
2. Webhook URL सही है
3. N8N workflow active है
4. CORS properly configured है

### Messages नहीं भेज रहे हैं

1. N8N webhook URL verify करो
2. Network tab में check करो
3. N8N logs देखो
4. CORS errors check करो

### Styling issues

1. CSS properly load हो रहा है check करो
2. Browser cache clear करो
3. DevTools में inspect करो

## Performance Tips

1. **Lazy Load करो:**
```tsx
const N8nChatAssistant = dynamic(
  () => import('@/components/N8nChatAssistant'),
  { ssr: false }
);
```

2. **Conditional Rendering:**
```tsx
{showChat && <N8nChatAssistant {...props} />}
```

3. **Optimize Bundle:**
```bash
npm run build
# Check bundle size
```

## Security

⚠️ **Important:**

1. Webhook URL को environment variable में रखो
2. CORS properly configure करो
3. Rate limiting add करो
4. Input validation करो

## Browser Support

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- IE11: ❌ Not supported

## License

MIT

## Support

Issues या questions के लिए:
1. N8N documentation check करो
2. @n8n/chat package docs देखो
3. GitHub issues create करो
