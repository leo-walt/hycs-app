// Automatisch erzeugt (vite.config.ts) — nicht von Hand aendern.
const CACHE = 'hycs-1w75kpe';
const FONTS = 'hycs-fonts';
const PRECACHE = ["./","./assets/index-DV1mRmp2.css","./assets/plan-Dn0wgsfO.css","./assets/Onboarding-Mobm9giK.css","./assets/stats-PyFyHaFV.css","./assets/index-j0SuPZ6e.js","./assets/Plan-B2GOy8of.js","./assets/DayRunner-CVPGX4Uc.js","./assets/plan-Di3ggqvV.js","./assets/Onboarding-DlXPaKt_.js","./assets/Profile-CNEbZ9FO.js","./assets/Summary-cemOWDwB.js","./assets/TemplateEditor-mX5g2O2d.js","./assets/ExerciseDetail-Dwh2Curg.js","./assets/Stats-DBDNd3wa.js","./assets/History-HJfxmEpz.js","./assets/Entry-CekKxZGO.js","./assets/stats-C2ruqMEE.js","./assets/Hub-GJTRMNXV.js","./assets/Area-DN6X-SUd.js","./assets/SkillDetail-Dk_oU-0j.js","./assets/HbNodeSheet-CEAWn18s.js","./assets/hb-lib-DWvvbup4.js","./assets/Program-qQDRYgGE.js","./assets/CustomPlanEditor-DEwr-oHb.js","./manifest.webmanifest","./favicon.png","./icon-192.png","./icon-512.png","./apple-touch-icon.png"];

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
