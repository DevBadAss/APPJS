/**
 * APPJS Service Worker to support offline caching
 * 
 * @version 1.0.0
 */


const CACHE_NAME = "My-app";
const CACHE_URLS = ["/index.html", "/public/js/test.js"];

/**
 * Install event Listener
 * 
 * Caches the specified URLs for offline use.
 */

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then((cache) => {
            cache.addAll(CACHE_URLS);
        }).catch((err) => {
            console.error(err);
        })
    );
});


/**
 * Fetch event Listener
 * 
 * Returns the cached response if available, otherwise fetches
 * the requested URL and caches it for offline use.
 */

self.addEventListener("fetch", (event) => {
    event.waitUntil(
        caches.match(event.request)
        .then((response) => {
            response || fetch(event.request);
        })
        .catch((err) => {
            console.error(err);
        })
    );
});


/**
 * Activate event Listener
 * 
 * Deletes the previous cache version if it exists.
 */

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys()
        .then((keyList) => {
            return Promise.all(keyList.map(key => {
                if (key !== CACHE_NAME) {
                    return caches.delete(key);
                }
            }));
        })
        .catch((err) => {
            console.error(err)
        })
    );
});