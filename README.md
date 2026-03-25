# adamreue-com static site

Lean static portfolio export prepared for GitHub Pages.

## What is here

- `index.html` — homepage
- `assets/css/styles.css` — site styling
- `assets/js/script.js` — client-side behavior
- `assets/img/` — only the images actually referenced by the live pages
- `projects/<slug>/index.html` — static project detail pages for linked passion projects

## Local preview

From this directory, run either of these:

```bash
python3 -m http.server 8080
# then open http://localhost:8080/adamreue-com/static-site/ if serving from parent
# or http://localhost:8080/ if you started the server inside this folder
```

If you want auto-reload or a different static server, any simple file server works.

## GitHub Pages deployment

Repository target:

- `https://github.com/mylegitches/adamreue-com`
- project URL: `https://mylegitches.github.io/adamreue-com/`

Recommended Pages settings:

1. Push this folder as the repository contents.
2. In GitHub, open **Settings → Pages**.
3. Set **Build and deployment** to **Deploy from a branch**.
4. Select the default branch and `/ (root)`.
5. Save and wait for Pages to publish.

This site uses relative links and folder-based project pages, so it is safe for GitHub Pages project hosting.

## Notes about the cleanup

Removed from the deliverable:

- FastAPI / Python backend files
- development and production server launch scripts
- tests, debug scripts, and startup automation
- `.env` files and Windows-specific helpers
- unreferenced images and other design/source artifacts

Adjusted for static hosting:

- converted absolute `/static/...` and `/projects/...` paths to relative links
- replaced the backend contact form with privacy-friendlier static contact calls to action
- preserved only linked project detail pages that actually exist
