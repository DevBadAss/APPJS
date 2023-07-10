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
        })
        .then(function() {
            self.skipWaiting(); // Activate the new service worker immediately
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

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
        .then(function(response) {
            if (response) {
                return response; // Return cached response if available
            } else {
                // Fetch from network
                return fetch(event.request)
                    .then(function(networkResponse) {
                        const clonedResponse = networkResponse.clone(); // Clone the network response

                        // Cache the cloned network response for future use
                        caches.open(CACHE_NAME)
                            .then(function(cache) {
                                cache.put(event.request, clonedResponse);
                            });

                        return networkResponse; // Return the original network response
                    })
                    .catch(function(error) {
                        console.error('Error fetching:', error);
                        // Handle fetch errors
                    });
            }
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
