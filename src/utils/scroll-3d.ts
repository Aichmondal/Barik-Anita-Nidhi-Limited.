/**
 * 3D Scroll and Depth Perspective Engine for BARIK ANITA NIDHI LIMITED
 * Applies fluid, GPU-accelerated 3D scroll effects to typography and images across all sections.
 */

export function setup3dScrollEffects(): void {
  // Check for reduced motion preference for accessibility
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  // 1. Identify and classify 3D Typography targets across all sections
  const typographySelectors = [
    '.hero-title-centered',
    '.hero-lead-text',
    '.section-header .section-eyebrow-wrap',
    '.section-header .section-title',
    '.section-header .section-subtitle',
    '.gold-section-title',
    '.gold-tagline-text',
    '.gold-lead-p',
    '.finance-card-title',
    '.banking-title',
    '.director-name-heading',
    '.stat-number-val',
    '.contact-head-title'
  ];

  const typographyElements: HTMLElement[] = [];
  typographySelectors.forEach((selector) => {
    document.querySelectorAll<HTMLElement>(selector).forEach((el) => {
      el.classList.add('scroll-3d-text');
      typographyElements.push(el);
    });
  });

  // 2. Identify and classify 3D Image & Visual Card targets across all sections
  const imageCardSelectors = [
    '.hero-visual-card-large',
    '.finance-card-item',
    '.banking-card-item',
    '.gold-luxury-container',
    '.gold-media-wrapper',
    '.director-card-item',
    '.director-portrait-wrap',
    '.stat-item-card',
    '.statutory-callout',
    '.contact-main-card',
    '.contact-form-card'
  ];

  const imageElements: HTMLElement[] = [];
  imageCardSelectors.forEach((selector) => {
    document.querySelectorAll<HTMLElement>(selector).forEach((el) => {
      el.classList.add('scroll-3d-image', 'has-3d-shadow');
      imageElements.push(el);
    });
  });

  // 3. Mark layered floating badges for deep 3D pop
  const floatingBadges = document.querySelectorAll<HTMLElement>(
    '.hero-assurance-pill, .gold-floating-badge, .director-role-badge, .finance-frequency-badge, .statutory-seal-icon'
  );
  floatingBadges.forEach((el) => {
    el.classList.add('scroll-3d-floating-layer');
  });

  let isTicking = false;
  const viewportHeight = window.innerHeight;
  const viewportWidth = window.innerWidth;

  // 4. Update 3D transforms based on scroll viewport position
  const update3dPositions = (): void => {
    const vh = window.innerHeight || viewportHeight;
    const vw = window.innerWidth || viewportWidth;
    const vhHalf = vh / 2;
    const vwHalf = vw / 2;

    const isMobile = vw <= 768;
    const maxTextTilt = isMobile ? 3.2 : 7.5;
    const maxTextLift = isMobile ? 8 : 16;
    const maxImageTiltX = isMobile ? 4.0 : 9.5;
    const maxImageTiltY = isMobile ? 0 : 3.5;
    const maxImageLift = isMobile ? 10 : 26;
    const maxImageScale = isMobile ? 0.01 : 0.022;

    // Update 3D Typography
    typographyElements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      // Skip off-screen elements
      if (rect.bottom < -80 || rect.top > vh + 80) return;

      const centerY = rect.top + rect.height / 2;
      const progress = (centerY - vhHalf) / vhHalf; // -1 to 1
      const clamped = Math.max(-1.1, Math.min(1.1, progress));

      // Subtle 3D tilt and elevation
      const tiltX = clamped * -maxTextTilt; // tilts slightly back when coming from bottom
      const elevation = Math.max(0, 1 - Math.abs(clamped));
      const liftZ = elevation * maxTextLift; // pops out when centered

      el.style.setProperty('--tilt-x', `${tiltX.toFixed(2)}deg`);
      el.style.setProperty('--tilt-x-val', tiltX.toFixed(2));
      el.style.setProperty('--lift-z', `${liftZ.toFixed(1)}px`);
    });

    // Update 3D Images & Cards
    imageElements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.bottom < -120 || rect.top > vh + 120) return;

      const centerY = rect.top + rect.height / 2;
      const progressY = (centerY - vhHalf) / vhHalf;
      const clampedY = Math.max(-1.1, Math.min(1.1, progressY));

      const centerX = rect.left + rect.width / 2;
      const progressX = (centerX - vwHalf) / vwHalf;
      const clampedX = Math.max(-1, Math.min(1, progressX));

      // 3D Pitch, Yaw, Elevation & Scale
      const tiltX = clampedY * -maxImageTiltX;
      const tiltY = clampedX * maxImageTiltY;
      const elevation = Math.max(0, 1 - Math.abs(clampedY));
      const liftZ = elevation * maxImageLift;
      const liftScale = 1 + elevation * maxImageScale;

      el.style.setProperty('--tilt-x', `${tiltX.toFixed(2)}deg`);
      el.style.setProperty('--tilt-y', `${tiltY.toFixed(2)}deg`);
      el.style.setProperty('--lift-z', `${liftZ.toFixed(1)}px`);
      el.style.setProperty('--lift-z-val', liftZ.toFixed(1));
      el.style.setProperty('--lift-scale', liftScale.toFixed(3));
    });

    isTicking = false;
  };

  const requestScrollUpdate = (): void => {
    if (!isTicking) {
      window.requestAnimationFrame(update3dPositions);
      isTicking = true;
    }
  };

  // Listen to passive scroll & resize
  window.addEventListener('scroll', requestScrollUpdate, { passive: true });
  window.addEventListener('resize', requestScrollUpdate, { passive: true });

  // 5. Desktop Interactive 3D Card Hover Perspective
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    imageElements.forEach((card) => {
      let isHovering = false;

      card.addEventListener('mousemove', (e: MouseEvent) => {
        isHovering = true;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const mouseX = (x / rect.width - 0.5) * 2; // -1 to 1
        const mouseY = (y / rect.height - 0.5) * 2; // -1 to 1

        const hoverTiltX = mouseY * -6;
        const hoverTiltY = mouseX * 6;

        card.style.setProperty('--hover-tilt-x', `${hoverTiltX.toFixed(2)}deg`);
        card.style.setProperty('--hover-tilt-y', `${hoverTiltY.toFixed(2)}deg`);
        card.classList.add('is-hover-tilted');
      });

      card.addEventListener('mouseleave', () => {
        isHovering = false;
        card.classList.remove('is-hover-tilted');
        card.style.removeProperty('--hover-tilt-x');
        card.style.removeProperty('--hover-tilt-y');
      });
    });
  }

  // Initial calculation after layout settles
  setTimeout(update3dPositions, 50);
  setTimeout(update3dPositions, 300);
}
