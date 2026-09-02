# CSS Framework Showdown — Tailwind vs Bootstrap vs Vanilla CSS

A drop-in demo folder for a repo. It builds the same "Pricing plan" card three
times — once with Tailwind CSS, once with Bootstrap, once with hand-written
CSS — and lays out the trade-offs side by side.

```
css-showdown/
├── index.html              the showcase page (open this)
├── styles.css              hand-written styles for the showcase shell
├── previews/
│   ├── tailwind-card.html  same card, Tailwind CDN
│   ├── bootstrap-card.html same card, Bootstrap CDN
│   └── vanilla-card.html   same card, plain CSS
├── .vscode/
│   └── extensions.json     recommended VS Code extensions for this folder
├── package.json            live-server dev dependency + npm scripts
└── .gitignore
```

Each preview file is a **complete, standalone HTML page** — no build step, no
shared CSS. `index.html` just loads each one in an `<iframe>` so you can see
them rendered together, with the real markup underneath.

## Run it locally

You need Node.js installed. Then, from inside this folder:

```bash
npm install
npm start
```

That installs [`live-server`](https://www.npmjs.com/package/live-server) as a
local dev dependency and opens `index.html` at `http://localhost:5500` with
auto-reload on save.

### Alternative: VS Code's Live Server extension

If you'd rather not touch the terminal:

1. Install the **Live Server** extension (see below — VS Code will prompt you
   to install it automatically, since it's listed in `.vscode/extensions.json`).
2. Open this folder in VS Code.
3. Right-click `index.html` → **Open with Live Server**.

Either method works — `npm start` and the VS Code extension both wrap the
same idea (a tiny local server with auto-reload); use whichever fits your
workflow.

## Recommended VS Code extensions

These are pre-configured in `.vscode/extensions.json` — VS Code will show a
prompt to install them the first time you open the folder. You can also open
the Extensions panel and install manually:

| Extension | Why |
|---|---|
| **Live Server** (`ritwickdey.liveserver`) | Serves this folder locally with auto-reload — the point of this repo. |
| **Tailwind CSS IntelliSense** (`bradlc.vscode-tailwindcss`) | Autocomplete, linting, and hover previews for Tailwind's utility classes. |
| **Prettier** (`esbenp.prettier-vscode`) | Consistent formatting across the HTML/CSS/JS files. |
| **EditorConfig for VS Code** (`editorconfig.editorconfig`) | Keeps indentation/line-endings consistent if you add an `.editorconfig`. |
| **CSS Peek** (`pranaygp.vscode-css-peek`) | Jump from a class in HTML straight to its definition in `styles.css`. |
| **Auto Rename Tag** (`formulahendry.auto-rename-tag`) | Renames the matching closing tag automatically when you edit markup. |
| **Color Highlight** (`naumovs.color-highlight`) | Shows a color swatch next to hex values in the stylesheet. |

## The comparison, in short

**Tailwind CSS** — utility classes written directly on the element. Fast once
you know the vocabulary, keeps you in one file, scales well with
component-based frameworks (React, Vue, Svelte). Markup gets verbose, and
there's a learning curve before the class names feel natural.

**Bootstrap** — finished components (`.card`, `.btn`, `.navbar`...) plus a
grid system, shipped as CSS and optional JS. Fastest way to a conventional,
consistent UI. Trade-off: sites can look "Bootstrap-y" unless you theme it,
and you'll fight specificity to override its defaults.

**Vanilla CSS** — no framework at all. Full control, zero dependencies,
smallest possible payload — but every reset, naming convention, and design
scale is on you to build and maintain.

See `index.html` for the full breakdown: live cards, a pros/cons list per
approach, a side-by-side comparison table, and the verdict.

> Recreated from a short "Tailwind CSS" lightning-talk deck (pricing-card demo,
> pros/cons, and the closing line: *"Bootstrap gives you components. Tailwind
> gives you building blocks."*).
