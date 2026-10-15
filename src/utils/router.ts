/**
 * Client-Side Router for BARIK ANITA NIDHI LIMITED
 * Supports direct path routing (/our-projects, /our-projects/riverview-homestay),
 * hash fallback (#/our-projects), browser back/forward, and smooth section scrolling.
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
import { setup3dScrollEffects } from './scroll-3d';

export type AppRoute = 'home' | 'projects' | 'property-detail';

export interface RouteMatch {
  route: AppRoute;
  params: Record<string, string>;
  hash?: string;
}

export function parseCurrentLocation(): RouteMatch {
  const path = window.location.pathname.replace(/\/$/, '') || '/';
  const hash = window.location.hash;

  // 1. Check pathname first
  if (path === '/our-projects' || path === '/our-projects/') {
    return { route: 'projects', params: {} };
  }

  if (path.startsWith('/our-projects/')) {
    const slug = path.replace('/our-projects/', '').split('/')[0];
    return { route: 'property-detail', params: { slug: slug || 'riverview-homestay' }, hash: hash ? hash.substring(1) : undefined };
  }

  // 2. Check hash fallback (e.g. #/our-projects or #our-projects)
  if (hash === '#/our-projects' || hash === '#our-projects') {
    return { route: 'projects', params: {} };
  }

  if (hash.startsWith('#/our-projects/') || hash.startsWith('#our-projects/')) {
    const raw = hash.replace(/^#\/?our-projects\//, '').split('/')[0];
    const [slug, subHash] = raw.split('#');
    return { route: 'property-detail', params: { slug: slug || 'riverview-homestay' }, hash: subHash };
  }

  return { route: 'home', params: {}, hash: hash ? hash.substring(1) : undefined };
}

export function renderRoute(routeMatch: RouteMatch): void {
  const mainContent = document.getElementById('main-content');
  if (!mainContent) return;

  switch (routeMatch.route) {
    case 'projects':
      document.title = 'Our Projects - Eco Homestays & Community Initiatives | BARIK ANITA NIDHI LIMITED';
      mainContent.innerHTML = renderOurProjectsPage();
      window.scrollTo({ top: 0, behavior: 'instant' });
      break;

    case 'property-detail': {
      const slug = routeMatch.params.slug || 'riverview-homestay';
      if (slug === 'hotel-newa-gangtok') {
        document.title = 'Hotel Newa, Gangtok - MG Market, Sikkim | Our Projects | BARIK ANITA NIDHI LIMITED';
      } else {
        document.title = 'Riverview Homestay, Darjeeling - Sittong Jogighat | Our Projects | BARIK ANITA NIDHI LIMITED';
      }
      mainContent.innerHTML = renderPropertyDetailPage(slug);
      if (routeMatch.hash) {
        setTimeout(() => {
          const el = document.getElementById(routeMatch.hash!);
          if (el) {
            const header = document.getElementById('site-header');
            const offset = (header?.offsetHeight || 80) + 10;
            const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
          }
        }, 120);
      } else {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
      setupPropertyLightbox();
      break;
    }

    case 'home':
    default:
      document.title = 'BARIK ANITA NIDHI LIMITED | Financial & Banking Services';
      // Homepage: Our Projects is hidden from here
      mainContent.innerHTML = `
        ${renderHero()}
        ${renderFinanceServices()}
        ${renderBankingServices()}
        ${renderGoldLoan()}
        ${renderDirectors()}
        ${renderContact()}
        ${renderCompanySection()}
      `;

      if (routeMatch.hash) {
        setTimeout(() => {
          const el = document.getElementById(routeMatch.hash!);
          if (el) {
            const header = document.getElementById('site-header');
            const offset = (header?.offsetHeight || 80) + 10;
            const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
          }
        }, 80);
      } else {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
      break;
  }

  // Re-run animation and 3D visual bindings
  setupScrollReveals();
  setup3dScrollEffects();
  updateNavActiveState(routeMatch.route);
}

export function navigateTo(targetPath: string, hash?: string): void {
  let pathOnly = targetPath;
  let targetHash = hash;
  if (!targetHash && targetPath.includes('#')) {
    const parts = targetPath.split('#');
    pathOnly = parts[0];
    targetHash = parts[1];
  }

  const targetClean = pathOnly.replace(/\/$/, '') || '/';
  const fullUrl = targetHash ? `${targetClean}#${targetHash}` : targetClean;

  if (window.location.pathname !== targetClean || window.location.hash !== (targetHash ? `#${targetHash}` : '')) {
    window.history.pushState(null, '', fullUrl);
  }

  const match = parseCurrentLocation();
  renderRoute(match);

  // Close mobile drawer if open
  const mobileMenu = document.getElementById('mobile-menu');
  const menuToggle = document.getElementById('mobile-menu-toggle');
  if (mobileMenu?.classList.contains('menu-open') && menuToggle) {
    mobileMenu.classList.remove('menu-open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('mobile-nav-active');
  }
}

export function setupRouter(): void {
  // Listen to popstate (back/forward navigation)
  window.addEventListener('popstate', () => {
    const match = parseCurrentLocation();
    renderRoute(match);
  });

  // Listen to hashchange
  window.addEventListener('hashchange', () => {
    const match = parseCurrentLocation();
    renderRoute(match);
  });

  // Global click delegator for links
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement | null;
    const anchor = target?.closest<HTMLAnchorElement>('a');
    if (!anchor) return;

    const href = anchor.getAttribute('href');
    if (!href) return;

    // Skip mailto, tel, javascript, external links
    if (href.startsWith('tel:') || href.startsWith('mailto:') || href.startsWith('http://') || href.startsWith('https://')) {
      return;
    }

    // Explicit route attribute
    const dataRoute = anchor.getAttribute('data-route');
    if (dataRoute) {
      e.preventDefault();
      navigateTo(dataRoute);
      return;
    }

    // Link directly to /our-projects or /our-projects/...
    if (href === '/our-projects' || href.startsWith('/our-projects/')) {
      e.preventDefault();
      navigateTo(href);
      return;
    }

    // Link directly to /
    if (href === '/') {
      e.preventDefault();
      navigateTo('/');
      return;
    }

    // In-page anchor hash link (e.g. #finance-services, #contact, #home)
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetHash = href.substring(1);
      const match = parseCurrentLocation();

      if (targetHash === 'our-projects') {
        navigateTo('/our-projects');
        return;
      }

      if (match.route !== 'home') {
        // If we are on /our-projects, navigate back to home with the hash!
        navigateTo('/', targetHash);
      } else {
        // Already on home, smooth scroll
        const targetElement = document.getElementById(targetHash);
        if (targetElement) {
          const header = document.getElementById('site-header');
          const headerOffset = header?.offsetHeight || 80;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: Math.max(0, offsetPosition),
            behavior: 'smooth'
          });

          // Close mobile menu if open
          const mobileMenu = document.getElementById('mobile-menu');
          const menuToggle = document.getElementById('mobile-menu-toggle');
          if (mobileMenu?.classList.contains('menu-open') && menuToggle) {
            mobileMenu.classList.remove('menu-open');
            mobileMenu.setAttribute('aria-hidden', 'true');
            menuToggle.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('mobile-nav-active');
          }

          window.history.pushState(null, '', href);
        }
      }
    }
  });

  // Initial render
  const initialMatch = parseCurrentLocation();
  renderRoute(initialMatch);
}

function updateNavActiveState(currentRoute: AppRoute): void {
  const navLinks = document.querySelectorAll<HTMLAnchorElement>('.nav-link, .mobile-nav-link');
  navLinks.forEach((link) => {
    const id = link.getAttribute('id') || '';
    const href = link.getAttribute('href') || '';

    if (currentRoute === 'projects' || currentRoute === 'property-detail') {
      if (id === 'nav-projects' || id === 'mobile-nav-projects' || href === '/our-projects') {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      } else {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
      }
    } else if (currentRoute === 'home') {
      if (id === 'nav-projects' || id === 'mobile-nav-projects' || href === '/our-projects') {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
      }
    }
  });
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
