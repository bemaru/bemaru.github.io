---
title: "소프트웨어 테스트] 테스트의 심각도(Severity)와 우선순위(Priority) 차이점 및 개념 요약 정리"
date: 2024-04-01
tags: []
summary: ""
originalUrl: "https://bmaru.tistory.com/189"
---

*이 글은 [Tistory 원본](https://bmaru.tistory.com/189)에서 마이그레이션되었습니다.*

## 우선순위와 심각도의 차이점

|  |  |  |
| --- | --- | --- |
|  | 우선순위(Priority) | 심각도(Severity) |
| 정의 | - 개발자가 버그를 수정해야하는 순서 | - 버그가 소프트웨어 기능에 미칠 수 있는 영향을 측정한 것 |
| 기준 | - 유저 관점 - 비즈니스 가치에 따라 결정됨. 고객 요구 사항, 일정을 기반으로 함.  - 주관적이며 프로젝트 상황의 변화에 따라 변경될 수 있음. | - 기술적 관점 - 기능에 따라 결정됨. 제품의 기술적 측면(기능이나 표준)을 기반으로 함.  - 객관적이며, 변경될 가능성이 적음.  - QA 엔지니어가 유형을 정의함. |

높은 우선순위 x 낮은 심각도 : 결함을 즉시 수정해야하지만, 애플리케이션에 영향을 주지 않음.

낮은 우선순위 x 높은 심각도 : 결함을 수정해야하지만, 즉시 수정이 필요하진 않음.

## Severity x Priority Matrix

![](https://blog.kakaocdn.net/dna/c3GQWn/btsGhFfQDfT/AAAAAAAAAAAAAAAAAAAAAElwWJpSn_qjOrdjNa5es1SXquMSKZZ-oeIBfVbz4DcC/img.gif?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1772290799&allow_ip=&allow_referer=&signature=RM9ABJpm0B2SO%2B0ROcdaSAy4Nrk%3D)

https://www.guru99.com/defect-severity-in-software-testing.html

## 우선순위 유형(Priority Type) 예시

* 높음: 버그가 시스템에 부정적인 영향을 미치고 해결될 때까지 사용할 수 없게 만드는 즉시 버그를 해결해야 합니다.
* 중간: 버그는 일반적인 개발 및 테스트 과정에서 수정될 수 있습니다.
* 낮음: 버그는 나중에 수정될 수 있습니다. 기타 더 심각한 버그가 우선적으로 적용됩니다.

## 심각도 유형(Severity Type) 예시

* 심각(Critical): 시스템 전체 종료를 유발할 수 있는 버그
* 주요(Major): 시스템의 많은 부분을 붕괴시킬 수 있는 버그
* 경미(Minor): 예상치 못한 또는 원치 않는 동작이 발생하지만 시스템 기능을 방해할 만큼 충분하지는 않습니다.
* 낮음(Low): 버그로 인해 눈에 띄는 시스템 고장이 발생하지 않습니다.

## 구글 이슈 트래커의 우선순위 예시

|  |  |
| --- | --- |
| **P0** | 필요한 만큼 많은 리소스를 투입해 즉시 해결해야 하는 문제입니다. 이러한 문제가 발생하면 알려진 해결 방법 없이 완전히 중단되거나 제품의 중요한 기능을 모든 사용자가 사용할 수 없게 됩니다. |
| **P1** | 신속하게 해결해야 하는 문제입니다. 이러한 문제는 많은 사용자에게 상당한 영향을 미칩니다. 해결 방법이 있는 경우 부분적이거나 지나치게 고통스러울 수 있습니다. 문제가 조직의 핵심 기능에 영향을 미치거나 근본적으로 다른 팀을 방해합니다. |
| **P2** | 합리적인 시간 내에 해결해야 하는 문제입니다. 이러한 문제는 다음 중 하나일 수 있습니다. 1) **P0** 또는 **P1**이지만 합리적인 해결 방법이 있는 문제 2) 대다수의 사용자에게 중요하고 핵심 조직 기능과 관련된 문제 3) 다른 팀의 작업을 방해하고 합당한 해결 방법이 없는 문제 **P2**는 특히 최초 사용 또는 설치 시간 문제와 관련이 있으며 기본 우선순위 수준입니다. |
| **P3** | 가능한 경우 해결해야 하는 문제입니다. 이러한 문제는 핵심 조직 기능 또는 다른 팀의 작업과 관련이 있지만 진행을 방해하지 않으며 합당한 해결 방법이 있습니다. |
| **P4** | 궁극적으로 해결해야 하는 문제입니다. 이러한 문제는 핵심 조직 기능 또는 다른 팀의 작업과 관련이 없거나, 시스템의 매력도 또는 즐거움과만 관련이 있습니다. |

출처 : <https://developers.google.com/issue-tracker/concepts/issues?hl=ko>

## 정리

* 우선순위는 비즈니스 가치 관점에서 개발자가 버그를 수정해야하는 순서
* 심각도는 기술적 관점에서 버그가 소프트웨어 기능에 미치는 영향도
* 우선순위 유형과 심각도 유형은 어느 정도 기준은 있지만 회사, 프로젝트, 팀 마다 기준을 정의해야한다.

## 참조

* (2010-03-11)  <https://angel927.tistory.com/82>
* (2013-04-09) <https://reqtest.com/en/knowledgebase/priority-and-severity-what-is-the-difference-and-when-should-you-use-which/>
* (2023-04-21) <https://www.browserstack.com/guide/bug-severity-vs-priority>
* (2024-03-19) <https://www.guru99.com/ko/defect-severity-in-software-testing.html>
* <https://developers.google.com/issue-tracker/concepts/issues?hl=ko>