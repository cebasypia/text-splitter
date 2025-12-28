import React from 'react';

interface ChunkSizeInputProps {
  value: number;
  onChange: (value: number) => void;
}

export const ChunkSizeInput: React.FC<ChunkSizeInputProps> = ({ value, onChange }) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="chunk-size" className="font-bold text-gray-700">
        分割文字数 (N)
      </label>
      <input
        id="chunk-size"
        type="number"
        min="1"
        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value, 10) || 0)}
      />
    </div>
  );
};
