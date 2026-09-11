import { siteData } from '../data/site-data';

export function renderMobileBar(): string {
  const { contact } = siteData;

  return `
  <!-- Smartphone Sticky Quick-Action Bar (Active on Mobile Screens <= 640px) -->
  <aside class="mobile-sticky-bar" aria-label="Quick Mobile Actions">
    <div class="mobile-sticky-bar-inner">
      <a href="tel:${contact.phone}" class="mobile-bar-action action-call" id="mobile-quick-call" aria-label="Call Office: ${contact.phoneDisplay}">
        <div class="mobile-bar-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
          </svg>
        </div>
        <span class="mobile-bar-label">Call Office</span>
      </a>

      <a href="${contact.whatsappUrl}" target="_blank" rel="noopener noreferrer" class="mobile-bar-action action-whatsapp" id="mobile-quick-whatsapp" aria-label="Message on WhatsApp">
        <div class="mobile-bar-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
          </svg>
        </div>
        <span class="mobile-bar-label">WhatsApp</span>
      </a>

      <a href="#contact" class="mobile-bar-action action-inquire" id="mobile-quick-inquire" aria-label="Branch Location & Inquiry">
        <div class="mobile-bar-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
        </div>
        <span class="mobile-bar-label">Inquire / Visit</span>
      </a>
    </div>
  </aside>
  `;
}
