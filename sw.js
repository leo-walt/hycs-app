// Automatisch erzeugt (vite.config.ts) — nicht von Hand aendern.
const CACHE = 'hycs-ns7o3j';
const FONTS = 'hycs-fonts';
const PRECACHE = ["./","./assets/index-DV1mRmp2.css","./assets/plan-Dn0wgsfO.css","./assets/Onboarding-Mobm9giK.css","./assets/stats-PyFyHaFV.css","./assets/index-Cxx-49rV.js","./assets/Plan-Bkzd46mj.js","./assets/DayRunner-DxWzmL8w.js","./assets/plan-Di3ggqvV.js","./assets/Onboarding-DrwdeBhb.js","./assets/Profile-i3HBXuBi.js","./assets/Summary-C-Mpjugc.js","./assets/TemplateEditor-CNEfWexz.js","./assets/ExerciseDetail-0IG2tExk.js","./assets/Stats-D1UScop6.js","./assets/History-DFo0sDVM.js","./assets/Entry-DA3UqWa1.js","./assets/stats-C2ruqMEE.js","./assets/Hub-CBmdG0T-.js","./assets/Area-EJHpAU5N.js","./assets/SkillDetail-CyGcqr-7.js","./assets/HbNodeSheet-BiOR30NO.js","./assets/hb-lib-DwNF04c-.js","./assets/Program-CoKJ5KcX.js","./assets/CustomPlanEditor-DBX3NBka.js","./manifest.webmanifest","./favicon.png","./icon-192.png","./icon-512.png","./apple-touch-icon.png"];

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
