# Agent Notes

This is a static artist portfolio site. There is no build step or package manager requirement for normal edits; pages can be served directly from the repository root.

## Project Shape

- Top-level HTML files are the live pages.
- Shared CSS is loaded through `css/base.css`, with page-specific files in `css/pages/`.
- Dynamic content is plain browser JavaScript in `js/`. V1 and V2 must share content through `js/site-content.js`; do not add another copy of artwork, exhibition, or press records.
- Artwork, exhibition, studio, and press images live under `images/`.
- `v2/` is the future-facing artist-styled version. Keep it light, gallery-like, and memory-conscious; do not bring back dark full-screen effects unless explicitly requested. V1 remains a separate presentation layer, not a separate data flow.

## Shared Content Contract

- Author content in `js/gallery.js`, `js/exhibitions.js`, and `js/press.js`. These are the current canonical records and are validated by `npm run check`.
- New or migrated renderers must use `window.siteContent` rather than direct `artworksData`, `exhibitionsData`, or `pressData` globals.
- Use `window.siteI18n.text(value, language)` for bilingual content fields and `window.siteI18n.formatDate(value, language)` for dates. Keep theme-specific interface dictionaries in the theme only.
- Use `window.siteMedia.getOptimizedPath(source, profile, prefix)` and `window.siteMedia.setImageSource(...)` for display images. V2 passes `../` as its prefix; original images remain the fallback.
- Put cross-theme queries (find by ID, latest records, merged press) in `js/site-content.js`. Put DOM and visual decisions in the V1 or V2 renderer.

## Performance Rules

- Do not point list/card/thumbnail UI at original large images when an optimized copy exists.
- Use `window.getOptimizedImagePath(src, profile)` from `js/image-optimization.js`. The `hero` and `preview` profiles intentionally reuse the `card` image set to keep repository size reasonable.
- In `v2/`, `window.getV2ImagePath(src, profile)` delegates to the shared media API; keep original files only as fallbacks.
- Keep original image files as the source of truth and as fallbacks.
- Treat memory use as a first-class compatibility concern. Older Chrome versions and older computers can crash when a page decodes many high-resolution paintings, exhibition photos, or very tall press screenshots at once.
- Avoid always-running animation loops, scroll handlers that do layout reads on every event, custom cursor effects, large fixed GPU layers, and unnecessary `will-change`. Use passive listeners, bounded `requestAnimationFrame`, and stop work when nothing is changing.
- For V2 specifically, avoid custom cursors, theme-switching scripts, forced horizontal wheel scrolling, long blocking loaders, and dark overlay treatments that create extra layers without adding necessary content.
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
- After a shared-content change, run `npm run check`, `npm run smoke`, and `npm run test:browser`. The browser suite must cover the equivalent V1 and V2 content path being changed.
