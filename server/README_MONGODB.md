# 🍱 Configuración con MongoDB

El backend ahora usa MongoDB en lugar de MySQL.

## 📋 Configuración

### 1. Instalar MongoDB

Si no tienes MongoDB instalado:
- **Windows**: Descarga desde https://www.mongodb.com/try/download/community
- **Mac**: `brew install mongodb-community`
- **O usa MongoDB Atlas** (gratis en la nube): https://www.mongodb.com/cloud/atlas

### 2. Variables de Entorno

Crea un archivo `.env` en la carpeta `server/`:

```env
MONGODB_URI=mongodb://localhost:27017/osaka_restaurant
PORT=3000
```

**Para MongoDB Atlas (en la nube):**
```env
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/osaka_restaurant
PORT=3000
```

### 3. Instalar Dependencias

```bash
cd server
npm install
```

Esto instalará `mongoose` en lugar de `mysql2`.

### 4. Inicializar Datos

Los datos se inicializan automáticamente al iniciar el servidor. Las mesas (QR1-QR10) se crearán automáticamente si no existen.

### 5. Ejecutar

```bash
npm run dev
```

## 🔍 Estructura de la Base de Datos

### Colección: `mesas`
```javascript
{
  _id: ObjectId,
  numero_mesa: 1,
  qr_code: "QR1",
  estado: "disponible",
  createdAt: Date,
  updatedAt: Date
}
```

### Colección: `pedidos`
```javascript
{
  _id: ObjectId,
  mesa_id: ObjectId (referencia a Mesa),
  numero_personas: 2,
  estado: "edicion",
  items: [
    {
      _id: ObjectId,
      plato_id: 1,
      cantidad: 2,
      personalizaciones: null,
      comentarios: null,
      createdAt: Date,
      updatedAt: Date
    }
  ],
  fecha_confirmacion: null,
  createdAt: Date,
  updatedAt: Date
}
```

## ✅ Ventajas de MongoDB

- ✅ No necesitas instalar MySQL
- ✅ Estructura más flexible
- ✅ Los items del pedido están dentro del documento (no tabla separada)
- ✅ Se inicializa automáticamente

## 🔧 Cambios Realizados

- `server/database/config.js` → Ahora usa Mongoose
- `server/models/` → Nuevos modelos para Mesa y Pedido
- `server/routes/` → Actualizados para usar MongoDB
- `server/database/initData.js` → Inicializa mesas automáticamente

## 🧪 Probar

1. Inicia MongoDB: `mongod` (o automático si usas MongoDB como servicio)
2. Inicia el backend: `cd server && npm run dev`
3. Deberías ver: `✅ Conectado a MongoDB` y `✅ Mesas inicializadas en la base de datos`
4. Prueba en el navegador: `http://localhost:8080?mesa=QR1`
