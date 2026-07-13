// 著者×公式サイト マッピング（本のとびら → 各著者ブログへの相互リンク用）
// 対応サイトが無い著者（増田博之=園芸／よつば=小説）は空配列を返す。

export interface AuthorSite {
  label: string;
  url: string;
}

const SITES: Record<string, { label: string; domain: string }> = {
  'shibainu-techo': { label: '柴犬手帳', domain: 'shibainu-techo.com' },
  'tsuri-navi': { label: 'つりナビ', domain: 'tsuriyoho.com' },
  'tsuri-camp': { label: 'やまちゃん日記', domain: 'tsuri-camp.com' },
  'jitan-kenko': { label: '時短健康ごはん', domain: 'jitan-kenko.blog' },
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
};

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
