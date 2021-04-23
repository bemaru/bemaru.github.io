---
layout: post  
title: "[libtorrent] (포스팅 테스트) libtorrent windows 빌드"  
subtitle: "windows환경에서 libtorrent 빌드를 진행해봅니다."  
categories: dev
tags: libtorrent bittorrent rasterbar libtorrent-rasterbar.dll
comments: true  
header-img: https://www.libtorrent.org/img/screenshot.png
---

![표지](https://www.libtorrent.org/img/logo-color-text.png)

# 빌드

```
git clone --recurse-submodules -b libtorrent-1_2_3 https://github.com/arvidn/libtorrent.git
cd libtorrent
mkdir build
cd build
cmake -DCMAKE_BUILD_TYPE=Release -DCMAKE_CXX_STANDARD=11 -G "Visual Studio 14 2015" .. -DBoost_USE_STATIC_LIBS=ON -A Win32 -B "Win32" -Dstatic_runtime=ON -Dbuild_tests=ON -Dbuild_examples=ON
cmake -DCMAKE_BUILD_TYPE=Release -DCMAKE_CXX_STANDARD=11 -G "Visual Studio 14 2015" .. -DBoost_USE_STATIC_LIBS=ON -A x64 -B "x64" -Dstatic_runtime=ON -Dbuild_tests=ON -Dbuild_examples=ON
```