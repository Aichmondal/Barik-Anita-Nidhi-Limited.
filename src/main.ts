/**
 * BARIK ANITA NIDHI LIMITED - Corporate Website Application
 * Production-ready Vanilla TypeScript Architecture
 */
import './style.css';
import { renderHeader } from './components/header';
import { renderHero } from './components/hero';
import { renderCompanySection } from './components/company';
import { renderFinanceServices } from './components/finance-services';
import { renderBankingServices } from './components/banking-services';
import { renderGoldLoan } from './components/gold-loan';
import { renderDirectors } from './components/directors';
import { renderContact } from './components/contact';
import { renderFooter } from './components/footer';
import { renderMobileBar } from './components/mobile-bar';
import { setupNavigation } from './utils/navigation';
import { setup3dScrollEffects } from './utils/scroll-3d';

function initApp(): void {
  const appRoot = document.getElementById('app');
  if (!appRoot) {
    console.error('Root element #app not found');
    return;
  }

  // Assemble semantic HTML structure
  appRoot.innerHTML = `
    <a href="#main-content" class="skip-link">Skip to main content</a>
    ${renderHeader()}
    <main id="main-content" role="main">
      ${renderHero()}
      ${renderFinanceServices()}
      ${renderBankingServices()}
      ${renderGoldLoan()}
      ${renderDirectors()}
      ${renderContact()}
      ${renderCompanySection()}
    </main>
    ${renderFooter()}
    ${renderMobileBar()}
  `;

  // Initialize interactive behaviors, smooth scrolling, and scroll reveals
  setupNavigation();
  setup3dScrollEffects();
}

// Boot application when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
