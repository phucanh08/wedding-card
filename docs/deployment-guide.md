# Deployment Guide

## Overview

This project is deployed via **GitHub Pages**, with the `docs/` directory as the source root. Deployment is automatic and instant: push to `main` → GitHub Pages serves changes immediately.

## Deployment Architecture

```
┌─────────────────────────────────────────────────────────┐
│          Local Development (Your Machine)               │
│  ┌─────────────────────────────────────────────────────┐
│  │ Edit files in docs/                                 │
│  │ Test locally: python3 -m http.server 8080 ...       │
│  │ Commit & push: git push origin main                 │
│  └─────────────────────────────────────────────────────┘
│                         │
│                         ↓
│  ┌─────────────────────────────────────────────────────┐
│  │ GitHub Repository (phucanh08/wedding-card)          │
│  │ ├─ main branch                                      │
│  │ └─ docs/ directory (GitHub Pages source)            │
│  └─────────────────────────────────────────────────────┘
│                         │
│                         ↓
│  ┌─────────────────────────────────────────────────────┐
│  │ GitHub Pages (Automatic on Push)                    │
│  │ Build: None (static files only)                     │
│  │ Source: docs/                                       │
│  │ URL: https://phucanh08.github.io/wedding-card/      │
│  └─────────────────────────────────────────────────────┘
│                         │
│                         ↓
│  ┌─────────────────────────────────────────────────────┐
│  │ CDN & Browser Cache                                 │
│  │ (GitHub Pages has built-in CDN/caching)             │
│  └─────────────────────────────────────────────────────┘
└─────────────────────────────────────────────────────────┘
```

## Local Development Setup

### Prerequisites
- Git installed
- Python 3 or Node.js (for local server)
- Code editor (VS Code, Sublime, etc.)
- Browser (Chrome, Firefox, Safari, Edge)

### Clone Repository
```bash
git clone https://github.com/phucanh08/wedding-card.git
cd wedding-card
```

### Start Local Server

**Option 1: Python (Recommended)**
```bash
python3 -m http.server 8080 --directory docs
```
Then open: `http://localhost:8080`

**Option 2: Node.js (if installed)**
```bash
npx http-server docs
```
Then open: `http://localhost:8080` (default) or URL shown in output

**Option 3: Docker (if available)**
```bash
docker run -p 8080:80 -v $(pwd)/docs:/usr/share/nginx/html nginx:alpine
```
Then open: `http://localhost:8080`

### Verify Local Setup
- [ ] Page loads without errors (console clean)
- [ ] All sections visible (scroll down)
- [ ] Firebase not initialized (expected on localhost, no Firestore connection)
- [ ] Images load (.webp format)
- [ ] Styles applied correctly
- [ ] JavaScript runs (console should show Firebase config error, which is ok)

## Code Changes & Testing Workflow

### 1. Make Changes
Edit files in `docs/` directory:
```bash
# Example: update couple data
nano docs/wedding-data.js
```

### 2. Test Locally
```bash
# 1. Start local server
python3 -m http.server 8080 --directory docs

# 2. Open browser to http://localhost:8080
# 3. Test all sections, forms, gallery
# 4. Check browser console for errors (Ctrl+Shift+J)
```

### 3. Commit Changes
```bash
git add docs/[changed-files]
git commit -m "feat: description of change"
```

### 4. Push to GitHub
```bash
git push origin main
```

## GitHub Pages Deployment

### Automatic Deployment
GitHub Pages automatically deploys when you push to `main`:
1. You push to `main` branch
2. GitHub detects change in `docs/` directory
3. GitHub Pages re-builds (static files only, no build step)
4. Changes live within 30-60 seconds
5. Cache may take 5-10 minutes to fully propagate globally

### GitHub Pages Settings

To verify deployment is configured correctly:

1. Go to GitHub repository: https://github.com/phucanh08/wedding-card
2. Click **Settings** → **Pages**
3. Verify:
   - **Source:** Deploy from a branch
   - **Branch:** `main` / `docs/` folder
   - **Custom domain:** (optional) If using custom domain

### View Deployment Status
```bash
# Check GitHub CLI (if installed)
gh repo view phucanh08/wedding-card --json deployments
```

Or navigate to: https://github.com/phucanh08/wedding-card/deployments

## File Structure for Deployment

Only files in `docs/` are deployed. Ensure structure is correct:

