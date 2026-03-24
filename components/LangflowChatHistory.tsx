'use client';

import React, { useState, useEffect } from 'react';
import { Clock, Plus, Trash2, X } from 'lucide-react';
import { Message } from '@/types/langflow';

interface LangflowChatSession {
  id: string;
  title: string;
  timestamp: number;
  messages: Message[];
}

interface LangflowChatHistoryProps {
  onSelectSession: (session: LangflowChatSession) => void;
  onNewChat: () => void;
  currentMessages: Message[];
  isOpen: boolean;
  onToggle: () => void;
}

export default function LangflowChatHistory({
  onSelectSession,
  onNewChat,
  currentMessages,
  isOpen,
  onToggle
}: LangflowChatHistoryProps) {
  const [sessions, setSessions] = useState<LangflowChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);

  // Load sessions from localStorage on mount
  useEffect(() => {
    loadSessions();
  }, []);

  // Auto-save current chat when messages change
  useEffect(() => {
    if (currentMessages.length > 0) {
      autoSaveCurrentChat();
    }
  }, [currentMessages]);

  const loadSessions = () => {
    try {
      const saved = localStorage.getItem('langflowChatSessions');
      if (saved) {
        setSessions(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Failed to load chat sessions:', error);
    }
  };

  const saveSessions = (newSessions: LangflowChatSession[]) => {
    try {
      localStorage.setItem('langflowChatSessions', JSON.stringify(newSessions));
      setSessions(newSessions);
    } catch (error) {
      console.error('Failed to save chat sessions:', error);
    }
  };

  const autoSaveCurrentChat = () => {
    if (currentMessages.length === 0) return;

    const existingSessions = [...sessions];
    let sessionId = currentSessionId;

    // If no current session, create new one
    if (!sessionId) {
      sessionId = `chat_${Date.now()}`;
      setCurrentSessionId(sessionId);
    }

    const existingIndex = existingSessions.findIndex(s => s.id === sessionId);
    const firstUserMessage = currentMessages.find(m => m.sender === 'user');
    const title = firstUserMessage?.text.substring(0, 50) || 'Chat';

    const session: LangflowChatSession = {
      id: sessionId,
      title: title.length > 50 ? title + '...' : title,
      timestamp: Date.now(),
      messages: currentMessages
    };

    if (existingIndex >= 0) {
      existingSessions[existingIndex] = session;
    } else {
      existingSessions.push(session);
    }

    saveSessions(existingSessions);
  };

  const handleNewChat = () => {
    setCurrentSessionId(null);
    onNewChat();
    onToggle(); // Close history panel
  };

  const handleSelectSession = (session: LangflowChatSession) => {
    setCurrentSessionId(session.id);
    onSelectSession(session);
    onToggle(); // Close history panel
  };

  const handleDeleteSession = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = sessions.filter(s => s.id !== id);
    saveSessions(updated);
    if (currentSessionId === id) {
      setCurrentSessionId(null);
    }
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  return (
    <>
      {/* History Button */}
      <button
        onClick={onToggle}
        className={`p-2 rounded-lg transition-colors ${
          isOpen
            ? 'text-blue-600 bg-blue-100'
            : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
        }`}
        title="Chat History"
      >
        <Clock size={20} />
      </button>

      {/* History Panel */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md max-h-[80vh] flex flex-col shadow-2xl">
            {/* Header */}
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                <Clock size={18} />
                Chat History
              </h3>
              <button
                onClick={onToggle}
                className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors text-gray-600 hover:text-gray-800"
                title="Close"
              >
                <X size={20} />
              </button>
            </div>

            {/* Sessions List */}
            <div className="overflow-y-auto flex-1">
              {sessions.length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                  <Clock size={32} className="mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No chat history yet</p>
                  <p className="text-xs mt-1">Start a new conversation to begin</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {sessions.map((session) => (
                    <button
                      key={session.id}
                      onClick={() => handleSelectSession(session)}
                      className={`w-full text-left p-4 hover:bg-gray-50 transition-colors border-l-2 ${
                        currentSessionId === session.id
                          ? 'bg-blue-50 border-l-blue-500'
                          : 'border-l-transparent'
                      }`}
                    >
                      <div className="flex justify-between items-start gap-3">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-800 truncate">
                            {session.title}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {session.messages.length} messages
                          </p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className="text-xs text-gray-400 whitespace-nowrap">
                            {formatDate(session.timestamp)}
                          </span>
                          <button
                            onClick={(e) => handleDeleteSession(session.id, e)}
                            className="p-1 hover:bg-red-100 rounded transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={14} className="text-red-500" />
                          </button>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <button
                onClick={handleNewChat}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm flex items-center justify-center gap-2"
              >
                <Plus size={16} />
                New Chat
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
