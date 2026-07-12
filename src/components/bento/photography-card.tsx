import Link from "next/link";
import Image from "next/image";
import { Camera, ArrowUpRight } from "lucide-react";
import { getPhotos } from "@/lib/photos";
import { LaceCorners } from "@/components/decor/lace-corner";

export default function PhotographyCard() {
  const photos = getPhotos();
  const latest = photos.slice(0, 3);
  return (
    <Link href="/photography" className="lace-border group relative flex flex-col overflow-hidden rounded-3xl bg-white p-6 shadow-sm ring-1 ring-zinc-200/50 transition-all duration-500 ease-out hover:scale-[1.02] hover:shadow-lg hover:shadow-zinc-200/50 hover:ring-zinc-300/60 cursor-pointer block">
      <LaceCorners />
      <div className="relative z-10 flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="flex size-8 items-center justify-center rounded-lg bg-pink-50 ring-1 ring-pink-200/40"><Camera size={15} className="text-pink-400" /></div>
          <h3 className="text-sm font-semibold tracking-wide text-zinc-400">摄影随笔</h3>
        </div>
        <ArrowUpRight size={15} className="text-zinc-300 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
      <div className="relative z-10 flex flex-1 gap-2.5">
        {latest.length > 0
          ? latest.map((photo) => (
              <div key={photo.id} className="flex-1 relative overflow-hidden rounded-2xl bg-zinc-100 ring-1 ring-zinc-200/60">
                <Image src={`/photos/${photo.filename}`} alt={photo.title} fill className="object-cover" sizes="20vw" />
              </div>
            ))
          : [1, 2, 3].map((i) => (
              <div key={i} className="flex-1 relative overflow-hidden rounded-2xl bg-zinc-50 ring-1 ring-zinc-200/40">
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-1"><Camera size={22} className="text-zinc-300" /><span className="text-[10px] text-zinc-400">待上传</span></div>
              </div>
            ))}
        {latest.length > 0 && Array.from({ length: 3 - latest.length }).map((_, i) => (
          <div key={`empty-${i}`} className="flex-1 relative overflow-hidden rounded-2xl bg-zinc-50 ring-1 ring-zinc-200/40">
            <div className="absolute inset-0 flex items-center justify-center"><Camera size={22} className="text-zinc-300" /></div>
          </div>
        ))}
      </div>
      <p className="relative z-10 mt-3 text-[11px] text-zinc-400">
        {photos.length > 0 ? `共 ${photos.length} 张 · 点击查看全部` : "日常随手拍 · 点击上传"}
      </p>
    </Link>
  );
}
