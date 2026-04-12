import Image from "next/image";
import Link from "next/link";
import { ExternalLink, FolderGit2, Sparkles } from "lucide-react";
import { portfolioData } from "@/src/data/portfolio";
import { withBasePath } from "@/src/lib/basePath";

export function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl space-y-8 px-6 py-16">
      <h2 className="text-3xl font-bold text-zinc-900">Projects</h2>
      <div className="grid gap-6 md:grid-cols-2">
        {portfolioData.projects.map((project) => (
          <article
            key={project.slug}
            className={[
              "overflow-hidden rounded-2xl border bg-white shadow-sm transition",
              project.isHighlighted
                ? "border-2 border-emerald-400 shadow-emerald-100/80 ring-2 ring-emerald-300/80"
                : "border-zinc-200 hover:-translate-y-0.5 hover:shadow-md",
            ].join(" ")}
          >
            <Link href={`/projects/${project.slug}`} className="block">
              <div className="relative h-44 w-full">
                <Image src={withBasePath(project.thumbnail)} alt={`${project.name} thumbnail`} fill className="object-cover" />
              </div>
            </Link>
            <div className="space-y-4 p-5">
              {project.isHighlighted && (
                <span className="inline-flex items-center gap-1 rounded-full border border-emerald-300 bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                  <Sparkles size={12} />
                  {project.highlightLabel ?? "Highlighted"}
                </span>
              )}
              <Link href={`/projects/${project.slug}`} className="block">
                <h3 className="text-xl font-semibold text-zinc-900 hover:text-emerald-600">{project.name}</h3>
              </Link>
              <p className="text-zinc-600">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span key={tech} className="rounded-full border border-zinc-300 bg-zinc-50 px-2.5 py-1 text-xs text-zinc-700">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href={`/projects/${project.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-medium text-zinc-700 hover:text-emerald-600"
                >
                  상세 보기
                  <ExternalLink size={16} />
                </Link>
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-zinc-700 hover:text-emerald-600"
                  >
                    <FolderGit2 size={16} />
                    GitHub
                  </a>
                )}
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-zinc-700 hover:text-emerald-600"
                  >
                    <ExternalLink size={16} />
                    Demo
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
