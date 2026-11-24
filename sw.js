// Automatisch erzeugt (vite.config.ts) — nicht von Hand aendern.
const CACHE = 'hycs-kc9tam';
const FONTS = 'hycs-fonts';
const PRECACHE = ["./","./assets/index-BvJuiXdm.css","./assets/Onboarding-vlZrZq7I.css","./assets/stats-UZOkeV3u.css","./assets/StandingBlock-CGyCxDEl.css","./assets/Ratios-WOFQBdUT.css","./assets/hb-hub-r4bJ5bk7.css","./assets/index-V-eYWb3J.js","./assets/Plan-BI-3UuDT.js","./assets/Onboarding-CQH-fQ5G.js","./assets/Profile-Bwb6mzDx.js","./assets/Summary-B5VLP2SS.js","./assets/TemplateEditor-BL5y6i65.js","./assets/ExerciseDetail-CwHuyv7i.js","./assets/Stats-DaH8Q0KP.js","./assets/StrengthCurve-3GyyMJHw.js","./assets/History-D5b9M3dO.js","./assets/Entry-DtwwLOyF.js","./assets/stats-r59Y13IQ.js","./assets/Standing-GLyiBcOs.js","./assets/Hub-CKM-GKHJ.js","./assets/Area-C0_wGlnm.js","./assets/StandingBlock-B8x4iYU9.js","./assets/Ratios-D_uM4_Mp.js","./assets/exercise-best-C0d5vsyw.js","./assets/SkillDetail-COlpFKQm.js","./assets/HbNodeSheet-CsPXi8pS.js","./assets/hb-hub-DcjO6ouL.js","./assets/hb-lib-BWMQxFLy.js","./assets/Program-DjK9_6FF.js","./assets/CustomPlanEditor-p4t4QfI_.js","./assets/WorkoutPlanEditor-B_nZWc8R.js","./manifest.webmanifest","./favicon.png","./icon-192.png","./icon-512.png","./apple-touch-icon.png"];

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
