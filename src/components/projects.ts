/**
 * Our Projects Section Component
 * Prominently showcases community hospitality initiatives, eco-retreats, and homestays.
 * Built to effortlessly accommodate future properties via projects-data.ts.
 */

import { ourProjectsData, ProjectProperty } from '../data/projects-data';

export function renderOurProjects(): string {
  const { badge, heading, subheading, description, properties } = ourProjectsData;

  const propertyCardsHtml = properties
    .map((property) => renderPropertyCard(property))
    .join('');

  const propertyModalsHtml = properties
    .map((property) => renderPropertyDetailModal(property))
    .join('');

  return `
    <section id="our-projects" class="section-padding our-projects-section" aria-labelledby="projects-heading">
      <div class="container">
        <!-- Section Header -->
        <div class="section-header-block reveal-on-scroll">
          <span class="badge-accent">${badge}</span>
          <h2 id="projects-heading" class="section-main-heading">${heading}</h2>
          <p class="section-sub-heading">${subheading}</p>
          <p class="section-desc">${description}</p>
        </div>

        <!-- Properties Showcase Grid -->
        <div class="projects-cards-container">
          ${propertyCardsHtml}
        </div>

        <!-- Transparency & Expansion Footer Note -->
        <div class="projects-info-strip reveal-on-scroll" style="--reveal-delay: 200ms;">
          <div class="info-strip-content">
            <div class="info-strip-icon" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
            </div>
            <div class="info-strip-text">
              <h4 class="info-strip-title">Direct Booking &amp; Verified Hospitality</h4>
              <p class="info-strip-desc">
                BARIK ANITA NIDHI LIMITED supports local eco-tourism development in North Bengal. All bookings are managed directly through authorized homestay coordinators with transparent terms and adjustable scheduling.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Modals for Property Details -->
      <div id="project-modals-mount">
        ${propertyModalsHtml}
      </div>

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
    </section>
  `;
}

function renderPropertyCard(property: ProjectProperty): string {
  const { id, name, location, pricing, booking, hospitality, cardImage, contacts } = property;

  return `
    <article 
      class="card-luxury project-property-card reveal-on-scroll" 
      id="${id}"
      data-property-slug="${property.slug}"
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
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <span>${location.displayShort}</span>
          </div>
          <h3 class="property-title">${name}</h3>
          <p class="property-tagline">${property.tagline}</p>
        </div>

        <!-- Rate & Confirmation Disclaimer Block -->
        <div class="property-rate-box">
          <div class="rate-left">
            <span class="rate-label">Advertised Rate</span>
            <div class="rate-value-wrap">
              <span class="rate-amount">${pricing.advertisedRate}</span>
              <span class="rate-period">/ night</span>
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
          * Advertised as ${pricing.advertisedRate} per night (parent listing: ₹1,400/day). Rate period to be confirmed. Not labeled per-person/per-room until confirmed.
        </p>

        <!-- Key Features List -->
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
            <span>4 Daily Meals Included</span>
          </div>
        </div>

        <!-- Action CTAs -->
        <div class="property-card-actions">
          <button 
            type="button" 
            class="btn-property-primary btn-view-property-details" 
            data-open-modal="modal-${property.slug}"
            aria-haspopup="dialog"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
            <span>View Details</span>
          </button>

          <a 
            href="${contacts.contact1.telUri}" 
            class="btn-property-secondary" 
            aria-label="${contacts.contact1.ariaLabel}"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            <span>Call to Book</span>
          </a>
        </div>
      </div>
    </article>
  `;
}

