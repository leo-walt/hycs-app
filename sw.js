// Automatisch erzeugt (vite.config.ts) — nicht von Hand aendern.
const CACHE = 'hycs-ge9wes';
const FONTS = 'hycs-fonts';
const PRECACHE = ["./","./assets/index-DV1mRmp2.css","./assets/plan-Dn0wgsfO.css","./assets/Onboarding-Mobm9giK.css","./assets/stats-PyFyHaFV.css","./assets/index-w6j1LjFB.js","./assets/Plan-BThwKn4v.js","./assets/DayRunner-zxE6VRz0.js","./assets/plan-Di3ggqvV.js","./assets/Onboarding-Dx1U-7m8.js","./assets/Profile-CKb0u8i1.js","./assets/Summary-B9AI3bI_.js","./assets/TemplateEditor-_DLoXDoY.js","./assets/ExerciseDetail-BzRASXmg.js","./assets/Stats-TkwKf3A0.js","./assets/History-QYC9zvNJ.js","./assets/Entry-DO7miJig.js","./assets/stats-C2ruqMEE.js","./assets/Hub-B425Lch8.js","./assets/Area-DB-vE9Ys.js","./assets/SkillDetail-UUP50E4Q.js","./assets/HbNodeSheet-D4dWtRUO.js","./assets/hb-lib-C9Ymj0k8.js","./assets/Program-D-CWHvQD.js","./assets/CustomPlanEditor-Dg-sSnng.js","./manifest.webmanifest","./favicon.png","./icon-192.png","./icon-512.png","./apple-touch-icon.png"];

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
