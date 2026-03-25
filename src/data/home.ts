export type TerminalLine = {
  prompt: string;
  output: string;
};

export type HomeContent = {
  title: string;
  subtitle: string;
  terminal: TerminalLine[];
  sections: { heading: string; text: string; linkText: string; linkHref: string }[];
};

const homeContent: Record<'zh' | 'en', HomeContent> = {
  zh: {
    title: "首页 | Jay Yu",
    subtitle: "我是 Jay Yu，一名人工智能专业的在读研究生，一名热爱开源并乐于分享知识的开发者。",
    terminal: [
      { prompt: "whoami", output: "jayyu" },
      { prompt: "cat skills.txt", output: "- 深度学习→小样本行为识别\n- 软件架构设计 Web开发设计" },
      { prompt: "cat personality.txt", output: "- 技术热情 持续学习能力\n- 热爱开源 关注技术社区发展" },
      { prompt: "status --current", output: "持续学习，保持进步。" }
    ],
    sections: [
      { heading: "近期项目", text: "欢迎前往 ", linkText: "项目页面", linkHref: "/projects" },
      { heading: "最新文章", text: "我在 ", linkText: "博客目录", linkHref: "/blog" }
    ]
  },
  en: {
    title: "Home | Jay Yu",
    subtitle: "I'm Jay Yu. An AI graduate student and a developer who loves open-source, building tools, and sharing knowledge.",
    terminal: [
      { prompt: "whoami", output: "jayyu" },
      { prompt: "cat skills.txt", output: "- Deep Learning → Few-Shot Action Recognition\n- Software Architecture & Web Development" },
      { prompt: "cat personality.txt", output: "- Passionate about tech, continuous learner\n- Open-source enthusiast, following tech community" },
      { prompt: "status --current", output: "Keep learning, keep growing." }
    ],
    sections: [
      { heading: "Latest Projects", text: "Check out my open-source work on ", linkText: "the Projects page", linkHref: "/en/projects" },
      { heading: "Recent Articles", text: "I write about development, architecture, and technology on ", linkText: "my Blog", linkHref: "/en/blog" }
    ]
  }
};

const sectionSuffix = {
  zh: [
    " 查看我的开源作品。",
    " 记录关于开发、架构与技术的思考。"
  ],
  en: [
    ".",
    "."
  ]
};

export function getHomeContent(lang: 'zh' | 'en') {
  return homeContent[lang];
}

export function getHomeSectionSuffix(lang: 'zh' | 'en') {
  return sectionSuffix[lang];
}

export type BlogPageText = {
  title: string;
  heading: string;
  intro: string;
  emptyText: string;
  dateLocale: string;
  dateOptions: Intl.DateTimeFormatOptions;
};

const blogPageText: Record<'zh' | 'en', BlogPageText> = {
  zh: {
    title: "文章 | Jay Yu",
    heading: "blog",
    intro: "我的思考、随笔、教程与开发日志。",
    emptyText: '未找到任何文章。 echo "Hello World" > first-post.md',
    dateLocale: 'zh-CN',
    dateOptions: { year: 'numeric', month: '2-digit', day: '2-digit' }
  },
  en: {
    title: "Blog | Jay Yu",
    heading: "blog",
    intro: "Thoughts, tutorials, and development logs.",
    emptyText: 'No posts found. echo "Hello World" > first-post.md',
    dateLocale: 'en-US',
    dateOptions: { year: 'numeric', month: 'short', day: 'numeric' }
  }
};

export function getBlogPageText(lang: 'zh' | 'en') {
  return blogPageText[lang];
}
