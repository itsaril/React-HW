// Имя кэша (важно менять версию при обновлении App Shell)
const CACHE_NAME = 'library-app-v1.3-final'; 

// URL-адреса, которые должны быть закэшированы при установке (App Shell)
// ВНИМАНИЕ: Студент должен вручную обновить 'index-ABCDEF.js' на реальное имя файла после сборки Vite!
const APP_SHELL_URLS = [
  '/', 
  '/index.html',
  // Все CSS файлы из папки styles
  '/styles/global.css',
  '/styles/index.css',
  '/styles/App.css',
  '/styles/components.css',
  '/styles/auth.css',
  '/styles/home.css',
  '/styles/items.css',
  '/styles/profile.css',
  // Статические изображения (запасные обложки)
  '/no-cover.png',
  '/no-cover-large.png',
  // Основной JS-бандл, который генерирует Vite
  '/assets/index-ABCDEF.js', 
  '/assets/main-chunk-XYZ.js' // Пример дополнительного чанка, если он есть
];

// Домены публичных API, которые мы будем кэшировать (OpenLibrary)
const API_DOMAINS = [
    'https://openlibrary.org',
    'https://covers.openlibrary.org' // Для кэширования обложек
];

// ---------------------- 1. INSTALL EVENT (Pre-Cache App Shell) ----------------------
self.addEventListener('install', (event) => {
  console.log('SW: [INSTALL] Starting pre-caching...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        // addAll завершится неудачей, если хоть один файл не будет найден.
        // Добавим catch, чтобы SW зарегистрировался даже при ошибке с одним файлом.
        return cache.addAll(APP_SHELL_URLS)
          .then(() => console.log('SW: App Shell cached successfully.'))
          .catch((error) => console.error('SW: Failed to cache ALL App Shell URLs:', error));
      })
  );
  // Активируем нового SW немедленно (Требование: SW должен контролировать страницу после reload)
  self.skipWaiting();
});

// ---------------------- 2. ACTIVATE EVENT (Cleanup and Claim) ----------------------
self.addEventListener('activate', (event) => {
  console.log('SW: [ACTIVATE] Claiming clients and cleaning up old caches.');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter((cacheName) => {
          return cacheName !== CACHE_NAME;
        }).map((cacheName) => {
          console.log('SW: Deleting old cache:', cacheName);
          return caches.delete(cacheName);
        })
      );
    }).then(() => self.clients.claim()) // Немедленный захват страницы
  );
});

// ---------------------- 3. FETCH EVENT (Caching Strategies) ----------------------
self.addEventListener('fetch', (event) => {
  const requestUrl = new URL(event.request.url);
  const isApiRequest = API_DOMAINS.some(domain => requestUrl.origin.startsWith(domain));
  
  // Проверка на приватные/аутентифицированные эндпоинты (Firebase)
  const isFirebaseAuth = requestUrl.origin.includes('firebase'); 
  
  // A. Runtime Caching для публичного API (Network-First)
  if (isApiRequest && !isFirebaseAuth) {
    // Используем Network-First (или Stale-While-Revalidate, что по сути реализовано тут)
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return fetch(event.request)
          .then((response) => {
            // Клонируем ответ, так как его можно использовать только один раз.
            const responseClone = response.clone();
            
            // Кэшируем успешные ответы API (статус 200)
            if (response.ok && response.type === 'basic') { 
                cache.put(event.request, responseClone);
            }
            return response;
          })
          .catch(() => {
            // Если сеть недоступна, пытаемся получить из кэша
            console.log(`SW: Network failed for API ${requestUrl.pathname}, fetching from cache...`);
            return cache.match(event.request).then(cachedResponse => {
                if (cachedResponse) {
                    return cachedResponse;
                }
                // Офлайн-сообщение (для HW8 Redux это приведет к ошибке, которую обработает компонент)
                return new Response(
                    JSON.stringify({ offline: true, error: 'Offline Mode: Data may be outdated or unavailable.' }), 
                    { status: 503, statusText: 'Service Unavailable', headers: { 'Content-Type': 'application/json' } }
                );
            });
          });
      })
    );
    return;
  }

  // B. Offline Fallback для навигации (mode: navigate)
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => {
        // Если сеть недоступна, возвращаем закэшированный /index.html
        return caches.match('/index.html');
      })
    );
    return;
  }
  
  // C. Cache-First для остальных статических ресурсов
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Если ресурс найден в кэше, возвращаем его
        if (response) {
          return response;
        }
        
        // Если нет, идем в сеть и, если успешно, кэшируем.
        return fetch(event.request).then((networkResponse) => {
            if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic' || event.request.method !== 'GET') {
              return networkResponse;
            }

            // Кэшируем ответ для будущего использования (статические ресурсы)
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });

            return networkResponse;
        });
      })
  );
});