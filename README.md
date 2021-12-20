# Collaborative-documentaiton-server

Collaboration tool web application for working with documents such as google docs

협업 가능한 문서 작업용 웹 어플리케이션

### Installation

```sh
npm install
```

### Development

```sh
npm start
```

## 프로젝트 구조

협업을 위한 문서 작업용 웹 어플리케이션으로 server와 client 통합 개발을 위한 프로젝트

- Frontend (React), Backend (Express)는 별도의 프로젝트로서 버전 컨트롤을 포함한 패키지 관리 또한 각각 독립적으로 관리

- MERN stack 및 실시간 통신은 Soceket.io를 통해 구현

## Development Stack

- MERN stack
- Soceket.io
- Firebase Auth

## 주요 기능

- Firebase Auth 를 통한 소셜로그인
- 로그인을 통해 인증된 사용자는 새로운 문서 생성 및 본인이 작성한 문서목록 열람 가능
- 각 문서에는 고유한 URL이 부여되며 이를 통해 다른 유저들과 동시 작업 가능
- 실시간으로 여러 사용자가 문서 작업을 진행할 경우, 다른 유저의 문서 작업 커서가 표시
- 문서 작성 중 이탈한 사용자가 재접속하여 작업할 경우 작업 중이던 내용을 유지한 페이지를 표시

## Kepp In Mind

- 코드 스타일과 가독성
- 에러 핸들링

## 프로젝트 과정

### 24 Aug [Mon]

- Project Setting (create React app, Express-generator)
- [Front-end] Social Login Feature
  [x] firebase setup
  [x] using firebase auth
  [x] set login form
  [x] creating Account
  [x] set Social login
  [x] logout

- [Back-end] DB Schema 설계
  [x] user
  [x] document

### 25 Aug [Tue]

- [Back-end] Rest API 설계

  1. Auth API 설계
     [x] Login (/auth/login)
     [x] passport (/lib/passport.js)
     [x] jwt Token
  2. Document API 설계
     [x] GET Document (/documents)
     [x] GET Documents/:Id (/documents/:id)
     [x] POST Create Documents (/documents)
     [x] PUT Update Documents (/documents/:id)
     [x] DELETE Delete Documents (/documents/:id)

- [Front-end] UI 화면 정리

### 26 Aug [Wed]

Socket API 설계

- [Back-end] socket.Io
- [Front-end] socket.Io-client
- error handling
- props, function, variable naming recheck
- code style check
- code review check
- readme.md
