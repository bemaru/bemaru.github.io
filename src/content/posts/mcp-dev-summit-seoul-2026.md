---
title: "MCP Dev Summit Seoul 2026 참가 후기"
description: "이틀 동안 들은 MCP와 AI 에이전트 설계·운영 사례, 세션별 주요 내용과 현장 사진을 정리했습니다."
publishedAt: 2026-08-21
category: ai-engineering
draft: false
featured: false
tags:
  - mcp
  - ai-agent
  - agent-skills
  - conference
---

지난 8월 13일(목)부터 14일(금)까지 서울에서 열린 [MCP Dev Summit Seoul 2026](https://events.linuxfoundation.org/mcp-dev-summit-seoul/)에 다녀왔습니다. MCP 생태계와 AI 에이전트의 설계·운영 사례를 다룬 행사로, 이틀 동안 들은 세션을 중심으로 행사에서 반복해서 나온 문제의식과 세션별 주요 내용을 정리했습니다.

2026년 8월 13–14일 · 그랜드 인터컨티넨탈 서울 파르나스

<figure>

![MCP Dev Summit 무대와 객석이 보이는 그랜드 볼룸 전경](../../assets/posts/mcp-dev-summit-seoul-2026/ballroom.webp)

<figcaption>둘째 날 마지막 세션을 마친 뒤의 그랜드 볼룸.</figcaption>
</figure>

## 전체 소감

개인적으로는 에이전트를 개발하며 고민했던 MCP의 적용 경계, 기능 범위, 기존 API를 MCP 도구로 전환하는 과정이 여러 발표의 주제와 맞닿아 있어 특히 와닿았습니다. 비슷한 문제 해결 과정을 다른 사례와 비교하면서 새롭게 살펴볼 관점도 얻었습니다.

무엇보다 MCP 적용 자체가 목적은 아니며, 문제에 맞게 에이전트의 역할과 실행 구조를 어떻게 설계할지가 더 중요하다는 점을 다시 생각해 볼 수 있었습니다.

## 서밋에서 반복해서 나온 세 가지 질문

### 1. MCP가 정말 필요한 문제인가?

단일 함수 호출처럼 단순한 작업이나 호출자와 절차가 정해진 작업에는 기존 API·CLI·템플릿·워크플로가 더 적합할 수 있다는 이야기가 여러 번 나왔습니다. MCP를 먼저 선택하기보다 여러 에이전트가 공통으로 찾아 반복해서 사용할 기능인지부터 확인하고, 상태·승인·권한 관리는 어떤 실행 구조에서 맡을지 살펴봐야 한다는 관점입니다.

### 2. 도구와 컨텍스트를 어떻게 설계할 것인가?

API 엔드포인트를 일대일로 노출하면 도구 선택이 어려워지고 불필요한 컨텍스트도 늘어납니다. 에이전트의 의도와 결과에 맞게 도구를 선별하고, 필요한 스키마와 필드만 제공하며, 입력·단위·승인 조건을 추측하지 않도록 계약을 명확히 해야 한다는 사례가 많았습니다.

40개 도구를 14개로 줄인 발표도 같은 맥락이었습니다. 단순히 개수를 줄인 것이 아니라 객체와 엔드포인트 중심의 API를 에이전트의 의도와 작업 흐름에 맞게 다시 구성했다는 점이 핵심이었습니다.

<figure>

![DevRev 발표의 Search → Context → Act 도구 설계 슬라이드](../../assets/posts/mcp-dev-summit-seoul-2026/tool-curation.webp)

<figcaption>Nimit Savant · Gokul K S(DevRev), From 40 Tools To 14. 에이전트의 작업 흐름에 맞춰 도구를 구성하는 설명.</figcaption>
</figure>

### 3. 연결한 이후를 어떻게 운영할 것인가?

에이전트가 상황을 관찰하고 대응을 제안하더라도 실제 변경은 권한 검사를 거치고 사람의 승인을 받은 뒤 기존 실행 체계가 처리하도록 역할을 나누는 방식이 반복해서 소개됐습니다. 근거가 부족할 때는 추정하지 않고 판단을 유보하며, 도구를 검색·확인할 권한과 실제 대상에 실행할 권한도 구분해야 한다는 내용이 인상적이었습니다.

에이전트를 여러 구성 요소가 각각 실패할 수 있는 분산 시스템으로 보고 기억과 실행 상태를 구분해야 한다는 발표도 있었습니다. 운영 단계에서는 레지스트리, 자격 증명, 게이트웨이, 감사, 트레이스와 재현 가능한 평가까지 함께 설계해야 한다는 메시지가 이어졌습니다.

## 세션별 주요 내용

### 1일 차 — 8월 13일

#### Keynotes

<small>연사: Demetrios Brinkmann (Agentic AI Foundation) · Den Delimarsky (Anthropic) · Ana Jiménez Santamaría (Linux Foundation) · Jihye Kim (Naver Cloud Platform)</small>

MCP 생태계가 성장한 이후 필요한 레지스트리, 검색, 자격 증명, 가드레일과 감사 등의 운영 체계를 다뤘습니다.

<figure>

![Two Years of MCP 제목이 띄워진 첫날 키노트 무대](../../assets/posts/mcp-dev-summit-seoul-2026/keynote.webp)

<figcaption>첫날 키노트. Den Delimarsky(Anthropic)의 Two Years of MCP 발표.</figcaption>
</figure>

#### [Stateful AI Agents: Building Consistent Systems with MCP and Distributed SQL](https://mcpseoul2026.sched.com/event/2TLPA/stateful-ai-agents-building-consistent-systems-with-mcp-and-distributed-sql-nasiullha-chaudhari-yugabytedb)

<small>연사: Nasiullha Chaudhari (YugabyteDB)</small>

에이전트를 여러 구성 요소가 각각 실패할 수 있는 분산 시스템으로 보고, 기억과 실행 상태를 구분해 중복 실행을 막는 방법을 설명했습니다.

#### [From Legacy To Agentic AI](https://mcpseoul2026.sched.com/event/2PYeB/from-legacy-to-agentic-ai-seoyul-yoon-aaif-community-seoul)

<small>연사: Seoyul Yoon (AAIF Community Seoul)</small>

기존 OpenAPI 명세를 활용해 MCP로 전환하는 사례와, 자동 변환 이후 노출 범위와 설명을 정제하는 과정을 소개했습니다.

#### [From 40 Tools To 14: A Practical Framework for MCP Tool Curation](https://mcpseoul2026.sched.com/event/2PYeE/from-40-tools-to-14-a-practical-framework-for-mcp-tool-curation-nimit-savant-gokul-k-s-devrev)

<small>연사: Nimit Savant · Gokul K S (DevRev)</small>

API 기능을 그대로 나열하지 않고 에이전트의 의도와 작업 흐름에 맞게 도구를 줄이고 재구성하는 방법을 다뤘습니다.

<div class="photo-pair">

<figure>

![행사장 창가에 세워진 MCP Dev Summit Seoul 배너](../../assets/posts/mcp-dev-summit-seoul-2026/event-banner.webp)

<figcaption>점심시간에 담은 행사장 배너.</figcaption>
</figure>

<figure>

![첫날 점심으로 제공된 도시락과 국](../../assets/posts/mcp-dev-summit-seoul-2026/day-one-lunch.webp)

<figcaption>첫날 점심으로 나온 도시락.</figcaption>
</figure>

</div>

#### [Who Watches the Watchmen? Safe AI-Agent Failover Via MCP and CRDs](https://mcpseoul2026.sched.com/event/2PYeZ/who-watches-the-watchmen-safe-ai-agent-failover-via-mcp-and-crds-phuong-bac-ta-research-center-for-distributed-cloud-and-networking-ssu-south-korea-vitumbiko-mafeni-cnlab-ssu-iistrc)

<small>연사: Phuong Bac Ta (CNLab.ai) · Vitumbiko Mafeni (Research Center for Distributed Cloud and Networking)</small>

에이전트는 상황을 관찰하고 대응을 제안하며, 실제 변경은 사람의 승인과 기존 실행 체계를 거치도록 역할을 나눈 사례가 인상적이었습니다.

#### [Authorization in MCP Systems: Getting It Right From the Start](https://mcpseoul2026.sched.com/event/2PYd1/authorization-in-mcp-systems-getting-it-right-from-the-start-aram-andreasyan-cerbos)

<small>연사: Aram Andreasyan (Cerbos) · 종료 직전까지 참석</small>

신원 확인과 권한 부여를 구분하고, 도구의 탐색 범위와 실제 대상에 대한 호출 권한을 각각 통제하는 방법을 다뤘습니다.

#### [AAIF Ambassador AMA: Building the Agentic Future Through Community Contribution](https://mcpseoul2026.sched.com/event/2QScw/aaif-ambassador-ama-building-the-agentic-future-through-community-contribution-hoon-jo-megazone-daniel-oh-red-hat-ana-jimenenez-santamaria-linux-foundation-kevin-dubious-ibm-junghwan-park-pytorchkr)

<small>패널: Hoon Jo (Megazone) · Daniel Oh (Red Hat) · Ana Jiménez Santamaría (Linux Foundation) · Kevin Dubois (IBM) · Junghwan Park (PyTorchKR) · 마지막 부분만 참석</small>

관심 있는 AAIF 프로젝트와 워킹 그룹을 찾고, 제안과 논의부터 직접 기여까지 커뮤니티에 참여하는 방법을 소개했습니다.

#### [Stop Wrapping APIs: Building Structured Execution Boundaries With MCP for Incident Triage](https://mcpseoul2026.sched.com/event/2PYeW/stop-wrapping-apis-building-structured-execution-boundaries-with-mcp-for-incident-triage-sunyoung-park-kc-ml2)

<small>연사: Sunyoung Park (KC-ML2) · 시작 직후부터 참석, 공개 발표 자료 함께 참고</small>

근거가 부족할 때 추정하지 않고 판단을 유보하며, 허용된 범위 안에서만 결과를 내도록 에이전트의 실행 경계를 설계하는 방법을 다뤘습니다.

데모에서는 근거를 확인할 수 없는 요청에 `INDETERMINATE`(판단 불가)를 반환했습니다.

#### [The Context Budget Crisis: Why MCP Needs Server-Side Response Controls](https://mcpseoul2026.sched.com/event/2PYdA/the-context-budget-crisis-why-mcp-needs-server-side-response-controls-nimit-savant-gokul-k-s-devrev)

<small>연사: Nimit Savant · Gokul K S (DevRev)</small>

도구와 응답을 한꺼번에 제공해 컨텍스트를 낭비하지 않도록, 서버가 필요한 정보만 선별해 제공하는 방식을 다뤘습니다.

#### [From APIs To Agentic Toolkits: Designing MCP Flavors and a Public MCP Gateway at Scale](https://mcpseoul2026.sched.com/event/2PYdM/from-apis-to-agentic-toolkits-designing-mcp-flavors-and-a-public-mcp-gateway-at-scale-faizan-akhtar-react-india)

<small>연사: Faizan Akhtar (React India)</small>

외부 진입점과 내부 기능을 계층으로 나누고, 각 계층이 권한과 품질 기준을 유지하는 공개 MCP 운영 구조를 소개했습니다.

#### [Three Gateways for the Agentic Era: An Architectural Framework for Governing AI Agent Traffic](https://mcpseoul2026.sched.com/event/2PYdS/three-gateways-for-the-agentic-era-an-architectural-framework-for-governing-ai-agent-traffic-dakshitha-ratnayake-ws02)

<small>연사: Dakshitha Ratnayake (WSO2)</small>

API, LLM과 MCP 트래픽의 성격에 따라 서로 다른 위험과 정책을 관리할 통제 지점을 구분하는 틀을 설명했습니다.

<div class="photo-pair">

<figure>

![첫날 저녁 하늘 아래 파르나스 건물](../../assets/posts/mcp-dev-summit-seoul-2026/parnas-evening.webp)

<figcaption>첫날 세션을 마치고 나와서 본 파르나스.</figcaption>
</figure>

<figure>

![행사장 주변 도심 건물과 푸른 하늘](../../assets/posts/mcp-dev-summit-seoul-2026/venue-neighborhood.webp)

<figcaption>해가 지기 전의 행사장 주변 풍경.</figcaption>
</figure>

</div>

### 2일 차 — 8월 14일

#### Day 2 Keynotes

<small>연사: HyunSoo Kim (Workato) · Woo Hyung Choi (AWS)</small>

기업 환경의 MCP를 중앙에서 운영하고, 신원·권한·거버넌스·관측 가능성을 상호운용성의 기반으로 삼는 관점을 다뤘습니다.

#### [The 5 Wrong Reasons to Build an MCP Server (And What to Do Instead)](https://mcpseoul2026.sched.com/event/2Rfp5/the-5-wrong-reasons-to-build-an-mcp-server-and-what-to-do-instead-daniel-oh-red-hat)

<small>연사: Daniel Oh (Red Hat)</small>

단순한 관심이나 막연한 보안 기대보다, 분산된 환경과 공통 기능 탐색 등 실제 필요 조건을 먼저 확인해야 한다는 메시지였습니다.

#### [When Does an Agentic Workflow Need MCP?](https://mcpseoul2026.sched.com/event/2PZo6/when-does-an-agentic-workflow-need-mcp-matching-intelligence-and-interfaces-to-the-outcome-junho-kong-sk-on)

<small>연사: Junho Kong (SK On)</small>

문제의 불확실성, 반복 사용 여부, 호출자와 승인 절차에 따라 코딩 에이전트, 템플릿, API, 워크플로와 MCP를 선택하는 기준을 다뤘습니다.

#### [Skills and MCP: Complementary, Not Competing](https://mcpseoul2026.sched.com/event/2PYdk/skills-and-mcp-complementary-not-competing-dale-seo-apollo-graphql)

<small>연사: Dale Seo (Apollo GraphQL) · 전반부 참석, 이후 내용은 공개 발표 자료로 보완</small>

MCP는 실시간 시스템에 접근하는 수단으로, Skill은 도구 사용 절차와 전문 지식으로 구분하고 두 방식을 함께 활용하는 접근을 설명했습니다.

#### [Hardening MCP Integrations Against Tool Poisoning](https://mcpseoul2026.sched.com/event/2PYdh/hardening-mcp-integrations-against-tool-poisoning-arshardh-ifthikar-wso2)

<small>연사: Arshardh Ifthikar (WSO2) · 후반부 참석</small>

도구의 설명과 결과뿐 아니라 여러 도구를 조합했을 때 생길 수 있는 위험까지 탐색과 실행 단계에서 점검하는 방식을 다뤘습니다.

#### [Why We Made Our AI Agent Platform a Codebase Before Adding MCP](https://mcpseoul2026.sched.com/event/2PYdn/why-we-made-our-ai-agent-platform-a-codebase-before-adding-mcp-navtej-reddy-observeai)

<small>연사: Navtej Reddy (Observe.ai)</small>

에이전트 설정을 코드처럼 버전 관리하고, 평가와 사람의 검토를 통과한 변경만 운영 환경에 반영한 사례가 인상적이었습니다.

#### [Closing the Context Gap: Making Your APIs Agent-Ready](https://mcpseoul2026.sched.com/event/2PYdw/closing-the-context-gap-making-your-apis-agent-ready-aanchal-mishra-postman-ali-mustafa-shaikh-pieces-ai)

<small>연사: Aanchal Mishra (Postman) · Ali Mustufa Shaikh (Pieces AI)</small>

API를 자동으로 연결하는 것보다 에이전트가 입력, 단위, 승인 조건과 결과를 추측하지 않도록 계약을 명확히 만드는 과정을 다뤘습니다.

#### [Managing Token Usage in MCP Servers Using Code Mode](https://mcpseoul2026.sched.com/event/2PYe5/managing-token-usage-in-mcp-servers-using-code-mode-bhumika-satpathy-google)

<small>연사: Bhumika Satpathy (Google)</small>

필요한 기능을 그때 찾아 실행하고 중간 데이터를 실행 환경 안에서 처리해, 도구 정보와 데이터의 컨텍스트 사용량을 줄이는 방식을 소개했습니다.

<figure>

![그랜드 볼룸 포이어에서 부스를 둘러보고 대화를 나누는 행사 참가자들](../../assets/posts/mcp-dev-summit-seoul-2026/networking.webp)

<figcaption>둘째 날 마지막 세션 이후, 그랜드 볼룸 포이어의 네트워킹 현장.</figcaption>
</figure>

## 발표 자료와 영상

전체 프로그램과 공개 발표 자료는 [공식 일정표](https://mcpseoul2026.sched.com/)에서 확인할 수 있습니다. [공식 행사 페이지](https://events.linuxfoundation.org/mcp-dev-summit-seoul/)에서 안내하는 영상 링크도 함께 남깁니다.

- [Day 1 라이브스트림 다시 보기](https://www.youtube.com/watch?v=DMFDb1GCjKY)
- [Day 2 라이브스트림 다시 보기](https://www.youtube.com/watch?v=VSLSiW5JPAs)
- [Agentic AI Foundation YouTube 채널](https://www.youtube.com/@AgenticAI-Foundation)

<small>사진은 현장에서 직접 촬영했습니다. 사진 속 발표 자료의 출처는 각 세션의 발표자입니다.</small>
