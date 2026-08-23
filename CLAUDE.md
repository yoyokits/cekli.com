# CLAUDE.md — cekli.com

Project instructions for the static marketing site behind **www.cekli.com**.

---

## 1. What this repo is

A hand-written static site served by **GitHub Pages from the `docs/` folder** of
this repository, on the custom domain in `docs/CNAME`.

**This changed on 2026-08-24.** Pages used to publish from the repo root — every
top-level file was live, including this one (`https://cekli.com/CLAUDE.md`
returned 200 and served the raw file). The site was moved into `docs/` and the
Pages source setting switched specifically to stop that: anything left at the
root is no longer served at all, regardless of what it contains.

Verified facts — do not re-derive them:

- The actual site content (`index.html`, `404.html`, `robots.txt`, `sitemap.xml`,
  `.nojekyll`, `CNAME`, `assets/`, `memocam/`, `memoshare/`, `doc/`) was moved with
  `git mv` from the root into `docs/`, preserving git history and file content
  byte-for-byte. No file content changed — see §5 for why the move alone was
  sufficient.
- GitHub Pages only offers `/` (root) or `/docs` as a source — there is no `/doc`
  option. The pre-existing `doc/` folder (singular) living at the *repo* root
  once caused real confusion about which of these two the live source was; it no
  longer matters, since `doc/` is now itself a subfolder of `docs/`
  (`docs/doc/…`) rather than a sibling of it.
- **`CNAME` must live inside whatever folder Pages actually publishes.** It moved
  to `docs/CNAME` along with everything else — a root-level `CNAME` would be
  ignored once the source is `/docs`, breaking the custom domain.
- `.htaccess` is a leftover of the old WordPress export, left at the root. Apache
  directives do nothing on GitHub Pages, and now it isn't even served. Ignore it.
- `docs/.nojekyll` is present so Pages serves files as-is.

There is no build step, no framework, no package manager. Plain HTML, CSS and a
small amount of vanilla JS.

**Preview by double-clicking any `.html` file inside `docs/`.** All internal links
and assets use **relative** paths (`assets/…` from `docs/index.html`,
`../assets/…` from a product folder) precisely so `file://` works with no local
server — and so the entire site could move from the repo root into `docs/` with
`git mv` alone, no path edits. Root-absolute paths like `/assets/…` would break
`file://` preview — under `file://` the leading `/` resolves to the drive root.
Keep paths relative when adding pages.

Two deliberate exceptions, both correct as-is:
- **`docs/404.html` uses absolute paths** (`/`, `/memocam/`, …). GitHub Pages
  serves it at arbitrary URL depths, so relative paths would resolve differently
  each time. It is only ever seen on the live site, never via `file://`.
- **`<link rel="canonical">`, Open Graph and JSON-LD URLs are absolute.** They must
  be, since crawlers and social scrapers resolve them off-site.

## 2. Do not touch

**`docs/doc/`** — holds the two **live** privacy policies:

| File | Live URL |
|---|---|
| `docs/doc/privacy-policy-memocam.html` | `https://cekli.com/doc/privacy-policy-memocam.html` |
| `docs/doc/privacy-policy-memoshare.html` | `https://cekli.com/doc/privacy-policy-memoshare.html` |

These URLs are almost certainly the ones registered in the **Google Play Console**.
Google requires a working privacy policy link per app, so moving, renaming, restyling
or deleting them risks the store listings. The folder is named `doc/` (singular)
specifically so the URL path (`/doc/…`) stayed byte-identical when the site moved
under `docs/` in 2026-08 — do not rename it to `privacy/` or fold it into some
other structure, and never rename `docs/` itself. Link to the two files; never
recreate them. `docs/doc/index.htm` / `index.mhtml` are an unrelated saved Canva
page that happened to live in the same folder — harmless, leave alone.

