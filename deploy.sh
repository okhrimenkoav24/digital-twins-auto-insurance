#!/usr/bin/env bash
# Deploy the redesigned microsite to GitHub Pages.
# Usage: bash deploy.sh   (from inside the Deliverable_05_Microsite folder)

set -euo pipefail

cd "$(dirname "$0")"

echo "▸ git status"
git status --short

echo ""
echo "▸ staging all changes"
git add -A

# Skip commit if nothing is staged
if git diff --cached --quiet; then
  echo "▸ nothing to commit — working tree clean"
else
  echo "▸ committing"
  git commit -m "redesign: light editorial v3 + scroll animations + new illustrations

- Revert to light/editorial palette (white bg, orange #E97137 accent)
- Keep Inter + JetBrains Mono typography from v2
- Add IntersectionObserver-based scroll-reveal on 248 elements
- Add new SVG illustrations: data-flow + decorative wave divider
- Embed live D1 dashboard (jade-salamander-5559d4.netlify.app) on research.html
- Embed live D2 zine (digitaltwinszeen.netlify.app) on zine.html
- Update D1+D2 card status to live with pulsing badge
- Update footer across all 10 pages with new Netlify URLs
- Remove dark-theme remnants (status-strip, terminal/CLI aesthetic)
- Preserve all SEO meta, JSON-LD, GA4, cookie consent, a11y attributes
"
fi

echo ""
echo "▸ pushing to origin/main"
git push origin main

echo ""
echo "✓ deployed. GitHub Pages will rebuild in ~30–60 seconds."
echo "   Live URL: https://okhrimenkoav24.github.io/digital-twins-auto-insurance/"
