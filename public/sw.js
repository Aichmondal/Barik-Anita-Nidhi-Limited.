/**
 * BARIK ANITA NIDHI LIMITED - Progressive Web App Service Worker
 * Version: banl-pwa-v3
 * 
 * Strict Security Policy for Financial PWA:
 * 1. Navigation HTML is NEVER cached (network-first with offline fallback).
 * 2. Member data, authentication, session data, and APIs are NEVER cached.
 * 3. Static caching restricted to verified same-origin production assets and 3 approved CDNs.
 * 4. Same-origin assets require static extension, recognized production path, and valid destination.
 * 5. Destination-aware and Content-Type response validation for CDN and static assets.
 * 6. Mandatory precaching of /offline.html shell with independent optional asset caching.
 * 7. Cloudinary assets strictly require approved image extensions, image destinations, and image Content-Type.
 * 8. Google Fonts font files strictly require /s/ path, font extensions, and font/empty destination.
 * 9. Rejection of private, no-store, Vary: *, opaque, or non-200 responses.
 * 10. Cache lookup strictly isolated to current BANL cache (CACHE_NAME).
 * 11. Cache lookup and write failures are safely absorbed without breaking network delivery.
 * 12. Background cache updates attached to event.waitUntil() synchronously.
 * 13. Requests with credential or non-static query parameters bypass caching.
 * 14. Isolated cache lifecycle (banl-pwa- prefix, v3).
 */

const CACHE_PREFIX = 'banl-pwa-';
const CACHE_VERSION = 'v3';
const CACHE_NAME = `${CACHE_PREFIX}${CACHE_VERSION}`;
const OFFLINE_URL = '/offline.html';

// Mandatory precache asset: offline shell MUST succeed for installation
const REQUIRED_PRECACHE_ASSETS = [
  OFFLINE_URL
];

// Optional precache assets: cached independently via Promise.allSettled()
const OPTIONAL_PRECACHE_ASSETS = [
  '/manifest.webmanifest',
  '/manifest.json',
  '/pwa-192x192.png',
  '/pwa-512x512.png',
  '/pwa-maskable-512x512.png',
  '/apple-touch-icon.png',
  '/favicon.svg'
];

// Combined list for reference and verification
const ALL_PRECACHE_ASSETS = [
  ...REQUIRED_PRECACHE_ASSETS,
  ...OPTIONAL_PRECACHE_ASSETS
];

// Approved external CDN hosts hosting public fonts or company branding
const APPROVED_CDN_HOSTS = [
  'fonts.googleapis.com',
  'fonts.gstatic.com',
  'res.cloudinary.com'
];

// Sensitive path blacklist — strictly bypass SW caching
const SENSITIVE_PATH_PATTERNS = [
  '/api/',
  '/auth',
  '/token',
  '/login',
  '/logout',
  '/session',
  '/member',
  '/account',
  '/balance',
  '/statement',
  '/credential',
  '/admin',
  '/dashboard',
  '/payment',
  '/loan-application'
];

// Credential and sensitive query parameter blacklist
const SENSITIVE_QUERY_PARAMS = [
  'access_token',
  'refresh_token',
  'id_token',
  'session_id',
  'session',
  'password',
  'pass',
  'pwd',
  'authorization',
  'auth',
  'token',
  'otp',
  'code',
  'secret',
  'key',
  'api_key',
  'apikey',
  'user',
  'username',
  'account',
  'acc',
  'member',
  'member_id',
  'pin'
];

// Allowed query parameter keys strictly for public static assets
const ALLOWED_STATIC_QUERY_KEYS = [
  'v',       // Vite / build cache-busting version
  't',       // Timestamp cache-busting
  'family',  // Google Fonts stylesheet parameter
  'display', // Google Fonts font-display parameter
  'subset'   // Google Fonts character subset
];

// Allowed same-origin static file extensions
const ALLOWED_STATIC_EXTENSIONS = [
  '.css',
  '.js',
  '.mjs',
  '.png',
  '.jpg',
  '.jpeg',
  '.webp',
  '.svg',
  '.ico',
  '.woff',
  '.woff2',
  '.ttf',
  '.otf',
  '.eot',
  '.webmanifest'
];

// Allowed image file extensions for Cloudinary
const ALLOWED_IMAGE_EXTENSIONS = [
  '.png',
  '.jpg',
  '.jpeg',
  '.webp',
  '.svg'
];

