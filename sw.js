// Automatisch erzeugt (vite.config.ts) — nicht von Hand aendern.
const CACHE = 'hycs-1ob0mk2';
const FONTS = 'hycs-fonts';
const PRECACHE = ["./","./assets/index-D318-OL3.css","./assets/plan-Dn0wgsfO.css","./assets/Onboarding-Mobm9giK.css","./assets/stats-PyFyHaFV.css","./assets/hb-hub-Bn7YNvH6.css","./assets/index-BhQDlHqS.js","./assets/Plan-hD5elzUo.js","./assets/DayRunner-DyehZC8n.js","./assets/plan-Di3ggqvV.js","./assets/Onboarding-DHEAvMYl.js","./assets/Profile-DA0V1Zsp.js","./assets/Summary-BdI3p3hn.js","./assets/TemplateEditor-DMnCtdcw.js","./assets/ExerciseDetail-2-X6VORW.js","./assets/Stats-C-7OF2xD.js","./assets/History-DHU_1w7U.js","./assets/Entry-CgVzPU5M.js","./assets/stats-C2ruqMEE.js","./assets/Hub-BDJvXwi9.js","./assets/Area-Bh0HHcr8.js","./assets/SkillDetail-BX76Dhq0.js","./assets/HbNodeSheet-BcSGIbh6.js","./assets/hb-hub-CgbyyGll.js","./assets/hb-lib-DCO8qWkW.js","./assets/Program-C_UhBjhw.js","./assets/CustomPlanEditor-C-5AzyO6.js","./manifest.webmanifest","./favicon.png","./icon-192.png","./icon-512.png","./apple-touch-icon.png"];

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
