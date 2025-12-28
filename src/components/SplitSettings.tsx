import React, { useState } from 'react';
import { Settings2, X, Plus, HelpCircle } from 'lucide-react';

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
  const [showHelp, setShowHelp] = useState(false);

  const handleAddDelimiter = () => {
    if (!inputValue) return;
    
    // \n と \t のみを明示的に置換
    const newDelimiter = inputValue
      .replace(/\\n/g, '\n')
      .replace(/\\t/g, '\t');

    if (!delimiters.includes(newDelimiter)) {
      onDelimitersChange([...delimiters, newDelimiter]);
    }
    setInputValue('');
  };

  const handleRemoveDelimiter = (index: number) => {
    onDelimitersChange(delimiters.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddDelimiter();
    }
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
          <div className="flex items-center justify-between">
            <label htmlFor="delimiters" className="text-sm font-medium text-gray-600">
              区切り文字 (Enter で追加)
            </label>
            <div className="relative">
              <button
                type="button"
                onMouseEnter={() => setShowHelp(true)}
                onMouseLeave={() => setShowHelp(false)}
                onClick={() => setShowHelp(!showHelp)}
                className="text-gray-400 hover:text-blue-600 transition-colors"
              >
                <HelpCircle size={16} />
              </button>
              
              {showHelp && (
                <div className="absolute right-0 bottom-full mb-2 w-64 p-3 bg-white border border-gray-200 rounded-lg shadow-xl z-10 text-xs text-gray-600 space-y-2">
                  <p className="font-bold text-gray-800 border-b pb-1 mb-1">文字の入力方法</p>
                  <ul className="space-y-1">
                    <li className="flex justify-between">
                      <code className="bg-gray-100 px-1 rounded text-blue-600">\n</code>
                      <span>改行 (LF)</span>
                    </li>
                    <li className="flex justify-between">
                      <code className="bg-gray-100 px-1 rounded text-blue-600">\t</code>
                      <span>タブ (Tab)</span>
                    </li>
                    <li className="flex justify-between">
                      <code className="bg-gray-100 px-1 rounded text-blue-600">。</code>
                      <span>句点など通常の文字</span>
                    </li>
                  </ul>
                  <p className="pt-1 text-[10px] text-gray-400 italic">
                    ※入力してEnterを押すと確定します。
                  </p>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-2">
            {delimiters.map((d, i) => (
              <span 
                key={i} 
                className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200"
              >
                {d.split('').map((char, index) => (
                  <React.Fragment key={index}>
                    {char === '\n' ? (
                      <span className="text-blue-500 font-mono mx-0.5">LF</span>
                    ) : char === '\t' ? (
                      <span className="text-blue-500 font-mono mx-0.5">Tab</span>
                    ) : (
                      char
                    )}
                  </React.Fragment>
                ))}
                <button
                  type="button"
                  onClick={() => handleRemoveDelimiter(i)}
                  className="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full text-blue-400 hover:bg-blue-200 hover:text-blue-600 focus:outline-none"
                >
                  <X size={12} />
                </button>
              </span>
            ))}
          </div>

          <div className="relative">
            <input
              id="delimiters"
              type="text"
              className="w-full p-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="例: 。 ( \n で改行 )"
            />
            <button
              type="button"
              onClick={handleAddDelimiter}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-blue-600 rounded-md"
            >
              <Plus size={20} />
            </button>
          </div>
          <p className="text-[10px] text-gray-400">
            ※ 複数の文字からなる文字列（例: 「です。」）も登録可能です。
          </p>
        </div>
      )}
    </div>
  );
};
