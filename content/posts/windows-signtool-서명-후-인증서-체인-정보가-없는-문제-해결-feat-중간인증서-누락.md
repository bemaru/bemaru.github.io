---
title: "Windows] SignTool 서명 후 인증서 체인 정보가 없는 문제 해결 ( feat. 중간인증서 누락 )"
date: 2022-06-16
tags: []
summary: ""
originalUrl: "https://bmaru.tistory.com/168"
---

*이 글은 [Tistory 원본](https://bmaru.tistory.com/168)에서 마이그레이션되었습니다.*

윈도우에서 파일에 디지털 서명 후 인증서 체인이 올바르지 않은 문제가 발생했는데요.

인증서 체인이 올바르지 않은 경우의 원인은 다양할 수 있습니다.

이번에 공유하고자 이슈는 중간 인증서(intermidiate certificate)누락 이슈입니다.

정상적인 상황이라면 아래와 같이 인증 경로에 인증서 체인이 올바르게 나타나고

올바른 인증서라는 메세지가 보여야합니다.

![](https://blog.kakaocdn.net/dna/bujY8c/btrEZEbL8ug/AAAAAAAAAAAAAAAAAAAAANCEChfiRE-2qEnjywQH6jO7i4GKNxCsgNc4L7eLoxtc/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1772290799&allow_ip=&allow_referer=&signature=BRBWVlPtyi8uN5xjjvvor9saj8k%3D)

이슈 재현

* 오프라인 상태의 PC A에서 MyFile.exe에 SignTool로 서명을 수행
* 오프라인 상태이므로 중간 인증서의 자동 다운로드가 불가한 상태
* (오프라인 상태보다 중간 인증서가 없는게 중요)
* PC B에서 MyFile.exe > [속성] > [디지털 서명] > [자세히] > [인증서 보기] > [인증 경로] 를 보면
  + PC B가 오프라인이라면 인증서 체인이 없는 것을 확인할 수 있습니다.
  + PC B가 온라인이며, 중간 인증서 다운로드에 문제가 없다면 디지털 서명이 정상으로 나옵니다

이슈 원인

* 원인은 이슈 재현에 이미 설명이 나와있는 것처럼 중간 인증서 다운로드에 실패했기 때문입니다.
* 만약 PC A 에서라도 중간 인증서가 올바르게 존재하는 상태에서 서명이 진행되었다면 문제가 되지 않았을 겁니다.

이슈 점검 및 해결

* [속성] > [디지털 서명] > [자세히] > [인증서 보기] > [자세히] 탭을 보시면 [기관 정보 엑세스] 필드를 볼 수 있습니다.
  + 여기서 보이는 URL값이 발급 기관 인증서 즉, 중간 인증서를 받을 수 있는 URL입니다.
  + 서명을 수행하는 PC에서 해당 URL로 인증서를 수동으로 다운로드 해보고 문제가 없는지 확인해볼 수 있겠네요.
  + 인증서 다운로드에 문제가 있다면 수동으로 인증서를 설치해줍니다.

![](https://blog.kakaocdn.net/dna/s8oK1/btrEXldJSSt/AAAAAAAAAAAAAAAAAAAAAD9SnZds35t-A_RKRseFwZ-vhQaRd9fv36Ec2RyD0a_G/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1772290799&allow_ip=&allow_referer=&signature=vmnd8NAv79%2BhEjnFj4Il2xZCjFY%3D)

이슈 개선

* 서명 과정에서 SingTool을 사용한 verify 명령어를 통해 서명을 체크하는 로직을 추가해 문제 상황을 확인할 수 있습니다.   
  (cf. CI 빌드 시스템에서 오류를 인식할 수 있도록 )

정리해보면, 디지털 서명을 수행하는 PC에 인증서 체인의 인증서들이 모두 존재하도록 하는것게 가장 안전한 방법인것 같습니다.