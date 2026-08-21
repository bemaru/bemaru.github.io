# bemaru.github.io

Astro로 구축한 개인 개발자 블로그입니다. Markdown 콘텐츠를 Git으로 관리하고, Pull Request에서 검증한 뒤 GitHub Pages로 정적 배포합니다.

## 기술 구성

- Astro 7 + TypeScript
- Astro Content Collections
- Markdown
- RSS, Sitemap, Open Graph, JSON-LD
- GitHub Actions CI + GitHub Pages
- 별도 서버, 데이터베이스, CMS 없음

## 로컬 실행

Node.js 24와 npm 11을 사용합니다.

```bash
npm ci
npm run dev
```

검증과 프로덕션 빌드:

```bash
npm run validate
npm run preview
```

## 글 작성

`src/content/posts/` 아래에 Markdown 파일을 추가합니다.

```yaml
---
title: "글 제목"
description: "목록과 검색 결과에 표시할 설명"
publishedAt: 2026-08-21
updatedAt: 2026-08-21
draft: true
featured: false
tags:
  - ai-agent
  - architecture
---
```

- `publishedAt`: 최초 작성 또는 게시 날짜
- `updatedAt`: 내용을 실질적으로 수정한 마지막 날짜
- Git 커밋 날짜와 게시 날짜는 서로 독립적입니다.
- 과거 글을 옮길 때 원래 날짜를 `publishedAt`으로 지정할 수 있습니다.
- 미래 날짜와 `draft: true` 글은 실제 배포에서 제외됩니다.

로컬 개발과 CI에서는 초안도 렌더링해 문법과 레이아웃을 검증합니다.

## 프로젝트 작성

`src/content/projects/` 아래에 Markdown 파일을 추가합니다.

```yaml
---
title: "프로젝트 이름"
description: "프로젝트 한 줄 설명"
period: "2026"
draft: true
featured: false
tags:
  - astro
links:
  github: "https://github.com/bemaru/example"
---
```

## 운영 원칙

1. 원본 업무 메모와 기밀 자료는 개인 저장소에서 관리합니다.
2. 공개 가능한 내용만 이 저장소로 옮깁니다.
3. `draft`는 사이트 노출 여부만 제어합니다. Public 저장소에서는 초안 원문도 GitHub에서 볼 수 있습니다.
4. 검색, 댓글, 방문 분석은 실제 필요가 확인된 뒤 추가합니다.
5. 의존성은 lockfile과 Dependabot으로 관리합니다.

## 배포

1. GitHub 저장소의 `Settings > Pages`에서 Source를 **GitHub Actions**로 지정합니다.
2. Pull Request의 CI가 통과한 뒤 `main`에 병합합니다.
3. `main` 반영 시 `.github/workflows/deploy.yml`이 사이트를 자동 배포합니다.
