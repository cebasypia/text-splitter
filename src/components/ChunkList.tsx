import React, { useState, useEffect } from 'react';
import { ChunkCard } from './ChunkCard';

interface ChunkListProps {
  chunks: string[];
}

export const ChunkList: React.FC<ChunkListProps> = ({ chunks }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [autoNext, setAutoNext] = useState(true);

  // Reset active tab when chunks change (e.g., when a new text is split)
  useEffect(() => {
    if (activeTab >= chunks.length && chunks.length > 0) {
      setActiveTab(0);
    }
  }, [chunks.length, activeTab]);

  if (chunks.length === 0) return null;

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">分割結果 ({chunks.length} チャンク)</h2>
        <label className="flex items-center gap-2 cursor-pointer group">
          <input
            type="checkbox"
            checked={autoNext}
            onChange={(e) => setAutoNext(e.target.checked)}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <span className="text-sm font-medium text-gray-600 group-hover:text-gray-800 transition-colors">
            コピー後に次へ
          </span>
        </label>
      </div>
      
      {/* Tabs Navigation */}
      <div className="flex overflow-x-auto bg-gray-100 rounded-t-xl border-t border-x border-gray-200 shadow-sm [&::-webkit-scrollbar]:h-1 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-thumb]:rounded-full">
        {chunks.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`px-6 py-2.5 text-sm font-medium transition-all whitespace-nowrap relative min-w-[60px] text-center outline-none ${
              activeTab === index
                ? 'bg-white text-blue-600 z-10'
                : 'text-gray-500 hover:bg-gray-200/80 hover:text-gray-700'
            }`}
          >
            {index + 1}
            {activeTab !== index && index < chunks.length - 1 && activeTab !== index + 1 && (
              <div className="absolute right-0 top-1/4 bottom-1/4 w-[1px] bg-gray-300" />
            )}
          </button>
        ))}
      </div>

      {/* Active Chunk Content */}
      <div className="bg-white border-x border-b border-gray-200 rounded-b-xl shadow-sm overflow-hidden z-0">
        <ChunkCard
          key={activeTab}
          index={activeTab}
          total={chunks.length}
          content={chunks[activeTab]}
          isTabContent
          autoNext={autoNext}
          onNext={() => setActiveTab((prev) => Math.min(prev + 1, chunks.length - 1))}
        />
      </div>
    </div>
  );
};
