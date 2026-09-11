import { siteData } from '../data/site-data';

export function renderCompanySection(): string {
  const { company, companyStats } = siteData;

  const getStatIcon = (iconName: string): string => {
    switch (iconName) {
      case 'calendar':
        return `
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>`;
      case 'shield-check':
        return `
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
          <path d="m9 12 2 2 4-4"></path>
        </svg>`;
      case 'file-text':
        return `
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
        </svg>`;
      case 'award':
      default:
        return `
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="8" r="7"></circle>
          <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
        </svg>`;
    }
  };

  const statCardsHtml = companyStats
    .map(
      (stat, index) => `
      <div class="card-luxury stat-item-card reveal-on-scroll" style="--reveal-delay: ${index * 100}ms;" id="${stat.id}">
        <div class="stat-icon-wrap" aria-hidden="true">
          ${getStatIcon(stat.iconName)}
        </div>
        <span class="stat-label-text">${stat.label}</span>
        <h3 class="stat-number-val">${stat.value}</h3>
        <p>${stat.description}</p>
      </div>`
    )
    .join('');

  return `
  <section id="company" class="section-padding bg-white" aria-labelledby="company-heading">
    <div class="container">
      <div class="section-header text-center reveal-on-scroll">
        <div class="section-eyebrow-wrap">
          <span class="gold-accent-line" aria-hidden="true"></span>
          <span class="section-eyebrow">ABOUT OUR INSTITUTION</span>
          <span class="gold-accent-line" aria-hidden="true"></span>
        </div>
        <h2 id="company-heading" class="section-title">${company.name}</h2>
        <p class="section-subtitle">
          Established to cultivate thrift, mutual savings, and financial self-reliance among members with complete regulatory transparency, ethical governance, and doorstep support.
        </p>
      </div>

      <!-- 4 Stat / Statutory Cards Grid -->
      <div class="stats-cards-grid">
        ${statCardsHtml}
      </div>

      <!-- Institutional Assurance Statutory Banner -->
      <div class="statutory-callout reveal-on-scroll">
        <div class="statutory-seal-icon">
          <img src="${company.logoUrl}" alt="${company.name} Official Seal" width="58" height="58" loading="lazy" class="official-statutory-seal" />
        </div>
        <div class="statutory-text-col">
          <h4>Incorporated under the Companies Act, 2013</h4>
          <p>BARIK ANITA NIDHI LIMITED is an officially registered Nidhi Company (NBFC-Nidhi) under the Ministry of Corporate Affairs, Government of India. Operating exclusively for mutual benefit and sustainable community prosperity across West Bengal.</p>
        </div>
        <div class="statutory-verified-badge">
          <span class="verified-tag">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            Active & Verified
          </span>
        </div>
      </div>
    </div>
  </section>
  `;
}
