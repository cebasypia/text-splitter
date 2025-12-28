import { useState, useCallback } from 'react';

interface UseClipboardResult {
  copy: (text: string) => Promise<void>;
  copied: boolean;
  error: string | null;
}

export const useClipboard = (timeout = 2000): UseClipboardResult => {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const copy = useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setError(null);
        setTimeout(() => setCopied(false), timeout);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'コピーに失敗しました');
        setCopied(false);
      }
    },
    [timeout]
  );

  return { copy, copied, error };
};
