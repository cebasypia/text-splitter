import React from 'react';
import { Trash2 } from 'lucide-react';

interface ClearButtonProps {
  onClear: () => void;
}

export const ClearButton: React.FC<ClearButtonProps> = ({ onClear }) => {
  return (
    <button
      onClick={onClear}
      title="入力をクリア"
      aria-label="入力をクリア"
      className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-all"
    >
      <Trash2 size={16} strokeWidth={2} />
    </button>
  );
};
