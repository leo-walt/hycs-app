// Automatisch erzeugt (vite.config.ts) — nicht von Hand aendern.
const CACHE = 'hycs-1vpf29i';
const FONTS = 'hycs-fonts';
const PRECACHE = ["./","./assets/index-DLroRGGy.css","./assets/plan-Dn0wgsfO.css","./assets/Onboarding-Mobm9giK.css","./assets/stats-PyFyHaFV.css","./assets/hb-hub-hJJ7w6gd.css","./assets/index-BAYqKtVb.js","./assets/Plan-BdVRwz39.js","./assets/DayRunner-BaVj1xSL.js","./assets/plan-Di3ggqvV.js","./assets/Onboarding-DjTMn6EG.js","./assets/Profile-CrnyBCDc.js","./assets/Summary-BFM_9Uxn.js","./assets/TemplateEditor-BHmSf0pu.js","./assets/ExerciseDetail-AV9Mcldh.js","./assets/Stats-BgyBZnje.js","./assets/History-_oZHLj1Y.js","./assets/Entry-oNSPx6Fd.js","./assets/stats-C2ruqMEE.js","./assets/Hub-Brw1mIUL.js","./assets/Area-BJBWEaGq.js","./assets/SkillDetail-DybDWXQ-.js","./assets/HbNodeSheet-HYYoGWDg.js","./assets/hb-hub-COOEobcr.js","./assets/hb-lib-CmaEG7Y9.js","./assets/Program-C_Zdfjk3.js","./assets/CustomPlanEditor-CdiGfK3W.js","./manifest.webmanifest","./favicon.png","./icon-192.png","./icon-512.png","./apple-touch-icon.png"];

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
