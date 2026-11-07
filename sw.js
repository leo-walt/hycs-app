// Automatisch erzeugt (vite.config.ts) — nicht von Hand aendern.
const CACHE = 'hycs-15z84h9';
const FONTS = 'hycs-fonts';
const PRECACHE = ["./","./assets/index-OoV_27Wl.css","./assets/plan-Dn0wgsfO.css","./assets/Onboarding-Mobm9giK.css","./assets/stats-PyFyHaFV.css","./assets/index-Cj3WV06p.js","./assets/Plan-C3agC-zi.js","./assets/DayRunner-z1wvBEml.js","./assets/plan-Di3ggqvV.js","./assets/Onboarding-CNyapSkK.js","./assets/Profile-Bvf6m1d-.js","./assets/Summary-kg_3BiFV.js","./assets/TemplateEditor-BGXjdJVr.js","./assets/ExerciseDetail-CgOhWD3l.js","./assets/Stats-C0cbwA1i.js","./assets/StrengthCurve-Cfn2Lz3p.js","./assets/History-GWDKFKB6.js","./assets/Entry-BmaAV6Ox.js","./assets/stats-C2ruqMEE.js","./assets/Hub-CLVBa43J.js","./assets/Area-_zNc7jxp.js","./assets/SkillDetail-DFWwdvwE.js","./assets/HbNodeSheet-BEeaKj5_.js","./assets/hb-lib-CRSabLMo.js","./assets/Program-Dzvqn_EO.js","./assets/CustomPlanEditor-DeOBoFm_.js","./manifest.webmanifest","./favicon.png","./icon-192.png","./icon-512.png","./apple-touch-icon.png"];

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
