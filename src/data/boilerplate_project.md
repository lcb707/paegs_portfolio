# Backend Boilerplates (Python DRF + Node REST API) - API 서버 빠른 시작 템플릿 묶음

실무형 백엔드 프로젝트를 빠르게 시작할 수 있도록, Django DRF 기반 보일러플레이트와 Node.js REST API 보일러플레이트를 하나의 포트폴리오 관점으로 정리한 템플릿 묶음입니다.

## 🎯 프로젝트 개요
- **목적**: 인증/권한, 공통 응답 포맷, DB/캐시 연동, Docker 기반 실행 환경을 공통 기준으로 재사용 가능한 API 서버 템플릿 구축
- **플랫폼**: 백엔드 API 서버 (Python Django DRF + Node.js Express)
- **배포**: Docker 이미지 기반 실행, 로컬/서버 운영 가능

## ⚡ 주요 기능
- Django DRF 보일러플레이트: Service Layer 패턴, 공통 응답 포맷, JWT + Redis 블랙리스트 인증 구조
- Django DRF 보일러플레이트: Celery 비동기 태스크 구조, Swagger 문서화, MySQL/Redis 연동
- Node.js 보일러플레이트: TypeScript + Express + Knex + OAuth2(password grant/refresh token) 기반 인증 API 구조
- Node.js 보일러플레이트: 사용자/권한(role) 관리, 이벤트 로그, MySQL/Redis 기반 데이터 계층 분리(DAO/Service/Route)
- 두 프로젝트 모두 Dockerfile 제공으로 컨테이너 빌드/실행 표준화 가능

## 🛠️ 기술 스택

- **Backend (Python)**: Python, Django, Django REST Framework, uWSGI, Celery
- **Backend (Node.js)**: Node.js, TypeScript, Express, Knex, OAuth2 Server
- **Database**: MySQL
- **Cache/State**: Redis
- **Infra**: Docker
- **Docs/Etc**: drf-spectacular(Swagger), apidoc

## 아키텍처 요약
1. `backend-boilerplate`는 View -> Service -> Selector/Model 구조로 API 계층을 분리
2. `backend-boilerplate`는 JWT 검증 후 Redis 블랙리스트를 조회해 로그아웃 토큰 무효화를 처리
3. `node-restapi-boilerplate`는 Route -> Middleware -> Controller -> Service -> DAO 계층으로 비즈니스 로직을 분리
4. `node-restapi-boilerplate`는 앱 시작 시 loader에서 Logger/MySQL/Redis/Mailer/Event를 순차 초기화
5. 두 프로젝트 모두 환경 변수 기반 설정으로 실행 환경(dev/prod)을 분리

## 🚀 개발 과정
1. 기존 README 기준으로 각 프로젝트의 핵심 계층 구조와 실행 흐름을 파악
2. `backend-boilerplate`의 Docker 실행 패턴(Dockerfile + entrypoint + Makefile)을 기준 템플릿으로 정리
3. `node-restapi-boilerplate`에 멀티스테이지 Dockerfile과 entrypoint 대기 로직(MySQL/Redis)을 추가
4. TypeScript 빌드 호환성 이슈를 반영해 Docker 빌드 단계에서 TS5 컴파일 기준으로 보완
5. 두 프로젝트를 단일 포트폴리오 관점으로 묶어 기술/기능/아키텍처를 일관 포맷으로 문서화

## 💡 학습한 점
- Django DRF와 Node.js(Express) 양쪽 템플릿을 비교하며 프레임워크가 달라도 계층 분리 원칙은 공통적으로 중요함을 확인
- Service/Selector(또는 Service/DAO) 구조를 표준화하면 유지보수성과 테스트 용이성이 크게 향상됨을 실무 관점에서 체감
- 실무 재사용 가능한 보일러플레이트는 코드 구조뿐 아니라 Docker, 환경 변수, 의존성 정합성까지 함께 제공되어야 함을 학습
- 인증/예외/응답 포맷을 초기부터 통일하면 팀 온보딩 속도와 협업 생산성이 높아진다는 점을 경험
- entrypoint 대기 로직과 실행 전 점검을 통해 DB/Redis 미준비 상태로 인한 초기 장애를 예방하는 DevOps 패턴을 확보

## 📱 특징
- 프레임워크가 달라도 공통된 백엔드 설계 원칙(계층 분리, 설정 분리, 인증 분리)을 유지
- 새 프로젝트 시작 시 복붙 가능한 템플릿 구조(인증, 로깅, DB, 캐시, 문서화) 제공
- Docker 기반으로 로컬에서도 운영 유사한 실행 흐름을 재현 가능
- 포트폴리오/팀 온보딩 문서로 바로 활용 가능한 단일 정리본 제공

## 🖼️ 스크린샷
![메인 화면](boilerplate_main.png)
