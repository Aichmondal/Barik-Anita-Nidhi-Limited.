/**
 * Progressive Web App (PWA) Client Controller for BARIK ANITA NIDHI LIMITED
 * Manages service worker registration, install prompts, iPad/iOS detection,
 * accessible installation modals, and network connectivity status.
 */

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

let deferredInstallPrompt: BeforeInstallPromptEvent | null = null;
let isPWAInitialized = false;
let lastFocusedElement: HTMLElement | null = null;

/**
 * Initializes PWA functionality once per session lifecycle
 */
export function initPWA(): void {
  if (isPWAInitialized) {
    return;
  }
  isPWAInitialized = true;

  // 1. Register Service Worker whether page is already loaded or still loading
  registerServiceWorker();

  // 2. Setup In-App Install Prompt listeners
  setupInstallPrompt();

  // 3. Monitor Network Online / Offline Status
  setupNetworkStatusMonitor();
}

/**
 * Register Service Worker from root scope with robust load state handling
 */
function registerServiceWorker(): void {
  if (!('serviceWorker' in navigator)) {
    return;
  }

  const register = () => {
    navigator.serviceWorker
      .register('/sw.js', { scope: '/' })
      .then((registration) => {
        // Handle SW updates safely
        registration.addEventListener('updatefound', () => {
          const installingWorker = registration.installing;
          if (installingWorker) {
            installingWorker.addEventListener('statechange', () => {
              if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
                console.log('[PWA] New version of BANL app is ready.');
              }
            });
          }
        });
      })
      .catch((error) => {
        console.warn('[PWA] Service Worker registration failed:', error);
      });
  };

  if (document.readyState === 'complete') {
    register();
  } else {
    window.addEventListener('load', register, { once: true });
  }
}

/**
 * Accurately detects iOS and iPadOS devices (including modern iPad Pro / Air reporting as MacIntel)
 */
function isIOSDevice(): boolean {
  if (typeof window === 'undefined' || !window.navigator) {
    return false;
  }

  const ua = window.navigator.userAgent.toLowerCase();
  const isIPhoneOrIPod = /iphone|ipod/.test(ua);
  const isIPad = /ipad/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const isNotMSStream = !(window as unknown as { MSStream?: boolean }).MSStream;

  return (isIPhoneOrIPod || isIPad) && isNotMSStream;
}

/**
 * Checks whether the application is running in standalone mode (already installed)
 */
function isStandaloneMode(): boolean {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    window.matchMedia('(display-mode: fullscreen)').matches ||
    window.matchMedia('(display-mode: minimal-ui)').matches ||
    (window.navigator as unknown as { standalone?: boolean }).standalone === true
  );
}

/**
 * Handles beforeinstallprompt, appinstalled, and in-app install triggers
 */
function setupInstallPrompt(): void {
  // If already running standalone, hide all installation triggers
  if (isStandaloneMode()) {
    hideInstallButtons();
    return;
  }

  // 1. Listen for Chromium/Android install prompt
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredInstallPrompt = e as BeforeInstallPromptEvent;
    showInstallButtons();
  });

  // 2. If iOS / iPadOS, show install triggers so user can view step-by-step guidance
  if (isIOSDevice()) {
    showInstallButtons();
  }

  // 3. On successful installation
  window.addEventListener('appinstalled', () => {
    deferredInstallPrompt = null;
    hideInstallButtons();
    showToast('BANL App installed successfully on your device.', 'online');
  });

  // 4. Delegated click handler for install buttons
  document.addEventListener('click', async (e) => {
    const target = e.target as HTMLElement | null;
    const btn = target?.closest<HTMLButtonElement>('.pwa-install-trigger');
    if (!btn) return;

    e.preventDefault();
    lastFocusedElement = btn;

    if (deferredInstallPrompt) {
      try {
        await deferredInstallPrompt.prompt();
        const choice = await deferredInstallPrompt.userChoice;
        if (choice.outcome === 'accepted') {
          hideInstallButtons();
        }
      } catch (err) {
        console.warn('[PWA] Error launching install prompt:', err);
      } finally {
        deferredInstallPrompt = null;
      }
    } else if (isIOSDevice()) {
      showIOSInstallModal();
    } else {
      showToast('To install BANL, use your browser menu and tap "Add to Home Screen".', 'info');
    }
  });
}

