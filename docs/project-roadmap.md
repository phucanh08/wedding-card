# Project Roadmap

## Project Status

**Current Status:** Live & Complete (Post-Wedding Event)  
**Wedding Date:** 24 November 2024 (Event completed)  
**Deployment:** GitHub Pages, fully operational  
**Maintenance Mode:** Active (bug fixes, security updates, content preservation)

## Phase History

### Phase 1: MVP (Completed - Oct 2024)
**Objective:** Launch beautiful, functional invitation website

| Feature | Status | Notes |
|---------|--------|-------|
| Mobile-responsive design | ✅ Shipped | Bootstrap 5, mobile-first |
| Single-page SPA | ✅ Shipped | Minified index.html, all sections inline |
| Gallery (36 photos) | ✅ Shipped | LightGallery lightbox, WebP format |
| RSVP form + Firestore | ✅ Shipped | Guest identification via ?code= param |
| Real-time guestbook | ✅ Shipped | Firebase onSnapshot listener |
| Love story timeline | ✅ Shipped | Narrative with images & dates |
| Event details section | ✅ Shipped | Venue, time, ceremony schedule |
| Donation integration | ✅ Shipped | Crypto QR codes via jQuery plugin |
| Add-to-calendar widget | ✅ Shipped | atcb library, multi-provider support |
| Performance optimization | ✅ Shipped | Minification, WebP, inlined assets |
| Devtools blocking | ✅ Shipped | Right-click + F12 disabled |

### Phase 2: Refinement (Completed - Nov 2024)
**Objective:** Polish, optimize, and stabilize for live event

| Feature | Status | Notes |
|---------|--------|-------|
| Safari compatibility fixes | ✅ Shipped | Audio preload, font rendering |
| Favicon update | ✅ Shipped | Version 1.0 favicon added |
| Audio minification | ✅ Shipped | Smaller background music files |
| CSS/JS minification | ✅ Shipped | Reduced payload by ~40% |
| Image optimization | ✅ Shipped | All images converted to WebP |
| Form validation improvements | ✅ Shipped | Name ≥5 chars, message ≥10 chars |
| Countdown timer fix | ✅ Shipped | Accurate timer for wedding date |
| Mobile snow effect | ✅ Shipped | Disabled on low-end devices |
| Testing on production | ✅ Shipped | Cross-browser & device testing |

### Phase 3: Post-Event (Current - Nov 2024 onwards)
**Objective:** Maintain live site, preserve memories, plan reusability

| Task | Status | Timeline | Notes |
|------|--------|----------|-------|
| Keep site live & accessible | 🔄 Ongoing | Indefinite | Guest access, content preservation |
| Bug fixes (if reported) | 🔄 Ongoing | As-needed | Minor fixes only |
| Security monitoring | 🔄 Ongoing | Monthly | Check Firebase, dependency updates |
| Data backup | ✅ Completed | One-time | Export Firestore collections if needed |
| Documentation creation | ✅ Shipped | June 2026 | Codebase summary, architecture docs |
| Performance monitoring | 🔄 Optional | Quarterly | Lighthouse audits, load time checks |

## Active Maintenance (Current Phase)

### Critical Issues (Urgent)
None currently known.

**Report critical issues:** Contact owner or open GitHub issue

### Known Limitations
- Site is minified; unminifying would enable easier maintenance
- No CI/CD pipeline for automated testing
- No automated backups of Firestore data
- CDN dependencies on external libraries (jQuery, Bootstrap, Firebase)

### Maintenance Schedule

| Task | Frequency | Owner | Notes |
|------|-----------|-------|-------|
| Security audits | Monthly | GitHub Dependabot | Monitor for library updates |
| Firestore quota check | Quarterly | Admin | Ensure no cost overruns |
| Performance audit | Semi-annually | Admin | Lighthouse, Core Web Vitals |
| Content backup | Annually | Admin | Export wishes/RSVP data |
| Documentation review | Annually | Admin | Update if codebase changes |

## Future Enhancements (Optional / Post-Maintenance)

### Short-Term (1-2 months)
- **Source unminification:** Create readable source code from minified deliverables
  - **Rationale:** Enables easier maintenance, code review, future updates
  - **Effort:** 2-3 days (manual or with tooling)
  - **Deliverable:** Separate `src/` directory with unminified code; build script to minify

