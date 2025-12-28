/**
 * 改行コードを LF (\n) に正規化する
 */
export const normalizeLineEndings = (text: string): string => {
  return text.replace(/\r\n|\r/g, '\n');
};
