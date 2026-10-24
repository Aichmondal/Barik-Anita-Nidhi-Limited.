/**
 * Client-Side Hash-Based Router for BARIK ANITA NIDHI LIMITED
 * Supports hash-based routing (#home, #banking-services, #our-projects, #career, #contact),
 * persistent view containers, hashchange listener, page-load hash checking,
 * and seamless refresh handling on /#career, /#our-projects, etc.
 */

import { renderHero } from '../components/hero';
import { renderFinanceServices } from '../components/finance-services';
import { renderBankingServices } from '../components/banking-services';
import { renderGoldLoan } from '../components/gold-loan';
import { renderDirectors } from '../components/directors';
import { renderContact } from '../components/contact';
import { renderCompanySection } from '../components/company';
import { renderOurProjectsPage } from '../components/projects-page';
import { renderPropertyDetailPage } from '../components/property-detail-page';
import { renderCareerPage, setupCareerPageInteractions } from '../components/career-page';
import { setup3dScrollEffects } from './scroll-3d';

export type AppRoute = 'home' | 'projects' | 'property-detail' | 'career';

export interface RouteMatch {
  route: AppRoute;
  params: Record<string, string>;
  targetSection?: string;
  subHash?: string;
}

/**
 * Parse route and parameters from the current URL hash and pathname
 */
