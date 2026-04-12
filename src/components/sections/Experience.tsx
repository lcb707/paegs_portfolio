import Link from "next/link";
import { portfolioData } from "@/src/data/portfolio";

export function Experience() {
  const experiences = [...portfolioData.experiences];

  return (
    <section id="experience" className="mx-auto max-w-6xl space-y-8 px-6 py-16">
      <h2 className="text-3xl font-bold text-zinc-900">Experience</h2>
      <div className="space-y-6 border-l border-zinc-300 pl-6">
        {experiences.map((exp) => (
          <article key={`${exp.company}-${exp.period}`} className="relative rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <span className="absolute -left-[2.05rem] top-8 h-3 w-3 rounded-full bg-emerald-600" />
            <p className="text-sm text-zinc-500">{exp.period}</p>
            <h3 className="mt-1 text-xl font-semibold text-zinc-900">
              {exp.position} · {exp.company}
            </h3>
            <p className="mt-3 text-zinc-600">{exp.summary}</p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-zinc-600">
              {exp.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
            <div className="mt-4 flex flex-wrap gap-2">
              {exp.techStack.map((tech) => (
                <span key={tech} className="rounded-full bg-zinc-100 px-3 py-1 text-xs text-zinc-700">
                  {tech}
                </span>
              ))}
            </div>
            {exp.relatedProjectSlugs && exp.relatedProjectSlugs.length > 0 && (
              <div className="mt-5 border-t border-zinc-100 pt-4">
                <p className="mb-2 text-sm font-semibold text-zinc-800">관련 프로젝트 (링크 클릭 시 상세 페이지로 이동)</p>
                <div className="flex flex-wrap gap-2">
                  {exp.relatedProjectSlugs.map((slug) => {
                    const project = portfolioData.projects.find((item) => item.slug === slug);
                    if (!project) return null;
                    return (
                      <Link
                        key={slug}
                        href={`/projects/${slug}`}
                        className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 hover:bg-emerald-100"
                      >
                        {project.name}
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
