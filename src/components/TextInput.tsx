import React from 'react';

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  count: number;
}

export const TextInput: React.FC<TextInputProps> = ({ value, onChange, count }) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <label htmlFor="input-text" className="font-bold text-gray-700">
          入力テキスト
        </label>
        <span className="text-sm text-gray-500">
          文字数: <span className="font-mono font-bold text-blue-600">{count}</span> (code points)
        </span>
      </div>
      <textarea
        id="input-text"
        className="w-full h-48 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-y"
        placeholder="ここに長文を貼り付けてください..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
