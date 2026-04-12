import fs from "node:fs/promises";
import path from "node:path";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, ExternalLink, FolderGit2, Tag } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { portfolioData } from "@/src/data/portfolio";
import { ImageGallery } from "@/src/components/project/ImageGallery";
import { withBasePath } from "@/src/lib/basePath";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return portfolioData.projects.map((project) => ({ slug: project.slug }));
}

type MarkdownSection = {
  heading: string;
  content: string;
  images: { src: string; alt: string }[];
};

function normalizeMarkdownImageSrc(src?: string) {
  if (!src) return "";
  if (src.startsWith("http://") || src.startsWith("https://")) return src;
  if (src.startsWith("/")) return withBasePath(src);
  const cleaned = src.replace(/^\.?\//, "");
  // If user adds arbitrary images to public/images, plain filenames also work.
  if (!cleaned.includes("/")) return withBasePath(`/images/${cleaned}`);
  return withBasePath(`/${cleaned}`);
}

function parseMarkdownSections(markdown: string) {
  const lines = markdown.split("\n");
  const titleLine = lines.find((line) => line.startsWith("# "));
  const title = titleLine ? titleLine.replace("# ", "").trim() : "";
  const titleIndex = titleLine ? lines.indexOf(titleLine) : -1;
  const normalized = titleIndex >= 0 ? lines.slice(titleIndex + 1).join("\n").trim() : markdown.trim();

  const chunks = normalized
    .split(/^##\s+/gm)
    .map((chunk) => chunk.trim())
    .filter(Boolean);

  const intro = chunks.length > 0 && !normalized.startsWith("## ") ? chunks[0].split("\n").slice(0).join("\n").trim() : "";
  const sectionChunks = normalized.startsWith("## ") ? chunks : chunks.slice(1);

  const sections: MarkdownSection[] = sectionChunks.map((chunk) => {
    const [firstLine, ...restLines] = chunk.split("\n");
    const rawContent = restLines.join("\n").trim();
    const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
    const images: { src: string; alt: string }[] = [];

    let match = imageRegex.exec(rawContent);
    while (match) {
      images.push({
        alt: match[1]?.trim() ?? "",
        src: normalizeMarkdownImageSrc(match[2]?.trim()),
      });
      match = imageRegex.exec(rawContent);
    }

    const content = rawContent.replace(imageRegex, "").replace(/\n{3,}/g, "\n\n").trim();

    return {
      heading: firstLine.trim(),
      content,
      images,
    };
  });

  return { title, intro, sections };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = portfolioData.projects.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  const absolutePath = path.join(process.cwd(), "src", "data", project.detailMdFile);
  const markdown = await fs.readFile(absolutePath, "utf-8");
  const { title, intro, sections } = parseMarkdownSections(markdown);
  const pageTitle = title || project.name;
  const normalizedSections =
    sections.length > 0
      ? sections
      : [{ heading: "프로젝트 내용", content: markdown.replace(/^#\s+.*$/m, "").trim(), images: [] }];

  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-zinc-50">
      <div className="mx-auto w-full max-w-5xl px-6 py-14">
        <Link href="/#projects" className="text-sm font-medium text-emerald-600 hover:text-emerald-700">
          ← 프로젝트 목록으로
        </Link>

        <header className="mt-6 overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-sm">
          <div className="h-2 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500" />
          <div className="p-8">
            <div className="mb-4 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                <Tag size={14} />
                Project Detail
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600">
                <CalendarDays size={14} />
                Markdown Driven
              </span>
            </div>
            <h1 className="text-3xl font-bold text-zinc-900 md:text-4xl">{pageTitle}</h1>
            <p className="mt-2 inline-flex items-center gap-2 text-sm text-zinc-500">
              <FolderGit2 size={16} />
              slug: {project.slug}
            </p>
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:border-emerald-600 hover:text-emerald-700"
              >
                프로젝트 링크
                <ExternalLink size={16} />
              </a>
            )}
          </div>
          {intro && (
            <div className="border-t border-zinc-100 px-8 py-6 text-zinc-700">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  p: ({ children }) => <p className="leading-7 text-zinc-700">{children}</p>,
                }}
              >
                {intro}
              </ReactMarkdown>
            </div>
          )}
        </header>

        <section className="mt-8 space-y-5">
          {normalizedSections.map((section) => (
            <article
              key={section.heading}
              className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <h2 className="mb-4 border-l-4 border-emerald-500 pl-3 text-xl font-semibold text-zinc-900">{section.heading}</h2>
              <div className="space-y-2 text-zinc-700">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h3: ({ children }) => <h3 className="mt-6 text-lg font-semibold text-zinc-900">{children}</h3>,
                    p: ({ children }) => <p className="leading-7 text-zinc-700">{children}</p>,
                    ul: ({ children }) => <ul className="list-disc space-y-2 pl-6 text-zinc-700">{children}</ul>,
                    ol: ({ children }) => <ol className="list-decimal space-y-2 pl-6 text-zinc-700">{children}</ol>,
                    table: ({ children }) => (
                      <div className="my-4 w-full overflow-x-auto rounded-xl border border-zinc-300">
                        <table className="w-full border-collapse text-sm">{children}</table>
                      </div>
                    ),
                    thead: ({ children }) => <thead className="bg-zinc-100 text-zinc-900">{children}</thead>,
                    tbody: ({ children }) => <tbody>{children}</tbody>,
                    tr: ({ children }) => <tr className="border-b border-zinc-300 last:border-b-0">{children}</tr>,
                    th: ({ children }) => <th className="border-r border-zinc-300 px-3 py-2 text-left font-semibold last:border-r-0">{children}</th>,
                    td: ({ children }) => <td className="border-r border-zinc-300 px-3 py-2 align-top last:border-r-0">{children}</td>,
                    a: ({ href, children }) => (
                      <a href={href} target="_blank" rel="noreferrer" className="font-medium text-emerald-700 underline underline-offset-4">
                        {children}
                      </a>
                    ),
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-4 border-emerald-300 bg-emerald-50 px-4 py-3 text-zinc-700">{children}</blockquote>
                    ),
                  }}
                >
                  {section.content}
                </ReactMarkdown>
                <ImageGallery images={section.images} />
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
