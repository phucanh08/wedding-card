# Codebase Summary

## Directory Structure

```
wedding-card/
├── README.md                          # Project overview (Vietnamese)
├── CLAUDE.md                          # Developer guidance (this repo)
├── .gitignore                         # Git exclusions
│
└── docs/                              # GitHub Pages source root
    ├── index.html                     # 65 KB, minified SPA
    ├── wedding-data.js                # 188 B, couple metadata
    ├── firebase-config.js             # 7 KB, minified Firestore client
    │
    ├── templates/
    │   └── template135/               # Vendored template
    │       ├── css/
    │       │   ├── libs.css           # 322 KB, vendor libs (Bootstrap, LG, AOS, etc.)
    │       │   └── style.css          # 14 KB, custom site styles
    │       ├── js/
    │       │   ├── libs.js            # 293 KB, vendor JS bundle
    │       │   └── script.js          # 731 B, custom JS (menu shake, tooltips)
    │       ├── fonts/
    │       │   ├── bootstrap-icons.*
    │       │   └── lg.* (LightGallery fonts)
    │       └── img/
    │           └── main_title.webp
    │
    ├── common/
    │   ├── calendar.css               # 36 KB, atcb styles
    │   ├── calendar.js                # 203 KB, atcb library
    │   └── emoji-picker/
    │       ├── data.json              # 372 KB, emoji database
    │       └── js/
    │           ├── index.js           # Exports: Picker, Database
    │           ├── picker.js          # 36 KB, UI + search
    │           ├── database.js        # Emoji data queries
    │           ├── init.js            # Wires emoji to wish textarea
    │           └── insertTextAtCursor.js  # Text insertion utility
    │
    ├── components/
    │   └── mouse-scroll-on-mobile.html    # Scroll indicator (≤576px)
    │
    └── assets/
        ├── images/
        │   ├── galleries/
        │   │   ├── pic1/ → pic36/     # Each: {large, small}.webp
        │   │   │   ├── large.webp
        │   │   │   └── small.webp
        │   │   ├── favicon.webp
        │   │   ├── og-image.webp
        │   │   ├── qr-*.webp          # Donation QR codes
        │   │   └── portraits/
        │   │       ├── groom.webp
        │   │       └── bride.webp
        │   └── [other metadata images]
        │
        └── musics/
            ├── background-music-1.mp3
            └── background-music-2.mp3
```

## Key Files Reference

### Entry Point: `docs/index.html`

| Section | HTML ID | Purpose | Key Classes |
|---------|---------|---------|------------|
| Banner | `#invitation` | Hero, couple names, countdown | `.invitation-container`, `.countdown` |
| Couple | `#couple` | Groom & bride profiles | `.couple-card`, `.profile-img` |
| Love Story | `#story` | Timeline narrative | `.timeline`, `.story-item` |
| Gallery | `#gallery` + `#photoGalleryContainer` | 36 photos, lightbox | `.gallery-grid`, `.gallery-item` |
| Events | `#event` | Venue, schedule | `.event-card` |
| Donations | `#donate` + `#donate-modal` | Crypto QR codes | `.donate-btn`, `.qr-code` |
| Guestbook | `#wishes` + `#section-comment` | Real-time messages | `.wish-item`, `.wish-form` |
| RSVP | `#rsvp-form` + `#rsvp-modal` | Confirmation form | `.rsvp-input`, `.rsvp-submit` |
| UI | `#preloader` | Loading spinner | `.spinner` |
| | `#snowflakes` | Snow animation | `.snowflake` |
| | `#clock` / `#weddingdate` | Countdown timer | `.timer-digit` |
| | `#myAudio` | Background music player | `.audio-player` |
| | `#menu-access` | Floating action menu | `.floating-menu` |

**Head content:**
- SEO meta tags: `og:title`, `og:image`, `og:url`, `twitter:card`
- @font-face rules (inline)
- Devtools blocker (inline `<script>`)

**Inline JS:** 
- jQuery event handlers
- Firebase initialization calls
- Gallery array definition (36 photos)
- AOS scroll animation config

### Couple Data: `docs/wedding-data.js`

```javascript
const weddingData = {
  groom: { fullName: "...", shortName: "...", birthday: "..." },
  bride: { fullName: "...", shortName: "...", birthday: "..." }
};
```

Loaded before `index.html` body via `<script src="wedding-data.js"></script>`.

### Firebase Integration: `docs/firebase-config.js`

| Export | Signature | Purpose |
|--------|-----------|---------|
| `getAllGuests()` | `async () => guests[]` | Load pre-populated guest list |
| `addConfirm(data)` | `async (guestData) => void` | Submit RSVP, create guest if missing |
| `getConfirm()` | `async () => rsvpDoc \| null` | Fetch current guest's RSVP |
| `addWish(data)` | `async (wishData) => void` | Submit guestbook message |
| `getAllWishes()` | `async () => wishes[]` | Load all wishes |
| `setWishesListener(cb)` | `(callback) => () => void` | Real-time listener; returns unsubscribe |

**Firebase config:**
```javascript
const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "wedding-card-cdcce",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "..."
};
```

**Firestore usage:**
- `db.collection('guests')` — Pre-loaded, read-only
- `db.collection('rsvp')` — Write via addConfirm
- `db.collection('wishes')` — Write via addWish; listen via onSnapshot

### Template Styles: `docs/templates/template135/css/`

| File | Size | Contents |
|------|------|----------|
| `libs.css` | 322 KB | Bootstrap 5, LightGallery, AOS, jQuery Validate |
| `style.css` | 14 KB | Custom classes: `.btn-custom`, `.card-*, `.text-accent` etc. |

**Color scheme (inferred from style.css):**
- Primary: Bootstrap blue (`#0d6efd`)
- Accent red: `#de4659` (used in scroll indicator, buttons)
- Light backgrounds: `#f8f9fa`

