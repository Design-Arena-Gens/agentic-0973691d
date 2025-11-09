'use client';

import { useState, useRef, useEffect } from 'react';

interface AIChatProps {
  isOpen: boolean;
  onClose: () => void;
  onCommand: (command: string) => void;
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
}

export function AIChat({ isOpen, onClose, onCommand }: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hi! I\'m your AI design assistant. Try commands like:\n• "Add a button"\n• "Create an input field"\n• "Change the background color"\n• "Center the element"',
      sender: 'ai',
    },
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
    };

    setMessages([...messages, userMessage]);

    // Process command
    onCommand(input);

    // AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(input),
        sender: 'ai',
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 300);

    setInput('');
  };

  const getAIResponse = (command: string) => {
    const lower = command.toLowerCase();

    if (lower.includes('add') || lower.includes('create')) {
      if (lower.includes('button')) return '✓ Button added to the canvas!';
      if (lower.includes('input') || lower.includes('text field')) return '✓ Input field added!';
      if (lower.includes('text') || lower.includes('heading')) return '✓ Text element added!';
      if (lower.includes('container') || lower.includes('box')) return '✓ Container added!';
      return 'I can add buttons, inputs, text, or containers. What would you like to add?';
    }

    if (lower.includes('delete') || lower.includes('remove')) {
      return '✓ Selected element removed!';
    }

    if (lower.includes('color') || lower.includes('background')) {
      return '✓ Background color changed!';
    }

    if (lower.includes('center')) {
      return '✓ Element centered on canvas!';
    }

    if (lower.includes('help')) {
      return 'I can help you:\n• Add elements (button, input, text, container)\n• Delete selected elements\n• Change colors\n• Center elements\n\nJust tell me what you want to do!';
    }

    return 'I understand! Let me help you with that. Try selecting an element first, or ask me to add something new.';
  };

  if (!isOpen) return null;

  return (
    <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
      <div className="h-16 border-b border-gray-200 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <h2 className="font-semibold text-gray-900">AI Assistant</h2>
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-lg p-3 ${
                message.sender === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              <p className="text-sm whitespace-pre-line">{message.text}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-gray-200">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask me to add elements..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
          <button
            onClick={handleSend}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {['Add button', 'Add input', 'Add text', 'Change color'].map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => {
                setInput(suggestion);
                handleSend();
              }}
              className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded transition-colors text-gray-700"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
