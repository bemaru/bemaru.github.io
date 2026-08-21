import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const posts = defineCollection({
  loader: glob({ base: './src/content/posts', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
    tags: z.array(z.string().min(1)).default([]),
    canonicalUrl: z.url().optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    period: z.string().min(1),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
    tags: z.array(z.string().min(1)).default([]),
    links: z
      .object({
        github: z.url().optional(),
        demo: z.url().optional(),
      })
      .optional(),
  }),
});

export const collections = { posts, projects };
