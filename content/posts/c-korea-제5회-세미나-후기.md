---
title: "C++ Korea 제5회 세미나 후기"
date: 2019-04-08
tags: []
summary: ""
originalUrl: "https://bmaru.tistory.com/92"
---

*이 글은 [Tistory 원본](https://bmaru.tistory.com/92)에서 마이그레이션되었습니다.*

![](https://blog.kakaocdn.net/dna/cJstPe/btqucolm1Pr/AAAAAAAAAAAAAAAAAAAAAAHTEVuDxFLuTCxq7i8aiGOXZfvFyFe-oZ-Qcz9KkUPn/img.jpg?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1772290799&allow_ip=&allow_referer=&signature=CRGhYP5BvKDOdv931OB41PyIyQA%3D)

<https://festa.io/events/226>

[C++ Korea 제5회 세미나 - "종합 선물 세트" | Festa!

Festa에서 당신이 찾는 이벤트를 만나보세요.

festa.io](https://festa.io/events/226)

c++ 세미나를 한번도 가본적이 없기도하고 

java나 웹개발 진영에 비하면 희귀한(?) 편이라 신청했습니다.

인기가 좋은것 같습니다. 금방 매진됬어요.

듣고 싶었던게 마지막에 있어서 좀 아쉬웠지만

한국마소도 가보고 나쁘지 않았습니다.

\* 세션 & 발표자료

세션 1 : C++20 Key Features Summary   
<https://www.slideshare.net/mobile/utilforever/c20-key-features-summary>

[C++20 Key Features Summary

모던 C++의 시초인 C++11은 C++ 코드 전반에 많은 변화를 가져왔습니다. 그리고 최근 C++20의 표준위원회 회의가 마무리되었습니다. 내년에 C++20이 도입되면 C++11이 처음 도입되었을 때와 비슷한 규모, 또는 그 이상의 변화가 있을 것이라고 예상하고 있습니다. C++20…

www.slideshare.net](https://www.slideshare.net/utilforever/c20-key-features-summary)

세션 2 : shared\_ptr&를 함수의 매개 변수로 사용하기 

<https://github.com/imays76/shared_ptr_byref>

[imays76/shared\_ptr\_byref

Contribute to imays76/shared\_ptr\_byref development by creating an account on GitHub.

github.com](https://github.com/imays76/shared_ptr_byref)

세션 3 : C++ 태스크 기반 병렬 프로그래밍 

<http://www.slideshare.net/RayKim51/c-139814600?from_m_app=android>

[C++ 태스크 기반 병렬 프로그래밍

Task Parallelism 소개와 C++ 에서 사용할 수 있는 Task Parallelism Framework 들 소개

www.slideshare.net](https://www.slideshare.net/RayKim51/c-139814600)

세션 4 : GPU를 이용한 복셀라이제이션 

<http://www.slideshare.net/dgtman/voxelizaition-with-gpu?from_m_app=android>

[Voxelizaition with GPU

GPU를 이용한 Voxelization 유영천 https://megayuchi.com tw : @dgtman

www.slideshare.net](https://www.slideshare.net/dgtman/voxelizaition-with-gpu)

세션 5 : C++ Coroutine 알아보기: 접근법, 컴파일러, 그리고 이슈들

<https://onedrive.live.com/view.aspx?resid=94CF05740BEDC7FC!139363&ithint=file%2cpptx&authkey=!AFRm5ILI3RiYYFc>

[[Kor]Exploring The Cpp Coroutine.pptx - Microsoft PowerPoint Online

onedrive.live.com](https://onedrive.live.com/view.aspx?resid=94CF05740BEDC7FC!139363&ithint=file%2cpptx&authkey=!AFRm5ILI3RiYYFc)

세션3, 4는 업무에 응용할 부분이 크게 없고 ( 업무 도메인이 달라서 )

세션1, 세션5가 주요관심사였습니다. 

아래는 각 세션들에 대한 리뷰입니다.

(세션에서 다룬 발표내용설명 보다는 개인적인 감상위주입니다.)

**세션1**은 C++ 20에 대한 새로운 기능 정리를 잘 요약해서 설명해주신것 같았습니다.

발표자분은 온라인 자료로 익숙한 분이셨는데 전보다 발표를 더 잘하시더군요

여튼, Ranges가 20에 포함됬다는걸 알게됬고,

(Ranges 관련 설명은 아래 링크 추천드립니다.

[https://channel9.msdn.com/Events/Channel9-Korea/cplusplus/Ranges-for-The-C-Standard-Library)](https://channel9.msdn.com/Events/Channel9-Korea/cplusplus/Ranges-for-The-C-Standard-Library)

date, time 관련 부족한 기능들이 (다른 언어들에 비해...) chrono에 추가되고 사용하기 쉬워졌다고 하네요.

또 여러가지 설명을 해주셨는데, 다시 정리해봐야겠네요.

하지만 c++ 20이 표준화되고 실제 프로젝트에 도입하려면 또 몇년을.. 허허

**세션2** 는 매개변수로 shared\_ptr<X> vs const shared\_ptr<X>& 무엇으로 해야되는가에 대한 이야기였는데,  
음 당연히 const &로 넘기는게 맞을 거라고 생각했는데 맞았다. 

그런데 람다에서 value로 캡쳐되어야만 해결되는 문제상황이 있다고 했는데,

그에 대한 자세한 상황설명은 들을 수는 없었지만

사실 그 문제는 꼭 shared\_ptr뿐만아니라 람다에 &로 캡쳐된 변수의 value가 메모리에 없는 경우

( 함수안의 지역변수가 함수호출이 끝났을 경우 처럼 ) 라고 생각된다.

**세션3** 대학교 시절 병렬프로그래밍의 추억이 되살아나는 발표내용이였다.

대학교때 openmp 실습에 애를 먹었던 기억이 난다. 지금은 안쓰지만, 설명을 들으니

C프로그램에 매크로기반으로 병렬처리를 할 수 있다니 편하긴한것 같다.

여튼, 못알아듣는게 훨씬 많았지만, hpx가 c++기반에 충실하고 좋다고 한다.

사실 프레임워크 설명보다,

프로그램 **퍼포먼스를 올릴려면 가장 먼저 기반 알고리즘을 손봐야된다**.

기반이 아닌 겉부분 백날 성능개선해봤자 답이 안나온다는 설명 아주 공감됬다.

그리고 웬만하면 **코어일 수록 잘 만든 라이브러리 가져다 써라**. 특히 많이 공감했다.

좋은 라이브러리들이 있는데도 실제 프로젝트에 어줍잖게 직접구현하는 그런방식 아주 좋지 않다!!

**세션4** 복셀라이제이션의 기법들과 겪어오신 시행착오 같은것들을 설명해주셨는데

전혀 모르는 분야라..

매우 열정적으로 발표해주셨는데 관심있는쪽이 아니고 어려워서 생략하겠습니다.

**세션5** c++ 코루틴에 대한 세션이였는데, 발표자분이 발표를 유창하게 잘하셨습니다.

쉽지 않은 내용인데, 차근차근 잘 설명하셨던것 같고 발표자분 넘사벽 느낌이셨어요.

코루틴 개념과 사용법정도만 나올 줄 알았는데, 처음부터 컴파일러 얘기가 나오고 쉽지 않았습니다.

c++ 코루틴에 대한 설명도 잘 들었지만, 발표 방법과 코드 분석 방법이나 생각같은 것들도

좋은 공부가 됬던것 같습니다.   
세션1에서도 그랬지만, 이분도 말씀하시길 실제 프로젝트에 적용하지 말라고 하시는군요

차라리 현재 프로젝트에 구현되어있는 task 클래스를 잘 다듬는걸 권장하시네요.

설명들으니 왜그런지 이해가 되긴합니다.

**마지막**으로

경품추천은 책을 주시더라구요.

책은 못받았지만 참석자 나눠주시는 전리품 얻어왔습니다.

![](https://blog.kakaocdn.net/dna/5G5i3/btquc3Bh2K6/AAAAAAAAAAAAAAAAAAAAAIBUGpEjnRKHhwxzWTkYfjbDJOvGeamaTqxFL_3zJWxf/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1772290799&allow_ip=&allow_referer=&signature=0XTKX%2FxWF5lDxkfTVOwel%2B8hsjI%3D)