# Blog — https://blog.hyoonqt.my.id

Hugo (extended, pinned **0.167.0**) + PaperMod
(pinned `d3768854d00ad003b0a8dbdba254ce9224377a01`).

Repo: `hyoonqtt/blog` (public, project site). No analytics, no extra dependencies.

## Local preview

One documented command (run from this folder):

```sh
hugo server
```

Then open http://localhost:1313/.

Requires Hugo **extended 0.167.0**. Check with `hugo version`.
After cloning, fetch the theme submodule first:

```sh
git submodule update --init --recursive
```

## Build

```sh
hugo --minify
```

## Files / layout

- `hugo.toml` — all site-wide values (baseURL, title, menus, search output, social URLs). Do not hardcode these in templates.
- `content/posts/` — posts; use page bundles (`content/posts/<slug>/index.md` + images) for posts with images.
- `content/about.md` — about page (TODO text).
- `content/search.md` — PaperMod search page (needs the `JSON` home output in `hugo.toml`).
- `static/CNAME` — `blog.hyoonqt.my.id` (keeps the custom domain across deploys).
- `static/sw.js` — kill-switch worker (self-unregisters + clears caches; removes stale workers for returning visitors). No page registers a worker; `layouts/partials/extend_head.html` also unregisters stale workers on load. Keep until old clients age out.
- `layouts/` — template overrides only. Do not edit `themes/PaperMod`.
- `assets/css/extended/dark-navy.css` — navy/yellow scheme override (bundled after theme CSS; no theme edits).
- `.github/workflows/deploy.yml` — Pages deploy with pinned Hugo.

## Deploy (GitHub Pages, Actions source)

1. Push this folder as repo `hyoonqtt/blog` on branch `main` (with `.gitmodules` so the theme builds).
2. Repo Settings → Pages → Source: **GitHub Actions**.
3. Custom domain: `blog.hyoonqt.my.id`. Turn on **Enforce HTTPS** once issued.
4. DNS: `blog` CNAME → `hyoonqtt.github.io` (added at the `.my.id` provider).

## TODO

None — title, description, author, socials, about text, and posts are all
ported from `~/personal-blog` (content only: no profileMode, our own menu).
Post filenames had their `YYYY-MM-DD-` prefixes stripped (URLs are now
`/posts/<slug>/`; front-matter dates kept for display and ordering).
`October-26.md` (draft) was left out. Post images kept under
`static/assets/img/posts/`; design images (profile photo) removed.
