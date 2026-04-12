import fs from "node:fs/promises";
import path from "node:path";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default async function CoverLetterPage() {
  const markdownPath = path.join(process.cwd(), "src", "data", "cover_letter.md");
  const markdown = await fs.readFile(markdownPath, "utf-8");

  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-50 to-white">
      <div className="mx-auto w-full max-w-4xl px-6 py-14">
        <Link href="/#hero" className="text-sm font-medium text-emerald-600 hover:text-emerald-700">
          ← 메인으로
        </Link>
        <article className="mt-6 rounded-2xl border border-zinc-200 bg-white p-7 shadow-sm md:p-10">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ children }) => <h1 className="mb-8 text-3xl font-bold tracking-tight text-zinc-900 md:text-4xl">{children}</h1>,
              h2: ({ children }) => <h2 className="mb-4 mt-10 border-l-4 border-emerald-500 pl-3 text-xl font-semibold text-zinc-900">{children}</h2>,
              p: ({ children }) => <p className="mb-5 leading-8 text-zinc-700">{children}</p>,
              ul: ({ children }) => <ul className="mb-6 list-disc space-y-2 pl-6 text-zinc-700">{children}</ul>,
              ol: ({ children }) => <ol className="mb-6 list-decimal space-y-2 pl-6 text-zinc-700">{children}</ol>,
              blockquote: ({ children }) => (
                <blockquote className="mb-6 border-l-4 border-emerald-300 bg-emerald-50 px-4 py-3 text-zinc-700">{children}</blockquote>
              ),
              strong: ({ children }) => <strong className="font-semibold text-zinc-900">{children}</strong>,
              hr: () => <hr className="my-8 border-zinc-200" />,
            }}
          >
            {markdown}
          </ReactMarkdown>
        </article>
      </div>
    </main>
  );
}
