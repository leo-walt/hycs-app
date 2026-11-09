// Automatisch erzeugt (vite.config.ts) — nicht von Hand aendern.
const CACHE = 'hycs-1eqnk2l';
const FONTS = 'hycs-fonts';
const PRECACHE = ["./","./assets/index-CLTfc6Ry.css","./assets/Onboarding-rHxCFhuA.css","./assets/stats-BWwNph3s.css","./assets/index-BKDoyT6W.js","./assets/Plan-Be-yib1F.js","./assets/Onboarding-CN2vnRHY.js","./assets/Profile-X_rQ6xUI.js","./assets/Summary-J3Y_jVGQ.js","./assets/TemplateEditor-Bg55dR64.js","./assets/ExerciseDetail-0mUbOiyH.js","./assets/Stats-CdjT6uFw.js","./assets/StrengthCurve-z5Wgpimb.js","./assets/History-BHZF2V7N.js","./assets/Entry-C3xnN3dV.js","./assets/stats-C8LkyERs.js","./assets/Hub-BCWPC3ld.js","./assets/Area-DFQgKcK6.js","./assets/SkillDetail-dkblprOR.js","./assets/HbNodeSheet-DxoCML4R.js","./assets/hb-lib-D08VYtCz.js","./assets/Program-D07tH62X.js","./assets/CustomPlanEditor-D7HTaj41.js","./assets/WorkoutPlanEditor-wl2sPK2q.js","./manifest.webmanifest","./favicon.png","./icon-192.png","./icon-512.png","./apple-touch-icon.png"];

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
