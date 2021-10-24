const filesToCache = [
	"tinyDOC2.htm",
	"tinyDOC2.js",
	"tinyDOC2.json",
	"tinyDOC2.png",
	"tinyDOC2FavIcon_16x16.png",
	"tinyDOC2FavIcon_192x192.png",
	"tinyDOC2FavIcon_512x512.png",
	"tinyDOC2Share.png"
];

const staticCacheName = "tinydoc2-v1";

self.addEventListener("install", event => {
	event.waitUntil(
		caches.open(staticCacheName)
		.then(cache => {
			return cache.addAll(filesToCache);
		})
	);
});

self.addEventListener("fetch", event => {
	event.respondWith(
		caches.match(event.request)
		.then(response => {
			if (response) {
				return response;
			}
			return fetch(event.request)
		}).catch(error => {
		})
	);
});