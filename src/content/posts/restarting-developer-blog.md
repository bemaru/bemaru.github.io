---
title: "[샘플] 기술 글 레이아웃 검증"
description: "CI에서 글 상세, 카테고리, 시리즈, 태그와 목차를 검증하기 위한 비공개 샘플입니다."
publishedAt: 2026-08-21
updatedAt: 2026-08-25
category: engineering-practice
series:
  name: "블로그 운영"
  slug: "blog-operations"
  order: 1
draft: true
featured: false
tags:
  - astro
  - github-pages
  - sample
---

> 이 문서는 사이트의 빌드와 레이아웃을 검증하기 위한 샘플이며 실제 공개 글이 아닙니다.

## 문제

기술 블로그는 글 목록뿐 아니라 본문, 목차, 코드 블록, 표와 내부 탐색이 함께 검증되어야 합니다.

## 접근

콘텐츠 스키마를 하나로 고정하고 Pull Request에서 초안까지 정적 빌드합니다.

```ts
const workflow = ['write', 'review', 'build', 'publish'];
```

## 검증 항목

| 항목 | 기준 |
| --- | --- |
| 본문 | Markdown 렌더링 |
| 탐색 | 카테고리·시리즈·태그 |
| 검색 | 제목·설명·분류 검색 |
| 배포 | GitHub Actions 성공 |

## 결론

실제 글은 공개 가능한 원고만 별도로 추가합니다.
