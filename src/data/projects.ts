export type Project = {
  name: string;
  desc: string;
  lang: string;
  stars: number;
  url: string;
};

// Public repositories and star counts synced from GitHub on 2026-08-31.
const projects: Record<'zh' | 'en', Project[]> = {
  zh: [
    { name: "TinyLLM-System", desc: "基于 PyTorch FSDP2 与 Qwen3 的可复现 LLM 后训练、评测与服务系统。", lang: "Python", stars: 0, url: "https://github.com/JayYu686/TinyLLM-System" },
    { name: "commerceflow-agent", desc: "面向电商流程的智能体实验项目。", lang: "Python", stars: 0, url: "https://github.com/JayYu686/commerceflow-agent" },
    { name: "LifeSideQuest", desc: "基于 Flutter 的人生支线任务 APP，帮助完成每天的支线任务。", lang: "Dart", stars: 1, url: "https://github.com/JayYu686/LifeSideQuest" },
    { name: "jayyu686-nav", desc: "个人资源导航网站。", lang: "Astro", stars: 6, url: "https://github.com/JayYu686/jayyu686-nav" },
    { name: "LingStack", desc: "基于 Flutter 和 Go 的跨端 AI 资源库，收集 Prompts、Skills 与 MCP。", lang: "Dart", stars: 0, url: "https://github.com/JayYu686/LingStack" },
    { name: "JayYu-Blog", desc: "我的个人博客网站。", lang: "Astro", stars: 1, url: "https://github.com/JayYu686/JayYu-Blog" },
    { name: "ArxivChef", desc: "抓取对应研究方向的 arXiv 最新论文。", lang: "Python", stars: 2, url: "https://github.com/JayYu686/ArxivChef" }
  ],
  en: [
    { name: "TinyLLM-System", desc: "Reproducible LLM post-training, evaluation, and serving with PyTorch FSDP2 and Qwen3.", lang: "Python", stars: 0, url: "https://github.com/JayYu686/TinyLLM-System" },
    { name: "commerceflow-agent", desc: "An agent-based experiment for commerce workflows.", lang: "Python", stars: 0, url: "https://github.com/JayYu686/commerceflow-agent" },
    { name: "LifeSideQuest", desc: "A Flutter app for completing daily life side quests.", lang: "Dart", stars: 1, url: "https://github.com/JayYu686/LifeSideQuest" },
    { name: "jayyu686-nav", desc: "My personal resource navigation site.", lang: "Astro", stars: 6, url: "https://github.com/JayYu686/jayyu686-nav" },
    { name: "LingStack", desc: "A cross-platform AI resource library built with Flutter and Go for Prompts, Skills, and MCP.", lang: "Dart", stars: 0, url: "https://github.com/JayYu686/LingStack" },
    { name: "JayYu-Blog", desc: "My personal blog website.", lang: "Astro", stars: 1, url: "https://github.com/JayYu686/JayYu-Blog" },
    { name: "ArxivChef", desc: "A script to fetch the latest arXiv papers for specific research areas.", lang: "Python", stars: 2, url: "https://github.com/JayYu686/ArxivChef" }
  ]
};

const pageText = {
  zh: {
    title: "项目 | Jay Yu",
    heading: "projects",
    intro: "这里收录了我在 GitHub 上公开维护的全部项目，项目卡片展示语言与最近同步的星标数。"
  },
  en: {
    title: "Projects | Jay Yu",
    heading: "projects",
    intro: "All of my public GitHub projects, with language and recently synced star counts."
  }
};

export function getProjects(lang: 'zh' | 'en') {
  return projects[lang];
}

export function getProjectsPageText(lang: 'zh' | 'en') {
  return pageText[lang];
}
