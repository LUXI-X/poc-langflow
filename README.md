# Langflow Next.js Chat Interface

A modern chat interface built with Next.js that integrates with Langflow components, providing a seamless way to interact with AI agents through a web UI.

## Features

- **Chat Interface**: Clean, responsive chat UI with message bubbles
- **Multiple AI Providers**: Support for OpenAI, Anthropic, Google, and Ollama (local)
- **Local AI with Ollama**: Run AI models locally without sending data to external services
- **Agent Configuration**: Configure AI models, prompts, and output schemas
- **File Attachments**: Support for uploading files with messages
- **Message History**: Persistent chat history with session management
- **Structured Output**: Support for JSON schema validation
- **Export/Import**: Export chat sessions for analysis
- **Real-time Typing**: Typing indicators for better UX

## Components

### ChatInput
- Handles user input with file attachment support
- Mimics the Langflow ChatInput component behavior
- Supports multiline text input and keyboard shortcuts

### ChatOutput  
- Displays messages with proper formatting
- Supports code blocks and JSON formatting
- Copy message functionality
- Typing indicators

### Agent
- Configurable AI agent with multiple provider support
- System prompt customization
- Output schema validation
- Tool integration support

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   Create a `.env.local` file:
   ```env
   NEXT_PUBLIC_LANGFLOW_API_URL=http://localhost:7860/api/v1
   ```

3. **Set up AI Provider:**
   
   **Option A: Use Ollama (Local AI - Recommended)**
   - Install Ollama from https://ollama.ai/download
   - Install a model: `ollama pull llama2`
   - Start Ollama: `ollama serve`
   - See [OLLAMA_SETUP.md](./OLLAMA_SETUP.md) for detailed instructions
   
   **Option B: Use Cloud AI (OpenAI, Anthropic, etc.)**
   - Get an API key from your preferred provider
   - Configure it in the settings after starting the app

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Configuration

### Agent Settings
Click the settings icon to configure:
- **Model Provider**: OpenAI, Anthropic, Google, or Ollama (local)
- **API Key**: Your provider's API key (not needed for Ollama)
- **Ollama Configuration**: Base URL, model selection, temperature
- **System Prompt**: Instructions for the AI agent
- **Output Schema**: Define structured output format
- **Tools**: Enable/disable built-in tools

### API Integration
The interface uses a mock API by default. To integrate with your Langflow instance:

1. Update the `NEXT_PUBLIC_LANGFLOW_API_URL` environment variable
2. Modify the `LangflowAPI` class in `lib/langflow-api.ts`
3. Implement your authentication and endpoint logic

## Project Structure

```
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main chat page
├── components/
│   ├── ChatInput.tsx        # User input component
│   ├── ChatOutput.tsx       # Message display component
│   └── AgentConfig.tsx      # Configuration modal
├── lib/
│   └── langflow-api.ts      # API integration layer
├── types/
│   └── langflow.ts          # TypeScript definitions
└── README.md
```

## API Integration

The `LangflowAPI` class provides methods that mirror the Python Langflow components:

- `processChatInput()` - Handles user input processing
- `processAgentMessage()` - Processes messages through the agent
- `processChatOutput()` - Formats and stores agent responses
- `getChatHistory()` - Retrieves conversation history
- `storeMessage()` - Persists messages

## Customization

### Styling
- Uses Tailwind CSS for styling
- Custom CSS classes in `globals.css`
- Responsive design with mobile support

### Message Formatting
- Automatic code block detection
- JSON syntax highlighting
- Markdown-like formatting support

### File Handling
- Support for text and image files
- File type validation
- Attachment display in messages

## Development

### Mock Mode
By default, the interface runs in mock mode with simulated responses. This allows you to:
- Test the UI without a backend
- Develop and iterate quickly
- Demonstrate functionality

### Production Integration
To connect to a real Langflow instance:
1. Deploy your Langflow application
2. Update the API endpoints in `langflow-api.ts`
3. Implement proper authentication
4. Handle error cases and edge conditions

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Support

For issues and questions:
- Check the GitHub issues
- Review the Langflow documentation
- Join the community discussions