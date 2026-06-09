# Code Standards & Conventions

## Guiding Principles

- **Static-first:** No build process, no package manager. Everything served as-is from `docs/`.
- **Minified delivery:** All JavaScript and CSS shipped minified to end users.
- **Vendor bundling:** External libraries pre-bundled (libs.js, libs.css).
- **Inline content:** CSS and JS inlined in HTML where practical; reduces HTTP requests.
- **Performance:** WebP images, lazy-loading, deferred asset loading.
- **Mobile-first:** Responsive design targeting ≤576px as baseline.
- **Vietnamese content:** All UI text is in Vietnamese; plan for translation if needed.

## File Naming Conventions

### HTML
- Kebab-case: `index.html`, `wedding-data.js`
- File structure: One HTML entry point (`index.html`); sections denoted by ID attributes, not separate files

### JavaScript
- Kebab-case: `firebase-config.js`, `wedding-data.js`, `calendar.js`
- Modules: Use ES6 module syntax if modern (e.g., `export async function`)
- Minified output: All .js files are minified
- Vendored libraries: Bundled into `libs.js` (no separate vendor files)

### CSS
- Kebab-case: `style.css`, `calendar.css`, `libs.css`
- Minified output: All .css files are minified
- Organization: Vendor libs in `libs.css`, custom styles in `style.css`

### Images
- Kebab-case: `main-title.webp`, `og-image.webp`, `qr-code.webp`
- Gallery folders: Numbered sequentially: `pic1/`, `pic2/`, … `pic36/`
- Gallery files inside folders: `large.webp`, `small.webp` (fixed names)
- Format: WebP only (performance requirement)

### Configuration Files
- Plain text: `.gitignore`, `CLAUDE.md`
- JSON: `emoji-picker/data.json`
- JavaScript object: `wedding-data.js` exports `weddingData` const

## JavaScript Standards

### Module System
- **Entry point:** `index.html` loads global scope JS
- **Modules:** `firebase-config.js` uses ES6 export syntax
- **jQuery:** Primary DOM library; all jQuery in minified bundle
- **Globals:** Couple data available as `window.weddingData`

### Function Signatures (firebase-config.js)

```javascript
// Async functions (Promise-based)
export async function getAllGuests() { … }
export async function addConfirm(guestData) { … }
export async function getConfirm() { … }
export async function addWish(wishData) { … }
export async function getAllWishes() { … }
export function setWishesListener(callback) { … }

// Parameter objects (destructured in implementations)
// guestData: { guestName, confirmStatus, numOfPerson, ... }
// wishData: { name, content, email, ... }
// callback: (wishes: Array) => void
```

### Naming Conventions
- camelCase for variables, functions: `getAllGuests`, `guestName`, `confirmStatus`
- UPPER_SNAKE_CASE for constants: `GUEST_ID`, `MAX_PARTY_SIZE` (if any)
- Classes: PascalCase (e.g., `Picker` in emoji-picker)
- Private methods: Prefix with `_` if using unminified source (minifier removes convention enforcement)

### Code Organization
- One concern per file (Single Responsibility Principle)
- Dependencies clearly listed at module top (imports)
- Exports documented with JSDoc (if unminified source maintained)
- Minified: All whitespace removed; variable names reduced to single letters (a, b, c, …)

### Error Handling
- Try-catch blocks around async Firebase calls
- Console errors for debugging (removed by minifier if comment-based)
- User feedback via modal dialogs or toast notifications (not console)

### Performance Considerations
- Lazy-load Firebase config only on `window.load`
- Defer non-critical JS (async/defer attributes)
- Cache Firebase documents locally where possible
- Reuse DOM queries (avoid repeated `$('#id')` lookups)

## HTML Standards

### Structure
- Semantic HTML5: `<header>`, `<section>`, `<footer>`, `<nav>`, `<article>`
- Single-page layout: Sections identified by `id` attributes (no separate files)
- Accessibility: `<label>` tags for form inputs, `alt` text on images, `title` attributes on interactive elements

### Section Layout
| Section ID | Parent | Purpose |
|------------|--------|---------|
| `#invitation` | `<body>` | Hero, countdown, scroll indicator |
| `#couple` | `<body>` | Groom & bride profiles |
| `#story` | `<body>` | Love story timeline |
| `#gallery` | `<body>` | Photo gallery grid + lightbox |
| `#event` | `<body>` | Event details, venue, schedule |
| `#donate` | `<body>` | Donation section + modal |
| `#wishes` | `<body>` | Guestbook section |
| `#rsvp-form` | `<body>` | RSVP modal |

### Classes & IDs
- **IDs:** Section-level identifiers, unique per page: `#invitation`, `#gallery`, `#wishes`
- **Classes:** Component-level styles: `.btn`, `.card`, `.gallery-item`, `.wish-form`
- **Bootstrap classes:** Extensive use of `.row`, `.col-*`, `.btn-primary`, `.modal`, etc.
- **Custom classes:** Prefixed with section or feature name: `.invitation-*`, `.gallery-*`, `.wish-*`

