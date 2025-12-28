import React, { useState } from "react";
import { Copy, ChevronDown, ChevronUp } from "lucide-react";
import { useClipboard } from "../hooks/useClipboard";
import { useToast } from "./Toast";
import { countCodePoints } from "../utils/splitByCodePoints";

interface ChunkCardProps {
  index: number;
  total: number;
  content: string;
  isTabContent?: boolean;
  autoNext?: boolean;
  onNext?: () => void;
}

export const ChunkCard: React.FC<ChunkCardProps> = ({
  index,
  total,
  content,
  isTabContent,
  autoNext,
  onNext,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { copy, copied } = useClipboard();
  const { showToast } = useToast();
  const charCount = countCodePoints(content);

  const previewLength = 100;
  const isLong = charCount > previewLength;
  const previewText = isLong
    ? [...content].slice(0, previewLength).join("") + "..."
    : content;

  const handleCopyAndNext = () => {
    copy(content);
    showToast("コピーしました！");
    if (onNext) {
      setTimeout(onNext, 300);
    }
  };

  const handleCopy = () => {
    if (autoNext && onNext && index < total - 1) {
      handleCopyAndNext();
    } else {
      copy(content);
      showToast("コピーしました！");
    }
  };

  return (
    <div
      className={`bg-white overflow-hidden transition-shadow ${
        !isTabContent
          ? "border-x border-b border-gray-200 rounded-xl shadow-sm hover:shadow-md"
          : ""
      }`}
    >
      <div
        className={`p-4 flex items-center justify-between border-b border-gray-200 ${
          !isTabContent ? "bg-gray-50" : "bg-white"
        }`}
      >
        <div className="flex items-center gap-3">
          <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
            {index + 1} / {total}
          </span>
          <span className="text-sm text-gray-500 font-mono">
            {charCount} chars
          </span>
        </div>

        <div
          className="flex items-center rounded-lg overflow-hidden border transition-all bg-blue-600 border-blue-600 hover:bg-blue-700 active:scale-[0.98]"
        >
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-4 py-1.5 text-sm font-medium transition-colors text-white"
          >
            <Copy size={16} />
            コピー
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="relative">
          <pre
            className={`whitespace-pre-wrap font-sans text-gray-700 text-sm leading-relaxed ${
              !isExpanded ? "max-h-24 overflow-hidden" : ""
            }`}
          >
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
