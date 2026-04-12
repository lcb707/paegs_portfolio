import { CodeXml, FolderGit2, Menu } from "lucide-react";
import { portfolioData } from "@/src/data/portfolio";

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-zinc-200 bg-white/90 backdrop-blur">
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4"
        aria-label="Main Navigation"
      >
        <a
          href="#"
          aria-label="Home"
          className="inline-flex items-center justify-center rounded-full border border-emerald-200 bg-emerald-50 p-2 text-emerald-700 transition hover:border-emerald-400 hover:bg-emerald-100"
        >
          <CodeXml size={18} />
        </a>
        <ul className="hidden items-center gap-6 md:flex">
          {portfolioData.navItems.map((item) => (
            <li key={item.href}>
              <a className="text-base font-semibold text-zinc-800 transition hover:text-emerald-600" href={item.href}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          <a
            href={portfolioData.hero.githubUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub Profile"
            className="rounded-full border border-zinc-300 p-2 text-zinc-600 transition hover:border-emerald-600 hover:text-emerald-600"
          >
            <FolderGit2 size={16} />
          </a>
          <button
            type="button"
            aria-label="Menu"
            className="rounded-full border border-zinc-300 p-2 text-zinc-600 md:hidden"
          >
            <Menu size={16} />
          </button>
        </div>
      </nav>
    </header>
  );
}
