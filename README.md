# JayYu-Blog

This is a personal, programmer-style static blog built with [Astro](https://astro.build).

## Features

- **Programmer Aesthetic**: Terminal-inspired dark mode layout.
- **i18n Localization**: Fully bilingual (Chinese primary, English fallback) with a built-in switcher.
- **Pure Static**: 100% pre-rendered HTML for maximum performance.
- **Content Collections**: Markdown-based articles with Astro's type-safe `astro:content`.

## Local Development

1. Run `npm install` to grab dependencies.
2. Run `npm run dev` to start the local development server at `localhost:4321`.
3. Start editing Markdown files within `src/content/blog/` to add posts.

## Deployment

Simply run `npm run build` to output the highly optimized static build to the `dist/` directory, which can be deployed to GitHub Pages, Vercel, Netlify, or any static hosting service.
