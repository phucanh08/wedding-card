# System Architecture

## Overview

A static single-page application (SPA) deployed via GitHub Pages, with client-side Firebase Firestore integration for real-time features (RSVP, guestbook).

```
┌─────────────────────────────────────────────────────────────┐
│                      End User (Browser)                      │
├─────────────────────────────────────────────────────────────┤
│                    GitHub Pages (docs/)                       │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ index.html (65 KB, minified)                        │    │
│  │ ├─ Inline CSS                                       │    │
│  │ ├─ Inline JS (jQuery, Bootstrap, AOS, etc.)        │    │
│  │ └─ Inline Markup (all sections)                     │    │
│  └─────────────────────────────────────────────────────┘    │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ Static Assets (loaded once at page start)            │   │
│  │ ├─ wedding-data.js (couple metadata)                 │   │
│  │ ├─ firebase-config.js (Firestore client)             │   │
│  │ ├─ assets/images/*.webp (36 gallery + metadata)      │   │
│  │ └─ assets/musics/*.mp3 (background audio)            │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
         │
         ├─ CDN (jQuery, Bootstrap, AOS, LightGallery, atcb)
         │
         └─ Firebase Firestore API
            Project: wedding-card-cdcce
            Region: asia-southeast1
```

## Core Components

### 1. HTML Entry Point (`docs/index.html`)

**65 KB minified single-page SPA**

Structure (by section ID):
- `#invitation` — Banner with couple names and scroll indicator
- `#couple` — Groom & bride profiles
- `#story` — Love story timeline
- `#gallery` + `#photoGalleryContainer` — 36-photo lightbox
- `#event` — Event schedule and venue
- `#donate` + `#donate-modal` — Donation section with crypto QR codes
- `#wishes` / `#section-comment` — Real-time guestbook
- `#rsvp-form` / `#rsvp-modal` — RSVP confirmation
- `#preloader` — Loading spinner
- `#snowflakes` — Animated snow effect
- `#clock` / `#weddingdate` — Countdown timer
- `#myAudio` — Background music player
- `#menu-access` — Floating action menu

**Head includes:**
- SEO meta tags (OpenGraph, Twitter Card)
- Inlined `@font-face` rules (Bellota Text, Bonheur Royale, Marmelad)
- Favicon reference
- Devtools blocker script (blocks right-click, F12, Ctrl+Shift+I, Ctrl+J, Ctrl+U)
- Guest ID extraction: `url.searchParams.get('code')`

### 2. Couple Data (`docs/wedding-data.js`)

Simple config object:
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

Loaded before `index.html` body for early availability.

### 3. Firebase Integration (`docs/firebase-config.js`)

**7 KB minified ES module**

Imports:
- `firebase-app` v11.0.1
- `firebase-firestore` v11.0.1

Exports async functions:
- `getAllGuests()` — Fetch all guest records
- `addConfirm(guestData)` — Create/update RSVP; creates guest doc if missing
- `getConfirm()` — Fetch current guest's RSVP
- `addWish(wishData)` — Submit guestbook message
- `getAllWishes()` — Fetch all wishes
- `setWishesListener(callback)` — Real-time listener for wish updates

**On window load:**
1. Load guests collection
2. Pre-fill RSVP if `?code=` query param is found
3. Render wishes and attach real-time listener
4. Initialize donate modal + crypto QR codes
5. Wire RSVP form submit
6. Attach jQuery Validate rules to wish form (name ≥5 chars, content ≥10 chars, email optional)
7. Wire music box toggle
8. Attach back-to-top button
9. Wire add-to-calendar custom click
10. Initialize floating menu open/close

**Firestore Collections:**

| Collection | Schema | Purpose |
|------------|--------|---------|
| `guests` | `{guestId, name, ...}` | Pre-loaded guest list; identifies visitors via URL param |
| `rsvp` | `{guestId, guestName, confirmStatus, numOfPerson, ...}` | RSVP confirmations submitted by guests |
| `wishes` | `{name, content, email?, timestamp}` | Real-time guestbook messages |

### 4. Template & Styles (`docs/templates/template135/`)

Vendored third-party template structure:

```
template135/
├── css/
│   ├── libs.css (322 KB) — Bootstrap, LightGallery, AOS, jQuery Validate
│   └── style.css (14 KB) — Custom site styles
├── js/
│   ├── libs.js (293 KB) — jQuery, Bootstrap, AOS, LightGallery, others
│   └── script.js (731 B) — Custom: floating menu shake, tooltips init
├── fonts/
│   ├── bootstrap-icons.woff / .woff2
│   └── lg.* (LightGallery icon fonts)
└── img/
    └── main_title.webp
```

Custom `script.js` initialization:
- Shake animation on floating menu icon
- Bootstrap tooltips and popovers via JS
- Event delegation setup

### 5. Shared Libraries (`docs/common/`)

#### Calendar Widget
- `calendar.js` (203 KB) — atcb (Add-to-Calendar Button) library
- `calendar.css` (36 KB) — atcb styling
- Enables one-click calendar integration (Google, Outlook, Apple, etc.)

#### Emoji Picker
- `emoji-picker/data.json` (372 KB) — Unicode emoji database
- `emoji-picker/js/picker.js` (36 KB) — Core picker UI
- `emoji-picker/js/index.js` — Picker + Database exports
- `emoji-picker/js/init.js` — Wires emoji selection to wish textarea
- `emoji-picker/js/database.js` — Emoji data queries
- `emoji-picker/js/insertTextAtCursor.js` — Text insertion utility

### 6. Components (`docs/components/`)

- `mouse-scroll-on-mobile.html` — Self-contained "Kéo xuống" (scroll down) animated indicator
  - Mobile-only (≤576px breakpoint)
  - Auto-hides after first scroll event

