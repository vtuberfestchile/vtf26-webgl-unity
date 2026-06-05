const cacheName = "VRothers E.I.R.L.-VRothers Festa-0.1";
const contentToCache = [
    "Build/5336a4b2c43054286fd70b1faa467eee.loader.js",
    "Build/3c566d53d04feffdc9009d63dcedeb6d.framework.js.unityweb",
    "Build/f7885b34020f12429ffe64a99f70ea56.data.unityweb",
    "Build/903f7ef1fb8fa9f6041fe285a60bedeb.wasm.unityweb",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
