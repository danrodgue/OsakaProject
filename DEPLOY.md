# 🚀 Guía de Despliegue en Vercel

Esta guía te ayudará a desplegar el frontend de tu aplicación React en Vercel.

## 📋 Consideraciones Importantes

**IMPORTANTE**: Este proyecto tiene dos partes:
1. **Frontend (React/Vite)** - Se despliega en Vercel ✅
2. **Backend (Node.js/Express/MySQL/WebSocket)** - Necesita desplegarse por separado (Railway, Render, etc.)

El frontend **requiere** que el backend esté desplegado para funcionar correctamente.

## 🌐 Despliegue del Frontend en Vercel

### Paso 1: Preparar el Repositorio

1. Asegúrate de que tu código esté en GitHub:
   ```bash
   git add .
   git commit -m "Preparar para despliegue en Vercel"
   git push origin main
   ```

### Paso 2: Conectar con Vercel

1. Ve a [vercel.com](https://vercel.com) e inicia sesión con GitHub
2. Haz clic en **"Add New Project"** o **"Import Project"**
3. Selecciona tu repositorio de GitHub

### Paso 3: Configurar el Proyecto en Vercel

Vercel debería detectar automáticamente que es un proyecto Vite. Verifica:

- **Framework Preset**: `Vite`
- **Root Directory**: `.` (raíz del proyecto)
- **Build Command**: `npm run build` (o `npm run build` si usas npm)
- **Output Directory**: `dist`

### Paso 4: Configurar Variables de Entorno

En la configuración del proyecto, ve a **Settings > Environment Variables** y añade:

| Variable | Valor | Descripción |
|----------|-------|-------------|
| `VITE_API_URL` | `https://tu-backend.railway.app/api` | URL de tu API backend |
| `VITE_SOCKET_URL` | `https://tu-backend.railway.app` | URL del servidor WebSocket |

**⚠️ IMPORTANTE**: Reemplaza las URLs con la URL real de tu backend desplegado.

### Paso 5: Desplegar

1. Haz clic en **"Deploy"**
2. Espera a que se complete el build
3. Tu aplicación estará disponible en una URL como: `https://tu-proyecto.vercel.app`

## 🔧 Despliegue del Backend

El backend **NO se puede desplegar en Vercel** tal como está. Necesitas usar otra plataforma:

### Opción 1: Railway (Recomendado)

1. Ve a [railway.app](https://railway.app)
2. Conecta tu repositorio
3. Selecciona el directorio `server/`
4. Configura las variables de entorno (MySQL, etc.)
5. Railway proporcionará una URL para tu backend

### Opción 2: Render

1. Ve a [render.com](https://render.com)
2. Crea un nuevo "Web Service"
3. Conecta tu repositorio
4. Configura:
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment**: `Node`

### Opción 3: Heroku

1. Instala Heroku CLI
2. En el directorio `server/`:
   ```bash
   heroku create tu-backend-name
   heroku addons:create cleardb:ignite  # Para MySQL
   git subtree push --prefix server heroku main
   ```

## 🔗 Conectar Frontend y Backend

Una vez que tengas ambos desplegados:

1. **Frontend (Vercel)**: `https://tu-frontend.vercel.app`
2. **Backend (Railway/Render)**: `https://tu-backend.railway.app`

Actualiza las variables de entorno en Vercel:
- `VITE_API_URL`: `https://tu-backend.railway.app/api`
- `VITE_SOCKET_URL`: `https://tu-backend.railway.app`

Luego, vuelve a desplegar el frontend para que tome las nuevas variables.

## 🧪 Probar el Despliegue

Una vez desplegado, prueba accediendo a:
```
https://tu-frontend.vercel.app?mesa=QR1
```

Esto simula escanear el QR de la mesa 1.

## 📝 Notas Adicionales

- **CORS**: Asegúrate de que tu backend permita peticiones desde tu dominio de Vercel
- **WebSocket**: Algunos servicios pueden tener restricciones con WebSocket. Verifica la documentación
- **Base de Datos**: MySQL necesita estar disponible públicamente para que el backend pueda conectarse

## 🐛 Solución de Problemas

### El frontend no puede conectar con el backend

1. Verifica que las variables de entorno estén configuradas correctamente en Vercel
2. Verifica que el backend esté corriendo y accesible
3. Revisa la consola del navegador para errores de CORS

### WebSocket no funciona

1. Verifica que `VITE_SOCKET_URL` esté configurada correctamente
2. Algunos servicios requieren configuración adicional para WebSocket
3. Considera usar un servicio como Pusher o Ably como alternativa

---

**¿Necesitas ayuda?** Revisa la documentación de [Vercel](https://vercel.com/docs) y de tu servicio de backend.