**The legacy WordPress export, still at the repo root** — `wp-admin/`,
`wp-content/`, `wp-includes/`, `wp-json/`, `category/`, `comments/`, `feed/`,
`2024/`, `sample-page/`. Dead weight from a 2024 static export. It was
deliberately **not** moved into `docs/` during the 2026-08-24 restructure, so it
is no longer publicly served at all (Pages only serves `docs/` now) — but it is
still tracked in git history and still contains the owner's real name in several
files (e.g. `2024/02/18/about/index.html`). Deleting it outright is a separate,
deliberate task — ask first. `test/` and the five `testsimply-static-1-*/`
folders that also sit at the root are **not tracked in git at all** (confirmed
via `git ls-tree`) — near-duplicate local re-exports of the same old WordPress
site, never live, safe to delete any time with zero effect on the published
site; `robots.txt`'s `Disallow` entries for `/test/` etc. are consequently
no-ops today, harmless but worth knowing.

**`CLAUDE.md` itself, and `README.md`/`.htaccess`, stay at the repo root, outside
`docs/`, on purpose.** This file used to be published live at
`cekli.com/CLAUDE.md` when Pages served the root. Keeping it outside `docs/` is
what stops that — do not move it into `docs/` "for consistency," that undoes the
fix. If a future reorganization changes the Pages source again, re-check whether
anything at the root would newly become public.

**Always `git pull` before editing.** The local checkout has been behind origin
before (the privacy policies were live but missing locally). If git reports
`detected dubious ownership`, run:

```
git config --global --add safe.directory E:/Projects/GitHub/cekli.com
```

## 3. The company

**Cekli** is a small independent software studio building medium-sized software,
mostly mobile apps. Current focus: the **Memo** apps for Android.

Contact: `cekliapps@gmail.com` (used in the privacy policies and the site footer).

### Rule: no personal name on this site

The public identity is the **Cekli brand only**. The owner's real name must not
appear in page copy, bylines, footers, `<meta name="author">`, JSON-LD
`author`/`founder`, or image alt text. Write "Cekli" or "we".

Two places still expose it and were deliberately left alone: the legacy WordPress
page `/2024/02/18/about/`, and some docs inside the MemoCam repo. Removing the
WordPress one means touching the legacy export — ask before doing it.

## 4. The products

Two free Android apps, marketed as one product in two parts. Shared brand accent
orange `#FF6B2C`. Both built with .NET MAUI, Android 10 (API 29) and newer.

### MemoCam — `com.cekli.memocam`
<https://play.google.com/store/apps/details?id=com.cekli.memocam>

Tagline: **"Simple camera. Smart memory."**
A camera that behaves like any other, but stamps every photo and video with the
place, weather, time and direction — visible on the image *and* written into the
file's EXIF. Dark theme, because it is used in the viewfinder.

Shipped features: live overlay (city, country, temperature, altitude, GPS,
compass, speed, date/time — all individually toggled, reorderable, resizable,
dockable, with colour/opacity); distance from home; dual clock (local + home,
offline via a bundled IANA timezone database); trip/H-day counter; on-device
voice tag for the event name; speedometer (numeric or gauge; km/h, mph, m/s,
knots); photos and HD video with sound; five zoom levels 0.6× / 1× / 2× / 3× / 10×;
grid lines; token-based file naming; full EXIF write. UI languages: English,
Indonesian, Spanish, German.

Audience: travellers, hikers and climbers, field and site workers, real estate
agents, content creators, road trips.

### MemoShare — `com.cekli.memoshare`
<https://play.google.com/store/apps/details?id=com.cekli.memoshare>

Tagline: **"Stamp many photos. Share offline."**
The post-capture half: batch-stamp up to 50 photos with the same overlay, edit
them, and share whole albums over local Wi-Fi. Light theme, because it is used
for browsing and editing.

Shipped features: batch stamping with four item styles (Pill, Light, Outline,
Badge); large readable photo list grouped by date with filters; Trip view (route
drawn on a world map with total distance, shareable as one image); crop, filters,
adjust, beautify (originals never modified); **ShareZone** — the phone runs a small
local web server, a QR code plus a one-time PIN lets people in the same room open
a gallery in their browser and download single photos or hundreds at once as a
streamed ZIP, with no app, account, or internet involved; ZIP/single/system export.

### The pairing

"Dark for taking photos, light for sharing them." MemoCam stays fast and
capture-only; MemoShare handles everything after. Both listings cross-promote, and
photos taken in MemoCam are badged with an **M** inside MemoShare. Always present
them as a pair.

### Honesty constraints

