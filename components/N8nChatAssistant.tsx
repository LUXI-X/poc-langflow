'use client';

import React, { useEffect } from 'react';

interface N8nChatAssistantProps {
  webhookUrl?: string;
  isOpen?: boolean;
  onClose?: () => void;
}

export default function N8nChatAssistant({
  webhookUrl = 'https://luci1111.app.n8n.cloud/webhook/7711bfb2-b409-4207-995c-6275599b46df/chat',
  isOpen = true,
  onClose
}: N8nChatAssistantProps) {
  useEffect(() => {
    if (!isOpen) return;

    // Load CSS
    const link = document.createElement('link');
    link.href = 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/style.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // Load and execute script
    const script = document.createElement('script');
    script.type = 'module';
    script.textContent = `
      import { createChat } from 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js';
      
      createChat({
        webhookUrl: '${webhookUrl}',
        target: '#n8n-chat-container',
        mode: 'window',
        chatInputKey: 'chatInput',
        chatSessionKey: 'sessionId',
        loadPreviousSession: true,
        showWelcomeScreen: true,
        defaultLanguage: 'en',
        initialMessages: [
          'Hi there! 👋',
          'I am your Luci AI Assistant.  How can I help you today?'
        ],
        i18n: {
          en: {
            title: 'AI Assistant 🤖',
            subtitle: 'Get instant help from our AI. Available 24/7',
            footer: 'Powered by N8N',
            getStarted: 'Start Chat',
            inputPlaceholder: 'Type your question here...',
            closeButtonTooltip: 'Close chat',
          },
        },
        enableStreaming: false,
        metadata: {
          source: 'langflow-chat',
          timestamp: new Date().toISOString(),
        },
      });
    `;
    document.head.appendChild(script);

    return () => {
      // Cleanup
      if (link.parentNode) link.parentNode.removeChild(link);
      if (script.parentNode) script.parentNode.removeChild(script);
    };
  }, [isOpen, webhookUrl]);

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-0 right-0 z-40">
      <div id="n8n-chat-container" />
      <style jsx global>{`
        /* N8N Chat Custom Styling */
        #n8n-chat-container {
          --chat-primary-color: #3b82f6;
          --chat-secondary-color: #1e40af;
          --chat-accent-color: #10b981;
          --chat-text-color: #1f2937;
          --chat-bg-color: #ffffff;
          --chat-border-color: #e5e7eb;
        }

        /* Chat Button */
        .n8n-chat-button {
          background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%);
          border: none;
          border-radius: 50%;
          width: 60px;
          height: 60px;
          cursor: pointer;
          box-shadow: 0 4px 20px rgba(59, 130, 246, 0.4);
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 24px;
        }

        .n8n-chat-button:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 30px rgba(59, 130, 246, 0.6);
        }

        .n8n-chat-button:active {
          transform: scale(0.95);
        }

        /* Chat Window */
        .n8n-chat-window {
          background: white;
          border-radius: 16px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          height: 600px;
          width: 400px;
          max-width: 90vw;
          animation: slideUp 0.3s ease-out;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Chat Header */
        .n8n-chat-header {
          background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%);
          color: white;
          padding: 20px;
          border-bottom: none;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .n8n-chat-header-title {
          font-size: 18px;
          font-weight: 600;
          margin: 0;
        }

        .n8n-chat-header-subtitle {
          font-size: 12px;
          opacity: 0.9;
          margin: 4px 0 0 0;
        }

        /* Chat Messages */
        .n8n-chat-messages {
          flex: 1;
          overflow-y: auto;
          padding: 16px;
          background: #f9fafb;
        }

        .n8n-chat-message {
          margin-bottom: 12px;
          display: flex;
          animation: fadeIn 0.3s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .n8n-chat-message.user {
          justify-content: flex-end;
        }

        .n8n-chat-message-content {
          max-width: 80%;
          padding: 12px 16px;
          border-radius: 12px;
          word-wrap: break-word;
          line-height: 1.4;
          font-size: 14px;
        }

        .n8n-chat-message.user .n8n-chat-message-content {
          background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%);
          color: white;
          border-bottom-right-radius: 4px;
        }

        .n8n-chat-message.bot .n8n-chat-message-content {
          background: white;
          color: #1f2937;
          border: 1px solid #e5e7eb;
          border-bottom-left-radius: 4px;
        }

        /* Chat Input */
        .n8n-chat-input-wrapper {
          padding: 16px;
          background: white;
          border-top: 1px solid #e5e7eb;
          display: flex;
          gap: 8px;
        }

        .n8n-chat-input {
          flex: 1;
          padding: 12px 16px;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          font-size: 14px;
          font-family: inherit;
          transition: all 0.2s ease;
          resize: none;
          max-height: 100px;
        }

        .n8n-chat-input:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .n8n-chat-input::placeholder {
          color: #9ca3af;
        }

        /* Send Button */
        .n8n-chat-send-button {
          background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%);
          color: white;
          border: none;
          border-radius: 8px;
          padding: 12px 16px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 50px;
        }

        .n8n-chat-send-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
        }

        .n8n-chat-send-button:active {
          transform: translateY(0);
        }

        .n8n-chat-send-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
        }

        /* Welcome Screen */
        .n8n-chat-welcome {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
          text-align: center;
          background: linear-gradient(135deg, #f0f9ff 0%, #f0fdf4 100%);
        }

        .n8n-chat-welcome-icon {
          font-size: 48px;
          margin-bottom: 16px;
        }

        .n8n-chat-welcome-title {
          font-size: 20px;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 8px;
        }

        .n8n-chat-welcome-subtitle {
          font-size: 14px;
          color: #6b7280;
          margin-bottom: 24px;
        }

        /* Scrollbar Styling */
        .n8n-chat-messages::-webkit-scrollbar {
          width: 6px;
        }

        .n8n-chat-messages::-webkit-scrollbar-track {
          background: transparent;
        }

        .n8n-chat-messages::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 3px;
        }

        .n8n-chat-messages::-webkit-scrollbar-thumb:hover {
          background: #9ca3af;
        }

        /* Loading Animation */
        .n8n-chat-loading {
          display: flex;
          gap: 4px;
          align-items: center;
        }

        .n8n-chat-loading-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #3b82f6;
          animation: bounce 1.4s infinite;
        }

        .n8n-chat-loading-dot:nth-child(2) {
          animation-delay: 0.2s;
        }

        .n8n-chat-loading-dot:nth-child(3) {
          animation-delay: 0.4s;
        }

        @keyframes bounce {
          0%,
          80%,
          100% {
            transform: scale(0.8);
            opacity: 0.5;
          }
          40% {
            transform: scale(1);
            opacity: 1;
          }
        }

        /* Responsive */
        @media (max-width: 640px) {
          .n8n-chat-window {
            width: 100%;
            height: 100%;
            border-radius: 0;
            max-width: 100vw;
          }

          .n8n-chat-message-content {
            max-width: 90%;
          }
        }

        /* Dark Mode Support */
        @media (prefers-color-scheme: dark) {
          .n8n-chat-window {
            background: #1f2937;
          }

          .n8n-chat-messages {
            background: #111827;
          }

          .n8n-chat-message.bot .n8n-chat-message-content {
            background: #374151;
            color: #f3f4f6;
            border-color: #4b5563;
          }

          .n8n-chat-input {
            background: #374151;
            color: #f3f4f6;
            border-color: #4b5563;
          }

          .n8n-chat-input::placeholder {
            color: #9ca3af;
          }

          .n8n-chat-input-wrapper {
            background: #1f2937;
            border-top-color: #374151;
          }

          .n8n-chat-header-subtitle {
            color: #d1d5db;
          }
        }
      `}</style>
    </div>
  );
}
