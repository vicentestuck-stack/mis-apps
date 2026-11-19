const C='apps-v2';
const FILES=['./','./index.html','./habitos.html','./foco.html','./widgets.html','./icons/habitos-180.png','./icons/habitos-512.png','./icons/foco-180.png','./icons/foco-512.png','./icons/widgets-180.png','./icons/widgets-512.png','./manifest-habitos.json','./manifest-foco.json','./manifest-widgets.json'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>Promise.all(FILES.map(f=>c.add(f).catch(()=>{})))));self.skipWaiting();});
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);
  if(u.origin!==location.origin&&!/fonts\.(googleapis|gstatic)\.com/.test(u.host))return;
  e.respondWith(fetch(r).then(res=>{if(res.ok||res.type==='opaque'){const cp=res.clone();caches.open(C).then(c=>c.put(r,cp));}return res;}).catch(()=>caches.match(r,{ignoreSearch:true}).then(m=>m||caches.match('./index.html'))));});
self.addEventListener('notificationclick',e=>{e.notification.close();const url=(e.notification.data&&e.notification.data.url)||'./';e.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(cs=>{for(const c of cs){if(c.url.split('#')[0]===url.split('#')[0]&&'focus' in c)return c.focus();}return self.clients.openWindow?self.clients.openWindow(url):null;}));});
