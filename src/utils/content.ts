import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'posts'>;

const includeDrafts =
  import.meta.env.DEV || import.meta.env.INCLUDE_DRAFTS === 'true';

export function isPublishedPost(post: Post, now = new Date()): boolean {
  return !post.data.draft && post.data.publishedAt <= now;
}

function sortPosts(posts: Post[]): Post[] {
  return posts.sort(
    (a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime(),
  );
}

export async function getPublishedPosts(): Promise<Post[]> {
  const posts = await getCollection('posts');
  return sortPosts(posts.filter((post) => isPublishedPost(post)));
}

export async function getSitePosts(): Promise<Post[]> {
  const posts = await getCollection('posts');
  return sortPosts(
    includeDrafts ? posts : posts.filter((post) => isPublishedPost(post)),
  );
}

export function getRelatedPosts(
  current: Post,
  posts: Post[],
  limit = 3,
): Post[] {
  return posts
    .filter((post) => post.id !== current.id)
    .map((post) => {
      const commonTags = post.data.tags.filter((tag) =>
        current.data.tags.includes(tag),
      ).length;
      const sameCategory = post.data.category === current.data.category ? 4 : 0;
      const sameSeries =
        post.data.series?.slug &&
        post.data.series.slug === current.data.series?.slug
          ? 5
          : 0;

      return { post, score: commonTags * 2 + sameCategory + sameSeries };
    })
    .filter(({ score }) => score > 0)
    .sort(
      (a, b) =>
        b.score - a.score ||
        b.post.data.publishedAt.getTime() -
          a.post.data.publishedAt.getTime(),
    )
    .slice(0, limit)
    .map(({ post }) => post);
}

export function groupPostsByYear(posts: Post[]): Map<number, Post[]> {
  const groups = new Map<number, Post[]>();

  for (const post of posts) {
    const year = post.data.publishedAt.getFullYear();
    const current = groups.get(year) ?? [];
    current.push(post);
    groups.set(year, current);
  }

  return new Map([...groups.entries()].sort(([a], [b]) => b - a));
}
