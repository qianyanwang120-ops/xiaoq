import { NextRequest, NextResponse } from "next/server";
import { deletePhoto } from "@/lib/photos";
import { isAuthenticated } from "@/lib/auth";

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: "未登录" }, { status: 401 });
  const { id } = await params;
  const ok = deletePhoto(id);
  if (!ok) return NextResponse.json({ error: "照片不存在" }, { status: 404 });
  return NextResponse.json({ success: true });
}
