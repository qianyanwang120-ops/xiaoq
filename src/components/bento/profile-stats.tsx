import { getArticles } from "@/lib/articles";
import { getPhotos } from "@/lib/photos";
import { getMoodCount } from "@/lib/moods";

export default function ProfileStats() {
  const articles = getArticles();
  const photos = getPhotos();
  const moods = getMoodCount();

  const stats = [
    { label: "文章", value: articles.length },
    { label: "照片", value: photos.length },
    { label: "心情", value: moods },
  ];

  return (
    <div className="grid grid-cols-3 gap-2.5">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex flex-col items-center rounded-xl bg-zinc-50 py-2.5 ring-1 ring-zinc-200/40"
        >
          <span className="text-lg font-semibold text-zinc-700 tabular-nums">
            {stat.value}
          </span>
          <span className="text-[11px] text-zinc-400">{stat.label}</span>
        </div>
      ))}
    </div>
  );
}
