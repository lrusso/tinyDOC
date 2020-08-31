const filesToCache = [
	"tinyDOC.css",
	"tinyDOC.htm",
	"tinyDOC.js",
	"tinyDOC.json",
	"tinyDOC.png",
	"tinyDOCFavIcon_16x16.png",
	"tinyDOCFavIcon_192x192.png",
	"tinyDOCFavIcon_512x512.png",
	"tinyDOCShare.png"
];

const staticCacheName = "tinydoc-v1";

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