import projectData from './github-projects.json';

export type ProjectDetails = {
  background: string;
  outcome: string;
};

export type Project = {
  slug: string;
  name: string;
  desc: { zh: string; en: string };
  lang: string;
  stars: number;
  forks: number;
  updatedAt: string;
  topics: string[];
  url: string;
  homepage: string | null;
  demoUrl: string | null;
  screenshotUrl: string;
  type: string;
  techStack: string[];
  details: { zh: ProjectDetails; en: ProjectDetails };
};

export const projects = projectData as Project[];

const pageText = {
  zh: {
    title: '项目 | Jay Yu',
    heading: 'projects',
    intro: '这里收录了我在 GitHub 上公开维护的全部项目。项目数据在构建阶段同步，并支持按语言和类型筛选。',
  },
  en: {
    title: 'Projects | Jay Yu',
    heading: 'projects',
    intro: 'All of my public GitHub projects, with build-time metadata and filters by language and project type.',
  },
};

export function getProjects(_lang: 'zh' | 'en') {
  return projects;
}

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getProjectsPageText(lang: 'zh' | 'en') {
  return pageText[lang];
}
