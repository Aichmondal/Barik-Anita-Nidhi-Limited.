/**
 * BARIK ANITA NIDHI LIMITED - Corporate Website Application
 * Production-ready Vanilla TypeScript Architecture with Multi-Page Routing
 */
import './style.css';
import { renderHeader } from './components/header';
import { renderFooter } from './components/footer';
import { renderMobileBar } from './components/mobile-bar';
import { setupNavigation } from './utils/navigation';
import { setupRouter } from './utils/router';

function initApp(): void {
  const appRoot = document.getElementById('app');
  if (!appRoot) {
    console.error('Root element #app not found');
    return;
  }

  // Assemble persistent semantic HTML layout structure
  appRoot.innerHTML = `
    <a href="#main-content" class="skip-link">Skip to main content</a>
    ${renderHeader()}
    <main id="main-content" role="main"></main>
    ${renderFooter()}
    ${renderMobileBar()}
  `;

  // Initialize interactive navigation behaviors and mobile drawer
  setupNavigation();

  // Initialize multi-page routing (/ for Home, /our-projects for Projects, /our-projects/riverview-homestay for Property Detail)
  setupRouter();
}

// Boot application when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