### Template Scripts: `docs/templates/template135/js/`

| File | Size | Purpose |
|------|------|---------|
| `libs.js` | 293 KB | Vendor JS (jQuery, Bootstrap, AOS, LightGallery, jQuery Validate) |
| `script.js` | 731 B | Custom: menu icon shake, tooltip init, popovers |

**script.js** (minified, ~3 lines):
- Shake animation on `.floating-menu .icon`
- Initialize Bootstrap tooltips/popovers on document
- May include event delegation

### Common Libraries: `docs/common/`

#### Calendar (atcb)
- `calendar.js` (203 KB) — Add-to-Calendar Button widget
- `calendar.css` (36 KB) — Modal & button styles
- Used to export wedding event to Google Calendar, Outlook, Apple Calendar, etc.

#### Emoji Picker (Custom)
- `emoji-picker/data.json` — 372 KB Unicode emoji DB (name, category, unicode)
- `emoji-picker/js/picker.js` — Search, category filter, grid display
- `emoji-picker/js/database.js` — Query emoji by name/category
- `emoji-picker/js/init.js` — Attach to `#wish-textarea`, toggle on emoji icon click
- `emoji-picker/js/index.js` — Module exports (Picker, Database classes)
- `emoji-picker/js/insertTextAtCursor.js` — Insert selected emoji at cursor

### Assets

#### Images (93 total)
- **Galleries:** `pic1/` through `pic36/`, each with `large.webp` + `small.webp`
- **Metadata:** favicon, og-image, QR codes (donation wallets), couple portraits
- Format: `.webp` (performance optimized)
- Responsive: small for thumbnail, large for lightbox

#### Audio (2 tracks)
- Background music files in `assets/musics/`
- Auto-load deferred (loaded on user interaction)
- Format: MP3 or OGG

## File Size Summary

| Component | Minified Size |
|-----------|--------------|
| index.html | 65 KB |
| firebase-config.js | 7 KB |
| wedding-data.js | 188 B |
| libs.css (vendor) | 322 KB |
| style.css (custom) | 14 KB |
| libs.js (vendor) | 293 KB |
| script.js (custom) | 731 B |
| calendar.js (atcb) | 203 KB |
| calendar.css | 36 KB |
| emoji-picker (all) | ~450 KB (data.json dominates) |
| **Total (minified, excl. images/audio)** | ~1.4 MB |
| Gallery images (36 pairs) | ~15-20 MB (estimated) |
| Audio files | ~5-10 MB (estimated) |

## Coding Conventions

### JavaScript
- **Module format:** ES6 modules (firebase-config.js exports async functions)
- **jQuery:** Heavy use for DOM queries and event handling
- **Minified:** All deliverables are minified; no source maps
- **Vanilla JS:** Minimal custom code; reliance on libraries

### HTML
- **Structure:** Single-page layout with section IDs for navigation
- **Templating:** No template engine; inline HTML in minified file
- **Inline assets:** CSS and JS directly in `<head>` and before `</body>`

### CSS
- **Framework:** Bootstrap 5 grid system
- **Custom:** Minimal custom styles; mostly overrides of vendor classes
- **Media queries:** Mobile-first approach (<=576px for mobile, >=1200px for desktop)

### Image Naming
- Galleries: `pic1/`, `pic2/`, ... `pic36/` (numbered sequentially)
- Each gallery: `large.webp` (full res), `small.webp` (thumbnail)
- Format: kebab-case for filenames (e.g., `main-title.webp`, `og-image.webp`)

### JSON
- `emoji-picker/data.json` — Array of emoji objects: `{name, unicode, category}`

## Dependencies & Versions

| Dependency | Version | Source | Purpose |
|------------|---------|--------|---------|
| Bootstrap | 5.x | CDN | Grid, components |
| jQuery | 3.x | CDN | DOM manipulation |
| jQuery Validate | 1.x | CDN (via libs.js) | Form validation |
| AOS | Latest | CDN (via libs.js) | Scroll animations |
| LightGallery | Latest | CDN (via libs.js) | Photo lightbox |
| Firebase | 11.0.1 | CDN (gstatic) | Firestore |
| atcb | Latest | Local (calendar.js) | Calendar export |
| jQuery qrcode | Latest | CDN (via libs.js) | QR code generation |
| Emoji Picker | Custom | Local | Emoji insertion |

## Entry Points

1. **User Entry:** https://phucanh08.github.io/wedding-card/ (or with `?code=<guestId>`)
2. **Developer Local:** `python3 -m http.server 8080 --directory docs`

## Build & Deployment

- **No build step** — Static files served as-is
- **Deployment:** `git push main` → GitHub Pages auto-deploys `docs/`
- **Minification:** Manual (or would require bundler setup)
- **Asset optimization:** WebP images pre-optimized offline

## Testing & Quality

- **No automated tests** — Manual testing only
- **No linting** — No ESLint or Prettier config
- **No CI/CD** — No GitHub Actions or pre-commit hooks
- **Accessibility:** Basic (Bootstrap semantic HTML)

## Known Technical Debt

1. Minified source is hard to maintain
2. No source maps for debugging
3. Inline dev tools blocker is cosmetic (security theater)
4. Firebase API key is public (acceptable for Firestore, enforced by rules)
5. No rate limiting on form submissions (client-side validation only)
6. All JavaScript runs in global scope (no module bundler)
7. CDN dependencies create external service dependencies

---

**Last Updated:** June 2026  
**Files Scanned:** 30+  
**Total Project Size:** ~25-30 MB (including images)
