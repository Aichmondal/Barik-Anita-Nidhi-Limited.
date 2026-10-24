/**
 * Navigation and Interactive Utilities for BARIK ANITA NIDHI LIMITED
 */

export function setupNavigation(): void {
  const header = document.querySelector<HTMLElement>('#site-header');
  const menuToggle = document.querySelector<HTMLButtonElement>('#mobile-menu-toggle');
  const mobileMenu = document.querySelector<HTMLElement>('#mobile-menu');
  const navLinks = document.querySelectorAll<HTMLAnchorElement>('.nav-link, .mobile-nav-link, .mobile-bar-action[href^="#"], .header-cta-btn, .mobile-cta-link, .footer-nav-link');

  // 1. Scroll-sensitive header compacting
  const handleScroll = (): void => {
    if (!header) return;
    if (window.scrollY > 40) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check

  // 2. Mobile Menu Toggle
  if (menuToggle && mobileMenu) {
    const toggleMenu = (open?: boolean): void => {
      const isOpen = open !== undefined ? open : !mobileMenu.classList.contains('menu-open');
      if (isOpen) {
        mobileMenu.classList.add('menu-open');
        mobileMenu.setAttribute('aria-hidden', 'false');
        menuToggle.setAttribute('aria-expanded', 'true');
        menuToggle.setAttribute('aria-label', 'Close navigation menu');
        document.body.classList.add('mobile-nav-active');
      } else {
        mobileMenu.classList.remove('menu-open');
        mobileMenu.setAttribute('aria-hidden', 'true');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Open navigation menu');
        document.body.classList.remove('mobile-nav-active');
      }
    };

    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('menu-open')) {
        toggleMenu(false);
        menuToggle.focus();
      }
    });

    // Close when clicking outside mobile menu
    document.addEventListener('click', (e) => {
      if (
        mobileMenu.classList.contains('menu-open') &&
        !mobileMenu.contains(e.target as Node) &&
        !menuToggle.contains(e.target as Node)
      ) {
        toggleMenu(false);
      }
    });
  }

  // 3. Highlight active nav items on scroll using IntersectionObserver (only when on Home view)
  const sections = document.querySelectorAll<HTMLElement>('section[id], header[id="home"]');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        const homeView = document.getElementById('view-home');
        if (homeView && !homeView.classList.contains('is-active')) {
          return;
        }
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            if (id) {
              updateActiveLink(`#${id}`);
            }
          }
        });
      },
      {
        rootMargin: '-20% 0px -70% 0px'
      }
    );

    sections.forEach((sec) => observer.observe(sec));
  }

  function updateActiveLink(hash: string): void {
    navLinks.forEach((l) => {
      if (l.getAttribute('href') === hash) {
        l.classList.add('active');
        l.setAttribute('aria-current', 'page');
      } else {
        l.classList.remove('active');
        l.removeAttribute('aria-current');
      }
    });
  }

  // 5. Scroll reveal animation for cards & sections
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
    // Fallback for older browsers
    revealElements.forEach((el) => el.classList.add('is-revealed'));
  }
}
