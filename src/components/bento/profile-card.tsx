import { getProfile } from "@/lib/profile";
import ProfileStats from "./profile-stats";
import { LaceCorners } from "@/components/decor/lace-corner";

export default function ProfileCard() {
  const profile = getProfile();

  function renderAvatar() {
    if (profile?.avatarType === "image" && profile.avatarValue) {
      return (
        <img
          src={`/photos/${profile.avatarValue}`}
          alt="头像"
          className="size-full rounded-2xl object-cover"
        />
      );
    }
    if (profile?.avatarType === "emoji") return profile.avatarValue || "🐱";
    return (profile?.avatarValue || "xq").slice(0, 2).toUpperCase();
  }

  return (
    <div className="lace-border group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-gradient-to-br from-pink-50 via-pink-50/80 to-rose-50 p-6 shadow-sm ring-1 ring-pink-200/40 transition-all duration-500 ease-out hover:scale-[1.02] hover:shadow-lg hover:shadow-pink-200/30 hover:ring-pink-300/50">
      <LaceCorners />
      <div className="relative flex items-start gap-5 z-[1]">
        <div className="relative flex-shrink-0">
          <div
            className={`flex size-16 items-center justify-center rounded-2xl ring-1 ring-zinc-200/60 shadow-sm transition overflow-hidden ${
              profile?.avatarType === "image"
                ? ""
                : profile?.avatarType === "emoji"
                  ? "bg-zinc-50 text-3xl"
                  : "bg-zinc-100 text-2xl font-semibold tracking-tight text-zinc-400"
            }`}
          >
            {renderAvatar()}
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-white ring-2 ring-white">
            <span className="size-2.5 rounded-full bg-emerald-400" />
          </span>
        </div>
        <div className="min-w-0 pt-1 flex-1">
          <h2 className="text-xl font-semibold tracking-tight text-zinc-800">
            xiaoq
          </h2>
          <p className="mt-1.5 text-sm leading-relaxed text-zinc-500 whitespace-pre-line">
            {profile?.bio || "专注我的人生"}
          </p>
        </div>
      </div>
      <div className="relative z-[1] mt-6">
        <ProfileStats />
      </div>
    </div>
  );
}
