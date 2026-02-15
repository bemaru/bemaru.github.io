---
title: "CI/CD][GitLab] GitLab Runner 설치 및 'Runner has never contacted this instance' 문제 해결"
date: 2023-04-25
tags: []
summary: ""
originalUrl: "https://bmaru.tistory.com/184"
---

*이 글은 [Tistory 원본](https://bmaru.tistory.com/184)에서 마이그레이션되었습니다.*

gitlab runner setup 다운로드 ( 공식 사이트 )

gitlab url과 gitlab 에서 발급한 token을 기입하면 연결됩니다.

GitLab 저장소 > Settings > CI/CD > Runners

![](https://blog.kakaocdn.net/dna/ns3mz/btscCBnVCYx/AAAAAAAAAAAAAAAAAAAAAIqwmQ0ir1oeeXc77_o-9ur1_rO5dVIDw9165u_u1Rvl/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1772290799&allow_ip=&allow_referer=&signature=Czqhw5TAJDlVB2ulzEHFIpMGQH8%3D)

(TODO : 설명 추가)

![](https://blog.kakaocdn.net/dna/oelTt/btscHeFqisX/AAAAAAAAAAAAAAAAAAAAAOsk0JY-5d93fcgFc7ohW_O1LcKrDWht92rDA8O3F6ln/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1772290799&allow_ip=&allow_referer=&signature=RFQMMH6XkUQUvs%2F8F9fqozS0ybI%3D)

![](https://blog.kakaocdn.net/dna/cNFZAO/btscJrcXLto/AAAAAAAAAAAAAAAAAAAAAMVORJGGg6oX-AHyHgdrduQoBipxaWNGFtplrIR5jZor/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1772290799&allow_ip=&allow_referer=&signature=yfDoB4uC%2Fh5iMjqNZagFmwDFFtY%3D)

음.. 왜그럴까..

<https://stackoverflow.com/questions/67820925/gitlab-ci-cd-new-runner-has-not-been-connected-yet>

[Gitlab CI/CD: New runner has not been connected yet

I am very new to Gitlab CI/CD and I have read its documentation very carefully about creating a new CI/CD process using .gitlab-ci.yml file. As I have found out in order to have Continuous Deployme...

stackoverflow.com](https://stackoverflow.com/questions/67820925/gitlab-ci-cd-new-runner-has-not-been-connected-yet)

![](https://blog.kakaocdn.net/dna/rpOhp/btscBCAj2Bc/AAAAAAAAAAAAAAAAAAAAACaBL6d4Cj3zreKLma9kKnVWaPQRiVt_lI5Z-6Xc89UI/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1772290799&allow_ip=&allow_referer=&signature=KCVgsmmUjYNFSb0lKg4yiuOFQe8%3D)

오케이..됬네요

![](https://blog.kakaocdn.net/dna/bD9qMU/btscHQqPuck/AAAAAAAAAAAAAAAAAAAAAGSxSJsAK8IFAN3A_LM1jmvj7SL0_mNg5zXUzm42x7AI/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1772290799&allow_ip=&allow_referer=&signature=RODlVe4HnLiBvEvG7CbgYL%2BsnfQ%3D)

<https://docs.gitlab.com/runner/install/windows.html>

[Install GitLab Runner on Windows | GitLab

Documentation for GitLab Community Edition, GitLab Enterprise Edition, Omnibus GitLab, and GitLab Runner.

docs.gitlab.com](https://docs.gitlab.com/runner/install/windows.html)

![](https://blog.kakaocdn.net/dna/IEJKg/btscHnh8lDD/AAAAAAAAAAAAAAAAAAAAAJeQ6LUsZBwpD4-nLPv343337jGleBA-4eaM9Xlr1Yh0/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1772290799&allow_ip=&allow_referer=&signature=OB1jAPsV8GfANbY2nIKVB5ygQc4%3D)

![](https://blog.kakaocdn.net/dna/3zjsB/btscyHPLpU0/AAAAAAAAAAAAAAAAAAAAAH6Rnwtf_DwVS4Oo_3_y8AZs6dSpFC3tZQD4NYXLSXm5/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1772290799&allow_ip=&allow_referer=&signature=l6toz1hfLYE4EMZQ9Lg1QhafyF4%3D)

Running with gitlab-runner 15.11.0 (436955cb)  
Resolving secrets  
Preparing the "shell" executor  
Using Shell (pwsh) executor...   
Preparing environment  
ERROR: Job failed (system failure): prepare environment: failed to start process: exec: "pwsh": executable file not found in %PATH%. Check <https://docs.gitlab.com/runner/shells/index.html#shell-profile-loading> for more information

```
Running with gitlab-runner 15.11.0 (436955cb)
Resolving secrets
Preparing the "shell" executor
Using Shell (pwsh) executor...
Preparing environment
ERROR: Job failed (system failure): prepare environment: failed to start process: exec: "pwsh": executable file not found in %PATH%. Check https://docs.gitlab.com/runner/shells/index.html#shell-profile-loading for more information
```

![](https://blog.kakaocdn.net/dna/d2lu7A/btscArFVhnM/AAAAAAAAAAAAAAAAAAAAAEL4MzccGzrAOGehmMUQk63TCBGklyUU8zppmY8WsFMv/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1772290799&allow_ip=&allow_referer=&signature=IwHwL5hLXj3zXQSqcPQNXeKdIhM%3D)

<https://stackoverflow.com/questions/68109273/exec-pwsh-executable-file-not-found-in-path>