# 技术方案 — xiaoq 个人博客系统

---

## 一、技术选型

| 技术 | 用途 | 选型理由 |
|---|---|---|
| Next.js 16 (App Router) | 全栈框架 | React 官方推荐，App Router 是主流范式 |
| TypeScript | 类型系统 | 编译时类型检查，减少运行时错误 |
| Tailwind CSS v4 | 样式方案 | 原子化 CSS，直接在 JSX 中写样式，开发效率高 |
| lucide-react | 图标库 | 轻量、美观、Tree Shaking 友好 |
| JSON 文件存储 | 数据持久化 | 个人博客数据量小，无需数据库，备份简单（拷贝文件夹即可） |
| Server Actions + API Routes | 后端逻辑 | Next.js 原生能力，无需额外后端服务 |

**为什么不用数据库？**

- 单用户场景，数据量极小
- JSON 文件即数据，备份只需拷贝 `data/` 目录
- 无需安装配置 MySQL / PostgreSQL，零运维成本

---

## 二、架构规范

### 2.1 分层架构

```
┌─────────────────────────────────────┐
│           用户界面层 (UI)             │
│   src/app/          (页面路由)       │
│   src/components/   (组件库)         │
├─────────────────────────────────────┤
│           API 接口层                 │
│   src/app/api/      (REST API)      │
├─────────────────────────────────────┤
│           业务逻辑层                  │
│   src/lib/          (工具函数)       │
├─────────────────────────────────────┤
│           数据存储层                  │
│   data/             (JSON 文件)      │
│   public/           (静态资源)       │
└─────────────────────────────────────┘
```

### 2.2 命名规范

| 类型 | 规范 | 示例 |
|---|---|---|
| 文件名 | kebab-case | `profile-card.tsx` |
| 组件名 | PascalCase | `ProfileCard` |
| 函数名 | camelCase | `getArticles` |
| 类型/接口 | PascalCase | `Article`, `MoodRecord` |
| 路由目录 | kebab-case / `[slug]` 动态参数 | `articles/[slug]` |
| JSON 键 | camelCase | `avatarType` |

### 2.3 组件规范

- **服务端组件**（默认）：无 `"use client"` 声明，可直接调用 `fs` 读写文件
- **客户端组件**：需要交互（`useState`/`useEffect`/事件处理）时加 `"use client"`
- 客户端组件不能直接 `import fs`，需通过 API 路由获取数据

### 2.4 样式规范

- 使用 Tailwind 原子类，不写自定义 CSS（除非必要）
- 响应式：先写移动端样式，再用 `md:` / `lg:` 前缀覆盖桌面端
- 自定义样式放在 `globals.css` 的 `@theme` 或 `@layer` 中
- 蕾丝装饰组件独立于业务组件，放在 `components/decor/`

---

## 三、项目目录结构

```
xiaoq/
├── doc/                              # 项目文档
│   ├── PRD.md                        # 产品需求文档
│   └── plan.md                       # 技术方案（本文档）
│
├── data/                             # JSON 数据存储
│   ├── articles.json                 # 文章数据
│   ├── photos.json                   # 照片元数据
│   ├── moods.json                    # 心情记录
│   └── profile.json                  # 个人资料
│
├── public/                           # 静态资源
│   ├── photos/                       # 用户上传的照片
│   └── avatars/                      # 用户上传的头像
│
├── src/
│   ├── app/                          # Next.js App Router 页面
│   │   ├── layout.tsx                # 根布局
│   │   ├── page.tsx                  # 首页（Bento Grid）
│   │   ├── globals.css               # 全局样式 + 蕾丝装饰
│   │   ├── admin/
│   │   │   └── page.tsx              # 后台管理（随笔/照片/资料）
│   │   ├── articles/
│   │   │   ├── page.tsx              # 全部随笔列表
│   │   │   └── [slug]/
│   │   │       └── page.tsx          # 文章详情页（SSG）
│   │   ├── photography/
│   │   │   └── page.tsx              # 照片画廊
│   │   └── api/                      # REST API 路由
│   │       ├── auth/route.ts         # 登录/登出/检查
│   │       ├── articles/
│   │       │   ├── route.ts          # GET 列表 / POST 新建
│   │       │   └── [slug]/route.ts   # GET/PUT/DELETE 单篇
│   │       ├── photos/
│   │       │   ├── route.ts          # GET 列表 / POST 上传
│   │       │   └── [id]/route.ts     # DELETE 删除
│   │       ├── moods/route.ts        # GET 心情 / POST 记录
│   │       └── profile/route.ts      # GET 资料 / PUT 更新
│   │
│   ├── components/                   # 组件库
│   │   ├── bento/                    # 首页 Bento 卡片
│   │   │   ├── profile-card.tsx      # 个人简介卡 (2×2)
│   │   │   ├── profile-stats.tsx     # 统计数字（客户端动态加载）
│   │   │   ├── articles-card.tsx     # 最新随笔卡 (2×1)
│   │   │   ├── photography-card.tsx  # 摄影随笔卡 (2×1)
│   │   │   ├── mood-card.tsx         # 今日心情卡 (1×1)
│   │   │   ├── status-card.tsx       # 状态面板 (2×1)
│   │   │   └── social-card.tsx       # 社交链接卡 (1×1)
│   │   └── decor/                    # 装饰组件
│   │       ├── lace-corner.tsx       # 蕾丝角花 SVG
│   │       └── lace-divider.tsx      # 蕾丝分隔线 + 菱形花饰
│   │
│   └── lib/                          # 业务逻辑 / 工具函数
│       ├── articles.ts               # 文章 CRUD
│       ├── photos.ts                 # 照片 CRUD
│       ├── moods.ts                  # 心情 CRUD（服务端）
│       ├── moods-types.ts            # 心情类型定义（客户端安全）
│       ├── profile.ts                # 个人资料 CRUD
│       └── auth.ts                   # Cookie 鉴权
│
├── next.config.ts                    # Next.js 配置
├── tailwind.config.ts                # Tailwind 配置
├── tsconfig.json                     # TypeScript 配置
└── package.json                      # 依赖管理
```

