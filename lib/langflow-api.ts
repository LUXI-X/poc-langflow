import axios from 'axios';
import { Message, AgentConfig, AgentResponse, ChatInputProps } from '@/types/langflow';

// Mock API base URL - replace with your actual Langflow API endpoint
const API_BASE_URL = typeof window !== 'undefined' 
  ? process.env.NEXT_PUBLIC_LANGFLOW_API_URL || 'http://localhost:7860/api/v1'
  : 'http://localhost:7860/api/v1';

class LangflowAPI {
  private apiKey: string;
  private baseURL: string;

  constructor(apiKey: string = '', baseURL: string = API_BASE_URL) {
    this.apiKey = apiKey;
    this.baseURL = baseURL;
  }

  setApiKey(apiKey: string) {
    this.apiKey = apiKey;
  }

  // Simulate ChatInput component behavior
  async processChatInput(input: ChatInputProps): Promise<Message> {
    try {
      // In a real implementation, this would call your Langflow API
      // For now, we'll create a message object similar to the Python component
      
      const message: Message = {
        id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        text: input.input_value,
        sender: input.sender,
        sender_name: input.sender_name,
        session_id: input.session_id,
        context_id: input.context_id,
        timestamp: new Date(),
        files: input.files,
        properties: {
          source: {
            id: 'chat_input',
            display_name: 'Chat Input',
            source: 'user_input'
          }
        }
      };

      // Store message if needed (implement your storage logic here)
      if (input.should_store_message) {
        await this.storeMessage(message);
      }

      return message;
    } catch (error) {
      console.error('Error processing chat input:', error);
      throw error;
    }
  }

  // Simulate Agent component behavior
  async processAgentMessage(
    message: Message, 
    config: AgentConfig
  ): Promise<AgentResponse> {
    try {
      // Check if using Ollama
      if (config.agent_llm === 'Ollama' && config.ollama_model) {
        return await this.processOllamaMessage(message, config);
      }

      // This would be your actual API call to Langflow
      const response = await axios.post(`${this.baseURL}/agent/process`, {
        message: message.text,
        config: {
          agent_llm: config.agent_llm,
          system_prompt: config.system_prompt,
          session_id: message.session_id,
          context_id: message.context_id,
          max_output_tokens: config.max_output_tokens,
          n_messages: config.n_messages,
          add_current_date_tool: config.add_current_date_tool,
          output_schema: config.output_schema
        }
      }, {
        headers: {
          'Authorization': `Bearer ${config.api_key}`,
          'Content-Type': 'application/json'
        }
      });

      return {
        content: response.data.content,
        structured_output: response.data.structured_output,
        error: response.data.error
      };
    } catch (error) {
      console.error('Error processing agent message:', error);
      
      // Mock response for development
      return this.getMockAgentResponse(message.text, config);
    }
  }

