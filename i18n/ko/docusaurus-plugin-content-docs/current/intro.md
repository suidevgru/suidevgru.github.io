---
sidebar_position: 1
---

# 튜토리얼 소개

**5분 안에 Docusaurus**를 빠르게 살펴봅시다.

## 시작하기

**새 사이트를 만드는 것**부터 시작해 보세요.

또는 **[docusaurus.new](https://docusaurus.new)**에서 **바로 Docusaurus를 체험**할 수도 있습니다.

### 준비물

- [Node.js](https://nodejs.org/en/download/) version 20.0 or above:
  - Node.js를 설치할 때는 의존성 관련 체크박스를 모두 선택하는 것을 권장합니다.

## 새 사이트 생성하기

**classic 템플릿**을 사용해 새 Docusaurus 사이트를 생성합니다.

아래 명령을 실행하면 classic 템플릿이 프로젝트에 자동으로 추가됩니다.

```bash
npm init docusaurus@latest my-website classic
```

이 명령은 Command Prompt, PowerShell, Terminal 또는 코드 에디터의 통합 터미널 등 어디에서든 입력할 수 있습니다.

또한 Docusaurus 실행에 필요한 모든 의존성을 함께 설치합니다.

## 사이트 실행하기

개발 서버를 실행합니다.

```bash
cd my-website
npm run start
```

`cd` 명령은 작업 디렉터리를 변경합니다. 새로 만든 Docusaurus 사이트에서 작업하려면 해당 디렉터리로 이동해야 합니다.

`npm run start` 명령은 웹사이트를 로컬에서 빌드하고 개발 서버로 서빙합니다. 이제 http://localhost:3000/ 에서 확인할 수 있습니다.

`docs/intro.md`(이 페이지)를 열고 몇 줄을 수정해 보세요. 사이트가 **자동으로 다시 로드**되며 변경 내용이 즉시 반영됩니다.
