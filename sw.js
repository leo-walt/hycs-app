// Automatisch erzeugt (vite.config.ts) — nicht von Hand aendern.
const CACHE = 'hycs-8046g7';
const FONTS = 'hycs-fonts';
const PRECACHE = ["./","./assets/index-DxVx740N.css","./assets/MotionLab-BNPZ-SgX.css","./assets/Onboarding-vlZrZq7I.css","./assets/stats-UZOkeV3u.css","./assets/StandingBlock-CGyCxDEl.css","./assets/Ratios-WOFQBdUT.css","./assets/hb-hub-CNfi7LuU.css","./assets/index-D9B-RkrM.js","./assets/MotionLab-BD8_DyrL.js","./assets/Plan-DSa3y-wS.js","./assets/Onboarding-UxVFxmNu.js","./assets/Profile-CG5Qidgs.js","./assets/Summary-Dv1ZAQiv.js","./assets/TemplateEditor-acovy8lm.js","./assets/ExerciseDetail-BE4RURop.js","./assets/Stats-CPqWO9mD.js","./assets/StrengthCurve-7qEtovto.js","./assets/History-BpfYtDX4.js","./assets/Entry-CSxycksD.js","./assets/stats-r59Y13IQ.js","./assets/Standing-DAkHm4js.js","./assets/Hub-DzUyPWfx.js","./assets/AreasSheet-Bjpkkzoj.js","./assets/Area-DX-3lwh3.js","./assets/StandingBlock-BlK1i99h.js","./assets/Ratios-DrjOeFm0.js","./assets/exercise-best-C46cDvvw.js","./assets/SkillDetail-D9iu5WxX.js","./assets/HbNodeSheet-Cthv7h3a.js","./assets/hb-lib-Dq9A0TZ6.js","./assets/hb-hub-DsMe-bHW.js","./assets/Program-srxJyf0O.js","./assets/CustomPlanEditor-CRKfC_Ur.js","./assets/WorkoutPlanEditor-B3jH4Kkm.js","./assets/MotionViewer-Dcr5X3na.js","./manifest.webmanifest","./favicon.png","./icon-192.png","./icon-512.png","./apple-touch-icon.png"];

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
