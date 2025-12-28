# Text Splitter アーキテクチャ設計書

## 概要

長文を指定文字数で分割し、各チャンクをワンクリックでコピーできるWebアプリケーション。

## 技術スタック

| カテゴリ | 技術 | バージョン目安 |
|---------|------|---------------|
| ビルドツール | Vite | 6.x |
| フレームワーク | React | 19.x |
| 言語 | TypeScript | 5.x |
| スタイリング | Tailwind CSS | 4.x |
| ホスティング | GitHub Pages | - |

## ディレクトリ構成

```
text-splitter/
├── src/
│   ├── components/
│   │   ├── TextInput.tsx          # 長文入力テキストエリア
│   │   ├── ChunkSizeInput.tsx     # 分割文字数入力フィールド
│   │   ├── ChunkList.tsx          # チャンク一覧コンテナ
│   │   ├── ChunkCard.tsx          # 個別チャンク表示カード
│   │   └── ClearButton.tsx        # 入力クリアボタン
│   ├── hooks/
│   │   ├── useTextSplitter.ts     # 分割ロジック統合フック
│   │   └── useClipboard.ts        # クリップボード操作フック
│   ├── utils/
│   │   ├── normalizeLineEndings.ts    # 改行コード正規化
│   │   └── splitByCodePoints.ts       # コードポイント単位分割
│   ├── App.tsx                    # メインアプリケーション
│   ├── main.tsx                   # エントリーポイント
│   └── index.css                  # グローバルスタイル（Tailwind）
├── public/
│   └── (静的ファイル)
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.js
```

## コンポーネント設計

### コンポーネント階層

```
App
├── TextInput
├── ChunkSizeInput
├── ClearButton
└── ChunkList
    └── ChunkCard (複数)
```

### 各コンポーネントの責務

| コンポーネント | 責務 |
|--------------|------|
| `App` | 状態管理、レイアウト統括 |
| `TextInput` | 長文入力、文字数表示 |
| `ChunkSizeInput` | 分割文字数N入力（デフォルト2000、1以上の整数） |
| `ClearButton` | 入力・結果の初期化 |
| `ChunkList` | チャンク一覧の表示 |
| `ChunkCard` | チャンク番号、文字数、プレビュー/全文表示、コピーボタン |

## ユーティリティ関数

### `normalizeLineEndings.ts`

改行コードをLFに統一する。

```typescript
export const normalizeLineEndings = (text: string): string => {
  return text.replace(/\r\n|\r/g, '\n');
};
```

### `splitByCodePoints.ts`

テキストをNコードポイントごとに分割する。

```typescript
export const splitByCodePoints = (text: string, n: number): string[] => {
  if (n < 1) return [];
  const chars = [...text]; // サロゲートペア対応
  const chunks: string[] = [];
  for (let i = 0; i < chars.length; i += n) {
    chunks.push(chars.slice(i, i + n).join(''));
  }
  return chunks;
};

export const countCodePoints = (text: string): number => {
  return [...text].length;
};
```

## カスタムフック

### `useTextSplitter.ts`

入力テキストと分割数を受け取り、正規化・分割・カウントを行う。

```typescript
interface UseTextSplitterResult {
  normalizedText: string;
  chunks: string[];
  totalCodePoints: number;
}

const useTextSplitter = (text: string, chunkSize: number): UseTextSplitterResult
```

### `useClipboard.ts`

クリップボードへのコピーとフィードバック管理。

```typescript
interface UseClipboardResult {
  copy: (text: string) => Promise<void>;
  copied: boolean;  // コピー成功フラグ（一定時間後にfalseに戻る）
  error: string | null;
}

const useClipboard = (): UseClipboardResult
```

## 状態管理

React の `useState` のみで管理（外部ライブラリ不要）。

| 状態 | 型 | 初期値 | 管理場所 |
|-----|-----|-------|---------|
| `inputText` | `string` | `''` | App |
| `chunkSize` | `number` | `2000` | App |
| `expandedChunks` | `Set<number>` | `new Set()` | ChunkList |

## データフロー

```
[ユーザー入力]
      ↓
[TextInput] → inputText 更新
      ↓
[useTextSplitter]
  1. normalizeLineEndings() で改行正規化
  2. splitByCodePoints() で分割
  3. countCodePoints() で文字数算出
      ↓
[ChunkList] → chunks を受け取り表示
      ↓
[ChunkCard] → コピーボタンクリック
      ↓
[useClipboard] → Clipboard API でコピー
      ↓
[フィードバック表示]
```

## GitHub Pages デプロイ設定

### vite.config.ts

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/text-splitter/', // リポジトリ名に合わせる
});
```

### デプロイ方法

1. `npm run build` で `dist/` 生成
2. GitHub Actions または手動で `gh-pages` ブランチにデプロイ

## 実装上の注意点

### コードポイントカウント

- `String.length` はUTF-16コードユニット数を返すため使用しない
- `[...text].length` または `Array.from(text).length` を使用する
- 例: `'𠮷'` → `String.length = 2`, `[...text].length = 1`

### Clipboard API

- HTTPS環境が必須（GitHub Pagesは対応済み）
- `navigator.clipboard.writeText()` を使用
- 非対応ブラウザ向けのフォールバックはMVPスコープ外

### パフォーマンス

- 入力変更のたびに再計算が走る
- 数万文字程度は問題ないが、必要に応じて `useMemo` で最適化

## 開発コマンド

```bash
# 依存インストール
npm install

# 開発サーバー起動
npm run dev

# ビルド
npm run build

# プレビュー
npm run preview
```
