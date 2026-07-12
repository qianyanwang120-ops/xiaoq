import { NextRequest, NextResponse } from "next/server";
import { getArticles, createArticle } from "@/lib/articles";
import { isAuthenticated } from "@/lib/auth";

export async function GET() {
  return NextResponse.json(getArticles());
}

export async function POST(req: NextRequest) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: "未登录" }, { status: 401 });
  const body = await req.json();
  const article = createArticle(body);
  return NextResponse.json(article, { status: 201 });
}
