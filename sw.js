// Automatisch erzeugt (vite.config.ts) — nicht von Hand aendern.
const CACHE = 'hycs-1gjb8tx';
const FONTS = 'hycs-fonts';
const PRECACHE = ["./","./assets/index-BVn4VTwn.css","./assets/Onboarding-rHxCFhuA.css","./assets/stats-B0zwB1LD.css","./assets/index-D0-YIoxm.js","./assets/Plan-BLiL2cxC.js","./assets/Onboarding-d4PrfYpH.js","./assets/Profile-DUnw1fty.js","./assets/Summary-BJ7tEoR5.js","./assets/TemplateEditor-zgw2LJbL.js","./assets/ExerciseDetail-CCYFqK-m.js","./assets/Stats-bdhj5No4.js","./assets/StrengthCurve-rne9X0sS.js","./assets/History-e6maxssr.js","./assets/Entry-CW2LNN4k.js","./assets/stats-gAwx72-V.js","./assets/Hub-DIdztjom.js","./assets/Area-BQqZTTyF.js","./assets/SkillDetail-DJ4JLwhg.js","./assets/HbNodeSheet-CuN1yUVc.js","./assets/hb-lib-Dazamon7.js","./assets/Program-B5DYvzxK.js","./assets/CustomPlanEditor-DzoZMAZF.js","./manifest.webmanifest","./favicon.png","./icon-192.png","./icon-512.png","./apple-touch-icon.png"];

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
