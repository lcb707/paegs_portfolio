# LoginSaaS - MSA 통합 인증(SSO) 서비스

MSA(Microservices Architecture) 환경에서 여러 서비스가 공통으로 사용하는 중앙 인증 서버입니다.
Django DRF 기반으로 JWT 발급/검증, 소셜 로그인, MFA, RBAC, 토큰 인트로스펙션을 제공해 인증 로직을 한곳으로 통합합니다.
RabbitMQ 이벤트 버스를 통해 Board(게시판)·Notification(알림) 서비스와 유저 데이터를 자동 동기화하며, 각 서비스는 독립 데이터베이스를 운영합니다.

## 🎯 프로젝트 개요
- **목적**: 서비스별로 분산된 인증/인가 로직을 중앙화해 보안 일관성, 개발 생산성, 운영 효율을 동시에 확보 시스템을
포함해 실제로 구현·검증
- **플랫폼**: API 중심 백엔드 서비스 (마이크로서비스 연동형)
- **운영 형태**: Docker Compose 기반 MSA 구성 (13개 컨테이너), Nginx API Gateway 연계
- **이벤트 동기화**: RabbitMQ Topic Exchange를 통한 Eventual Consistency

## ⚡ 주요 기능
- 이메일/비밀번호 기반 회원가입, 로그인, 로그아웃
- RS256 Access Token(15분) + Refresh Token Rotation(7일)
- Google/Kakao/Naver OAuth2 소셜 로그인
- TOTP 기반 MFA(2단계 인증) 및 백업 코드 지원
- RBAC(역할/권한) 관리 및 JWT 클레임 반영
- 토큰 인트로스펙션 API(서비스 간 토큰 검증)
- 인증 이벤트 감사 로그(Audit Log) 수집
- 로그인 실패 횟수 기반 계정 잠금 및 Rate Limiting
- 이벤트 기반 유저 동기화: 회원가입·프로필 변경 시 자동 전파
- 게시판 서비스: 게시글 CRUD (Gateway Trust 인증, 독립 PostgreSQL)
- 알림 서비스: 이벤트 기반 자동 알림 생성·조회·읽음 처리

## 🛠️ 기술 스택
- **Backend**: Python 3.12, Django 5.0, Django REST Framework 3.15
- **Auth**: djangorestframework-simplejwt, django-allauth, django-otp
- **Database**: PostgreSQL 16 (서비스별 독립 DB 3개)
- **Cache/Store**: Redis 7 (토큰 저장, 블랙리스트, 캐시, Rate Limit 상태)
- **Message Broker**: RabbitMQ 3 + pika (서비스 간 이벤트 동기화)
- **Async**: Celery 5 + Redis Broker, django-celery-beat
- **Gateway**: OpenResty (Nginx) + lua-resty-jwt
- **Infra**: Docker, Docker Compose (13개 컨테이너)
- **Docs/Test**: drf-spectacular(OpenAPI), pytest, ruff, black

## MSA 서비스 구성
### 애플리케이션 서비스
| 서비스 | 역할 | DB | 포트 |
|--------|------|-----|------|
| `auth_service` | 중앙 인증 (JWT 발급, 소셜 로그인, RBAC) | loginsaas (PostgreSQL) | 8000 |
| `board_service` | 게시판 CRUD | board_db (PostgreSQL) | 8010 |
| `notification_service` | 알림 생성·조회·읽음 | notification_db (PostgreSQL) | 8020 |

### 인프라 서비스
| 서비스 | 역할 | DB | 포트 |
|--------|------|-----|------|
| `nginx` | API Gateway (JWT 검증 + 라우팅) | — | 80, 443 |
| `rabbitmq` | 이벤트 버스 (Topic Exchange) | — | 5672, 15672 |
| `redis` | 토큰 저장 / 캐시 / Celery 브로커 | — | 63790 |

## 아키텍처 요약
1. 클라이언트 요청은 Nginx API Gateway로 유입
2. Gateway에서 JWT 서명 검증 → X-User-Id/X-User-Email/X-User-Roles 헤더 주입
3. 인증 API(`/api/v1/auth/`)는 Auth Service로, 게시판(`/api/v1/boards/`)은 Board Service로, 알림(`/api/v1/notifications/`)은 Notification Service로 라우팅
4. 각 서비스는 독립 PostgreSQL을 사용 (서비스별 데이터 격리)
5. Auth Service에서 유저 생성/변경 시 RabbitMQ(`auth.events`)로 이벤트 발행
6. Board/Notification Service의 컨슈머가 이벤트를 수신하여 `SyncedUser` 테이블에 동기화
7. Board Service에서 게시글 작성 시 RabbitMQ(`board.events`)로 이벤트 발행 → Notification Service가 자동 알림 생성
8. Celery Worker가 이메일 발송/정리 작업을 비동기 처리
9. 타 마이크로서비스는 `POST /auth/introspect`로 토큰 유효성 확인 가능

