export type NavItem = {
  label: string;
  href: `#${string}`;
};

export type SocialLink = {
  label: string;
  href: string;
};

export type HeroData = {
  name: string;
  phone: string;
  email: string;
  role: string;
  tagline: string;
  summary: string[];
  profileImage: string;
  resumeUrl: string;
  githubUrl: string;
};

export type AboutData = {
  title: string;
  description: string;
  backendSkills: string[];
  devopsSkills: string[];
};

export type ExperienceItem = {
  company: string;
  position: string;
  period: string;
  summary: string;
  highlights: string[];
  techStack: string[];
  relatedProjectSlugs?: string[];
};

export type ProjectItem = {
  slug: string;
  name: string;
  description: string;
  thumbnail: string;
  techStack: string[];
  githubUrl?: string;
  demoUrl?: string;
  detailMdFile: string;
  isHighlighted?: boolean;
  highlightLabel?: string;
};

export type ContactData = {
  email: string;
  github: string;
  phone: string;
  location: string;
  footerText: string;
};

export type PortfolioData = {
  navItems: NavItem[];
  hero: HeroData;
  about: AboutData;
  experiences: ExperienceItem[];
  projects: ProjectItem[];
  contacts: SocialLink[];
  contactInfo: ContactData;
};

export const portfolioData: PortfolioData = {
  navItems: [
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ],
  hero: {
    name: "이창복",
    phone: "010-2071-3648",
    email: "lcb07070@gmail.com",
    role: "Backend Engineer",
    tagline: "안정적인 서버 구조와 운영 자동화를 통해 서비스 신뢰를 높이는 백엔드 엔지니어입니다.",
    summary: [
      "4년 9개월 차 백엔드 엔지니어: TypeScript, Python, Node.js 기반의 다각적 서버 설계 및 운영 역량 보유.",
      "성능 최적화 및 트래픽 대응: 쿼리 최적화, Redis 캐싱, 비동기 로직 개선을 통해 트래픽 급증 상황에서 API 응답 지연 문제를 구조적으로 해결.",
      "인프라 및 자동화: AWS(EC2, S3, RDS) 기반의 CI/CD 파이프라인 구축으로 배포 프로세스 효율화 및 개발 생산성 향상.",
      "운영 안정성 확보: Python 스크립트를 활용한 로그 분석 및 리소스 시각화로 불필요한 서버 자원 낭비를 개선하고 데이터 불일치 이슈 해결.",
      "지속 가능한 성장: 질병으로 인해 생긴 공백기 동안에도 Docker, Django (DRF 기반 REST API 서버 개발) , AI agent 등 기술 스택을 자발적으로 학습하며 현업 복귀를 위한 기술적 준비 완료.",
    ],
    profileImage: "/images/Lee_image.jpg",
    resumeUrl: "/resume.pdf",
    githubUrl: "https://github.com/lcb707",
  },
  about: {
    title: "4년 9개월 차 백엔드 엔지니어",
    description:
      "TypeScript, Python, Node.js 기반 서버 설계와 운영 경험을 보유하고 있습니다. 트래픽 급증 구간에서의 쿼리 최적화, Redis 캐싱, 비동기 작업 분리를 통해 API 응답 지연 문제를 구조적으로 해결했고, AWS 기반 CI/CD 구축으로 배포 안정성과 개발 생산성을 함께 개선했습니다.",
    backendSkills: [
      "TypeScript",
      "Python",
      "Node.js",
      "Flask",
      "Django",
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "Redis",
      "MQTT",
      "REST API",
    ],
    devopsSkills: [
      "Linux",
      "AWS EC2",
      "AWS S3",
      "AWS RDS",
      "Docker",
      "Nginx",
      "Git",
      "CI/CD",
      "GitHub Actions",
    ],
  },
  experiences: [
    {
      company: "(주)이성",
      position: "서버 관리자",
      period: "2019.12 - 2023.03",
      summary:
        "IoT 전광판 관리 플랫폼과 김천 관광 안내 서비스의 백엔드 아키텍처 설계/개발/운영을 주도하며, 데이터 연동·트래픽 대응·배포 자동화까지 end-to-end로 담당했습니다.",
      highlights: [
        "Node.js(TypeScript) REST API 서버, Python Flask 연동 서버, MQTT Broker를 운영하며 IoT 디바이스 송출/제어 안정성 강화",
        "MySQL 설계/튜닝, Redis 캐시, DocumentDB 구성으로 데이터 조회 구조를 최적화하고 피크 시간대 응답 일관성 확보",
        "트래픽 급증 구간에서 중복 요청 제거·비동기 처리 분리·캐시 전략 보완으로 API 응답 지연 병목 해소",
        "AWS EC2/S3/RDS + Docker + Nginx 기반 인프라 운영 및 AWS Pipeline/Shell/Makefile 기반 CI/CD 표준화",
        "서비스 장애 대응, 로그 분석, 백업/복구 루틴 및 API 문서화(ApiDoc) 정착으로 운영 가시성과 협업 효율 개선",
      ],
      techStack: ["TypeScript", "Node.js", "Python", "Flask", "MySQL", "DocumentDB", "Redis", "MQTT", "AWS", "Docker", "Nginx"],
      relatedProjectSlugs: ["iot-signage-platform", "gimcheon-tour-service"],
    },
    {
      company: "(주)로보러스",
      position: "백엔드/시스템 개발",
      period: "2018.03 - 2019.07",
      summary:
        "키오스크 주문 관리 솔루션, AmericanDeli 매장 시스템, 감정표현 인식 프로젝트에서 서버/DB/API와 디바이스 연동을 담당하며 실운영 가능한 통합 시스템을 구축했습니다.",
      highlights: [
        "Node.js 웹 서버와 MongoDB/MySQL 기반 주문 데이터 처리 로직을 구현해 매장 운영 흐름 자동화",
        "Python Django API 연동으로 프로젝트별 기능 확장 및 백엔드-클라이언트 데이터 흐름 표준화",
        "결제기(PostLink), 프린터, 카메라 통신 로직을 통합해 장비 연동 안정성 및 장애 대응 용이성 향상",
        "C# WPF 기반 화면과 서버를 연동해 주문·결제·출력 흐름을 단일 프로세스로 구성",
        "국내외 전시/매장 환경에 맞춘 커스터마이징 경험을 축적하며 요구사항 대응 역량 강화",
      ],
      techStack: ["Node.js", "Python", "Django", "MongoDB", "MySQL", "C#", "WPF"],
      relatedProjectSlugs: ["kiosk-order-solution"],
    },
  ],
  projects: [
    {
      slug: "iot-signage-platform",
      name: "(주)이성 _ IoT 전광판 관리 플랫폼",
      description: "전광판 콘텐츠 송출/스케줄링/외부 데이터 연동을 위한 백엔드 시스템",
      thumbnail: "/images/isung_main.jpg",
      techStack: ["TypeScript", "Node.js", "Python Flask", "MySQL", "Redis", "MQTT", "AWS"],
      githubUrl: "",
      detailMdFile: "project-iot-signage.md",
      isHighlighted: true,
      highlightLabel: "추천 프로젝트",
    },
    {
      slug: "gimcheon-tour-service",
      name: "(주)이성 _ 김천 관광 안내 웹서비스",
      description: "키오스크/모바일 기반 관광 정보 제공 서비스 백엔드 구축",
      thumbnail: "/images/isung_kimcheon.png",
      techStack: ["Node.js", "DocumentDB", "Redis", "AWS EC2/S3", "Docker", "CI/CD"],
      githubUrl: "",
      detailMdFile: "project-gimcheon-tour.md",
      isHighlighted: true,
      highlightLabel: "추천 프로젝트",
    },
    {
      slug: "kiosk-order-solution",
      name: "(주)로보러스 _ 키오스크 주문 관리 솔루션",
      description: "무인 주문/주방관리/대기관리 시스템과 결제기·프린터 연동",
      thumbnail: "/images/robo_main.jpg",
      techStack: ["Node.js", "MongoDB", "MySQL", "Python Django", "C# WPF"],
      githubUrl: "",
      detailMdFile: "project-kiosk-solution.md",
    },
    {
      slug: "vqueue",
      name: "실시간 대기열 웹 시스템",
      description: "동시 접속 제어와 입장 속도 제어를 위한 실시간 대기열 웹 시스템",
      thumbnail: "/images/vqueue_main.png",
      techStack: ["Next.js", "TypeScript", "Python", "Django DRF", "Redis", "Docker", "Nginx"],
      githubUrl: "https://github.com/lcb707",
      detailMdFile: "vqueue_project.md",
    },
    {
      slug: "loginsaas",
      name: "LoginSaaS - MSA 통합 인증(SSO) 서비스",
      description: "JWT, MFA, RBAC, 이벤트 동기화를 포함한 마이크로서비스 중앙 인증 서버",
      thumbnail: "/images/loginsaas_architecture.png",
      techStack: ["Python", "Django DRF", "PostgreSQL", "Redis", "RabbitMQ", "Docker", "Nginx"],
      githubUrl: "https://github.com/lcb707",
      detailMdFile: "loginsaas_project.md",
    },
    {
      slug: "recipeyo",
      name: "Recipeyo",
      description: "레시피·냉장고·커뮤니티와 AI 레시피 추출을 연결한 풀스택 플랫폼",
      thumbnail: "/images/recipe_main.png",
      techStack: ["Next.js", "TypeScript", "Django DRF", "MySQL", "Redis", "Celery", "AWS EC2"],
      githubUrl: "https://github.com/lcb707",
      demoUrl: "https://recipeyo.duckdns.org/",
      detailMdFile: "recipeyo_project.md",
    },
    {
      slug: "portfolio-site",
      name: "Next.js 포트폴리오 웹사이트",
      description: "Markdown 기반 상세 페이지와 GitHub Pages 자동 배포를 지원하는 포트폴리오",
      thumbnail: "/images/github_page.png",
      techStack: ["Next.js", "TypeScript", "Tailwind CSS", "GitHub Actions", "GitHub Pages"],
      githubUrl: "https://github.com/lcb707",
      detailMdFile: "portfolio_project.md",
    },
    {
      slug: "backend-boilerplates",
      name: "Backend Boilerplates",
      description: "Python DRF + Node REST API 템플릿 묶음으로 빠른 백엔드 시작 환경 제공",
      thumbnail: "/images/boilerplate_main.png",
      techStack: ["Python", "Django DRF", "Node.js", "TypeScript", "MySQL", "Redis", "Docker"],
      githubUrl: "https://github.com/lcb707",
      detailMdFile: "boilerplate_project.md",
    },
  ],
  contacts: [
    { label: "Email", href: "mailto:lcb07070@gmail.com" },
    { label: "Phone", href: "tel:01020713648" },
    { label: "GitHub", href: "https://github.com/lcb707" },
  ],
  contactInfo: {
    email: "lcb07070@gmail.com",
    github: "https://github.com/lcb707",
    phone: "010-2071-3648",
    location: "대한민국",
    footerText: "© 2026 이창복. All rights reserved.",
  },
};
