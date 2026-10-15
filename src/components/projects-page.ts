/**
 * Dedicated Our Projects Page Component
 * Standalone page showcasing community hospitality initiatives, eco-retreats, and homestays.
 */

import { ourProjectsData, ProjectProperty } from '../data/projects-data';

export function renderOurProjectsPage(): string {
  const { badge, heading, subheading, description, properties } = ourProjectsData;

  const propertyCardsHtml = properties
    .map((property) => renderDedicatedPropertyCard(property))
    .join('');

  return `
    <div class="dedicated-projects-page" id="dedicated-projects-page">
      <!-- Breadcrumb Bar -->
      <nav class="projects-breadcrumb-bar" aria-label="Breadcrumb">
        <div class="container">
          <ol class="breadcrumb-list">
            <li class="breadcrumb-item">
              <a href="/" class="breadcrumb-link" data-route="/">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
                <span>Home</span>
              </a>
            </li>
            <li class="breadcrumb-separator" aria-hidden="true">/</li>
            <li class="breadcrumb-item breadcrumb-current" aria-current="page">Our Projects</li>
          </ol>
        </div>
      </nav>

      <!-- Dedicated Hero Banner -->
      <section class="dedicated-projects-hero">
        <div class="container">
          <div class="projects-hero-inner reveal-on-scroll">
            <div class="projects-hero-badge-wrap">
              <span class="badge-accent">${badge}</span>
              <span class="hero-status-pill">
                <span class="status-dot-pulse"></span>
                Active Destinations
              </span>
            </div>
            <h1 class="projects-page-title">${heading}</h1>
            <p class="projects-page-subtitle">${subheading}</p>
            <p class="projects-page-lead">${description}</p>
          </div>
        </div>
      </section>

      <!-- Main Property Showcase Section -->
      <section class="dedicated-projects-content section-padding">
        <div class="container">
          <div class="dedicated-showcase-header">
            <div>
              <span class="section-tag-mini">Verified Portfolio</span>
              <h2 class="showcase-title">Featured Resorts &amp; Hospitality Projects</h2>
            </div>
            <p class="showcase-counter">Showing ${properties.length} Verified Destinations</p>
          </div>

          <div class="projects-cards-container">
            ${propertyCardsHtml}
          </div>

          <!-- Direct Booking & Community Support Strip -->
          <div class="projects-info-strip reveal-on-scroll">
            <div class="info-strip-content">
              <div class="info-strip-icon" aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <div class="info-strip-text">
                <h4 class="info-strip-title">Community Tourism by BARIK ANITA NIDHI LIMITED</h4>
                <p class="info-strip-desc">
                  Supporting regional micro-enterprises and local Himalayan livelihoods. We connect travellers directly with verified hosts for authentic experiences, transparent rates, and flexible booking.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `;
}

function renderDedicatedPropertyCard(property: ProjectProperty): string {
  const { id, slug, name, location, pricing, booking, hospitality, cardImage, contacts } = property;

  return `
    <article 
      class="card-luxury project-property-card reveal-on-scroll" 
      id="${id}"
      data-property-slug="${slug}"
    >
      <div class="property-card-media">
        <picture>
          <source srcset="${cardImage.src}" type="image/webp" />
          <img 
            src="${cardImage.fallbackSrc}" 
            alt="${cardImage.alt}" 
            class="property-card-img" 
            loading="lazy"
            width="600"
            height="400"
            onerror="this.onerror=null; this.src='${cardImage.fallbackSrc}';"
          />
        </picture>
        <div class="property-media-badges">
          <span class="property-badge badge-status">
            <span class="status-dot-pulse" aria-hidden="true"></span>
            ${booking.statusLabel}
          </span>
          <span class="property-badge badge-category">${property.category}</span>
        </div>
      </div>

      <div class="property-card-body">
        <div class="property-header-group">
          <div class="property-location-tag">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <span>${location.displayFull}</span>
          </div>
          <h3 class="property-title">${name}</h3>
          <p class="property-tagline">${property.tagline}</p>
          <p class="property-card-desc">${property.slug === 'hotel-newa-gangtok' ? 'Discover Hotel Newa, a hospitality property located in the heart of Gangtok’s MG Market area.' : 'Escape the noise of everyday life and discover a peaceful retreat surrounded by green hills and riverside scenery.'}</p>
        </div>

        <!-- Rate Block -->
        <div class="property-rate-box">
          <div class="rate-left">
            <span class="rate-label">Rate / Tariff</span>
            <div class="rate-value-wrap">
              <span class="rate-amount">${pricing.advertisedRate}</span>
              ${pricing.amount > 0 ? `<span class="rate-period">/ night</span>` : `<span class="rate-period">upon booking enquiry</span>`}
            </div>
          </div>
          <div class="rate-right">
            <span class="rate-notice-pill" title="Booking is available">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#16a34a" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="rate-notice-icon-green" aria-hidden="true">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              Booking is available
            </span>
          </div>
        </div>

        <p class="rate-clarification-note">
          * ${pricing.rateClarification}
        </p>

        <!-- Feature chips -->
        <div class="property-features-list">
          <div class="property-feature-chip">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
              <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
              <line x1="6" y1="1" x2="6" y2="4"></line>
              <line x1="10" y1="1" x2="10" y2="4"></line>
              <line x1="14" y1="1" x2="14" y2="4"></line>
            </svg>
            <span>${hospitality.lodgingType}</span>
          </div>
          <div class="property-feature-chip">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span>${booking.flexibility}</span>
          </div>
          <div class="property-feature-chip">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            <span>${property.slug === 'hotel-newa-gangtok' ? 'MG Market Central Location' : 'Breakfast, Lunch, Tiffin & Dinner'}</span>
          </div>
        </div>

        <!-- Action CTAs -->
        <div class="property-card-actions">
          <a 
            href="/our-projects/${slug}" 
            class="btn-property-primary" 
            data-route="/our-projects/${slug}"
            aria-label="Explore Project details for ${name}"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              <line x1="11" y1="8" x2="11" y2="14"></line>
              <line x1="8" y1="11" x2="14" y2="11"></line>
            </svg>
            <span>Explore Project</span>
          </a>

          <a 
            href="/our-projects/${slug}#gallery" 
            class="btn-property-secondary btn-property-gallery" 
            data-route="/our-projects/${slug}#gallery"
            aria-label="View Gallery for ${name}"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <circle cx="8.5" cy="8.5" r="1.5"></circle>
              <polyline points="21 15 16 10 5 21"></polyline>
            </svg>
            <span>View Gallery</span>
          </a>
        </div>

        <!-- Direct Telephone Booking Row -->
        <div class="property-card-call-row">
          <span class="call-row-label">Direct Desk:</span>
          <div class="call-row-links">
            <a href="${contacts.contact1.telUri}" aria-label="${contacts.contact1.ariaLabel}">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <span>${contacts.contact1.displayNumber}</span>
            </a>
            <span class="call-row-sep" aria-hidden="true">|</span>
            <a href="${contacts.contact2.telUri}" aria-label="${contacts.contact2.ariaLabel}">
              <span>${contacts.contact2.displayNumber}</span>
            </a>
          </div>
        </div>
      </div>
    </article>
  `;
}
