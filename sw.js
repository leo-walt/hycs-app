// Automatisch erzeugt (vite.config.ts) — nicht von Hand aendern.
const CACHE = 'hycs-12urloz';
const FONTS = 'hycs-fonts';
const PRECACHE = ["./","./assets/index-DV1mRmp2.css","./assets/plan-Dn0wgsfO.css","./assets/Onboarding-Mobm9giK.css","./assets/stats-PyFyHaFV.css","./assets/index-C5p6xgp0.js","./assets/Plan-BuLnmpnW.js","./assets/DayRunner-N5mSBatb.js","./assets/plan-Di3ggqvV.js","./assets/Onboarding-BDUov5Uq.js","./assets/Profile-BYjyH9MQ.js","./assets/Summary-C11ntJRA.js","./assets/TemplateEditor-Dh6EzIQ2.js","./assets/ExerciseDetail-ZzhUNKQj.js","./assets/Stats-BNurpYET.js","./assets/History-AN7TJc9T.js","./assets/Entry-Bv84INGK.js","./assets/stats-C2ruqMEE.js","./assets/Hub-DjCPJFk6.js","./assets/Area-CO0Q-_HX.js","./assets/SkillDetail-QdNJMF4O.js","./assets/HbNodeSheet-CKqvIgY6.js","./assets/hb-lib-52_hMV5v.js","./assets/Program-BMwn-yDc.js","./assets/CustomPlanEditor-nIIgR0qC.js","./manifest.webmanifest","./favicon.png","./icon-192.png","./icon-512.png","./apple-touch-icon.png"];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(PRECACHE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE && k !== FONTS).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // Schriften (Google Fonts): aus dem Cache, im Hintergrund auffrischen.
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    e.respondWith(caches.open(FONTS).then(async (c) => {
      const hit = await c.match(req);
      const net = fetch(req).then((res) => { if (res.ok || res.type === 'opaque') c.put(req, res.clone()); return res; }).catch(() => hit);
      return hit || net;
    }));
    return;
  }
  if (url.origin !== self.location.origin) return;

  // Seitenaufruf: immer die App-Huelle (Single-Page-App), Netz zuerst, offline aus dem Cache.
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req).catch(() => caches.match('./', { ignoreSearch: true, ignoreVary: true })));
    return;
  }
  // Gebaute Dateien: Cache zuerst (ignoreVary: der Server schickt "Vary: Origin", Modul-Skripte senden Origin mit).
  e.respondWith(caches.match(req, { ignoreVary: true }).then((hit) => hit || fetch(req)));
});
