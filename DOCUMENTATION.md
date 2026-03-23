# Langflow Next.js Chat Interface - Complete Documentation

## Table of Contents
1. [What is This Project?](#what-is-this-project)
2. [System Requirements](#system-requirements)
3. [Installation Steps](#installation-steps)
4. [Project Setup](#project-setup)
5. [How to Use](#how-to-use)
6. [Configuration Guide](#configuration-guide)
7. [Features Explained](#features-explained)
8. [Troubleshooting](#troubleshooting)
9. [Project Structure](#project-structure)
10. [API Integration](#api-integration)

---

## What is This Project?

This is a **Chat Application** built with modern web technology. It allows you to:

- Chat with AI models (Artificial Intelligence)
- Use AI models locally on your computer (no internet needed)
- Use cloud-based AI services (OpenAI, Google, Anthropic)
- Configure AI behavior and settings
- Save and view chat history
- Upload files and images

**Simple Explanation**: Think of it as a ChatGPT-like interface that you can run on your own computer or connect to cloud services.

### Key Technologies Used:
- **Next.js**: A web framework for building fast websites
- **React**: A library for building interactive user interfaces
- **TypeScript**: A programming language that helps catch errors
- **Tailwind CSS**: A tool for styling websites
- **Ollama**: Software to run AI models locally

---

## System Requirements

### Minimum Requirements:
- **Operating System**: Windows, macOS, or Linux
- **RAM**: 8 GB (for running AI models locally)
- **Disk Space**: 10 GB free space
- **Node.js**: Version 16 or higher
- **npm**: Version 7 or higher (comes with Node.js)

### Recommended Requirements:
- **RAM**: 16 GB or more
- **Disk Space**: 20 GB or more
- **GPU**: Optional (makes AI faster)
- **Internet**: For downloading dependencies and cloud AI services

### Check Your System:
```bash
# Check Node.js version
node --version

# Check npm version
npm --version
```

If you don't have Node.js installed, download it from: https://nodejs.org/

---

## Installation Steps

### Step 1: Download Node.js

1. Go to https://nodejs.org/
2. Download the **LTS (Long Term Support)** version
3. Run the installer and follow the instructions
4. Restart your computer

### Step 2: Get the Project Files

**Option A: Using Git (if you have Git installed)**
```bash
git clone <repository-url>
cd langflow-nextjs-chat
```

**Option B: Download as ZIP**
1. Click the green "Code" button on GitHub
2. Select "Download ZIP"
3. Extract the ZIP file to your desired location
4. Open a terminal/command prompt in that folder

### Step 3: Install Dependencies

Open a terminal/command prompt in the project folder and run:

```bash
npm install
```

This command downloads and installs all required packages. It may take 2-5 minutes.

**What happens**: npm reads the `package.json` file and installs all listed dependencies.

### Step 4: Create Environment File

Create a new file named `.env.local` in the project root folder:

```bash
# Windows (Command Prompt)
type nul > .env.local

# macOS/Linux (Terminal)
touch .env.local
```

Open `.env.local` in a text editor and add:

```
NEXT_PUBLIC_LANGFLOW_API_URL=http://localhost:7860/api/v1
```

**What this does**: Tells the application where to find the Langflow API.

### Step 5: Install Ollama (Optional but Recommended)

Ollama lets you run AI models locally without internet.

**Windows:**
1. Go to https://ollama.ai/download
2. Download the Windows installer
3. Run the installer
4. Ollama will start automatically

**macOS:**
```bash
curl -fsSL https://ollama.ai/install.sh | sh
```

**Linux:**
```bash
curl -fsSL https://ollama.ai/install.sh | sh
```

### Step 6: Install an AI Model (if using Ollama)

Open a terminal and run:

```bash
# Install Llama 2 (recommended for beginners)
ollama pull llama2

# Or install other models:
ollama pull mistral
ollama pull codellama
ollama pull phi
```

**What this does**: Downloads an AI model to your computer. This may take 5-30 minutes depending on model size and internet speed.

---

## Project Setup

### Starting the Application

1. Open a terminal/command prompt in the project folder
2. Run this command:

```bash
npm run dev
```

3. Wait for the message: `ready - started server on 0.0.0.0:3000`
4. Open your web browser and go to: http://localhost:3000

**What happens**: The development server starts and your application is ready to use.

### Stopping the Application

Press `Ctrl + C` in the terminal to stop the server.

### Building for Production

When you're ready to deploy:

```bash
npm run build
npm start
```

This creates an optimized version of your application.

---

## How to Use

### Basic Chat Usage

1. **Open the Application**: Go to http://localhost:3000 in your browser
2. **Type a Message**: Click in the text box at the bottom and type your question
3. **Send Message**: Press Enter or click the Send button
4. **Wait for Response**: The AI will process and respond
5. **Continue Chatting**: Type your next message

### Configuring AI Settings

1. **Click the Settings Icon**: Look for the gear/settings icon (⚙️) in the top right
2. **Choose AI Provider**:
   - **Ollama (Local)**: Uses AI on your computer (free, private)
   - **OpenAI**: Uses ChatGPT (requires API key)
   - **Anthropic**: Uses Claude (requires API key)
   - **Google**: Uses Bard (requires API key)

3. **For Ollama**:
   - Base URL: `http://localhost:11434` (default)
   - Select a model from the dropdown
   - Adjust temperature (0 = focused, 2 = creative)

4. **For Cloud Services**:
   - Paste your API key
   - Select model options

5. **Click Save Configuration**

### Uploading Files

1. Click the attachment icon (📎) in the chat input
2. Select a file from your computer
3. The file will be attached to your message
4. Send the message

### Viewing Chat History

- All messages are saved automatically
- Scroll up to see previous messages
- Messages are stored in your browser's local storage

---

## Configuration Guide

### Agent Instructions (System Prompt)

This tells the AI how to behave. Examples:

**For a helpful assistant:**
```
You are a helpful assistant. Answer questions clearly and concisely.
```

**For a code expert:**
```
You are an expert programmer. Help with coding questions and provide code examples.
```

**For a creative writer:**
```
You are a creative writer. Help with story ideas and writing suggestions.
```

### Temperature Setting

- **0 (Focused)**: AI gives consistent, predictable answers
- **0.7 (Balanced)**: Good mix of consistency and creativity (default)
- **1.5+ (Creative)**: AI gives varied, creative answers

### Max Output Tokens

Controls how long the AI's response can be:
- **256**: Short responses
- **1024**: Medium responses
- **2048**: Long responses (default)

### Chat History Messages

How many previous messages to remember:
- **10**: Only recent messages
- **100**: Full conversation (default)
- **500**: Very long conversations

---

## Features Explained

### 1. Multiple AI Providers

**Ollama (Local)**
- Runs on your computer
- No internet needed
- Free
- Private (data stays on your machine)
- Slower than cloud services

**OpenAI**
- Uses ChatGPT
- Fast and powerful
- Requires API key and payment
- Data sent to OpenAI servers

**Anthropic**
- Uses Claude
- Very capable
- Requires API key and payment
- Data sent to Anthropic servers

**Google**
- Uses Bard
- Good for research
- Requires API key and payment
- Data sent to Google servers

### 2. Output Schema

Define the format of AI responses. Example:

```json
{
  "name": "Response Format",
  "fields": [
    {
      "name": "answer",
      "type": "string",
      "description": "The main answer"
    },
    {
      "name": "confidence",
      "type": "float",
      "description": "How confident (0-1)"
    }
  ]
}
```

### 3. File Attachments

Upload files with your messages:
- Text files (.txt)
- Images (.jpg, .png)
- Documents (.pdf, .docx)

### 4. Message Formatting

The chat supports:
- **Code blocks**: Automatically highlighted
- **JSON**: Pretty-printed
- **Links**: Clickable
- **Bold/Italic**: Markdown formatting

### 5. Typing Indicators

Shows when the AI is thinking and generating a response.

---

## Troubleshooting

### Problem: "npm: command not found"

**Solution**: Node.js is not installed or not in your PATH
1. Download Node.js from https://nodejs.org/
2. Install it
3. Restart your terminal
4. Try again

### Problem: "Port 3000 already in use"

**Solution**: Another application is using port 3000
```bash
# Windows
netstat -ano | findstr :3000

# macOS/Linux
lsof -i :3000
```

Then kill the process or use a different port:
```bash
npm run dev -- -p 3001
```

### Problem: "Ollama is not running"

**Solution**:
1. Make sure Ollama is installed
2. Start Ollama:
   - Windows: Ollama should start automatically
   - macOS/Linux: Run `ollama serve` in terminal
3. Check if it's running: Visit http://localhost:11434 in browser

### Problem: "No models found in Ollama"

**Solution**:
1. Install a model: `ollama pull llama2`
2. Wait for download to complete
3. Refresh the settings page
4. Select the model from dropdown

### Problem: "API Key not working"

**Solution**:
1. Check if API key is correct
2. Make sure you copied the entire key
3. Check if the key has expired
4. Generate a new key from your provider's website

### Problem: "Application is very slow"

**Solution**:
1. Close other applications to free up RAM
2. Use a smaller AI model
3. Reduce chat history messages
4. Restart Ollama or your computer

### Problem: "Messages not saving"

**Solution**:
1. Check browser's local storage is enabled
2. Clear browser cache and try again
3. Try a different browser
4. Check if you have enough disk space

### Problem: "Can't connect to Langflow API"

**Solution**:
1. Check if Langflow is running
2. Verify the API URL in `.env.local`
3. Check firewall settings
4. Try accessing the URL in your browser

---

## Project Structure

```
langflow-nextjs-chat/
│
├── app/                          # Main application folder
│   ├── globals.css              # Global styles for entire app
│   ├── layout.tsx               # Main layout template
│   └── page.tsx                 # Home page (chat interface)
│
├── components/                   # Reusable UI components
│   ├── ChatInput.tsx            # Text input box for user messages
│   ├── ChatOutput.tsx           # Display area for messages
│   └── AgentConfig.tsx          # Settings/configuration modal
│
├── lib/                          # Utility functions and API
│   └── langflow-api.ts          # API communication code
│
├── types/                        # TypeScript type definitions
│   └── langflow.ts              # Data structure definitions
│
├── public/                       # Static files (images, icons)
│
├── .env.local                   # Environment variables (create this)
├── package.json                 # Project dependencies
├── tsconfig.json                # TypeScript configuration
├── tailwind.config.js           # Tailwind CSS configuration
├── next.config.js               # Next.js configuration
└── README.md                    # Quick start guide

```

### File Descriptions

**app/page.tsx**: Main chat page
- Manages chat state
- Handles message sending/receiving
- Displays chat interface

**components/ChatInput.tsx**: User input component
- Text input field
- File upload button
- Send button
- Keyboard shortcuts

**components/ChatOutput.tsx**: Message display
- Shows user and AI messages
- Formats code blocks
- Displays typing indicator
- Copy message button

**components/AgentConfig.tsx**: Settings modal
- AI provider selection
- API key input
- Model configuration
- System prompt editor
- Output schema builder

**lib/langflow-api.ts**: API communication
- Sends messages to AI
- Receives responses
- Handles errors
- Manages chat history

**types/langflow.ts**: Data definitions
- Message interface
- Agent configuration interface
- API response types

---

## API Integration

### How It Works

1. **User sends message** → ChatInput component
2. **Message sent to API** → langflow-api.ts
3. **API processes message** → Ollama or cloud service
4. **Response received** → ChatOutput component
5. **Message displayed** → User sees response

### API Methods

**processChatInput(message)**
- Takes user message
- Returns processed input

**processAgentMessage(message)**
- Sends to AI model
- Returns AI response

**getChatHistory()**
- Retrieves all previous messages
- Returns array of messages

**storeMessage(message)**
- Saves message to storage
- Persists chat history

### Connecting to Your Own API

1. Update `.env.local`:
```
NEXT_PUBLIC_LANGFLOW_API_URL=your-api-url
```

2. Modify `lib/langflow-api.ts`:
```typescript
// Change the API endpoint
const API_URL = process.env.NEXT_PUBLIC_LANGFLOW_API_URL;

// Add authentication if needed
const headers = {
  'Authorization': `Bearer ${your-token}`,
  'Content-Type': 'application/json'
};
```

3. Test the connection:
- Open browser console (F12)
- Check for any error messages
- Verify API is responding

---

## Common Tasks

### Task 1: Change AI Model

1. Click settings icon (⚙️)
2. Select "Ollama (Local)"
3. Click "Refresh Models" button
4. Select model from dropdown
5. Click "Save Configuration"

### Task 2: Adjust AI Creativity

1. Click settings icon (⚙️)
2. Find "Temperature" slider
3. Move left for focused answers
4. Move right for creative answers
5. Click "Save Configuration"

### Task 3: Clear Chat History

1. Open browser developer tools (F12)
2. Go to Application tab
3. Find Local Storage
4. Delete the chat history entry
5. Refresh the page

### Task 4: Export Chat

1. Select all messages (Ctrl+A)
2. Copy (Ctrl+C)
3. Paste into text editor
4. Save as .txt file

### Task 5: Use Different AI Provider

1. Click settings icon (⚙️)
2. Select "OpenAI" (or other provider)
3. Paste your API key
4. Select model
5. Click "Save Configuration"

---

## Performance Tips

### For Faster Responses

1. Use smaller AI models (phi, mistral)
2. Reduce chat history messages
3. Close other applications
4. Use GPU if available
5. Restart Ollama periodically

### For Better Answers

1. Use larger AI models (llama2:13b)
2. Adjust temperature to 0.7
3. Write clear, detailed questions
4. Provide context in your prompts
5. Use system prompt to guide AI

### For Lower Resource Usage

1. Use cloud AI (no local processing)
2. Use smaller models
3. Limit chat history
4. Close browser tabs
5. Restart application

---

## Security Notes

### Local AI (Ollama)
- ✅ Data stays on your computer
- ✅ No internet required
- ✅ Completely private
- ✅ Free to use

### Cloud AI (OpenAI, Google, etc.)
- ⚠️ Data sent to company servers
- ⚠️ Internet required
- ⚠️ Costs money
- ⚠️ Check privacy policies

### Best Practices

1. Never share API keys publicly
2. Keep `.env.local` file private
3. Don't commit `.env.local` to Git
4. Use strong passwords for accounts
5. Review privacy policies
6. Keep software updated

---

## Getting Help

### Resources

- **Next.js Docs**: https://nextjs.org/docs
- **React Docs**: https://react.dev
- **Ollama Docs**: https://ollama.ai
- **Tailwind CSS**: https://tailwindcss.com
- **TypeScript**: https://www.typescriptlang.org

### Common Questions

**Q: Can I use this without internet?**
A: Yes, if you use Ollama. Cloud AI requires internet.

**Q: Is my data private?**
A: Yes, with Ollama. Cloud AI sends data to their servers.

**Q: Can I run this on a server?**
A: Yes, deploy to Vercel, Netlify, or your own server.

**Q: How do I add new features?**
A: Modify the components and API files, then test.

**Q: Can I use this commercially?**
A: Check the license file for terms.

---

## Conclusion

This documentation covers everything you need to:
- Install the application
- Set up your environment
- Use the chat interface
- Configure AI settings
- Troubleshoot problems
- Understand the code structure

For more help, check the README.md file or visit the project repository.

**Happy chatting!** 🚀

