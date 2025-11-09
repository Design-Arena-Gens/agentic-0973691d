'use client';

import { useState, useRef } from 'react';
import { Canvas } from './components/Canvas';
import { Sidebar } from './components/Sidebar';
import { AIChat } from './components/AIChat';
import { Toolbar } from './components/Toolbar';

export default function Home() {
  const [elements, setElements] = useState<any[]>([]);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [chatOpen, setChatOpen] = useState(true);
  const [history, setHistory] = useState<any[]>([]);
  const canvasRef = useRef<HTMLDivElement>(null);

  const addElement = (type: string) => {
    const newElement = {
      id: `${type}-${Date.now()}`,
      type,
      x: 100,
      y: 100,
      width: type === 'button' ? 120 : 200,
      height: type === 'button' ? 40 : type === 'input' ? 40 : 100,
      content: type === 'text' ? 'Double-click to edit' : type === 'button' ? 'Button' : '',
      styles: getDefaultStyles(type),
    };
    setElements([...elements, newElement]);
    setHistory([...history, { action: 'add', element: newElement }]);
  };

  const getDefaultStyles = (type: string) => {
    const base = {
      backgroundColor: '#ffffff',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      color: '#000000',
      fontSize: '14px',
      fontFamily: 'Inter, system-ui, sans-serif',
    };

    switch (type) {
      case 'button':
        return {
          ...base,
          backgroundColor: '#3b82f6',
          color: '#ffffff',
          fontWeight: '600',
          cursor: 'pointer',
        };
      case 'input':
        return {
          ...base,
          padding: '8px 12px',
        };
      case 'text':
        return {
          ...base,
          border: 'none',
          backgroundColor: 'transparent',
        };
      case 'container':
        return {
          ...base,
          backgroundColor: '#f9fafb',
        };
      default:
        return base;
    }
  };

  const updateElement = (id: string, updates: any) => {
    setElements(elements.map(el => el.id === id ? { ...el, ...updates } : el));
  };

  const deleteElement = (id: string) => {
    setElements(elements.filter(el => el.id !== id));
    if (selectedElement === id) setSelectedElement(null);
  };

  const handleAICommand = (command: string) => {
    const lowerCommand = command.toLowerCase();

    if (lowerCommand.includes('add') || lowerCommand.includes('create')) {
      if (lowerCommand.includes('button')) {
        addElement('button');
      } else if (lowerCommand.includes('input') || lowerCommand.includes('text field')) {
        addElement('input');
      } else if (lowerCommand.includes('text') || lowerCommand.includes('heading')) {
        addElement('text');
      } else if (lowerCommand.includes('container') || lowerCommand.includes('box')) {
        addElement('container');
      }
    } else if (lowerCommand.includes('delete') || lowerCommand.includes('remove')) {
      if (selectedElement) {
        deleteElement(selectedElement);
      }
    } else if (lowerCommand.includes('color') || lowerCommand.includes('background')) {
      if (selectedElement) {
        const colors = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        updateElement(selectedElement, {
          styles: { ...elements.find(el => el.id === selectedElement)?.styles, backgroundColor: randomColor }
        });
      }
    } else if (lowerCommand.includes('center')) {
      if (selectedElement && canvasRef.current) {
        const canvas = canvasRef.current;
        const element = elements.find(el => el.id === selectedElement);
        if (element) {
          updateElement(selectedElement, {
            x: (canvas.clientWidth - element.width) / 2,
            y: (canvas.clientHeight - element.height) / 2,
          });
        }
      }
    }
  };

  const exportCode = () => {
    let html = '<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <style>\n    body { margin: 0; font-family: Inter, system-ui, sans-serif; }\n  </style>\n</head>\n<body>\n';

    elements.forEach(el => {
      const styles = Object.entries(el.styles)
        .map(([key, value]) => `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value}`)
        .join('; ');

      const posStyle = `position: absolute; left: ${el.x}px; top: ${el.y}px; width: ${el.width}px; height: ${el.height}px; ${styles}`;

      if (el.type === 'button') {
        html += `  <button style="${posStyle}">${el.content}</button>\n`;
      } else if (el.type === 'input') {
        html += `  <input type="text" style="${posStyle}" placeholder="${el.content}" />\n`;
      } else if (el.type === 'text') {
        html += `  <div style="${posStyle}">${el.content}</div>\n`;
      } else if (el.type === 'container') {
        html += `  <div style="${posStyle}"></div>\n`;
      }
    });

    html += '</body>\n</html>';

    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'design.html';
    a.click();
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <Sidebar addElement={addElement} />

      <div className="flex-1 flex flex-col">
        <Toolbar
          onExport={exportCode}
          onUndo={() => {}}
          onRedo={() => {}}
          selectedElement={selectedElement}
        />

        <Canvas
          ref={canvasRef}
          elements={elements}
          selectedElement={selectedElement}
          setSelectedElement={setSelectedElement}
          updateElement={updateElement}
          deleteElement={deleteElement}
        />
      </div>

      <AIChat
        isOpen={chatOpen}
        onClose={() => setChatOpen(false)}
        onCommand={handleAICommand}
      />

      {!chatOpen && (
        <button
          onClick={() => setChatOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 flex items-center justify-center text-2xl"
        >
          ✨
        </button>
      )}
    </div>
  );
}
