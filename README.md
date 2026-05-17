# DisneyVerse (Expo + Firebase)

Proyecto móvil de ejemplo: DisneyVerse. App en React Native con Expo que consume la API pública de Disney y usa Firebase Authentication y Firestore para favoritos.

Características:
- Login / Registro con Firebase Auth
- Listado de personajes desde https://api.disneyapi.dev/character
- Detalle de personaje y favoritos guardados en Firestore
- Estructura en TypeScript, React Navigation, Axios y AsyncStorage


Instalación y ejecución

```bash
cd /workspaces/api-firebase
npm install
npm run start
# o para abrir directamente en Android (emulador/dispositivo)
npm run android
```

Verificación de tipos

```bash
npm run type-check
```

Generar APK con EAS

1. Instala `eas-cli` globalmente si no lo tienes: `npm install -g eas-cli`
2. Inicia sesión: `npx eas login`
3. Configura tu cuenta en Expo y sigue las instrucciones para credenciales Android.
4. Ejecuta la build:

```bash
npx eas build --platform android --profile production
```

Archivos y estructura

- `App.tsx`: entrada y navegación
- `src/firebase/index.ts`: configuración de Firebase (ya incluida)
- `src/screens/`: pantallas principales (Login, Register, Home, Details, Favorites)
- `src/components/`: componentes reutilizables
- `src/services/`: API y Firestore
- `app.json`, `eas.json`: configuración de Expo/EAS

Notas

- Asegúrate de tener una cuenta de Firebase con la configuración usada aquí o reemplaza `src/firebase/index.ts` por tu configuración.
- Para publicar un APK necesitas configurar credenciales en EAS (keystore) o dejar que EAS las gestione.


Archivos importantes:
- `App.tsx`
- `src/firebase/index.ts` (config Firebase)
- `src/screens/` (pantallas)
- `app.json` y `eas.json` (config Expo/EAS)

Sigue el README para más detalles y comandos.
