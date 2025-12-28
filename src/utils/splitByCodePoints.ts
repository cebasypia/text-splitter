/**
 * テキストを N コードポイントごとに分割する
 */
export const splitByCodePoints = (text: string, n: number): string[] => {
  if (n < 1) return [];
  const chars = [...text]; // サロゲートペア対応
  const chunks: string[] = [];
  for (let i = 0; i < chars.length; i += n) {
    chunks.push(chars.slice(i, i + n).join(''));
  }
  return chunks;
};

/**
 * スマート分割: N コードポイント以内で、最後に現れる区切り文字で分割する
 */
export const smartSplit = (text: string, n: number, delimiters: string[]): string[] => {
  if (n < 1) return [];
  if (delimiters.length === 0) return splitByCodePoints(text, n);

  const chars = [...text];
  const chunks: string[] = [];
  let currentPos = 0;

  while (currentPos < chars.length) {
    // 残りが n 文字以内の場合はすべて追加
    if (currentPos + n >= chars.length) {
      chunks.push(chars.slice(currentPos).join(''));
      break;
    }

    const slice = chars.slice(currentPos, currentPos + n);
    const sliceStr = slice.join('');
    
    let bestSplitPos = -1; // コードポイント単位の分割位置

    for (const delimiter of delimiters) {
      const lastIdx = sliceStr.lastIndexOf(delimiter);
      if (lastIdx !== -1) {
        // 区切り文字の直後を分割位置とする
        const splitPosInChars = [...sliceStr.substring(0, lastIdx + delimiter.length)].length;
        if (splitPosInChars > bestSplitPos) {
          bestSplitPos = splitPosInChars;
        }
      }
    }

    if (bestSplitPos !== -1 && bestSplitPos > 0) {
      chunks.push(chars.slice(currentPos, currentPos + bestSplitPos).join(''));
      currentPos += bestSplitPos;
    } else {
      // 区切り文字が見つからない場合は固定長で分割
      chunks.push(chars.slice(currentPos, currentPos + n).join(''));
      currentPos += n;
    }
  }
  return chunks;
};

/**
 * コードポイント数をカウントする
 */
export const countCodePoints = (text: string): number => {
  return [...text].length;
};