// ============================================================================
// Service Worker Lifecycle Events
// ============================================================================

// Install Event: Mandatory caching of offline shell, followed by independent optional caching
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(async (cache) => {
        // 1. Mandatory caching of required offline shell (/offline.html)
        try {
          await cache.add(OFFLINE_URL);
        } catch (criticalErr) {
          console.error(`[PWA SW] Critical installation error: Unable to precache required offline shell '${OFFLINE_URL}':`, criticalErr);
          // Throwing ensures the service worker does not install if the required offline shell is missing
          throw criticalErr;
        }

        // 2. Independent caching of optional shell assets via Promise.allSettled()
        const results = await Promise.allSettled(
          OPTIONAL_PRECACHE_ASSETS.map((asset) => {
            return cache.add(asset).catch((err) => {
              console.warn(`[PWA SW] Non-critical precache warning for optional asset '${asset}':`, err);
              throw err;
            });
          })
        );

        const failedAssets = results.filter((r) => r.status === 'rejected');
        if (failedAssets.length > 0) {
          console.warn(`[PWA SW] Precache completed with ${failedAssets.length} optional asset warning(s); service worker installation proceeds.`);
        }
      })
      .then(() => self.skipWaiting())
  );
});

// Activate Event: Delete ONLY outdated BANL-owned caches, preserving unrelated caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((name) => name.startsWith(CACHE_PREFIX) && name !== CACHE_NAME)
            .map((name) => {
              console.log('[PWA SW] Removing outdated BANL cache:', name);
              return caches.delete(name).catch((err) => {
                console.warn('[PWA SW] Cache deletion warning:', name, err);
              });
            })
        );
      })
      .catch((err) => {
        console.warn('[PWA SW] Cache cleanup warning:', err);
      })
      .then(() => self.clients.claim())
  );
});

// ============================================================================
// Security & Validation Helper Functions
// ============================================================================

/**
 * Checks whether the request URL contains sensitive paths or credential query parameters
 */
function containsSensitiveData(url) {
  const pathname = url.pathname.toLowerCase();

  // Check path blacklist
  if (SENSITIVE_PATH_PATTERNS.some((pattern) => pathname.includes(pattern))) {
    return true;
  }

  // Check query parameter names for sensitive/credential terms
  for (const key of url.searchParams.keys()) {
    const lowerKey = key.toLowerCase();
    if (SENSITIVE_QUERY_PARAMS.some((param) => lowerKey.includes(param))) {
      return true;
    }
  }

  return false;
}

/**
 * Validates query parameters: bypasses caching if query parameters exist
 * unless they are explicitly known public static parameters (e.g. ?family for fonts or ?v= for assets).
 */
function hasOnlyApprovedStaticQueries(url) {
  const keys = Array.from(url.searchParams.keys());
  if (keys.length === 0) {
    return true; // No query parameters -> safe
  }

  // If query parameters exist, EVERY parameter key must be in the approved static query list
  return keys.every((key) => ALLOWED_STATIC_QUERY_KEYS.includes(key.toLowerCase()));
}

/**
 * Strictly verifies whether a request is for an approved public static asset.
 * For same-origin: REQUIRES all 3 criteria:
 * 1. Approved static file extension.
 * 2. Recognized public static production path or approved root asset (dev paths removed).
 * 3. Appropriate static resource destination where applicable.
 */
