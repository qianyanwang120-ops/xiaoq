import fs from "fs";
import path from "path";

export interface Article {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
}

const dataPath = path.join(process.cwd(), "data", "articles.json");

function readArticles(): Article[] {
  const raw = fs.readFileSync(dataPath, "utf-8");
  return JSON.parse(raw);
}

function writeArticles(articles: Article[]): void {
  fs.writeFileSync(dataPath, JSON.stringify(articles, null, 2) + "\n", "utf-8");
}

/** 获取所有文章（按日期倒序） */
export function getArticles(): Article[] {
  const articles = readArticles();
  return articles.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

/** 根据 slug 获取单篇文章 */
export function getArticleBySlug(slug: string): Article | undefined {
  return readArticles().find((a) => a.slug === slug);
}

/** 创建 slug：中文标题 → 拼音风格简化 */
function generateSlug(title: string): string {
  return title
    .replace(/[，,。！？、：；""''（）《》\s]+/g, "-")
    .replace(/[^\w一-鿿-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase()
    .slice(0, 60) || Date.now().toString(36);
}

/** 新建文章 */
export function createArticle(data: {
  title: string;
  date: string;
  excerpt: string;
  content: string;
}): Article {
  const articles = readArticles();
  const article: Article = {
    slug: generateSlug(data.title),
    ...data,
  };
  articles.push(article);
  writeArticles(articles);
  return article;
}

/** 更新文章 */
export function updateArticle(
  slug: string,
  data: { title: string; date: string; excerpt: string; content: string },
): Article | null {
  const articles = readArticles();
  const idx = articles.findIndex((a) => a.slug === slug);
  if (idx === -1) return null;
  articles[idx] = { ...articles[idx], ...data };
  writeArticles(articles);
  return articles[idx];
}

/** 删除文章 */
export function deleteArticle(slug: string): boolean {
  const articles = readArticles();
  const filtered = articles.filter((a) => a.slug !== slug);
  if (filtered.length === articles.length) return false;
  writeArticles(filtered);
  return true;
}
