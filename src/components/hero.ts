import { siteData } from '../data/site-data';

export function renderHero(): string {
  const { hero, company } = siteData;

  return `
  <section id="home" class="hero-section" aria-label="Hero Introduction">
    <div class="container">
      <div class="hero-stacked-container reveal-on-scroll">
        <!-- Centered Main Headline -->
        <div class="hero-center-header">
          <h1 class="hero-main-title hero-title-centered">
            Your Success , Our Stories
          </h1>
        </div>

        <!-- Larger Format Visual Showcase -->
        <div class="hero-visual-large-wrapper">
          <div class="hero-visual-card hero-visual-card-large">
            <img 
              src="https://res.cloudinary.com/qfyvlsqf/image/upload/v1789199057/d3b77862-24c7-4696-a23e-8549b2cd7c8c.png" 
              alt="BARIK ANITA NIDHI LIMITED - Community Financial Growth and Trust" 
              class="hero-showcase-img hero-showcase-img-large"
              loading="eager"
              width="1200"
              height="675"
            />
          </div>
        </div>

        <!-- CTA Buttons: Explore Services & Contact Us -->
        <div class="hero-cta-row hero-cta-centered">
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
    </div>
  </section>
  `;
}
