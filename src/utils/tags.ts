import type { Post } from './content';

export interface TagGroup {
  name: string;
  slug: string;
  posts: Post[];
}

export function slugify(value: string, label = '값'): string {
  const slug = value
    .trim()
    .normalize('NFKC')
    .toLocaleLowerCase('ko-KR')
    .replace(/\+/g, '-plus')
    .replace(/#/g, '-sharp')
    .replace(/[^\p{Letter}\p{Number}]+/gu, '-')
    .replace(/^-+|-+$/g, '');

  if (!slug) {
    throw new Error(`${label}을 URL로 변환할 수 없습니다: ${value}`);
  }

  return slug;
}

export function tagToSlug(tag: string): string {
  return slugify(tag, '태그');
}

export function collectTags(posts: Post[]): TagGroup[] {
  const groups = new Map<string, TagGroup>();

  for (const post of posts) {
    for (const name of post.data.tags) {
      const slug = tagToSlug(name);
      const current = groups.get(slug);

      if (current && current.name !== name) {
        throw new Error(
          `서로 다른 태그가 같은 URL을 사용합니다: ${current.name}, ${name}`,
        );
      }

      if (current) {
        current.posts.push(post);
      } else {
        groups.set(slug, { name, slug, posts: [post] });
      }
    }
  }

  return [...groups.values()].sort((a, b) =>
    a.name.localeCompare(b.name, 'ko-KR'),
  );
}