function renderPropertyDetailModal(property: ProjectProperty): string {
  const { slug, name, location, pricing, booking, hospitality, description, contacts, heroImage, gallery } = property;

  const paragraphsHtml = description.paragraphs
    .map((p) => `<p class="modal-prose-p">${p}</p>`)
    .join('');

  const secondaryParagraphsHtml = description.secondaryParagraphs
    .map((p) => `<p class="modal-prose-p">${p}</p>`)
    .join('');

  const mealsListHtml = hospitality.meals
    .map(
      (meal) => `
      <div class="meal-item-card">
        <div class="meal-icon-wrap" aria-hidden="true">
          ${getMealIcon(meal.iconName)}
        </div>
        <div class="meal-text-wrap">
          <h5 class="meal-title">${meal.name}</h5>
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
            width="300"
            height="225"
            onerror="this.onerror=null; this.src='${img.fallbackSrc}';"
          />
        </picture>
        <span class="gallery-thumb-overlay" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
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
    <div 
      id="modal-${slug}" 
      class="property-detail-modal" 
      aria-hidden="true" 
      role="dialog" 
      aria-labelledby="modal-title-${slug}"
    >
      <div class="modal-backdrop" data-close-modal></div>
      
      <div class="modal-dialog-container">
        <div class="modal-window">
          <!-- Close button -->
          <button 
            type="button" 
            class="modal-close-btn" 
            data-close-modal 
            aria-label="Close ${name} details"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          <!-- Modal Hero Image -->
          <div class="modal-hero-cover">
            <picture>
              <source srcset="${heroImage.src}" type="image/webp" />
              <img 
                src="${heroImage.fallbackSrc}" 
                alt="${heroImage.alt}" 
                class="modal-hero-img" 
                loading="eager"
                onerror="this.onerror=null; this.src='${heroImage.fallbackSrc}';"
              />
            </picture>
            <div class="modal-hero-overlay">
              <span class="modal-badge-status">
                <span class="status-dot-pulse" aria-hidden="true"></span>
                ${booking.statusLabel}
              </span>
              <h2 id="modal-title-${slug}" class="modal-hero-title">${name}</h2>
              <p class="modal-hero-location">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                ${location.displayFull}
              </p>
            </div>
          </div>

          <!-- Modal Scrollable Content -->
          <div class="modal-body-content">
            <!-- Rate & Booking Status Bar -->
            <div class="modal-status-bar">
              <div class="status-bar-rate">
                <span class="bar-label">Advertised Pricing</span>
                <div class="bar-price-line">
                  <strong>${pricing.advertisedRate}</strong>
                  <span>per night</span>
                </div>
                <small class="bar-rate-note">${pricing.ratePeriodNotice}</small>
              </div>

              <div class="status-bar-flexibility">
                <span class="bar-label">Booking Policy</span>
                <div class="flexibility-tag">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  ${booking.flexibility}
                </div>
                <small class="bar-rate-note">${booking.notice}</small>
              </div>
            </div>

            <!-- Published Description Section -->
            <div class="modal-section-block">
              <h3 class="modal-heading-sub">${description.headline}</h3>
              <div class="modal-prose">
                ${paragraphsHtml}
              </div>

              <div class="modal-quote-box">
                <h4 class="quote-heading">${description.secondaryHeadline}</h4>
                <div class="quote-prose">
                  ${secondaryParagraphsHtml}
                </div>
                <p class="quote-closing">“${description.closingLine}”</p>
              </div>
            </div>

            <!-- Accommodation & Home-Style Meals -->
            <div class="modal-section-block">
              <div class="section-title-with-badge">
                <h3 class="modal-heading-sub">${hospitality.lodgingType}</h3>
                <span class="badge-accent">Home Cooked Food</span>
              </div>
              <p class="meals-lead-text">${hospitality.diningSummary}</p>
              
              <div class="modal-meals-grid">
                ${mealsListHtml}
              </div>
            </div>

            <!-- Property Image Gallery -->
            <div class="modal-section-block">
              <h3 class="modal-heading-sub">Authentic Property Gallery</h3>
              <p class="gallery-sub-text">Click any photo to expand into high-resolution view.</p>
              <div class="modal-gallery-grid">
                ${galleryItemsHtml}
              </div>
            </div>

            <!-- Working Booking Actions (Calls & WhatsApp Enquiry) -->
            <div class="modal-booking-panel">
              <h3 class="booking-panel-title">Direct Booking &amp; Enquiries</h3>
              <p class="booking-panel-desc">
                Contact the authorized desk coordinators directly to check current room availability and verify rates.
              </p>

              <div class="booking-actions-row">
                <a 
                  href="${contacts.contact1.telUri}" 
                  class="btn-booking-call call-1" 
                  aria-label="${contacts.contact1.ariaLabel}"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  <div class="btn-call-text">
                    <span class="call-role">Call Booking Contact 1</span>
                    <span class="call-num">${contacts.contact1.displayNumber}</span>
                  </div>
                </a>

                <a 
                  href="${contacts.contact2.telUri}" 
                  class="btn-booking-call call-2" 
                  aria-label="${contacts.contact2.ariaLabel}"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  <div class="btn-call-text">
                    <span class="call-role">Call Booking Contact 2</span>
                    <span class="call-num">${contacts.contact2.displayNumber}</span>
                  </div>
                </a>

                <a 
                  href="${contacts.whatsappEnquiry.url}" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  class="btn-booking-whatsapp"
                  aria-label="Enquire via WhatsApp about RiverView Homestay"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                  </svg>
                  <div class="btn-call-text">
                    <span class="call-role">WhatsApp Enquiry</span>
                    <span class="call-num">Instant Chat Desk</span>
                  </div>
                </a>
              </div>

              <div class="booking-disclaimer-box">
                <p>
                  <strong>Notice:</strong> ${contacts.whatsappEnquiry.disclaimer} Advertised rate is ${pricing.advertisedRate} per night (parent listing notes ₹1,400/day); confirmation of rate period and seasonal availability will be provided by host upon inquiry.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function getMealIcon(type: 'sun' | 'coffee' | 'utensils' | 'moon'): string {
  switch (type) {
    case 'coffee':
      return `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
          <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
          <line x1="6" y1="1" x2="6" y2="4"></line>
          <line x1="10" y1="1" x2="10" y2="4"></line>
          <line x1="14" y1="1" x2="14" y2="4"></line>
        </svg>
      `;
    case 'utensils':
      return `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 2v20M2 2v20M6 2v7a4 4 0 0 0 4 4v9M14 2v9a4 4 0 0 0 4 4v7"></path>
        </svg>
      `;
    case 'sun':
      return `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
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
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      `;
  }
}

/**
 * Initializes interactive functionality for the Our Projects section:
 * - Opening and closing property details modal
 * - Deep linking to #our-projects or #our-projects/riverview-homestay
 * - Keyboard navigation (Escape key)
 * - Gallery Lightbox
 */
export function setupProjectsInteractions(): void {
  // Modal open buttons
  const openButtons = document.querySelectorAll<HTMLButtonElement>('[data-open-modal]');
  const closeTriggers = document.querySelectorAll<HTMLElement>('[data-close-modal]');
  const modals = document.querySelectorAll<HTMLElement>('.property-detail-modal');

  function openModal(modalId: string): void {
    const targetModal = document.getElementById(modalId);
    if (!targetModal) return;

    targetModal.classList.add('is-active');
    targetModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');

    // Trap focus inside modal
    const focusable = targetModal.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length > 0) {
      focusable[0].focus();
    }
  }

  function closeModal(modal: HTMLElement): void {
    modal.classList.remove('is-active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  }

  openButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const modalId = btn.getAttribute('data-open-modal');
      if (modalId) {
        openModal(modalId);
      }
    });
  });

  closeTriggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const modal = trigger.closest<HTMLElement>('.property-detail-modal');
      if (modal) {
        closeModal(modal);
      }
    });
  });

  // Global Escape key handler
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      modals.forEach((modal) => {
        if (modal.classList.contains('is-active')) {
          closeModal(modal);
        }
      });
      closeLightbox();
    }
  });

  // Lightbox handlers
  const lightbox = document.getElementById('property-lightbox');
  const lightboxImg = document.getElementById('lightbox-img') as HTMLImageElement | null;
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxCloseTriggers = document.querySelectorAll<HTMLElement>('[data-close-lightbox]');
  const galleryThumbBtns = document.querySelectorAll<HTMLButtonElement>('.gallery-thumb-btn');

  function openLightbox(src: string, alt: string, title: string): void {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    lightboxImg.alt = alt;
    if (lightboxCaption) {
      lightboxCaption.textContent = title;
    }
    lightbox.classList.add('is-active');
    lightbox.setAttribute('aria-hidden', 'false');
  }

  function closeLightbox(): void {
    if (!lightbox) return;
    lightbox.classList.remove('is-active');
    lightbox.setAttribute('aria-hidden', 'true');
    if (lightboxImg) {
      lightboxImg.src = '';
    }
  }

  galleryThumbBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const src = btn.getAttribute('data-lightbox-src');
      const alt = btn.getAttribute('data-lightbox-alt') || '';
      const title = btn.getAttribute('data-lightbox-title') || '';
      if (src) {
        openLightbox(src, alt, title);
      }
    });
  });

  lightboxCloseTriggers.forEach((trigger) => {
    trigger.addEventListener('click', closeLightbox);
  });

  // Handle URL hash on load or change (e.g. #our-projects/riverview-homestay)
  const handleHashRouting = (): void => {
    const hash = window.location.hash;
    if (hash === '#our-projects/riverview-homestay' || hash === '#riverview-homestay') {
      openModal('modal-riverview-homestay');
    }
  };

  window.addEventListener('hashchange', handleHashRouting);
  handleHashRouting();
}
