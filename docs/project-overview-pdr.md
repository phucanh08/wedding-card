# Project Overview & Product Development Requirements

## Project Identity

**Wedding Card: A Static Mobile Invitation Website**

- **Couple:** Lê Phúc Anh & Nguyễn Thị Ngọc
- **Wedding Date:** 24 November 2024, 10:00 AM
- **Live URL:** https://phucanh08.github.io/wedding-card/
- **Deployment:** GitHub Pages (source root: `docs/`)
- **Language:** Vietnamese
- **Project Status:** Live (event completed November 2024)

## Purpose

Deliver a beautiful, mobile-responsive digital wedding invitation with integrated RSVP, real-time guestbook, and donation features. The site serves as both a primary invitation mechanism and a post-wedding keepsake, accessible globally via a simple URL with optional guest-specific codes.

## High-Level Requirements

| Requirement | Status | Notes |
|-------------|--------|-------|
| Mobile-responsive invitation | Shipped | Fully responsive, mobile-first design |
| RSVP tracking | Shipped | Firebase Firestore backed, guest-code identified |
| Real-time guestbook | Shipped | Wishes rendered live via Firestore snapshots |
| Donation integration | Shipped | Crypto QR code generation |
| Gallery (36 photos) | Shipped | LightGallery-powered lightbox |
| Love story timeline | Shipped | Narrative-driven section |
| Add-to-calendar | Shipped | atcb widget integration |
| Performance optimization | Shipped | Minified HTML/CSS/JS, WebP images |
| Security (devtools blocked) | Shipped | Disabled right-click, F12, Ctrl+Shift+I |

## Functional Specifications

### 1. Guest Identification & RSVP
- Guests access the site via base URL or personalized `?code=<guestId>` link
- On first visit, if no `guestId` is found, a new guest record is created in Firestore
- RSVP form collects: guest name, confirmation status (yes/no/pending), party size
- RSVP data stored in `rsvp` collection; pre-filled on subsequent visits

### 2. Real-Time Guestbook (Wishes)
- Guests submit name, email (optional), and message (min. 10 characters)
- Messages stored in `wishes` Firestore collection
- Frontend listens for collection updates via `onSnapshot`; new wishes appear live without page refresh
- Integrated emoji picker for message composition

### 3. Photo Gallery
- 36 wedding photos organized in `docs/assets/images/galleries/pic1/` through `pic36/`
- Each photo set contains `large.webp` and `small.webp` for responsive loading
- LightGallery lightbox powers the full-screen viewer
- Gallery initialized from JS array in `index.html`

### 4. Donation Feature
- Crypto wallet QR codes (via jQuery qrcode plugin)
- Modal-based donation section with dynamically generated QR codes
- No backend processing; QR generation purely client-side

### 5. Add-to-Calendar
- atcb widget adds wedding event to guest calendars (Google, Outlook, Apple, etc.)
- Fully customizable via atcb library

### 6. Content Sections
- **Banner/Invitation** — Hero section with main title and scroll indicator
- **Couple** — Groom & bride profiles with birthdays and portraits
- **Love Story** — Timeline narrative of the couple
- **Gallery** — 36-photo lightbox
- **Event Details** — Venue, time, and ceremony schedule
- **Donate** — Donation methods and crypto QR codes
- **Wishes/Guestbook** — Real-time guest messages with emoji picker
- **RSVP Modal** — Guest confirmation form

## Non-Functional Requirements

| Requirement | Implementation |
|-------------|-----------------|
| **Performance** | Minified HTML/CSS/JS; WebP images; inline fonts (@font-face); no HTTP requests for static assets |
| **Mobile Responsiveness** | Bootstrap 5 grid; CSS media queries; mobile-first design; AOS scroll animations |
| **Security** | Devtools disabled (right-click, F12, Ctrl+Shift+I, Ctrl+J, Ctrl+U); client-side Firebase key acceptable (security via Firestore rules) |
| **Accessibility** | Bootstrap 5 semantic HTML; alt text on images; form labels |
| **Browser Support** | Modern browsers (Chrome, Firefox, Safari, Edge); WebP support required |

## Architecture Highlights

### Single-Page Application (SPA)
- Entire site is a single `docs/index.html` (65 KB minified)
- All sections inline: CSS + JS + markup
- No bundler or build process

### Static File Serving
- No backend server required
- Pure static assets (HTML, CSS, JS, images, audio)
- GitHub Pages automation on push to `main`

### Firebase Firestore Backend
- Collections: `guests`, `rsvp`, `wishes`
- Project: `wedding-card-cdcce` (asia-southeast1)
- Real-time listeners for wish updates
- Client-side security model (API key public; security via Firestore rules)

### Frontend Stack
- **jQuery + jQuery Validate** — Form handling
- **Bootstrap 5** — Grid & component framework
- **AOS** — Scroll animations
- **LightGallery** — Photo gallery
- **atcb** — Add-to-calendar widget
- **Custom emoji picker** — Local JS library

### Asset Organization
- Minified vendor code in `templates/template135/`
- Shared libraries in `common/`
- Images & audio in `assets/`
- Couple metadata in `wedding-data.js`

## Known Constraints

1. **Minified Source** — `index.html` is heavily minified; editing requires unminifying or careful hand-editing
2. **No Build Pipeline** — Manual minification/optimization if code changes
3. **CDN Dependencies** — jQuery, Bootstrap, Firebase loaded from external CDNs
4. **Static Deployment** — GitHub Pages limits to static assets only
5. **Vietnamese Content** — All UI text and content is Vietnamese; internationalization would require structural changes

## Maintenance & Evolution

### Current State
- Live and functional post-wedding
- No automated tests or CI/CD pipeline
- Manual deployment via git push

### Future Considerations
1. **Unminify source** — If maintenance becomes frequent, create a build pipeline to generate minified output from readable source
2. **Security hardening** — Strengthen Firestore rules, rotate Firebase credentials
3. **Gallery automation** — Script to batch-convert and organize photos
4. **Template reusability** — Adapt this codebase as a template for other events (birthdays, anniversaries)
5. **Analytics** — Consider Firebase Analytics for post-event insights
6. **Accessibility audit** — WCAG 2.1 compliance review

## Success Metrics (Post-Wedding)

- **RSVP tracking** — All invited guests can submit confirmations
- **Gallery rendering** — 36 photos load and display correctly
- **Real-time wishes** — New guestbook entries appear live across open browser tabs
- **Donation collection** — Crypto QR codes are scannable and functional
- **Availability** — Site remains accessible and responsive
- **Performance** — Page load < 3s on 4G mobile networks

## Acceptance Criteria

- [x] Responsive design passes on mobile, tablet, desktop
- [x] RSVP data persists in Firestore
- [x] Wishes appear in real-time across clients
- [x] Gallery loads all 36 images without errors
- [x] Add-to-calendar widget is clickable and generates calendar entries
- [x] Donation modal displays crypto QR codes correctly
- [x] Page is performant (minified, optimized images)
- [x] Firebase integration is secure (public key; rules-based security)
- [x] Devtools are blocked in production

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | Nov 2024 | Initial launch for wedding event |
| 1.1 | Dec 2024 | Safari compatibility fixes, audio preload, favicon updates |

---

**Last Updated:** June 2026  
**Owner:** Lê Phúc Anh
