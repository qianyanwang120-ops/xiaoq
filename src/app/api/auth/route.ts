import { NextRequest, NextResponse } from "next/server";
import { login, isAuthenticated, logout } from "@/lib/auth";

export async function GET() {
  const authed = await isAuthenticated();
  return NextResponse.json({ authenticated: authed });
}

export async function POST(req: NextRequest) {
  const { password } = await req.json();
  const ok = await login(password);
  if (!ok) return NextResponse.json({ error: "密码错误" }, { status: 401 });
  return NextResponse.json({ success: true });
}

export async function DELETE() {
  await logout();
  return NextResponse.json({ success: true });
}
