import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

test('homepage renders the restrained list-first structure', () => {
  const home = read('dist/index.html');
  const manifest = read('public/site.webmanifest');

  assert.match(home, /<title>bemaru<\/title>/);
  assert.equal(JSON.parse(manifest).name, 'bemaru');
  assert.match(home, /<h1[^>]*>글<\/h1>/);
  assert.doesNotMatch(home, /class="[^"]*blog-hero/);
  assert.doesNotMatch(home, /class="[^"]*search-form/);
  assert.doesNotMatch(home, /class="[^"]*hero-meta/);
});

test('post summaries contain only date, title, and description', () => {
  const postCard = read('src/components/PostCard.astro');

  assert.match(postCard, /FormattedDate/);
  assert.match(postCard, /post\.data\.title/);
  assert.match(postCard, /post\.data\.description/);
  assert.doesNotMatch(postCard, /getCategory|category-label|TagList|status-badge/);
});

test('article keeps a mobile table of contents', () => {
  const postLayout = read('src/layouts/PostLayout.astro');

  assert.match(postLayout, /<details class="mobile-toc">/);
  assert.match(postLayout, /aria-label="모바일 목차"/);
});

test('narrow viewports are not forced wider than their content area', () => {
  const styles = read('src/styles/global.css');

  assert.doesNotMatch(styles, /body\s*\{[^}]*min-width:\s*320px/s);
});

test('approved copy and summit evidence remain intact', () => {
  const about = read('dist/about/index.html');
  const post = read('src/content/posts/mcp-dev-summit-seoul-2026.md');

  assert.match(about, /개발자 bemaru입니다/);
  assert.match(about, /보안 제품의 백엔드와 AI 에이전트를 개발하고 있습니다/);
  assert.match(post, /publishedAt: 2026-08-21/);
  assert.match(post, /draft: true/);
  assert.equal((post.match(/^!\[/gm) ?? []).length, 8);
  assert.equal(existsSync(new URL('../src/content/posts/restarting-developer-blog.md', import.meta.url)), false);
  assert.equal(existsSync(new URL('../src/content/projects/developer-blog.md', import.meta.url)), false);
});

test('unused project feature is removed', () => {
  const contentConfig = read('src/content.config.ts');
  const contentUtils = read('src/utils/content.ts');
  const removedFiles = [
    'src/components/ProjectCard.astro',
    'src/layouts/ProjectLayout.astro',
    'src/pages/projects/index.astro',
    'src/pages/projects/[...id].astro',
    'dist/projects/index.html',
  ];

  for (const path of removedFiles) {
    assert.equal(existsSync(new URL(`../${path}`, import.meta.url)), false, path);
  }

  assert.doesNotMatch(contentConfig, /const projects|posts, projects/);
  assert.doesNotMatch(contentUtils, /type Project|getSiteProjects|isPublishedProject/);
});
