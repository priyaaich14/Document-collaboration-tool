# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.# Collaborative-documentaiton-server

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
- SCSS
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

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