- **GitHub Actions CI/CD:** Auto-deploy on push, run basic tests
  - **Rationale:** Reduce manual steps, catch errors pre-deploy
  - **Effort:** 1 day
  - **Deliverable:** `.github/workflows/deploy.yml`

- **Wishes/RSVP Archive:** Download and archive guest data
  - **Rationale:** Preserve memories, legal compliance
  - **Effort:** 2 hours (manual Firestore export)
  - **Deliverable:** JSON/CSV backup files

### Medium-Term (2-4 months)
- **Template reusability:** Adapt codebase as boilerplate for other events
  - **Rationale:** Reduce time for future celebrations (birthdays, anniversaries)
  - **Effort:** 3-5 days (abstract couple data, event data, colors)
  - **Deliverable:** Parameterized template repo
  - **Example:** `event-data.js` instead of `wedding-data.js`

- **Build pipeline setup:** Gulp/Webpack to generate minified output
  - **Rationale:** Automated minification, source maps for debugging
  - **Effort:** 2-3 days
  - **Deliverable:** `gulpfile.js` or `webpack.config.js`

- **Analytics integration:** Firebase Analytics or Google Analytics
  - **Rationale:** Track guest engagement, page views, RSVP trends
  - **Effort:** 1 day
  - **Deliverable:** Analytics code, dashboard

- **Firestore security hardening:** Implement rate limiting, access rules
  - **Rationale:** Prevent spam, unauthorized access
  - **Effort:** 1-2 days
  - **Deliverable:** Updated Firestore rules, spam filters

### Long-Term (3-6 months)
- **Internationalization (i18n):** Support Vietnamese + English (or other languages)
  - **Rationale:** Make template reusable globally
  - **Effort:** 5-7 days
  - **Deliverable:** Language switcher, translation strings
  - **Tech:** react-i18next or vanilla JS i18n library

- **Admin dashboard:** Backend UI to manage guests, RSVPs, wishes
  - **Rationale:** Easier event management, data export, analytics
  - **Effort:** 1-2 weeks (requires backend service)
  - **Deliverable:** Separate admin portal (or Firebase console tutorials)
  - **Architecture:** Firebase Cloud Functions + React admin app

- **Progressive Web App (PWA):** Offline support, installable
  - **Rationale:** Better UX, faster repeat visits
  - **Effort:** 3-5 days
  - **Deliverable:** Service worker, manifest.json, offline fallback

- **Email notifications:** Send confirmation emails to guests
  - **Rationale:** Better UX, reduce confusion
  - **Effort:** 2-3 days
  - **Deliverable:** Firebase Cloud Functions, SendGrid integration

## Not Planned (Out of Scope)

| Feature | Reason |
|---------|--------|
| Server-side rendering | Static site philosophy; adds complexity |
| User authentication | Public event; no login required |
| Payment processing | Donation via QR codes sufficient |
| Mobile app (iOS/Android) | Web app covers all needs; app store approval overhead |
| Multi-language auto-translation | Manual translation sufficient for targeted audience |
| Advanced analytics (Google Analytics 4) | Basic Firebase Analytics sufficient for now |
| Email campaigns | One-time event; not needed |
| Ticketing/seat assignment | Informal event; not applicable |

## Decision Log

| Date | Decision | Rationale | Owner |
|------|----------|-----------|-------|
| Oct 2024 | Use GitHub Pages (no backend) | Simplicity, cost ($0), reliability, no maintenance burden |  Couple |
| Oct 2024 | Minify source | Performance, protection against casual inspection | Dev |
| Oct 2024 | Firebase Firestore (public key in client) | Acceptable for web apps; security via rules, not key secrecy | Dev |
| Oct 2024 | Static SPA (no build pipeline) | Reduce complexity, no DevOps overhead | Dev |
| June 2026 | Create documentation | Enable future reuse, knowledge preservation | Dev |

## Success Metrics (Post-Event)

