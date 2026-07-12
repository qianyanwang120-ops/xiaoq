import { NextRequest, NextResponse } from "next/server";
import { getProfile, updateProfile } from "@/lib/profile";
import { isAuthenticated } from "@/lib/auth";
import fs from "fs";
import path from "path";

export async function GET() {
  return NextResponse.json(getProfile());
}

export async function PUT(req: NextRequest) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: "未登录" }, { status: 401 });

  const contentType = req.headers.get("content-type") || "";
  if (contentType.includes("multipart/form-data")) {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    if (!file) return NextResponse.json({ error: "缺少文件" }, { status: 400 });
    const ext = file.name.split(".").pop() || "jpg";
    const filename = `avatar-${Date.now()}.${ext}`;
    const buffer = Buffer.from(await file.arrayBuffer());
    const uploadPath = path.join(process.cwd(), "public", "avatars", filename);
    fs.writeFileSync(uploadPath, buffer);
    const current = getProfile();
    if (current.avatarType === "image" && current.avatarValue && current.avatarValue !== filename) {
      const oldPath = path.join(process.cwd(), "public", "avatars", current.avatarValue);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }
    const updated = updateProfile({ avatarType: "image", avatarValue: filename });
    return NextResponse.json(updated);
  }

  const body = await req.json();
  return NextResponse.json(updateProfile(body));
}
