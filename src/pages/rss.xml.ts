import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context: any) {
    const posts = await getCollection('blog');
    return rss({
        title: "Jay Yu's Blog",
        description: 'JayYuの博客站 — 技术、开源与生活',
        site: context.site,
        items: posts
            .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
            .map((post) => ({
                title: post.data.title,
                pubDate: post.data.pubDate,
                description: post.data.description,
                link: `/blog/${post.id}/`,
            })),
        customData: `<language>zh-cn</language>`,
    });
}
