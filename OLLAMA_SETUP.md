# Ollama Setup Guide

This guide will help you set up Ollama to work with your Langflow Chat Interface.

## What is Ollama?

Ollama is a tool that lets you run large language models locally on your machine. This means you can use AI models without sending your data to external services.

## Installation

### Windows
1. Download Ollama from: https://ollama.ai/download
2. Run the installer
3. Ollama will start automatically

### macOS
```bash
curl -fsSL https://ollama.ai/install.sh | sh
```

### Linux
```bash
curl -fsSL https://ollama.ai/install.sh | sh
```

## Starting Ollama

### Windows
Ollama starts automatically after installation. If you need to start it manually:
```cmd
ollama serve
```

### macOS/Linux
```bash
ollama serve
```

## Installing Models

After Ollama is running, you can install models:

### Popular Models
```bash
# Llama 2 (7B) - Good balance of speed and quality
ollama pull llama2

# Llama 2 (13B) - Better quality, slower
ollama pull llama2:13b

# Code Llama - Specialized for coding
ollama pull codellama

# Mistral - Fast and efficient
ollama pull mistral

# Phi-2 - Small but capable
ollama pull phi
```

### List Available Models
```bash
ollama list
```

### Remove Models
```bash
ollama rm model-name
```

## Configuration in Chat Interface

1. Open the chat interface
2. Click the settings (⚙️) icon
3. Select "Ollama (Local)" as Model Provider
4. Configure:
   - **Ollama Base URL**: `http://localhost:11434` (default)
   - **Ollama Model**: Select from your installed models
   - **Temperature**: 0.7 (adjust for creativity)

## Troubleshooting

### Ollama Not Running
If you see "❌ Ollama is not running":
1. Make sure Ollama is installed
2. Start Ollama: `ollama serve`
3. Check if port 11434 is available

### No Models Found
If no models appear in the dropdown:
1. Install a model: `ollama pull llama2`
2. Refresh the models list in settings
3. Make sure Ollama is running

### Connection Issues
If you get connection errors:
1. Check Ollama is running on the correct port
2. Try accessing http://localhost:11434 in your browser
3. Check firewall settings

### Performance Tips
- Use smaller models (7B) for faster responses
- Use larger models (13B+) for better quality
- Adjust temperature: lower = more focused, higher = more creative
- Close other applications to free up RAM

## Model Recommendations

### For General Chat
- **llama2**: Best overall balance
- **mistral**: Fast and efficient

### For Coding
- **codellama**: Specialized for programming
- **llama2**: Also good for code

### For Creative Writing
- **llama2:13b**: Better creativity with larger model
- Set temperature to 0.8-1.0

### For Fast Responses
- **phi**: Small but capable
- **mistral**: Good speed/quality balance

## System Requirements

### Minimum
- 8GB RAM
- 4GB free disk space

### Recommended
- 16GB+ RAM
- 8GB+ free disk space
- GPU (optional, for faster inference)

## Security Notes

- Ollama runs locally - your data stays on your machine
- No internet connection required after model download
- Models are stored in your local Ollama directory
- You have full control over your data and models