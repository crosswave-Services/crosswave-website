# CROSSWAVE INTEGRATED SERVICES LIMITED — Corporate Website

*Connecting Businesses. Building Brands. Creating Opportunities.*

Static, fully responsive corporate website built with HTML5, CSS3, Bootstrap 5, jQuery and WOW.js. No build step is required.

## Run locally

Any static web server works. From the project root:

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>. Opening `index.html` directly also works, but a server is recommended so that forms and relative paths behave exactly as they will in production.

## Pages

| File | Purpose |
|---|---|
| `index.html` | Homepage: hero, who we are, core pillars, service portfolio, why CROSSWAVE, approach, sectors, CTA, enquiry form |
| `about.html` | Company profile, vision, mission, values, divisions, commitment |
| `service.html` | Full service directory (anchors: `#nafdac-regulatory`, `#pr-media-communication`, `#fashion-modeling-talent`, `#digital-marketing`, `#project-management`, `#logistics-haulage`) |
| `booking.html` | Request a Consultation form (supports `?service=nafdac|pr|digital|project|fashion|logistics|general` to pre-select a service) |
| `team.html` | Our People & Professional Network |
| `testimonial.html` | Our Commitment to Client Experience (a hidden, unpopulated testimonial component is reserved in the source) |
| `contact.html` | Contact form, contact details, map placeholder, social links |
| `404.html` | Not-found page |
| `services/_landing-page-template.html` | Starter shell for the future dedicated service landing pages (not linked, `noindex`) |

## Configuration required before launch

### 1. `js/config.js`

| Setting | What to do |
|---|---|
| `formEndpoint` | Add the URL that should receive enquiries (e.g. a Formspree/Getform/Basin form URL or your own server script). Until set, forms validate and then clearly tell the visitor the message has **not** been sent. |
| `social` | Add official Facebook, Instagram, LinkedIn and X URLs. Icons stay greyed out and unlinked until provided. |
| `mapEmbedUrl` | Paste the Google Maps embed `src` URL once the office address is confirmed. |
| `landingPages` | Set a key to `true` once its page exists in `/services/`. All cards, CTAs and menu items for that service then link to the dedicated page automatically. |

### 2. Placeholders in the HTML (search and replace)

- `[INSERT OFFICIAL BUSINESS ADDRESS]`
- `[INSERT OFFICIAL PHONE NUMBER]`
- `[INSERT OFFICIAL BUSINESS EMAIL]`
- `[INSERT CONFIRMED BUSINESS HOURS]` (contact page)
- `https://www.YOUR-DOMAIN.com` → the official domain (canonical URLs, Open Graph tags and structured data)

The contact details appear in the footer of every page, on the homepage contact section and on `contact.html`. When the address and phone number are confirmed, they can also be added to the `Organization` JSON-LD block in each page's `<head>`.

## Adding the dedicated service landing pages

1. Copy `services/_landing-page-template.html` to one of:
   - `services/nafdac-regulatory.html`
   - `services/pr-media-communication.html`
   - `services/fashion-modeling-talent.html`
2. Replace the bracketed text, set a unique title, description and canonical URL, and remove the `noindex` robots tag.
3. Set the matching `landingPages` entry in `js/config.js` to `true`.

The template already uses `../` paths and the shared header and footer.

## Brand assets (`img/`)

| File | Use |
|---|---|
| `crosswave-logo-original.png` | Logo exactly as supplied |
| `crosswave-logo.png` | Supplied logo with transparent padding trimmed (no other changes) |
| `crosswave-logo-640.png` | Web-sized version used in the header, footer and brand panels |
| `favicon.ico`, `favicon.png`, `apple-touch-icon.png` | Browser icons cut from the logo's wave emblem |
| `og-image.jpg` | 1200×630 social-sharing image |

Brand colours are defined as CSS variables at the top of `css/style.css` (`--cw-blue #0750A5`, `--cw-wave #00A3E0`, `--cw-navy #102B50`, `--cw-mist #F3F7FC`, `--cw-grey #65748B`).

## Photography

Section photography is loaded from Unsplash (free to use under the Unsplash License). Each image URL contains its Unsplash photo ID. If a remote image ever fails to load, the frame shows a branded blue panel instead of a broken image. For best performance and long-term reliability, download the final chosen images, compress them, save them to `img/` and update the `src` attributes.

## Libraries (`lib/`)

Bootstrap 5.0.2 JS bundle, jQuery 3.7.1, Bootstrap Icons 1.11.3, WOW.js, Animate.css and jQuery Easing are all stored locally. Only Google Fonts (Manrope and Inter) and the photographs load from external sources.

## Licence notice

The front-end was originally derived from a free HTML Codex template distributed under CC BY 4.0. See `LICENSE.txt` and `READ-ME.txt`. An attribution comment is kept in each page's source. That licence asks for a visible footer credit unless a Credit Removal License is purchased from HTML Codex, so review it before launch.