- **MemoCloud** and **MemoTeam** are concepts only — never present them as available.
- **iOS is not shipped.** Android only.
- Do not invent team size, company history, install counts, ratings, or awards.
- Claim only what is visible in a current screenshot or confirmed in the MemoCam
  repo's shipped-feature docs. The repo also contains roadmap items (map overlay,
  cloud backup, template community, AR compass) that are **not** built.

## 5. Site structure

Everything Pages actually publishes lives under `docs/` — that folder **is** the
site root as far as the browser and GitHub Pages are concerned.

```
CLAUDE.md                 This file — deliberately OUTSIDE docs/, see §2 and §1
README.md  .htaccess       Also outside docs/, trivial/inert either way
2024/  category/  comments/  feed/  sample-page/
wp-admin/  wp-content/  wp-includes/  wp-json/
                           Legacy WordPress export — outside docs/ on purpose, see §2

docs/                      GitHub Pages source — everything below is the live site
  index.html               Landing page                 → cekli.com/
  memocam/index.html       MemoCam product page          → cekli.com/memocam/
  memoshare/index.html     MemoShare product page        → cekli.com/memoshare/
  404.html                 Not-found page
  robots.txt  sitemap.xml  .nojekyll  CNAME
  assets/
    css/site.css           The entire stylesheet — one file, design tokens at the top
    js/site.js             Mobile nav + screenshot lightbox. Progressive enhancement only
    img/memocam/           icon.png, shot-01…shot-10 (shot-04 removed: it was a MemoShare shot)
    img/memoshare/         icon.png, shot-01…shot-09
    img/brand/             favicon.svg, cekli-logo.png, og-memocam.jpg, og-memoshare.jpg
  doc/                     LIVE PRIVACY POLICIES at cekli.com/doc/… — read-only, see §2
```

Product pages use a folder + `index.html` so the URL is `cekli.com/memocam/`.
Keep that pattern for any new product — and add it under `docs/`, never at the
repo root.

Moving the whole tree from the root into `docs/` in 2026-08 required **zero
content edits** to any HTML/CSS/JS file — every internal link was already
relative (see §1), so a `git mv` of each top-level site item was sufficient.
Keep that property: never introduce a root-absolute internal link (`/assets/…`)
outside the two documented exceptions in §1, or a future restructure won't be
this cheap.

## 6. Design system

Mirrors `MemoShareLookAndFeel.md` in the MemoCam repo so the site and the apps
look like one family.

| Token | Light | Dark |
|---|---|---|
| Background | `#FAFAFA` | `#121212` |
| Alt background | `#F5F5F5` | `#1A1A1A` |
| Surface | `#FFFFFF` | `#2C2C2C` |
| Text / secondary | `#1A1A1A` / `#666666` | `#E8E8E8` / `#A0A0A0` |
| Border | `#E0E0E0` | `#333333` |
| Accent / pressed | `#FF6B2C` / `#E55A1B` | same |
| Logo orange | `#FA8954` | same |

### The logo

The Cekli mark is an **outlined house with a filled square inside**, above a
lowercase `cekli` wordmark. The original artwork is kept at
`docs/assets/img/brand/cekli-logo.png` (1142×1142, the vertical lockup).

On the site the mark is redrawn as **inline SVG** in each page's `.brand` link,
with the wordmark as live text beside it. Inline rather than an `<img>` because
it inherits `currentColor`, stays crisp at any size, and costs no request. The
wordmark stays text so it recolours per theme — the artwork's near-black `#202020`
would disappear on the dark header and footer.

**The logo orange (`#FA8954`) is not the app accent (`#FF6B2C`).** The artwork is
softer. They are kept as separate tokens: `--logo` paints the mark, `--accent`
paints buttons and links. Do not collapse them without a deliberate brand
decision — if the accent should shift to match the logo, that is a change across
both apps too, not just this site.

### Two contrast traps in this stylesheet

`.band--dark` paints a dark background on a page whose theme may still be light,
so `--text`, `--text-2`, `--border` and `--surface` keep resolving to their **light**
values inside it. Anything placed in a dark band needs an explicit
`.band--dark ...` override, or it renders dark-on-dark (or light text on its own
white card). Both bugs shipped once and were caught in review:

