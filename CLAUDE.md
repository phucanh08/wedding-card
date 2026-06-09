# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A static mobile wedding invitation website for Lê Phúc Anh & Nguyễn Thị Ngọc, deployed via GitHub Pages at `https://phucanh08.github.io/wedding-card/`. The `docs/` directory is the GitHub Pages source root.

## Development

No build system or package manager — this is a pure static HTML/CSS/JS project. To develop locally, serve the `docs/` directory with any static file server:

```bash
# Using Python
python3 -m http.server 8080 --directory docs

# Using Node.js http-server (if installed)
npx http-server docs
```

Deployment is automatic via GitHub Pages when changes are pushed to `main`.

## Architecture

The entire site is a single page (`docs/index.html`) — a large minified file containing inline CSS, inline JS, and all section markup. The file is heavily minified; be careful when editing it.

**Key files:**
- `docs/index.html` — The complete SPA (minified). All sections (banner, couple, gallery, love story, events, donations, wishes/guestbook) are inline.
- `docs/wedding-data.js` — Couple data (groom/bride names and birthdays). Loaded before `index.html` body.
- `docs/firebase-config.js` — Firebase Firestore integration (minified). Handles three Firestore collections: `guests`, `rsvp`, `wishes`.
- `docs/templates/template135/css/` and `docs/templates/template135/js/` — Template-specific styles and scripts (libs + custom).
- `docs/common/calendar.css` and `docs/common/calendar.js` — Add-to-calendar widget.
- `docs/assets/images/` — All `.webp` images (galleries, portraits, QR codes, etc.).
- `docs/assets/musics/` — Background audio files.

## Firebase Backend

The site uses Firebase Firestore (project: `wedding-card-cdcce`) for real-time features:
- **`guests` collection** — Pre-loaded guest list. Guests are identified by URL query param `?code=<guestId>`.
- **`rsvp` collection** — RSVP confirmations submitted by guests.
- **`wishes` collection** — Guestbook messages; rendered in real-time via `onSnapshot`.

Guest identification: `guestId` is read from `url.searchParams.get('code')` at page load. A new guest record is created in Firestore if the code is not found.

## Frontend Libraries (loaded from CDN/local)

- jQuery + jQuery Validate
- Bootstrap 5
- AOS (scroll animations)
- LightGallery (photo lightbox)
- Add-to-Calendar Button (`atcb`)
- jQuery QR Code plugin (for crypto donation QR codes)
- Emoji picker (`docs/common/emoji-picker/`)

## Gallery

36 wedding photos in `docs/assets/images/galleries/pic1/` through `pic36/`. Each folder contains `large.webp` and `small.webp`. The gallery is powered by LightGallery and initialized from a JS array built in `index.html`.

## Notes

- All content is in Vietnamese.
- Right-click and browser devtools keyboard shortcuts are blocked in the deployed site (`index.html` head).
- Images use `.webp` format throughout for performance.
- Fonts (Bellota Text, Bonheur Royale, Marmelad) are inlined as `@font-face` rules from Google Fonts CDN inside `index.html`.
