import { siteData } from '../data/site-data';

export function renderContact(): string {
  const { contact } = siteData;

  return `
  <section id="contact" class="section-padding bg-main" aria-labelledby="contact-heading">
    <div class="container">
      <div class="section-header text-center reveal-on-scroll">
        <div class="section-eyebrow-wrap">
          <span class="gold-accent-line" aria-hidden="true"></span>
          <span class="section-eyebrow">GET IN TOUCH</span>
          <span class="gold-accent-line" aria-hidden="true"></span>
        </div>
        <h2 id="contact-heading" class="section-title">We're Here To Assist You</h2>
        <p class="section-subtitle">
          Whether you have questions regarding membership eligibility, group loans, or deposit schemes, our branch team is readily available.
        </p>
      </div>

      <div class="contact-layout-columns">
        <!-- Official Registered Contact Details Card -->
        <div class="card-luxury contact-main-card reveal-on-scroll">
          <div class="contact-head-row">
            <h3 class="contact-head-title">Head Office</h3>
            <p class="contact-head-subtitle">Official Registered Office Address &bull; Government Verified Location</p>
          </div>

          <div class="contact-items-stack">
            <!-- Office Address Item -->
            <div class="contact-single-item">
              <div class="contact-icon-bubble" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
              <div class="contact-detail-col">
                <span class="contact-label-tag">Address</span>
                <address class="contact-address-text">
                  ${contact.headOffice.line1},<br>
                  ${contact.headOffice.line2},<br>
                  ${contact.headOffice.city}, ${contact.headOffice.state},<br>
                  ${contact.headOffice.country} - ${contact.headOffice.pincode}
                </address>
              </div>
            </div>

            <!-- Phone Item -->
            <div class="contact-single-item">
              <div class="contact-icon-bubble" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </div>
              <div class="contact-detail-col">
                <span class="contact-label-tag">Official Phone</span>
                <a href="tel:${contact.phone}" class="contact-action-link" id="contact-phone-link">
                  ${contact.phoneDisplay}
                </a>
                <span class="contact-subhint">Monday to Saturday &bull; Standard network call rates apply</span>
              </div>
            </div>

            <!-- Email Item -->
            <div class="contact-single-item">
              <div class="contact-icon-bubble" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
              <div class="contact-detail-col">
                <span class="contact-label-tag">Email Inquiries</span>
                <a href="mailto:${contact.email}" class="contact-action-link" id="contact-email-link">
                  ${contact.email}
                </a>
                <span class="contact-subhint">Official correspondences replied within 24-48 hours</span>
              </div>
            </div>

            <!-- Operating Hours Item -->
            <div class="contact-single-item">
              <div class="contact-icon-bubble" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
              <div class="contact-detail-col">
                <span class="contact-label-tag">Business Hours</span>
                <span style="color: var(--color-primary-text); font-weight: 600;">${contact.businessHours}</span>
              </div>
            </div>
          </div>

          <!-- Quick Connect Buttons (WhatsApp, Google Maps, Facebook) -->
          <div class="contact-channels-wrapper">
            <h4 class="channels-heading">Direct Connect Channels</h4>
            <div class="channels-btn-grid">
              <!-- WhatsApp Button -->
              <a 
                href="${contact.whatsappUrl}" 
                target="_blank" 
                rel="noopener noreferrer" 
                class="btn-channel-item channel-whatsapp" 
                id="btn-whatsapp"
                aria-label="Contact BARIK ANITA NIDHI LIMITED on WhatsApp"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
                <span>WhatsApp</span>
              </a>

              <!-- Google Maps Button -->
              <a 
                href="${contact.mapsUrl}" 
                target="_blank" 
                rel="noopener noreferrer" 
                class="btn-channel-item channel-maps" 
                id="btn-maps"
                aria-label="View Head Office on Google Maps"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon>
                  <line x1="8" y1="2" x2="8" y2="18"></line>
                  <line x1="16" y1="6" x2="16" y2="22"></line>
                </svg>
                <span>Locate Map</span>
              </a>

              <!-- Facebook Button -->
              <a 
                href="${contact.facebookUrl}" 
                target="_blank" 
                rel="noopener noreferrer" 
                class="btn-channel-item channel-facebook" 
                id="btn-facebook"
                aria-label="Visit official Facebook Page"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
                <span>Facebook</span>
              </a>
            </div>
          </div>
        </div>

        <!-- Right Side: Membership & Document Checklist Guide -->
        <div class="card-luxury contact-aside-card reveal-on-scroll" style="--reveal-delay: 150ms;">
          <div class="aside-title-block">
            <div class="aside-title-text">
              <h3>Visiting Guidelines</h3>
              <p>Member Advisory &amp; Documentation</p>
            </div>
            <img src="${siteData.company.logoUrl}" alt="${siteData.company.name} Official Emblem" class="contact-aside-logo" width="44" height="44" />
          </div>

          <div class="nidhi-notice-banner">
            <p>
              <strong>Statutory Notice:</strong> BARIK ANITA NIDHI LIMITED operates strictly under Section 406 of the Companies Act, 2013 and Nidhi Rules. All financial transactions are exclusively for registered members.
            </p>
          </div>

          <div class="visit-checklist">
            <h4>Documents for Member KYC &amp; Loan:</h4>
            <ul>
              <li>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Government Proof of Identity (Aadhaar Card / Voter Card)</span>
              </li>
              <li>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Permanent Account Number (PAN Card)</span>
              </li>
              <li>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Current Residential Address Verification document</span>
              </li>
              <li>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Recent passport-size color photographs (2 copies)</span>
              </li>
            </ul>
          </div>

          <div class="direct-phone-card">
            <div class="phone-card-text">
              <span>Direct Branch Helpline</span>
              <strong>${contact.phoneDisplay}</strong>
            </div>
            <a href="tel:${contact.phone}" class="btn btn-primary" style="padding: 10px 18px; min-height: 42px; font-size: 0.875rem;">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <span>Call Branch Now</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
  `;
}
