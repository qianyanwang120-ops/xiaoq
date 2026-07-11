# 产品需求文档 (PRD) — xiaoq 个人博客系统 v1.0

---

## 1. 产品概述

| 属性 | 内容 |
|---|---|
| 项目名称 | xiaoq |
| 技术栈 | Next.js 16 (App Router) + TypeScript + Tailwind CSS v4 |
| 设计风格 | 白色简约 + 淡粉点缀 + 蕾丝装饰 |
| 部署方式 | Vercel 一键部署（待部署） |
| 本地地址 | `http://localhost:3000` |
| 后台密码 | `xiaoq2026` |
| 项目目录 | `/Users/xiaoq/xiaoq` |

---

## 2. 页面路由

### 前端页面

| 路由 | 渲染方式 | 说明 |
|---|---|---|
| `/` | 静态生成 | Bento Grid 首页 |
| `/articles` | 静态生成 | 全部随笔列表 |
| `/articles/[slug]` | SSG 静态生成 | 文章详情页 |
| `/photography` | 静态生成 | 照片画廊 |
| `/admin` | 静态生成 (CSR) | 后台管理（需登录） |

### API 路由

| 路由 | 方法 | 鉴权 | 说明 |
|---|---|---|---|
| `/api/auth` | GET | 否 | 检查登录状态 |
| `/api/auth` | POST | 否 | 登录（密码验证） |
| `/api/auth` | DELETE | 否 | 登出 |
| `/api/articles` | GET | 否 | 获取文章列表 |
| `/api/articles` | POST | 是 | 新建文章 |
| `/api/articles/[slug]` | GET | 否 | 获取单篇文章 |
| `/api/articles/[slug]` | PUT | 是 | 更新文章 |
| `/api/articles/[slug]` | DELETE | 是 | 删除文章 |
| `/api/photos` | GET | 否 | 获取照片列表 |
| `/api/photos` | POST | 是 | 上传照片 |
| `/api/photos/[id]` | DELETE | 是 | 删除照片 |
| `/api/moods` | GET | 否 | 获取今日心情 + 近 7 天记录 |
| `/api/moods` | POST | 否 | 记录今日心情 |
| `/api/profile` | GET | 否 | 获取个人资料 |
| `/api/profile` | PUT | 是 | 更新个人资料（支持文件上传） |

---

## 3. 首页 Bento Grid 布局

### 3.1 整体布局

```
┌──────────────────┬──────────────────┬──────────┬──────────┐
│                  │                  │          │          │
│   个人简介 (2×2)  │   个人简介 (2×2)  │  随笔     │  随笔     │
│   淡粉渐变背景    │   实时数据统计     │  (2×1)   │  白底     │
│                  │                  │  粉图标   │          │
│                  │                  ├──────────┼──────────┤
│                  │                  │          │          │
│                  │                  │ 摄影随笔  │ 摄影随笔  │
│                  │                  │  (2×1)   │  白底     │
│                  │                  │  粉图标   │          │
├──────────────────┼────────────┬─────┼──────────┼──────────┤
│   今日心情 (1×1)  │  状态面板   │     │ 社交链接  │ 社交链接  │
│   淡粉渐变背景    │  (2×1)    │     │  (1×1)   │  白底     │
│   小猫表情        │  白底      │     │  2×2 网格 │          │
└──────────────────┴────────────┴─────┴──────────┴──────────┘
```

### 3.2 个人简介卡 (2×2)

- **底色**：淡粉渐变 `from-pink-50 via-pink-50/80 to-rose-50`
- **边框**：粉色 ring + 蕾丝花边
- **悬停**：`scale-[1.02]` + 粉色阴影
- **头像**：支持三种模式，点击即可切换
  - 📷 照片 — 上传本地图片，存储于 `public/avatars/`
  - 😺 表情 — 输入 emoji
  - 🔤 字母 — 最多 2 字缩写
- **个性签名**：多行文本，点击即可编辑
- **统计数字**：客户端实时拉取 API，显示文章数 / 照片数 / 心情天数
- **编辑方式**：首页直接点击头像或签名区域即可修改，无需进入后台

### 3.3 随笔卡 (2×1)

- **底色**：白色
- **图标**：粉色背景 + 粉色文件图标
- 展示最新 3 篇文章的标题和发布日期
- 点击标题 → 进入 `/articles/[slug]` 文章详情页
- 「查看全部随笔」→ 跳转 `/articles` 列表页

