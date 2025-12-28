import { useMemo } from 'react';
import { normalizeLineEndings } from '../utils/normalizeLineEndings';
import { splitByCodePoints, countCodePoints, smartSplit } from '../utils/splitByCodePoints';

interface UseTextSplitterResult {
  normalizedText: string;
  chunks: string[];
  totalCodePoints: number;
}

interface UseTextSplitterOptions {
  isSmartSplit: boolean;
  delimiters: string[];
}

export const useTextSplitter = (
  text: string,
  chunkSize: number,
  options: UseTextSplitterOptions = { isSmartSplit: false, delimiters: [] }
): UseTextSplitterResult => {
  return useMemo(() => {
    const normalizedText = normalizeLineEndings(text);
    const chunks = options.isSmartSplit
      ? smartSplit(normalizedText, chunkSize, options.delimiters)
      : splitByCodePoints(normalizedText, chunkSize);
    const totalCodePoints = countCodePoints(normalizedText);

    return {
      normalizedText,
      chunks,
      totalCodePoints,
    };
  }, [text, chunkSize, options.isSmartSplit, options.delimiters]);
};
