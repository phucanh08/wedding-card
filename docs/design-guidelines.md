# Design Guidelines

## Visual Design Philosophy

The wedding card is a **mobile-first, elegant, modern design** that celebrates the couple with:
- **Simplicity:** Clean layouts, minimal clutter
- **Elegance:** Refined typography, soft animations, romantic color palette
- **Accessibility:** High contrast, readable fonts, touch-friendly interactive elements
- **Performance:** Optimized images, smooth animations, fast load times
- **Emotion:** Snow effects, countdown timer, love story narrative create emotional resonance

## Color Palette

| Color | Hex | Usage | Notes |
|-------|-----|-------|-------|
| **Primary Blue** | `#0d6efd` | Buttons, links, accents | Bootstrap default |
| **Accent Red** | `#de4659` | Buttons, borders, scroll indicator | Romantic, eye-catching |
| **Dark Text** | `#333` or `#000` | Body text, headings | High contrast |
| **Light Background** | `#f8f9fa` | Card backgrounds, sections | Soft, non-white |
| **White** | `#fff` | Card foreground, modals | Clean, bright |
| **Gray** | `#6c757d` | Secondary text, disabled states | Bootstrap gray |
| **Success Green** | `#198754` | Form validation, success messages | Standard bootstrap |

### Color Usage Rules
- **Red accent** should pop on white/light backgrounds
- **Dark text** on light backgrounds for readability (4.5:1 contrast minimum)
- **Avoid color-only differentiation** — use text, icons, or patterns in addition
- **Mobile/low-light testing:** Ensure colors accessible on dim screens

## Typography

### Font Families (Inlined as @font-face)

| Font | Style | Usage | Weight |
|------|-------|-------|--------|
| **Bellota Text** | Display | Headings, section titles, couple names | 400, 700 |
| **Bonheur Royale** | Decorative | Accent text, ornamental elements | 400 (italic) |
| **Marmelad** | Serif | Body text, descriptions, timeline | 400 |
| **System Sans** | Fallback | Button labels, UI text (if font fails) | 400, 700 |

### Font Sizes & Hierarchy

| Element | Size | Weight | Line Height | Usage |
|---------|------|--------|-------------|-------|
| **H1 (Section Title)** | 2.5rem (40px) | 700 | 1.2 | `#couple .title`, `#story h1` |
| **H2 (Subsection)** | 1.875rem (30px) | 700 | 1.3 | Timeline headers, card titles |
| **H3 (Small Title)** | 1.5rem (24px) | 700 | 1.4 | Gallery section label |
| **Body Text** | 1rem (16px) | 400 | 1.6 | Paragraphs, descriptions |
| **Small Text** | 0.875rem (14px) | 400 | 1.5 | Form labels, metadata, captions |
| **Button Text** | 1rem (16px) | 700 | 1.5 | CTA buttons, form submit |

### Typography Best Practices
- **Hierarchy:** Large titles → Medium headings → Body text → Small captions
- **Line height:** 1.6 for body (readability), 1.2-1.4 for headings (tightness)
- **Spacing:** Generous margins between sections (3rem+)
- **Alignment:** Left-aligned body text (except centered titles)
- **Decoration:** Italics for emphasis, **bold for importance**

## Layout & Spacing

### Responsive Breakpoints

| Breakpoint | Width | Device | Grid Cols | Font Scale |
|------------|-------|--------|-----------|-----------|
| **Mobile** | ≤576px | Phone | 1 col | 100% |
| **Tablet** | 576-768px | Small tablet | 2 col | 110% |
| **Desktop** | ≥1200px | Large screen | 3+ col | 120% |

### Section Padding & Margins

```css
section {
  padding: 3rem 1rem; /* vertical: 48px, horizontal: 16px on mobile */
}

@media (min-width: 768px) {
  section {
    padding: 4rem 2rem; /* 64px vertical, 32px horizontal on tablet */
  }
}

@media (min-width: 1200px) {
  section {
    padding: 5rem 3rem; /* 80px vertical, 48px horizontal on desktop */
  }
}
```

