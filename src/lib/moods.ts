import fs from "fs";
import path from "path";
import type { Mood, MoodRecord } from "./moods-types";

const dataPath = path.join(process.cwd(), "data", "moods.json");

function readMoods(): MoodRecord[] {
  if (!fs.existsSync(dataPath)) return [];
  const raw = fs.readFileSync(dataPath, "utf-8");
  return JSON.parse(raw);
}

function writeMoods(moods: MoodRecord[]): void {
  fs.writeFileSync(dataPath, JSON.stringify(moods, null, 2) + "\n", "utf-8");
}

export function getMoods(): MoodRecord[] {
  return readMoods().sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export function getTodayMood(): MoodRecord | undefined {
  const today = new Date().toISOString().slice(0, 10);
  return readMoods().find((m) => m.date === today);
}

export function getRecentMoods(days = 7): MoodRecord[] {
  const moods = readMoods();
  const result: MoodRecord[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().slice(0, 10);
    const found = moods.find((m) => m.date === dateStr);
    result.push(found || { date: dateStr, mood: "okay" as Mood });
  }
  return result;
}

export function setMood(date: string, mood: Mood): MoodRecord {
  const moods = readMoods();
  const idx = moods.findIndex((m) => m.date === date);
  const record: MoodRecord = { date, mood };
  if (idx >= 0) {
    moods[idx] = record;
  } else {
    moods.push(record);
  }
  writeMoods(moods);
  return record;
}

export function getMoodCount(): number {
  return readMoods().length;
}