### Form Structure
- All forms within modals or inline sections
- Bootstrap `.form-group` wrapper for each input
- `<label>` with `for="inputId"` attribute
- jQuery Validate initialization: `$(form).validate({rules: {...}, messages: {...}})`

## CSS Standards

### Organization
- **Vendor CSS:** `templates/template135/css/libs.css` (322 KB, minified)
- **Custom CSS:** `templates/template135/css/style.css` (14 KB, minified)
- **Utility CSS:** Bootstrap utilities used extensively (.text-center, .mb-3, etc.)

### Class Naming
- **Kebab-case:** `.main-title`, `.gallery-item`, `.wish-form`
- **Bootstrap prefix:** `.btn-*`, `.col-*`, `.text-*`, `.d-*`
- **Custom prefix:** `.invitation-*`, `.couple-*`, `.story-*` for component-specific styles

### Color Palette
- **Primary:** Bootstrap blue (`#0d6efd`)
- **Accent:** Red (`#de4659`, used in buttons, scroll indicator, borders)
- **Dark:** `#333` or `#000` for text
- **Light:** `#f8f9fa` for backgrounds, `#fff` for cards

### Responsive Breakpoints
- **Mobile (≤576px):** Default styles, hide large elements
- **Tablet (≥768px):** Expanded layouts, show medium elements
- **Desktop (≥1200px):** Full layouts, show all elements
- **Media query syntax:** `@media (max-width: 576px) { … }` or Bootstrap class suffixes (`.col-md-*`, `.d-lg-block`)

### Typography
- **Font families (inlined in HTML head as @font-face):**
  - Bellota Text (display, accent text)
  - Bonheur Royale (decorative)
  - Marmelad (headings, titles)
- **Font sizes:** `16px` base, `1.5rem` for headings, `0.875rem` for small text
- **Font weights:** 400 (regular), 700 (bold), occasionally 300 (light)

### Animations
- **Scroll animations:** AOS (Animate On Scroll) library
  - Triggered on viewport entry: `data-aos="fade-in"`, `data-aos="slide-up"`
  - Duration: 1000ms default, configurable
- **Custom animations:** CSS keyframes in style.css
  - Snow effect: `@keyframes fall`
  - Menu shake: `@keyframes shake`
  - Fade/slide transitions on modal open
- **Performance:** Hardware-accelerated (transform, opacity preferred over width/height)

### Layout
- **Grid:** Bootstrap 5 flexbox grid (`.row`, `.col-*`)
- **Spacing:** Bootstrap utilities (`.mb-3`, `.p-4`, etc.)
- **Positioning:** Flexbox over absolute (more responsive)
- **Centering:** Flexbox centering (justify-content, align-items) over manual margin

## Asset Standards

### Images
- **Format:** WebP exclusively (not PNG, JPEG, GIF)
- **Optimization:** Compressed with WebP encoder (quality ~80)
- **Responsive sizes:**
  - Thumbnails: `small.webp` (max 400px wide)
  - Full-size: `large.webp` (max 2000px wide)
  - Metadata: as small as possible (favicon, og-image)
- **Naming:** kebab-case, descriptive: `main-title.webp`, `groom-portrait.webp`
- **Gallery structure:**
  ```
  assets/images/galleries/
  ├── pic1/
  │   ├── large.webp (1500-2000px)
  │   └── small.webp (400-600px)
  ├── pic2/ … pic36/
  ```

### Audio
- **Format:** MP3 (compatibility) or OGG (open format)
- **Compression:** 128 kbps bitrate (balance quality/size)
- **Naming:** `background-music-1.mp3`, `background-music-2.mp3`
- **Loading:** Deferred (loaded on user interaction, not on page load)

## Configuration Standards

### Firebase (firebase-config.js)
```javascript
const firebaseConfig = {
  apiKey: "...",          // Public; security via Firestore rules
  authDomain: "...",      // Firebase hosting domain
  projectId: "wedding-card-cdcce",  // Fixed, known value
  storageBucket: "...",   // Storage bucket (if used)
  messagingSenderId: "...",
  appId: "..."
};
```
- **Security model:** API key is public; access controlled via Firestore rules
- **Never hardcode:** Sensitive data (e.g., private key) — always use Firestore rules

### Couple Data (wedding-data.js)
```javascript
const weddingData = {
  groom: {
    fullName: "Lê Phúc Anh",
    shortName: "Phúc Anh",
    birthday: "DD/MM/YYYY"
  },
  bride: {
    fullName: "Nguyễn Thị Ngọc",
    shortName: "Ngọc",
    birthday: "DD/MM/YYYY"
  }
};
```
- **Accessible as global:** Used throughout index.html inline JS
- **Format:** Object literal (not exported, not imported)

