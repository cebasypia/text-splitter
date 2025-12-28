import React from 'react';
import { Trash2 } from 'lucide-react';

interface ClearButtonProps {
  onClear: () => void;
}

export const ClearButton: React.FC<ClearButtonProps> = ({ onClear }) => {
  return (
    <button
      onClick={onClear}
      className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 border border-red-200 rounded-lg hover:bg-red-100 transition-colors"
    >
      <Trash2 size={18} />
      <span>クリア</span>
    </button>
  );
};