export function parseCurrentLocation(): RouteMatch {
  const rawHash = window.location.hash || '';
  let cleanHash = rawHash.replace(/^#\/?/, '').trim();
  const path = window.location.pathname.replace(/\/$/, '') || '/';

  // Fallback for direct pathname access (e.g. /career, /our-projects)
  if (!cleanHash) {
    if (path === '/career' || path === '/carrier') {
      cleanHash = 'career';
      window.history.replaceState(null, '', '#career');
    } else if (path === '/our-projects' || path === '/projects') {
      cleanHash = 'our-projects';
      window.history.replaceState(null, '', '#our-projects');
    } else if (path.startsWith('/our-projects/')) {
      const slug = path.replace('/our-projects/', '').split('/')[0];
      cleanHash = `our-projects/${slug}`;
      window.history.replaceState(null, '', `#our-projects/${slug}`);
    }
  }

  // 1. Career Route
  if (cleanHash === 'career' || cleanHash === 'carrier') {
    return { route: 'career', params: {} };
  }

  // 2. Our Projects Route
  if (cleanHash === 'our-projects' || cleanHash === 'projects') {
    return { route: 'projects', params: {} };
  }

  // 3. Property Detail Route (e.g. #our-projects/riverview-homestay or #our-projects/hotel-newa-gangtok#gallery)
  if (
    cleanHash.startsWith('our-projects/') ||
    cleanHash.startsWith('projects/') ||
    cleanHash.startsWith('property-')
  ) {
    let slug = 'riverview-homestay';
    let subHash: string | undefined;

    if (cleanHash.startsWith('our-projects/')) {
      const parts = cleanHash.replace('our-projects/', '').split('#');
      slug = parts[0] || 'riverview-homestay';
      subHash = parts[1];
    } else if (cleanHash.startsWith('projects/')) {
      const parts = cleanHash.replace('projects/', '').split('#');
      slug = parts[0] || 'riverview-homestay';
      subHash = parts[1];
    } else if (cleanHash.startsWith('property-')) {
      slug = cleanHash.replace('property-', '');
    }

    return {
      route: 'property-detail',
      params: { slug },
      subHash
    };
  }

  // 4. Home Route and Home Sections (e.g. #home, #banking-services, #finance-services, #contact, #gold-loan, #directors, #company)
  const homeSections = [
    'home',
    'finance-services',
    'banking-services',
    'gold-loan',
    'directors',
    'contact',
    'company'
  ];

  const targetSection = cleanHash && homeSections.includes(cleanHash) ? cleanHash : (cleanHash || 'home');

  return {
    route: 'home',
    params: {},
    targetSection
  };
}

/**
 * Handle view switching and smooth scrolling based on current route
 */
export function handleHashNavigation(): void {
  const match = parseCurrentLocation();

  const homeView = document.getElementById('view-home');
  const projectsView = document.getElementById('our-projects');
  const careerView = document.getElementById('career');
  const propertyView = document.getElementById('view-property-detail');

  // Deactivate all views first
  [homeView, projectsView, careerView, propertyView].forEach((view) => {
    view?.classList.remove('is-active');
  });

  switch (match.route) {
    case 'career':
      careerView?.classList.add('is-active');
      document.title = '2026 Recruitment - Career Opportunity | BARIK ANITA NIDHI LIMITED';
      window.scrollTo({ top: 0, behavior: 'instant' });
      updateNavActiveState('career');
      break;

    case 'projects':
      projectsView?.classList.add('is-active');
      document.title = 'Our Projects - Eco Homestays & Community Initiatives | BARIK ANITA NIDHI LIMITED';
      window.scrollTo({ top: 0, behavior: 'instant' });
      updateNavActiveState('projects');
      break;

    case 'property-detail': {
      const slug = match.params.slug || 'riverview-homestay';
      if (propertyView) {
        if (propertyView.getAttribute('data-slug') !== slug) {
          propertyView.innerHTML = renderPropertyDetailPage(slug);
          propertyView.setAttribute('data-slug', slug);
          setupPropertyLightbox();
        }
        propertyView.classList.add('is-active');
      }

      if (slug === 'hotel-newa-gangtok') {
        document.title = 'Hotel Newa, Gangtok - MG Market, Sikkim | Our Projects | BARIK ANITA NIDHI LIMITED';
      } else {
        document.title = 'Riverview Homestay, Darjeeling - Sittong Jogighat | Our Projects | BARIK ANITA NIDHI LIMITED';
      }

      updateNavActiveState('projects');

      if (match.subHash === 'gallery') {
        setTimeout(() => {
          const galleryEl = document.getElementById('gallery');
          if (galleryEl) {
            const header = document.getElementById('site-header');
            const offset = (header?.offsetHeight || 80) + 10;
            const top = galleryEl.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
          }
        }, 80);
      } else {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
      break;
    }

    case 'home':
    default: {
      homeView?.classList.add('is-active');
      document.title = 'BARIK ANITA NIDHI LIMITED | Financial & Banking Services';

      const targetId = match.targetSection;
      if (targetId && targetId !== 'home') {
        setTimeout(() => {
          const targetEl = document.getElementById(targetId);
          if (targetEl) {
            const header = document.getElementById('site-header');
            const offset = (header?.offsetHeight || 80) + 10;
            const top = targetEl.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
          }
        }, 60);
        updateNavActiveState(targetId);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        updateNavActiveState('home');
      }
      break;
    }
  }

  // Close mobile drawer if open
  closeMobileMenu();

  // Re-run scroll animations
  setupScrollReveals();
  setup3dScrollEffects();
}

/**
 * Close mobile slide-down menu
 */
function closeMobileMenu(): void {
  const mobileMenu = document.getElementById('mobile-menu');
  const menuToggle = document.getElementById('mobile-menu-toggle');
  if (mobileMenu?.classList.contains('menu-open') && menuToggle) {
    mobileMenu.classList.remove('menu-open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('mobile-nav-active');
  }
}

/**
 * Updates active class on desktop and mobile navigation links
 */
function updateNavActiveState(activeTarget: string): void {
  const navLinks = document.querySelectorAll<HTMLAnchorElement>('.nav-link, .mobile-nav-link');
  const targetHash = activeTarget.startsWith('#') ? activeTarget : `#${activeTarget}`;

  navLinks.forEach((link) => {
    const id = link.getAttribute('id') || '';
    const href = link.getAttribute('href') || '';

    if (activeTarget === 'career') {
      if (id === 'nav-career' || id === 'mobile-nav-career' || href === '#career' || href === '#/career') {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      } else {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
      }
    } else if (activeTarget === 'projects' || activeTarget === 'property-detail') {
      if (id === 'nav-projects' || id === 'mobile-nav-projects' || href === '#our-projects' || href === '#projects' || href === '#/our-projects') {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      } else {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
      }
    } else {
      // Home sections (e.g. #home, #banking-services, #finance-services, #contact, etc.)
      if (href === targetHash || (targetHash === '#home' && (href === '#home' || href === '/'))) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      } else {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
      }
    }
  });
}

/**
 * Initialize all views into #main-content and register hashchange / click listeners
 */
export function setupRouter(): void {
  const mainContent = document.getElementById('main-content');
  if (!mainContent) return;

  // Mount persistent view containers into #main-content
  mainContent.innerHTML = `
    <!-- 1. Home View Container (Hero, Finance, Banking, Gold Loan, Directors, Contact, Company) -->
    <div id="view-home" class="page-view-container is-active">
      ${renderHero()}
      ${renderFinanceServices()}
      ${renderBankingServices()}
      ${renderGoldLoan()}
      ${renderDirectors()}
      ${renderContact()}
      ${renderCompanySection()}
    </div>

    <!-- 2. Dedicated Our Projects View Container -->
    <div id="our-projects" class="page-view-container">
      ${renderOurProjectsPage()}
    </div>

    <!-- 3. Dedicated Career View Container -->
    <div id="career" class="page-view-container">
      ${renderCareerPage()}
    </div>

    <!-- 4. Dedicated Property Detail View Container -->
    <div id="view-property-detail" class="page-view-container"></div>
  `;

  // Initialize Career Page recruitment modal
  setupCareerPageInteractions();

  // Listen for hash changes (e.g. clicking #career, #our-projects, #contact)
  window.addEventListener('hashchange', () => {
    handleHashNavigation();
  });

  // Listen for popstate (browser back/forward)
  window.addEventListener('popstate', () => {
    handleHashNavigation();
  });

  // Global click delegator for link navigation and drawer close
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement | null;
    const anchor = target?.closest<HTMLAnchorElement>('a');
    if (!anchor) return;

    const href = anchor.getAttribute('href');
    if (!href) return;

    // Skip external protocols
    if (
      href.startsWith('tel:') ||
      href.startsWith('mailto:') ||
      href.startsWith('http://') ||
      href.startsWith('https://')
    ) {
      return;
    }

    // Direct pathname conversions to hash
    if (href === '/career' || href === '/carrier') {
      e.preventDefault();
      window.location.hash = '#career';
      return;
    }

    if (href === '/our-projects' || href === '/projects') {
      e.preventDefault();
      window.location.hash = '#our-projects';
      return;
    }

    if (href.startsWith('/our-projects/')) {
      e.preventDefault();
      const slug = href.replace('/our-projects/', '');
      window.location.hash = `#our-projects/${slug}`;
      return;
    }

    if (href === '/') {
      e.preventDefault();
      window.location.hash = '#home';
      return;
    }

    // When clicking a hash link matching the current hash (e.g. clicking #contact again while on #contact)
    if (href.startsWith('#') && href === window.location.hash) {
      e.preventDefault();
      handleHashNavigation();
    }
  });

  // Initial check on page load / refresh (handles /#career, /#our-projects, /#contact, etc.)
  handleHashNavigation();
}

