import { portfolioData } from "@/src/data/portfolio";

function Badge({ label, variant = "default" }: { label: string; variant?: "default" | "accent" }) {
  const classes =
    variant === "accent"
      ? "rounded-full border border-emerald-600 bg-emerald-600 px-3 py-1 text-sm font-medium text-white"
      : "rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm text-emerald-700";

  return (
    <span className={classes}>{label}</span>
  );
}

export function About() {
  const { about } = portfolioData;

  return (
    <section id="about" className="mx-auto max-w-6xl space-y-8 px-6 py-16">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-600">About</p>
      <h2 className="text-3xl font-bold text-zinc-900">{about.title}</h2>
      <p className="max-w-3xl text-zinc-600">{about.description}</p>
      <p className="max-w-3xl rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
        Backend 중심으로 API, 데이터베이스, 운영 자동화까지 end-to-end로 담당합니다.
      </p>
      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-zinc-900">Backend</h3>
          <div className="flex flex-wrap gap-2">
            {about.backendSkills.map((skill) => (
              <Badge key={skill} label={skill} variant="accent" />
            ))}
          </div>
        </div>
        <div className="space-y-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-zinc-900">DevOps</h3>
          <div className="flex flex-wrap gap-2">
            {about.devopsSkills.map((skill) => (
              <Badge key={skill} label={skill} variant="accent" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
