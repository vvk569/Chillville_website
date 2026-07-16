# Contributing to Chillville Bakery & Boba 🍩🧋

Welcome! This is a small two-person project, so the rules are light — but
following them keeps our work from colliding. Please read this once.

---

## 1. One-time setup

You need **Node.js 18.18+ (20+ recommended)**, **git**, and a **GitHub account**
that's been added as a collaborator on the repo.

```bash
git clone https://github.com/vvk569/Chillville_website.git
cd Chillville_website
npm install        # installs dependencies
npm run dev        # preview at http://localhost:3000
```

Leave `npm run dev` running while you work — the page reloads automatically as
you edit.

---

## 2. The everyday workflow

**Golden rule: always `git pull` before you start, and again before you push.**

For anything bigger than a tiny fix, work on your own **branch**:

```bash
# 1. Get the latest main
git checkout main
git pull

# 2. Start a branch named for what you're doing
git checkout -b your-name/what-youre-doing      # e.g. priya/menu-photos

# 3. ...make your changes, preview with `npm run dev`...

# 4. Save your work
git add -A
git commit -m "Short description of the change"

# 5. Push your branch
git push -u origin your-name/what-youre-doing
```

Then open a **Pull Request** on GitHub:
- Go to the repo → **Pull requests** → **New pull request**
- Base = `main`, compare = your branch → **Create pull request**
- The other person reviews it, then click **Merge**.

After it's merged, get it locally:
```bash
git checkout main
git pull
```

---

## 3. If your push is rejected

That just means the other person pushed first. Sync and retry:

```bash
git pull --rebase
git push
```

If git reports a **conflict**, open the marked files, keep the correct lines
(delete the `<<<<<<<`, `=======`, `>>>>>>>` markers), then:

```bash
git add -A
git rebase --continue     # or: git commit  (if you were merging)
git push
```

When in doubt, ask before force-pushing.

---

## 4. Adding product photos (no code needed)

Drop image files into **`public/images/`** with these exact names, and they
automatically replace the 3D placeholder for that product:

```
boba.jpg   cookies.jpg   icecream.jpg   shake.jpg
donuts.jpg   croissants.jpg   dubai.jpg   storefront.jpg
```

Any of `.jpg / .jpeg / .png / .webp` works. Keep each image under ~1–2 MB
(ideally ~1600px wide) so the site stays fast. If a photo isn't there, that
product keeps its 3D animation.

---

## 5. Golden rules

- ✅ **One repo only** — everyone works from `vvk569/Chillville_website`. No
  separate copies in other repos.
- ✅ **Pull before you start and before you push.**
- ✅ **Small, frequent commits** with clear messages beat one giant commit.
- ❌ **Never commit secrets** — API keys, `.env` files, passwords. They're
  visible to everyone with repo access. (Add them to `.gitignore`.)
- ❌ **Don't commit `node_modules/`, `.next/`** — already ignored, just don't
  force them in.

---

## 6. Where things live (quick map)

```
app/            Next.js pages, layout, global styles
sections/       One file per page section (Hero, SignatureBoba, DubaiStory, …)
components/
  three/        3D scenes, product "assembly" recipes, the Dubai sequence
  ui/           Reusable UI (buttons, headings, Photo)
lib/            data.ts (all text/menu content), images.ts (photo slots), theme
public/images/  Your product photos
```

- **Menu text, prices, hours, socials** → edit `lib/data.ts`
- **Which products use real photos** → `lib/images.ts` (or just drop files in)
- **3D product shapes / animation timing** → `components/three/recipes.ts` and
  the scene files

---

## 7. Deploying

The site auto-deploys via **Vercel** whenever `main` is updated. So once a PR is
merged into `main`, the live site rebuilds in ~1–2 minutes. Don't deploy broken
code to `main` — that's what branches + PRs are for.

Happy building! ✨
