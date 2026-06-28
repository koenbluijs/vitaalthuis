// Eenvoudige service worker: network-first met cache-fallback, zodat de app
// ook offline opent. Bewust minimaal gehouden voor de MVP.
const CACHE = "vitaal-thuis-v1";

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  event.respondWith(
    fetch(req)
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
        return res;
      })
      .catch(() =>
        caches.match(req).then((m) => {
          if (m) return m;
          if (req.mode === "navigate") return caches.match("/");
          return new Response("", { status: 504, statusText: "offline" });
        }),
      ),
  );
});
