"use client";

import { useState, useRef, useEffect } from "react";
import { Copy, Check } from "lucide-react";
import { LaceCorners } from "@/components/decor/lace-corner";

const wechatId = "WqqqqY8";

const socials = [
  { id: "github", label: "GitHub", href: "https://github.com/qianyanwang120-ops",
    icon: <svg viewBox="0 0 24 24" fill="currentColor" className="size-[18px]"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" /></svg> },
  { id: "wechat", label: "微信", href: null,
    icon: <svg viewBox="0 0 24 24" fill="currentColor" className="size-[18px]"><path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.33.33 0 0 0 .167-.054l1.903-1.114a.86.86 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18z" /></svg> },
  { id: "qq", label: "QQ", href: "tencent://message/?uin=2967076868",
    icon: <svg viewBox="0 0 24 24" fill="currentColor" className="size-[17px]"><path d="M21.395 15.035a40.16 40.16 0 0 0-.803-2.264l-1.079-2.695c.001-.032.014-.562.014-.836C19.527 4.661 16.085 0 12 0S4.473 4.661 4.473 9.24c0 .274.013.804.014.836L3.408 12.77a39.99 39.99 0 0 0-.803 2.264c-1.08 3.342-.801 4.72.56 5.577.76.478 1.847.673 3.143.744.993.054 1.99.068 3.112.05.03.363.095.723.205 1.072a3.29 3.29 0 0 0 .383.778c.528.719 1.469.745 1.992.745.523 0 1.464-.026 1.992-.745.19-.26.313-.51.383-.778.11-.35.175-.71.205-1.072 1.122.018 2.119.004 3.11-.05 1.297-.07 2.384-.266 3.144-.744 1.362-.857 1.641-2.235.561-5.577zM12 1.72c2.85 0 4.88 2.6 5.47 5.25a8.69 8.69 0 0 0-2.822-.477c-1.452 0-2.848.413-4.05 1.12 0 0-.552-.799-2.045-.799a4.91 4.91 0 0 0-2.604.82c.226-.733.66-1.48 1.226-2.082C8.012 4.148 10.158 1.72 12 1.72z" /></svg> },
  { id: "instagram", label: "Instagram", href: "https://instagram.com/wqqqqy120",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-[17px]"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg> },
];

export default function SocialCard() {
  const [activePopover, setActivePopover] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) { if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) setActivePopover(null); }
    if (activePopover) { document.addEventListener("mousedown", handleClickOutside); return () => document.removeEventListener("mousedown", handleClickOutside); }
  }, [activePopover]);

  async function handleCopy() { await navigator.clipboard.writeText(wechatId); setCopied(true); setTimeout(() => setCopied(false), 2000); }

  return (
    <div className="lace-border group relative flex flex-col overflow-visible rounded-3xl bg-white p-5 shadow-sm ring-1 ring-zinc-200/50 transition-all duration-500 ease-out hover:scale-[1.02] hover:shadow-lg hover:shadow-zinc-200/50 hover:ring-zinc-300/60">
      <LaceCorners />
      <h3 className="relative z-[1] mb-4 text-xs font-semibold tracking-wider text-zinc-400">找到我</h3>
      <div className="relative z-[1] grid grid-cols-2 gap-3">
        {socials.map((social) => {
          if (social.id === "wechat") return (
            <div key={social.id} className="relative flex justify-center">
              <button onClick={() => setActivePopover(activePopover === "wechat" ? null : "wechat")} aria-label="微信" className="flex flex-col items-center gap-1.5 group/icon cursor-pointer">
                <div className="flex size-10 items-center justify-center rounded-xl bg-zinc-50 text-zinc-400 ring-1 ring-zinc-200/60 transition-all duration-200 group-hover/icon:bg-zinc-100 group-hover/icon:text-zinc-600 group-hover/icon:ring-zinc-300">{social.icon}</div>
                <span className="text-[10px] font-medium text-zinc-400 transition-colors group-hover/icon:text-zinc-500">{social.label}</span>
              </button>
            </div>
          );
          return (
            <a key={social.id} href={social.href ?? "#"} target="_blank" rel="noopener noreferrer" aria-label={social.label} className="flex flex-col items-center gap-1.5 group/icon">
              <div className="flex size-10 items-center justify-center rounded-xl bg-zinc-50 text-zinc-400 ring-1 ring-zinc-200/60 transition-all duration-200 group-hover/icon:bg-zinc-100 group-hover/icon:text-zinc-600 group-hover/icon:ring-zinc-300">{social.icon}</div>
              <span className="text-[10px] font-medium text-zinc-400 transition-colors group-hover/icon:text-zinc-500">{social.label}</span>
            </a>
          );
        })}
      </div>
      {activePopover === "wechat" && (
        <div ref={popoverRef} className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 z-50 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center gap-2 rounded-xl bg-zinc-800 px-3 py-2 shadow-lg ring-1 ring-zinc-700/50 whitespace-nowrap">
            <span className="text-xs text-zinc-300">微信号：</span><span className="text-sm font-medium text-white select-all">{wechatId}</span>
            <button onClick={handleCopy} className="ml-1 flex items-center gap-1 rounded-lg bg-zinc-700 px-2 py-1 text-[11px] text-zinc-300 transition-colors hover:bg-zinc-600 hover:text-white cursor-pointer">
              {copied ? <><Check size={11} /> 已复制</> : <><Copy size={11} /> 复制</>}
            </button>
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 top-full -mt-px"><div className="size-2.5 rotate-45 bg-zinc-800 ring-1 ring-zinc-700/50" /></div>
        </div>
      )}
    </div>
  );
}
