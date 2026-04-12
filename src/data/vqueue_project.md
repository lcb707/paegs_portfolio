# Virtual Queue (가상 대기열) - 동시 접속 제어·입장 속도 제어 웹 시스템

대규모 동시 접속 상황에서 서버 과부하를 막기 위해, 선착순 대기열·입장 제어·실시간 상태 폴링을 한 흐름으로 연결한 풀스택 웹 애플리케이션입니다. 

## 🎯 프로젝트 개요
- **목적**: 처리율 제한(Rate Limiting)과 토큰 버킷(Token Bucket) 기반 입장 제어 패턴을 학습하고, Redis(ZSET/HASH) 기반 큐 상태 관리와 함께 FIFO 대기열/활성 세션 상한(Capacity Gate)/실시간 상태 안내(순번·ETA)까지 포함해 실제로 구현·검증
- **플랫폼**: 웹 기반 반응형 (Next.js App Router)
- **배포**: Docker Compose, Nginx (리버스 프록시), 로컬/서버 운영 가능

## ⚡ 주요 기능
- 입장 대기 요청(Enqueue) 시 고유 Job ID 발급 및 대기열 등록
- 선착순(FIFO) 대기열 관리 및 Job 상태 조회 API 제공
- `waiting -> invited -> active -> completed/expired/cancelled` 상태 전이
- 활성 세션 상한(`MAX_ACTIVE_SESSIONS`) 기반 동시성 제어
- 초당 입장 속도(`ADMIT_RATE_PER_SEC`) 기반 admission 제어(Token Bucket)
- invited backlog 상한(`INVITED_BUFFER_SLOTS`) 기반 적체 제어
- 프론트엔드 상태 폴링(백오프·AbortController·중복 폴링 방지)
- invited 상태 자동 claim, active 세션 heartbeat, complete 처리
- 부하 테스트(Locust)로 대량 동시 요청 시나리오 검증

## 📌 API 엔드포인트
- `POST /api/queue/enqueue/`
- `GET /api/queue/status/{job_id}/`
- `POST /api/queue/claim/{job_id}/`
- `POST /api/queue/heartbeat/{job_id}/`
- `POST /api/queue/complete/{job_id}/`
- `DELETE /api/queue/cancel/{job_id}/`
- `GET /api/queue/stats/`

## 🛠️ 기술 스택

- **Frontend**: Next.js (App Router), TypeScript, Tailwind CSS
- **Backend**: Python, Django, Django REST Framework, Gunicorn
- **Async**: Custom Worker (admission/cleanup loop), Redis
- **Database/State**: Redis (ZSET/HASH 기반 큐/상태 저장)
- **Infra**: Docker, Docker Compose, Nginx
- **Load Test**: Locust

## 아키텍처 요약
1. 사용자는 Nginx(80)로 접속
2. `/api/*`는 Django(Gunicorn)로 전달
3. 웹 페이지 요청은 Next.js로 전달
4. 입장 제어/만료 정리는 백그라운드 worker가 Redis 기반으로 처리
5. 상태 조회는 폴링 API로 제공되고, 프론트가 표준 상태 모델로 렌더링

## 🚀 개발 과정
1. 기능명세서·유저플로우 기반 절대 요구사항 정립
2. DRF API(`enqueue/status/cancel/stats`)와 Redis 큐 서비스 초기 구현
3. worker 루프(admit/process/cleanup) 기반 상태 전이·TTL 처리 구축
4. 프론트 폴링 훅(백오프/취소/중복방지)과 대기열 UI 구현
5. 실서비스 유사 설계로 상태모델을 `invited/active` 중심으로 확장
6. `claim/heartbeat/complete` API 추가 및 booking 흐름 연결
7. `MAX_ACTIVE_SESSIONS` + `ADMIT_RATE_PER_SEC` 이중 제어 구조 반영
8. Locust 시나리오 확장 및 실행 검증 체크리스트 문서화

## 💡 학습한 점
- Django DRF 기반 API 구조를 실제 대기열 도메인에 적용하며 상태 전이 중심 서버 설계 방식을 체계적으로 학습
- Redis ZSET/HASH를 활용해 FIFO 순번, 만료 스캔, 상태 조회를 고성능으로 처리하는 큐 데이터 모델링 역량 강화
- 동시 접속 상한과과 초당 입장 속도를 분리해 트래픽 제어 목적별 설계가 필요함을 실전에서 확인
- 백그라운드 워커(admit/cleanup) 설계에서 원자성·정합성·복구 가능성을 고려한 운영 패턴을 습득
- Docker Compose + Nginx + Locust 조합으로 실무형 부하 테스트 및 운영 검증 루프를 구축하는 방법을 학습

## 📱 특징
- Job ID 기반 재진입/복원 가능한 대기열 UX
- API 표준 상태 모델(`status/position/totalWaiting/eta`) 일관 제공
- Capacity Gate + Rate Gate로 “대기열이 길어도 일정한 입장 속도” 설계 가능
- Docker 기반으로 로컬에서 운영 유사 구조를 재현 가능

## 🖼️ 스크린샷
![메인 화면](vqueue_main.png)
![대기열 화면](vqueue_waitting.png)

