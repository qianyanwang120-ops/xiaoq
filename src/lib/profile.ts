import fs from "fs";
import path from "path";

export type AvatarType = "initials" | "emoji" | "image";

export interface Profile {
  avatarType: AvatarType;
  avatarValue: string;
  bio: string;
}

const dataPath = path.join(process.cwd(), "data", "profile.json");

export function getProfile(): Profile {
  const raw = fs.readFileSync(dataPath, "utf-8");
  return JSON.parse(raw);
}

export function updateProfile(data: Partial<Profile>): Profile {
  const current = getProfile();
  const updated = { ...current, ...data };
  fs.writeFileSync(dataPath, JSON.stringify(updated, null, 2) + "\n", "utf-8");
  return updated;
}
