import { siteData } from '../data/site-data';

export function renderGoldLoan(): string {
  const { goldLoan } = siteData;

  const highlightsHtml = goldLoan.highlights
    .map(
      (item) => `
      <div class="gold-highlight-item">
        <div class="gold-icon-bullet" aria-hidden="true">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <div class="gold-highlight-text">
          <strong>${item.title}</strong>
          <span>${item.desc}</span>
        </div>
      </div>`
    )
    .join('');

  return `
  <section id="gold-loan" class="section-padding bg-main" aria-labelledby="gold-loan-heading">
    <div class="container">
      <div class="gold-luxury-container reveal-on-scroll">
        <!-- Soft Atmospheric Glow -->
        <div class="gold-ambient-glow" aria-hidden="true"></div>

        <div class="gold-loan-grid">
          <!-- Text Content Area -->
          <div class="gold-text-col">
            <div class="gold-badge-row">
              <span class="gold-upcoming-tag">
                <span style="color: #D2A037; font-size: 10px;">&#10022;</span>
                ${goldLoan.badge}
              </span>
              <span class="gold-sub-text">Secured Gold Lending</span>
            </div>

            <h2 id="gold-loan-heading" class="gold-section-title">${goldLoan.heading}</h2>
            <p class="gold-tagline-text">${goldLoan.subheading}</p>

            <p class="gold-lead-p">
              ${goldLoan.description}
            </p>

            <!-- 2-Column Highlights Grid -->
            <div class="gold-highlights-2col">
              ${highlightsHtml}
            </div>

            <!-- Action Row: Brand Green CTA (#088740) + Trust Footnote -->
            <div class="gold-action-row">
              <a href="${goldLoan.cta.href}" class="btn btn-primary" id="gold-enquire-btn">
                <span>${goldLoan.cta.label}</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </a>
              <span class="gold-trust-footnote">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  <path d="m9 12 2 2 4-4"/>
                </svg>
                100% Insured Custody &bull; Zero Hidden Appraisal Fees
              </span>
            </div>
          </div>

          <!-- Feature Graphic Area -->
          <div class="gold-visual-col">
            <div class="gold-media-wrapper">
              <img 
                src="${goldLoan.image}" 
                alt="Gold Loan Services - BARIK ANITA NIDHI LIMITED" 
                class="gold-feature-img"
                loading="lazy"
                width="600"
                height="450"
              />
              <div class="gold-floating-badge">
                <img src="${siteData.company.logoUrl}" alt="${siteData.company.name} Official Seal" class="gold-badge-logo" width="32" height="32" />
                <div class="gold-badge-text">
                  <strong>Certified Security</strong>
                  <span>Member-Exclusive Custody</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  `;
}