### Spacing Scale (Used throughout)
- **xs:** 0.5rem (8px)
- **sm:** 1rem (16px)
- **md:** 1.5rem (24px)
- **lg:** 2rem (32px)
- **xl:** 3rem (48px)
- **2xl:** 4rem (64px)

Use Bootstrap utility classes: `.mb-3` (margin-bottom 1rem), `.p-4` (padding 1.5rem), etc.

## Component Design

### Buttons

**Primary Button (CTA)**
```html
<button class="btn btn-primary btn-lg">
  RSVP Now
</button>
```
- Background: `#0d6efd` (Bootstrap blue)
- Text: White
- Padding: 12px 24px (sm) → 16px 32px (lg)
- Border radius: 6px (rounded corners)
- Hover: Darker shade (`#0b5ed7`)
- Focus: Visible outline
- Mobile: Touch-target min 44x44px

**Accent Button (Secondary)**
```html
<button class="btn btn-outline-danger">
  Learn More
</button>
```
- Border: `#de4659` (red accent)
- Text: Red accent
- Background: Transparent
- Hover: Light red background
- Focus: Visible outline

### Cards

**Photo Gallery Card**
```html
<div class="gallery-item card">
  <img src="large.webp" alt="Gallery photo" loading="lazy">
  <p class="card-title">Photo Title (optional)</p>
</div>
```
- Background: White
- Border: None or 1px `#ddd`
- Shadow: `0 2px 8px rgba(0, 0, 0, 0.1)`
- Hover: Lift effect (`transform: translateY(-4px)`)
- Padding: 0 (images flush with edge)
- Border radius: 8px

**Event Card**
```html
<div class="event-card card">
  <h3>Ceremony</h3>
  <p>Time, location, description</p>
</div>
```
- Background: Light gray (`#f8f9fa`)
- Padding: 1.5rem
- Border: Left accent red border (`4px solid #de4659`)
- Text: Dark (`#333`)

**Wish/Guestbook Card**
```html
<div class="wish-item card">
  <p class="wish-text">"Guest message"</p>
  <p class="wish-author">— Guest Name</p>
</div>
```
- Background: White
- Padding: 1rem
- Border: Top red accent (`3px solid #de4659`)
- Font: Italic quote text, smaller author
- Shadow: Subtle

### Forms

**Input Field**
```html
<input type="text" class="form-control" placeholder="Your name">
```
- Border: 1px `#ddd`
- Border-radius: 4px
- Padding: 0.5rem 0.75rem
- Font: 1rem
- Focus: Blue outline (`#0d6efd`)
- Mobile: Font size ≥16px (prevents zoom on iOS)

**Text Area (Wish/Message)**
```html
<textarea class="form-control" rows="4" placeholder="Your message..."></textarea>
```
- Same as input, but taller
- Allow resize (vertical only, not horizontal)
- Include emoji picker button overlay

**Validation States**
```css
.form-control.is-valid {
  border-color: #198754; /* green */
}
.form-control.is-invalid {
  border-color: #dc3545; /* red */
}
.invalid-feedback {
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}
```

### Modals

**RSVP Modal / Donate Modal**
```html
<div class="modal fade" id="rsvpModal">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5>Confirm Your Attendance</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">
        <!-- Form content -->
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
        <button class="btn btn-primary">Submit</button>
      </div>
    </div>
  </div>
</div>
```
- Background overlay: Semi-transparent black
- Modal width: 90% on mobile, 500px on desktop
- Border radius: 8px
- Box shadow: Elevated (`0 10px 40px rgba(0, 0, 0, 0.2)`)
- Close button: Top-right corner
- Padding: 1.5rem (body), 1rem (header/footer)

### Navigation & Menu

