/**
 * Dedicated Career & Recruitment Page Component
 * Recreates the authentic 2026 Recruitment & Career Opportunities content from BARIK ANITA NIDHI LIMITED
 */

export function renderCareerPage(): string {
  return `
    <div class="dedicated-career-page" id="dedicated-career-page">
      <!-- Breadcrumb Bar -->
      <nav class="career-breadcrumb-bar" aria-label="Breadcrumb">
        <div class="container">
          <ol class="breadcrumb-list">
            <li class="breadcrumb-item">
              <a href="/" class="breadcrumb-link" data-route="/">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
                <span>Home</span>
              </a>
            </li>
            <li class="breadcrumb-separator" aria-hidden="true">/</li>
            <li class="breadcrumb-item breadcrumb-current" aria-current="page">Career</li>
          </ol>
        </div>
      </nav>

      <!-- Dedicated Hero Banner with authentic Google Sites header background -->
      <section class="career-hero-banner">
        <div class="career-hero-bg" aria-hidden="true">
          <picture>
            <source srcset="/assets/images/career/career-banner-bg.webp" type="image/webp" />
            <img 
              src="/assets/images/career/career-banner-bg.jpg" 
              alt="" 
              class="career-hero-bg-img"
              loading="eager"
            />
          </picture>
          <div class="career-hero-overlay"></div>
        </div>
        <div class="container">
          <div class="career-hero-content reveal-on-scroll">
            <span class="career-badge-tag">Career Opportunity</span>
            <h1 class="career-main-heading">2026 Recruitment</h1>
            <p class="career-lead-text">Official announcements, recruitment phases, and employment notices of BARIK ANITA NIDHI LIMITED.</p>
          </div>
        </div>
      </section>

      <!-- Main Recruitment Section -->
      <section class="career-main-section section-padding">
        <div class="container">
          <div class="career-layout-grid">
            
            <!-- Left Column: Authentic Recruitment Poster / Notice Asset -->
            <div class="career-poster-card reveal-on-scroll">
              <div class="career-poster-frame">
                <button 
                  type="button" 
                  class="career-poster-trigger" 
                  id="career-poster-btn"
                  aria-label="Enlarge 2026 Recruitment Phase 1 notice"
                  title="Click to view full-resolution notice"
                >
                  <picture>
                    <source srcset="/assets/images/career/recruitment-phase-1-2026.webp" type="image/webp" />
                    <img 
                      src="/assets/images/career/recruitment-phase-1-2026.jpg" 
                      alt="BARIK ANITA NIDHI LIMITED - 2026 Recruitment Phase 1 Official Notice"
                      class="career-poster-image"
                      width="640"
                      height="1006"
                      loading="eager"
                    />
                  </picture>
                  <div class="career-poster-overlay">
                    <span class="career-zoom-pill">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        <line x1="11" y1="8" x2="11" y2="14"></line>
                        <line x1="8" y1="11" x2="14" y2="11"></line>
                      </svg>
                      <span>Click to Enlarge Notice</span>
                    </span>
                  </div>
                </button>
              </div>
              <div class="career-poster-caption">
                <span class="caption-label">Official Document:</span>
                <span class="caption-name">Recruitment Phase 1 Notice (2026)</span>
              </div>
            </div>

            <!-- Right Column: Recruitment Status and Details matching source -->
            <div class="career-details-card reveal-on-scroll">
              <div class="career-details-header">
                <div class="career-phase-badge">Phase 1 Notice</div>
                <h2 class="career-phase-title">Recruitment Phase 1</h2>
                
                <div class="career-state-badge">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#25205F" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <span class="state-text">State : <strong>WEST BENGAL</strong></span>
                </div>
              </div>

              <!-- Original Status Presentation -->
              <div class="career-status-box">
                <div class="career-status-row">
                  <span class="career-status-label">Status :</span>
                  <span class="career-status-pill-filled">Position Filled</span>
                </div>
                <p class="career-status-message">
                  Recruitment for this position has been successfully completed.
                </p>
              </div>

              <!-- Official Statutory Reference Information -->
              <div class="career-statutory-info">
                <h3 class="statutory-heading">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#088740" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                  <span>Corporate Verification Details</span>
                </h3>
                <p class="statutory-address">
                  <strong>BARIK ANITA NIDHI LTD's registered office address is:</strong><br />
                  C/o, Rajib Daga, Kachupukur, B.b.c, Bulbulchadi, Malda, Bulbulchandi, West Bengal, India, 732122
                </p>
                <div class="statutory-meta-grid">
                  <div class="meta-item">
                    <span class="meta-title">CIN</span>
                    <span class="meta-val">U65990WB2022PLN252823</span>
                  </div>
                  <div class="meta-item">
                    <span class="meta-title">Reg. Number</span>
                    <span class="meta-val">252823</span>
                  </div>
                  <div class="meta-item">
                    <span class="meta-title">Authority</span>
                    <span class="meta-val">ROC Kolkata (Govt. of India)</span>
                  </div>
                </div>
              </div>

              <!-- Contact & Helpdesk for Candidates -->
              <div class="career-contact-box">
                <h4 class="career-contact-title">Inquiries &amp; Future Opportunities</h4>
                <p class="career-contact-sub">
                  Candidates seeking verification of recruitment records or general career inquiries can reach our administrative office directly:
                </p>
                <div class="career-action-buttons">
                  <a href="tel:+919635224678" class="btn btn-primary career-btn-action">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                    <span>+91 963-522-4678</span>
                  </a>
                  <a href="mailto:office.barikanitanidhiltd@gmail.com" class="btn btn-secondary career-btn-action">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                    <span>Email Office Desk</span>
                  </a>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      <!-- Lightbox Modal for Full Notice Resolution -->
      <div id="career-modal" class="career-lightbox" aria-hidden="true" role="dialog" aria-label="Recruitment Notice High Resolution View">
        <div class="career-lightbox-backdrop" data-close-career-modal></div>
        <div class="career-lightbox-container">
          <div class="career-lightbox-topbar">
            <span class="career-lightbox-title">2026 Recruitment Phase 1 — Notice Document</span>
            <div class="career-lightbox-actions">
              <a 
                href="/assets/images/career/recruitment-phase-1-2026.jpg" 
                download="BARIK-ANITA-NIDHI-2026-Recruitment-Phase-1.jpg"
                class="career-lightbox-download"
                title="Download original document"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                <span>Download</span>
              </a>
              <button type="button" class="career-lightbox-close" data-close-career-modal aria-label="Close Preview">&times;</button>
            </div>
          </div>
          <div class="career-lightbox-body">
            <img 
              src="/assets/images/career/recruitment-phase-1-2026.jpg" 
              alt="BARIK ANITA NIDHI LIMITED - 2026 Recruitment Phase 1 Full Resolution Notice"
              class="career-lightbox-img"
            />
          </div>
        </div>
      </div>

    </div>
  `;
}

export function setupCareerPageInteractions(): void {
  const posterBtn = document.getElementById('career-poster-btn');
  const modal = document.getElementById('career-modal');
  const closeTriggers = document.querySelectorAll<HTMLElement>('[data-close-career-modal]');

  function openModal(): void {
    if (!modal) return;
    modal.classList.add('is-active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
  }

  function closeModal(): void {
    if (!modal) return;
    modal.classList.remove('is-active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  }

  posterBtn?.addEventListener('click', openModal);

  closeTriggers.forEach((btn) => {
    btn.addEventListener('click', closeModal);
  });

  const handleKeydown = (e: KeyboardEvent): void => {
    if (e.key === 'Escape' && modal?.classList.contains('is-active')) {
      closeModal();
    }
  };

  document.addEventListener('keydown', handleKeydown);
}
