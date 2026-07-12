import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getArticleBySlug, getArticles } from "@/lib/articles";

export async function generateStaticParams() {
  return getArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: "文章未找到" };
  return {
    title: `${article.title} · xiaoq`,
    description: article.excerpt,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) notFound();

  return (
    <main className="flex flex-1 flex-col">
      <article className="mx-auto w-full max-w-2xl px-4 py-16 sm:px-6 md:py-24">
        {/* 返回按钮 */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-zinc-400 transition-colors hover:text-zinc-600 mb-10"
        >
          <ArrowLeft size={15} />
          返回首页
        </Link>

        {/* 标题 */}
        <header className="mb-10">
          <time className="text-sm text-zinc-400 tabular-nums">
            {article.date}
          </time>
          <h1 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-800 sm:text-3xl">
            {article.title}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-zinc-500">
            {article.excerpt}
          </p>
        </header>

        {/* 正文 */}
        <div className="prose-custom text-base leading-[1.85] text-zinc-700 space-y-6">
          {article.content.split("\n\n").map((paragraph, i) => (
            <p key={i}>{paragraph.trim()}</p>
          ))}
        </div>

        {/* 底部导航 */}
        <footer className="mt-16 border-t border-zinc-200/60 pt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-zinc-400 transition-colors hover:text-zinc-600"
          >
            <ArrowLeft size={15} />
            返回首页，看看其他卡片
          </Link>
        </footer>
      </article>
    </main>
  );
}