- `.btn--ghost` — dark text on near-black.
- `.step` — kept its white `--surface` while the heading inherited the band's light text.

`.feature`, `.trust__item`, `.crosspromo`, `.filename`, `.checks` and `.band-head p`
already carry their overrides. Add one for any new component used in a dark band.

- Font: **Inter** from Google Fonts; **JetBrains Mono** for the filename example.
- Radii 8 / 12 / 16 / 24 px and pill; soft shadows; generous whitespace.
- **Page themes deliberately mirror the apps**: the MemoCam page runs dark
  (`<html data-theme="dark">`), the MemoShare page runs light, and the landing page
  is light with dark hero and CTA bands. This is brand storytelling — keep it.
- The design commits to these looks rather than following `prefers-color-scheme`.
- Accent orange is for fills and large text, never thin body copy (contrast).

### Voice — copied from the App Store style guide, follow it

- Audience is global; many readers are not native English speakers.
- Short sentences, one idea each, roughly 8–15 words.
- Common words: "save" not "preserve", "show" not "display", "use" not "leverage".
- No idioms or slang. No "burned into", "killer", "nailed it".
- Core message: *"As simple as a normal camera — with smart helpers built in."*
- Privacy is framed as good news, never as a defensive disclaimer.

## 7. Where the source content lives

`E:\Projects\GitHub\MemoCam\docs\` — a **separate local repo**, not a submodule.
Content was copied across by hand, so it drifts; re-check before making claims.

| File | Use |
|---|---|
| `App Store/MemoCam.md`, `App Store/MemoShare.md` | Approved store copy — the source for page wording |
| `overview.md`, `MemoShare.md` | Shipped feature detail and the two-app rationale |
| `marketing.md` | Positioning, audiences, competitors, ASO keywords |
| `MemoShareLookAndFeel.md` | The design system in section 6 |
| `Screenshots/`, `App Store/*.png` | Fallback screenshots and feature graphics |

### Screenshots

The current screenshots were pulled **fresh from the Google Play listings** (not
from the MemoCam repo) and are served locally rather than hot-linked. To refresh
them: open a listing in a browser, read the hydrated DOM for
`img[alt="Screenshot image"]` — a plain HTTP fetch only exposes three, the rest are
lazy-loaded — strip the `=w…` suffix, then download each at `=w1080` (icons at
`=w512`). Check what each screenshot actually shows before writing its alt text;
the MemoCam listing includes one MemoShare cross-promo image that does not belong
in the MemoCam gallery.

## 8. Working rules

- Every screenshot needs real `alt` text describing what is on screen, plus
  `width`, `height` and `loading="lazy"` (except the hero image).
- Keep every page working with JavaScript disabled. `site.js` only adds the mobile
  menu and the lightbox; it promotes gallery figures to buttons at runtime so they
  are not dead controls when JS is off.
- **Do not edit HTML with PowerShell `Get-Content`/`Set-Content`.** In Windows
  PowerShell 5.1 that round-trip corrupts UTF-8 (`—` becomes `â€"`). Use the Edit
  or Write tools, or stick to HTML entities.

### Seeing the pages (there is no other way to check the design)

The Chrome browser tool cannot reach this machine — it is outside this
environment, so a local server is invisible to it and `file://` is refused.
Render with **headless Edge** instead, which works and needs nothing installed:

```
& "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" `
  --headless=new --disable-gpu --no-first-run --user-data-dir=<tmp> `
  --hide-scrollbars --window-size=1280,4400 --virtual-time-budget=6000 `
  --screenshot=<out.png> "file:///E:/Projects/GitHub/cekli.com/docs/index.html"
```

Then read the PNG. Downscale tall renders with `System.Drawing` before reading.

**Edge clamps its window to a 504 px minimum on Windows.** Asking for
`--window-size=390,…` still lays out at 504 and merely *crops* the screenshot to
390, which looks exactly like a broken responsive layout but is not. 504 px is
the narrowest width that can be tested here; it is below the 760 px breakpoint,
so it does exercise the mobile nav and stacked cards. Verified: no horizontal
overflow, `scrollWidth == innerWidth`.
- Deploying means pushing to `main` on a live public domain. Show the diff and let
  the owner decide when to publish.
