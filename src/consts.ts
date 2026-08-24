export const SITE_TITLE = 'bemaru';
export const SITE_NAME = 'bemaru 기술 블로그';
export const SITE_DESCRIPTION =
  '백엔드, 보안, AI Agent Engineering에서 직접 검증한 문제 해결 과정과 기술적 판단을 기록합니다.';
export const SITE_URL = 'https://bemaru.github.io';
export const GITHUB_URL = 'https://github.com/bemaru';
export const REPOSITORY_URL = 'https://github.com/bemaru/bemaru.github.io';

export const CATEGORY_SLUGS = [
  'ai-engineering',
  'backend-search',
  'security-engineering',
  'engineering-practice',
] as const;

export type CategorySlug = (typeof CATEGORY_SLUGS)[number];

export interface CategoryDefinition {
  slug: CategorySlug;
  name: string;
  description: string;
}

export const CATEGORIES: readonly CategoryDefinition[] = [
  {
    slug: 'ai-engineering',
    name: 'AI Engineering',
    description: 'AI Agent, MCP, RAG, 평가와 운영 경계를 다룹니다.',
  },
  {
    slug: 'backend-search',
    name: 'Backend & Search',
    description: 'Python, Go, OpenSearch와 서비스 아키텍처를 다룹니다.',
  },
  {
    slug: 'security-engineering',
    name: 'Security Engineering',
    description: 'EDR, Windows, 탐지 시스템과 보안 엔지니어링을 다룹니다.',
  },
  {
    slug: 'engineering-practice',
    name: 'Engineering Practice',
    description: '개발 도구, CI/CD, 트러블슈팅과 업무 방식을 다룹니다.',
  },
];
