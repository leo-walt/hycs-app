// Automatisch erzeugt (vite.config.ts) — nicht von Hand aendern.
const CACHE = 'hycs-11q9h6i';
const FONTS = 'hycs-fonts';
const PRECACHE = ["./","./assets/index-CLTfc6Ry.css","./assets/Onboarding-rHxCFhuA.css","./assets/stats-B0zwB1LD.css","./assets/index-DNXWri45.js","./assets/Plan-g1EdIOz6.js","./assets/Onboarding-DeuX7jZN.js","./assets/Profile-DjZQhjgG.js","./assets/Summary-B_gUHYJz.js","./assets/TemplateEditor-BXXoGNcf.js","./assets/ExerciseDetail-DRUWMj81.js","./assets/Stats-BUojqE4l.js","./assets/StrengthCurve-DjHD0qU4.js","./assets/History-B6Y508mB.js","./assets/Entry-A-kKcrum.js","./assets/stats-gAwx72-V.js","./assets/Hub-D-L4Q_ji.js","./assets/Area-B5fGF-3Z.js","./assets/SkillDetail-DZo4vAmZ.js","./assets/HbNodeSheet-DJU-TWjU.js","./assets/hb-lib-DAN92kdn.js","./assets/Program-D-udIRIU.js","./assets/CustomPlanEditor-Bfw9EMI8.js","./assets/WorkoutPlanEditor-BhoF7NZz.js","./manifest.webmanifest","./favicon.png","./icon-192.png","./icon-512.png","./apple-touch-icon.png"];

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
