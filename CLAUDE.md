# CLAUDE.md — Chillville Bakery & Boba

Project working notes for AI sessions. Read this first; it persists across sessions and compaction.

## What this is
A cinematic, single-page Next.js 15 (App Router) marketing site for a bakery + boba brand.
Stack: TypeScript, Tailwind, Framer Motion, GSAP + ScrollTrigger, Lenis smooth-scroll, react-icons.
Section flow: **Hero → About → Menu → Signature Specials (Boba · Cookies · Dubai) → Why Chillville → Visit → Contact → Footer**.

## Git: identity & pushing (IMPORTANT)
- **Commit identity is Mounika Bharatha** `<179122386+Mounikabharatha@users.noreply.github.com>` — already set as **repo-local** config (`git config --local`), so new commits inherit it. Do not commit as any other identity.
- The 8 previously-"growthcreators" commits were reattributed to Mounika; the 10 original `vvk569 <vijay.vemuri.89@gmail.com>` commits are intentionally left as-is. Don't touch vvk569 commits.
- **This machine's Git is old (2.15) and plain pushes fail with `HTTP 400`.** Always push with:
  ```bash
  git -c http.postBuffer=524288000 push origin main
  ```
- Remote `origin` = `https://github.com/vvk569/Chillville_website.git` (owned by vvk569; Mounika is a collaborator). Pushing to `main` may require force only after a history rewrite — otherwise normal pushes.
- Commit messages end with a `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>` trailer.

## How to work here (established conventions)
- **Change one section at a time; keep edits minimal and targeted.** Do not restructure the site, remove sections, or make broad "improvements" unless explicitly asked.
- **Do not modify unrelated sections.** When a request names a section, touch only that section's file(s).
- **The header/hero is the design benchmark** — warm dark palette (charcoal bg, cream text, caramel/coral/matcha accents). Bring other sections up to that quality; do not redesign the header/hero.
- **Always check desktop (1440) and mobile (375).**
- **Do not commit or push unless the user explicitly asks.** Leave changes in the working tree for review.

## Verifying changes (preview pane caveat)
- The in-app browser pane frequently runs the tab in a **hidden/throttled** state: the intro preloader stalls (RAF throttled), the hero video won't autoplay, and **screenshots return black**.
- So **verify via DOM / computed styles** (`javascript_tool`), `npx tsc --noEmit`, and `npm run build` rather than relying on screenshots. Measurements (sizes, colors, gridTemplateColumns, opacity, overflow) are reliable even when the pane won't composite.
- Mobile emulation reports an inflated `innerWidth` (~431 at the 375 preset), so a ~56px `scrollWidth` delta is a **pre-existing nav/preloader emulation artifact** (clipped by `body{overflow-x:hidden}`, `userScrollX === 0`), not a real overflow.

## Where things live
- `sections/` — one file per section. `app/page.tsx` composes them.
- `lib/data.ts` — all copy/product content. `lib/images.ts` — image/video registry. `lib/motion.ts` — shared Framer variants. `tailwind.config.ts` — colors/spacing/keyframes.
- `components/ui/` — shared UI (Heading, Reveal, Photo, MagneticButton, SignatureShowcase). `components/` — Navbar, Cursor, Preloader, SmoothScroll, ScrollProgress.

## Gotchas
- `public/images/kunafa.jpg` has a **play-button + letterbox baked into the image** (it's a video thumbnail). For a clean Dubai product shot use `dubai.jpg` (the Menu tile filters kunafa out).
- Source hero videos carry vendor watermarks baked in (e.g. "KlingAI 3.0", "MINIM") — can't be removed without a clean re-export.
- Hero background video = `public/videos/kunafa_boba.mp4` (autoplay/muted/loop/playsInline, poster `kunafa.jpg`).
- `.claude/launch.json` is a local dev-preview config — keep it untracked, don't commit it.

## Backups (from the identity rewrite / restores)
- Offline bundle: `~/Chillville_backup_20260811_001507.bundle` (all refs) — safety net, keep it.
- Branch `backup-before-restore-75a82ae` → the removed marquee/horizontal-card-scroll work (75a82ae), kept for reference.

## Session continuity (hooks & process)
Two hooks reduce context loss across sessions and compaction (configured in **`.claude/settings.local.json`** — personal/untracked/gitignored; scripts in `.claude/hooks/`):
- **SessionStart** → `.claude/hooks/session-context.sh` injects live git state (branch, HEAD, sync vs origin, uncommitted files, recent commits) at the top of every new/resumed/post-compaction session.
- **PreCompact** → `.claude/hooks/precompact-log.sh` appends a timestamped breadcrumb (HEAD, branch, uncommitted files) to **`.claude/session-log.md`** (untracked) right before compaction, so exact state is recoverable.

Activation note: because no settings file existed when these were first added, the settings watcher may not pick them up until the user opens `/hooks` once or restarts Claude Code. To make the hooks apply to *all* collaborators (not just this machine), move the `hooks` block from `.claude/settings.local.json` into the committed `.claude/settings.json`.

Process (manual, not automated):
- **At session end, run "update CLAUDE.md"** — I'll bump the baseline SHA below and add a short what's-done / what's-next note.
- Memory files under `~/.claude/projects/.../memory/` persist automatically; no periodic "sync" needed. Committing at natural checkpoints is the most durable context of all.

## Current baseline
- `main` history is attributed to Mounika. Latest reference point at time of writing: **c33c8ae** (Why Chillville reduced to two stat cards); **032f07b** added this CLAUDE.md. Update this line when the baseline meaningfully advances.
