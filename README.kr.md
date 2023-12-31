# Lambda Puppeteer

[![en](https://img.shields.io/badge/lang-en-red.svg)](./README.md)

# Disclaimer

원문을 영어로 작성한 후에 제출 목적으로 국문으로 번역한 내용입니다. 영어 전공자나 전문 통번역가가 아니므로 번역 과정 중에 새로 수정된 내용이 누락돠거나 원래 의도와는 달라진 점이 있을 수 있습니다. 영작도 어렵지만 영작한걸 다시 번역하는 것은 더 어렵네요.

# 레포지토리 생성기

## 배경설명


10년간 영어회화 모임을 운영하면서, 가장 힘들었던 것은 신규 회원을 모집하는 일입니다. 이러한 모임 홍보에 사용되는 익명의 해당 사이트는 총 40만 명의 사용자 중 매일 8만 명이 접속합니다. 때문에 홍보 게시판에는 매일 엄청난 양의 글이 쏟아지고, 불안전하고 불편한 검색 기능으로 인해 사람들이 홍보 글을 찾는 것이 어렵습니다.


더 큰 문제는, 영어회화 모임이 있다는 제 광고 글을 보기 전까지는 이러한 모임을 찾아볼 생각조차 하지 않는다는 것이죠. 그래서 저는 꾸준하게 홍보글을 올려서 첫 페이지에 노출될 수 있게 해야만 했습니다. 홍보글들을 읽으려는 사람들만 고생하는 것은 아니고, 글을 업로드 하는 것도 만만치 않게 힘듭니다. 게시물을 작성하려면 일단 OAuth 도 지원하지 않는 로그인을 하고, 이유를 알 수 없는 위치 서비스 동의를 해야지만 로그인이 가능합니다. 그냥 개발을 잘 못한 사이트에요.

로그인을 겨우 해내면 복잡한 메뉴를 타고 들어가서 게시판을 찾아야합니다. 또 글을 작성할 때는 마우스로 일일이 (탭 인덱싱이 제대로 안 되어있습니다.) 범주와 하위범주를 선택하고 제목과 내용까지 입력해야합니다. 제 경우에는 메모 앱에 있는 제목과 내용을 복사해 붙여넣는 과정까지 여러 게시판에 걸쳐 반복적으로 해야합니다. 결국 시간도 오래걸리고 힘든 작업을 하루에 여러번씩 매일 반복해야했죠.

## 첫 시도: 헤드리스 브라우저 이용하기

위의 문제를 해결하기 위해 처음 내놓은 해결책은 자동화입니다. 자바스크립트 개발자로서 Puppeteer[^2] 를 선택하는 것은 당연했죠. 당시에는 클라우드 컴퓨팅에 대한 지식이 부족해서 로컬 컴퓨터에서 직접 해당 코드를 실행했습니다. 하지만, 반복 작업을 로컬 컴퓨터에서 하는 것은 불안정했는데, 컴퓨터를 꺼야할 때도 있었고, 인터넷 연결이 원할하지 않을 때도 있었기 때문입니다.

## 클라우드로 이전: AWS EC2

몇달 동안, 헤드리스 브라우저를 이용해 홍보글을 업로드 하는 것은 잘 작동했습니다. 하지만, 반복작업이 돌아가던 데스크톱에서 노트북으로 전환하기로 결정하면서 클라우드 환경으로 이전은 불가피하게 됐습니다. 가장 쉬운 방법은 AWS EC2 에 그대로 올리는 것이었고 운영체제만 macOS 에서 Amazon Linux 로 변경하면서 Chrome driver 설치 문제만 해결하니 간단하게 해결되었습니다.

## 컨테이너화: AWS ECS

그 후 몇년 간 제가 해야되는 일은 1년마다 AWS 에 새 계정읆 만들어서 free tier 혜택을 받는 일 뿐이었습니다. AWS CloudFormation 과 EC2 의 user data[^8] 를 이용하여 손쉽게 같은 환경을 구축하는 것이 가능했습니다. 이번에 큰 변경사항은 사이트 자체에 있었습니다. 사이트의 구조와 게시판이 생겨나고 합쳐지고 삭제되는 등 수의 변화가 생겼습니다. 따라서 몇년 만에 소스코드를 고칠 일이 생겼는데, 개발 환경은 macOS 이고 배포 환경은 Amazon Linux 2 에서 Amazon Linux 2023 으로 넘어가는 시기로 서로 다르다보니 개발과 디버깅 하는 것이 어려웠습니다. 이 문제를 해결하기 위해 도커를 이용해서 앱을 컨테이너화 하고 만들어진 이미지를 AWS ECS Fargate[^9] 를 통해 배포했습니다.

## Toward Serverless: AWS Lambda - Current

ECS Fargate 는 많은 이점이 있었습니다. 서버가 갑자기 다운되거나 로깅을 도입하거나 할 필요가 없었죠. 하지만 이번에는 비용이 문제가 되었습니다. 이 프로젝트의 목적은 손 하나 까딱 안 하고 반복되는 작업을 처리하려고 한 것인데, 이 서비스가 AWS free tier 에 포함되지 않아 불필요한 비용이 발생하기 시작한 것입니다. 이로인해 AWS Lambda function 으로 한 번 더 이전을 준비하게 되었습니다. Lambda 상에서 headless browser 를 실행하는 방법에 대해 최근 참조할만한 문서가 존재하지 않았기 때문에, 컨테이너화 단계에서 생성한 이미지 자체를 올리기로 했습니다[^10]. 결과적으로 이 반복 작업은 클라우드 상에서 무료로 돌아가게 됐습니다.