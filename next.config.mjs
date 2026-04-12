const isGithubActions = process.env.GITHUB_ACTIONS === "true";
const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const githubActionsBasePath = isGithubActions && repoName ? `/${repoName}` : "";

// For manual local export to GitHub Pages, allow explicit base path override.
const manualBasePathRaw = process.env.BASE_PATH ?? process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const manualBasePath =
  manualBasePathRaw && !manualBasePathRaw.startsWith("/") ? `/${manualBasePathRaw}` : manualBasePathRaw;

const basePath = manualBasePath || githubActionsBasePath;

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  basePath,
  assetPrefix: basePath || undefined,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
