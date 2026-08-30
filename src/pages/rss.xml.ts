import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';
import { getCategory } from '../utils/categories';
import { getPublishedPosts } from '../utils/content';

export async function GET(context: APIContext) {
  const posts = await getPublishedPosts();

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site ?? 'https://bemaru.github.io',
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.publishedAt,
      link: `/writing/${post.id}/`,
      categories: [
        getCategory(post.data.category).name,
        ...post.data.tags,
      ],
    })),
    customData: '<language>ko-KR</language>',
  });
}
