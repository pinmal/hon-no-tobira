import type { APIRoute } from 'astro';
import dailyPosts from '../data/daily-posts.json';

export const GET: APIRoute = () => {
  const posts = (dailyPosts as { posts: Array<{ date: string; bookId: string; imageUrl: string; caption: string; hashtags: string[] }> }).posts;

  const items = posts
    .slice(0, 30)
    .map((post) => {
      const text = post.caption + '\n\n' + post.hashtags.map((h) => `#${h}`).join(' ');
      const pubDate = new Date(post.date + 'T09:00:00+09:00').toUTCString();
      const guid = `hon-no-tobira-${post.date}-${post.bookId}`;
      const escapedText = text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

      return `    <item>
      <title>${escapedText.slice(0, 80)}</title>
      <description>${escapedText}</description>
      <link>https://hon-no-tobira.pages.dev/</link>
      <guid isPermaLink="false">${guid}</guid>
      <pubDate>${pubDate}</pubDate>
      <enclosure url="${post.imageUrl}" type="image/jpeg" length="0"/>
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>本のとびら</title>
    <link>https://hon-no-tobira.pages.dev/</link>
    <description>Kindle本の紹介・毎日更新</description>
    <language>ja</language>
    <atom:link href="https://hon-no-tobira.pages.dev/rss.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
