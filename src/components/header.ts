import { siteData } from '../data/site-data';

export function renderHeader(): string {
  const { company, navigation } = siteData;

  const navLinksHtml = navigation
    .map(
      (item) => `
      <li>
        <a href="${item.href}" class="nav-link" id="${item.id}">
          ${item.label}
        </a>
      </li>`
    )
    .join('');

  const mobileLinksHtml = navigation
    .map(
      (item) => `
      <li>
        <a href="${item.href}" class="mobile-nav-link" id="mobile-${item.id}">
          <span>${item.label}</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </a>
      </li>`
    )
    .join('');

  return `
  <header id="site-header" class="site-header" role="banner">
    <div class="header-container">
      <!-- Brand / Logo Area -->
      <div class="brand-container" id="header-brand">
        <a href="/" class="brand-logo-link" aria-label="${company.name}">
          <img
            src="https://res.cloudinary.com/qfyvlsqf/image/upload/f_auto,q_auto/LOGO_1"
            alt="${company.name} logo"
            class="brand-logo"
            width="64"
            height="64"
            loading="eager"
          />
        </a>
        <a href="/" class="brand-text-block brand-text-link" aria-label="${company.name}">
          <span class="brand-title">${company.name}</span>
          <span class="brand-tagline">${company.tagline}</span>
        </a>
      </div>

      <!-- Desktop Navigation -->
      <nav class="desktop-nav" aria-label="Main Navigation">
        <ul class="nav-list">
          ${navLinksHtml}
        </ul>
        <a href="#contact" class="header-cta-btn" id="header-inquire-btn">
          <span>Apply / Inquire</span>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </a>
      </nav>

      <!-- Mobile Hamburger Button -->
      <button 
        type="button" 
        id="mobile-menu-toggle" 
        class="mobile-menu-toggle" 
        aria-expanded="false" 
        aria-controls="mobile-menu"
        aria-label="Open navigation menu"
      >
        <span class="hamburger-bar"></span>
        <span class="hamburger-bar"></span>
        <span class="hamburger-bar"></span>
      </button>
    </div>

    <!-- Mobile Slide-Down Menu -->
    <div id="mobile-menu" class="mobile-menu" aria-hidden="true" role="dialog" aria-label="Mobile Navigation">
      <div class="mobile-menu-inner">
        <div class="mobile-menu-brand-card">
          <img src="${company.logoUrl}" alt="${company.name} Logo" class="mobile-menu-logo" width="36" height="36" />
          <div class="mobile-menu-brand-info">
            <span class="mobile-menu-brand-name">${company.name}</span>
            <span class="meta-cin-text">CIN: ${company.cin}</span>
          </div>
          <span class="meta-status-pill">Govt. Approved</span>
        </div>
        <ul class="mobile-nav-list">
          ${mobileLinksHtml}
        </ul>
        <div class="mobile-menu-footer">
          <a href="#contact" class="btn btn-primary mobile-cta-link" style="width: 100%;">
            <span>Apply / Inquire</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
          <a href="tel:${siteData.contact.phone}" class="mobile-call-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#088740" stroke-width="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            <span>Call: ${siteData.contact.phoneDisplay}</span>
          </a>
        </div>
      </div>
    </div>
  </header>
  `;
}