**Floating Action Menu**
```html
<div id="menu-access" class="floating-menu">
  <button class="menu-icon">☰</button>
  <div class="menu-items">
    <a href="#rsvp-form">RSVP</a>
    <a href="#donate">Donate</a>
    <a href="#wishes">Wishes</a>
  </div>
</div>
```
- Position: Fixed, bottom-right corner
- Size: 60px diameter (mobile), 80px (desktop)
- Background: Red accent (`#de4659`)
- Icon: White, centered
- Hover: Pulse/shake animation
- Animation: Smooth expand on click
- Accessibility: Keyboard accessible (Tab, Enter)

**Scroll Indicator** (Mobile only)
```html
<div class="scroll-indicator">
  <p>Kéo xuống</p>
  <svg class="arrow"></svg>
</div>
```
- Position: Bottom center of hero section
- Color: Red accent (`#de4659`)
- Animation: Bounce down infinitely
- Hide after: First scroll event
- Mobile only: Disappears on tablet+

## Animation & Motion

### Scroll Animations (AOS Library)

```html
<div data-aos="fade-in">Fade in on scroll</div>
<div data-aos="slide-up">Slide up on scroll</div>
<div data-aos="zoom-in">Zoom in on scroll</div>
<div data-aos="flip-left">Flip on scroll</div>
```

**AOS Configuration:**
```javascript
AOS.init({
  duration: 1000,      // Animation length (ms)
  easing: 'ease-in-out',
  once: true,          // Animate only once
  offset: 100          // Trigger 100px before element in view
});
```

**Recommended animations:**
- **Headings:** `fade-in`, `slide-up`
- **Cards:** `zoom-in`, `fade-in`
- **Images:** `slide-left`, `slide-right`
- **Text:** `fade-in` (with stagger on lists)

### Snow Effect

```css
@keyframes fall {
  0% { transform: translateY(-100vh) translateX(0); opacity: 1; }
  100% { transform: translateY(100vh) translateX(100px); opacity: 0; }
}

.snowflake {
  animation: fall linear infinite;
  animation-duration: 10s to 20s (random);
}
```

**Characteristics:**
- Gentle, continuous animation
- White snowflakes (`#fff` with opacity 0.8)
- Vary size (2px to 10px diameter)
- Vary duration (10s to 20s) for depth
- Deactivate on performance-low devices

### Countdown Timer Animation

**Digital clock style:**
```css
.timer-digit {
  font-family: monospace;
  font-size: 2rem;
  font-weight: bold;
  color: #de4659;
  transition: all 0.3s ease;
}

.timer-digit.change {
  animation: flip 0.5s ease-in-out;
}

@keyframes flip {
  0% { transform: rotateX(0deg); }
  50% { transform: rotateX(90deg); }
  100% { transform: rotateX(0deg); }
}
```

**Format:** `DD days HH hours MM minutes SS seconds`

### Hover Effects

**Button Hover:**
- Color transition: 200ms ease
- Scale up slightly: `transform: scale(1.05)`

**Card Hover:**
- Lift effect: `transform: translateY(-4px)`
- Shadow increase: Amplify drop shadow
- Duration: 300ms ease

**Link Hover:**
- Color change to accent red
- Underline appears
- Duration: 150ms ease

## Image Design

### Photo Gallery Requirements

**Resolution:**
- **Small (thumbnail):** 400-600px wide @ 72 dpi
- **Large (lightbox):** 1500-2000px wide @ 72 dpi
- **Aspect ratio:** Prefer 16:9 or square (flexible)

**Format:**
- **WebP exclusively** (not PNG or JPEG)
- **Quality:** 80% (balance file size & appearance)
- **File size targets:**
  - Small: 50-100 KB
  - Large: 300-500 KB

**Optimization Tool:**
```bash
# Using cwebp (if installed)
cwebp -q 80 photo.jpg -o photo.webp
```

### Metadata Images

