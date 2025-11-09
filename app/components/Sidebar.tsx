'use client';

interface SidebarProps {
  addElement: (type: string) => void;
}

export function Sidebar({ addElement }: SidebarProps) {
  const elements = [
    { type: 'button', icon: '🔘', label: 'Button' },
    { type: 'input', icon: '📝', label: 'Input' },
    { type: 'text', icon: '📄', label: 'Text' },
    { type: 'container', icon: '📦', label: 'Container' },
  ];

  return (
    <div className="w-64 bg-gray-900 text-white p-4 flex flex-col gap-4">
      <div className="flex items-center gap-2 mb-4">
        <div className="text-2xl">✨</div>
        <h1 className="text-xl font-bold">Flux Clone</h1>
      </div>

      <div className="mb-4">
        <h2 className="text-sm font-semibold text-gray-400 mb-2">ELEMENTS</h2>
        <div className="flex flex-col gap-2">
          {elements.map((element) => (
            <button
              key={element.type}
              onClick={() => addElement(element.type)}
              className="flex items-center gap-3 p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors text-left"
            >
              <span className="text-xl">{element.icon}</span>
              <span className="text-sm font-medium">{element.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-auto">
        <div className="p-3 bg-gray-800 rounded-lg">
          <p className="text-xs text-gray-400 mb-2">Keyboard Shortcuts</p>
          <div className="text-xs space-y-1">
            <div><kbd className="bg-gray-700 px-1 rounded">Delete</kbd> Remove element</div>
            <div><kbd className="bg-gray-700 px-1 rounded">Double-click</kbd> Edit text</div>
            <div><kbd className="bg-gray-700 px-1 rounded">Drag</kbd> Move element</div>
          </div>
        </div>
      </div>
    </div>
  );
}
