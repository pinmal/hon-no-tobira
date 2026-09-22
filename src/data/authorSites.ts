// 著者×公式サイト マッピング（本のとびら → 各著者ブログへの相互リンク用）
// 対応サイトが無い著者（よつば=小説）は空配列を返す。
//
// ⚠️ planter-note のドメインは `planter-note.pages.dev`。
// 独自ドメイン `planter-note.dev` は未購入で到達不能（I-270）。絶対に書かないこと。

export interface AuthorSite {
  label: string;
  url: string;
}

const SITES: Record<string, { label: string; domain: string }> = {
  'shibainu-techo': { label: '柴犬手帳', domain: 'shibainu-techo.com' },
  'tsuri-navi': { label: 'つりナビ', domain: 'tsuriyoho.com' },
  'tsuri-camp': { label: 'やまちゃん日記', domain: 'tsuri-camp.com' },
  'jitan-kenko': { label: '時短健康ごはん', domain: 'jitan-kenko.blog' },
  'planter-note': { label: 'プランターノート', domain: 'planter-note.pages.dev' },
};

// 著者名 → 使用サイトキー一覧
const AUTHOR_SITE_KEYS: Record<string, string[]> = {
  '久保里奈': ['shibainu-techo'],
  '磯崎健太': ['tsuri-navi', 'tsuri-camp'],
  '磯崎健太 × 森山なつみ': ['tsuri-navi', 'tsuri-camp'],
  '佐藤けいすけ': ['tsuri-navi', 'tsuri-camp'],
  '田中しんじ': ['tsuri-navi', 'tsuri-camp'],
  'やまちゃん': ['tsuri-camp'],
  '河野大輔': ['tsuri-camp'],
  '宮本ユウカ': ['jitan-kenko'],
  '増田博之': ['planter-note'],
};

/**
 * 全サイトの一覧（トップページの静的リンクセクション用）。
 * モーダル内リンクはJS生成でクローラーが辿れないため、静的リンクの正本として使う。
 */
export const allAuthorSites: AuthorSite[] = Object.values(SITES).map((s) => ({
  label: s.label,
  url: `https://${s.domain}/?utm_source=hon-no-tobira&utm_medium=portal&utm_campaign=author-sites`,
}));

export function getAuthorSites(author: string, bookId: string): AuthorSite[] {
  const keys = AUTHOR_SITE_KEYS[author] ?? [];
  return keys.map((key) => {
    const site = SITES[key];
    return {
      label: site.label,
      url: `https://${site.domain}/kindle-guide/?utm_source=hon-no-tobira&utm_medium=portal&utm_campaign=${bookId}`,
    };
  });
}
