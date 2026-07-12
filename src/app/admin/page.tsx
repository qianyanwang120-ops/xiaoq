"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, Trash2, LogOut, ArrowLeft, Camera, FileText, Upload, X, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface Article { slug: string; title: string; date: string; excerpt: string; content: string; }
interface Photo { id: string; title: string; date: string; filename: string; description?: string; }

function today() { return new Date().toISOString().slice(0, 10); }
const emptyForm = { title: "", date: today(), excerpt: "", content: "" };

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [tab, setTab] = useState<"articles" | "photos" | "profile">("articles");

  // Articles
  const [articles, setArticles] = useState<Article[]>([]);
  const [editing, setEditing] = useState<Article | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  // Photos
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [photoTitle, setPhotoTitle] = useState("");
  const [photoDesc, setPhotoDesc] = useState("");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  // Profile
  const [profile, setProfile] = useState({ avatarType: "initials", avatarValue: "xq", bio: "" });
  const [profileMsg, setProfileMsg] = useState("");

  const loadArticles = useCallback(async () => { const r = await fetch("/api/articles"); setArticles(await r.json()); }, []);
  const loadPhotos = useCallback(async () => { const r = await fetch("/api/photos"); setPhotos(await r.json()); }, []);
  const loadProfile = useCallback(async () => { const r = await fetch("/api/profile"); setProfile(await r.json()); }, []);

  useEffect(() => { fetch("/api/auth").then(r => r.json()).then(d => setAuthenticated(d.authenticated)); }, []);
  useEffect(() => { if (authenticated) { loadArticles(); loadPhotos(); loadProfile(); } }, [authenticated, loadArticles, loadPhotos, loadProfile]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/auth", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }) });
    if (res.ok) { setAuthenticated(true); setLoginError(""); } else { setLoginError("密码错误"); }
  }

  async function handleLogout() { await fetch("/api/auth", { method: "DELETE" }); setAuthenticated(false); setPassword(""); }

  function startEdit(a: Article) { setEditing(a); setForm({ title: a.title, date: a.date, excerpt: a.excerpt, content: a.content }); setMessage(""); }
  function startNew() { setEditing(null); setForm(emptyForm); setMessage(""); }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title || !form.content) return;
    setSaving(true); setMessage("");
    const url = editing ? `/api/articles/${editing.slug}` : "/api/articles";
    const method = editing ? "PUT" : "POST";
    const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    if (res.ok) { setMessage(editing ? "已更新 ✓" : "已发布 ✓"); setEditing(null); setForm(emptyForm); loadArticles(); } else { setMessage("保存失败"); }
    setSaving(false);
  }

  async function handleDelete(slug: string) { if (!confirm("确定删除？")) return; await fetch(`/api/articles/${slug}`, { method: "DELETE" }); loadArticles(); if (editing?.slug === slug) { setEditing(null); setForm(emptyForm); } }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) { const f = e.target.files?.[0]; if (f) { setPhotoFile(f); setPhotoPreview(URL.createObjectURL(f)); } }

  async function handlePhotoUpload(e: React.FormEvent) {
    e.preventDefault(); if (!photoFile || !photoTitle) return; setUploading(true);
    const fd = new FormData(); fd.append("file", photoFile); fd.append("title", photoTitle); fd.append("description", photoDesc);
    const res = await fetch("/api/photos", { method: "POST", body: fd });
    if (res.ok) { setPhotoTitle(""); setPhotoDesc(""); setPhotoFile(null); setPhotoPreview(null); loadPhotos(); }
    setUploading(false);
  }

  async function handlePhotoDelete(id: string) { if (!confirm("确定删除？")) return; await fetch(`/api/photos/${id}`, { method: "DELETE" }); loadPhotos(); }

  async function handleProfileSave(e: React.FormEvent) {
    e.preventDefault(); setProfileMsg("");
    const res = await fetch("/api/profile", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(profile) });
    if (res.ok) { setProfileMsg("已保存 ✓"); } else { setProfileMsg("保存失败"); }
  }

  if (!authenticated) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-50 px-4">
        <form onSubmit={handleLogin} className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-sm ring-1 ring-zinc-200/60">
          <h1 className="text-xl font-semibold text-zinc-800 mb-2">后台管理</h1>
          <p className="text-sm text-zinc-500 mb-6">请输入管理密码</p>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="密码" className="w-full rounded-xl border border-zinc-200 px-4 py-2.5 text-sm text-zinc-800 outline-none focus:border-zinc-400 focus:ring-2 focus:ring-zinc-100" autoFocus />
          {loginError && <p className="mt-2 text-xs text-red-500">{loginError}</p>}
          <button type="submit" className="mt-4 w-full rounded-xl bg-zinc-800 py-2.5 text-sm font-medium text-white hover:bg-zinc-700 cursor-pointer">登录</button>
          <Link href="/" className="mt-4 flex items-center justify-center gap-1 text-xs text-zinc-400 hover:text-zinc-600"><ArrowLeft size={12} /> 返回首页</Link>
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-50">
      <header className="sticky top-0 z-10 border-b border-zinc-200/60 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-6">
            <h1 className="text-sm font-semibold text-zinc-800">后台管理</h1>
            <nav className="flex gap-1">
              {[{ key: "articles", icon: FileText, label: "随笔" }, { key: "photos", icon: Camera, label: "照片" }, { key: "profile", icon: User, label: "资料" }].map(t => (
                <button key={t.key} onClick={() => setTab(t.key as typeof tab)} className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition cursor-pointer ${tab === t.key ? "bg-zinc-100 text-zinc-800" : "text-zinc-400 hover:text-zinc-600"}`}><t.icon size={12} />{t.label}</button>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/" className="text-xs text-zinc-400 hover:text-zinc-600">查看前台</Link>
            <button onClick={handleLogout} className="flex items-center gap-1 text-xs text-zinc-400 hover:text-zinc-600 cursor-pointer"><LogOut size={12} /> 退出</button>
          </div>
        </div>
      </header>

      {tab === "articles" && (
        <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
          <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
            <aside className="space-y-2">
              <button onClick={startNew} className="flex w-full items-center gap-2 rounded-xl border border-dashed border-zinc-300 px-4 py-3 text-sm text-zinc-500 hover:border-zinc-400 hover:text-zinc-700 cursor-pointer"><Plus size={15} /> 新建随笔</button>
              <div className="space-y-0.5">
                {articles.map(a => (
                  <div key={a.slug} className={`group flex items-center justify-between rounded-lg px-3 py-2 transition cursor-pointer ${editing?.slug === a.slug ? "bg-zinc-100" : "hover:bg-zinc-100/50"}`} onClick={() => startEdit(a)}>
                    <div className="min-w-0 flex-1"><p className="truncate text-sm font-medium text-zinc-700">{a.title}</p><p className="text-[11px] text-zinc-400">{a.date}</p></div>
                    <button onClick={e => { e.stopPropagation(); handleDelete(a.slug); }} className="ml-2 rounded p-1 text-zinc-300 opacity-0 hover:text-red-400 group-hover:opacity-100 cursor-pointer"><Trash2 size={13} /></button>
                  </div>
                ))}
              </div>
            </aside>
            <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-zinc-200/60">
              <h2 className="mb-5 text-sm font-semibold text-zinc-500">{editing ? "编辑随笔" : "新建随笔"}</h2>
              <form onSubmit={handleSave} className="space-y-4">
                <div><label className="block text-xs font-medium text-zinc-400 mb-1">标题</label><input type="text" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="w-full rounded-xl border border-zinc-200 px-4 py-2.5 text-sm text-zinc-800 outline-none focus:border-zinc-400 focus:ring-2 focus:ring-zinc-100" placeholder="输入标题..." required /></div>
                <div><label className="block text-xs font-medium text-zinc-400 mb-1">日期</label><input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} className="w-full rounded-xl border border-zinc-200 px-4 py-2.5 text-sm text-zinc-800 outline-none focus:border-zinc-400 focus:ring-2 focus:ring-zinc-100" required /></div>
                <div><label className="block text-xs font-medium text-zinc-400 mb-1">摘要</label><textarea value={form.excerpt} onChange={e => setForm({ ...form, excerpt: e.target.value })} rows={2} className="w-full rounded-xl border border-zinc-200 px-4 py-2.5 text-sm text-zinc-800 outline-none focus:border-zinc-400 focus:ring-2 focus:ring-zinc-100 resize-none" placeholder="一句话描述..." /></div>
                <div><label className="block text-xs font-medium text-zinc-400 mb-1">正文</label><textarea value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} rows={16} className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm text-zinc-800 leading-relaxed outline-none focus:border-zinc-400 focus:ring-2 focus:ring-zinc-100 resize-y" placeholder="开始写作..." required /></div>
                <div className="flex items-center gap-3">
                  <button type="submit" disabled={saving} className="rounded-xl bg-zinc-800 px-5 py-2.5 text-sm font-medium text-white hover:bg-zinc-700 disabled:opacity-50 cursor-pointer">{saving ? "保存中..." : editing ? "更新" : "发布"}</button>
                  {editing && <button type="button" onClick={startNew} className="text-sm text-zinc-400 hover:text-zinc-600 cursor-pointer">取消</button>}
                  {message && <span className="text-xs text-emerald-600">{message}</span>}
                </div>
              </form>
            </section>
          </div>
        </div>
      )}

      {tab === "photos" && (
        <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
            <section>
              <h2 className="mb-4 text-sm font-semibold text-zinc-500">照片库 · {photos.length} 张</h2>
              {photos.length === 0 ? (
                <div className="rounded-2xl bg-white p-16 text-center shadow-sm ring-1 ring-zinc-200/60"><Camera size={32} className="mx-auto text-zinc-300 mb-3" /><p className="text-sm text-zinc-400">还没有照片</p></div>
              ) : (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {photos.map(p => (
                    <div key={p.id} className="group relative overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-zinc-200/60">
                      <div className="relative aspect-[4/3]"><Image src={`/photos/${p.filename}`} alt={p.title} fill className="object-cover" sizes="200px" /></div>
                      <button onClick={() => handlePhotoDelete(p.id)} className="absolute top-2 right-2 flex size-7 items-center justify-center rounded-lg bg-black/40 text-white opacity-0 hover:bg-red-500 group-hover:opacity-100 cursor-pointer"><X size={13} /></button>
                      <div className="p-2.5"><p className="text-xs font-medium text-zinc-700 truncate">{p.title}</p><p className="text-[10px] text-zinc-400">{p.date}</p></div>
                    </div>
                  ))}
                </div>
              )}
            </section>
            <aside>
              <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-zinc-200/60">
                <h3 className="mb-4 text-sm font-semibold text-zinc-500 flex items-center gap-1.5"><Upload size={13} /> 上传照片</h3>
                <form onSubmit={handlePhotoUpload} className="space-y-4">
                  <div><label className="block text-xs font-medium text-zinc-400 mb-1">选择图片</label><input type="file" accept="image/*" onChange={handleFileChange} className="w-full text-xs text-zinc-500 file:mr-3 file:rounded-lg file:border-0 file:bg-zinc-100 file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-zinc-700 file:cursor-pointer hover:file:bg-zinc-200" />{photoPreview && <div className="relative mt-2 aspect-[4/3] overflow-hidden rounded-lg bg-zinc-100"><Image src={photoPreview} alt="预览" fill className="object-cover" sizes="280px" /></div>}</div>
                  <div><label className="block text-xs font-medium text-zinc-400 mb-1">标题</label><input type="text" value={photoTitle} onChange={e => setPhotoTitle(e.target.value)} className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-xs text-zinc-800 outline-none focus:border-zinc-400" placeholder="给照片取个名字" required /></div>
                  <div><label className="block text-xs font-medium text-zinc-400 mb-1">描述（可选）</label><input type="text" value={photoDesc} onChange={e => setPhotoDesc(e.target.value)} className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-xs text-zinc-800 outline-none focus:border-zinc-400" placeholder="一句话描述..." /></div>
                  <button type="submit" disabled={uploading || !photoFile} className="w-full rounded-xl bg-zinc-800 py-2.5 text-sm font-medium text-white hover:bg-zinc-700 disabled:opacity-50 cursor-pointer">{uploading ? "上传中..." : "上传"}</button>
                </form>
              </div>
            </aside>
          </div>
        </div>
      )}

      {tab === "profile" && (
        <div className="mx-auto max-w-xl px-4 py-6 sm:px-6">
          <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-zinc-200/60">
            <h2 className="mb-5 text-sm font-semibold text-zinc-500">编辑个人资料</h2>
            <form onSubmit={handleProfileSave} className="space-y-5">
              <div className="flex items-center gap-4">
                <div className={`flex size-16 items-center justify-center rounded-2xl ring-1 ring-zinc-200 shadow-sm ${profile.avatarType === "emoji" ? "bg-zinc-50 text-3xl" : "bg-zinc-100 text-2xl font-semibold text-zinc-500"}`}>
                  {profile.avatarType === "emoji" ? profile.avatarValue || "🐱" : (profile.avatarValue || "xq").slice(0, 2).toUpperCase()}
                </div>
                <div><p className="text-sm font-medium text-zinc-700">头像预览</p><p className="text-xs text-zinc-400">修改后首页生效</p></div>
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-2">头像类型</label>
                <div className="flex gap-2">
                  {[{ value: "initials", label: "字母" }, { value: "emoji", label: "表情" }].map(o => (
                    <button key={o.value} type="button" onClick={() => setProfile({ ...profile, avatarType: o.value as "initials" | "emoji" })} className={`rounded-lg px-4 py-2 text-xs font-medium transition cursor-pointer ${profile.avatarType === o.value ? "bg-zinc-800 text-white" : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"}`}>{o.label}</button>
                  ))}
                </div>
              </div>
              <div><label className="block text-xs font-medium text-zinc-400 mb-1">{profile.avatarType === "initials" ? "字母缩写（最多2个）" : "Emoji 表情"}</label><input type="text" value={profile.avatarValue} onChange={e => setProfile({ ...profile, avatarValue: e.target.value.slice(0, profile.avatarType === "initials" ? 2 : 4) })} className="w-full rounded-xl border border-zinc-200 px-4 py-2.5 text-sm text-zinc-800 outline-none focus:border-zinc-400" maxLength={profile.avatarType === "initials" ? 2 : 4} /></div>
              <div><label className="block text-xs font-medium text-zinc-400 mb-1">个性签名</label><textarea value={profile.bio} onChange={e => setProfile({ ...profile, bio: e.target.value })} rows={4} className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm text-zinc-800 leading-relaxed outline-none focus:border-zinc-400 resize-none" placeholder="写一段话介绍自己..." /></div>
              <div className="flex items-center gap-3">
                <button type="submit" className="rounded-xl bg-zinc-800 px-5 py-2.5 text-sm font-medium text-white hover:bg-zinc-700 cursor-pointer">保存</button>
                {profileMsg && <span className="text-xs text-emerald-600">{profileMsg}</span>}
              </div>
            </form>
          </section>
        </div>
      )}
    </main>
  );
}
