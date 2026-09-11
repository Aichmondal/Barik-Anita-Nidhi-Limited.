# BARIK ANITA NIDHI LIMITED — Corporate Website

A modern, standalone, responsive corporate website recreation for **BARIK ANITA NIDHI LIMITED**, an active Indian Government Approved Nidhi Company (Non-Banking Financial Company - Nidhi).

* **Official Name**: BARIK ANITA NIDHI LIMITED
* **Tagline**: *Growing Together, Prospering Together*
* **Date of Incorporation**: 6th April, 2022
* **Corporate Identification Number (CIN)**: `U65990WB2022PLN252823`
* **Registration Number**: `252823`
* **ROC**: ROC Kolkata

---

## 1. Project Overview

This website is a clean, production-ready frontend built with **Vanilla TypeScript**, **HTML5**, **CSS3**, and **Vite**. It features:

- **100% Standalone Architecture**: No external iframe embeds or dependencies on third-party site builders.
- **Strict Brand Visual Language**: Deep Navy Blue (`#09275F`), Royal Blue (`#123B8C`), Emerald Green (`#20A65A`), and Gold Accents (`#F59E0B`) communicating financial trust and statutory compliance.
- **Dedicated Service Showcase**: Group Loans, Micro Business Loans, Product Loans, Recurring Deposits (RD), Fixed Deposits (FD), Monthly Income Schemes (MIS), Savings Accounts, and Upcoming Gold Loans.
- **Responsive Layout**: Precision-tuned breakpoints supporting 320px, 375px, 430px, 768px, 1024px, 1280px, and 1920px.
- **Accessibility & SEO**: Semantic tags, ARIA attributes, keyboard-navigable slide-down menu, OpenGraph/Twitter cards, and fast SVG graphics.

---

## 2. Project Structure

```text
barik-anita-nidhi/
├── index.html                  # Primary HTML entry with SEO metadata and Google Fonts
├── package.json                # Project dependencies and npm scripts
├── tsconfig.json               # TypeScript compiler configuration
├── vite.config.ts              # Vite build setup
├── README.md                   # Complete documentation
│
├── public/
│   ├── favicon.svg             # Monogram emblem favicon
│   └── assets/
│       ├── images/
│       │   ├── hero/           # Hero illustrations and community graphics
│       │   ├── finance/        # Group loan, micro business loan, product loan SVGs
│       │   ├── banking/        # RD, FD, MIS, Savings scheme icons/illustrations
│       │   ├── gold-loan/      # High-trust gold loan feature visuals
│       │   ├── directors/      # Director portrait graphics
│       │   └── misc/           # Official seal and verification marks
│       └── icons/
│
└── src/
    ├── main.ts                 # Application entry point
    ├── style.css               # Corporate design system and responsive styles
    ├── components/
    │   ├── header.ts           # Sticky compacting header & mobile slide-down navigation
    │   ├── hero.ts             # Hero section with trust badges and CTA
    │   ├── company.ts          # Statutory corporate details & 4 verification cards
    │   ├── finance-services.ts # Finance loan cards with loan cycles
    │   ├── banking-services.ts # 2-column deposit and savings scheme grid
    │   ├── gold-loan.ts        # Distinct dark navy & gold feature section
    │   ├── directors.ts        # Keynote 2025 Board of Directors profile cards
    │   ├── contact.ts          # Head office address, direct links (WhatsApp, Maps, Tel)
    │   └── footer.ts           # Statutory notice, navigation links, copyright
    │
    ├── data/
    │   └── site-data.ts        # Centralized typed data repository
    │
    └── utils/
        └── navigation.ts       # Scroll effects, mobile menu toggle, active section tracking
```

---

## 3. Installation & Getting Started

Ensure you have **Node.js** (v18 or newer) installed.

```bash
# 1. Install dependencies
npm install

# 2. Start local development server
npm run dev
```

The application will be served at `http://localhost:3000/`.

---

## 4. Production Build

To compile a minified, production-ready static site:

```bash
# Build static assets to dist/
npm run build

# Preview the production build locally
npm run preview
```

The compiled output will be generated inside the `/dist` directory.

---

## 5. How to Replace Images

All image paths are organized inside `/public/assets/images/`:

| Section | Current Path | Recommended Format | Dimensions |
| :--- | :--- | :--- | :--- |
| **Hero** | `public/assets/images/hero/hero-community.svg` | SVG / WebP / PNG | 800 × 600 px |
| **Group Loan** | `public/assets/images/finance/group-loan.svg` | SVG / WebP / JPG | 400 × 250 px |
| **Micro Business** | `public/assets/images/finance/micro-business.svg` | SVG / WebP / JPG | 400 × 250 px |
| **Product Loan** | `public/assets/images/finance/product-loan.svg` | SVG / WebP / JPG | 400 × 250 px |
| **Gold Loan** | `public/assets/images/gold-loan/gold-loan-feature.svg` | SVG / WebP / JPG | 600 × 450 px |
| **Subhankar Das** | `public/assets/images/directors/director-subhankar-das.svg` | SVG / JPG / PNG | 280 × 280 px (1:1) |
| **Rajib Daga** | `public/assets/images/directors/director-rajib-daga.svg` | SVG / JPG / PNG | 280 × 280 px (1:1) |
| **Papiya Haldar** | `public/assets/images/directors/director-papiya-haldar.svg` | SVG / JPG / PNG | 280 × 280 px (1:1) |

To replace an image:
1. Place your new image file in the corresponding folder.
2. If using a different file name or format (e.g., `.jpg`), update the `image` field in `src/data/site-data.ts`.

---

## 6. How to Change Company Information

All corporate information is completely decoupled from the UI inside `src/data/site-data.ts`:

- **Company Name / CIN / Reg No**: Modify `siteData.company`.
- **Contact Details (Phone, Email, Address)**: Modify `siteData.contact`.
- **Directors**: Add, update, or remove entries in `siteData.directors`.
- **Services**: Modify `siteData.financeServices` or `siteData.bankingServices`.

When you edit `src/data/site-data.ts`, the entire site updates automatically!

---

## 7. How to Customize Colors

The visual design system is managed via CSS custom properties at the top of `src/style.css`:

```css
:root {
  --color-primary-navy: #09275f;
  --color-royal-blue: #123b8c;
  --color-accent-green: #20a65a;
  --color-gold: #f59e0b;
  --color-dark-text: #172033;
  --color-muted-text: #667085;
  --color-light-bg: #f6f8fc;
  --color-white: #ffffff;
  --color-border: #e7eaf0;
}
```

Adjust any hex code in `:root` to update the palette globally.

---

## 8. Deployment Options

The project compiles to pure static HTML/CSS/JS and can be hosted on any static host or container platform:

### A. Cloud Run / Docker
Use the bundled container configuration or standard static server (Nginx/Caddy/Node static).

### B. Vercel / Netlify / GitHub Pages
- **Build command**: `npm run build`
- **Publish directory**: `dist`

---

## 9. Statutory Compliance Note
BARIK ANITA NIDHI LIMITED operates under Section 406 of the Companies Act, 2013 and Nidhi Rules, 2014. All financial schemes are conducted exclusively with its registered members.
