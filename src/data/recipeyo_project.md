# Recipeyo (레시피오) - 요리 레시피·냉장고·커뮤니티 웹 플랫폼

AI 기반 유튜브 레시피 추출, 스마트 냉장고 재고 관리, 커뮤니티 공유를 한 흐름으로 연결한 풀스택 웹 애플리케이션입니다.

## 🎯 프로젝트 개요
- **목적**: Django DRF 기반 백엔드 구조와 Service/Selector 패턴을 실전에 적용하고, 실무형 DevOps 환경(Docker Compose·Nginx·EC2)에서 AI Agent 기반 유튜브 레시피 추출 파이프라인까지 포함한 서비스 흐름을 구현·검증
- **플랫폼**: 웹 기반 반응형 (Next.js App Router)
- **배포**: Docker Compose, Nginx, AWS EC2

## 🔗 링크 URL
[https://recipeyo.duckdns.org/](https://recipeyo.duckdns.org/)

## ⚡ 주요 기능
- 회원가입·로그인·비밀번호 재설정·마이페이지·회원 탈퇴
- 레시피 등록·수정·삭제·검색·필터·상세 조회, 스크랩 폴더
- 냉장고 재료 등록·유통기한 관리, 냉장고 파먹기 레시피 추천
- 커뮤니티 그룹·요리 일지·스크랩 공유
- 유튜브 URL로 레시피 초안 자동 생성(Celery 비동기, Job ID 상태 조회)
- Nginx 기반 `/api`·`/_next`·정적·미디어 라우팅 및 HTTPS

## 🛠️ 기술 스택

- **Frontend**: Next.js (App Router), TypeScript, Tailwind CSS
- **Backend**: Python, Django, Django REST Framework, uWSGI
- **Auth**: SimpleJWT, Redis 블랙리스트 연동 커스텀 인증
- **Async**: Celery, Redis (broker/result)
- **Database**: MySQL
- **Infra**: Docker, Docker Compose, Nginx, AWS EC2

## 아키텍처 요약
1. 사용자는 Nginx(443)로 접속
2. `/api/*`는 Django(uWSGI)로 전달
3. 웹 페이지 요청은 Next.js로 전달
4. 유튜브 추출은 Celery 워커에서 비동기 처리
5. 결과 미디어는 공유 볼륨을 통해 Nginx가 서빙

## 🚀 개발 과정
1. DRF 기반 API와 Service Layer 패턴으로 도메인 로직 분리
2. Next.js 프론트엔드와 공통 API 응답 형식·인터셉터 연동
3. 냉장고·레시피·커뮤니티 도메인별 앱 구조 및 권한 설계
4. 유튜브 메타데이터·자막·LLM 기반 레시피 JSON 정형화 및 DB 저장 파이프라인
5. Celery 비동기 임포트 및 Job ID 캐시 기반 상태 조회
6. Nginx 리버스 프록시, 정적·미디어 볼륨 공유, HTTPS 운영
7. EC2 배포 시 보안그룹·환경변수·볼륨 정합성 점검 및 이슈 대응
8. 프론트 production 빌드, Suspense·라우팅·미들웨어 안정화

## 💡 학습한 점
- Django DRF 프레임워크의 전반적인 구조(ViewSet/Serializer/Service/권한/예외 처리)를 실전 도메인에 적용하며 구조적 이해를 강화
- Service/Selector 계층 분리로 비즈니스 로직과 조회 로직을 분리해 유지보수성과 테스트 용이성을 높인 백엔드 설계 경험 확보
- Docker Compose, Nginx, uWSGI, Redis, EC2를 연동한 실무형 DevOps 구성을 통해 배포 안정성·운영 재현성·환경 정합성의 중요성을 체득
- AI Agent 기반 유튜브 레시피 추출(메타데이터/자막/LLM 정형화) 파이프라인을 구현하며 비동기 처리(Celery)와 상태 추적(Job ID)의 운영 패턴 학습
- 외부 API/모델 의존 기능에서 장애 대응, 쿼터 관리, 실패 재시도 전략이 사용자 경험과 운영 신뢰성에 미치는 영향을 경험

## 📱 특징
- 네비·데스크톱 헤더를 통한 일관된 정보 구조
- Same-origin `/api` 호출로 CORS 복잡도 완화
- 비동기 레시피 추출 후 상세 페이지로 이어지는 사용자 플로우
- Docker 기반 로컬·EC2 환경 재현 가능한 구성

## 🖼️ 스크린샷
![메인 화면](recipe_main.png)
![마이페이지지](recipe_mypage.png)
![레시피 추출 화면](recipe_youtube.png)
![레시피 검색색](recipe_search.png)
![냉장고 레시피 검색](recipe_fridge.png)