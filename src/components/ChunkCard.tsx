import React, { useState } from 'react';
import { Copy, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { useClipboard } from '../hooks/useClipboard';
import { countCodePoints } from '../utils/splitByCodePoints';

interface ChunkCardProps {
  index: number;
  total: number;
  content: string;
}

export const ChunkCard: React.FC<ChunkCardProps> = ({ index, total, content }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { copy, copied } = useClipboard();
  const charCount = countCodePoints(content);

  const previewLength = 100;
  const isLong = charCount > previewLength;
  const previewText = isLong ? [...content].slice(0, previewLength).join('') + '...' : content;

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="p-4 flex items-center justify-between bg-gray-50 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
            {index + 1} / {total}
          </span>
          <span className="text-sm text-gray-500 font-mono">
            {charCount} chars
          </span>
        </div>
        <button
          onClick={() => copy(content)}
          className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
            copied
              ? 'bg-green-100 text-green-700'
              : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95'
          }`}
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
          {copied ? 'コピーしました' : 'コピー'}
        </button>
      </div>

      <div className="p-4">
        <div className="relative">
          <pre className={`whitespace-pre-wrap font-sans text-gray-700 text-sm leading-relaxed ${!isExpanded ? 'max-h-24 overflow-hidden' : ''}`}>
            {isExpanded ? content : previewText}
          </pre>
          
          {isLong && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-2 flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors"
            >
              {isExpanded ? (
                <>
                  <ChevronUp size={14} />
                  閉じる
                </>
              ) : (
                <>
                  <ChevronDown size={14} />
                  全文表示
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
