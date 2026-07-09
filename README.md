# Caravaneo — APK para Android

## Obtener el APK en 3 pasos (GRATIS, sin instalar nada)

### Paso 1 — Sube el proyecto a GitHub

1. Crea una cuenta en [github.com](https://github.com) si no tienes.
2. Crea un repositorio nuevo: `github.com/TU-USUARIO` → **New repository** → nombre: `caravaneo`
3. Sube todos estos archivos. Opciones:
   - **Arrastra la carpeta** directamente en la web de GitHub
   - O desde terminal:
     ```bash
     cd caravaneo-apk
     git init
     git add .
     git commit -m "Caravaneo app"
     git branch -M main
     git remote add origin https://github.com/TU-USUARIO/caravaneo.git
     git push -u origin main
     ```

### Paso 2 — GitHub Actions compila el APK automáticamente

Al hacer push, GitHub Actions:
1. Instala el SDK de Android
2. Compila el APK (~5-8 minutos)
3. Lo guarda como artefacto descargable

Puedes ver el progreso en: `github.com/TU-USUARIO/caravaneo/actions`

### Paso 3 — Descarga e instala en tu Android

1. En GitHub → pestaña **Actions** → clic en el último workflow
2. Baja hasta **Artifacts** → descarga **Caravaneo-APK-Debug**
3. En tu Android:
   - Activa **"Fuentes desconocidas"** en Configuración → Seguridad
   - Abre el `.apk` descargado → **Instalar**

---

## Estructura del proyecto

```
caravaneo-apk/
├── .github/workflows/
│   └── build-apk.yml      ← GitHub Actions: compila el APK
├── android/
│   ├── app/
│   │   ├── src/main/
│   │   │   ├── AndroidManifest.xml   ← Permisos GPS, cámara, internet
│   │   │   ├── java/.../MainActivity.java  ← WebView con GPS + cámara
│   │   │   ├── res/                  ← Iconos en todas las densidades
│   │   │   └── assets/
│   │   │       ├── index.html        ← App embebida
│   │   │       ├── bundle.js         ← Todo el JSX pre-compilado
│   │   │       └── styles.css        ← Estilos
│   │   └── build.gradle
│   ├── build.gradle
│   └── settings.gradle
└── README.md
```

## Permisos que pide la app

| Permiso | Para qué |
|---------|----------|
| INTERNET | Mapas Leaflet (tiles de OpenStreetMap) |
| ACCESS_FINE_LOCATION | GPS en tiempo real durante tracking |
| CAMERA | Foto de perfil |
| READ_MEDIA_IMAGES | Subir imagen de galería |
| POST_NOTIFICATIONS | Alertas de caravanas |

## Funcionalidades

- **GPS real** — `navigator.geolocation.watchPosition()` con alta precisión
- **Mapas reales** — Leaflet + Carto Dark (sin API key)
- **Cámara** — Tomar foto o subir desde galería
- **Rutas Bogotá** — Centro Histórico, Séptima Norte, Universidades (lat/lng real)
- **Exportar GPX** — Compatible con Garmin, Suunto, Strava
- **Invitar VIPs** — Búsqueda de personalidades verificadas
- **3 temas** — Noche, Día, Voltaje
- **Datos locales** — localStorage persistente
