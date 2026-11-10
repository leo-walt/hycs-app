// Automatisch erzeugt (vite.config.ts) — nicht von Hand aendern.
const CACHE = 'hycs-1cej4dz';
const FONTS = 'hycs-fonts';
const PRECACHE = ["./","./assets/index-DJv8_HL9.css","./assets/Onboarding-BQnLpZkE.css","./assets/stats-UZOkeV3u.css","./assets/StandingBlock-CGyCxDEl.css","./assets/Ratios-WOFQBdUT.css","./assets/index-gJlzfUbM.js","./assets/Plan-DE0Nxaqz.js","./assets/Onboarding-CcbiBzJ7.js","./assets/Profile-CrUMlhSU.js","./assets/Summary-By1rYFQw.js","./assets/TemplateEditor-BhLAkzyb.js","./assets/ExerciseDetail-BSlvqVuW.js","./assets/Stats-D-QHSHCf.js","./assets/StrengthCurve-U_Cb0sDv.js","./assets/History-CGaQDhLF.js","./assets/Entry-D-EsN_Vf.js","./assets/stats-r59Y13IQ.js","./assets/Standing-BwmGTYs7.js","./assets/Hub-DHZdKlft.js","./assets/Area-xaQPSqCi.js","./assets/StandingBlock-BF8qy6EV.js","./assets/Ratios-BXnAWS5u.js","./assets/exercise-best-D5uHEG4Z.js","./assets/SkillDetail-CplYh5jR.js","./assets/HbNodeSheet-Cu3Qozzt.js","./assets/hb-lib-Dz8utpqC.js","./assets/Program-CdxEL-wk.js","./assets/CustomPlanEditor-DYpQHzQd.js","./assets/WorkoutPlanEditor-CRb9YuTf.js","./manifest.webmanifest","./favicon.png","./icon-192.png","./icon-512.png","./apple-touch-icon.png"];

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
