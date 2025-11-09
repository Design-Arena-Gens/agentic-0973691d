'use client';

interface ToolbarProps {
  onExport: () => void;
  onUndo: () => void;
  onRedo: () => void;
  selectedElement: string | null;
}

export function Toolbar({ onExport, onUndo, onRedo, selectedElement }: ToolbarProps) {
  return (
    <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <button
          onClick={onUndo}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          title="Undo"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
          </svg>
        </button>

        <button
          onClick={onRedo}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          title="Redo"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 10h-10a8 8 0 00-8 8v2m18-10l-6 6m6-6l-6-6" />
          </svg>
        </button>

        <div className="w-px h-6 bg-gray-300" />

        {selectedElement && (
          <div className="text-sm text-gray-600">
            Element selected: <span className="font-semibold">{selectedElement}</span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={onExport}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Export HTML
        </button>
      </div>
    </div>
  );
}
