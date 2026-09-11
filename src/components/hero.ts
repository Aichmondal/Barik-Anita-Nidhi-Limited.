import { siteData } from '../data/site-data';

export function renderHero(): string {
  const { hero, company } = siteData;

  return `
  <section id="home" class="hero-section" aria-label="Hero Introduction">
    <div class="container">
      <div class="hero-grid">
        <!-- Left Hero Content -->
        <div class="hero-text-col reveal-on-scroll">
          <!-- Official Brand Hero Logo Emblem (100–140px) -->
          <div class="hero-brand-logo-container">
            <a href="/" class="hero-logo-link" aria-label="Atal Production House home">
              <img
                src="/logo.png"
                alt="Atal Production House logo"
                class="hero-brand-logo"
                width="120"
                height="120"
                loading="eager"
              />
            </a>
          </div>

          <!-- Main Headline with Highlighted Brand Green Word -->
          <h1 class="hero-main-title">
            Empowering <span class="hero-highlight-word">Communities</span>,
            <span class="hero-secondary-title">${hero.secondaryHeading}</span>
          </h1>

          <!-- Bengali Tagline -->
          <p class="hero-bengali-tagline" lang="bn">
            একসাথে বৃদ্ধি, একসাথে সমৃদ্ধি — আপনার আর্থিক নিরাপত্তার বিশ্বস্ত সঙ্গী
          </p>

          <!-- Editorial Lead Description with Spacious Padding -->
          <p class="hero-lead-text">
            ${hero.description}
          </p>

          <!-- CTA Buttons: Primary Green (#088740) & Secondary White/Green (#FFFFFF / #088740) -->
          <div class="hero-cta-row">
            <a href="${hero.primaryCta.href}" class="btn btn-primary" id="hero-explore-btn">
              <span>${hero.primaryCta.label}</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
            <a href="${hero.secondaryCta.href}" class="btn btn-secondary" id="hero-contact-btn">
              <span>${hero.secondaryCta.label}</span>
            </a>
          </div>
        </div>

        <!-- Right Hero Visual Showcase -->
        <div class="hero-visual-col reveal-on-scroll" style="--reveal-delay: 150ms;">
          <div class="hero-visual-card">
            <img 
              src="/assets/images/hero/hero-community.svg" 
              alt="BARIK ANITA NIDHI LIMITED - Community Financial Growth and Trust" 
              class="hero-showcase-img"
              loading="eager"
              width="800"
              height="600"
            />
            
            <!-- Floating Assurance Pill with Official Logo -->
            <div class="hero-floating-stat-pill">
              <div class="floating-pill-icon hero-pill-logo-box">
                <img 
                  src="${company.logoUrl}" 
                  alt="${company.name} Official Emblem" 
                  class="hero-floating-logo" 
                  width="36" 
                  height="36" 
                />
              </div>
              <div class="floating-pill-info">
                <strong>${company.name}</strong>
                <span>CIN: ${company.cin} &bull; ROC Kolkata</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  `;
}