---

## 四、路由设计

### 4.1 前端页面路由

| 路由 | 渲染方式 | 页面功能 |
|---|---|---|
| `/` | 静态生成 | Bento Grid 首页，6 张卡片 |
| `/articles` | 静态生成 | 全部随笔列表 +「写随笔」按钮 |
| `/articles/[slug]` | SSG | 文章详情，`generateStaticParams` 预渲染 |
| `/photography` | 静态生成 | 照片画廊，网格展示 |
| `/admin` | 静态生成 (CSR) | 后台管理，需登录 |

### 4.2 API 路由

#### 鉴权

| 方法 | 路由 | 鉴权 | 说明 |
|---|---|---|---|
| GET | `/api/auth` | 否 | 返回 `{ authenticated: boolean }` |
| POST | `/api/auth` | 否 | `{ password }` → 设置 httpOnly cookie |
| DELETE | `/api/auth` | 否 | 清除 cookie，登出 |

#### 文章

| 方法 | 路由 | 鉴权 | 说明 |
|---|---|---|---|
| GET | `/api/articles` | 否 | 返回文章数组（按日期倒序） |
| POST | `/api/articles` | 是 | `{ title, date, excerpt, content }` → 新建 |
| GET | `/api/articles/[slug]` | 否 | 返回单篇文章 |
| PUT | `/api/articles/[slug]` | 是 | 更新文章 |
| DELETE | `/api/articles/[slug]` | 是 | 删除文章 |

#### 照片

| 方法 | 路由 | 鉴权 | 说明 |
|---|---|---|---|
| GET | `/api/photos` | 否 | 返回照片数组 |
| POST | `/api/photos` | 是 | FormData 上传文件 → 存 `public/photos/` |
| DELETE | `/api/photos/[id]` | 是 | 删除文件 + 元数据 |

#### 心情

| 方法 | 路由 | 鉴权 | 说明 |
|---|---|---|---|
| GET | `/api/moods` | 否 | 返回 `{ today, recent[], count }` |
| POST | `/api/moods` | 否 | `{ mood }` → 记录今日心情 |

#### 个人资料

| 方法 | 路由 | 鉴权 | 说明 |
|---|---|---|---|
| GET | `/api/profile` | 否 | 返回当前资料 |
| PUT | `/api/profile` | 是 | JSON 更新资料 或 FormData 上传头像 |

---

## 五、数据模型 (JSON Schema)

### 5.1 Article（文章）

```typescript
interface Article {
  slug: string;      // URL 标识，从标题自动生成
  title: string;     // 文章标题
  date: string;      // 发布日期，格式 YYYY-MM-DD
  excerpt: string;   // 摘要，卡片上显示
  content: string;   // 正文，段落之间用 \n\n 分隔
}
```

### 5.2 Photo（照片）

```typescript
interface Photo {
  id: string;         // 唯一标识，从文件名提取
  title: string;      // 照片标题
  date: string;       // 上传日期 YYYY-MM-DD
  filename: string;   // 实际文件名，存在 public/photos/
  description?: string; // 可选描述
}
```

### 5.3 MoodRecord（心情记录）

```typescript
type Mood = "great" | "good" | "okay" | "bad" | "terrible";

interface MoodRecord {
  date: string;   // YYYY-MM-DD
  mood: Mood;
}
```

