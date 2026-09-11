import { siteData } from '../data/site-data';

export function renderDirectors(): string {
  const { directors, directorsHeader } = siteData;

  const cardsHtml = directors
    .map(
      (director, index) => `
      <article class="card-luxury director-card-item reveal-on-scroll" style="--reveal-delay: ${index * 120}ms;" id="${director.id}">
        <div class="director-portrait-wrap">
          <img 
            src="${director.image}" 
            alt="Portrait of ${director.name}, ${director.role}" 
            class="director-portrait-img"
            loading="lazy"
            width="280"
            height="280"
          />
          <div class="director-role-badge">${director.role}</div>
        </div>

        <h3 class="director-name-heading">${director.name}</h3>
        <p class="director-designation">${director.role}</p>
        
        <div class="director-appointment-box">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          <span>Appointed: <strong>${director.appointmentDate}</strong></span>
        </div>

        <div class="director-compliance-pill">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span>MCA Registered Board Member</span>
        </div>
      </article>`
    )
    .join('');

  return `
  <section id="directors" class="section-padding bg-sky" aria-labelledby="directors-heading">
    <div class="container">
      <div class="section-header text-center reveal-on-scroll">
        <div class="section-eyebrow-wrap">
          <span class="gold-accent-line" aria-hidden="true"></span>
          <span class="section-eyebrow">LEADERSHIP &amp; GOVERNANCE</span>
          <span class="gold-accent-line" aria-hidden="true"></span>
        </div>
        <h2 id="directors-heading" class="section-title">${directorsHeader.heading}</h2>
        <p class="section-subtitle">
          ${directorsHeader.description}
        </p>
      </div>

      <!-- 3 Director Cards Grid -->
      <div class="directors-cards-grid">
        ${cardsHtml}
      </div>

      <!-- Governance Assurance Banner with Official Logo -->
      <div class="directors-assurance-card reveal-on-scroll">
        <div class="assurance-content">
          <img src="${siteData.company.logoUrl}" alt="${siteData.company.name} Official Board Seal" class="assurance-logo-seal" width="34" height="34" />
          <p>
            The Board of Directors is committed to upholding the statutory tenets of the Nidhi Rules, 2014, ensuring full regulatory accountability, member welfare, and financial stability.
          </p>
        </div>
      </div>
    </div>
  </section>
  `;
}
