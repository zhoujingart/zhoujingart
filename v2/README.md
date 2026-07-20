# Zhou Jing Art Website V2

This is the future-facing theme for Zhou Jing's bilingual portfolio. It is a modern, light, gallery-like presentation layer over the same canonical content used by the root V1 theme.

## Features

- **Shared bilingual content**: artwork, exhibition and press records come from the root `content/` layer; language preference is stored in LocalStorage.
- **Responsive presentation**: layouts are designed for desktop, tablet and mobile without introducing a separate mobile data path.
- **Lightweight media**: list and grid views use optimized images, while original files remain fallbacks.
- **Focused interaction**: gallery lightboxes, press previews and a keyboard-accessible full-screen menu.
- **Independent theme**: V2 owns its visual styling and interface copy, but not a second copy of editorial content.

## Project Structure

```text
v2/
├── index.html              # Home page
├── gallery.html            # Works/Portfolio page
├── exhibitions.html        # Exhibitions list page
├── exhibition-detail.html  # Dynamic exhibition detail page
├── about.html              # Artist biography and statement
├── press.html              # Press and reviews
├── studio.html             # Studio and process page
├── contact.html            # Contact form and info
├── css/                    # Stylesheets
│   ├── style.css           # Core styles and variables
│   ├── exhibition.css      # Exhibition specific styles
│   ├── press.css           # Press specific styles
│   └── ...
└── js/                     # V2 specific logic
    ├── main.js             # Global menu, preview and lightbox interactions
    ├── language.js         # Translation logic and dictionary
    ├── render-*.js         # Rendering logic for specific pages
    └── ...
```

## Data Management

V2 renders the same content as V1. Do not add records to `v2/` or the legacy root renderers. Update canonical records in the root `content/` directory instead:

- **Artworks**: `../content/artworks.js`
- **Exhibitions**: `../content/exhibitions.js`
- **Press**: `../content/press.js`

V2 renderers must access records through `window.siteContent`; use `window.siteI18n` for bilingual fields and `window.siteMedia` for optimized image paths. See the root [content guide](../content/README.md) and [contribution guide](../CONTRIBUTING.md) before editing records.

## Development and verification

This is a static site built with HTML5, CSS3 and vanilla JavaScript. No production build step is required.

From the repository root:

```bash
npm ci
npm run check
npm run serve
```

Open `http://localhost:8000/v2/`. Before submitting a V2 change, run `npm run test:browser` as well. It verifies V1/V2 shared-content parity and key interactions.

## Maintenance boundaries

- Keep V2 light and gallery-like. Do not reintroduce custom cursors, theme switching, blocking loaders or continuously running visual effects.
- Preserve semantic controls: menu and language controls must remain native buttons, with keyboard support and current ARIA state.
- Keep root content scripts before `../js/site-content.js` in each V2 page. Renderers should never read content-file globals directly.
- Static deployment consists of the whole repository; no V2-only publishing artifact is generated.

## Browser Support

Compatible with current Chrome, Firefox, Safari and Edge. The automated browser suite runs on Chromium.

## License

&copy; 2026 Zhou Jing. All Rights Reserved.