### 7. Assets

#### Images (`docs/assets/images/`)
- 36 gallery photos: `galleries/pic1/` through `pic36/`
  - Each folder: `large.webp` (full resolution) + `small.webp` (thumbnail)
- Metadata images: favicon, OpenGraph preview, QR codes, couple portraits
- All in `.webp` format (WOFF2-equivalent performance optimization)

#### Audio (`docs/assets/musics/`)
- Background music files (MP3 or equivalent)
- Loaded on-demand with user interaction (autoplay blocked by browsers)

## Data Flow

### 1. Page Load
```
1. Browser requests docs/index.html
2. GitHub Pages serves minified HTML
3. HTML <head> loads wedding-data.js and firebase-config.js
4. firebase-config.js initializes Firebase client
5. HTML <body> renders (inlined markup)
6. On DOMContentLoaded:
   - getAllGuests() → populate guest list
   - Check url.searchParams.get('code')
   - If match, pre-fill RSVP form
   - setWishesListener() → render wishes + listen for updates
   - Initialize event listeners (form submit, buttons, scroll)
```

### 2. RSVP Submission
```
1. Guest fills name, confirmation, party size
2. Form submit triggers addConfirm(guestData)
3. firebase-config.js creates/updates rsvp doc in Firestore
4. If new guest, also creates guest doc
5. URL updated via history.pushState to include ?code=<guestId>
6. Success modal shown
```

### 3. Wish Submission
```
1. Guest fills name, message (optional email)
2. jQuery Validate checks (name ≥5, content ≥10)
3. Form submit triggers addWish(wishData)
4. firebase-config.js writes to wishes collection
5. Firestore trigger or onSnapshot updates all clients in real-time
6. New wish appears in section-comment without reload
```

### 4. Real-Time Wish Updates
```
1. setWishesListener(callback) attaches onSnapshot listener
2. Firestore emits snapshot on collection change
3. Callback re-renders wishes section with new messages
4. Updates pushed to all browser tabs with open page
```

## Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Hosting** | GitHub Pages | Static file serving, auto-deploy on push |
| **Frontend Framework** | Bootstrap 5 | Grid, components, responsive design |
| **Form Handling** | jQuery + jQuery Validate | Form submission, validation rules |
| **DOM Manipulation** | jQuery | Event binding, DOM updates |
| **Animations** | AOS (Animate On Scroll) | Scroll-triggered transitions |
| **Photo Gallery** | LightGallery | Full-screen lightbox, swipe nav |
| **Calendar** | atcb (Add-to-Calendar Button) | Event export (Google, Outlook, etc.) |
| **QR Generation** | jQuery qrcode plugin | Client-side QR code rendering |
| **Emoji Picker** | Custom JS library | Emoji insertion into textarea |
| **Backend** | Firebase Firestore | Real-time database, collections |
| **Fonts** | Google Fonts (inlined) | Typography (Bellota, Bonheur, Marmelad) |
| **Images** | WebP | Performance-optimized raster format |

## Security Model

### Client-Side
- Firebase API key is public in `firebase-config.js` (standard practice for web apps)
- Security is enforced via **Firestore rules** on the backend (not by key secrecy)
- Devtools are blocked via inline script (cosmetic, not cryptographic)

### Firestore Rules (Implicit)
- Expected rules allow:
  - Read access to `guests` collection (pre-loaded list)
  - Write to `rsvp` and `wishes` collections (guest-submitted data)
  - Real-time listeners on `wishes`

### Threat Model
- No authentication required (public event)
- Guests identified by URL code, not credentials
- Spam mitigation: form validation only (no server-side rate limiting)

## Performance Optimizations

| Optimization | Implementation |
|--------------|-----------------|
| **Minification** | All HTML, CSS, JS minified |
| **Image Format** | WebP throughout (smaller than PNG/JPEG) |
| **Font Inlining** | @font-face embedded in HTML <head> (no network delay) |
| **Inline CSS/JS** | No separate asset requests; all CSS and JS in HTML |
| **Lazy Loading** | Images use browser native lazy-loading (implicit via HTML) |
| **Caching** | GitHub Pages sets far-future expires; CDN-hosted libs cached |
| **Asset Bundling** | Vendor libs pre-bundled (libs.js, libs.css) |

## Deployment Pipeline

```
1. Developer pushes to main branch
2. GitHub Pages detects docs/ changes
3. Auto-deploys docs/ contents to https://phucanh08.github.io/wedding-card/
4. No build step required (static assets only)
5. Cache invalidation: instant (or within GitHub Pages TTL)
```

## Known Limitations

1. **No server-side processing** — All logic is client-side
2. **No CI/CD** — Manual testing required; no automated deployment checks
3. **Minified source** — Hard to debug or maintain without source maps
4. **CDN dependency** — jQuery, Bootstrap, Firebase require internet access
5. **Static-only** — No backend endpoints or server-side rendering
6. **Limited scalability** — Firebase Firestore can handle high throughput, but site itself is read-only (no server)

## Future Architecture Improvements

1. **Build pipeline** — Gulp/Webpack to generate minified output from readable source
2. **Source maps** — Enable easier debugging without unminifying
3. **Automated tests** — Cypress or Playwright for end-to-end testing
4. **CI/CD** — GitHub Actions to auto-deploy on PR merge
5. **Analytics** — Firebase Analytics for post-event tracking
6. **CDN** — CloudFront or Cloudflare for faster asset delivery
7. **Internationalization** — Support multiple languages (currently Vietnamese only)

---

**Last Updated:** June 2026  
**Architecture Version:** 1.0