| Metric | Target | Status |
|--------|--------|--------|
| **Site uptime** | 99%+ | Expected; GitHub Pages SLA |
| **Page load time** | < 3s on 4G | Achieved (minified, optimized) |
| **Mobile responsive** | All sections pass mobile | Achieved (Bootstrap 5) |
| **RSVP submissions** | Tracked & persisted | Achieved; Firestore working |
| **Real-time wishes** | Appear without refresh | Achieved; listeners working |
| **Gallery** | All 36 images load | Achieved; WebP optimized |
| **Accessibility** | WCAG 2.1 AA (best effort) | Partial (no automated testing) |
| **Zero critical bugs** | No crashes, errors in console | Ongoing; no bugs reported |

## Budget & Resources

### Actual Costs (Phase 1-2)
| Item | Cost | Justification |
|------|------|--------------|
| **Domain (optional)** | $0 | Using GitHub Pages subdomain |
| **Hosting (GitHub Pages)** | $0 | Free tier sufficient |
| **Firebase (Firestore)** | $0 | Free tier (reads/writes within limits) |
| **CDN (jQuery, Bootstrap)** | $0 | Free CDNs (jsDelivr, unpkg) |
| **Developer time** | ~40 hours | Design, development, testing, optimization |
| **Total** | $0 | Free to couple ✅ |

### Ongoing Costs (Phase 3)
| Item | Cost | Notes |
|------|------|-------|
| **Hosting** | $0/month | GitHub Pages free |
| **Firebase** | $0-5/month | Free tier, minimal usage post-event |
| **Maintenance** | As-needed | Volunteer/owner time |
| **Total** | $0-5/month | Minimal cost ✅ |

## Risk Register

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|-----------|
| **GitHub/Firebase service outage** | Low | High | Unlikely; monitor status.github.com, status.firebase.google.com |
| **Firestore quota exceeded** | Low | Medium | Most likely post-event; upgrade to paid plan (~$25/month) |
| **Someone deletes Firestore data** | Low | High | No automated backups; manual export recommended |
| **Spam wishes/RSVPs** | Medium | Low | Add rate limiting, form validation (client-side ok for now) |
| **WebP incompatibility** | Very low | Low | WebP supported by 97% of browsers; Safari compat verified |
| **Minified code hard to fix** | Medium | Low | Create unminified source if bugs found; rebuild pipeline |
| **CDN down (jQuery, Bootstrap)** | Very low | High | Unlikely; use multiple CDN mirrors or vendor locally |
| **Firebase credentials rotated** | Low | Medium | Credentials stored in `firebase-config.js`; re-generate if needed |

## Stakeholders & Communication

| Stakeholder | Role | Update Frequency |
|-------------|------|-----------------|
| **Couple (Phúc Anh & Ngọc)** | Project owner | As-needed; no regular updates expected |
| **Guests** | End users | N/A; one-time visitors post-event |
| **Developer (anhlp)** | Maintainer | Ad-hoc; no scheduled maintenance |
| **GitHub** | Hosting provider | Automatic; no action needed |
| **Firebase** | Backend provider | Automatic; no action needed |

## Release Notes

### Version 1.0 (24 Nov 2024)
- Initial launch for wedding event
- 36-photo gallery
- RSVP form + real-time tracking
- Guestbook with emoji picker
- Donation integration
- Love story timeline
- Countdown timer
- Snow effect animations

### Version 1.1 (Dec 2024)
- Safari audio preload fix
- Favicon update
- HTML/CSS/JS minification (40% reduction)
- Image optimization to WebP
- Form validation enhancements

### Version 1.2 (Future)
- Documentation suite (this file)
- Potential unminification + build pipeline
- CI/CD setup (GitHub Actions)
- Admin dashboard (if needed)
- Template reusability enhancements

## Next Steps for Maintainers

1. **Review this roadmap** — Understand project history and future direction
2. **Read other docs** — Familiarize with architecture, code standards, deployment
3. **Set up local dev** — Clone repo, run local server, test changes
4. **Monitor production** — Occasional performance/uptime checks
5. **Respond to issues** — If guests report problems, follow deployment guide for fixes
6. **Plan enhancements** — When ready, refer to "Future Enhancements" section

---

**Last Updated:** June 2026  
**Next Review:** June 2027 (annual)  
**Owner:** Lê Phúc Anh & development team
