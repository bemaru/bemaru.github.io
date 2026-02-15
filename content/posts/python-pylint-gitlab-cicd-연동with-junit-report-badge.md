---
title: "Python] Pylint GitLab CI/CD 연동(with JUnit Report, Badge)"
date: 2024-05-21
tags: []
summary: ""
originalUrl: "https://bmaru.tistory.com/195"
---

*이 글은 [Tistory 원본](https://bmaru.tistory.com/195)에서 마이그레이션되었습니다.*

**.gitlab-ci.yml**

```
pylint:
  stage: test
  script:
    - powershell -File ci\pylint\run_pylint.ps1
    - pylint --exit-zero --output-format=pylint_junit.JUnitReporter --output=report_pylint.xml --recursive=y .
  artifacts:
    when: always
    paths:
      - pylint
      - report_pylint.xml
    reports:
      junit: report_pylint.xml
```

**run\_pylint.ps1**

```
# Ensure pip is installed and up to date
python -m ensurepip --upgrade
pip install --upgrade pip

# Install necessary packages
pip install pylint pylint-exit anybadge

# Create pylint directory if it doesn't exist
if (-Not (Test-Path -Path "./pylint")) {
    New-Item -ItemType Directory -Path "./pylint"
}

# Run pylint and save output to log file
$pylint_output = pylint --output-format=text --recursive=y .
$pylint_output | Out-File -FilePath "./pylint/pylint.log"

# Get pylint exit code
$pylint_exit_code = $LASTEXITCODE

# Exit if pylint failed
if ($pylint_exit_code -ne 0) {
    pylint-exit $pylint_exit_code
}

# Extract pylint score from log file
$pylint_score = Select-String -Path "./pylint/pylint.log" -Pattern "Your code has been rated at" | ForEach-Object {
    if ($_ -match "Your code has been rated at ([0-9.-]+)") {
        $matches[1]
    }
}

# Generate badge with pylint score
anybadge --label=Pylint --file=./pylint/pylint.svg --value=$pylint_score 2=red 4=orange 8=yellow 10=green

# Output pylint score
Write-Output "Pylint score is $pylint_score"
```

**결과**

![](https://blog.kakaocdn.net/dna/VezL5/btsHuOjZivb/AAAAAAAAAAAAAAAAAAAAAOcyDLVerLQu1usBXK_YkXcL1RMjImUysIn_dTM2EzEe/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1772290799&allow_ip=&allow_referer=&signature=l%2Bc3fBvYCC55tgXo1RnUUqEqVw8%3D)

![](https://blog.kakaocdn.net/dna/bDtXDG/btsHwxOKpSi/AAAAAAAAAAAAAAAAAAAAAD3vSfW4wOTISSJ2H36XmdaPiNaZAmKjDulr00aT_VHy/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1772290799&allow_ip=&allow_referer=&signature=2yeE2ZBh35%2BYPZHeq7R7k46RgTs%3D)

![](https://blog.kakaocdn.net/dna/LS46D/btsHuMfyEXe/AAAAAAAAAAAAAAAAAAAAACQ1VX9MBkaAmKxv5jWzefkuKv4ieTf8HcOBZoJ73viF/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1772290799&allow_ip=&allow_referer=&signature=ERi8THQwAiy6%2FEffqg0PFgcwNtg%3D)

**참고**

<https://stackoverflow.com/questions/43126475/pylint-badge-in-gitlab>

<https://r2devops.io/marketplace/gitlab/r2devops/hub/pylint>

<https://github.com/kubeflow/examples/blob/master/.pylintrc>

<https://pylint.readthedocs.io/en/stable/user_guide/usage/run.html>

<https://stackoverflow.com/questions/36873096/run-pylint-for-all-python-files-in-a-directory-and-all-subdirectories>

<https://aiden-jeon.github.io/post/dev/module-setup/pylintrc/>