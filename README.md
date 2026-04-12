# GitHub Pages 배포 가이드

이 프로젝트는 Next.js(App Router) + TypeScript + Tailwind CSS 기반 포트폴리오이며, GitHub Pages 정적 배포를 기준으로 설정되어 있습니다.

## 1) 로컬 실행

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:3000`으로 확인합니다.

## 2) 사전 설정 확인

이미 아래 설정이 반영되어 있어야 합니다.

- `next.config.mjs`
  - `output: "export"`
  - `images.unoptimized: true`
  - `trailingSlash: true`
  - GitHub Actions 환경에서 `basePath`/`assetPrefix` 자동 설정
- `.github/workflows/deploy.yml`
  - `main` 브랜치 push 시 자동 배포

## 3) GitHub 저장소 설정

1. GitHub 저장소로 이동
2. `Settings > Pages` 진입
3. `Build and deployment` 항목에서:
   - **Source**: `GitHub Actions` 선택

## 4) 배포 방법

`main` 브랜치에 푸시하면 워크플로우가 자동 실행됩니다.

```bash
git add .
git commit -m "deploy: update portfolio"
git push origin main
```

배포 상태는 `Actions` 탭에서 확인할 수 있습니다.

## 5) 배포 URL

배포 완료 후 사이트는 아래 형식으로 접속됩니다.

- `https://<github-username>.github.io/<repository-name>/`

예시:

- 저장소가 `git_Pages`라면
- `https://<github-username>.github.io/git_Pages/`

## 6) 콘텐츠 업데이트 방법

### 메인 포트폴리오 정보

- `src/data/portfolio.ts`만 수정하면 메인 페이지 섹션이 자동 반영됩니다.

### 프로젝트 상세 페이지

1. `src/data/*.md` 파일 작성/수정
2. `src/data/portfolio.ts`의 프로젝트 항목에 아래만 연결
   - `slug`
   - `detailMdFile`
3. 푸시하면 상세 페이지가 정적으로 생성됩니다.

## 7) 이미지 추가 규칙

- 이미지 파일은 `public/images`에 추가
- 프로젝트 MD에서 아래처럼 사용

```md
![설명](파일명.jpg)
```

파일명만 작성하면 `/images/파일명.jpg`로 자동 매핑됩니다.

## 8) 배포 전 체크리스트

```bash
npm run lint
npm run build
```

두 명령이 모두 성공하면 GitHub Pages 배포 준비가 완료된 상태입니다.
