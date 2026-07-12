"use client";

import { useState, useEffect, useRef } from "react";
import { Check, X, Edit3, Upload } from "lucide-react";
import ProfileStats from "./profile-stats";
import { LaceCorners } from "@/components/decor/lace-corner";

export default function ProfileCard() {
  const [profile, setProfile] = useState<any>(null);
  const [editing, setEditing] = useState<"avatar" | "bio" | null>(null);
  const [draft, setDraft] = useState({ avatarType: "initials", avatarValue: "xq", bio: "" });
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("/api/profile").then(r => r.json()).then(p => {
      setProfile(p);
      setDraft({ avatarType: p.avatarType, avatarValue: p.avatarValue, bio: p.bio });
    });
  }, []);

  async function saveJson() {
    const res = await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ avatarType: draft.avatarType, avatarValue: draft.avatarValue }),
    });
    if (res.ok) {
      const u = await res.json();
      setProfile(u);
      setEditing(null);
    }
  }

  async function saveBio() {
    const res = await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bio: draft.bio }),
    });
    if (res.ok) {
      const u = await res.json();
      setProfile(u);
      setEditing(null);
    }
  }

  function cancel() {
    if (profile) setDraft({ avatarType: profile.avatarType, avatarValue: profile.avatarValue, bio: profile.bio });
    setEditing(null);
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/profile", { method: "PUT", body: fd });
    if (res.ok) {
      const u = await res.json();
      setProfile(u);
      setDraft({ avatarType: u.avatarType, avatarValue: u.avatarValue, bio: u.bio });
      setEditing(null);
    }
    setUploading(false);
  }

  function renderAvatar() {
    if (profile?.avatarType === "image" && profile.avatarValue) {
      return <img src={`/avatars/${profile.avatarValue}`} alt="头像" className="size-full rounded-2xl object-cover" />;
    }
    if (profile?.avatarType === "emoji") return profile.avatarValue || "🐱";
    return (profile?.avatarValue || "xq").slice(0, 2).toUpperCase();
  }

  return (
    <div className="lace-border group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-gradient-to-br from-pink-50 via-pink-50/80 to-rose-50 p-6 shadow-sm ring-1 ring-pink-200/40 transition-all duration-500 ease-out hover:scale-[1.02] hover:shadow-lg hover:shadow-pink-200/30 hover:ring-pink-300/50">
      <LaceCorners />
      <div className="relative flex items-start gap-5 z-[1]">
        {/* 头像 */}
        <div className="relative flex-shrink-0">
          {editing === "avatar" ? (
            <div className="flex flex-col gap-2 rounded-2xl bg-white p-3 ring-1 ring-zinc-200 shadow-sm min-w-[150px]">
              <div className="flex gap-1">
                {(["image", "emoji", "initials"] as const).map(t => (
                  <button key={t} onClick={() => setDraft({ ...draft, avatarType: t })}
                    className={`rounded-md px-2.5 py-1 text-[11px] font-medium transition cursor-pointer ${draft.avatarType === t ? "bg-zinc-700 text-white" : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200"}`}>
                    {t === "image" ? "照片" : t === "emoji" ? "表情" : "字母"}
                  </button>
                ))}
              </div>
              {draft.avatarType === "image" ? (
                <div>
                  <input ref={fileRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                  <button onClick={() => fileRef.current?.click()} disabled={uploading}
                    className="flex items-center gap-2 rounded-lg border border-dashed border-zinc-300 px-3 py-2.5 text-xs text-zinc-500 hover:border-zinc-400 transition cursor-pointer w-full">
                    <Upload size={12} />{uploading ? "上传中..." : "选择照片"}
                  </button>
                  <button onClick={cancel} className="mt-2 w-full rounded-md bg-zinc-100 px-2 py-1 text-[11px] text-zinc-500 hover:bg-zinc-200 cursor-pointer">取消</button>
                </div>
              ) : (
                <>
                  <input type="text" value={draft.avatarValue}
                    onChange={e => setDraft({ ...draft, avatarValue: draft.avatarType === "initials" ? e.target.value.slice(0, 2) : e.target.value.slice(0, 4) })}
                    className="w-20 rounded-lg border border-zinc-200 px-2.5 py-1.5 text-sm outline-none focus:border-zinc-400"
                    placeholder={draft.avatarType === "initials" ? "xq" : "🐱"} autoFocus />
                  <div className="flex gap-1 mt-2">
                    <button onClick={saveJson} className="flex size-6 items-center justify-center rounded-md bg-emerald-500 text-white hover:bg-emerald-600 cursor-pointer"><Check size={12} /></button>
                    <button onClick={cancel} className="flex size-6 items-center justify-center rounded-md bg-zinc-200 text-zinc-500 hover:bg-zinc-300 cursor-pointer"><X size={12} /></button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <button onClick={() => setEditing("avatar")} className="relative group/avatar cursor-pointer" title="点击修改头像">
              <div className={`flex size-16 items-center justify-center rounded-2xl ring-1 ring-zinc-200/60 shadow-sm transition overflow-hidden ${profile?.avatarType === "image" ? "" : profile?.avatarType === "emoji" ? "bg-white text-3xl" : "bg-white text-2xl font-semibold tracking-tight text-zinc-400"}`}>
                {renderAvatar()}
              </div>
              <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/0 transition group-hover/avatar:bg-black/5">
                <Edit3 size={14} className="text-zinc-300 opacity-0 transition group-hover/avatar:opacity-100" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-white ring-2 ring-white">
                <span className="size-2.5 rounded-full bg-emerald-400" />
              </span>
            </button>
          )}
        </div>

        {/* 名字 + 签名 */}
        <div className="min-w-0 pt-1 flex-1">
          <h2 className="text-xl font-semibold tracking-tight text-zinc-800">xiaoq</h2>
          {editing === "bio" ? (
            <div className="mt-1.5 flex flex-col gap-2">
              <textarea value={draft.bio} onChange={e => setDraft({ ...draft, bio: e.target.value })} rows={3}
                className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm text-zinc-700 leading-relaxed outline-none focus:border-zinc-400 resize-none" autoFocus />
              <div className="flex gap-1.5">
                <button onClick={saveBio} className="flex items-center gap-1 rounded-lg bg-emerald-500 px-3 py-1.5 text-[11px] font-medium text-white hover:bg-emerald-600 cursor-pointer"><Check size={11} />保存</button>
                <button onClick={cancel} className="flex items-center gap-1 rounded-lg bg-zinc-200 px-3 py-1.5 text-[11px] font-medium text-zinc-500 hover:bg-zinc-300 cursor-pointer"><X size={11} />取消</button>
              </div>
            </div>
          ) : (
            <button onClick={() => setEditing("bio")} className="mt-1.5 text-left group/bio cursor-pointer" title="点击修改签名">
              <p className="text-sm leading-relaxed text-zinc-500 whitespace-pre-line">{profile?.bio || "点击添加个性签名..."}</p>
              <Edit3 size={11} className="inline-block ml-1 text-zinc-300 opacity-0 transition group-hover/bio:opacity-100" />
            </button>
          )}
        </div>
      </div>

      <div className="relative z-[1] mt-6"><ProfileStats /></div>
    </div>
  );
}
