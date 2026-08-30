import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { CATEGORY_SLUGS } from './consts';

const seriesSchema = z.object({
  name: z.string().min(1),
  slug: z
    .string()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, '시리즈 slug는 영문 소문자와 하이픈만 사용합니다.'),
  order: z.number().int().positive(),
});

const posts = defineCollection({
  loader: glob({ base: './src/content/posts', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    category: z.enum(CATEGORY_SLUGS),
    series: seriesSchema.optional(),
    draft: z.boolean(),
    featured: z.boolean().default(false),
    tags: z.array(z.string().min(1)).default([]),
    canonicalUrl: z.url().optional(),
  }),
});

export const collections = { posts };
