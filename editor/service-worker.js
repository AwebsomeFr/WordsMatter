self.addEventListener('install', function(e) {
	e.waitUntil(
		caches.open('wordsMatter').then(function(cache) {
			return cache.addAll([
				'./',
				'./index.html',
				'./help.html',
				'./manifest.webmanifest',
				'./styles/style.css',
				'./styles/style.help.css',
				'./scripts/config.js',
				'./scripts/regex.js',
				'./scripts/functions.js',
				'./scripts/script.js',
				'./medias/words-matter-favicon.ico',
				'./medias/words-matter-logo-192px.png',
				'./medias/words-matter-logo-512px.png'
			]);
		})
	);
});
self.addEventListener('fetch', function(event) {
	event.respondWith(
		// Promise : try network first, else reload from cache.
		fetch(event.request).catch(function() { 
			// console.log(event.request + 'has been reload from cache.');
			return caches.match(event.request);
		})
	);
});