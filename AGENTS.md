# Text Splitter

長文をコードポイント単位で指定長に分割し、各チャンクをワンクリックでコピーできるWebアプリケーション。

## Core Commands

- 開発サーバー起動: `npm run dev`
- ビルド: `npm run build`
- プレビュー: `npm run preview`
- 型チェック & ビルド確認: `npm run build` (内部で `tsc` を実行)

## Project Layout

- `src/components/`: UIコンポーネント
  - `TextInput.tsx`: 長文入力
  - `ChunkSizeInput.tsx`: 分割数設定
  - `ChunkList.tsx`, `ChunkCard.tsx`: 分割結果表示とコピー
- `src/hooks/`: カスタムフック
  - `useTextSplitter.ts`: 分割ロジックの統合
  - `useClipboard.ts`: クリップボード操作とフィードバック
- `src/utils/`: ユーティリティ関数
  - `normalizeLineEndings.ts`: 改行コードのLF正規化
  - `splitByCodePoints.ts`: サロゲートペア対応のコードポイント分割
- `src/App.tsx`: メインエントリポイントと状態管理

## Development Patterns & Constraints

### 文字数カウントと分割
- 文字数は **Unicode code points** でカウントする。
- `String.length` ではなく `[...text].length` を使用すること。
- 改行コードは処理前に必ず `LF (\n)` に正規化する。

### スタイリング
- **Tailwind CSS 4.0** を使用。
- `vite.config.ts` に `@tailwindcss/vite` プラグインが設定されている。
- スタイル設定は `src/index.css` 内の `@import "tailwindcss";` 以降に記述する。

### 状態管理
- シンプルな `useState` と `useMemo` によるリアクティブな計算を優先する。
- チャンクの開閉状態などは各コンポーネント内で局所的に管理する。

## Git Workflow Essentials

- ベースブランチ: `main`
- デプロイ先: GitHub Pages (`/text-splitter/` プレフィックス)
- コミット前に `npm run build` で型エラーがないことを確認すること。
