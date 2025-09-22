// public/sw.js
const CACHE_NAME = 'qr-app-v1';
const urlsToCache = [
    '/',
    '/manifest.json'
];

// Install Service Worker and Cache resources
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// Returns Response from cache if any, otherwise fetch from network
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Returns Response from cache if found
                if (response) {
                    return response;
                }
                return fetch(event.request);
            }
            )
    );
});