  // Process message using Ollama
  private async processOllamaMessage(
    message: Message,
    config: AgentConfig
  ): Promise<AgentResponse> {
    try {
      const ollamaUrl = config.ollama_base_url || 'http://localhost:11434';
      
      const response = await axios.post(`${ollamaUrl}/api/generate`, {
        model: config.ollama_model,
        prompt: `${config.system_prompt}\n\nUser: ${message.text}\nAssistant:`,
        stream: false,
        options: {
          temperature: config.temperature || 0.7,
          num_predict: config.max_output_tokens || 2048
        }
      });

      let content = response.data.response;
      let structured_output = null;

      // Handle structured output if schema is defined
      if (config.output_schema && config.output_schema.length > 0) {
        try {
          // Try to extract JSON from the response
          const jsonMatch = content.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            structured_output = JSON.parse(jsonMatch[0]);
          }
        } catch (e) {
          console.warn('Could not parse structured output from Ollama response');
        }
      }

      return {
        content,
        structured_output,
        error: undefined
      };
    } catch (error) {
      console.error('Error calling Ollama:', error);
      
      if (axios.isAxiosError(error) && error.code === 'ECONNREFUSED') {
        return {
          content: '',
          structured_output: null,
          error: 'Ollama server is not running. Please start Ollama first with: ollama serve'
        };
      }
      
      return {
        content: '',
        structured_output: null,
        error: `Ollama error: ${error instanceof Error ? error.message : 'Unknown error'}`
      };
    }
  }

  // Mock agent response for development/testing
  private getMockAgentResponse(input: string, config: AgentConfig): AgentResponse {
    const responses = [
      "I understand your question. Let me help you with that.",
      "Based on your input, here's what I can tell you...",
      "That's an interesting point. Here's my analysis:",
      "I can help you with that. Let me break it down:",
      "Here's a comprehensive response to your query:"
    ];

    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    
    let content = `${randomResponse}\n\n${input}`;
    
    // Add structured output if schema is defined
    let structured_output: any = null;
    if (config.output_schema && config.output_schema.length > 0) {
      structured_output = {};
      config.output_schema.forEach(field => {
        switch (field.type) {
          case 'str':
            structured_output[field.name] = field.multiple ? ['sample', 'values'] : 'sample value';
            break;
          case 'int':
            structured_output[field.name] = field.multiple ? [1, 2, 3] : 42;
            break;
          case 'float':
            structured_output[field.name] = field.multiple ? [1.1, 2.2] : 3.14;
            break;
          case 'bool':
            structured_output[field.name] = field.multiple ? [true, false] : true;
            break;
          case 'dict':
            structured_output[field.name] = field.multiple ? [{ key: 'value' }] : { key: 'value' };
            break;
        }
      });
      
      content += '\n\n```json\n' + JSON.stringify(structured_output, null, 2) + '\n```';
    }

    return {
      content,
      structured_output,
      error: undefined
    };
  }

  // Simulate ChatOutput component behavior
  async processChatOutput(
    input: Message | string,
    config: {
      should_store_message: boolean;
      sender: 'user' | 'ai';
      sender_name: string;
      session_id: string;
      context_id?: string;
      data_template: string;
      clean_data: boolean;
    }
  ): Promise<Message> {
    try {
      let text: string;
      
      if (typeof input === 'string') {
        text = input;
      } else {
        text = input.text;
      }

      const message: Message = {
        id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        text,
        sender: config.sender,
        sender_name: config.sender_name,
        session_id: config.session_id,
        context_id: config.context_id,
        timestamp: new Date(),
        properties: {
          source: {
            id: 'chat_output',
            display_name: 'Chat Output',
            source: 'agent_response'
          }
        }
      };

      // Store message if needed
      if (config.should_store_message) {
        await this.storeMessage(message);
      }

      return message;
    } catch (error) {
      console.error('Error processing chat output:', error);
      throw error;
    }
  }

  // Store message (implement your storage logic)
  private async storeMessage(message: Message): Promise<void> {
    try {
      // This would store the message in your database/storage system
      console.log('Storing message:', message);
      
      // For now, we'll just store in localStorage for demo purposes
      const stored = localStorage.getItem(`chat_${message.session_id}`) || '[]';
      const messages = JSON.parse(stored);
      messages.push(message);
      localStorage.setItem(`chat_${message.session_id}`, JSON.stringify(messages));
    } catch (error) {
      console.error('Error storing message:', error);
    }
  }

  // Retrieve chat history
  async getChatHistory(sessionId: string, contextId?: string): Promise<Message[]> {
    try {
      // This would retrieve from your database/storage system
      const stored = localStorage.getItem(`chat_${sessionId}`) || '[]';
      let messages = JSON.parse(stored);
      
      // Filter by context_id if provided
      if (contextId) {
        messages = messages.filter((msg: Message) => msg.context_id === contextId);
      }
      
      return messages.map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      }));
    } catch (error) {
      console.error('Error retrieving chat history:', error);
      return [];
    }
  }

  // Clear chat history
  async clearChatHistory(sessionId: string): Promise<void> {
    try {
      localStorage.removeItem(`chat_${sessionId}`);
    } catch (error) {
      console.error('Error clearing chat history:', error);
    }
  }

  // Get available Ollama models
  async getOllamaModels(baseUrl: string = 'http://localhost:11434'): Promise<string[]> {
    try {
      const response = await axios.get(`${baseUrl}/api/tags`);
      return response.data.models?.map((model: any) => model.name) || [];
    } catch (error) {
      console.error('Error fetching Ollama models:', error);
      return [];
    }
  }

  // Check if Ollama is running
  async checkOllamaStatus(baseUrl: string = 'http://localhost:11434'): Promise<boolean> {
    try {
      await axios.get(`${baseUrl}/api/tags`);
      return true;
    } catch (error) {
      return false;
    }
  }
}

export default LangflowAPI;