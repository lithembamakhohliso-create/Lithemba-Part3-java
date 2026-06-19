# Easy Event Hire — Website

**Student:** Lithemba Makhohliso  
**Module:** WEDE (Web Development)  
**Part:** 3 (Final Submission)

## Project Overview
A multi-page website for Easy Event Hire, a local event equipment hire business based in Gqeberha (Port Elizabeth), Eastern Cape.

## Pages
- `index.html` — Home page with hero, services preview, FAQ accordion
- `about.html` — About the business, mission, values, team
- `services.html` — Full services listing with search/filter and gallery lightbox
- `enquiry.html` — Quote enquiry form with instant price calculator
- `contact.html` — General contact form with map embed

## Technologies Used
- HTML5, CSS3, Vanilla JavaScript (ES6+)
- Google Fonts (Poppins, Open Sans)
- Google Maps Embed API
- IntersectionObserver API for scroll animations

---

## Changelog

### Part 3 Additions (2026-06-18)

#### JavaScript Enhancements (Section 2)
- **Hamburger/mobile navigation**: Added a responsive hamburger button (`main.js`) that toggles the nav on screens under 768px using `classList.toggle`.
- **Active nav link**: JavaScript checks `location.href` against each nav link and adds an `active` class to highlight the current page.
- **Scroll fade-in animations**: Used `IntersectionObserver` to apply `.visible` class to `.fade-in` elements as they enter the viewport, creating smooth scroll animations.
- **FAQ Accordion (`index.html`)**: Built a fully accessible accordion component. Clicking a question expands the answer; clicking again or clicking a different question collapses it. Uses `max-height` CSS transition for smooth animation.
- **Gallery with Lightbox (`services.html`)**: Implemented a custom lightbox modal on the Services page. Clicking a gallery item opens a full overlay with the image caption. Supports keyboard (Escape to close), click-outside-to-close, and ARIA roles for accessibility.
- **Service Search Filter (`services.html`)**: Added a live text search input that filters service cards by matching the query against `data-keywords` attributes and card titles using JavaScript `includes()`. Shows a "no results" message when no cards match, and a clear button appears when a query is active.
- **Quote Calculator (`enquiry.js`)**: On valid enquiry form submission, JavaScript reads the selected service, guest count, and date to dynamically calculate base price, VAT (15%), and total using a pricing lookup object (`PRICING`). Results are injected into a styled quote breakdown panel with `textContent` assignments.
- **`mailto:` compilation (`contact.js`)**: On valid contact form submission, JavaScript builds a formatted email body and subject from form fields and opens the user's mail client via `window.location.href = 'mailto:...'` with all fields pre-populated.

#### SEO Improvements (Section 3)
- Added descriptive `<title>` tags to every page (includes page name, brand, location).
- Added `<meta name="description">` to every page with relevant, keyword-rich descriptions.
- Added `<meta name="keywords">` to every page with locally relevant keywords (Gqeberha, Port Elizabeth, Eastern Cape).
- Added `<meta name="robots" content="index, follow">` to all pages.
- Added `<meta name="author">` to all pages.
- Added `<link rel="canonical">` to every page to prevent duplicate content.
- Added Open Graph meta tags (`og:title`, `og:description`, `og:type`, `og:url`) to `index.html`.
- Ensured all pages use correct heading hierarchy: one `<h1>` per page, followed by `<h2>` and `<h3>` as needed.
- All images use descriptive `alt` text.
- All URLs are clean and descriptive (e.g. `services.html`, `enquiry.html`).
- Added internal linking between all pages via navigation and in-page CTAs.
- Created `robots.txt` with crawl instructions and sitemap reference.
- Created `sitemap.xml` listing all 5 pages with `<loc>`, `<lastmod>`, `<changefreq>`, and `<priority>`.
- CSS uses Google Fonts via CDN (preconnected), minimising render-blocking.
- Used `loading="lazy"` on the Google Maps iframe for faster page load.
- Added `prefers-reduced-motion` media query in CSS to respect accessibility settings.
- Responsive design confirmed: fluid grid, mobile nav, and form layout adjustments at 768px.

#### Form Functionality and Validation (Section 4)

**enquiry.html / enquiry.js:**
- Form collects: full name, email, phone, event date, service type, expected guests, venue, additional notes.
- HTML5 `required`, `type="email"`, `type="tel"`, `type="date"`, `min`/`max` attributes provide browser-level hints.
- JavaScript validation (`validate()` function) checks: name ≥ 2 chars, email regex (`/^[^\s@]+@[^\s@]+\.[^\s@]+$/`), phone regex (9–15 digits/characters), event date must be in the future, service must be selected, guests between 1–2000.
- On validation failure: specific `error-msg` spans are shown next to each invalid field; the field receives an `.error` CSS class (red border).
- On success: `buildQuote()` calculates price using the `PRICING` object and scales cost for extra guests. Populates a quote result panel with all fields. A success confirmation banner is shown.
- Form uses `e.preventDefault()` to prevent default page reload.

**contact.html / contact.js:**
- Form collects: full name, email, phone, message type (select), message text.
- JavaScript validation: name ≥ 2 chars, email regex, phone regex (9–15 digits), message type required, message ≥ 10 characters.
- On validation failure: inline error messages displayed per field.
- On success: JavaScript compiles form data into a `mailto:` URI with a pre-formatted email body and subject line, then opens the user's mail client via `window.location.href`. The form is reset and a success message is displayed.

#### Bug Fixes from Part 2 Feedback
- Fixed broken internal link in `enquiry.html` and `services.html` where `service.html` was referenced instead of `services.html`.
- Fixed unclosed `<label>` tag in original `enquiry.html` (label used as container for service input).
- Fixed duplicate `<link rel="stylesheet">` in `services.html`.
- Fixed `classs="..."` typo (triple 's') in `about.html`.
- Fixed missing closing `</div>` tags in `index.html` (service-card div was unclosed).
- Removed empty `<form>` element from `index.html`.
- Fixed footer placement in `index.html` (was outside `<body>` closing properly).
- Corrected `<body>` text-align override that was breaking layout.
- Removed duplicate/invalid CSS selectors (`.service-page.service-card` blocks with no declarations).
