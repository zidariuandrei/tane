#!/bin/bash
set -e

echo "🌱 Building Tane..."
bun run build

echo "📖 Preparing GitHub Pages..."
rm -rf docs
mkdir -p docs

# Copy the specific prerendered landing page to index.html
if [ -f .svelte-kit/output/prerendered/pages/landing.html ]; then
    cp .svelte-kit/output/prerendered/pages/landing.html docs/index.html
    echo "✅ Copied landing page to docs/index.html"
else
    echo "❌ Error: Could not find prerendered landing page!"
    exit 1
fi

# Copy all assets (CSS, JS, Fonts, Images)
# Usually in _app or similar within prerendered/dependencies? 
# No, usually .svelte-kit/output/client contains the assets.
# But prerendered folder structure depends on adapter.
# With adapter-auto (and Node/Vercel target), usually we check .svelte-kit/output/client.

# Copy client assets to docs
cp -r .svelte-kit/output/client/* docs/

# Remove the HTML files from client export that we don't need (like index.html if it exists, or error pages)
# Actually, client export might contain the SPA entry point. We want to ensure our prerendered HTML takes precedence.
# But docs/index.html is already our landing page.

# IMPORTANT: GitHub Pages ignores folders starting with _ by default.
touch docs/.nojekyll

echo "✅ Docs folder ready for deployment."
echo "👉 Commit and push the 'docs' folder to GitHub to publish."
