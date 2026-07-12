import Link from "next/link";
import { ArrowLeft, FileText, Plus } from "lucide-react";
import { getArticles } from "@/lib/articles";

export default function ArticlesPage() {
  const articles = getArticles();

  return (
    <main className="flex flex-1 flex-col">
      <div className="mx-auto w-full max-w-2xl px-4 py-16 sm:px-6 md:py-24">
        {/* 返回 */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-zinc-400 transition-colors hover:text-zinc-600 mb-10"
        >
          <ArrowLeft size={15} />
          返回首页
        </Link>

        <header className="mb-10 flex items-end justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-zinc-800">
              全部随笔
            </h1>
            <p className="mt-2 text-sm text-zinc-500">
              共 {articles.length} 篇
            </p>
          </div>
          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 rounded-xl bg-zinc-800 px-4 py-2 text-xs font-medium text-white transition hover:bg-zinc-700"
          >
            <Plus size={13} />
            写随笔
          </Link>
        </header>

        {articles.length === 0 ? (
          <div className="rounded-2xl bg-white p-12 text-center shadow-sm ring-1 ring-zinc-200/60">
            <FileText size={32} className="mx-auto text-zinc-300 mb-3" />
            <p className="text-sm text-zinc-400 mb-4">还没有文章</p>
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 rounded-xl bg-zinc-800 px-4 py-2 text-xs font-medium text-white transition hover:bg-zinc-700"
            >
              <Plus size={13} />
              写一篇
            </Link>
          </div>
        ) : (
          <div className="space-y-1">
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={`/articles/${article.slug}`}
                className="group flex items-start justify-between rounded-2xl px-4 py-4 transition-colors hover:bg-white hover:shadow-sm hover:ring-1 hover:ring-zinc-200/60 -mx-4"
              >
                <div className="min-w-0 flex-1 mr-4">
                  <h2 className="text-base font-medium text-zinc-800 transition-colors group-hover:text-zinc-900">
                    {article.title}
                  </h2>
                  <p className="mt-1 text-sm text-zinc-500 line-clamp-2">
                    {article.excerpt}
                  </p>
                </div>
                <time className="flex-shrink-0 text-xs text-zinc-400 mt-1 tabular-nums">
                  {article.date}
                </time>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
