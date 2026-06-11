# Agent Notes

This is a static artist portfolio site. There is no build step or package manager requirement for normal edits; pages can be served directly from the repository root.

## Project Shape

- Top-level HTML files are the live pages.
- Shared CSS is loaded through `css/base.css`, with page-specific files in `css/pages/`.
- Dynamic content is plain browser JavaScript in `js/`.
- Artwork, exhibition, studio, and press images live under `images/`.

## Performance Rules

- Do not point list/card/thumbnail UI at original large images when an optimized copy exists.
- Use `window.getOptimizedImagePath(src, profile)` from `js/image-optimization.js`. The `hero` and `preview` profiles intentionally reuse the `card` image set to keep repository size reasonable.
- Keep original image files as the source of truth and as fallbacks.
- Treat memory use as a first-class compatibility concern. Older Chrome versions and older computers can crash when a page decodes many high-resolution paintings, exhibition photos, or very tall press screenshots at once.
- Avoid always-running animation loops, scroll handlers that do layout reads on every event, custom cursor effects, large fixed GPU layers, and unnecessary `will-change`. Use passive listeners, bounded `requestAnimationFrame`, and stop work when nothing is changing.
- Use lightweight thumbnails for lists and grids, and only load larger preview images after an explicit user action such as opening a modal. Press screenshots must use cropped thumbnails in lists and downscaled previews in viewers.
- Prefer CSS/JS changes that reduce decoded pixel count, layer count, and idle CPU usage over visual effects. A page should remain stable on older browsers even if that means skipping nonessential motion.
- After adding or replacing images, run:

```bash
/Users/michael/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3 tools/generate-optimized-images.py
```

## Visual Change Policy

- Preserve the existing visual style and interactions unless explicitly asked to redesign.
- Prefer performance fixes that reduce image decode size, unnecessary animation work, and idle CPU usage without changing layout or styling.

## Local Verification

- A simple static server is enough:

```bash
python3 -m http.server 8000
```

- Check at least `index.html`, `gallery.html`, `exhibitions.html`, `exhibition-detail.html`, `press.html`, and `studio.html` after performance-sensitive changes.
