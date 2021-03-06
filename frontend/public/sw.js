// insall service worker
const staticCacheName = 'site-static';
const dynamicCach = 'site-static-dynamic';
const assets = [
    '/',
    '/static/js/bundle.js',
    '/manifest.json',
    '/index.html',
];

this.addEventListener('install',e=>{
    e.waitUntil(
        caches.open(staticCacheName).then(cache=>{
            console.log('Caching shell assets');
            cache.addAll(assets);
        })
    );
});
// acivate service worker
this.addEventListener('activate',e=>{
    // Delete all the previous caches so new will loaded
    e.waitUntil(
        caches.keys().then(keys=>{
            // delete any cache that is not = staticCachesName
            return Promise.all(keys
                .filter(key=>key !== staticCacheName && key !== dynamicCach)
                .map(key=>caches.delete(key))
                )
        })
    )
});
// fetch  event
this.addEventListener('fetch',e=>{
    e.respondWith(
        caches.match(e.request)
        .then(cacheRes=>{
            return cacheRes || fetch(e.request).then(response=>{
                return caches.open(dynamicCach).then(cache=>{
                    cache.put(e.request.url,response.clone());
                    return response;
                })
            }).catch(()=>caches.match('/static/pages/404page.html'));
        })
    );
})