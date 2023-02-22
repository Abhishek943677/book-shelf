//Cache cdn files and external link

// const CACHE_NAME = "version-1";

// // const urlsToCache = [ 'index.html', 'offline.html' ,'../src/assets/book.pdf','images/bg.jpg','images/logo.png','manifest.json','serviceworker.js','../src/components/PdfViewer.jsx','../src/App.css','../src/App.js','/package.json','../src/index.js','/package-lock.json'];
// const urlsToCache =['index.html','images/logos/icon.png']
// const self = this;

// // Install SW
// self.addEventListener('install', (event) => {
//     event.waitUntil(
//         caches.open(CACHE_NAME)
//             .then((cache) => {
//                 console.log('Opened cache');
//                 return cache.addAll(urlsToCache);
//             })
//     )
// });

// // Listen for requests
// self.addEventListener('fetch', (event) => {
//     event.respondWith(
//         caches.match(event.request)
//             .then(() => {
//                 return fetch(event.request) 
//                     .catch(() => caches.match('index.html'))
//             })
//     )
// });

// // Activate the SW
// self.addEventListener('activate', (event) => {
//     const cacheWhitelist = [];
//     cacheWhitelist.push(CACHE_NAME);

//     event.waitUntil(
//         caches.keys().then((cacheNames) => Promise.all(
//             cacheNames.map((cacheName) => {
//                 if(!cacheWhitelist.includes(cacheName)) {
//                     return caches.delete(cacheName);
//                 }
//             })
//         ))
            
//     )
// });