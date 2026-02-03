# IFISHCOOL Portfolio

一个以「开发 × AI × 设计」为主题的个人作品集网站，基于 React + Vite 构建，使用 GSAP 打造沉浸式动效，项目与文章内容以 MDX 驱动。

**项目特点**

- 主页包含开场 Gate、Hero 搜索、项目时间轴与卡片、开源项目展示、联系区等完整叙事流。
- 项目与文章通过 `src/docs/**/*.mdx` 管理，前台自动生成项目卡片与弹窗内容。
- 深度使用 GSAP（含 ScrollTrigger / ScrollSmoother / MotionPath / ScrambleText）构建平滑滚动与高密度动效。
- 定制字体、光标、音效与轨道装饰营造「实验室」气质。

**页面结构（App 入口）**

- `IntroGate`：开场进入页，支持键盘进入与点击音效。
- `TopNav`：顶部菜单与滚动定位（Projects / Notes / Contact）。
- `Hero`：主视觉与项目搜索，点击结果可直接打开项目弹窗。
- `ProjectsStrip`：时间线 + 横向滚动卡片，支持弹窗阅读 MDX。
- `OpenSourceShowcase`：开源项目展示，支持“换一换”分页。
- `BigFooter`：联系方式与社交入口。
- `TextScene`：目前在 `App.tsx` 中被注释，可随时启用。

**内容与数据来源**

- 项目卡片自动从 `src/docs/**/*.mdx` 生成。
- 每个 MDX 文件通过 frontmatter 描述卡片信息。

```mdx
---
title: 标题
meta: 标签/平台
desc: 简短介绍
timeline: 2025.10
---
```

- `src/config/projects.ts` 使用 `import.meta.glob` 读取 MDX，并生成 `PROJECT_CARDS`。
- `src/config/openSource.ts` 手动维护开源项目展示列表。

**交互与动画亮点**

- `useSmoothScroll`：ScrollSmoother 实现整体平滑滚动。
- `useHeroAnimation`：标题 ScrambleText 动画与轨道运动。
- `useProjectsStripAnimation`：卡片入场、悬停动效、滚动驱动横向轨道。
- `useOpenSourceShowcaseAnimation`：卡片入场与轨道漂移动画（桌面端）。
- `useBigFooterAnimation`：底部轨道与行星漂移动画。

**目录结构速览（src）**

- `src/main.tsx`：应用入口与挂载。
- `src/App.tsx`：页面总装配与滚动容器。
- `src/App.css`：全局样式与模块样式引入。
- `src/sections/Hero.tsx`：主视觉与搜索。
- `src/sections/ProjectsStrip.tsx`：作品时间线与弹窗。
- `src/sections/OpenSourceShowcase.tsx`：开源项目展示。
- `src/sections/BigFooter.tsx`：联系与社交入口。
- `src/sections/TextScene.tsx`：可选的文字场景模块。
- `src/components/layout/IntroGate.tsx`：开场 Gate。
- `src/components/layout/TopNav.tsx`：顶部导航与滚动定位。
- `src/hooks/*`：动画与交互逻辑封装。
- `src/config/projects.ts`：项目卡片与 MDX 注册逻辑。
- `src/config/openSource.ts`：开源项目配置。
- `src/docs/**`：MDX 文章与项目文档。
- `src/assets/styles/*`：分区样式文件。
- `src/assets/images/*`：自定义光标资源。
- `src/assets/sounds/*`：点击与展开音效。
- `src/assets/fonts/*`：本地字体资源。

**开发与构建**

```bash
npm install
npm run dev
npm run build
npm run preview
```

**别名说明**

- `@ifc` -> `src`
- `@docs` -> `docs`