## Testing Standards

### Current State
- **No automated tests** — Manual QA only
- **Manual checklist (recommended):**
  - [ ] Page loads without errors (console clean)
  - [ ] RSVP form submits and data persists
  - [ ] Wishes appear in real-time across tabs
  - [ ] Gallery loads all 36 images
  - [ ] Add-to-calendar exports event
  - [ ] Donation QR codes generate correctly
  - [ ] Mobile responsive (test on ≤576px, ≥1200px)
  - [ ] Audio plays on user interaction
  - [ ] Devtools blocked (right-click, F12 disabled)
  - [ ] Performance: Page load < 3s on 4G

### Future Testing (if expanded)
- **E2E tests:** Cypress or Playwright
- **Visual regression:** Percy or Chromatic
- **Accessibility:** axe DevTools or Lighthouse
- **Performance:** Lighthouse CI, Web Vitals monitoring

## Minification Standards

### JavaScript Minification
- **Tool:** Typically UglifyJS or Terser
- **Output:** Single-letter variables, removed whitespace, removed comments
- **Preservation:** Function signatures, API contracts
- **Loss of readability:** Minified files not meant for human reading; maintain separate source if possible

### CSS Minification
- **Tool:** cssnano or clean-css
- **Output:** No whitespace, compact selectors, merged rules
- **Preservation:** Specificity, media query integrity
- **Class names:** Preserved as-is (no renaming like CSS modules)

### HTML Minification
- **Tool:** html-minifier
- **Output:** Whitespace removed, inline styles/scripts optimized
- **Preservation:** Data attributes, accessibility attributes, semantic HTML

## Documentation Standards

### Code Comments
- **Minified deliverables:** Comments stripped
- **Source (if maintained):** JSDoc for functions, CSS for complex rules
- **Inline comments:** Explain "why", not "what" (code shows "what")

### Change Documentation
- CLAUDE.md updated for major architectural changes
- Git commits describe what changed (not minification noise)
- README.md kept current with feature list

## Security Standards

### Data Handling
- **No PII in source code:** Phone numbers, addresses in Firestore only
- **API keys:** Public keys in client (acceptable for Firebase web apps)
- **Guest codes:** Unguessable IDs (UUID or long random strings)

### Devtools Blocking
```javascript
// Blocks common debugging shortcuts (cosmetic security)
// Prevents accidental exposure via devtools, not cryptographic
document.onkeydown = (e) => {
  if (e.key == "F12" || (e.ctrlKey && e.shiftKey && e.key == "I")) {
    e.preventDefault();
  }
};
document.oncontextmenu = () => false; // Disable right-click
```
- **Note:** Not a security measure; users can disable in browser
- **Purpose:** Discourage casual inspection, protect guest codes from screenshots

### Firestore Rules (Not in code, but important)
- **Expected rules:**
  ```
  match /guests/{doc=**} {
    allow read: if request.auth != null || true; // Or specific rules
    allow write: if false; // Read-only collection
  }
  match /rsvp/{doc=**} {
    allow read, write: if request.auth == null; // Public (guest-submitted)
  }
  match /wishes/{doc=**} {
    allow read: if true;
    allow write: if request.auth == null; // Public
  }
  ```
- **Maintenance:** Update if spam becomes issue (add rate limits)

## Linting & Formatting

### Current State
- **No linter configured** — No ESLint, Prettier, or stylelint
- **Manual review:** Code style enforced by convention, not tooling

### Recommended (if setting up CI/CD)
- **JavaScript:** ESLint with airbnb-base config (or custom)
- **CSS:** stylelint with standard config
- **HTML:** htmlhint or built-in validators
- **Pre-commit hooks:** husky + lint-staged to auto-lint before commit

## Accessibility Standards

### HTML Level
- Semantic tags: `<header>`, `<section>`, `<nav>`, `<footer>`
- Form labels with `for` attribute
- Images with `alt` text
- ARIA labels where needed (`.btn[role="button"]`, `.modal[role="dialog"]`)

### CSS Level
- Color contrast: 4.5:1 for body text, 3:1 for large text (WCAG AA)
- Focus states: Visible outlines on interactive elements
- No color-only information: Use icons or text in addition to color

### JavaScript Level
- Keyboard navigation: Tab order, Enter/Escape handling
- ARIA announcements: Live regions for real-time updates (wishes)
- Skip links: Jump to main content (optional)

### Testing
- Use browser devtools accessibility panel
- Lighthouse audit accessibility score
- Manual keyboard navigation test

---

**Last Updated:** June 2026  
**Standard Version:** 1.0  
**Applies To:** All code in `docs/` directory (HTML, CSS, JS, images, audio)
