# 🍱 Backend - Sistema de Pedidos con QR

Backend para el sistema de pedidos con códigos QR del restaurante Osaka.

## 📋 Requisitos

- Node.js 16+ 
- MySQL 5.7+ o 8.0+
- npm o yarn

## 🚀 Instalación

1. Instalar dependencias:
```bash
cd server
npm install
```

2. Configurar base de datos:

   - Crear base de datos MySQL
   - Ejecutar el script de esquema:
   ```bash
   mysql -u root -p < database/schema.sql
   ```

3. Configurar variables de entorno:

   Crear archivo `.env` en la carpeta `server/`:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=tu_password
   DB_NAME=osaka_restaurant
   PORT=3000
   ```

## 🏃 Ejecutar

### Modo desarrollo:
```bash
npm run dev
```

### Modo producción:
```bash
npm start
```

El servidor estará disponible en `http://localhost:3000`

## 📡 API Endpoints

### Mesas

- `GET /api/mesas/qr/:qrCode` - Obtener mesa por código QR
- `GET /api/mesas/:mesaId/pedido-activo` - Obtener pedido activo de una mesa
- `POST /api/mesas/:mesaId/pedido` - Crear nuevo pedido para una mesa

### Pedidos

- `GET /api/pedidos/:pedidoId` - Obtener pedido por ID
- `POST /api/pedidos/:pedidoId/items` - Agregar item al pedido
- `PUT /api/pedidos/:pedidoId/items/:itemId` - Actualizar item del pedido
- `DELETE /api/pedidos/:pedidoId/items/:itemId` - Eliminar item del pedido
- `POST /api/pedidos/:pedidoId/confirmar` - Confirmar pedido (cambiar estado a 'confirmado')

## 🔌 WebSocket

El servidor usa Socket.IO para sincronización en tiempo real:

- **Sala de mesa**: `mesa-{mesaId}`
- **Evento de actualización**: `cart-update`

Cuando se añade, modifica o elimina un item, se emite una actualización a todos los clientes conectados a la sala de la mesa.

## 🗄️ Base de Datos

### Tablas principales:

- **mesas**: Información de las mesas del restaurante
- **pedidos**: Pedidos realizados por mesa
- **items_pedido**: Items individuales de cada pedido

El esquema completo se encuentra en `database/schema.sql`

## 📝 Notas

- Cada mesa tiene un código QR único (ej: QR1, QR2, etc.)
- Los pedidos en estado 'edicion' pueden ser modificados
- Al confirmar un pedido, su estado cambia a 'confirmado' y se guarda la fecha de confirmación
- Las actualizaciones del carrito se sincronizan en tiempo real mediante WebSocket
