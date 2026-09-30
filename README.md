# Vincive Media — Website

A dark, bold, premium one-creative-director website: full-bleed autoplay video hero, services, process, work/portfolio page, and a contact page. Pure HTML/CSS/JS — no build step, no backend — ready to host on **GitHub Pages**.

## Structure

```
index.html          Home — video hero, intro, services, process, featured work, CTA
projects.html        Work — filterable project grid (placeholder cases)
contact.html          Contact — form + direct details
style.css              All styling (single stylesheet)
main.js                  Nav, scroll-reveal, filters, video autoplay handling
i18n.js                    EN/NL dictionary + language switch logic
hero-loop.mp4                Placeholder hero background loop (generated abstract motion)
poster.jpg                     Poster frame shown before the video loads
README.md
```

Everything sits flat at the root on purpose — GitHub's drag-and-drop uploader doesn't always preserve subfolders reliably, so this structure is built to survive a plain "select all files → upload" every time.

## 1. Replace the placeholder hero video

`hero-loop.mp4` is a generated placeholder (a slow, moody lime-on-black gradient loop) so the site works out of the box. Swap it for your own footage:

1. Export your video as **muted MP4 (H.264)**, ideally under ~15MB and 15–20 seconds, looping cleanly.
2. Replace `hero-loop.mp4` with your file (keep the same filename, or update the `<source>` path in `index.html`).
3. Generate a poster frame (first frame as a still image) and replace `poster.jpg` — this is what shows while the video loads, and on very low-power mobile connections.

The video is already wired up as `autoplay muted loop playsinline`, which is required for it to autoplay in all browsers, including mobile Safari.

## 2. Add your real projects

Open `projects.html`. Each project is a `<a class="work-card" data-category="...">` block. For every placeholder card:

- Update the `<h3>` title, `<span class="tag">` category label, and `<p>` description.
- Update `data-category` — used by the filter buttons (`branding`, `campaign`, `content`, `concept`, `strategy` — you can mix, e.g. `data-category="campaign content"`).
- Either keep the generated gradient backdrop (edit the `--card-a / --card-b / --card-c` CSS variables in the inline `style=""` for a quick colour change) or replace `<div class="backdrop"></div>` with a real image, e.g.:
  ```html
  <div class="backdrop"><img src="project-01.jpg" alt="Project name" style="width:100%;height:100%;object-fit:cover;"></div>
  ```
- The same 3-card preview exists on `index.html` under "Selected work" — update those to match your best projects.
- Once you have real projects, delete the `.note-banner` block near the bottom of `projects.html`.

## 3. Wire up the contact form

GitHub Pages is static — it can't process form submissions by itself. The form in `contact.html` is pre-wired for **[Formspree](https://formspree.io)** (free tier available):

1. Create a free Formspree account and a new form.
2. Copy your form endpoint (looks like `https://formspree.io/f/xxxxxxx`).
3. In `contact.html`, replace `YOUR_FORM_ID` in the `<form action="...">` attribute.

Alternatively, swap the form action for any other static-friendly backend (Basin, GetForm, Netlify Forms if you host there instead, etc.).

Also update, throughout the site (`contact.html`, `index.html`, `projects.html` footers):
- `hello@vincivemedia.com` → your real email
- `+32 000 00 00 00` → your real phone number
- The `#` placeholders for Instagram / LinkedIn / Behance → your real profile links

## 4. Language toggle (EN / NL)

The site ships bilingual with an **EN / NL** switch in the top nav (works on every page, desktop and mobile). How it works:

- All translatable text carries a `data-i18n="key"` attribute (or `data-i18n-placeholder="key"` for form placeholders).
- `i18n.js` holds one dictionary — `VINCIVE_I18N` — mapping each key to `{ en: "...", nl: "..." }`. On click, the matching language's text is swapped in via `innerHTML`, so tags like `<br>` or `<em>` inside a translation still work.
- The visitor's choice is remembered (via `localStorage`) so it persists across pages and future visits. The `<html lang="">` attribute updates too, for accessibility/SEO.

To edit copy in either language, or add a new text block:

1. Find or add a key in `VINCIVE_I18N` inside `i18n.js`, with both an `en` and `nl` value.
2. Add `data-i18n="that-key"` to the HTML element (keep real English text inside the tag as a fallback for when JS is off).
3. If you add content to only one page, reuse this same dictionary — keys are shared across all three HTML files.

To add a third language, add another value per key (e.g. `fr: "..."`) and duplicate the `.lang-btn` markup/CSS in the nav for the extra option.

## 5. Publish on GitHub Pages

1. Create a new GitHub repository and push this folder's contents to the root of the `main` branch.
2. In the repo, go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to `Deploy from a branch`, branch `main`, folder `/ (root)`.
4. Save — GitHub will publish the site at `https://<your-username>.github.io/<repo-name>/`.
5. For a custom domain (e.g. `vincivemedia.com`), add it under **Settings → Pages → Custom domain**, and point your domain's DNS to GitHub Pages per [GitHub's instructions](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site).

No build tools, no `npm install` — the site runs directly as static files.

## 6. Quick local preview

Any local static server works, for example:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

## Design notes

- **Typography:** Space Grotesk (display) + Inter (body), loaded from Google Fonts.
- **Colour system:** near-black base (`#0a0a0b`) with a single acid-lime accent (`#c6f135`) — defined as CSS custom properties at the top of `style.css`, so the whole palette can be changed in one place.
- **Motion:** scroll-reveal on most sections via `[data-reveal]` + `IntersectionObserver`, a looping logo/services marquee, and hover-driven micro-interactions on cards, buttons and nav links.
- Fully responsive down to mobile, with a full-screen mobile nav.
