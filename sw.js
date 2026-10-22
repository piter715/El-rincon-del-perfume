const CACHE_NAME = "kitty-v3-vercel";
const ASSETS = [
  "/",
  "/index.html",
  "/manifest.json",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/icons/icon-512-maskable.png",
  "/icons/apple-touch-icon.png"
];

self.addEventListener("install", (e) => {
  console.log("[SW v3] Install");
  e.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      // Cache one by one, don't fail whole install if one fails
      for (let url of ASSETS) {
        try {
          await cache.add(new Request(url, {cache: 'reload'}));
          console.log("[SW] Cached", url);
        } catch (err) {
          console.warn("[SW] Failed to cache", url, err);
        }
      }
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  console.log("[SW v3] Activate");
  e.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  // Skip chrome extensions and vercel live
  if (e.request.url.startsWith("chrome-extension://")) return;
  
  e.respondWith(
    caches.match(e.request).then(cached => {
      const fetchPromise = fetch(e.request).then(networkRes => {
        if (networkRes && networkRes.status === 200 && networkRes.type !== 'opaque') {
          const clone = networkRes.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(e.request, clone));
        }
        return networkRes;
      }).catch(() => {
        // Offline fallback for navigation
        if (e.request.mode === "navigate") {
          return caches.match("/index.html") || caches.match("/");
        }
      });
      return cached || fetchPromise;
    })
  );
});