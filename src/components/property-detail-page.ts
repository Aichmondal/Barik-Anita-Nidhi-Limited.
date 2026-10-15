/**
 * Dedicated Property Detail Page Component
 * Standalone page for a specific property (e.g. /our-projects/riverview-homestay)
 */

import { ourProjectsData, ProjectProperty } from '../data/projects-data';

export function renderPropertyDetailPage(slug: string): string {
  const property = ourProjectsData.properties.find((p) => p.slug === slug) || ourProjectsData.properties[0];
  if (!property) {
    return `
      <div class="container section-padding text-center">
        <h2>Property Not Found</h2>
        <p>The requested destination could not be located.</p>
        <a href="/our-projects" class="btn btn-primary" data-route="/our-projects">View All Projects</a>
      </div>
    `;
  }

  const { name, location, pricing, booking, hospitality, description, contacts, heroImage, gallery } = property;

  const paragraphsHtml = description.paragraphs
    .map((p) => `<p class="prose-p">${p}</p>`)
    .join('');

  const secondaryParagraphsHtml = description.secondaryParagraphs
    .map((p) => `<p class="prose-p">${p}</p>`)
    .join('');

  const mealsListHtml = hospitality.meals
    .map(
      (meal) => `
      <div class="meal-item-card">
        <div class="meal-icon-wrap" aria-hidden="true">
          ${getMealDetailIcon(meal.iconName)}
        </div>
        <div class="meal-text-wrap">
          <h4 class="meal-title">${meal.name}</h4>
          <p class="meal-desc">${meal.description}</p>
        </div>
      </div>
    `
    )
    .join('');

  const galleryItemsHtml = gallery
    .map(
      (img, idx) => `
      <button 
        type="button" 
        class="gallery-thumb-btn" 
        data-lightbox-src="${img.src}" 
        data-lightbox-alt="${img.alt}"
        data-lightbox-title="${img.title}"
        aria-label="View photo ${idx + 1}: ${img.title}"
      >
        <picture>
          <source srcset="${img.src}" type="image/webp" />
          <img 
            src="${img.fallbackSrc}" 
            alt="${img.alt}" 
            class="gallery-thumb-img" 
            loading="lazy"
            width="360"
            height="270"
            onerror="this.onerror=null; this.src='${img.fallbackSrc}';"
          />
        </picture>
        <span class="gallery-thumb-overlay" aria-hidden="true">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            <line x1="11" y1="8" x2="11" y2="14"></line>
            <line x1="8" y1="11" x2="14" y2="11"></line>
          </svg>
        </span>
      </button>
    `
    )
    .join('');

  return `
    <div class="property-detail-page" id="property-detail-page">
      <!-- Breadcrumb Bar -->
      <nav class="projects-breadcrumb-bar" aria-label="Breadcrumb">
        <div class="container">
          <div class="breadcrumb-container-flex">
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
              <li class="breadcrumb-item">
                <a href="/our-projects" class="breadcrumb-link" data-route="/our-projects">Our Projects</a>
              </li>
              <li class="breadcrumb-separator" aria-hidden="true">/</li>
              <li class="breadcrumb-item breadcrumb-current" aria-current="page">${name}</li>
            </ol>

            <a href="/our-projects" class="btn-back-link" data-route="/our-projects">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              <span>Back to All Projects</span>
            </a>
          </div>
        </div>
      </nav>

      <!-- Property Detail Hero -->
      <section class="property-hero-section">
        <div class="property-hero-cover-wrap">
          <picture>
            <source srcset="${heroImage.src}" type="image/webp" />
            <img 
              src="${heroImage.fallbackSrc}" 
              alt="${heroImage.alt}" 
              class="property-hero-img-full" 
              loading="eager"
              onerror="this.onerror=null; this.src='${heroImage.fallbackSrc}';"
            />
          </picture>
          <div class="property-hero-overlay-dark">
            <div class="container">
              <div class="hero-overlay-content reveal-on-scroll">
                <div class="hero-badges-row">
                  <span class="property-badge badge-status">
                    <span class="status-dot-pulse" aria-hidden="true"></span>
                    ${booking.statusLabel}
                  </span>
                  <span class="property-badge badge-category">${property.category}</span>
                </div>
                <h1 class="property-detail-h1">${name}</h1>
                <p class="property-hero-location-line">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <span>${location.displayFull}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Property Detail Main Body -->
      <main class="property-detail-body section-padding">
        <div class="container">
          <div class="property-layout-grid">
            <!-- Left Main Column (Details, Prose, Meals, Gallery) -->
            <div class="property-main-col">
              <!-- Pricing & Policy Bar -->
              <div class="property-policy-banner">
                <div class="policy-rate-col">
                  <span class="policy-label">Advertised Pricing</span>
                  <div class="policy-price-row">
                    <span class="policy-currency-num">${pricing.advertisedRate}</span>
                    <span class="policy-period">per night</span>
                  </div>
                  <p class="policy-clarification-note">
                    ${pricing.ratePeriodNotice}
                  </p>
                </div>
                <div class="policy-sep"></div>
                <div class="policy-status-col">
                  <span class="policy-label">Booking Flexibility</span>
                  <div class="policy-tag-active">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>${booking.flexibility}</span>
                  </div>
                  <p class="policy-clarification-note">
                    ${booking.notice}
                  </p>
                </div>
              </div>

              <!-- Published Property Description -->
              <section class="property-block-section">
                <h2 class="block-title">${description.headline}</h2>
                <div class="block-prose">
                  ${paragraphsHtml}
                </div>

                <div class="property-quote-highlight">
                  <h3 class="quote-subhead">${description.secondaryHeadline}</h3>
                  <div class="quote-text-wrap">
                    ${secondaryParagraphsHtml}
                  </div>
                  <p class="quote-signature">“${description.closingLine}”</p>
                </div>
              </section>

              <!-- Lodging with Home-Style Food -->
              <section class="property-block-section">
                <div class="block-title-row">
                  <h2 class="block-title">${hospitality.lodgingType}</h2>
                  <span class="badge-accent">Authentic Himalayan Dining</span>
                </div>
                <p class="dining-lead-desc">${hospitality.diningSummary}</p>
                <div class="property-meals-grid">
                  ${mealsListHtml}
                </div>
              </section>

              <!-- Authentic Property Photography Gallery -->
              <section class="property-block-section" id="gallery">
                <div class="block-title-row">
                  <h2 class="block-title">Authentic Property Gallery</h2>
                  <span class="gallery-photo-count">${gallery.length} Verified Photos</span>
                </div>
                <p class="gallery-hint">Original verified photographs for ${name}. Click any photo to expand into high-resolution view.</p>
                <div class="property-gallery-grid-full">
                  ${galleryItemsHtml}
                </div>
              </section>

              <!-- Dedicated Location Section -->
              <section class="property-block-section property-location-section">
                <div class="block-title-row">
                  <h2 class="block-title">Location &amp; Surroundings</h2>
                  <span class="badge-accent">${location.district}, ${location.state}</span>
                </div>
                <div class="location-details-box">
                  <div class="location-icon-pin" aria-hidden="true">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </div>
                  <div class="location-text-info">
                    <h3 class="location-name">${location.displayFull}</h3>
                    <p class="location-landmark"><strong>Area &amp; Landmark:</strong> ${location.landmark}</p>
                    <p class="location-desc">
                      ${slug === 'hotel-newa-gangtok' 
                        ? 'Conveniently situated along the Baluwakhani and Vajra World corridor on NH 10, moments from Gangtok’s bustling MG Market and pedestrian areas, offering quick access to scenic viewpoints, local taxi stands, and Himalayan viewpoints.'
                        : 'Nestled near the historic Jogighat wooden bridge in Sittong, surrounded by lush river valleys, orange orchards, and tranquil green hills of Darjeeling district.'}
                    </p>
                  </div>
                </div>
              </section>

              <!-- Explore Other Destination Card -->
              ${(() => {
                const other = ourProjectsData.properties.find((p) => p.slug !== slug);
                if (!other) return '';
                return `
                <section class="property-block-section cross-project-section">
                  <span class="section-tag-mini">More Destinations</span>
                  <div class="cross-project-card">
                    <img 
                      src="${other.cardImage.src}" 
                      alt="${other.name}" 
                      class="cross-project-thumb"
                      loading="lazy"
                      onerror="this.onerror=null; this.src='${other.cardImage.fallbackSrc}';" 
                    />
                    <div class="cross-project-info">
                      <span class="cross-badge">${other.category}</span>
                      <h3 class="cross-title">${other.name}</h3>
                      <p class="cross-loc">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                          <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        ${other.location.displayShort}
                      </p>
                      <a href="/our-projects/${other.slug}" class="btn-cross-explore" data-route="/our-projects/${other.slug}">
                        <span>Explore ${other.name}</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                          <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                      </a>
                    </div>
                  </div>
                </section>
                `;
              })()}
            </div>

            <!-- Right Sidebar: Quick Call & Booking Actions -->
            <aside class="property-sidebar-col">
              <div class="sticky-booking-card">
                <div class="sticky-card-header">
                  <span class="sticky-tag">Direct Host Coordination</span>
                  <div class="sticky-price-display">
                    <span class="sticky-amt">${pricing.advertisedRate}</span>
                    <span class="sticky-period">${pricing.amount > 0 ? '/ night' : ''}</span>
                  </div>
                  <span class="sticky-status-badge">
                    <span class="status-dot-pulse"></span>
                    ${booking.statusLabel}
                  </span>
                </div>

                <p class="sticky-rate-note">
                  ${pricing.ratePeriodNotice}. Advance and adjustable booking dates available.
                </p>

                <div class="sticky-contacts-group">
                  <h3 class="contacts-heading">Call to Book &amp; Enquire</h3>
                  
                  <a 
                    href="${contacts.contact1.telUri}" 
                    class="btn-sidebar-call" 
                    aria-label="${contacts.contact1.ariaLabel}"
                  >
                    <div class="btn-sidebar-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                    </div>
                    <div class="btn-sidebar-text">
                      <span class="btn-sidebar-role">${contacts.contact1.label}</span>
                      <strong class="btn-sidebar-number">${contacts.contact1.displayNumber}</strong>
                    </div>
                  </a>

                  <a 
                    href="${contacts.contact2.telUri}" 
                    class="btn-sidebar-call" 
                    aria-label="${contacts.contact2.ariaLabel}"
                  >
                    <div class="btn-sidebar-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                    </div>
                    <div class="btn-sidebar-text">
                      <span class="btn-sidebar-role">${contacts.contact2.label}</span>
                      <strong class="btn-sidebar-number">${contacts.contact2.displayNumber}</strong>
                    </div>
                  </a>

                  <a 
                    href="${contacts.whatsappEnquiry.url}" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    class="btn-sidebar-whatsapp"
                    aria-label="Enquire via WhatsApp for ${name}"
                  >
                    <div class="btn-sidebar-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                      </svg>
                    </div>
                    <div class="btn-sidebar-text">
                      <span class="btn-sidebar-role">WhatsApp Enquiry</span>
                      <strong class="btn-sidebar-number">Instant Host Chat</strong>
                    </div>
                  </a>
                </div>

                <div class="sticky-disclaimer-box">
                  <p>
                    <strong>Booking Enquiry Note:</strong> Contacting via phone or WhatsApp initiates a booking enquiry with the host coordinator. Room availability and finalized pricing will be verified directly.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <!-- Global Lightbox for Gallery Preview -->
      <div id="property-lightbox" class="property-lightbox" aria-hidden="true" role="dialog" aria-label="Photo Preview">
        <div class="lightbox-overlay" data-close-lightbox></div>
        <div class="lightbox-dialog">
          <button type="button" class="lightbox-close-btn" data-close-lightbox aria-label="Close photo preview">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          <img id="lightbox-img" src="" alt="Property Gallery Large View" class="lightbox-img" />
          <p id="lightbox-caption" class="lightbox-caption"></p>
        </div>
      </div>
    </div>
  `;
}

function getMealDetailIcon(type: 'sun' | 'coffee' | 'utensils' | 'moon'): string {
  switch (type) {
    case 'coffee':
      return `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
          <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
          <line x1="6" y1="1" x2="6" y2="4"></line>
          <line x1="10" y1="1" x2="10" y2="4"></line>
          <line x1="14" y1="1" x2="14" y2="4"></line>
        </svg>
      `;
    case 'utensils':
      return `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 2v20M2 2v20M6 2v7a4 4 0 0 0 4 4v9M14 2v9a4 4 0 0 0 4 4v7"></path>
        </svg>
      `;
    case 'sun':
      return `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
      `;
    case 'moon':
      return `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      `;
  }
}
