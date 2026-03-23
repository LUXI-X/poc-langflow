'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Settings, Trash2, Download } from 'lucide-react';
import ChatInput from '@/components/ChatInput';
import ChatOutput from '@/components/ChatOutput';
import AgentConfig from '@/components/AgentConfig';
import N8nChatAssistant from '@/components/N8nChatAssistant';
import LangflowAPI from '@/lib/langflow-api';
import { Message, AgentConfig as AgentConfigType, ChatInputProps } from '@/types/langflow';

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const [contextId] = useState('default');
  const [showN8nChat, setShowN8nChat] = useState(true);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const langflowAPI = useRef(new LangflowAPI());

  const [agentConfig, setAgentConfig] = useState<AgentConfigType>({
    agent_llm: 'Ollama',
    api_key: '',
    system_prompt: 'You are a helpful assistant that can use tools to answer questions and perform tasks.',
    context_id: contextId,
    n_messages: 100,
    add_current_date_tool: true,
    output_schema: [],
    ollama_model: '',
    ollama_base_url: process.env.NEXT_PUBLIC_OLLAMA_BASE_URL || 'http://localhost:11434',
    temperature: 0.7
  });

  // Load chat history on component mount
  useEffect(() => {
    loadChatHistory();
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const loadChatHistory = async () => {
    try {
      const history = await langflowAPI.current.getChatHistory(sessionId, contextId);
      setMessages(history);
    } catch (error) {
      console.error('Error loading chat history:', error);
    }
  };

  const handleSendMessage = async (inputData: ChatInputProps) => {
    try {
      setIsLoading(true);

      // Process user input through ChatInput component
      const userMessage = await langflowAPI.current.processChatInput(inputData);
      setMessages((prev: Message[]) => [...prev, userMessage]);

      // Add typing indicator
      const typingMessage: Message = {
        id: 'typing',
        text: '',
        sender: 'ai',
        sender_name: 'Assistant',
        session_id: sessionId,
        context_id: contextId,
        timestamp: new Date()
      };
      setMessages((prev: Message[]) => [...prev, typingMessage]);

      // Process message through Agent component
      const agentResponse = await langflowAPI.current.processAgentMessage(userMessage, agentConfig);

      // Remove typing indicator
      setMessages((prev: Message[]) => prev.filter((msg: Message) => msg.id !== 'typing'));

      if (agentResponse.error) {
        throw new Error(agentResponse.error);
      }

      // Process agent response through ChatOutput component
      const aiMessage = await langflowAPI.current.processChatOutput(
        agentResponse.content,
        {
          should_store_message: true,
          sender: 'ai',
          sender_name: 'Assistant',
          session_id: sessionId,
          context_id: contextId,
          data_template: '{text}',
          clean_data: true
        }
      );

      setMessages((prev: Message[]) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Remove typing indicator on error
      setMessages((prev: Message[]) => prev.filter((msg: Message) => msg.id !== 'typing'));
      
      // Add error message
      const errorMessage: Message = {
        id: `error_${Date.now()}`,
        text: `Error: ${error instanceof Error ? error.message : 'Something went wrong'}`,
        sender: 'ai',
        sender_name: 'System',
        session_id: sessionId,
        context_id: contextId,
        timestamp: new Date()
      };
      setMessages((prev: Message[]) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfigChange = (newConfig: AgentConfigType) => {
    setAgentConfig(newConfig);
    langflowAPI.current.setApiKey(newConfig.api_key);
  };

  const autoSelectOllamaModel = async () => {
    try {
      const models = await langflowAPI.current.getOllamaModels(agentConfig.ollama_base_url);
      if (models.length > 0) {
        const updatedConfig = {
          ...agentConfig,
          ollama_model: models[0]
        };
        setAgentConfig(updatedConfig);
      } else {
        alert('No Ollama models found. Please install a model first.');
      }
    } catch (error) {
      console.error('Failed to auto-select model:', error);
      alert('Failed to connect to Ollama. Make sure it is running.');
    }
  };

  const clearChat = async () => {
    try {
      await langflowAPI.current.clearChatHistory(sessionId);
      setMessages([]);
    } catch (error) {
      console.error('Error clearing chat:', error);
    }
  };

  const exportChat = () => {
    const chatData = {
      sessionId,
      contextId,
      messages: messages.map((msg: Message) => ({
        ...msg,
        timestamp: msg.timestamp?.toISOString()
      })),
      agentConfig: {
        ...agentConfig,
        api_key: '[REDACTED]' // Don't export API key
      }
    };

    const blob = new Blob([JSON.stringify(chatData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chat-export-${sessionId}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-4 py-3 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-800">Langflow Chat Interface</h1>
          <p className="text-sm text-gray-500">Session: {sessionId.slice(-8)}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowN8nChat(!showN8nChat)}
            className={`p-2 rounded-lg transition-colors ${
              showN8nChat
                ? 'text-blue-600 bg-blue-100'
                : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
            }`}
            title="AI Assistant"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
            </svg>
          </button>
          <button
            onClick={exportChat}
            className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
            title="Export Chat"
          >
            <Download size={20} />
          </button>
          <button
            onClick={clearChat}
            className="p-2 text-gray-600 hover:text-red-600 hover:bg-gray-100 rounded-lg transition-colors"
            title="Clear Chat"
          >
            <Trash2 size={20} />
          </button>
          <button
            onClick={() => setIsConfigOpen(true)}
            className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
            title="Agent Settings"
          >
            <Settings size={20} />
          </button>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 mt-8">
            <p className="text-lg mb-2">Welcome to Langflow Chat!</p>
            <p className="text-sm">Start a conversation by typing a message below.</p>
            {!agentConfig.api_key && agentConfig.agent_llm !== 'Ollama' && (
              <p className="text-sm text-orange-600 mt-2">
                ⚠️ Please configure your API key in settings to enable AI responses.
              </p>
            )}
            {agentConfig.agent_llm === 'Ollama' && !agentConfig.ollama_model && (
              <div className="text-sm text-orange-600 mt-4 p-3 bg-orange-50 rounded-lg inline-block">
                <p className="mb-2">⚠️ Please select an Ollama model to enable AI responses.</p>
                <button
                  onClick={autoSelectOllamaModel}
                  className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 text-sm font-medium"
                >
                  Auto-Select Model
                </button>
              </div>
            )}
          </div>
        ) : (
          messages.map((message: Message) => (
            <ChatOutput
              key={message.id}
              message={message}
              isTyping={message.id === 'typing'}
            />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input */}
      <ChatInput
        onSendMessage={handleSendMessage}
        disabled={isLoading}
        sessionId={sessionId}
        contextId={contextId}
        placeholder={
          agentConfig.agent_llm === 'Ollama' 
            ? (!agentConfig.ollama_model ? "Select Ollama model in settings first..." : "Type your message...")
            : (!agentConfig.api_key ? "Configure API key in settings first..." : "Type your message...")
        }
      />

      {/* Agent Configuration Modal */}
      <AgentConfig
        config={agentConfig}
        onConfigChange={handleConfigChange}
        isOpen={isConfigOpen}
        onClose={() => setIsConfigOpen(false)}
      />

      {/* N8n Chat Assistant */}
      <N8nChatAssistant
        webhookUrl="https://luci1111.app.n8n.cloud/webhook/7711bfb2-b409-4207-995c-6275599b46df/chat"
        isOpen={showN8nChat}
        onClose={() => setShowN8nChat(false)}
      />
    </div>
  );
}