function showInstallButtons(): void {
  const containers = document.querySelectorAll<HTMLElement>('.pwa-install-btn-container');
  containers.forEach((el) => {
    el.style.display = 'inline-flex';
  });
}

function hideInstallButtons(): void {
  const containers = document.querySelectorAll<HTMLElement>('.pwa-install-btn-container');
  containers.forEach((el) => {
    el.style.display = 'none';
  });
}

/**
 * Accessible iOS / iPadOS Add to Home Screen Instructions Modal
 */
function showIOSInstallModal(): void {
  let modal = document.getElementById('pwa-ios-modal');
  if (!modal) {
    const modalHtml = `
      <div id="pwa-ios-modal" class="pwa-modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="pwa-ios-title" aria-describedby="pwa-ios-desc">
        <div class="pwa-modal-card">
          <button type="button" class="pwa-modal-close" id="pwa-modal-close-btn" aria-label="Close installation guide">&times;</button>
          <div class="pwa-modal-header">
            <img src="/pwa-192x192.png" alt="BANL App Icon" class="pwa-modal-icon" width="48" height="48" />
            <div>
              <h3 id="pwa-ios-title" class="pwa-modal-heading">Install on iPhone / iPad</h3>
              <p id="pwa-ios-desc" class="pwa-modal-sub">BARIK ANITA NIDHI LIMITED</p>
            </div>
          </div>
          <ol class="pwa-ios-steps">
            <li>
              <span aria-hidden="true">1</span>
              <div>Tap the <strong>Share</strong> button in Safari's bottom toolbar.</div>
            </li>
            <li>
              <span aria-hidden="true">2</span>
              <div>Scroll down and select <strong>Add to Home Screen</strong>.</div>
            </li>
            <li>
              <span aria-hidden="true">3</span>
              <div>Tap <strong>Add</strong> at top right to launch BANL as a dedicated app.</div>
            </li>
          </ol>
          <button type="button" class="btn btn-primary pwa-modal-done-btn" id="pwa-modal-done-btn" style="width: 100%;">Understood</button>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    modal = document.getElementById('pwa-ios-modal');

    // Close handlers
    const closeModal = () => {
      modal?.classList.remove('is-active');
      if (lastFocusedElement) {
        lastFocusedElement.focus();
      }
    };

    modal?.querySelector('#pwa-modal-close-btn')?.addEventListener('click', closeModal);
    modal?.querySelector('#pwa-modal-done-btn')?.addEventListener('click', closeModal);

    modal?.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });

    // Keyboard accessibility: Escape to dismiss
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal?.classList.contains('is-active')) {
        closeModal();
      }
    });
  }

  modal?.classList.add('is-active');
  const closeBtn = modal?.querySelector<HTMLButtonElement>('#pwa-modal-close-btn');
  closeBtn?.focus();
}

/**
 * Monitors online and offline network status with accurate messaging
 */
function setupNetworkStatusMonitor(): void {
  window.addEventListener('online', () => {
    showToast('Internet connection restored.', 'online');
  });

  window.addEventListener('offline', () => {
    showToast('You are currently offline. Some website features may be unavailable. Please reconnect to continue.', 'offline');
  });
}

function showToast(message: string, type: 'info' | 'online' | 'offline' = 'info'): void {
  let toast = document.getElementById('pwa-toast');
  if (!toast) {
    const toastHtml = `
      <div id="pwa-toast" class="pwa-toast" role="status" aria-live="polite">
        <span class="pwa-toast-dot" aria-hidden="true"></span>
        <span class="pwa-toast-msg"></span>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', toastHtml);
    toast = document.getElementById('pwa-toast');
  }

  if (!toast) return;

  const dot = toast.querySelector('.pwa-toast-dot') as HTMLElement;
  const msg = toast.querySelector('.pwa-toast-msg') as HTMLElement;

  if (dot) {
    if (type === 'offline') {
      dot.style.backgroundColor = '#ef4444';
    } else if (type === 'online') {
      dot.style.backgroundColor = '#10b981';
    } else {
      dot.style.backgroundColor = '#3b82f6';
    }
  }

  if (msg) {
    msg.textContent = message;
  }

  toast.classList.add('is-visible');

  setTimeout(() => {
    toast?.classList.remove('is-visible');
  }, 4500);
}
