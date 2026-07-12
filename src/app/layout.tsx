import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "xiaoq · 个人博客",
  description: "思考、代码与日常片段 — xiaoq 的个人空间。",
  keywords: ["xiaoq", "博客", "技术", "摄影", "前端"],
  authors: [{ name: "xiaoq" }],
  openGraph: {
    title: "xiaoq · 个人博客",
    description: "思考、代码与日常片段 — xiaoq 的个人空间。",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#fdfdfd] text-[#2c2c2c]">
        {children}
      </body>
    </html>
  );
}
