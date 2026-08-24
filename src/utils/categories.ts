import {
  CATEGORIES,
  type CategoryDefinition,
  type CategorySlug,
} from '../consts';
import type { Post } from './content';

export function getCategory(slug: CategorySlug): CategoryDefinition {
  const category = CATEGORIES.find((item) => item.slug === slug);

  if (!category) {
    throw new Error(`정의되지 않은 카테고리입니다: ${slug}`);
  }

  return category;
}

export function getCategoryCount(posts: Post[], slug: CategorySlug): number {
  return posts.filter((post) => post.data.category === slug).length;
}

export function getPostsByCategory(posts: Post[], slug: CategorySlug): Post[] {
  return posts.filter((post) => post.data.category === slug);
}
