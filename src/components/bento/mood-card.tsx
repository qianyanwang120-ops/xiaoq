import { getTodayMood, getRecentMoods } from "@/lib/moods";
import { moodEmojis, moodLabels } from "@/lib/moods-types";
import { LaceCorners } from "@/components/decor/lace-corner";

export default function MoodCard() {
  const today = getTodayMood();
  const recent = getRecentMoods(7);

  return (
    <div className="lace-border group relative flex flex-col overflow-hidden rounded-3xl bg-gradient-to-b from-pink-50 to-rose-50/60 p-6 shadow-sm ring-1 ring-pink-200/40 transition-all duration-500 ease-out hover:scale-[1.02] hover:shadow-lg hover:shadow-pink-200/30 hover:ring-pink-300/50">
      <LaceCorners />
      <h3 className="relative z-[1] mb-3 text-xs font-semibold tracking-wider text-zinc-400">
        今日心情
      </h3>
      <div className="relative z-[1] flex flex-1 flex-col items-center justify-center gap-2">
        <span className="text-4xl select-none">
          {today ? moodEmojis[today.mood] : "🐱"}
        </span>
        <span className="text-[11px] text-zinc-400">
          {today ? moodLabels[today.mood] : "今天还没有记录"}
        </span>
      </div>
      <div className="relative z-[1] mt-3 flex items-center justify-center gap-1">
        {recent.map((r) => (
          <span
            key={r.date}
            className="text-sm select-none"
            title={`${r.date}: ${moodLabels[r.mood]}`}
          >
            {moodEmojis[r.mood]}
          </span>
        ))}
      </div>
    </div>
  );
}
