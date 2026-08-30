import type { Post } from './content';

export interface SeriesGroup {
  name: string;
  slug: string;
  posts: Post[];
}

export function collectSeries(posts: Post[]): SeriesGroup[] {
  const groups = new Map<string, SeriesGroup>();
  const orderKeys = new Map<string, Set<number>>();

  for (const post of posts) {
    const series = post.data.series;
    if (!series) continue;

    const current = groups.get(series.slug);
    if (current && current.name !== series.name) {
      throw new Error(
        `같은 시리즈 slug에 서로 다른 이름이 지정되었습니다: ${series.slug}`,
      );
    }

    const orders = orderKeys.get(series.slug) ?? new Set<number>();
    if (orders.has(series.order)) {
      throw new Error(
        `시리즈 순서가 중복되었습니다: ${series.name} #${series.order}`,
      );
    }
    orders.add(series.order);
    orderKeys.set(series.slug, orders);

    if (current) {
      current.posts.push(post);
    } else {
      groups.set(series.slug, {
        name: series.name,
        slug: series.slug,
        posts: [post],
      });
    }
  }

  for (const group of groups.values()) {
    group.posts.sort((a, b) => {
      const orderDiff =
        (a.data.series?.order ?? 0) - (b.data.series?.order ?? 0);
      return (
        orderDiff ||
        a.data.publishedAt.getTime() - b.data.publishedAt.getTime()
      );
    });
  }

  return [...groups.values()].sort((a, b) =>
    a.name.localeCompare(b.name, 'ko-KR'),
  );
}
