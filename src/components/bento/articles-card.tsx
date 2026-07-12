import Link from "next/link";
import { FileText } from "lucide-react";
import { getArticles } from "@/lib/articles";
import { LaceCorners } from "@/components/decor/lace-corner";

export default function ArticlesCard() {
  const articles = getArticles();
  return (
    <div className="lace-border group relative flex flex-col overflow-hidden rounded-3xl bg-white p-6 shadow-sm ring-1 ring-zinc-200/50 transition-all duration-500 ease-out hover:scale-[1.02] hover:shadow-lg hover:shadow-zinc-200/50 hover:ring-zinc-300/60">
      <LaceCorners />
      <div className="relative z-[1] flex items-center gap-2.5 mb-5">
        <div className="flex size-8 items-center justify-center rounded-lg bg-pink-50 ring-1 ring-pink-200/40"><FileText size={15} className="text-pink-400" /></div>
        <h3 className="text-sm font-semibold tracking-wide text-zinc-400">随笔</h3>
      </div>
      <div className="relative z-[1] flex flex-1 flex-col justify-center gap-0.5">
        {articles.map((article) => (
          <Link key={article.slug} href={`/articles/${article.slug}`} className="group/item flex items-center justify-between rounded-xl px-3 py-2.5 -mx-3 transition-colors duration-200 hover:bg-zinc-50">
            <span className="text-sm font-medium text-zinc-700 transition-colors group-hover/item:text-zinc-900 truncate mr-3">{article.title}</span>
            <span className="flex-shrink-0 text-xs tabular-nums text-zinc-400 transition-colors group-hover/item:text-zinc-500">{article.date}</span>
          </Link>
        ))}
      </div>
      <Link href="/articles" className="relative z-[1] mt-4 inline-flex items-center gap-1 text-xs font-medium text-zinc-400 transition-colors hover:text-zinc-600">
        查看全部随笔 <span className="inline-block transition-transform group-hover:translate-x-0.5">→</span>
      </Link>
    </div>
  );
}
