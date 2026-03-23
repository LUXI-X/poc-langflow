'use client';

import React from 'react';
import { Message } from '@/types/langflow';
import { Bot, User, Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface ChatOutputProps {
  message: Message;
  isTyping?: boolean;
}

export default function ChatOutput({ message, isTyping = false }: ChatOutputProps) {
  const [copied, setCopied] = useState(false);
  const isUser = message.sender === 'user';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const formatMessage = (text: string) => {
    // Handle JSON code blocks
    if (text.includes('```json')) {
      return (
        <div className="space-y-2">
          {text.split('```json').map((part, index) => {
            if (index === 0) {
              return part ? <p key={index}>{part}</p> : null;
            }
            
            const [jsonPart, ...restParts] = part.split('```');
            return (
              <div key={index}>
                <pre className="bg-gray-800 text-green-400 p-3 rounded-md overflow-x-auto text-sm">
                  <code>{jsonPart}</code>
                </pre>
                {restParts.length > 0 && <p>{restParts.join('```')}</p>}
              </div>
            );
          })}
        </div>
      );
    }

    // Handle regular code blocks
    if (text.includes('```')) {
      return (
        <div className="space-y-2">
          {text.split('```').map((part, index) => {
            if (index % 2 === 0) {
              return part ? <p key={index} className="whitespace-pre-wrap">{part}</p> : null;
            }
            return (
              <pre key={index} className="bg-gray-800 text-white p-3 rounded-md overflow-x-auto text-sm">
                <code>{part}</code>
              </pre>
            );
          })}
        </div>
      );
    }

    return <p className="whitespace-pre-wrap">{text}</p>;
  };

  if (isTyping) {
    return (
      <div className="flex items-start gap-3 mb-4">
        <div className="flex-shrink-0 w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
          <Bot size={16} className="text-gray-600" />
        </div>
        <div className="message-bubble ai-message p-3 rounded-lg">
          <div className="typing-indicator">
            <div className="typing-dot"></div>
            <div className="typing-dot"></div>
            <div className="typing-dot"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-start gap-3 mb-4 ${isUser ? 'flex-row-reverse' : ''}`}>
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
        isUser ? 'bg-blue-500' : 'bg-gray-200'
      }`}>
        {isUser ? (
          <User size={16} className="text-white" />
        ) : (
          <Bot size={16} className="text-gray-600" />
        )}
      </div>
      
      <div className={`message-bubble p-3 rounded-lg relative group ${
        isUser ? 'user-message' : 'ai-message'
      }`}>
        {formatMessage(message.text)}
        
        {/* Copy button */}
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-black/10 rounded"
          title="Copy message"
        >
          {copied ? (
            <Check size={14} className={isUser ? 'text-white' : 'text-gray-600'} />
          ) : (
            <Copy size={14} className={isUser ? 'text-white' : 'text-gray-600'} />
          )}
        </button>

        {/* Message metadata */}
        {message.timestamp && (
          <div className={`text-xs mt-2 opacity-70 ${
            isUser ? 'text-white' : 'text-gray-500'
          }`}>
            {new Date(message.timestamp).toLocaleTimeString()}
          </div>
        )}

        {/* File attachments */}
        {message.files && message.files.length > 0 && (
          <div className="mt-2 space-y-1">
            {message.files.map((file, index) => (
              <div
                key={index}
                className={`text-xs px-2 py-1 rounded ${
                  isUser ? 'bg-white/20' : 'bg-gray-200'
                }`}
              >
                📎 {file.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}