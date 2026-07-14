/* Progression — service worker
   Stratégie : network-first pour la page (toujours la dernière version en ligne,
   cache en secours hors-ligne) ; cache-first pour les icônes/manifest.
   Plus besoin de monter la version à chaque déploiement de index.html. */
const CACHE = 'progression-v2026-07-12b';
const ASSETS = [
  './',
  './index.html',
  './progression.webmanifest',
  './progression-192.png',
  './progression-512.png',
  './progression-mask.png'
];

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE).then(function (c) { return c.addAll(ASSETS); }).catch(function(){})
  );
  self.skipWaiting();
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) { return k !== CACHE; })
        .map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') return;

  // Navigations + index.html : réseau d'abord, cache en secours (hors-ligne)
  if (req.mode === 'navigate' || req.url.indexOf('index.html') >= 0) {
    e.respondWith(
      fetch(req).then(function (res) {
        var copy = res.clone();
        caches.open(CACHE).then(function (c) { c.put(req, copy); });
        return res;
      }).catch(function () {
        return caches.match(req).then(function (m) { return m || caches.match('./index.html'); });
      })
    );
    return;
  }

  // Le reste (icônes, manifest, polices) : cache d'abord, réseau en secours
  e.respondWith(
    caches.match(req).then(function (m) {
      return m || fetch(req).then(function (res) {
        var copy = res.clone();
        caches.open(CACHE).then(function (c) { c.put(req, copy); });
        return res;
      });
    })
  );
});
