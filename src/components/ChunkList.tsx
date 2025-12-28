import React from 'react';
import { ChunkCard } from './ChunkCard';

interface ChunkListProps {
  chunks: string[];
}

export const ChunkList: React.FC<ChunkListProps> = ({ chunks }) => {
  if (chunks.length === 0) return null;

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold text-gray-800">分割結果 ({chunks.length} チャンク)</h2>
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-1">
        {chunks.map((chunk, index) => (
          <ChunkCard
            key={index}
            index={index}
            total={chunks.length}
            content={chunk}
          />
        ))}
      </div>
    </div>
  );
};
