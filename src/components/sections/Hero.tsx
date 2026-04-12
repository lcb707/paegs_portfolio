import Image from "next/image";
import Link from "next/link";
import { Download, ExternalLink } from "lucide-react";
import { portfolioData } from "@/src/data/portfolio";
import { withBasePath } from "@/src/lib/basePath";

export function Hero() {
  const { hero } = portfolioData;

  return (
    <section id="hero" className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-20 md:grid-cols-[1.4fr_1fr] md:py-28">
      <div className="space-y-6">
        <p className="text-sm uppercase tracking-[0.2em] text-emerald-600">{hero.role}</p>
        <div className="space-y-2">
          <h1 className="text-4xl font-bold leading-tight text-zinc-900 md:text-6xl">{hero.name}</h1>
          <div className="flex flex-wrap items-center gap-2 text-sm text-zinc-600">
            <span className="rounded-full bg-zinc-100 px-3 py-1">{hero.phone}</span>
            <span className="rounded-full bg-zinc-100 px-3 py-1">{hero.email}</span>
          </div>
        </div>
        <p className="max-w-xl text-lg text-zinc-600">{hero.tagline}</p>
        <div className="max-w-3xl rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-emerald-700">Summary</p>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-zinc-700">
            {hero.summary.map((item) => (
              <li key={item}>
                {item.includes(":") ? (
                  <>
                    <strong>{item.split(":")[0]}:</strong>
                    {item.slice(item.indexOf(":") + 1)}
                  </>
                ) : (
                  item
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <a
            href={withBasePath(hero.resumeUrl)}
            className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500"
          >
            <Download size={16} />
            Resume
          </a>
          <a
            href={hero.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-zinc-300 px-5 py-3 text-sm font-semibold text-zinc-700 transition hover:border-emerald-600 hover:text-emerald-600"
          >
            GitHub
            <ExternalLink size={16} />
          </a>
          <Link
            href="/cover-letter"
            className="inline-flex items-center gap-2 rounded-full border border-zinc-300 px-5 py-3 text-sm font-semibold text-zinc-700 transition hover:border-emerald-600 hover:text-emerald-600"
          >
            자기소개서
          </Link>
        </div>
      </div>
      <div className="relative mx-auto h-64 w-64 self-center overflow-hidden rounded-3xl md:h-80 md:w-80">
        <Image src={withBasePath(hero.profileImage)} alt={`${hero.name} profile`} fill className="object-cover" priority />
      </div>
    </section>
  );
}