### 3.4 摄影随笔卡 (2×1)

- **底色**：白色
- **图标**：粉色相机图标
- 展示最新 3 张照片缩略图（使用 `next/image` 优化）
- 无照片时显示相机占位符 +「待上传」
- 点击整卡 → 跳转 `/photography` 画廊页

### 3.5 今日心情卡 (1×1)

- **底色**：淡粉渐变 `from-pink-50 to-rose-50/60`
- **心情类型**：5 种小猫表情
  - 😸 超棒 / 😺 不错 / 🐱 一般 / 😿 低落 / 🙀 难过
- 点击当前表情 → 弹出心情选择器
- 选择后即时保存到 `data/moods.json`
- 底部展示最近 7 天心情条

### 3.6 状态面板 (2×1)

- **底色**：白色
- **左侧**：北京时间实时时钟（每秒刷新，时区 `Asia/Shanghai`）
- **右侧**：粉色 Vibe Coding 状态指示灯（CSS 脉动动画）
- **分隔**：中间竖线分隔

### 3.7 社交链接 (1×1)

- **底色**：白色
- **布局**：2×2 网格排列 4 个社交图标
- GitHub → 外链跳转
- 微信 → 点击弹出气泡，显示微信号 `WqqqqY8` + 一键复制按钮
- QQ → `tencent://message/?uin=2967076868` 协议唤起
- Instagram → 外链跳转 `https://instagram.com/wqqqqy120`

---

## 4. 装饰元素

### 4.1 色彩方案

| 用途 | 色值 |
|---|---|
| 页面背景 | `#fdfdfd` |
| 正文颜色 | `#2c2c2c` |
| 淡粉底色 | `from-pink-50 to-rose-50` |
| 蕾丝粉点 | `#f0c8d8` / `#f8bbd0` |
| 灰色文字 | `zinc-400` / `zinc-500` |
| 深色文字 | `zinc-700` / `zinc-800` |

### 4.2 蕾丝装饰清单

| 元素 | 位置 | 说明 |
|---|---|---|
| 🏵️ 蕾丝角花 | 每张卡片四角 | SVG 弧线 + 花点，部分用淡粉色 |
| 🎀 蕾丝边框 | 卡片外层 | CSS 渐变条纹，灰底掺粉色短段 |
| ➖ 蕾丝分隔线 | 标题下方 / 卡片区之间 | 点状虚线 + 中心花形图标，浅灰夹粉 |
| 💠 菱形花饰 | 标题文字中 | 菱形 SVG，内填淡粉色 |
| 🏠 蕾丝底纹 | 全局背景 | SVG 连续花纹（圆环 + 花朵 + 星形），圆心和星星淡粉色 |
| 🎗️ 顶部花边 | 页面最顶部 | 灰白粉相间的蕾丝条纹带 |

---

## 5. 后台管理 (`/admin`)

### 5.1 认证

- 密码登录，默认密码 `xiaoq2026`
- 登录后设置 httpOnly cookie，24 小时有效
- 登录后首页也可直接编辑头像和签名

### 5.2 标签页

| 标签 | 图标 | 功能 |
|---|---|---|
| 📄 随笔 | FileText | 新建 / 编辑 / 删除文章 |
| 📷 照片 | Camera | 上传图片 / 预览 / 删除 |
| 👤 资料 | User | 修改头像类型 / 头像内容 / 个性签名 |

### 5.3 随笔编辑器

- 标题输入框
- 日期选择器
- 摘要多行输入
- 正文多行输入（段落之间用空行分隔）
- 发布 / 更新 / 删除按钮
- Slug 自动生成（从标题提取）

### 5.4 照片管理

- 左侧：照片网格展示，悬停显示删除按钮
- 右侧：上传面板（文件选择 + 图片预览 + 标题 + 描述）

### 5.5 资料设置

- 头像预览（实时）
- 头像类型切换（照片 / 表情 / 字母）
- 头像值输入
- 个性签名编辑

---

## 6. 数据存储

| 文件路径 | 数据结构 | 说明 |
|---|---|---|
| `data/articles.json` | `Article[]` | slug, title, date, excerpt, content |
| `data/photos.json` | `Photo[]` | id, title, date, filename, description |
| `data/moods.json` | `MoodRecord[]` | date, mood |
| `data/profile.json` | `Profile` | avatarType, avatarValue, bio |
| `public/photos/` | 图片文件 | 上传照片原文件 |
| `public/avatars/` | 图片文件 | 上传头像原文件 |

