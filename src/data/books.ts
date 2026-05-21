export type Genre = '釣り' | 'キャンプ' | '料理' | '園芸' | '健康・生活' | '犬';

export interface Book {
  id: string;
  title: string;
  author: string;
  genre: Genre;
  asin: string | null;
  price: number | null;
  cover: string;
  description: string;
}

// Amazon tag: hon-no-tobira 用に新規登録後に差し替え
const TAG = 'honnotobira-22';

export function amazonUrl(asin: string): string {
  return `https://www.amazon.co.jp/dp/${asin}?tag=${TAG}`;
}

export const books: Book[] = [
  {
    id: 'book01',
    title: '堤防・磯で釣れる魚まるごと活用ガイド',
    author: '磯崎健太 × 森山なつみ',
    genre: '釣り',
    asin: 'B0GZH865TV',
    price: null,
    cover: '/covers/book01.jpg',
    description: '釣れた魚を無駄なく楽しむ。さばき方・料理レシピ・保存法まで網羅した堤防釣り×料理の決定版。',
  },
  {
    id: 'book02',
    title: '軽バン×釣りキャンプの始め方',
    author: 'やまちゃん',
    genre: 'キャンプ',
    asin: 'B0GZH17YKR',
    price: null,
    cover: '/covers/book02.jpg',
    description: '軽バンひとつで釣りとキャンプを両立する装備・車中泊・釣り場選びの実践ガイド。',
  },
  {
    id: 'book03',
    title: '焚き火で作るキャンプ飯入門',
    author: '河野大輔',
    genre: 'キャンプ',
    asin: 'B0GZH9XWZ7',
    price: null,
    cover: '/covers/book03.jpg',
    description: '焚き火調理の基本から本格レシピまで。ダッチオーブン不要・道具ミニマムで作れるキャンプ飯。',
  },
  {
    id: 'book04',
    title: '柴犬の育て方完全ガイド',
    author: '久保里奈',
    genre: '犬',
    asin: 'B0GZCKGNFG',
    price: null,
    cover: '/covers/book04.jpg',
    description: '柴犬の性格・しつけ・健康管理・お手入れ。初めて柴犬を迎える飼い主のための完全ガイド。',
  },
  {
    id: 'book05',
    title: 'プランター菜園完全入門',
    author: '増田博之',
    genre: '園芸',
    asin: 'B0GX32VS2T',
    price: null,
    cover: '/covers/book05.jpg',
    description: 'ベランダ・玄関先のプランターで始める家庭菜園。初心者が失敗しない育て方を季節別に解説。',
  },
  {
    id: 'book06',
    title: '帰宅22時からでも続けられる一人暮らし時短メシ',
    author: '宮本ユウカ',
    genre: '健康・生活',
    asin: 'B0GY1BZ91Y',
    price: null,
    cover: '/covers/book06.jpg',
    description: '帰宅後20分以内で作れる時短レシピ集。忙しい社会人のための疲れない自炊習慣ガイド。',
  },
  {
    id: 'book10',
    title: 'エギング入門完全ガイド',
    author: '磯崎健太',
    genre: '釣り',
    asin: 'B0H16NMYGC',
    price: 399,
    cover: '/covers/book10.jpg',
    description: '春秋2シーズンのアオリイカを完全攻略。タックル選び・シャクリ方・さばき方まで初心者向けに解説。',
  },
  {
    id: 'book13',
    title: '週末2時間で作り置き60選',
    author: '宮本ユウカ',
    genre: '健康・生活',
    asin: 'B0GX32M6WX',
    price: null,
    cover: '/covers/book13.jpg',
    description: '週末2時間の作り置きで平日をラクに乗り切る。冷蔵・冷凍対応の60レシピを収録。',
  },
  {
    id: 'book23',
    title: '子連れ釣り 安全・楽しい釣り場選び全国ガイド',
    author: '田中しんじ',
    genre: '釣り',
    asin: 'B0GX2ZRF9R',
    price: 499,
    cover: '/covers/book23.jpg',
    description: '子どもが「また行きたい」と言う釣行の秘訣。釣り場選びの判断軸から全国おすすめポイントまで。',
  },
  {
    id: 'book25',
    title: 'ポータブル電源 釣りキャンプ完全比較ガイド',
    author: 'やまちゃん',
    genre: 'キャンプ',
    asin: 'B0GZZT677T',
    price: 449,
    cover: '/covers/book25.jpg',
    description: 'Jackery・EcoFlow・BLUETTIを徹底比較。釣りキャンプの電源選びで失敗しないための完全ガイド。',
  },
  {
    id: 'book26',
    title: 'サーフフィッシング入門 ヒラメ・マゴチを砂浜から狙う完全ガイド',
    author: '磯崎健太',
    genre: '釣り',
    asin: 'B0GYQ8MZC4',
    price: 350,
    cover: '/covers/book26.jpg',
    description: '玄界灘アングラーが教えるヒラメ・マゴチ攻略法。離岸流の読み方・ルアー選び・砂浜地形の活かし方を初心者向けに解説。',
  },
  {
    id: 'book28',
    title: 'パパと子どもの釣り料理入門 釣れた魚を一緒に調理する30レシピ',
    author: '田中しんじ',
    genre: '料理',
    asin: 'B0H19KX34P',
    price: null,
    cover: '/covers/book28.jpg',
    description: '釣ってきた魚を親子で調理する30レシピ。子どもでも安全にできる手順を丁寧に解説。',
  },
  {
    id: 'book31',
    title: 'タイラバ入門 マダイを船から狙う基本と応用',
    author: '磯崎健太',
    genre: '釣り',
    asin: 'B0H1YXFF8N',
    price: 499,
    cover: '/covers/book31.jpg',
    description: '釣り歴38年・タイラバ釣行170回超のベテランが教えるマダイ攻略法。タックル選びからフォール技術まで初心者が最短で結果を出す完全ガイド。',
  },
  {
    id: 'book35',
    title: 'タコ釣り入門 陸っぱりで狙う夏のマダコ',
    author: '磯崎健太',
    genre: '釣り',
    asin: 'B0H22ZRCD2',
    price: 499,
    cover: '/covers/book35.jpg',
    description: '堤防・テトラから始めるマダコ攻略バイブル。アタリの取り方からタコエギ選び・下処理まで、シーズン直前に読んでおきたい完全入門ガイド。',
  },
  {
    id: 'book37',
    title: '健康診断の数値を食事で改善する コレステロール・血糖値対策',
    author: '宮本ユウカ',
    genre: '健康・生活',
    asin: 'B0H24395ZM',
    price: 499,
    cover: '/covers/book37.jpg',
    description: '帰宅22時・コンビニ生活でも続けられる。忙しい社会人がコレステロール・血糖値を食事で改善するための実践的な「食事設計」ガイド。',
  },
  {
    id: 'book36',
    title: '夜焚きイカ釣り入門 スルメイカ・ヤリイカを船で狙う',
    author: '磯崎健太',
    genre: '釣り',
    asin: 'B0H27HZCSP',
    price: 499,
    cover: '/covers/book36.jpg',
    description: '集魚灯の下で連発する！プラヅノ仕掛けと電動リールの基本から実釣テクニックまで。夜焚きイカ釣行90回超のベテランが教える完全入門ガイド。',
  },
];

export const genres: Genre[] = ['釣り', 'キャンプ', '料理', '健康・生活', '犬', '園芸'];
