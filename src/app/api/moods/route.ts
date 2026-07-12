import { NextRequest, NextResponse } from "next/server";
import { getTodayMood, setMood, getRecentMoods, getMoodCount } from "@/lib/moods";

export async function GET() {
  const today = getTodayMood();
  const recent = getRecentMoods(7);
  return NextResponse.json({ today, recent, count: getMoodCount() });
}

export async function POST(req: NextRequest) {
  const { mood } = await req.json();
  if (!mood) {
    return NextResponse.json({ error: "缺少 mood 参数" }, { status: 400 });
  }
  const today = new Date().toISOString().slice(0, 10);
  const record = setMood(today, mood);
  return NextResponse.json(record);
}