function isApprovedStaticAsset(url, request) {
  const isSameOrigin = url.origin === self.location.origin;
  const isApprovedCDN = APPROVED_CDN_HOSTS.includes(url.hostname);

  if (!isSameOrigin && !isApprovedCDN) {
    return false;
  }

  // 1. Same-Origin Static Asset Validation: Requires ALL 3 criteria
  if (isSameOrigin) {
    const path = url.pathname.toLowerCase();

    // Criterion 1: Must match an approved static file extension
    const hasStaticExtension =
      ALLOWED_STATIC_EXTENSIONS.some((ext) => path.endsWith(ext)) ||
      path === '/manifest.json';

    if (!hasStaticExtension) {
      return false;
    }

    // Criterion 2: Recognized production static asset path or approved root-level asset (no dev-only paths)
    const isRecognizedStaticPath =
      path.startsWith('/assets/') ||
      path.startsWith('/pwa-') ||
      path === '/favicon.svg' ||
      path === '/logo.png' ||
      path === '/apple-touch-icon.png' ||
      path === '/manifest.webmanifest' ||
      path === '/manifest.json' ||
      path === '/offline.html';

    if (!isRecognizedStaticPath) {
      return false;
    }

    // Criterion 3: Appropriate static resource destination where applicable
    const isAppropriateDestination =
      request.destination === 'style' ||
      request.destination === 'script' ||
      request.destination === 'image' ||
      request.destination === 'font' ||
      request.destination === 'manifest' ||
      request.destination === ''; // empty for font/image fetches inside CSS url() or fetch()

    if (!isAppropriateDestination) {
      return false;
    }

    // All 3 criteria satisfied for same-origin asset
    return true;
  }

  // 2. Approved CDN Resource Validation (Strict per host)
  if (url.hostname === 'fonts.googleapis.com') {
    // Google Fonts Stylesheet (must be /css or /css2)
    return (url.pathname === '/css' || url.pathname === '/css2') &&
           (request.destination === 'style' || request.destination === '');
  }

  if (url.hostname === 'fonts.gstatic.com') {
    // Google Fonts Font Files: must be /s/, end with font extension, and have font/empty destination
    const path = url.pathname.toLowerCase();
    const isFontExt = path.endsWith('.woff2') || path.endsWith('.woff') || path.endsWith('.ttf');
    const isFontDestination = request.destination === 'font' || request.destination === '';
    return path.startsWith('/s/') && isFontExt && isFontDestination;
  }

  if (url.hostname === 'res.cloudinary.com') {
    // Cloudinary Brand Assets: must be under /image/upload/, have an approved image extension, and image destination
    const path = url.pathname.toLowerCase();
    const hasImageExtension = ALLOWED_IMAGE_EXTENSIONS.some((ext) => path.endsWith(ext));
    const isCloudinaryUpload = path.includes('/image/upload/');
    const isImageDestination = request.destination === 'image' || request.destination === '';

    return isCloudinaryUpload && hasImageExtension && isImageDestination;
  }

  return false;
}

/**
 * Destination-aware and Content-Type validation for safe static caching.
 * Rejects opaque, non-200, private, no-store, Vary: *, and wrong-MIME responses.
 */
function isSafeToCache(url, request, response) {
  // 1. Must be a successful 200 response
  if (!response || response.status !== 200) {
    return false;
  }

  // 2. Reject opaque responses, error responses, or redirects
  if (response.type !== 'basic' && response.type !== 'cors') {
    return false;
  }

  // 3. Reject responses with Cache-Control: no-store or private
  const cacheControl = response.headers.get('Cache-Control');
  if (cacheControl) {
    const lower = cacheControl.toLowerCase();
    if (lower.includes('no-store') || lower.includes('private')) {
      return false;
    }
  }

  // 4. Reject responses with Vary: *
  const vary = response.headers.get('Vary');
  if (vary && (vary.trim() === '*' || vary.includes('*'))) {
    return false;
  }

  // 5. Destination-aware Content-Type validation
  const contentType = (response.headers.get('Content-Type') || '').toLowerCase();

  // A. Google Fonts CSS Stylesheet Validation
  if (url.hostname === 'fonts.googleapis.com') {
    if (!contentType.includes('text/css')) {
      return false;
    }
  }
  // B. Google Fonts Binary Font Validation
  else if (url.hostname === 'fonts.gstatic.com') {
    const isFontMime =
      contentType.includes('font/') ||
      contentType.includes('application/font') ||
      contentType.includes('application/x-font') ||
      contentType.includes('application/octet-stream'); // Some CDNs serve binary woff2 as octet-stream
    if (!isFontMime) {
      return false;
    }
  }
  // C. Cloudinary Image Validation
  else if (url.hostname === 'res.cloudinary.com') {
    if (!contentType.startsWith('image/')) {
      return false;
    }
  }
  // D. Same-Origin Static Asset MIME Type Validation
  else if (url.origin === self.location.origin) {
    const path = url.pathname.toLowerCase();

    if (path.endsWith('.css') && !contentType.includes('text/css')) {
      return false;
    }
    if ((path.endsWith('.js') || path.endsWith('.mjs')) &&
        !contentType.includes('javascript') && !contentType.includes('ecmascript')) {
      return false;
    }
    if ((path.endsWith('.png') || path.endsWith('.jpg') || path.endsWith('.jpeg') ||
         path.endsWith('.webp') || path.endsWith('.svg') || path.endsWith('.ico')) &&
        !contentType.startsWith('image/')) {
      return false;
    }
    if ((path.endsWith('.woff') || path.endsWith('.woff2') || path.endsWith('.ttf') || path.endsWith('.otf')) &&
        !contentType.includes('font') && !contentType.includes('octet-stream')) {
      return false;
    }
    if (path.endsWith('.webmanifest') &&
        !contentType.includes('manifest+json') && !contentType.includes('application/json') && !contentType.includes('text/json')) {
      return false;
    }
    if (path.endsWith('.json') &&
        !contentType.includes('application/json') && !contentType.includes('text/json')) {
      return false;
    }
  }

  return true;
}

