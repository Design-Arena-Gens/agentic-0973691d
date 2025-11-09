'use client';

import { forwardRef, useState } from 'react';
import Draggable from 'react-draggable';

interface CanvasProps {
  elements: any[];
  selectedElement: string | null;
  setSelectedElement: (id: string | null) => void;
  updateElement: (id: string, updates: any) => void;
  deleteElement: (id: string) => void;
}

export const Canvas = forwardRef<HTMLDivElement, CanvasProps>(({
  elements,
  selectedElement,
  setSelectedElement,
  updateElement,
  deleteElement,
}, ref) => {
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleDrag = (id: string, data: any) => {
    updateElement(id, { x: data.x, y: data.y });
  };

  const handleDoubleClick = (id: string) => {
    setEditingId(id);
  };

  const handleContentChange = (id: string, content: string) => {
    updateElement(id, { content });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      setEditingId(null);
    }
    if (e.key === 'Delete' && selectedElement && editingId !== selectedElement) {
      deleteElement(selectedElement);
    }
  };

  return (
    <div
      ref={ref}
      className="flex-1 relative bg-white overflow-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setSelectedElement(null);
        }
      }}
    >
      {elements.map((element) => (
        <Draggable
          key={element.id}
          position={{ x: element.x, y: element.y }}
          onStop={(e, data) => handleDrag(element.id, data)}
          handle=".drag-handle"
        >
          <div
            className={`absolute cursor-move ${
              selectedElement === element.id ? 'ring-2 ring-blue-500' : ''
            }`}
            style={{
              width: element.width,
              height: element.height,
            }}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedElement(element.id);
            }}
            onDoubleClick={() => handleDoubleClick(element.id)}
          >
            <div
              className="drag-handle w-full h-full flex items-center justify-center"
              style={{
                ...element.styles,
                userSelect: editingId === element.id ? 'auto' : 'none',
              }}
            >
              {element.type === 'button' && (
                editingId === element.id ? (
                  <input
                    type="text"
                    value={element.content}
                    onChange={(e) => handleContentChange(element.id, e.target.value)}
                    onBlur={() => setEditingId(null)}
                    onKeyDown={handleKeyDown}
                    autoFocus
                    className="w-full h-full bg-transparent text-center outline-none"
                    style={{ color: element.styles.color }}
                  />
                ) : (
                  element.content
                )
              )}

              {element.type === 'text' && (
                editingId === element.id ? (
                  <textarea
                    value={element.content}
                    onChange={(e) => handleContentChange(element.id, e.target.value)}
                    onBlur={() => setEditingId(null)}
                    onKeyDown={handleKeyDown}
                    autoFocus
                    className="w-full h-full bg-transparent outline-none resize-none p-2"
                    style={{ color: element.styles.color, fontSize: element.styles.fontSize }}
                  />
                ) : (
                  <div className="w-full h-full p-2 overflow-auto">
                    {element.content}
                  </div>
                )
              )}

              {element.type === 'input' && (
                <input
                  type="text"
                  placeholder={editingId === element.id ? '' : element.content || 'Input field'}
                  value={editingId === element.id ? element.content : ''}
                  onChange={(e) => editingId === element.id && handleContentChange(element.id, e.target.value)}
                  onFocus={() => setEditingId(element.id)}
                  onBlur={() => setEditingId(null)}
                  onKeyDown={handleKeyDown}
                  className="w-full h-full outline-none"
                  style={{
                    backgroundColor: 'transparent',
                    color: element.styles.color,
                    padding: element.styles.padding,
                  }}
                />
              )}

              {element.type === 'container' && (
                <div className="w-full h-full" />
              )}
            </div>

            {selectedElement === element.id && (
              <>
                <div
                  className="absolute bottom-0 right-0 w-4 h-4 bg-blue-500 cursor-se-resize"
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    const startX = e.clientX;
                    const startY = e.clientY;
                    const startWidth = element.width;
                    const startHeight = element.height;

                    const handleMouseMove = (moveEvent: MouseEvent) => {
                      const newWidth = Math.max(50, startWidth + (moveEvent.clientX - startX));
                      const newHeight = Math.max(30, startHeight + (moveEvent.clientY - startY));
                      updateElement(element.id, { width: newWidth, height: newHeight });
                    };

                    const handleMouseUp = () => {
                      document.removeEventListener('mousemove', handleMouseMove);
                      document.removeEventListener('mouseup', handleMouseUp);
                    };

                    document.addEventListener('mousemove', handleMouseMove);
                    document.addEventListener('mouseup', handleMouseUp);
                  }}
                />
              </>
            )}
          </div>
        </Draggable>
      ))}
    </div>
  );
});

Canvas.displayName = 'Canvas';
