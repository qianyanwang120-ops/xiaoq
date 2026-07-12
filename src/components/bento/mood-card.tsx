"use client";

import { useState, useEffect } from "react";
import { moodEmojis, moodLabels, type Mood, type MoodRecord } from "@/lib/moods-types";
import { LaceCorners } from "@/components/decor/lace-corner";

const moodOptions: Mood[] = ["great", "good", "okay", "bad", "terrible"];

export default function MoodCard() {
  const [today, setToday] = useState<MoodRecord | undefined>();
  const [recent, setRecent] = useState<MoodRecord[]>([]);
  const [pickerOpen, setPickerOpen] = useState(false);

  useEffect(() => { fetch("/api/moods").then((r) => r.json()).then((d) => { setToday(d.today); setRecent(d.recent); }); }, []);

  async function pickMood(mood: Mood) {
    const res = await fetch("/api/moods", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ mood }) });
    const data = await res.json(); setToday(data); setPickerOpen(false);
    const refetch = await fetch("/api/moods").then((r) => r.json()); setRecent(refetch.recent);
  }

  return (
    <div className="lace-border group relative flex flex-col overflow-hidden rounded-3xl bg-gradient-to-b from-pink-50 to-rose-50/60 p-6 shadow-sm ring-1 ring-pink-200/40 transition-all duration-500 ease-out hover:scale-[1.02] hover:shadow-lg hover:shadow-pink-200/30 hover:ring-pink-300/50">
      <LaceCorners />
      <h3 className="relative z-[1] mb-3 text-xs font-semibold tracking-wider text-zinc-400">今日心情</h3>
      <div className="relative z-[1] flex flex-1 flex-col items-center justify-center gap-2">
        <button onClick={() => setPickerOpen(!pickerOpen)} className="flex flex-col items-center gap-1.5 cursor-pointer group/emoji">
          <span className="text-4xl transition-transform group-hover/emoji:scale-110 select-none">{today ? moodEmojis[today.mood] : "❓"}</span>
          <span className="text-[11px] text-zinc-400">{today ? moodLabels[today.mood] : "点击记录"}</span>
        </button>
        {pickerOpen && (
          <div className="flex gap-1.5 animate-in fade-in slide-in-from-top-2 duration-200">
            {moodOptions.map((mood) => (
              <button key={mood} onClick={() => pickMood(mood)} className="flex size-9 items-center justify-center rounded-xl transition-all hover:scale-125 hover:bg-zinc-50 cursor-pointer text-xl select-none" title={moodLabels[mood]}>{moodEmojis[mood]}</button>
            ))}
          </div>
        )}
      </div>
      <div className="relative z-[1] mt-3 flex items-center justify-center gap-1">
        {recent.map((r) => <span key={r.date} className="text-sm select-none" title={`${r.date}: ${moodLabels[r.mood]}`}>{moodEmojis[r.mood]}</span>)}
      </div>
    </div>
  );
}
