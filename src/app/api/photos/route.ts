import { NextRequest, NextResponse } from "next/server";
import { getPhotos, addPhoto } from "@/lib/photos";
import { isAuthenticated } from "@/lib/auth";
import fs from "fs";
import path from "path";

export async function GET() {
  return NextResponse.json(getPhotos());
}

export async function POST(req: NextRequest) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: "未登录" }, { status: 401 });
  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  const title = formData.get("title") as string;
  const description = (formData.get("description") as string) || "";
  if (!file || !title) return NextResponse.json({ error: "缺少文件或标题" }, { status: 400 });

  const ext = file.name.split(".").pop() || "jpg";
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  const uploadPath = path.join(process.cwd(), "public", "photos", filename);
  fs.writeFileSync(uploadPath, buffer);

  const photo = { id: filename.replace(/\.[^.]+$/, ""), title, date: new Date().toISOString().slice(0, 10), filename, description };
  addPhoto(photo);
  return NextResponse.json(photo, { status: 201 });
}
