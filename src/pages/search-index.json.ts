import { getCategory } from '../utils/categories';
import { getSitePosts } from '../utils/content';

export const prerender = true;

export async function GET() {
  const posts = await getSitePosts();
  const items = posts.map((post) => {
    const category = getCategory(post.data.category);

    return {
      title: post.data.title,
      description: post.data.description,
      url: `/writing/${post.id}/`,
      publishedAt: post.data.publishedAt.toISOString(),
      category: category.name,
      categorySlug: category.slug,
      series: post.data.series?.name ?? '',
      tags: post.data.tags,
    };
  });

  return new Response(JSON.stringify(items), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