// ============================================================================
// Fetch Request Handler
// ============================================================================

self.addEventListener('fetch', (event) => {
  const request = event.request;

  // 1. Only handle GET requests (never cache POST, PUT, DELETE, PATCH)
  if (request.method !== 'GET') {
    return;
  }

  const url = new URL(request.url);

  // 2. Sensitive data & query protection: bypass caching for sensitive paths or credential params
  if (containsSensitiveData(url)) {
    return; // Pass through to network with zero caching
  }

  // 3. Navigation requests (HTML pages):
  // HTML is NEVER stored in cache to ensure financial and member data remains live and private.
  // Network-first policy: serves offline.html fallback on network failure or 5xx server errors.
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          // If server returns HTTP 5xx (server error / gateway down), fall back to offline page
          if (networkResponse && networkResponse.status >= 500 && networkResponse.status <= 599) {
            return caches.open(CACHE_NAME)
              .then((cache) => cache.match(OFFLINE_URL))
              .then((offlinePage) => offlinePage || networkResponse)
              .catch(() => networkResponse);
          }
          // Legitimate responses (2xx, 3xx, 4xx) are returned directly without HTML caching
          return networkResponse;
        })
        .catch(async () => {
          // Network failed (offline / network error)
          try {
            const cache = await caches.open(CACHE_NAME);
            const offlinePage = await cache.match(OFFLINE_URL);
            if (offlinePage) {
              return offlinePage;
            }
          } catch (cacheErr) {
            console.warn('[PWA SW] Offline page lookup error in current cache:', cacheErr);
          }
          return new Response(
            'Offline Mode: Internet connection required for financial and member services.',
            {
              status: 503,
              statusText: 'Service Unavailable',
              headers: new Headers({ 'Content-Type': 'text/plain; charset=utf-8' })
            }
          );
        })
    );
    return;
  }

  // 4. Query Protection: bypass caching if request has query parameters other than approved static queries
  if (!hasOnlyApprovedStaticQueries(url)) {
    return; // Bypass caching for unrecognized query strings
  }

  // 5. Approved Public Static Assets Caching (Isolated Cache Lookup, Robust Error Handling, Synchronous waitUntil)
  if (isApprovedStaticAsset(url, request)) {
    // Network fetch & destination-aware safe cache write promise
    const fetchAndCachePromise = fetch(request)
      .then((networkResponse) => {
        if (isSafeToCache(url, request, networkResponse)) {
          const responseToCache = networkResponse.clone();
          return caches.open(CACHE_NAME)
            .then((cache) => cache.put(request, responseToCache))
            .then(() => networkResponse)
            .catch((putErr) => {
              // Gracefully absorb storage quota or write errors without breaking response
              console.warn('[PWA SW] Cache put failure in current cache:', request.url, putErr);
              return networkResponse;
            });
        }
        return networkResponse;
      });

    // Safely attach the background cache task to event.waitUntil synchronously during fetch dispatch
    try {
      event.waitUntil(
        fetchAndCachePromise.catch((err) => {
          console.warn('[PWA SW] Background static update error:', err);
        })
      );
    } catch (e) {
      // In case waitUntil cannot be scheduled, fetchAndCachePromise continues normally
    }

    // Isolated Cache Lookup: Query ONLY inside current BANL cache (CACHE_NAME), never global caches.match()
    event.respondWith(
      caches.open(CACHE_NAME)
        .then((cache) => cache.match(request))
        .catch((matchErr) => {
          console.warn('[PWA SW] Isolated cache match warning in', CACHE_NAME, ':', request.url, matchErr);
          return null; // On cache lookup failure, gracefully fall through to live network
        })
        .then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          return fetchAndCachePromise;
        })
        .catch((fetchErr) => {
          console.warn('[PWA SW] Network fetch failure for static asset:', request.url, fetchErr);
          return fetchAndCachePromise;
        })
    );
  }
});
