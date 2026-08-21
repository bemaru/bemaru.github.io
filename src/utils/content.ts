import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'posts'>;
export type Project = CollectionEntry<'projects'>;

const includeDrafts =
  import.meta.env.DEV || import.meta.env.INCLUDE_DRAFTS === 'true';

export function isPublishedPost(post: Post, now = new Date()): boolean {
  return !post.data.draft && post.data.publishedAt <= now;
}

export function isPublishedProject(project: Project): boolean {
  return !project.data.draft;
}

export async function getPublishedPosts(): Promise<Post[]> {
  const posts = await getCollection('posts');
  return posts
    .filter((post) => isPublishedPost(post))
    .sort(
      (a, b) =>
        b.data.publishedAt.getTime() - a.data.publishedAt.getTime(),
    );
}

export async function getSitePosts(): Promise<Post[]> {
  const posts = await getCollection('posts');
  const visible = includeDrafts
    ? posts
    : posts.filter((post) => isPublishedPost(post));

  return visible.sort(
    (a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime(),
  );
}

export async function getSiteProjects(): Promise<Project[]> {
  const projects = await getCollection('projects');
  const visible = includeDrafts
    ? projects
    : projects.filter((project) => isPublishedProject(project));

  return visible.sort((a, b) => {
    if (a.data.featured !== b.data.featured) {
      return a.data.featured ? -1 : 1;
    }
    return a.data.title.localeCompare(b.data.title, 'ko-KR');
  });
}
