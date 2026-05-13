# Workflow — running this site from chat

You manage the site in plain English, in our chat. I make the edits, you run
two terminal commands. That's the whole loop.

---

## The loop (every time)

1. You: tell me what to change in chat. Examples below.
2. Me: edit the files in `Deliverable_05_Microsite/`.
3. You: in Terminal, from the site folder:

   ```bash
   git add . && git commit -m "Your one-line message" && git push
   ```

4. GitHub Pages rebuilds. Live in ~30–60 seconds.

That's it.

---

## What you can ask in chat

### Content edits
- *"Change the hero copy to: …"*
- *"Replace 'three minutes' with 'two minutes' on the simulator page."*
- *"In `cases.html`, add a paragraph at the end of the Tesla card about Cybertruck."*
- *"Update the survey numbers on the home page — Q4 is now 77%, not 73%."*
- *"Re-write the About bio in the first person, tighter, ~150 words."*

### New pages / sections
- *"Add a `/research-data` page with a downloadable CSV section."*
- *"On the home page, add a new section after artifacts called 'Press &
  citations' with three blank slots for future links."*
- *"Add a 'Newsletter' card to the explore block."*

### Design
- *"Change the brand orange from `#E97137` to `#D85C2B`."*
- *"Make the hero illustration smaller on desktop, bigger on mobile."*
- *"Add an image to the top of the `cases.html` page."*
- *"On `methodology.html`, give each success-criteria block a different
  background tint."*
- *"Tighten the spacing between sections on the home page by ~25%."*

### SEO
- *"Set GA4 ID to `G-ABC123XYZ`."*
- *"Replace canonical host with `digitaltwins.com`."*
- *"Update `sitemap.xml` lastmod to today."*
- *"Add `keywords` meta tags to each page."*
- *"Add a FAQ schema block to the home page with five questions."*
- *"Update the OG image to use a different car illustration."*

### Deploy / DNS
- *"Add my CNAME for `digitaltwins.example.com`."*
- *"Update the GitHub link in the footer and About page to point to the actual repo."*
- *"Walk me through pointing my Namecheap domain at GitHub Pages."*

---

## What I'll always do

- Quote back what I'm about to change before doing it on anything non-trivial.
- After an edit pass, list the files I touched.
- Validate HTML structure and check that no links break.
- Keep the design system consistent — colors only via CSS variables in
  `assets/css/styles.css`, no hard-coded hex elsewhere.

## What I'll never do without asking

- Add third-party scripts beyond GA4 (no chat widgets, no tracking pixels).
- Change the LinkedIn-page brand identity (logo, palette) — that is locked.
- Touch the actual `Deliverable_01_Survey_Visualization/landing.html` dashboard
  without an explicit ask — it is its own deliverable.

---

## When the site is offline / something looks wrong

If a deploy doesn't show your latest change:
1. **Hard refresh** in browser: ⌘+Shift+R (Mac) or Ctrl+Shift+F5 (Win).
2. Check the **Actions tab** on the GitHub repo — Pages deploys appear there.
   A red ✗ means the build failed; click for the log.
3. If something HTML-y is broken, in chat say *"run the validator on all pages"*
   and I'll re-run the structure check.

---

## Backup / rollback

Every deploy is just a git commit. To revert the last change:

```bash
git revert HEAD
git push
```

To go back N commits:

```bash
git log --oneline    # find the commit hash you want to return to
git reset --hard <hash>
git push --force-with-lease
```

(Be careful with `--force` — it rewrites history.)

---

## Useful one-liners

```bash
# preview locally
python3 -m http.server 8000

# list everything ever changed in the site
git log --oneline

# see what's about to be committed
git status
git diff
```