心情映射：

| Mood | 表情 | 中文 |
|---|---|---|
| great | 😸 | 超棒 |
| good | 😺 | 不错 |
| okay | 🐱 | 一般 |
| bad | 😿 | 低落 |
| terrible | 🙀 | 难过 |

### 5.4 Profile（个人资料）

```typescript
type AvatarType = "initials" | "emoji" | "image";

interface Profile {
  avatarType: AvatarType;
  avatarValue: string;   // initials: "xq", emoji: "🐱", image: "avatar-1720.jpg"
  bio: string;           // 个性签名
}
```

---

## 六、首页 Bento Grid 布局规范

### 6.1 桌面端 (md+)

```
┌──────────┬──────────┬──────────┬──────────┐
│ Profile  │ Profile  │ Articles │ Articles │
│  col 1-2 │  col 1-2 │  col 3-4 │  col 3-4 │
│  row 1-2 │  row 1-2 │  row 1   │  row 1   │
├──────────┼──────────┼──────────┼──────────┤
│ Profile  │ Profile  │ Photo    │ Photo    │
│          │          │  col 3-4 │  col 3-4 │
│          │          │  row 2   │  row 2   │
├──────────┼──────────┼──────────┼──────────┤
│  Mood    │  Status  │  Status  │  Social  │
│  col 1   │  col 2-3 │  col 2-3 │  col 4   │
│  row 3   │  row 3   │  row 3   │  row 3   │
└──────────┴──────────┴──────────┴──────────┘
```

### 6.2 CSS Grid 配置

```css
grid-template-columns: repeat(4, 1fr);
grid-auto-rows: minmax(200px, auto);
gap: 16px; /* gap-4 */
```

### 6.3 移动端 (< md)

所有卡片退化为单列堆叠，按 DOM 顺序排列：

1. 个人简介
2. 最新随笔
3. 摄影随笔
4. 今日心情
5. 状态面板
6. 社交链接

### 6.4 交互动效

```css
transition: all 500ms ease-out;
hover: scale(1.02) + shadow-lg + ring 变亮
```

---

## 七、鉴权方案

### 7.1 方案

- 单一管理员密码，存储在环境变量 `ADMIN_PASSWORD`（默认 `xiaoq2026`）
- 登录后设置 httpOnly cookie `admin_token`，有效期 24 小时
- API 写操作（POST/PUT/DELETE）检查 cookie
- 读操作（GET）无需鉴权

### 7.2 流程

```
用户输入密码 → POST /api/auth → 验证 →
  正确 → 设置 cookie → 返回 200
  错误 → 返回 401

后续请求 → API 读取 cookie → 比对 → 放行/拒绝
```

---

## 八、实现步骤回顾

| 步骤 | 内容 | 产出 |
|---|---|---|
| 1 | 项目脚手架 | Next.js + TypeScript + Tailwind 空项目 |
| 2 | 数据层 | `data/` JSON 文件 + `lib/` 读写函数 |
| 3 | API 层 | REST API 路由（articles/photos/moods/profile/auth） |
| 4 | 首页布局 | 6 张 Bento 卡片 + CSS Grid |
| 5 | 后台管理 | `/admin` 登录 + 随笔/照片/资料管理 |
| 6 | 文章功能 | 列表页 + 详情页 SSG + 编辑器 |
| 7 | 照片功能 | 上传 + 画廊 + 首页缩略图 |
| 8 | 心情记录 | 小猫表情选择 + 7 天历史条 |
| 9 | 资料编辑 | 头像三种模式 + 签名行内编辑 |
| 10 | 视觉美化 | 粉色点缀 + 蕾丝角花 + 分隔线 + 底纹 |

---

## 九、部署方案

### 9.1 推荐：Vercel（免费）

```bash
npx vercel
```

- 首次用 GitHub 登录
- 自动检测 Next.js 项目，零配置
- 提供 `https://项目名.vercel.app` 公网域名
- 自动 HTTPS，全球 CDN 加速
- 后续 `git push` 自动部署

### 9.2 本地生产构建

```bash
npm run build   # 生成 .next/ 构建产物
npm start       # 生产模式启动（默认 :3000）
```

### 9.3 环境变量

部署到 Vercel 时需在 Dashboard → Settings → Environment Variables 设置：

```
ADMIN_PASSWORD=你的密码
```

---

## 十、待扩展功能

- [ ] 文章 Markdown 渲染
- [ ] 评论系统
- [ ] RSS 订阅
- [ ] 暗色模式
- [ ] 图片 CDN 优化
- [ ] SEO 优化（sitemap / meta）
