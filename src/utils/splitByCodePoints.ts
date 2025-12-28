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
 * コードポイント数をカウントする
 */
export const countCodePoints = (text: string): number => {
  return [...text].length;
};
