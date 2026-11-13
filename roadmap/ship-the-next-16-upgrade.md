---
title: Ship the Next 16 upgrade and fix the production build
status: done
priority: high
area: release
origin: leftover
summary: Production on Vercel has failed since December 2025 (the CVE-fix merge, aa4bb6b), so the live site is the June 2025 build. The uncommitted upgrade (Next 16, contentlayer2, ESLint 9 flat config) should build; make it pass CI and land it on main.
tags: [nextjs, vercel, upgrade, ci]
created: 2026-11-13
updated: 2026-11-13
---

# Ship the Next 16 upgrade and fix the production build

## Why

Every deploy from `main` fails, and so would Lisa's résumé deploys, which are pull requests into `main`. The site has to build again before its content can be updated from Lisa.

## Where it stands

- `main` is at `aa4bb6b`, Vercel's automated CVE fix (bumps `next` to 14.2.35). Its production deployment failed. The last good one is `7131d90` (June 2025).
- The working tree holds an uncommitted upgrade of about 124 files: `next` 16.4.6, React 19, `contentlayer` → `contentlayer2` (`contentlayer.config.ts`, `@content` alias), `.eslintrc.json` → `eslint.config.mjs`, `next.config.js` → `next.config.ts`, PostCSS/Tailwind 4, component and snapshot updates, CI in `.github/workflows/main.yml`.
- Content edits are mixed in: certifications renamed (`00-green-software-practitioners`, `01-scrum-master`, `02-itil-foundation`), new projects. Lisa's résumé sync rewrites the managed content folders later, so these only need to build.
- CI (`main.yml`, Bun) runs install, `build:content`, lint, typecheck, `bun test` and `next build` on PRs and pushes to `main`. Vercel deploys `main` to production.

## Plan

- [ ] `bun install --frozen-lockfile` (refresh `bun.lockb` if it doesn't match `package.json`).
- [ ] `bun run build:content`, `bun run lint`, `bunx tsc -p tsconfig.json --noEmit`, `bun test`, `bunx next build`: fix what fails, following `AGENTS.md` (read the Next 16 docs in `node_modules/next/dist/docs/` before changing Next APIs).
- [ ] Update snapshots only where the change is intended (`bun test --update-snapshots`).
- [ ] Note the upgrade in `CHANGELOG.md`.

## Needs from you

- Ship it from the board (Done → Ship): it pushes `main`, and Vercel deploys.
- Check that the Vercel project's Node version is 20.9 or newer.

## Done when

- All the CI steps pass locally.
- After Ship, the Production deployment of `main` succeeds, and the site loads.
