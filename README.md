# Digital Twins in Auto Insurance — Research Hub (D5)

Capstone Deliverable 5 — DMGC-699 Spring 2026, University of Niagara Falls Canada.
Static, multi-page research hub integrating the six artifacts of the project.
Plain HTML/CSS/JS, no build step, deployed to GitHub Pages.

**Live site:** _add URL after first deploy_

---

## Structure

```
.
├── index.html              hub landing
├── research.html           D1 — survey + dashboard
├── zine.html               D2 — digital zine
├── simulator.html          D3 — Unity WebGL simulator
├── podcast.html            D4 — podcast episode
├── cases.html              real-world cases (telematics + adjacent-industry DT)
├── resources.html          21 annotated sources
├── methodology.html        full transparency + per-artifact success criteria
├── about.html              researcher bio + contact
├── 404.html                custom not-found page
│
├── robots.txt              tells crawlers what to index
├── sitemap.xml             machine-readable site map for SEO
├── manifest.json           PWA-light: theme color, icons, name
│
├── assets/
│   ├── css/styles.css      design system stylesheet (CSS variables, no preprocessor)
│   ├── js/main.js          minimal client JS (nav highlight, dropdown, timestamps)
│   └── img/
│       ├── hero.svg        brand illustration on home hero
│       ├── og-image.png    1200×630 social-preview image
│       ├── logo.svg        site logo (two overlapping circles)
│       └── logo_400.png    PNG variant (favicon, manifest)
│
├── .nojekyll               tells GitHub Pages: do not run Jekyll
├── .gitignore              macOS, editors, Python cache
├── CNAME.template          rename to CNAME and edit for custom domain
├── WORKFLOW.md             how to manage this site from chat (read this)
└── README.md               this file
```

---

## Local preview

```bash
cd "Deliverable_05_Microsite"
python3 -m http.server 8000
# open http://localhost:8000
```

---

## First-time deploy (GitHub Pages)

A `.git` folder is already initialized with one initial commit. To publish:

```bash
cd "Deliverable_05_Microsite"
git remote add origin https://github.com/<your-username>/digital-twins-auto-insurance.git
git branch -M main
git push -u origin main
```

Then on GitHub:
1. **Settings → Pages → Source: Deploy from a branch → Branch: `main` / `(root)` → Save.**
2. Wait ~60 seconds. The site is live at
   `https://<your-username>.github.io/digital-twins-auto-insurance/`.
3. Once you know your final URL, **swap the placeholder in `robots.txt`,
   `sitemap.xml`, and every `<meta property="og:url">` / `link rel="canonical"`
   tag.** The current placeholder is `alexokhr74.github.io/digital-twins-auto-insurance` —
   tell Claude in chat: *"replace canonical host with X"* and it will do
   the find-replace in one pass.

### Custom domain (later)

1. Rename `CNAME.template` → `CNAME`. Put your domain on a single line:
   `digitaltwins.example.com` (no protocol, no slash).
2. Commit and push.
3. **Settings → Pages → Custom domain → enter your domain → Save.**
4. At your DNS provider, point a CNAME record to `<your-username>.github.io`
   (subdomain) or four A records to GitHub's apex IPs (185.199.108.153,
   185.199.109.153, 185.199.110.153, 185.199.111.153) for an apex domain.
5. Tick **Enforce HTTPS** once the certificate provisions (~10 min).

---

## Updating content

For one-line edits, push directly. For larger changes, just describe what
you want in chat — see `WORKFLOW.md`.

```bash
git add .
git commit -m "Update <something>"
git push
```

Pages rebuilds in ~30–60 seconds.

---

## SEO and analytics

- **Structured data:** every page has JSON-LD `<script>` blocks (Organization +
  WebSite on home, Article / CollectionPage / AboutPage on the rest). Verify
  via Google's [Rich Results Test](https://search.google.com/test/rich-results).
- **Sitemap:** `sitemap.xml` lists nine content pages with `priority` and
  `lastmod`. After first deploy, submit to Google Search Console.
- **Open Graph + Twitter card:** `og:url`, `og:image`, and `twitter:card` are
  set on every page. Preview via [opengraph.dev](https://www.opengraph.dev/).
- **Google Analytics 4:** wired in but gated by cookie consent. The
  measurement ID is a placeholder (`G-XXXXXXXXXX`); replace it everywhere with
  one chat instruction: *"set GA4 ID to G-ABC123XYZ"*. Default consent state
  is `denied`; consent is `granted` only after the user clicks Accept in the
  banner.

---

## Accessibility

- Skip-to-content link on every page.
- All images have `alt` text (decorative use `alt=""` + `aria-hidden`).
- WCAG AA contrast: orange-deep `#B85522` for orange-on-white body text.
- Focus styles: 3 px visible outline with offset.
- `prefers-reduced-motion` honored.
- Cookie banner is keyboard-accessible and dismissable.
- Print stylesheet included.

---

## Project metadata

- **Course:** DMGC-699 (Capstone), Spring 2026
- **Institution:** University of Niagara Falls Canada
- **Supervisor:** Dr. Wael Brahim
- **Researcher:** Aleksandr Okhrimenko (`okhrimenkoav25@gmail.com`)
- **LinkedIn page:** [Digital Twins in Auto Insurance](https://www.linkedin.com/company/digital-twins-in-auto-insurance/)

---

## License

© 2026 Aleksandr Okhrimenko. All rights reserved.

The source code and content of this repository are provided for review and
reference only. No license is granted to copy, modify, or redistribute the
materials without written permission. Cite research findings via APA 7 using
the citation block at the bottom of each page.