## 🚀 개발 과정
1. PRD/아키텍처 문서로 인증 도메인 요구사항(P0/P1) 정리
2. Django 프로젝트 구조(`authentication/users/social/mfa/rbac/audit`) 설계
3. JWT 발급/갱신/폐기(회전) 및 Redis 토큰 저장 전략 수립
4. 소셜 로그인(OAuth2), MFA, RBAC를 모듈 단위로 확장
5. Nginx Gateway + Lua로 사전 JWT 검증 및 요청 제한 정책 추가
6. 인트로스펙션 API/감사 로그/비동기 태스크를 운영 관점으로 보강
7. MSA 확장: RabbitMQ 이벤트 버스 구축 + Board/Notification 서비스 추가
8. 이벤트 기반 유저 동기화: auth_service -> RabbitMQ -> 각 서비스 컨슈머 -> SyncedUser 테이블
9. Gateway Trust 패턴: Nginx에서 JWT 검증 후 X-User-Id 헤더 주입, 하위 서비스 인증 분리
10. E2E 테스트: 회원가입 -> 유저 동기화 -> 게시글 작성 -> 알림 자동 생성 검증 완료

## 토큰/보안 설계 핵심
- Access Token: RS256 JWT, 15분 만료, Response Body 반환, `iss: loginsaas.example.com`
- Refresh Token: 랜덤 문자열, Redis 저장, `HttpOnly + Secure + SameSite=Lax` 쿠키 반환
- Token Rotation: Refresh 사용 시 새 토큰 발급 + 구 토큰 즉시 폐기
- Reuse Detection: 사용된 Refresh Token 재사용 시 세션 강제 만료 처리
- Gateway Trust: Nginx에서 JWT 검증 후 X-User-Id 등 헤더 주입, 하위 서비스는 헤더만 신뢰

## Redis 키 패턴
- `refresh:{jti}` -> `user_id` (TTL: 7일)
- `blacklist:{jti}` -> `1` (TTL: Access Token 잔여 만료시간)
- `login_fail:{user_id}` -> 실패 횟수 (TTL: 10분)
- `email_verify:{token}` -> `user_id` (TTL: 24시간)
- `pw_reset:{token}` -> `user_id` (TTL: 1시간)
- `introspect_cache:{jti}` -> JSON 응답 (TTL: Access Token 잔여시간)

## RabbitMQ Exchange / Routing Key
### `auth.events`
| Exchange | Type | Routing Key | Publisher | Consumer |
|----------|------|-------------|-----------|----------|
| `auth.events` | topic | `user.created` | auth_service | board-consumer, notification-consumer |
| `auth.events` | topic | `user.updated` | auth_service | board-consumer, notification-consumer |

### `board.events`
| Exchange | Type | Routing Key | Publisher | Consumer |
|----------|------|-------------|-----------|----------|
| `board.events` | topic | `post.created` | board_service | notification-consumer |

## 💡 학습한 점
- 인증 시스템은 토큰 발급보다 "폐기/재사용 탐지/회전"이 보안 완성도를 좌우함
- Redis TTL 모델을 활용하면 인증 상태성 데이터를 고성능으로 다룰 수 있음
- API Gateway 레이어 검증은 Auth 서버 부하와 지연을 크게 줄이는 데 효과적임
- RBAC, MFA, 감사 로그를 초기에 구조화하면 확장성과 규제 대응이 수월해짐
- 문서(PRD/Architecture/Tech Stack) 중심 설계가 구현 우선순위 결정에 큰 도움을 줌
- RabbitMQ Topic Exchange + 이벤트 기반 동기화로 서비스 간 느슨한 결합 달성
- Gateway Trust 패턴으로 각 서비스가 직접 JWT 검증을 수행하지 않아도 됨
- 독립 DB + 이벤트 동기화가 실무에서의 Eventual Consistency 패턴 이해에 도움
- 서비스 간 유저 동기화는 비동기 이벤트가 가장 확장성 있는 방식임

## 📱 특징
- 마이크로서비스 공통 인증을 위한 중앙 SSO 백엔드
- 보안 표준을 반영한 토큰 아키텍처(RS256 + Rotation + Blacklist)
- 소셜 로그인 + MFA + RBAC를 한 시스템에서 통합 제공
- Docker 기반으로 개발/스테이징 환경 재현이 쉬운 구조
- 실제 MSA 구현: 3개 독립 서비스 + 독립 DB + RabbitMQ 이벤트 동기화
- Gateway Trust 인증: Nginx에서 토큰 검증 -> 헤더 전파 -> 서비스별 인증 없이 동작
- 이벤트 기반 알림: 게시글 작성 시 다른 유저에게 자동 알림 생성

## 🖼️ 스크린샷
![아키텍처 다이어그램](loginsaas_architecture.png)
