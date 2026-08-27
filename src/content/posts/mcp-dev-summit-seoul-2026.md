---
title: "MCP Dev Summit Seoul 2026 후기: 연결 이후의 설계와 운영"
description: "MCP Dev Summit Seoul 2026에서 들은 도구 설계, 실행 경계, Skills와 에이전트 평가 이야기. MCP를 어디에 쓰고 어떻게 운영할지 다시 생각해 본 참가 후기입니다."
publishedAt: 2026-08-27
category: ai-engineering
draft: true
featured: false
tags:
  - mcp
  - ai-agent
  - agent-skills
  - conference
---

8월 13일부터 14일까지 그랜드 인터컨티넨탈 서울 파르나스에서 열린 [MCP Dev Summit Seoul 2026](https://events.linuxfoundation.org/mcp-dev-summit-seoul/)에 다녀왔습니다. MCP 생태계와 AI 에이전트의 설계·운영 사례를 다룬 개발자 행사였습니다.

개인적으로는 에이전트를 개발하면서 고민했던 MCP의 적용 범위, 도구 설계, 기존 API를 MCP 도구로 전환하는 과정이 여러 발표의 주제와 맞닿아 있어 반가웠습니다. 비슷한 문제를 다른 팀은 어떻게 풀고 있는지 비교해 볼 수 있었습니다.

제가 들은 세션에서는 연결을 만든 다음의 이야기가 많이 나왔습니다. 어떤 기능을 노출할지, 누가 실행할 수 있는지, 실패했을 때 어떻게 복구하고 변경 결과를 검증할지에 관한 내용입니다. 그중 개발하면서 다시 꺼내 보고 싶은 관점을 중심으로 정리했습니다.

## MCP가 필요한지부터 묻기

MCP 행사에서 기억에 남은 이야기 중 하나는 모든 기능을 MCP로 만들 필요는 없다는 것이었습니다.

Daniel Oh(Red Hat)의 [The 5 Wrong Reasons to Build an MCP Server (And What to Do Instead)](https://mcpseoul2026.sched.com/event/2Rfp5/the-5-wrong-reasons-to-build-an-mcp-server-and-what-to-do-instead-daniel-oh-red-hat)는 MCP의 이점과 구현·운영 비용을 함께 봐야 한다는 내용이었습니다. 단일 에이전트의 단순한 함수 호출이나 이미 잘 동작하는 백엔드 접근까지 새로 감쌀 이유가 있는지 먼저 묻습니다.

Junho Kong(SK On)의 [When Does an Agentic Workflow Need MCP?](https://mcpseoul2026.sched.com/event/2PZo6/when-does-an-agentic-workflow-need-mcp-matching-intelligence-and-interfaces-to-the-outcome-junho-kong-sk-on)도 비슷한 질문을 다른 각도에서 다뤘습니다. 원하는 결과와 사용 방식을 먼저 정하고, 그에 맞는 인터페이스를 고르자는 접근입니다.

두 발표를 듣고 제가 남긴 구분은 다음과 같습니다.

| 필요한 것 | 먼저 검토할 수단 |
| --- | --- |
| 코드를 작성하고 실행하며 아직 모르는 문제를 탐색하기 | 코딩 에이전트 |
| 검증된 방법을 정해진 입력으로 반복하기 | 버전 관리되는 템플릿 |
| 호출자와 작업 방식이 정해진 기능을 실행하기 | API·CLI |
| 상태를 보존하며 중단·재개하고 사람의 승인을 기다리기 | 워크플로 엔진 |
| 여러 AI 애플리케이션이 공통 기능을 발견하고 호출하기 | MCP |

이 구분은 반드시 순서대로 밟아야 하는 단계는 아닙니다. 워크플로 엔진을 API나 MCP 뒤에 둘 수도 있고, 기존 API의 일부 기능만 MCP로 제공할 수도 있습니다. 상태나 승인 관리가 필요하다는 사실만으로 MCP가 필요한 것은 아니라는 점도 구분해 두려고 합니다.

## 도구를 에이전트의 작업 흐름에 맞추기

Nimit Savant와 Gokul K S(DevRev)의 [From 40 Tools To 14: A Practical Framework for MCP Tool Curation](https://mcpseoul2026.sched.com/event/2PYeE/from-40-tools-to-14-a-practical-framework-for-mcp-tool-curation-nimit-savant-gokul-k-s-devrev)는 제목부터 눈에 들어왔습니다.

핵심은 도구 개수를 줄이는 과정에서 API의 객체·엔드포인트 중심 구조를 에이전트의 의도와 작업 흐름에 맞게 다시 구성했다는 점입니다. 비슷한 조회 도구를 계속 나열하면 에이전트는 어느 도구를 골라야 하는지 추측하고, 판단에 필요한 맥락을 얻기 위해 추가 호출을 반복하게 됩니다.

발표에서는 `Search → Context → Act`로 역할을 나눴습니다. 검색은 후보와 다음 판단에 필요한 단서를, 맥락 조회는 관련 정보까지 포함한 상황을, 실행은 원하는 결과에 맞춘 작업을 제공하는 식입니다. 도구 설명에도 무엇을 하는지만 적지 않고 언제 써야 하며 어떤 판단 근거를 얻을 수 있는지 담았습니다.

같은 연사들의 [The Context Budget Crisis: Why MCP Needs Server-Side Response Controls](https://mcpseoul2026.sched.com/event/2PYdA/the-context-budget-crisis-why-mcp-needs-server-side-response-controls-nimit-savant-gokul-k-s-devrev)는 응답 설계로 이어졌습니다. 지금 쓰지 않을 스키마를 모두 올리거나 불필요한 필드까지 반환하면, 정작 판단에 쓸 컨텍스트가 줄어듭니다. 필요한 스키마를 나중에 불러오고 서버에서 응답 필드와 집계 결과를 선별하는 접근을 소개했습니다.

제게는 도구 목록과 응답을 함께 검토해야 한다는 점이 남았습니다. 도구를 합쳤더라도 응답이 지나치게 크거나 의미가 모호하면 문제는 남습니다. 14라는 개수 자체를 목표로 삼기보다는, 도구를 고르고 결과를 해석하는 과정에서 에이전트가 얼마나 추측해야 하는지 살펴보고 싶습니다.

## 판단을 유보할 수 있는 실행 구조

Sunyoung Park(KC-ML2)의 [Stop Wrapping APIs: Building Structured Execution Boundaries With MCP for Incident Triage](https://mcpseoul2026.sched.com/event/2PYeW/stop-wrapping-apis-building-structured-execution-boundaries-with-mcp-for-incident-triage-sunyoung-park-kc-ml2)는 필요한 근거를 모으고 정책을 확인한 뒤, 허용된 범위 안에서 결과를 내는 실행 경계를 다뤘습니다. 이 세션은 시작 직후부터 참석했고, 공개 발표 자료도 함께 확인했습니다.

특히 요청한 기간의 데이터가 부족할 때 `INDETERMINATE`, 즉 판단 불가를 반환한 데모가 기억에 남습니다. 근거가 없는 부분을 자연스러운 설명으로 채우지 않고, 판단할 수 없는 상태를 결과로 표현했습니다.

Aram Andreasyan(Cerbos)의 [Authorization in MCP Systems: Getting It Right From the Start](https://mcpseoul2026.sched.com/event/2PYd1/authorization-in-mcp-systems-getting-it-right-from-the-start-aram-andreasyan-cerbos)에서는 도구를 발견할 권한과 실제로 호출할 권한을 나눠 봤습니다. 도구 이름만 허용해도 끝나는 것이 아니라, 호출 인자에 담긴 대상과 범위를 실행 시점에 확인해야 한다는 내용입니다. 이 세션은 종료 직전까지 부분 참석했습니다.

실행 이후의 상태도 별개의 문제였습니다. Nasiullha Chaudhari(YugabyteDB)의 [Stateful AI Agents: Building Consistent Systems with MCP and Distributed SQL](https://mcpseoul2026.sched.com/event/2TLPA/stateful-ai-agents-building-consistent-systems-with-mcp-and-distributed-sql-nasiullha-chaudhari-yugabytedb)는 타임아웃 뒤 재시도가 중복 실행을 만들 수 있다는 사례를 다뤘습니다. 응답을 못 받았다고 해서 작업이 실행되지 않았다고 단정할 수는 없습니다. 실행 의도와 결과를 보존하고, 재시도해도 같은 작업이 중복 반영되지 않도록 멱등성을 설계해야 합니다.

이 세션들을 함께 떠올리면, 에이전트가 좋은 답을 내는 것과 실제 시스템을 변경해도 되는 것은 따로 확인해야 할 문제였습니다. 근거의 충분함, 호출 권한, 승인 여부, 이전 실행 결과를 각각 확인할 책임이 필요하다고 느꼈습니다.

## Skills와 MCP를 함께 쓰는 기준

Dale Seo(Apollo GraphQL)의 [Skills and MCP: Complementary, Not Competing](https://mcpseoul2026.sched.com/event/2PYdk/skills-and-mcp-complementary-not-competing-dale-seo-apollo-graphql)는 두 방식을 함께 활용하는 관점을 설명했습니다. 전반부에 참석했고, 이동 후 듣지 못한 내용은 공개 발표 자료로 보완했습니다.

이 발표에서는 MCP를 실제 시스템의 기능과 데이터에 접근하는 수단으로, Skills를 그 도구를 올바르게 사용하는 절차와 전문 지식으로 구분했습니다. 실시간 상태나 인증이 필요한 작업은 MCP로 연결하고, 비교적 오래 유지되는 지식과 작업 규칙은 Skill로 제공하는 방식입니다.

공개 자료의 장애 회고 예시도 이 구분을 이해하는 데 도움이 됐습니다. 여러 서비스에서 현재 근거를 가져오는 기능과, 그 근거를 모아 대조하고 회고 문서를 작성하는 절차는 서로 다른 역할입니다. 어느 정보를 어디에 둘지 정할 때 정보의 변화 속도와 실행 위치를 함께 살펴볼 수 있겠다고 생각했습니다.

## 에이전트의 변경도 리뷰 가능한 코드로

Navtej Reddy(Observe.ai)의 [Why We Made Our AI Agent Platform a Codebase Before Adding MCP](https://mcpseoul2026.sched.com/event/2PYdn/why-we-made-our-ai-agent-platform-a-codebase-before-adding-mcp-navtej-reddy-observeai)는 에이전트 구성을 코드로 관리한 사례였습니다.

프롬프트와 도구, 대화 흐름을 버전 관리되는 파일로 두고, 에이전트가 만든 변경도 브랜치에서 작업한 뒤 시뮬레이션과 자동 평가를 거쳐 사람이 검토할 PR로 올리는 구조를 소개했습니다. 이렇게 하면 무엇을 바꿨는지 비교하고, 변경 이유를 남기며, 문제가 생겼을 때 되돌릴 수 있습니다.

인상적이었던 점은 에이전트가 스스로 변경하고 검증하더라도 리뷰 가능한 형태로 결과를 남긴다는 것이었습니다. 프롬프트를 조금 고쳤다는 이유로 가볍게 볼 수는 없습니다. 도구 선택이나 실행 순서가 달라질 수 있는 만큼, 변경 전후를 비교할 시나리오와 회귀 검증이 필요하다는 생각이 들었습니다.

## 돌아와서 남긴 질문들

개인적으로는 MCP의 가능성과 함께 실제 운영의 한계, 선택 기준을 들을 수 있어서 좋았습니다. 에이전트를 개발하며 고민했던 문제를 여러 사례에 비춰 볼 수 있었고, MCP를 붙인 다음 무엇을 확인해야 하는지도 조금 더 구체적으로 정리됐습니다.

다음에 비슷한 기능을 설계할 때는 이 세 가지를 먼저 확인해 보려고 합니다.

1. **이 기능을 누가, 어떤 방식으로 반복해서 사용할 것인가?** 기존 API나 CLI로 충분한지, 여러 에이전트가 공통으로 발견하고 호출할 인터페이스가 필요한지 확인합니다.
2. **에이전트가 추측해야 하는 부분은 어디인가?** 도구 선택, 입력의 의미, 응답 해석과 실패 처리에서 계약이 모호한 곳을 찾습니다.
3. **실행과 변경을 어떻게 검증할 것인가?** 권한과 승인, 중복 실행 방지, 실행 기록, 평가와 리뷰까지 함께 생각합니다.

이번 후기는 참석한 세션과 공개 자료에서 얻은 관점을 정리한 것입니다. 각 발표의 방법이 제 환경에서도 같은 효과를 낼지는 별도로 검증해야 합니다. 그래도 다음 설계에서 무엇을 질문하고 확인할지 기준을 얻었다는 점에서 의미 있는 이틀이었습니다.

## 발표 자료와 영상

전체 프로그램과 공개 슬라이드는 [공식 일정표](https://mcpseoul2026.sched.com/)에서 확인할 수 있습니다. [행사 공식 페이지](https://events.linuxfoundation.org/mcp-dev-summit-seoul/)에는 다음 영상 링크도 안내되어 있습니다.

- [Day 1 라이브스트림](https://www.youtube.com/watch?v=DMFDb1GCjKY)
- [Day 2 라이브스트림](https://www.youtube.com/watch?v=VSLSiW5JPAs)
- [Agentic AI Foundation YouTube 채널](https://www.youtube.com/@AgenticAI-Foundation)

슬라이드와 녹화 공개 여부는 세션마다 다를 수 있습니다. 관심 있는 발표의 상세 페이지와 채널을 함께 살펴보면 좋겠습니다.
