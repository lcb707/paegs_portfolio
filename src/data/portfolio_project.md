# Next.js 포트폴리오 웹사이트 - GitHub Pages 정적 배포

Next.js(App Router) 기반으로 제작한 반응형 개발자 포트폴리오 웹사이트입니다.  
데이터와 UI를 분리하고, Markdown 기반 프로젝트 상세 페이지를 지원하며 GitHub Pages에 정적 배포할 수 있도록 구성했습니다.

## 🎯 프로젝트 개요
- **목적**: 이력/경력/프로젝트를 확장 가능한 데이터 구조로 관리하고, 유지보수가 쉬운 포트폴리오 제공
- **플랫폼**: 반응형 웹 (모바일/태블릿/데스크톱)
- **배포**: GitHub Pages (GitHub Actions 자동 배포)

## 🔗 링크 URL
- GitHub Pages URL : `https://lcb707.github.io/paegs_portfolio/`

## ⚡ 주요 기능
- Header/Hero/About/Experience/Projects/Contact 단일 페이지 구성
- `src/data/portfolio.ts` 기반 콘텐츠 렌더링 (데이터/UI 분리)
- 프로젝트 카드 클릭 시 상세 페이지(`/projects/[slug]`) 이동
- Markdown(`src/data/*.md`) 기반 프로젝트 상세 콘텐츠 렌더링
- 제목/소제목 단위 섹션 카드형 상세 페이지 UI
- 상세 페이지 이미지 갤러리(메인 1장 + 하단 썸네일 스크롤)
- MD에서 이미지 파일명만 입력 시 `/public/images` 자동 매핑
- GitHub Pages 정적 export 및 basePath/assetPrefix 자동 대응

## 🛠️ 기술 스택
- **Frontend**: Next.js 16 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS v4, lucide-react
- **Markdown**: react-markdown, remark-gfm
- **Build/Deploy**: Next static export, GitHub Actions, GitHub Pages

## 💡 학습한 점
- 데이터 소스와 UI 컴포넌트를 분리하면 콘텐츠 변경 속도와 유지보수성이 크게 향상됨을 확인
- App Router + SSG 환경에서 Markdown 문서를 상세 페이지로 정적 생성하는 구조를 통해 확장 가능한 포트폴리오 패턴을 확보
- 정적 호스팅 환경(GitHub Pages)에서는 `output: export`, `basePath`, `assetPrefix` 같은 배포 설정 정합성이 핵심임을 학습
- 이미지 갤러리 UX(메인 + 썸네일)와 Markdown 파싱 커스터마이징을 결합해 콘텐츠 가독성을 높이는 방법을 경험
- GitHub Actions 기반 자동 배포 파이프라인을 통해 문서/데이터 수정이 곧 배포로 이어지는 운영 효율을 확보

## 📱 특징
- 화이트 기반의 깔끔한 포트폴리오 디자인과 포인트 컬러 적용
- 모바일 우선 반응형 레이아웃
- 콘텐츠 추가 시 데이터/MD 파일 수정만으로 페이지 자동 반영
- 정적 배포 친화적인 구조로 빠른 로딩과 단순한 운영

## 🖼️ 스크린샷
![메인 화면](github_page.png)