/**
 * Programmatic navigation helper
 */
export function navigateTo(targetHash: string): void {
  const clean = targetHash.startsWith('#') ? targetHash : `#${targetHash}`;
  if (window.location.hash === clean) {
    handleHashNavigation();
  } else {
    window.location.hash = clean;
  }
}

function setupScrollReveals(): void {
  const revealElements = document.querySelectorAll<HTMLElement>('.reveal-on-scroll');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add('is-revealed'));
  }
}

function setupPropertyLightbox(): void {
  const lightbox = document.getElementById('property-lightbox');
  const lightboxImg = document.getElementById('lightbox-img') as HTMLImageElement | null;
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxCloseTriggers = document.querySelectorAll<HTMLElement>('[data-close-lightbox]');
  const galleryThumbBtns = document.querySelectorAll<HTMLButtonElement>('.gallery-thumb-btn');

  function openLightbox(src: string, alt: string, title: string): void {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    lightboxImg.alt = alt;
    lightboxImg.onerror = () => {
      if (src.endsWith('.webp')) {
        lightboxImg.src = src.replace('.webp', '.png');
      }
    };
    if (lightboxCaption) {
      lightboxCaption.textContent = title;
    }
    lightbox.classList.add('is-active');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
  }

  function closeLightbox(): void {
    if (!lightbox) return;
    lightbox.classList.remove('is-active');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    if (lightboxImg) {
      lightboxImg.src = '';
    }
  }

  galleryThumbBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const src = btn.getAttribute('data-lightbox-src');
      const alt = btn.getAttribute('data-lightbox-alt') || '';
      const title = btn.getAttribute('data-lightbox-title') || '';
      if (src) {
        openLightbox(src, alt, title);
      }
    });
  });

  lightboxCloseTriggers.forEach((trigger) => {
    trigger.addEventListener('click', closeLightbox);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox?.classList.contains('is-active')) {
      closeLightbox();
    }
  });
}
