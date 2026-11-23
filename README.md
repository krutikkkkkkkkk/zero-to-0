# Zero to ₹0

An independent parody of paid AI-course marketing, and a free learning path built from public YouTube tutorials.

Built with Next.js 16 and Tailwind CSS 4.

## Develop

```bash
npm install
npm run dev
```

## Structure

- `app/` — layout, page, global Tailwind theme (`globals.css`), icon
- `components/` — one component per page section; `site-header`, `learn-modules` and `resource-directory` are client components
- `lib/content.ts` — channels, modules and FAQ copy

Practice progress is stored in the browser under the `zero-practice` localStorage key.
