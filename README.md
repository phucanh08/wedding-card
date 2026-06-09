# Thiệp mời đám cưới di động của Lê Phúc Anh và Nguyễn thị Ngọc

A static mobile wedding invitation website for **Lê Phúc Anh & Nguyễn Thị Ngọc**.

![Ảnh chính](https://phucanh08.github.io/wedding-card/assets/images/main_image.webp)

## Quick Links

- **Live:** https://phucanh08.github.io/wedding-card/
- **Documentation:** [See docs/](./docs/README.md) (project overview, architecture, development guide)
- **Wedding Date:** 24 November 2024, 10:00 AM

## Local Development

No build system required — pure static HTML/CSS/JS.

```bash
# Using Python
python3 -m http.server 8080 --directory docs

# Using Node.js
npx http-server docs
```

Visit `http://localhost:8080` in your browser.

## Structure

```
docs/
├── index.html                # Single-page SPA (minified)
├── wedding-data.js           # Couple data
├── firebase-config.js        # Firestore integration
├── templates/template135/    # Vendor template (CSS/JS/fonts)
├── common/                   # Shared libraries (calendar, emoji picker)
├── components/               # Reusable HTML snippets
└── assets/
    ├── images/               # 36 gallery photos + metadata images (.webp)
    └── musics/               # Background audio files
```

## Key Features

- **Responsive mobile-first design** with snow effect animations
- **Guest management:** Pre-loaded guest list, RSVP tracking, URL code-based identification (`?code=<guestId>`)
- **Real-time guestbook:** Wishes rendered live via Firebase Firestore
- **Integrated donations:** Crypto QR code generation
- **Wedding timeline:** Love story, event schedule, photo gallery (36 images)
- **Add-to-calendar:** One-click calendar integration

## Technology Stack

| Layer | Tech |
|-------|------|
| **Hosting** | GitHub Pages (docs/) |
| **Backend** | Firebase Firestore (collections: guests, rsvp, wishes) |
| **Frontend** | Vanilla JS + jQuery, Bootstrap 5, AOS, LightGallery |
| **Content** | Vietnamese |
| **Fonts** | Bellota Text, Bonheur Royale, Marmelad (Google Fonts) |
| **Images** | WebP format (performance optimized) |

## Firebase Integration

Project: `wedding-card-cdcce` (asia-southeast1)

Three Firestore collections:
1. **`guests`** — Pre-loaded guest list; guests identified by `?code=<guestId>` query param
2. **`rsvp`** — RSVP confirmations (guest name, confirmation status, party size)
3. **`wishes`** — Guestbook messages; rendered real-time via snapshot listener

## Important Notes

- All content is in **Vietnamese**.
- `index.html` is heavily **minified**; edit carefully or consider unminifying for maintenance.
- Right-click and browser devtools shortcuts are **disabled** in production (`index.html` head).
- Images use `.webp` format throughout.
- No package manager or build pipeline — all dependencies are CDN-hosted or vendored locally.

## Documentation

For deployment, architecture, code standards, and development guidelines, see:
- [Project Overview & PDR](./docs/project-overview-pdr.md)
- [System Architecture](./docs/system-architecture.md)
- [Codebase Summary](./docs/codebase-summary.md)
- [Code Standards](./docs/code-standards.md)
- [Deployment Guide](./docs/deployment-guide.md)
- [Design Guidelines](./docs/design-guidelines.md)
- [Project Roadmap](./docs/project-roadmap.md)

```
         mMm  _[_]_
        /(_)\  (_)
       //)^(\\//:\\
      /(/&@&\)\|~|/
     / /-~`~-\ |||
     `/       \|||
     `--------'-'-- Nguyễn Ngọc & Phúc Anh
```
