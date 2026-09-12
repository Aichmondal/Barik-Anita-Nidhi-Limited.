import { siteData } from '../data/site-data';

export function renderFinanceServices(): string {
  const { financeServices } = siteData;

  const getServiceIcon = (icon: string): string => {
    switch (icon) {
      case 'users':
        return `
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>`;
      case 'briefcase':
        return `
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
        </svg>`;
      case 'package':
      default:
        return `
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line>
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
          <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
          <line x1="12" y1="22.08" x2="12" y2="12"></line>
        </svg>`;
    }
  };

  const cardsHtml = financeServices
    .map(
      (service, index) => `
      <article class="card-luxury finance-card-item reveal-on-scroll" style="--reveal-delay: ${index * 120}ms;" id="finance-card-${service.id}">
        <div class="finance-card-media">
          <img 
            src="${service.image}" 
            alt="${service.title} - ${service.frequency}" 
            class="finance-card-img"
            loading="lazy"
            width="400"
            height="250"
          />
          <span class="finance-frequency-badge">${service.frequency}</span>
        </div>

        <div class="finance-card-body">
          <div class="finance-title-row">
            <div class="finance-icon-circle" aria-hidden="true">
              ${getServiceIcon(service.icon)}
            </div>
            <h3 class="finance-card-title">${service.title}</h3>
          </div>

          <p class="finance-card-desc">${service.description}</p>

          <ul class="finance-feature-checklist" aria-label="Features of ${service.title}">
            ${service.features
              .map(
                (feature) => `
              <li>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>${feature}</span>
              </li>`
              )
              .join('')}
          </ul>

          <div class="finance-card-action">
            <a href="#contact" class="finance-btn-link" aria-label="Inquire about ${service.title}">
              <span>Apply / Inquire Loan</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
          </div>
        </div>
      </article>`
    )
    .join('');

  return `
  <section id="finance-services" class="section-padding bg-services-yellow" aria-labelledby="finance-heading">
    <div class="container">
      <div class="section-header text-center reveal-on-scroll">
        <div class="section-eyebrow-wrap">
          <span class="gold-accent-line" aria-hidden="true"></span>
          <span class="section-eyebrow">OUR FINANCE SERVICES</span>
          <span class="gold-accent-line" aria-hidden="true"></span>
        </div>
        <h2 id="finance-heading" class="section-title">Community Financial Assistance</h2>
        <p class="section-subtitle">
          Designed to cater to the working capital, business growth, and asset needs of our members with transparent terms and flexible repayment cycles.
        </p>
      </div>

      <div class="finance-grid">
        ${cardsHtml}
      </div>
    </div>
  </section>
  `;
}
