import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const owner = 'JayYu686';
const metadataPath = resolve('scripts/project-metadata.json');
const outputPath = resolve('src/data/github-projects.json');
const metadata = JSON.parse(await readFile(metadataPath, 'utf8'));
const token = process.env.GITHUB_TOKEN;

const response = await fetch(
  `https://api.github.com/users/${owner}/repos?per_page=100&sort=updated`,
  {
    headers: {
      Accept: 'application/vnd.github+json',
      'User-Agent': 'JayYu-Blog-build',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    signal: AbortSignal.timeout(15000),
  },
);

if (!response.ok) {
  throw new Error(`GitHub API request failed: ${response.status} ${response.statusText}`);
}

const repositories = await response.json();
const projects = repositories
  .filter((repo) => repo.owner?.login?.toLowerCase() === owner.toLowerCase() && repo.visibility === 'public')
  .map((repo) => {
    const meta = metadata[repo.name] ?? {};
    const language = repo.language || 'Other';
    const details = meta.details ?? {
      zh: { background: '项目背景信息待补充。', outcome: '项目成果信息待补充。' },
      en: { background: 'Project background to be documented.', outcome: 'Project outcome to be documented.' },
    };

    return {
      slug: repo.name,
      name: repo.name,
      desc: {
        zh: meta.descZh || repo.description || '暂无项目简介。',
        en: meta.descEn || repo.description || 'No repository description yet.',
      },
      lang: language,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      updatedAt: repo.updated_at,
      topics: repo.topics || [],
      url: repo.html_url,
      homepage: repo.homepage || null,
      demoUrl: meta.demoUrl || repo.homepage || null,
      screenshotUrl: `https://opengraph.githubassets.com/1/${owner}/${repo.name}`,
      type: meta.type || 'Other',
      techStack: meta.techStack || [language],
      details,
    };
  })
  .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

await writeFile(outputPath, `${JSON.stringify(projects, null, 2)}\n`, 'utf8');
console.log(`Synced ${projects.length} public GitHub repositories for ${owner}.`);
