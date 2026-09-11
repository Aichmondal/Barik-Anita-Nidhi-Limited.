import { siteData } from '../data/site-data';

export function renderFooter(): string {
  const { company, navigation, contact, footer } = siteData;

  const navLinksHtml = navigation
    .map(
      (item) => `
      <li>
        <a href="${item.href}" class="footer-nav-link">
          ${item.label}
        </a>
      </li>`
    )
    .join('');

  return `
  <footer id="site-footer" class="site-footer" role="contentinfo">
    <div class="container">
      <div class="footer-top-grid">
        <!-- Brand Info Column -->
        <div class="footer-col footer-brand-col">
          <div class="footer-brand">
            <a href="/" class="brand-logo-link footer-logo-link" aria-label="Atal Production House home">
              <img 
                src="/logo.png" 
                alt="Atal Production House logo" 
                class="brand-logo footer-brand-logo" 
                width="64" 
                height="64" 
                loading="lazy" 
              />
            </a>
            <div class="footer-brand-text">
              <span class="footer-company-name">${company.name}</span>
              <span class="footer-tagline">${company.tagline}</span>
            </div>
          </div>
          <p class="footer-brief">
            Approved by Indian Government. Incorporated on 6th April, 2022 to provide reliable community micro-loans and secure deposit avenues for members.
          </p>
          <div class="footer-statutory-tags">
            <span class="stat-pill">CIN: ${company.cin}</span>
            <span class="stat-pill">Reg. No: ${company.registrationNo}</span>
            <span class="stat-pill">ROC Kolkata</span>
          </div>
        </div>

        <!-- Quick Links Column -->
        <div class="footer-col footer-links-col">
          <h4 class="footer-col-title">Navigation</h4>
          <ul class="footer-links-list">
            ${navLinksHtml}
          </ul>
        </div>

        <!-- Services Shortcut Column -->
        <div class="footer-col footer-services-col">
          <h4 class="footer-col-title">Services &amp; Schemes</h4>
          <ul class="footer-links-list">
            <li><a href="#finance-services" class="footer-nav-link">Group Loan</a></li>
            <li><a href="#finance-services" class="footer-nav-link">Micro Business Loan</a></li>
            <li><a href="#finance-services" class="footer-nav-link">Product Loan</a></li>
            <li><a href="#banking-services" class="footer-nav-link">Recurring Deposit (RD)</a></li>
            <li><a href="#banking-services" class="footer-nav-link">Fixed Deposit (FD)</a></li>
            <li><a href="#banking-services" class="footer-nav-link">Monthly Income Scheme (MIS)</a></li>
            <li><a href="#gold-loan" class="footer-nav-link">Gold Loan (Upcoming)</a></li>
          </ul>
        </div>

        <!-- Contact Shortcuts Column -->
        <div class="footer-col footer-contact-col">
          <h4 class="footer-col-title">Contact &amp; Helpdesk</h4>
          <address class="footer-address">
            ${contact.headOffice.line1}, ${contact.headOffice.line2},<br>
            ${contact.headOffice.city}, ${contact.headOffice.state}, India - ${contact.headOffice.pincode}
          </address>
          <div class="footer-contact-links">
            <a href="tel:${contact.phone}" class="footer-contact-item">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <span>${contact.phoneDisplay}</span>
            </a>
            <a href="mailto:${contact.email}" class="footer-contact-item">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              <span>${contact.email}</span>
            </a>
          </div>

          <!-- Social / Channel Icons -->
          <div class="footer-social-icons">
            <a href="${contact.whatsappUrl}" target="_blank" rel="noopener noreferrer" class="social-icon-link" aria-label="WhatsApp">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
              </svg>
            </a>
            <a href="${contact.facebookUrl}" target="_blank" rel="noopener noreferrer" class="social-icon-link" aria-label="Facebook">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            <a href="${contact.mapsUrl}" target="_blank" rel="noopener noreferrer" class="social-icon-link" aria-label="Google Maps Location">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon>
                <line x1="8" y1="2" x2="8" y2="18"></line>
                <line x1="16" y1="6" x2="16" y2="22"></line>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <!-- Legal / Statutory Disclaimer & Copyright -->
      <div class="footer-bottom-bar">
        <p class="footer-legal-notice">
          ${footer.notice}
        </p>
        <div class="footer-copy-wrap">
          <p class="footer-copyright">${footer.copyright}</p>
          <span class="footer-tag">Official Corporate Web Portal</span>
        </div>
      </div>
    </div>
  </footer>
  `;
}
