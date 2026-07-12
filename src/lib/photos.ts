import fs from "fs";
import path from "path";

export interface Photo {
  id: string;
  title: string;
  date: string;
  filename: string;
  description?: string;
}

const dataPath = path.join(process.cwd(), "data", "photos.json");
const uploadsDir = path.join(process.cwd(), "public", "photos");

function readPhotos(): Photo[] {
  const raw = fs.readFileSync(dataPath, "utf-8");
  return JSON.parse(raw);
}

function writePhotos(photos: Photo[]): void {
  fs.writeFileSync(dataPath, JSON.stringify(photos, null, 2) + "\n", "utf-8");
}

export function getPhotos(): Photo[] {
  return readPhotos().sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export function addPhoto(photo: Photo): void {
  const photos = readPhotos();
  photos.push(photo);
  writePhotos(photos);
}

export function deletePhoto(id: string): boolean {
  const photos = readPhotos();
  const photo = photos.find((p) => p.id === id);
  if (!photo) return false;

  // 删除文件
  const filePath = path.join(uploadsDir, photo.filename);
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

  writePhotos(photos.filter((p) => p.id !== id));
  return true;
}

// 确保上传目录存在
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
