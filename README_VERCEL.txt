
INSTRUCCIONES VERCEL - FIX INSTALACION

1. Borra el deployment anterior en Vercel
2. Sube ESTA carpeta completa (v3) como nuevo proyecto
   - Debe quedar en la raiz: /index.html, /manifest.json, /sw.js, /icons/, /vercel.json
3. Haz deploy
4. Abre https://tu-proyecto.vercel.app
5. F12 > Application > Clear Storage > Clear site data
6. Recarga (Ctrl+Shift+R)
7. Debes ver en consola: [SW v3] Install, Manifest OK

Si aun dice "No se puede instalar":
- Application > Manifest > Debe mostrar los 3 iconos sin error 404
- Application > Service Workers > debe estar verde "activated and running"

Este fix usa rutas absolutas "/" que es lo que Vercel necesita.
