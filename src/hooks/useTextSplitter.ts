import { useMemo } from 'react';
import { normalizeLineEndings } from '../utils/normalizeLineEndings';
import { splitByCodePoints, countCodePoints } from '../utils/splitByCodePoints';

interface UseTextSplitterResult {
  normalizedText: string;
  chunks: string[];
  totalCodePoints: number;
}

export const useTextSplitter = (text: string, chunkSize: number): UseTextSplitterResult => {
  return useMemo(() => {
    const normalizedText = normalizeLineEndings(text);
    const chunks = splitByCodePoints(normalizedText, chunkSize);
    const totalCodePoints = countCodePoints(normalizedText);

    return {
      normalizedText,
      chunks,
      totalCodePoints,
    };
  }, [text, chunkSize]);
};
