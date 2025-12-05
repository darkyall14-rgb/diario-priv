# Rutina Personal - Aplicación Web

Una aplicación web completa para gestionar rutinas personales, metas, agenda y diario personal con autenticación Firebase.

## 🚀 Características

- **Autenticación**: Login con email/contraseña y Google
- **Rutinas**: Gestión de rutinas de ejercicio y actividades
- **Metas**: Seguimiento de objetivos personales
- **Agenda**: Organización de eventos y citas
- **Diario**: Registro de pensamientos y reflexiones diarias
- **Interfaz moderna**: Diseño responsive y atractivo

## 📋 Requisitos Previos

- Node.js (v14 o superior)
- Cuenta de Firebase
- Certificados SSL (incluidos en `/certs`)

## 🛠️ Configuración

### 1. Instalar Dependencias
```bash
npm install
```

### 2. Configurar Firebase

#### Backend (Firebase Admin):
1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Ve a "Configuración del proyecto" > "Cuentas de servicio"
4. Genera una nueva clave privada
5. Descarga el archivo JSON y renómbralo a `serviceAccountKey.json`
6. Colócalo en la raíz del proyecto

#### Frontend (Firebase Client):
1. En Firebase Console, ve a "Configuración del proyecto" > "General"
2. En "Tus apps", busca la configuración del SDK
3. Copia la configuración y actualiza `views/firebase-config.js`:

```javascript
export const firebaseConfig = {
    apiKey: "tu-api-key-real",
    authDomain: "tu-proyecto.firebaseapp.com",
    projectId: "tu-proyecto-id",
    storageBucket: "tu-proyecto.appspot.com",
    messagingSenderId: "123456789",
    appId: "tu-app-id-real"
};
```

### 3. Configurar Firebase Authentication
1. En Firebase Console, ve a "Authentication" > "Sign-in method"
2. Habilita "Email/Password"
3. Habilita "Google" (opcional)
4. Agrega tu dominio a los dominios autorizados

### 4. Configurar Firebase Realtime Database
1. En Firebase Console, ve a "Realtime Database"
2. Crea una base de datos
3. Configura las reglas de seguridad:

```json
{
  "rules": {
    "users": {
      "$uid": {
        ".read": "$uid === auth.uid",
        ".write": "$uid === auth.uid"
      }
    }
  }
}
```

## 🚀 Ejecución

### Desarrollo
```bash
npm start
```

La aplicación estará disponible en: `https://localhost:3000`

### Estructura de URLs
- `/` - Página de login
- `/login.html` - Página de login
- `/dashboard.html` - Dashboard principal (requiere autenticación)
- `/test` - Página de pruebas de API

## 📁 Estructura del Proyecto

```
rutina-personal/
├── certs/                  # Certificados SSL
├── controllers/            # Controladores de la API
├── middleware/            # Middleware de autenticación
├── models/               # Modelos de datos
├── routes/               # Rutas de la API
├── views/                # Archivos HTML del frontend
│   ├── login.html        # Página de login
│   ├── dashboard.html    # Dashboard principal
│   ├── index.html        # Página de pruebas
│   └── firebase-config.js # Configuración Firebase cliente
├── app.js                # Servidor principal
├── firebaseconfig.js     # Configuración Firebase servidor
└── serviceAccountKey.json # Clave privada Firebase (no incluida)
```

## 🔧 API Endpoints

### Autenticación
- `POST /auth/login` - Iniciar sesión
- `POST /auth/logout` - Cerrar sesión

### Rutinas (requiere autenticación)
- `GET /routines/` - Obtener rutinas
- `POST /routines/` - Crear rutina
- `DELETE /routines/:id` - Eliminar rutina

### Metas (requiere autenticación)
- `GET /metas/` - Obtener metas
- `POST /metas/` - Crear meta
- `DELETE /metas/:id` - Eliminar meta

### Agenda (requiere autenticación)
- `GET /agenda/` - Obtener eventos
- `POST /agenda/` - Crear evento
- `DELETE /agenda/:id` - Eliminar evento

### Diario (requiere autenticación)
- `GET /diario/` - Obtener entradas
- `POST /diario/` - Crear entrada
- `DELETE /diario/:id` - Eliminar entrada

## 🔐 Seguridad

- Todas las rutas (excepto auth) requieren token Bearer
- Los datos se almacenan por usuario en Firebase
- Comunicación HTTPS obligatoria
- Validación de tokens Firebase en el backend

## 🎨 Características de la Interfaz

- **Responsive**: Se adapta a móviles y escritorio
- **Modales**: Para crear nuevos elementos
- **Tiempo real**: Actualización automática de datos
- **Tema moderno**: Gradientes y animaciones suaves
- **UX intuitiva**: Navegación clara y acciones rápidas

## 🚨 Solución de Problemas

### Error de certificados SSL
Si tienes problemas con HTTPS en desarrollo, puedes:
1. Regenerar los certificados en `/certs`
2. O modificar `app.js` para usar HTTP en desarrollo

### Error de configuración Firebase
1. Verifica que `serviceAccountKey.json` esté en la raíz
2. Confirma que `firebase-config.js` tenga la configuración correcta
3. Asegúrate de que Authentication y Database estén habilitados

### Error de CORS
Si tienes problemas de CORS, agrega tu dominio a los dominios autorizados en Firebase Console.

## 📝 Notas de Desarrollo

- El proyecto usa Firebase Realtime Database
- La autenticación se maneja con Firebase Auth
- Los tokens se almacenan en localStorage
- Las rutas están protegidas con middleware de autenticación

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request