# TERMINAL_EDITORIAL // 个人博客 (Astro 版)

这是一个使用 **Astro** 和 **Tailwind CSS** 重构的个人博客项目。设计风格采用了 "Terminal Editorial" (终端社论)，结合了极简主义、深色模式、以及复古终端的美学，配以鲜艳的绿色作为强调色。

该项目由纯静态 HTML 文件迁移至成熟的 Astro 项目结构，提升了代码的复用性、开发体验和网站性能。

## 🚀 技术栈

*   **框架**: [Astro](https://astro.build/) - 提供极速的静态站点生成 (SSG) 以及灵活的组件化架构。
*   **样式**: [Tailwind CSS](https://tailwindcss.com/) - 实用优先的 CSS 框架，通过 Astro 集成进行优化构建。
*   **字体**: [Google Fonts](https://fonts.google.com/) - `Space Grotesk` (标题/标签) 和 `Inter` (正文内容)。
*   **图标**: [Google Material Symbols](https://fonts.google.com/icons) - 提供统一的现代和终端风格图标。
*   **部署**: 优化为 [Cloudflare Pages](https://pages.cloudflare.com/) 或 GitHub Pages 部署。

## 📂 项目结构

```text
/
├── public/                 # 静态资源 (图片等)，不会经过构建处理
├── src/
│   ├── components/         # 可复用的 Astro UI 组件
│   │   ├── TopNav.astro    # 顶部导航栏
│   │   ├── Sidebar.astro   # 左侧边栏 (桌面端)
│   │   └── Footer.astro    # 底部内容及移动端导航
│   ├── layouts/            # 页面布局模板
│   │   └── Layout.astro    # 全局基础布局 (包含 `<head>` 和全局样式)
│   └── pages/              # 路由页面，每个 `.astro` 对应一个 URL
│       ├── index.astro     # 首页 (生活利器)
│       ├── about.astro     # 关于页面
│       ├── blog.astro      # 博客文章页面
│       ├── bookmarks.astro # 资源导航页面
│       └── projects.astro  # 开源项目页面
├── astro.config.mjs        # Astro 配置文件 (包含 Tailwind 集成)
├── tailwind.config.mjs     # Tailwind 配置文件 (包含自定义主题颜色)
└── package.json            # 依赖管理
```

## 🛠️ 本地开发与构建

确保你已安装了 [Node.js](https://nodejs.org/)。

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

该命令将在 `http://localhost:4321` 启动一个本地服务器。

### 构建生产环境版本

```bash
npm run build
```

该命令会在项目根目录生成一个 `dist/` 文件夹，里面包含了可部署的静态文件。

## ☁️ Cloudflare Pages 部署指南

由于项目已经完全迁移到 Astro，你需要调整 Cloudflare Pages 的构建设置：

1.  将此仓库推送到 GitHub。
2.  在 Cloudflare Pages 仪表板中，创建一个新项目并连接到该 GitHub 仓库。
3.  在 **构建设置 (Build settings)** 中：
    *   **框架预设 (Framework preset)**: 选择 `Astro`
    *   **构建命令 (Build command)**: `npm run build`
    *   **构建输出目录 (Build output directory)**: `dist`
4.  保存并部署。Cloudflare Pages 将自动运行 Astro 构建并将生成的 `dist` 目录发布。
