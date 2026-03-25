export type Project = {
  name: string;
  desc: string;
  lang: string;
  stars: number;
  url: string;
};

const projects: Record<'zh' | 'en', Project[]> = {
  zh: [
    { name: "ArxivChef", desc: "抓取对应研究方向的 arxiv 最新论文。", lang: "Python", stars: 2, url: "https://github.com/JayYu686/ArxivChef" },
    { name: "jayyu686-nav", desc: "个人资源导航网站。", lang: "Astro", stars: 3, url: "https://github.com/JayYu686/jayyu686-nav" },
    { name: "JayYu-Blog", desc: "我的个人博客网站，采用极客风格构建。", lang: "Astro", stars: 0, url: "https://github.com/JayYu686/JayYu-Blog" }
  ],
  en: [
    { name: "ArxivChef", desc: "Script to fetch the latest arXiv papers for specific research areas.", lang: "Python", stars: 2, url: "https://github.com/JayYu686/ArxivChef" },
    { name: "jayyu686-nav", desc: "My personal resource navigation site.", lang: "Astro", stars: 3, url: "https://github.com/JayYu686/jayyu686-nav" },
    { name: "JayYu-Blog", desc: "My personal pure static blog rebuilt with a programmer aesthetic.", lang: "Astro", stars: 0, url: "https://github.com/JayYu686/JayYu-Blog" }
  ]
};

const pageText = {
  zh: {
    title: "项目 | Jay Yu",
    heading: "projects",
    intro: "以下是我在 GitHub 上维护的部分开源项目合集。"
  },
  en: {
    title: "Projects | Jay Yu",
    heading: "projects",
    intro: "A collection of my open-source projects on GitHub."
  }
};

export function getProjects(lang: 'zh' | 'en') {
  return projects[lang];
}

export function getProjectsPageText(lang: 'zh' | 'en') {
  return pageText[lang];
}
