"use client";

import { useState, useEffect } from "react";
import { Clock, Zap } from "lucide-react";
import { LaceCorners } from "@/components/decor/lace-corner";

export default function StatusCard() {
  const [time, setTime] = useState<string>("");
  const [date, setDate] = useState<string>("");

  useEffect(() => {
    function tick() {
      const now = new Date();
      setTime(now.toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false, timeZone: "Asia/Shanghai" }));
      setDate(now.toLocaleDateString("zh-CN", { weekday: "long", month: "short", day: "numeric", timeZone: "Asia/Shanghai" }));
    }
    tick(); const id = setInterval(tick, 1000); return () => clearInterval(id);
  }, []);

  return (
    <div className="lace-border group relative flex flex-col overflow-hidden rounded-3xl bg-white p-6 shadow-sm ring-1 ring-zinc-200/50 transition-all duration-500 ease-out hover:scale-[1.02] hover:shadow-lg hover:shadow-zinc-200/50 hover:ring-zinc-300/60">
      <LaceCorners />
      <h3 className="relative z-[1] mb-4 text-xs font-semibold tracking-wider text-zinc-400">状态</h3>
      <div className="relative z-[1] flex flex-1 items-center justify-center gap-8">
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1.5 text-zinc-400 mb-1"><Clock size={11} /><span className="text-[10px] tracking-wider">北京时间</span></div>
          <p className="text-2xl font-semibold tracking-tight text-zinc-700 tabular-nums">{time || "--:--:--"}</p>
          <p className="text-[11px] text-zinc-400 mt-0.5">{date || "..."}</p>
        </div>
        <div className="h-12 w-px bg-zinc-200/60" />
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-2 rounded-full bg-pink-50 px-4 py-2 ring-1 ring-pink-200/40">
            <span className="relative flex size-2"><span className="absolute inline-flex size-full animate-ping rounded-full bg-pink-400 opacity-75" /><span className="relative inline-flex size-2 rounded-full bg-pink-500" /></span>
            <span className="text-sm font-medium text-pink-400">Vibe Coding</span>
            <Zap size={11} className="text-pink-400" />
          </div>
          <span className="text-[10px] text-zinc-400">正在写代码中...</span>
        </div>
      </div>
    </div>
  );
}
