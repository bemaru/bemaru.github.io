---
title: "bemaru.github.io"
description: "Astro와 GitHub Pages로 구축한 콘텐츠 중심의 개인 개발자 블로그입니다."
period: "2026"
draft: false
featured: true
tags:
  - astro
  - typescript
  - github-actions
links:
  github: "https://github.com/bemaru/bemaru.github.io"
  demo: "https://bemaru.github.io"
---

## 문제

기술 기록을 여러 도구에 분산해 두면 공개 글로 정제하기 어렵고, 블로그 자체의 유지보수 비용이 콘텐츠 작성보다 커지기 쉽습니다. 서버와 CMS를 직접 운영하지 않으면서도 글의 구조와 디자인을 통제할 수 있는 구성이 필요했습니다.

## 선택

정적 사이트 생성기인 Astro와 GitHub Pages를 사용했습니다.

```text
Markdown
   ↓
Astro Content Collections
   ↓
GitHub Actions
   ↓
GitHub Pages
```

데이터베이스, 별도 백엔드와 CMS는 두지 않았습니다. 콘텐츠 스키마는 TypeScript 기반으로 검사하고, 게시일과 수정일, 초안 여부, 태그를 단일 규칙으로 관리합니다.

## 운영 경계

- 원본 업무 메모와 기밀 자료는 공개 저장소에 넣지 않습니다.
- Pull Request에서는 초안까지 렌더링해 깨진 페이지를 확인합니다.
- 실제 배포에서는 초안과 미래 날짜 글을 제외합니다.
- npm lockfile과 Dependabot으로 의존성 업데이트를 관리합니다.
- 검색, 댓글과 분석 도구는 필요성이 확인될 때까지 추가하지 않습니다.

## 결과

글 작성부터 검증, 배포까지의 흐름을 Git과 Markdown만으로 단순화했습니다. 사이트 기능을 늘리기보다 공개 가능한 기술 경험을 꾸준히 축적하는 데 초점을 맞춘 구성입니다.
