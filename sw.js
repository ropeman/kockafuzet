/* Kockafüzet service worker: works offline after the first visit. Version f2b34ed0 */
const CACHE = 'kockafuzet-f2b34ed0';
const PRECACHE = [
 "/kockafuzet/",
 "/kockafuzet/adatvedelem/",
 "/kockafuzet/szuloknek/",
 "/kockafuzet/feladatsor/",
 "/kockafuzet/nyomtatas/",
 "/kockafuzet/matek/1/",
 "/kockafuzet/matek/2/",
 "/kockafuzet/matek/3/",
 "/kockafuzet/matek/4/",
 "/kockafuzet/magyar/1/",
 "/kockafuzet/magyar/2/",
 "/kockafuzet/magyar/3/",
 "/kockafuzet/magyar/4/",
 "/kockafuzet/kornyezet/4/",
 "/kockafuzet/jatek/ora/",
 "/kockafuzet/jatek/penz/",
 "/kockafuzet/jatek/szorzo/",
 "/kockafuzet/jatek/hibak/",
 "/kockafuzet/assets/app.css?v=f2b34ed0",
 "/kockafuzet/assets/app.js?v=f2b34ed0",
 "/kockafuzet/assets/theme.js?v=f2b34ed0",
 "/kockafuzet/favicon.svg",
 "/kockafuzet/manifest.webmanifest",
 "/kockafuzet/assets/fonts/fredoka-latin-500-normal.woff2",
 "/kockafuzet/assets/fonts/fredoka-latin-600-normal.woff2",
 "/kockafuzet/assets/fonts/fredoka-latin-ext-500-normal.woff2",
 "/kockafuzet/assets/fonts/fredoka-latin-ext-600-normal.woff2",
 "/kockafuzet/assets/fonts/nunito-latin-600-normal.woff2",
 "/kockafuzet/assets/fonts/nunito-latin-700-normal.woff2",
 "/kockafuzet/assets/fonts/nunito-latin-ext-600-normal.woff2",
 "/kockafuzet/assets/fonts/nunito-latin-ext-700-normal.woff2"
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
      .catch(() => caches.match(req, { ignoreSearch: true }).then(r => r || caches.match('/kockafuzet/'))));
    return;
  }
  // versioned assets and fonts: cache first
  e.respondWith(caches.match(req).then(r => r || fetch(req).then(res => { if (res.ok) { const c = res.clone(); caches.open(CACHE).then(x => x.put(req, c)); } return res; })));
});
