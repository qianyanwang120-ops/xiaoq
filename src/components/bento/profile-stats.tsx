"use client";

import { useState, useEffect } from "react";

export default function ProfileStats() {
  const [counts, setCounts] = useState({ articles: 0, photos: 0, moods: 0 });

  useEffect(() => {
    async function load() {
      const [a, p, m] = await Promise.all([
        fetch("/api/articles"),
        fetch("/api/photos"),
        fetch("/api/moods"),
      ]);
      const articles = await a.json();
      const photos = await p.json();
      const moods = await m.json();
      setCounts({
        articles: Array.isArray(articles) ? articles.length : 0,
        photos: Array.isArray(photos) ? photos.length : 0,
        moods: moods.count || 0,
      });
    }
    load();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-2.5">
      {[
        { label: "文章", value: counts.articles },
        { label: "照片", value: counts.photos },
        { label: "心情", value: counts.moods },
      ].map((stat) => (
        <div
          key={stat.label}
          className="flex flex-col items-center rounded-xl bg-white/60 py-2.5 ring-1 ring-pink-200/30"
        >
          <span className="text-lg font-semibold text-rose-400 tabular-nums">
            {stat.value}
          </span>
          <span className="text-[11px] text-rose-300">{stat.label}</span>
        </div>
      ))}
    </div>
  );
}
