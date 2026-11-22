/* Kockafüzet service worker: works offline after the first visit. Version c0c84546 */
const CACHE = 'kockafuzet-c0c84546';
const PRECACHE = [
 "/",
 "/adatvedelem/",
 "/szuloknek/",
 "/feladatsor/",
 "/nyomtatas/",
 "/matek/1/",
 "/matek/2/",
 "/matek/3/",
 "/matek/4/",
 "/magyar/1/",
 "/magyar/2/",
 "/magyar/3/",
 "/magyar/4/",
 "/kornyezet/4/",
 "/kornyezet/3/",
 "/jatek/ora/",
 "/jatek/penz/",
 "/jatek/szorzo/",
 "/jatek/hibak/",
 "/assets/app.css?v=c0c84546",
 "/assets/app.js?v=c0c84546",
 "/assets/theme.js?v=c0c84546",
 "/favicon.svg",
 "/manifest.webmanifest",
 "/assets/fonts/fredoka-latin-500-normal.woff2",
 "/assets/fonts/fredoka-latin-600-normal.woff2",
 "/assets/fonts/fredoka-latin-ext-500-normal.woff2",
 "/assets/fonts/fredoka-latin-ext-600-normal.woff2",
 "/assets/fonts/nunito-latin-600-normal.woff2",
 "/assets/fonts/nunito-latin-700-normal.woff2",
 "/assets/fonts/nunito-latin-ext-600-normal.woff2",
 "/assets/fonts/nunito-latin-ext-700-normal.woff2"
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => Promise.all(PRECACHE.map(u => c.add(u).catch(() => null)))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k.startsWith('kockafuzet-') && k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  if (req.mode === 'navigate') {
    // pages: network first (fresh content), fall back to cache when offline
    e.respondWith(fetch(req).then(r => { const c = r.clone(); caches.open(CACHE).then(x => x.put(req, c)); return r; })
      .catch(() => caches.match(req, { ignoreSearch: true }).then(r => r || caches.match('/'))));
    return;
  }
  // versioned assets and fonts: cache first
  e.respondWith(caches.match(req).then(r => r || fetch(req).then(res => { if (res.ok) { const c = res.clone(); caches.open(CACHE).then(x => x.put(req, c)); } return res; })));
});
