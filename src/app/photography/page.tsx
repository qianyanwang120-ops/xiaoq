import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Camera } from "lucide-react";
import { getPhotos } from "@/lib/photos";

export default function PhotographyPage() {
  const photos = getPhotos();

  return (
    <main className="flex flex-1 flex-col">
      <div className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 md:py-24">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-zinc-400 transition-colors hover:text-zinc-600 mb-10"
        >
          <ArrowLeft size={15} />
          返回首页
        </Link>

        <header className="mb-10">
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-800">
            摄影随笔
          </h1>
          <p className="mt-2 text-sm text-zinc-500">
            日常随手拍 · {photos.length} 张
          </p>
        </header>

        {photos.length === 0 ? (
          <div className="rounded-2xl bg-white p-16 text-center shadow-sm ring-1 ring-zinc-200/60">
            <Camera size={40} className="mx-auto text-zinc-300 mb-4" />
            <p className="text-sm text-zinc-500 mb-4">还没有照片</p>
            <Link
              href="/admin"
              className="text-sm text-zinc-500 underline underline-offset-4 hover:text-zinc-700 transition-colors"
            >
              去后台上传 →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {photos.map((photo) => (
              <div
                key={photo.id}
                className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-zinc-200/60 transition-all duration-300 hover:shadow-md"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={`/photos/${photo.filename}`}
                    alt={photo.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-medium text-zinc-800">
                    {photo.title}
                  </h3>
                  {photo.description && (
                    <p className="mt-1 text-xs text-zinc-500 line-clamp-2">
                      {photo.description}
                    </p>
                  )}
                  <time className="mt-2 block text-[11px] text-zinc-400">
                    {photo.date}
                  </time>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
