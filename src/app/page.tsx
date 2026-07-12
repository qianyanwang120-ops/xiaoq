import ProfileCard from "@/components/bento/profile-card";
import ArticlesCard from "@/components/bento/articles-card";
import PhotographyCard from "@/components/bento/photography-card";
import SocialCard from "@/components/bento/social-card";
import StatusCard from "@/components/bento/status-card";
import MoodCard from "@/components/bento/mood-card";
import { LaceDivider, LaceDiamond } from "@/components/decor/lace-divider";

export default function HomePage() {
  return (
    <main className="relative z-[1] flex flex-1 flex-col">
      {/* ============ 顶部蕾丝花边 ============ */}
      <div className="relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-2"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, #d4d4d4 0px, #d4d4d4 1.5px, transparent 1.5px, transparent 3px, #f0c8d8 3px, #f0c8d8 4px, transparent 4px, transparent 6px, #d4d4d4 6px, #d4d4d4 7.5px, transparent 7.5px, transparent 10px)",
          }}
        />
      </div>

      {/* ============ 标题区 ============ */}
      <header className="relative px-4 pt-16 pb-8 sm:px-6 md:pt-24 md:pb-12 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-medium tracking-[0.2em] text-zinc-400">
            ✿ <LaceDiamond /> XIAOQ <LaceDiamond /> ✿
          </p>
          <h1 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-zinc-800 sm:text-4xl lg:text-5xl">
            欢迎来到我的
            <span className="bg-gradient-to-r from-zinc-500 via-pink-400 to-zinc-500 bg-clip-text text-transparent"> 数字花园</span>
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg">
            ✧ 思考碎片 <span className="text-pink-300/60">·</span> 生活随笔 <span className="text-pink-300/60">·</span> 日常瞬间 ✧
          </p>
        </div>
        <LaceDivider />
      </header>

      {/* ============ Bento Grid ============ */}
      <section className="px-4 pb-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:auto-rows-[minmax(200px,auto)]">
            <div className="md:col-span-2 md:row-span-2"><ProfileCard /></div>
            <div className="md:col-span-2"><ArticlesCard /></div>
            <div className="md:col-span-2"><PhotographyCard /></div>
            <div className="md:col-span-1"><MoodCard /></div>
            <div className="md:col-span-2"><StatusCard /></div>
            <div className="md:col-span-1"><SocialCard /></div>
          </div>
        </div>
      </section>

      <LaceDivider />

      {/* ============ 底部 ============ */}
      <footer className="mt-auto border-t border-zinc-200/40 px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <p className="text-xs text-zinc-400">
            ✿ © {new Date().getFullYear()} xiaoq · 基于 Next.js & Tailwind CSS 构建
          </p>
          <p className="text-xs text-zinc-300">🌸</p>
        </div>
      </footer>
    </main>
  );
}
