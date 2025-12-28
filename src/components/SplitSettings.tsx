import React, { useState, useEffect } from 'react';
import { Settings2 } from 'lucide-react';

interface SplitSettingsProps {
  chunkSize: number;
  onChunkSizeChange: (value: number) => void;
  isSmartSplit: boolean;
  onSmartSplitChange: (value: boolean) => void;
  delimiters: string[];
  onDelimitersChange: (value: string[]) => void;
}

export const SplitSettings: React.FC<SplitSettingsProps> = ({
  chunkSize,
  onChunkSizeChange,
  isSmartSplit,
  onSmartSplitChange,
  delimiters,
  onDelimitersChange,
}) => {
  const [inputValue, setInputValue] = useState('');

  // 親の状態が変わったときにローカルの状態を同期する
  useEffect(() => {
    const formatted = delimiters
      .map((d) => (d === '\n' ? '\\n' : d))
      .join(', ');
    
    // 入力中（フォーカス中）は同期しないようにして、入力の邪魔をしない
    if (document.activeElement?.id !== 'delimiters') {
      setInputValue(formatted);
    }
  }, [delimiters]);

  const handleDelimitersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    const newDelimiters = value
      .split(',')
      .map((d) => d.trim())
      .filter((d) => d !== '')
      .map((d) => (d === '\\n' ? '\n' : d));
    
    onDelimitersChange(newDelimiters);
  };

  const handleBlur = () => {
    // フォーカスが外れたときにきれいに整形する
    const formatted = delimiters
      .map((d) => (d === '\n' ? '\\n' : d))
      .join(', ');
    setInputValue(formatted);
  };

  return (
    <div className="space-y-4 bg-gray-50 p-4 rounded-xl border border-gray-200">
      <div className="flex items-center gap-2 text-gray-700 mb-2">
        <Settings2 size={18} />
        <h2 className="font-bold">分割設定</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="chunk-size" className="text-sm font-medium text-gray-600">
            最大文字数 (N)
          </label>
          <input
            id="chunk-size"
            type="number"
            min="1"
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
            value={chunkSize}
            onChange={(e) => onChunkSizeChange(parseInt(e.target.value, 10) || 0)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-600">
            スマート分割
          </label>
          <div className="flex items-center h-full">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={isSmartSplit}
                onChange={(e) => onSmartSplitChange(e.target.checked)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              <span className="ml-3 text-sm font-medium text-gray-700">
                {isSmartSplit ? 'ON' : 'OFF'}
              </span>
            </label>
          </div>
        </div>
      </div>

      {isSmartSplit && (
        <div className="flex flex-col gap-2">
          <label htmlFor="delimiters" className="text-sm font-medium text-gray-600">
            区切り文字 (カンマ区切り, 改行は \n)
          </label>
          <input
            id="delimiters"
            type="text"
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
            value={inputValue}
            onChange={handleDelimitersChange}
            onBlur={handleBlur}
            placeholder="\n, 。, ."
          />
        </div>
      )}
    </div>
  );
};