### 数据模型

```typescript
interface Article {
  slug: string;
  title: string;
  date: string;      // YYYY-MM-DD
  excerpt: string;
  content: string;
}

interface Photo {
  id: string;
  title: string;
  date: string;
  filename: string;
  description?: string;
}

type Mood = "great" | "good" | "okay" | "bad" | "terrible";

interface MoodRecord {
  date: string;      // YYYY-MM-DD
  mood: Mood;
}

interface Profile {
  avatarType: "initials" | "emoji" | "image";
  avatarValue: string;
  bio: string;
}
```

---

## 7. 项目目录结构

```
xiaoq/
├── data/                          # JSON 数据存储
│   ├── articles.json
│   ├── photos.json
│   ├── moods.json
│   └── profile.json
├── public/
│   ├── photos/                    # 上传的照片
│   └── avatars/                   # 上传的头像
├── src/
│   ├── app/
│   │   ├── admin/
│   │   │   └── page.tsx           # 后台管理页
│   │   ├── articles/
│   │   │   ├── page.tsx           # 随笔列表页
│   │   │   └── [slug]/
│   │   │       └── page.tsx       # 文章详情页
│   │   ├── photography/
│   │   │   └── page.tsx           # 照片画廊页
│   │   ├── api/
│   │   │   ├── auth/route.ts      # 鉴权 API
│   │   │   ├── articles/
│   │   │   │   ├── route.ts       # 文章列表 API
│   │   │   │   └── [slug]/route.ts
│   │   │   ├── photos/
│   │   │   │   ├── route.ts       # 照片 API
│   │   │   │   └── [id]/route.ts
│   │   │   ├── moods/route.ts     # 心情 API
│   │   │   └── profile/route.ts   # 资料 API
│   │   ├── globals.css            # 全局样式（蕾丝 + 主题）
│   │   ├── layout.tsx             # 根布局
│   │   └── page.tsx               # Bento Grid 首页
│   ├── components/
│   │   ├── bento/
│   │   │   ├── profile-card.tsx   # 个人简介卡
│   │   │   ├── profile-stats.tsx  # 统计数据（客户端）
│   │   │   ├── articles-card.tsx  # 随笔卡
│   │   │   ├── photography-card.tsx # 摄影卡
│   │   │   ├── mood-card.tsx      # 心情卡
│   │   │   ├── status-card.tsx    # 状态卡
│   │   │   └── social-card.tsx    # 社交卡
│   │   └── decor/
│   │       ├── lace-corner.tsx    # 蕾丝角花 SVG
│   │       └── lace-divider.tsx   # 蕾丝分隔线 + 菱形花饰
│   └── lib/
│       ├── articles.ts            # 文章数据读写
│       ├── photos.ts              # 照片数据读写
│       ├── moods.ts               # 心情数据读写
│       ├── moods-types.ts         # 心情类型定义（客户端安全）
│       ├── profile.ts             # 个人资料读写
│       └── auth.ts                # 认证 cookie 管理
├── PRD.md                         # 本文档
└── package.json
```

---

## 8. 启动与部署

### 本地开发

```bash
cd /Users/xiaoq/xiaoq
npm run dev
# → http://localhost:3000
```

### 生产构建

```bash
npm run build
npm start
```

### 部署到 Vercel

```bash
npx vercel
```

---

## 9. 功能清单

- [x] Bento Grid 响应式首页
- [x] 个人简介（头像 + 签名 + 统计）
- [x] 头像支持照片 / 表情 / 字母三种模式
- [x] 首页直接点击编辑头像和签名
- [x] 随笔发布 / 编辑 / 删除
- [x] 随笔列表页 + 详情页
- [x] 照片上传 / 删除 / 画廊展示
- [x] 每日心情记录（小猫表情）
- [x] 近 7 天心情展示
- [x] 实时北京时间时钟
- [x] Vibe Coding 状态指示
- [x] 社交链接（GitHub / 微信复制 / QQ 唤起 / Instagram）
- [x] 后台管理系统（登录 / 鉴权）
- [x] 白色简约 + 淡粉点缀 + 蕾丝装饰
- [ ] 部署到 Vercel 公网访问
- [ ] 文章 Markdown 渲染
- [ ] 评论系统
- [ ] RSS 订阅
- [ ] 暗色模式
