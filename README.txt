# El Rincón del Perfume x Kitty Edition - PWA

Esta carpeta es una PWA lista para instalar.

## Contenido limpio:
- Se eliminó el script de external links (target=_blank automático)
- Se eliminó el manifest de clippy-inline-media
- Se cambió lang a es, título y descripción reales
- Se agregó theme-color, manifest, icons, Apple meta tags
- Todo el CSS y JS de la página se mantiene inline (2.8MB) para funcionar offline

## Archivos:
- index.html - página principal limpia + registro de SW
- manifest.json - configuración PWA
- sw.js - Service Worker con cache-first
- icons/ - iconos 192, 512, maskable, apple-touch, transparent

## Instalación:
1. Sube todo a tu hosting (mantén estructura)
2. Debe servirse por HTTPS
3. Abre en Chrome/Android y te ofrecerá Instalar

## Test local:
npx serve .  (dentro de esta carpeta)
Luego abre http://localhost:3000

Hecho con 💖
