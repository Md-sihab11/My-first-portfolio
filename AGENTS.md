# AGENTS.md

## What this is

Single Next.js 16.4.2 (App Router, Turbopack) personal portfolio. No monorepo, no tests, no CI.

**The README is aspirational/stale — trust the code.** It documents Better Auth, MongoDB, an `/admin` dashboard, S3/R2 uploads, and Resend email. None of these exist (no such deps in `package.json`, no `src/app/admin`). The only API route, `src/app/api/contact/route.ts`, validates input and `console.log`s the message — nothing is persisted or emailed.

## Commands

- `npm run dev` — dev server (Next 16 defaults to Turbopack)
- `npm run build` — production build; also runs type checking and prerenders all pages. This is the real verification step — run it before considering work done.
- `npx tsc --noEmit` — fast typecheck only (passes clean as of writing).
- **`npm run lint` is broken.** Next 16 removed `next lint`; the script fails with "Invalid project directory provided". Running `npx eslint .` directly also crashes (FlatCompat + `eslint-config-next` circular-JSON error in `eslint.config.mjs`). Don't rely on lint — use `tsc` + `build` instead, or fix the ESLint flat config if linting is truly needed.

## Architecture

- Path aliases (tsconfig): `@/*` → `src/*`, `@/content/*` → `content/*`.
- All site content lives in static TS data modules under `src/data/` (`site.ts` for name/role/bio, plus `projects.ts`, `skills.ts`, `social-links.ts`, `navigation.ts`, `resources.ts`). There is no CMS — edit these files to change content.
- Blog posts are `content/blog/*.mdx`, read at build time by `src/lib/blog.ts` with a **hand-rolled frontmatter parser** — not a real MDX pipeline. `.mdx` files are treated as plain text; JSX/components inside them will not render. The body renderer (`src/app/blog/[slug]/page.tsx`) only handles `##`/`###` headings, ``` fenced code blocks, `- ` bullet lists, and plain paragraphs. No inline markdown (bold, links) support.
- `/blog` and `/articles` are duplicate routes rendering the same posts; navigation (`src/data/navigation.ts`) links to `/articles`.
- `params` in dynamic routes is a `Promise` and must be awaited (Next 15+ convention).

## Gotchas

- Only one env var is actually read by the code: `NEXT_PUBLIC_SITE_URL` (falls back to `https://shakib.dev` in `src/app/layout.tsx`). `.env.example` lists just that one. Adding features that need new env vars: update `.env.example` too.
- Styling is Tailwind **v3** (not v4) with a CSS-variable theme. Semantic color classes (`text-primary`, `bg-surface`, `border-border`, `text-accent`, etc.) are mapped to `rgb(var(--x) / <alpha-value>)` tokens defined in `tailwind.config.ts` and `src/app/globals.css` — prefer these over raw palette colors to stay on-theme.
- Repo root contains stray `index.html` and `style.css` (leftover static scaffold); they are unused by Next.js. Don't wire them in or delete them without being asked.
- `src/lib/utils.ts` has `cn()` (clsx + tailwind-merge) and `formatDate()` — use them instead of re-implementing.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
