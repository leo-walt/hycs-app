// Automatisch erzeugt (vite.config.ts) — nicht von Hand aendern.
const CACHE = 'hycs-yd76ni';
const FONTS = 'hycs-fonts';
const PRECACHE = ["./","./assets/index-DJv8_HL9.css","./assets/Onboarding-BQnLpZkE.css","./assets/stats-UZOkeV3u.css","./assets/StandingBlock-CGyCxDEl.css","./assets/Ratios-WOFQBdUT.css","./assets/index-BRVNH3X0.js","./assets/Plan-iIKCukgH.js","./assets/Onboarding-DchJDtIz.js","./assets/Profile-Cdi_y7Gt.js","./assets/Summary-B7nEJYpS.js","./assets/TemplateEditor-DL7M3bn_.js","./assets/ExerciseDetail-l2R6hweD.js","./assets/Stats-CCF8oWNc.js","./assets/StrengthCurve-5wQVLxB9.js","./assets/History-BqR95Hz-.js","./assets/Entry-GYzOcdmk.js","./assets/stats-r59Y13IQ.js","./assets/Standing-CJ1oTZ0x.js","./assets/Hub-siMAOCVj.js","./assets/Area-L3OLGmZv.js","./assets/StandingBlock-NxhrIY1Z.js","./assets/Ratios-A6v2InTY.js","./assets/exercise-best-DgIARTTe.js","./assets/SkillDetail-DQ9HE5Vt.js","./assets/HbNodeSheet-ByCwRBUX.js","./assets/hb-lib-DC2Ko2X1.js","./assets/Program-fzMAEz4s.js","./assets/CustomPlanEditor-DXMo-E8J.js","./assets/WorkoutPlanEditor-C3K5_TEB.js","./manifest.webmanifest","./favicon.png","./icon-192.png","./icon-512.png","./apple-touch-icon.png"];

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
