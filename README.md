# bemaru.github.io

검색과 장기 운영을 중심으로 설계한 개인 개발자 기술 블로그입니다. Astro 정적 사이트와 Markdown 콘텐츠를 Git으로 관리하고, Pull Request에서 전체 초안을 검증한 뒤 GitHub Pages로 배포합니다.

## 기술 구성

- Astro 7 + TypeScript
- Astro Content Collections + Markdown
- 제목·설명·태그·카테고리·시리즈 통합 검색
- 카테고리, 시리즈, 태그, 연도별 보관함
- 글 목차, 코드 복사, 관련 글, 이전·다음 글
- RSS, Sitemap, Canonical, Open Graph, Article/Breadcrumb JSON-LD
- Google·Naver 사이트 소유권 확인용 환경 변수
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

## 콘텐츠 구조

```text
src/content/
├─ posts/       기술 글
└─ projects/    프로젝트 사례
```

새 글 frontmatter:

```yaml
---
title: "글 제목"
description: "검색 결과와 글 목록에 표시할 설명"
publishedAt: 2026-08-25
updatedAt: 2026-08-25
category: ai-engineering
series:
  name: "Production AI Agent"
  slug: "production-ai-agent"
  order: 1
draft: true
featured: false
tags:
  - ai-agent
  - langgraph
---
```

카테고리는 다음 네 개만 사용합니다.

- `ai-engineering`
- `backend-search`
- `security-engineering`
- `engineering-practice`

기술과 도구는 태그로 관리하고, 관련 글이 두 개 이상일 때 시리즈로 연결합니다.

## 공개 원칙

1. 업무 원본과 기밀 초안은 비공개 저장소에서 관리합니다.
2. Public 저장소에는 외부 공개가 가능한 원고만 반영합니다.
3. `draft: true`는 사이트 노출만 차단하며 GitHub 원문은 숨기지 않습니다.
4. 게시일은 `publishedAt`, 실질적인 재검증일은 `updatedAt`으로 구분합니다.
5. CI에서는 `INCLUDE_DRAFTS=true`로 초안 상세 페이지까지 렌더링합니다.

## 검색 노출 설정

사이트는 RSS와 Sitemap을 자동 생성합니다.

- Google Search Console: `https://bemaru.github.io/sitemap-index.xml` 제출
- Naver Search Advisor: Sitemap과 `https://bemaru.github.io/rss.xml` 제출
- 저장소 환경 변수 `PUBLIC_GOOGLE_SITE_VERIFICATION`에 Google 확인 값 설정
- 저장소 환경 변수 `PUBLIC_NAVER_SITE_VERIFICATION`에 Naver 확인 값 설정

환경 변수는 GitHub Actions의 빌드 단계에 전달해야 실제 HTML에 포함됩니다. 현재 workflow에는 값이 없어도 빌드되도록 구성되어 있습니다.

## 광고 수익화 준비

현재 광고는 사용하지 않습니다. 충분한 원본 글과 검색 유입이 확보된 뒤 다음 순서로 적용합니다.

1. 개인정보 처리 안내를 실제 광고·분석 설정에 맞게 갱신
2. AdSense 사이트 심사 및 승인
3. `PUBLIC_ADSENSE_CLIENT` 환경 변수에 `ca-pub-...` 값 설정
4. 승인 후 발급된 게시자 정보로 `public/ads.txt` 추가
5. 광고는 글 본문에 제한적으로 배치하고 검색·404·소개 페이지에는 배치하지 않음

광고 수익이 블로그의 주목적이 되면 GitHub Pages보다 Cloudflare Pages/Workers 같은 상업적 운영에 더 명확한 정적 호스팅으로 이전하는 것을 검토합니다. 콘텐츠와 사이트가 정적 파일이므로 호스팅 이전에 구조 변경은 필요하지 않습니다.

## 배포

1. Pull Request의 CI가 `npm ci`와 `npm run validate`를 실행합니다.
2. CI 통과 후 `main`에 병합합니다.
3. `.github/workflows/deploy.yml`이 `main`을 GitHub Pages에 자동 배포합니다.