```
docs/
├── index.html                    # Must exist and be valid
├── wedding-data.js
├── firebase-config.js
├── templates/
│   └── template135/
│       ├── css/
│       ├── js/
│       ├── fonts/
│       └── img/
├── common/
│   ├── calendar.css
│   ├── calendar.js
│   └── emoji-picker/
├── components/
│   └── mouse-scroll-on-mobile.html
└── assets/
    ├── images/
    │   ├── galleries/
    │   │   ├── pic1/ … pic36/
    │   │   └── [other images]
    │   └── musics/
```

**Critical files:**
- `index.html` must exist and be valid (GitHub Pages serves this as default)
- All referenced assets (CSS, JS, images) must exist
- Relative paths must be correct (e.g., `./assets/images/...`)

## Pre-Deployment Checklist

Before pushing to `main`:

- [ ] **HTML valid:** No syntax errors in `index.html`
- [ ] **No broken links:** Check all relative paths are correct
- [ ] **Images present:** All `.webp` files in `assets/images/` exist
- [ ] **JavaScript syntax:** No unclosed brackets or quotes
- [ ] **Local test passed:** Page loads and functions work on localhost
- [ ] **Firebase credentials:** Config in `firebase-config.js` is correct (shouldn't change)
- [ ] **No secrets committed:** No API keys, passwords, or sensitive data in `docs/`
- [ ] **Minification complete:** If changed JS/CSS, ensure minified versions are included
- [ ] **Mobile responsive:** Test on phone/tablet before deploy
- [ ] **Console clean:** No JavaScript errors in browser console

## Handling Deployment Issues

### Issue: Page not updating after push

**Cause:** GitHub Pages cache, browser cache, or DNS propagation delay

**Solution:**
1. Hard refresh: `Ctrl+Shift+R` (or `Cmd+Shift+R` on Mac)
2. Clear browser cache: DevTools → Application → Clear Storage
3. Wait 5-10 minutes for global CDN to propagate
4. Verify push succeeded: `git log --oneline | head -1` should show your commit

### Issue: CSS/JS not loading

**Cause:** Minified versions not included, or relative path incorrect

**Solution:**
1. Check file exists: `ls -la docs/templates/template135/css/style.css`
2. Check HTML references correct path: `<link href="./templates/template135/css/style.css">`
3. Ensure `.css` and `.js` files are in `docs/` (not in repo root)
4. Deploy again after fixing paths

### Issue: Images not displaying

**Cause:** WebP format not supported (unlikely modern browsers), or image path incorrect

**Solution:**
1. Check images exist: `ls -la docs/assets/images/galleries/pic1/large.webp`
2. Check HTML/JS references correct path: `./assets/images/galleries/pic1/large.webp`
3. Verify WebP format: `file docs/assets/images/galleries/pic1/large.webp` (should show WebP)
4. If browser doesn't support WebP, add fallback (requires code change)

### Issue: Firebase not connecting (localhost ok, production fails)

**Cause:** Firebase Firestore rules may be too restrictive, or network issue

**Solution:**
1. Check Firebase project settings: `wedding-card-cdcce` (asia-southeast1)
2. Verify Firestore rules allow public read/write (if guest submission is enabled)
3. Check browser console for Firebase errors: `Ctrl+Shift+J`
4. Verify API key in `firebase-config.js` matches Firebase project
5. Check Firebase project isn't deleted or disabled

### Issue: RSVP/wishes not persisting

**Cause:** Firestore rules deny writes, or Firebase not initialized

**Solution:**
1. Check Firestore rules in Firebase Console (project: wedding-card-cdcce)
2. Rules should allow `write: if true;` for public collections (or specific rule)
3. Check browser console for error messages
4. Test locally with valid Firebase credentials
5. Verify collection names match: `guests`, `rsvp`, `wishes`

## Performance Optimization

### Current Optimizations
- **Minified assets:** All CSS/JS minified
- **WebP images:** 30-50% smaller than PNG/JPEG
- **Inline CSS/JS:** Reduces HTTP requests
- **Inlined fonts:** @font-face embedded, no network delay
- **Lazy-loading:** Images lazy-load via browser native (if implemented)
- **GitHub Pages CDN:** Free global CDN included

### Load Testing
Test performance locally:
```bash
# Using curl (measure response time)
curl -o /dev/null -s -w "Time: %{time_total}s\n" https://phucanh08.github.io/wedding-card/

# Using Lighthouse (in Chrome DevTools)
# 1. Open DevTools (F12)
# 2. Click "Lighthouse" tab
# 3. Click "Generate report"
# 4. Note performance score and metrics
```

### Performance Targets
- **First Contentful Paint (FCP):** < 2s
- **Largest Contentful Paint (LCP):** < 3s
- **Cumulative Layout Shift (CLS):** < 0.1
- **Total bundle size:** < 2 MB (minified, excl. images)

## Security Considerations

### Firebase API Key
- **Public key in `firebase-config.js` is normal** for Firebase web apps
- Security is enforced via **Firestore rules**, not key secrecy
- Key rotation: Only needed if compromised; Firebase handles rotation transparently

### Firestore Rules
Ensure rules in Firebase Console restrict access appropriately:
- **guests collection:** Read-only (pre-loaded list)
- **rsvp collection:** Public write (guest submissions)
- **wishes collection:** Public write (guestbook entries)

### HTTPS
- GitHub Pages serves **HTTPS by default** — all traffic encrypted
- No HTTP option available (good for security)

### Devtools Blocking
- `index.html` disables right-click and devtools shortcuts (cosmetic)
- Not a security measure; determined users can bypass
- Purpose: Prevent accidental code/data exposure

## Maintenance & Updates

### Regular Tasks
- **Monthly:** Check GitHub repository for security alerts
- **Quarterly:** Update Firebase credentials if rotated
- **Post-event:** Archive wishes/RSVP data (backup Firestore collections)
- **Annually:** Review & update documentation if codebase changes

### Content Updates
To update couple names, dates, or metadata:
1. Edit `docs/wedding-data.js`
2. Update `docs/index.html` if sections change
3. Test locally
4. Commit & push

### Backup Strategy
- GitHub repository is backed up automatically
- **Firestore data backup:**
  1. Go to Firebase Console: https://console.firebase.google.com/
  2. Project: wedding-card-cdcce
  3. Firestore Database → Manage exports
  4. Export collections to Google Cloud Storage (optional)

## Rollback Procedure

If changes break the site:

```bash
# 1. Identify the problematic commit
git log --oneline | head -5

# 2. Revert to previous commit
git revert <commit-hash>  # Creates new commit that undoes changes

# 3. Push reverted commit
git push origin main

# 4. Site reverts automatically within 1 minute
```

**Note:** `git revert` is safer than `git reset --hard` (preserves history).

## Custom Domain (Optional)

If hosting on custom domain instead of `phucanh08.github.io/wedding-card/`:

1. Go to GitHub → Repository Settings → Pages
2. Enter custom domain in "Custom domain" field
3. Create CNAME file: `echo "example.com" > docs/CNAME`
4. Commit and push
5. Configure DNS (add CNAME or A records pointing to GitHub Pages)
6. GitHub automatically provisions HTTPS certificate

## Monitoring & Analytics (Optional)

### GitHub Pages Stats
- GitHub provides minimal built-in analytics
- Check deployments: https://github.com/phucanh08/wedding-card/deployments

### Firebase Analytics (Optional)
Enable in Firebase Console to track:
- Page views
- Event submissions (RSVP, wishes)
- User engagement
- Browser/device breakdown

### External Analytics (Optional)
Add Google Analytics for detailed insights:
```html
<!-- Add to <head> in index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## Troubleshooting Checklist

| Issue | Check | Solution |
|-------|-------|----------|
| Page blank | Is `index.html` valid? | Fix HTML syntax, re-deploy |
| 404 errors | Do files exist in `docs/`? | Add missing files, commit |
| Styles missing | Is CSS path correct? | Verify `./templates/template135/css/` |
| Images broken | Are .webp files present? | Verify `./assets/images/` paths |
| Forms not working | Is Firebase configured? | Check `firebase-config.js`, credentials |
| Real-time wishes fail | Are Firestore rules set? | Update rules in Firebase Console |
| Slow performance | Page size too large? | Minify, optimize images, defer JS |
| HTTPS warning | Is site served via HTTPS? | GitHub Pages always uses HTTPS |

---

**Last Updated:** June 2026  
**Live URL:** https://phucanh08.github.io/wedding-card/  
**Deployment Method:** GitHub Pages (automatic on push to main)
