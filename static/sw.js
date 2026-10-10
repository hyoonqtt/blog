// Kill-switch for the old Jekyll (Chirpy PWA) service worker.
// The old SW was registered at /sw.js scope. A 404 does NOT remove it,
// so we serve this self-destructing replacement for a while.
// Keep this file for a few weeks until all visitors' browsers update,
// then it can be deleted.
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      // Delete every CacheStorage bucket the old SW created
      if (self.caches) {
        const keys = await caches.keys();
        await Promise.all(keys.map((key) => caches.delete(key)));
      }
      // Claim clients so the new (empty) worker takes over immediately
      await self.clients.claim();
      // Unregister this worker; after this there is no SW at all
      await self.registration.unregister();
      // Force open tabs to reload from network (fresh Hugo HTML)
      const clients = await self.clients.matchAll({ type: 'window' });
      clients.forEach((client) => client.navigate(client.url));
    })()
  );
});
