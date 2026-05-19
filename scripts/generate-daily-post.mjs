/**
 * generate-daily-post.mjs
 * 毎日 GitHub Actions から実行。JST日付でローテーションして daily-posts.json を更新する。
 *
 * caption-templates.json 構造:
 *   { "books": [{ "id": "book01", "title": "...", "patterns": [{ "caption":"...", "hashtags":["..."] }] }] }
 */

import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const root = join(__dirname, '..');

// ── データ読み込み ──────────────────────────────────────────────
const captionTemplates = JSON.parse(
  readFileSync(join(root, 'src/data/caption-templates.json'), 'utf-8')
);
const dailyPostsData = JSON.parse(
  readFileSync(join(root, 'src/data/daily-posts.json'), 'utf-8')
);

const books = captionTemplates.books;
const posts = dailyPostsData.posts;

if (!books || books.length === 0) {
  console.error('[error] caption-templates.json に books エントリがありません');
  process.exit(1);
}

// ── JST 今日の日付 ─────────────────────────────────────────────
const nowJst = new Date(Date.now() + 9 * 60 * 60 * 1000);
const today = nowJst.toISOString().slice(0, 10); // "YYYY-MM-DD"

// 当日分がすでに存在したらスキップ
if (posts.length > 0 && posts[0].date === today) {
  console.log(`[skip] Already posted for ${today}`);
  process.exit(0);
}

// ── 今日の書籍を epochDay でローテーション ─────────────────────
const epochDay = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
const todayBook = books[epochDay % books.length];
const todayBookId = todayBook.id;
const patterns = todayBook.patterns;

if (!patterns || patterns.length === 0) {
  console.error(`[error] ${todayBookId} のパターンが見つかりません`);
  process.exit(1);
}

// ── この書籍に対して最も使用回数が少ないパターンを選ぶ ──────────
// 履歴からこの書籍のパターン使用回数をカウント
const patternCount = new Array(patterns.length).fill(0);
for (const post of posts) {
  if (post.bookId === todayBookId && typeof post.patternIndex === 'number') {
    if (post.patternIndex < patterns.length) {
      patternCount[post.patternIndex]++;
    }
  }
}
// 最小使用回数のパターンを選択（同数なら先頭優先）
const minCount = Math.min(...patternCount);
const patternIndex = patternCount.indexOf(minCount);
const template = patterns[patternIndex];

// ── GitHub Raw 画像URL を構築 ────────────────────────────────────
const imageUrl = `https://raw.githubusercontent.com/pinmal/hon-no-tobira/main/public/covers/${todayBookId}.jpg`;

// ── 新エントリを先頭に追加 ────────────────────────────────────
const newPost = {
  date: today,
  bookId: todayBookId,
  patternIndex,
  imageUrl,
  caption: template.caption,
  hashtags: template.hashtags,
};

const updatedPosts = [newPost, ...posts].slice(0, 60); // 60件を上限に保持

writeFileSync(
  join(root, 'src/data/daily-posts.json'),
  JSON.stringify({ posts: updatedPosts }, null, 2) + '\n',
  'utf-8'
);

console.log(`[ok] ${today} | book: ${todayBookId}(${todayBook.title}) | pattern[${patternIndex}]`);
