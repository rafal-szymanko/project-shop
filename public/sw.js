/* eslint-disable no-restricted-globals */
var cacheName = 'manchester-united-store';
var filesToCache = [
  '../build/static/css/main.39702bea.chunk.css',
  '../build/static/js/2.348a7a9b.chunk.js',
  '../build/static/js/main.743d416d.chunk.js',
  '../build/static/js/runtime-main.b9c013c5.js',
  '../build/static/images/6s_ss4.jpg',
  '../build/static/images/alex-ferguson-my-autobiogrpahy.jpg',
  '../build/static/images/bobby-charlton-autobiography.jpg',
  '../build/static/images/class-of-92.jpg',
  '../build/static/images/george-best-blessed.jpg',
  '../build/static/images/james-leighton-duncan-edwards.jpg',
  '../build/static/images/manchester-united-all-over-print-t-shirt-red-baby.jpg',
  '../build/static/images/manchester-united-away-goalkeeper-shirt-2020-21.jpg',
  '../build/static/images/manchester-united-away-kits.png',
  '../build/static/images/manchester-united-away-shirt-2020-21.jpg',
  '../build/static/images/manchester-united-ball-keyring-silver.jpg',
  '../build/static/images/manchester-united-heritage-football-size-5.jpg',
  '../build/static/images/manchester-united-home-goalkeeper-shirt-2020-21.jpg',
  '../build/static/images/manchester-united-home-kits.png',
  '../build/static/images/manchester-united-home-shirt-2020-21.jpg',
  '../build/static/images/manchester-united-new-era-fred-the-red.jpg',
  '../build/static/images/manchester-united-silcone-watch-red-kids.jpg',
  '../build/static/images/manchester-united-strap-keyring.jpg',
  '../build/static/images/manchester-united-third-kits.png',
  '../build/static/images/manchester-united-third-shirt-2020-21.jpg',
  '../build/static/images/manchester-united-x-paul-smith-mens-red-and-grey-stripe-rectangle-cufflinks.jpg',
  '../build/static/images/manchester-united-x-paul-smith-mens-vintage-rosette-print-interior-billfold-wallet.jpg',
];
self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});
self.addEventListener('activate',  event => {
  event.waitUntil(self.clients.claim());
});
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request, {ignoreSearch:true}).then(response => {
      return response || fetch(event.request);
    })
  );
});