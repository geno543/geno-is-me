// Service Worker for Geno's Portfolio
// Provides caching strategies for improved performance

const CACHE_NAME = 'geno-portfolio-v1';
const STATIC_CACHE_NAME = 'geno-static-v1';
const DYNAMIC_CACHE_NAME = 'geno-dynamic-v1';

// Assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/favicon.ico',
  '/next.svg',
  '/vercel.svg',
  // Add other static assets as needed
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('Service Worker: Static assets cached');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('Service Worker: Error caching static assets', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE_NAME && cacheName !== DYNAMIC_CACHE_NAME) {
              console.log('Service Worker: Deleting old cache', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker: Activated');
        return self.clients.claim();
      })
  );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip external requests
  if (url.origin !== location.origin) {
    return;
  }

  // Handle different types of requests
  if (isStaticAsset(request)) {
    // Cache first strategy for static assets
    event.respondWith(cacheFirst(request));
  } else if (isAPIRequest(request)) {
    // Network first strategy for API requests
    event.respondWith(networkFirst(request));
  } else {
    // Stale while revalidate for pages
    event.respondWith(staleWhileRevalidate(request));
  }
});

// Cache first strategy - good for static assets
async function cacheFirst(request) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.error('Cache first strategy failed:', error);
    return new Response('Offline content not available', { status: 503 });
  }
}

// Network first strategy - good for API requests
async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.log('Network failed, trying cache:', error);
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    return new Response('Content not available offline', { status: 503 });
  }
}

// Stale while revalidate strategy - good for pages
async function staleWhileRevalidate(request) {
  const cache = await caches.open(DYNAMIC_CACHE_NAME);
  const cachedResponse = await caches.match(request);

  // Fetch in background to update cache
  const fetchPromise = fetch(request).then((networkResponse) => {
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  });

  // Return cached version immediately if available, otherwise wait for network
  return cachedResponse || fetchPromise;
}

// Helper functions
function isStaticAsset(request) {
  const url = new URL(request.url);
  return (
    url.pathname.startsWith('/_next/static/') ||
    url.pathname.startsWith('/static/') ||
    url.pathname.match(/\.(css|js|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot)$/)
  );
}

function isAPIRequest(request) {
  const url = new URL(request.url);
  return url.pathname.startsWith('/api/');
}

// Background sync for offline actions (if needed)
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    console.log('Service Worker: Background sync triggered');
    // Handle background sync tasks here
  }
});

// Push notifications (if needed in the future)
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    console.log('Service Worker: Push notification received', data);
    
    const options = {
      body: data.body,
      icon: '/favicon.ico',
      badge: '/favicon.ico',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: data.primaryKey || 1,
      },
      actions: [
        {
          action: 'explore',
          title: 'Explore',
          icon: '/favicon.ico',
        },
        {
          action: 'close',
          title: 'Close',
          icon: '/favicon.ico',
        },
      ],
    };

    event.waitUntil(
      self.registration.showNotification(data.title || 'Geno\'s Portfolio', options)
    );
  }
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  console.log('Service Worker: Notification clicked', event);
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});