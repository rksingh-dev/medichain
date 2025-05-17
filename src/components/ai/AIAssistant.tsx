import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, RefreshCw } from 'lucide-react';
import { AIMessage } from '../../types';

const GEMINI_API_KEY = 'AIzaSyCwzbJyj6RigMJvEcVTqlKhlHdJ2dpGr14';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

const AIAssistant: React.FC = () => {
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      role: 'assistant',
      content: 'Hello, I\'m your medical AI assistant. I can help answer your questions about patient conditions, treatments, or general medical information. How can I assist you today?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage: AIMessage = {
      role: 'user',
      content: input,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: `You are a medical AI assistant helping a doctor. Provide accurate, helpful responses to medical inquiries. Include relevant research where appropriate. Question: ${input}` }]
          }]
        })
      });
      
      const data = await response.json();
      
      // Check if response has the expected structure
      if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0]) {
        const aiResponse = data.candidates[0].content.parts[0].text;
        
        const aiMessage: AIMessage = {
          role: 'assistant',
          content: aiResponse,
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, aiMessage]);
      } else {
        throw new Error('Unexpected API response format');
      }
    } catch (error) {
      console.error('Error querying Gemini API:', error);
      
      // Add error message
      const errorMessage: AIMessage = {
        role: 'assistant',
        content: 'I apologize, but I encountered an error processing your request. Please try again or check your connection.',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(timestamp);
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-cyan-600 to-teal-600 text-white p-4">
        <div className="flex items-center">
          <Bot size={24} className="mr-2" />
          <div>
            <h2 className="font-semibold">Medical AI Assistant</h2>
            <p className="text-xs text-cyan-100">Powered by Gemini AI</p>
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {messages.map((message, index) => (
          <div 
            key={index} 
            className={`mb-4 flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[75%] rounded-lg p-3 ${
                message.role === 'user' 
                  ? 'bg-cyan-600 text-white rounded-tr-none' 
                  : 'bg-white shadow-sm border border-gray-200 rounded-tl-none'
              }`}
            >
              <div className="flex items-center mb-1">
                {message.role === 'assistant' ? (
                  <Bot size={16} className="mr-1 text-teal-600" />
                ) : (
                  <User size={16} className="mr-1 text-white" />
                )}
                <span className={`text-xs ${message.role === 'user' ? 'text-cyan-100' : 'text-gray-500'}`}>
                  {message.role === 'assistant' ? 'AI Assistant' : 'You'} • {formatTimestamp(message.timestamp)}
                </span>
              </div>
              <div className={`text-sm whitespace-pre-wrap ${message.role === 'user' ? '' : 'text-gray-800'}`}>
                {message.content}
              </div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start mb-4">
            <div className="max-w-[75%] bg-white rounded-lg p-3 shadow-sm border border-gray-200 rounded-tl-none">
              <div className="flex items-center">
                <Bot size={16} className="mr-1 text-teal-600" />
                <span className="text-xs text-gray-500">AI Assistant</span>
              </div>
              <div className="mt-2 flex items-center text-gray-600">
                <RefreshCw size={14} className="animate-spin mr-2" />
                <span className="text-sm">Thinking...</span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-3 border-t border-gray-200">
        <div className="flex items-center">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask a medical question..."
            className="flex-1 resize-none rounded-lg border border-gray-300 p-2 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 max-h-32"
            rows={1}
            disabled={isLoading}
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || isLoading}
            className={`ml-2 p-2 rounded-full ${
              !input.trim() || isLoading
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-cyan-600 text-white hover:bg-cyan-700'
            } transition-colors`}
            aria-label="Send message"
          >
            <Send size={20} />
          </button>
        </div>
        <p className="text-xs text-gray-400 mt-1 px-1">
          Press Enter to send, Shift+Enter for a new line
        </p>
      </div>
    </div>
  );
};

export default AIAssistant;