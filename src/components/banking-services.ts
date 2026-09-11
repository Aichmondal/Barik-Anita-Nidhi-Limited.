import { siteData } from '../data/site-data';

export function renderBankingServices(): string {
  const { bankingServices } = siteData;

  const getBankingIcon = (icon: string): string => {
    switch (icon) {
      case 'trending-up':
        return `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
          <polyline points="17 6 23 6 23 12"></polyline>
        </svg>`;
      case 'vault':
        return `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2"></rect>
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="7" x2="12" y2="9"></line>
          <line x1="12" y1="15" x2="12" y2="17"></line>
        </svg>`;
      case 'wallet':
        return `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4"></path>
          <path d="M4 6v12c0 1.1.9 2 2 2h14v-4"></path>
          <path d="M18 12a2 2 0 0 0 0 4h4v-4Z"></path>
        </svg>`;
      case 'piggy-bank':
      default:
        return `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h2v-4h-2c0-1-.5-1.5-1-2V5z"></path>
          <path d="M2 9v1c0 1.1.9 2 2 2h1"></path>
          <circle cx="16" cy="11" r="1"></circle>
        </svg>`;
    }
  };

  const cardsHtml = bankingServices
    .map(
      (item, index) => `
      <article class="card-luxury banking-card-item reveal-on-scroll" style="--reveal-delay: ${index * 100}ms;" id="banking-${item.id}">
        <div class="banking-top-row">
          <div class="banking-icon-box" aria-hidden="true">
            ${getBankingIcon(item.icon)}
          </div>
          <div>
            <span class="banking-scheme-tag">${item.code}</span>
            <h3 class="banking-title">${item.title}</h3>
          </div>
        </div>

        <p class="banking-desc">${item.description}</p>

        <div class="banking-benefits-panel">
          <span class="benefits-label">Scheme Highlights</span>
          <ul class="benefits-list">
            ${item.benefits
              .map(
                (benefit) => `
              <li>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>${benefit}</span>
              </li>`
              )
              .join('')}
          </ul>
        </div>

        <div class="banking-action-row">
          <a href="#contact" class="banking-link-cta" aria-label="Open ${item.title}">
            <span>Open Account / Inquire Scheme</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
        </div>
      </article>`
    )
    .join('');

  return `
  <section id="banking-services" class="section-padding bg-white" aria-labelledby="banking-heading">
    <div class="container">
      <div class="section-header text-center reveal-on-scroll">
        <div class="section-eyebrow-wrap">
          <span class="gold-accent-line" aria-hidden="true"></span>
          <span class="section-eyebrow">OTHER BANKING SERVICES</span>
          <span class="gold-accent-line" aria-hidden="true"></span>
        </div>
        <h2 id="banking-heading" class="section-title">Secure Deposits &amp; Savings</h2>
        <p class="section-subtitle">
          Reliable deposit and savings schemes offering attractive returns, dedicated security, and full regulatory transparency for our members.
        </p>
      </div>

      <!-- 2-Column Desktop, 1-Column Mobile Layout -->
      <div class="banking-grid-2col">
        ${cardsHtml}
      </div>
    </div>
  </section>
  `;
}
