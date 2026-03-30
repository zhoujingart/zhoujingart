# Zhou Jing Art Website V2

This is the second version of the personal artist website for Zhou Jing, featuring a modern, minimalist design with enhanced interactivity and bilingual support.

## Features

- **Bilingual Support**: Seamless switching between English and Chinese (stored in LocalStorage).
- **Responsive Design**: Fully responsive layout optimized for desktop, tablet, and mobile devices.
- **Dark/Light Theme**: Automatic theme detection with a manual toggle switch.
- **Dynamic Content**: Content is rendered dynamically from data files, making updates easier.
- **Interactive Elements**:
  - Custom cursor with hover effects.
  - Parallax scrolling effects.
  - Image lightboxes and gallery grids.
  - Smooth page transitions.

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
    ├── main.js             # Global scripts (cursor, menu, theme)
    ├── language.js         # Translation logic and dictionary
    ├── render-*.js         # Rendering logic for specific pages
    └── ...
```

## Data Management

The website content is separated from the HTML structure. To update the content, edit the following data files in the root `js/` directory:

- **Exhibitions**: `../js/exhibitions.js`
  - Add new exhibitions, artworks, and press coverage here.
- **Press**: `../js/press.js`
  - Update interviews and articles.
- **Gallery**: `../js/gallery.js`
  - Manage artwork images and details.

## Development

This is a static site built with HTML5, CSS3, and Vanilla JavaScript. No build process is required.

1. **Run Locally**: You can use any static file server.
   - VS Code: Use "Live Server" extension.
   - Python: `python3 -m http.server`
   - Node: `npx serve`

2. **Deployment**: Simply upload the entire project folder to any static hosting service (GitHub Pages, Vercel, Netlify, etc.).

## Browser Support

Compatible with all modern browsers (Chrome, Firefox, Safari, Edge).

## License

&copy; 2025 Zhou Jing. All Rights Reserved.