| Image | Size | Purpose | Aspect Ratio |
|-------|------|---------|--------------|
| **Favicon** | 32x32 | Browser tab | Square |
| **OG Image** | 1200x630 | Social media | 1.9:1 |
| **Hero** | 1500x500 | Mobile hero | Varies |
| **Portrait (groom/bride)** | 400x400 | Profile card | Square |
| **QR Code** | 300x300 | Donation modal | Square |

### Image Best Practices
- **Lazy-load:** Use `loading="lazy"` attribute
- **Alt text:** Descriptive, concise: `alt="Wedding couple at ceremony"`
- **Aspect ratio:** Define `aspect-ratio: 16/9` to prevent layout shift
- **Responsive images:** Use `srcset` for multiple resolutions (optional, WebP can be flexible)

## Dark Mode (Optional)

Current design is light-mode only. If dark mode is desired:

```css
/* Dark mode variables */
@media (prefers-color-scheme: dark) {
  :root {
    --bg-color: #1a1a1a;
    --text-color: #fff;
    --card-bg: #2d2d2d;
    --border-color: #444;
  }
  
  body {
    background-color: var(--bg-color);
    color: var(--text-color);
  }
  
  .card {
    background-color: var(--card-bg);
    border-color: var(--border-color);
  }
}
```

## Accessibility Design

### Color Contrast
- **Body text on light background:** 4.5:1 (WCAG AA)
- **Button text on colored background:** 3:1 minimum
- **Decorative elements:** No contrast requirement

**Test with:** WebAIM contrast checker or Lighthouse audit

### Focus States
All interactive elements must have visible focus:
```css
button:focus,
a:focus,
input:focus {
  outline: 3px solid #0d6efd;
  outline-offset: 2px;
}
```

### Touch Targets
- **Minimum size:** 44x44px (iOS recommendation)
- **Spacing:** 8px gap between touch targets
- Applied to: buttons, links, form inputs, gallery items

### Motion Sensitivity
Respect user motion preferences:
```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Mobile-First Approach

### Base Styles (Mobile, ≤576px)
- 1 column layout
- Full-width images
- Larger touch targets (44px minimum)
- Stacked form fields
- Smaller font sizes (but readable ≥14px)
- Minimal padding (space constrained)

### Tablet Enhancements (577-1199px)
- 2 column layout where appropriate
- Moderate padding
- Medium-sized images
- Side-by-side form fields

### Desktop Optimizations (≥1200px)
- 3+ column grid
- Generous padding and margins
- Larger images and hero sections
- Multi-column content
- Landscape-oriented layouts

### Mobile Navigation
- Hamburger menu (floating action menu)
- Tap-friendly buttons (not hover states)
- Avoid hover-dependent functionality
- Full-height modals (not centered)

## Print Style (Optional)

If guests want to print the invitation:

```css
@media print {
  body {
    background: white;
    color: black;
  }
  
  .no-print {
    display: none; /* Hide buttons, modals, etc. */
  }
  
  a {
    text-decoration: underline;
    color: blue;
  }
  
  section {
    page-break-inside: avoid; /* Keep sections together */
  }
}
```

## Design Evolution & Updates

### Adding New Sections
1. Follow existing color palette and typography
2. Use Bootstrap grid (`.row`, `.col-*`)
3. Add AOS animations for visual consistency
4. Test on mobile, tablet, desktop
5. Ensure touch targets ≥44px

### Updating Images
1. Optimize to WebP format
2. Provide `large.webp` and `small.webp` versions
3. Add descriptive alt text
4. Test on low-bandwidth connections (4G)

### Changing Colors
1. Update CSS variable in `style.css`
2. Propagate to all components (buttons, borders, text)
3. Verify contrast ratio (≥4.5:1 for body text)
4. Test on colorblind users (deuteranopia, protanopia)

---

**Last Updated:** June 2026  
**Design Version:** 1.0  
**Figma/Mockup:** (If design files exist, link here)
