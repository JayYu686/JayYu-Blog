<p align="center">
	<img src="./public/favicon.png" alt="Jay Yu logo" width="108" height="108" />
</p>

# Jay Yu の 个人博客站

🌎 [English Version Below](#english-version)

## 在线访问
- 主页：https://jayyu-blog.pages.dev/
- 英文页：https://jayyu-blog.pages.dev/en/

## 核心功能
- **极客终端美学**：全局采用纯粹的 Terminal 风格设计，包含代码高亮框、闪烁光标与特殊的命令行提示符修饰。
- **现代化字体排版**：中英混排自动适配（英文字符强制等宽 Monospace，中文字符 fallback 优雅的思源宋体 Noto Serif SC）。
- **丝滑过渡动效**：原生接入 Astro ViewTransitions API，辅以悬停发光（Glow Hover）特效，提供堪比 SPA 的极致顺滑路由体验。
- **双语国际化 (i18n)**：支持全局在中文 `/` 与英文 `/en/` 语言界面之间无缝切换。
- **内容集合模块化**：博客文章基于 Astro 6 Content Collections 强大的类型校验与 MDX 自动渲染。
- **开源生态索引**：项目页面集成并展示个人核心开源项目库的最新动态与信息。
- **极客生活志**：收录了诸如极简护肤、人体工学配置等提升极客生产力的高质量生活好物与指南。

## 技术栈
- Astro 6
- TypeScript
- 原生 CSS (CSS Variables)
- Astro View Transitions API

## 本地开发

1. 安装依赖

```bash
npm install
```

2. 启动开发服务器

```bash
npm run dev
```

默认地址为 `http://localhost:4321`。

3. 构建生产静态页面

```bash
npm run build
```

## 目录结构（简版）

```text
.
├── public/                 # 静态资源（图标、字体等）
├── src/
│   ├── content/
│   │   ├── blog/           # Markdown 博客文章存放处
│   │   └── config.ts       # Content Collections 集合配置
│   ├── i18n/
│   │   ├── ui.ts           # 多语言文本字典
│   │   └── utils.ts        # 语言解析与切换工具函数
│   ├── layouts/
│   │   ├── BaseLayout.astro # 基础页面骨架结构
│   │   └── PostLayout.astro # 博客文章专用骨架
│   ├── pages/
│   │   ├── blog/           # 中文博客列表与动态路由
│   │   ├── en/             # 全局英文页面路由
│   │   ├── index.astro     # 中文首页
│   │   ├── projects.astro  # 项目索引页
│   │   ├── bookmarks.astro # 收藏页
│   │   └── life.astro      # 个人生活页
│   └── styles/
│       └── global.css      # 全局样式、动画及极客主题设定
├── .node-version           # Cloudflare 自动化部署 Node 环境配置
├── astro.config.mjs        # Astro i18n 及插件配置
└── package.json
```

## 数据维护说明

博客文章文件位于：`src/content/blog/`

以 Markdown (`.md` 或 `.mdx`) 格式编写文章。
Frontmatter 结构标准规范要求如下：

```yaml
---
title: "你的文章核心标题"
pubDate: 2026-03-24
description: "文章的外部摘要与简短描述"
author: "Jay Yu"
image:
    url: "/images/cover.png" # 可选，封面图片
    alt: "图片描述"
tags: ["CSS", "Astro", "前端架构"]
---

文章正文内容...
```

---
<br>

<span id="english-version"></span>

# Jay Yu's Personal Blog

## Online Access
- Home (ZH): https://jayyu-blog.pages.dev/
- English: https://jayyu-blog.pages.dev/en/

## Core Features
- **Hacker Terminal Aesthetic**: Designed with a pure terminal style, featuring code blocks, a blinking cursor, and command-line prompts.
- **Modern Typography**: Smart font subsetting (Monospace for English digits/code, falling back to elegant Noto Serif SC for Chinese characters).
- **Smooth Page Transitions**: Uses the Astro ViewTransitions API and hover-glow effects to provide an incredibly smooth, SPA-like navigation experience.
- **Bilingual i18n**: Built-in logic bridging Chinese `/` and English `/en/` localization paths natively.
- **Content Collections**: Fully strictly typed Markdown/MDX blog generation backed by Astro 6.
- **Open Source Catalog**: Project views showcasing my core external open-source projects on GitHub.
- **Geek Lifestyle Handbook**: A curated collection of productivity-boosting routines and goodies, including minimalist skincare and ergonomic sets.

## Tech Stack
- Astro 6
- TypeScript
- Vanilla CSS (Variables & Keyframes)
- Astro View Transitions API

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Start the dev server:
```bash
npm run dev
```
Runs locally at `http://localhost:4321`.

3. Build for production:
```bash
npm run build
```

## Content Maintenance

Markdown blog paths are located in: `src/content/blog/`.

Required Frontmatter structure:

```yaml
---
title: "Your Post Title"
pubDate: 2026-03-24
description: "Summary of the post content"
author: "Jay Yu"
tags: ["Tag1", "Tag2"]
---
```
