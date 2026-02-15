---
title: "Python] 나의 리팩토링 규칙 #1"
date: 2024-03-11
tags: []
summary: ""
originalUrl: "https://bmaru.tistory.com/185"
---

*이 글은 [Tistory 원본](https://bmaru.tistory.com/185)에서 마이그레이션되었습니다.*

![](https://blog.kakaocdn.net/dna/qlJJ9/btsFGmJRqvt/AAAAAAAAAAAAAAAAAAAAAAEF6KPjaQC9BKdE1IObNThE5oLtFkchW2eAs65JJH92/img.jpg?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1772290799&allow_ip=&allow_referer=&signature=pwORDodjGRioy6DLwhH%2FLwLbpHg%3D)

python 코드 리팩토링 규칙을 고양이에게 설명하는 픽셀 아트 by DALL&middot;E 3

## 

## 개요

* 최근 python 코드를 리팩토링하는 일이 많은데, 그 이유는 분석을 잘하기 위해서다.
* 기존 시스템 코드 대부분이 남이 만든 코드가 90% 이상인데, 읽기 좋은 코드는 아니다.
* 물론, 리팩토링을 하지 않아도 분석 할 수는 있다.
* 하지만, 나는 리팩토링을 했다. 왜?
* 기존 코드를 그대로 분석 vs 리팩토링 + 가독성 개선 후 분석 에 들어가는 리소스(시간)만 봤을때  
  후자가 더 효율적이기 때문이다. (이 이야기는 여기서 길게 할 필요는 없으므로 생략한다..)
* 여튼, 리팩토링을 계속 하면서 반복되는 패턴이 생겨, 이 글에서 규칙을 정리하려 한다.
* 보편적인 python 코딩 컨벤션의 기본적인 내용도 일부 포함된다.

## 규칙

1. import 문 정리
   * import 문을 알파벳 순서로 정렬한다.
   * IDE를 통해 없는 package 를 자동으로 import 하면, 알아서 적절한 곳에 배치할 수 있다.
   * isort 를 사용하는 방법도 있다.
   * import 문 순서가 안맞더라도 사실 코드 분석에 크게 영향이 있진 않지만, 안맞으면 거슬린다..
2. 네이밍 스타일
   * <https://peps.python.org/pep-0008/#naming-conventions>
   * PEP8에 네이밍 스타일에 대한 설명을 읽어보면 도움이된다.
   * 변수, 함수이름은 snake\_case
   * 함수는 PascalCase
   * Pylint 나 IDE의 intellisense 에서도 PEP 에 맞지 않는 스타일에 대해 경고 알림을 얻을 수 있다.
   * 레거시 코드에서 이런 기본적인 네이밍 스타일이 안지켜지면 너무 속상하다.
3. 클래스
   * 클래스 없이 많은 함수가 나열된 py 파일을 보면 한숨나온다.
   * 기본적으로 모듈(.py 파일)과 클래스는 1:1 대응을 선호한다. ( 그렇게 안되는 경우도 당연히 있다.)
   * 클래스 멤버 함수 네이밍
     + python에서 공식적인 private 함수는 없지만, 관례상 \_로 시작하곤 한다.
       - ex> def \_my\_private\_method(self):
     + 멤버 변수, 함수의 정의 순서도 가독성에 많은 영향을 끼친다.
     + writer는 reader 에게 중요한 정보가 먼저 보이도록 고려하며 작성해야한다.
     + 멤버 정의 순서
       - 클래스 상수: \_MY\_CONSTANT
       - \_\_init\_\_ 함수
       - 오버라이딩 함수: @override
       - public 함수: my\_public()
       - private 함수: \_my\_private()
       - 호출 계층 깊이가 얕은 함수
       - 호출 계층 깊이가 깊은 함수
4. 데코레이터 표기하기
   * @override
   * @deprecated
   * @property
   * 기타 등등 알맞은 데코레이터 표기로 가독성을 개선하면 코드가 읽기 수월하다.
5. 기타
   * IDE 가 알려주는 경고는 웬만하면 모두 해결하기.
     + for key in my\_dict -> for key, value in my\_dict.items()
   * early return
   * 함수 호출 계층 참고하기. (vscode F12)
     + 어디서 호출되고 사용되는지 참고하여, 리팩토링 후 영향도를 고려한다.