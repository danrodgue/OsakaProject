# 📱 Osaka Restaurant - Cómo Funciona Todo

## 🏗️ Arquitectura General

```
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (React + Vite)                   │
│              http://localhost:8080 (Navegador)               │
│  - Menú digital interactivo                                  │
│  - Carrito de compras en tiempo real                         │
│  - WebSocket para sincronización con otras mesas             │
└────────────────────┬──────────────────────────────────────────┘
                     │ (API REST + WebSocket)
                     ↓
┌─────────────────────────────────────────────────────────────┐
│                   BACKEND (Node.js + Express)                │
│              http://localhost:3000/api (Puerto 3000)         │
│  - Rutas REST (/mesas, /pedidos, /print)                    │
│  - WebSocket para actualizaciones en tiempo real             │
│  - Gestión de pedidos y mesas                                │
└────────────────────┬──────────────────────────────────────────┘
                     │ (Mongoose ODM)
                     ↓
┌─────────────────────────────────────────────────────────────┐
│              BASE DE DATOS (MongoDB)                          │
│              mongodb://localhost:27017                        │
│  - Base de datos: osaka_restaurant                           │
│  - Colecciones:                                              │
│    • Mesas (10 mesas con QR único)                          │
│    • Pedidos (con items, estado, personalizaciones)         │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│           IMPRESORA TÉRMICA (TCP Port 9100)                 │
│              Protocolo ESC/POS (comandos binarios)           │
│  - Imprime tickets con formato automático                    │
│  - Corte automático al final                                 │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔄 Flujo de un Pedido

### 1. **Cliente llega a la mesa**
   - Escanea QR con su teléfono
   - El QR codifica: `http://localhost:8080/?mesa=QR1`
   - Frontend obtiene datos de la mesa desde `/api/mesas/qr/QR1`

### 2. **Cliente selecciona menú**
   - Elige tipo de buffet (Día, Noche, Fin de semana)
   - Confirma número de personas
   - Se crea un pedido en base de datos: `POST /api/mesas/{mesaId}/pedido`

### 3. **Cliente agrega platos al carrito**
   - Cada plato se añade al pedido: `POST /api/pedidos/{pedidoId}/items`
   - Los datos se guardan en MongoDB
   - WebSocket emite evento `cart-update` a todas las mesas conectadas

### 4. **Cliente confirma el pedido**
   - Hace clic en "Confirmar Pedido"
   - Backend: `POST /api/pedidos/{pedidoId}/confirmar`
   - El estado del pedido cambia de "edicion" → "confirmado"
   - **Automáticamente se envía a imprimir:** `POST /api/print`

### 5. **Impresión térmica**
   - El backend construye un ticket ESC/POS
   - Conecta a la impresora por TCP (puerto 9100)
   - Envía comandos binarios:
     - Inicializa impresora
     - Alinea texto (centro/izquierda)
     - Negritas para datos importantes
     - Lista de items con cantidades
     - Línea de separación
     - Corte automático del papel
   - Si no hay impresora real, el simulador (`print-sim.js`) muestra los datos en terminal

---

## 💾 Base de Datos (MongoDB)

### Colección: `mesas`
```javascript
{
  _id: ObjectId,
  numero_mesa: 1,
  qr_code: "QR1",
  estado: "disponible" | "ocupada" | "reservada",
  createdAt: Date,
  updatedAt: Date
}
```

### Colección: `pedidos`
```javascript
{
  _id: ObjectId,
  mesa_id: ObjectId (referencia a Mesa),
  numero_personas: 4,
  estado: "edicion" | "confirmado" | "en_preparacion" | "listo" | "entregado" | "cancelado",
  items: [
    {
      _id: ObjectId,
      plato_id: 1,
      cantidad: 2,
      personalizaciones: "Sin jengibre",
      comentarios: "Muy caliente",
      createdAt: Date
    }
  ],
  fecha_confirmacion: Date,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 📡 API REST Endpoints

### Mesas
- `GET /api/mesas/qr/{qrCode}` - Obtener mesa por código QR
- `GET /api/mesas/{mesaId}/pedido-activo` - Obtener pedido en edición
- `POST /api/mesas/{mesaId}/pedido` - Crear nuevo pedido

### Pedidos
- `GET /api/pedidos/{pedidoId}` - Obtener pedido por ID
- `POST /api/pedidos/{pedidoId}/items` - Añadir item al pedido
- `PUT /api/pedidos/{pedidoId}/items/{itemId}` - Actualizar cantidad
- `DELETE /api/pedidos/{pedidoId}/items/{itemId}` - Eliminar item
- `POST /api/pedidos/{pedidoId}/confirmar` - Confirmar pedido

### Impresora
- `POST /api/print` - Enviar pedido a imprimir
  - Body: `{ order: { restaurantName, mesaNumber, pedidoId, numero_personas, items } }`
  - Respuesta: `{ ok: true }`

---

## 🎨 Frontend - Flujo de Pantallas

1. **WelcomeScreen**
   - Escanea QR (obtiene mesa)
   - Selecciona tipo de menú
   - Ingresa número de personas
   - Crea pedido → MenuScreen

2. **MenuScreen**
   - Muestra menú filtrado por tipo de buffet
   - Categorías (ensaladas, rollos, ramen, etc.)
   - Click en plato → DishModal
   - Carrito visible en esquina
   - Click en carrito → Cart panel

3. **DishModal**
   - Imagen del plato
   - Descripción
   - Selector de cantidad
   - Personalizaciones (checkboxes)
   - Campo de comentarios
   - Botón "Añadir al carrito"

4. **Cart**
   - Listado de items
   - Botones +/- para cantidad
   - Botón X para eliminar
   - Botón "Confirmar Pedido" → OrderSummary

5. **OrderSummary**
   - Ticket de confirmación
   - Botón "Imprimir" (browser print)
   - Botón "Nuevo Pedido" (vuelve a Welcome)

---

## 🖨️ Impresión Térmica

### Protocolo ESC/POS
- Estándar para impresoras térmicas
- Comandos binarios + texto
- Compatible con impresoras de 80mm y 58mm

### Comandos usados
- `ESC @ ` - Inicializar impresora
- `ESC a ` - Alineación (0=izq, 1=centro, 2=der)
- `ESC E ` - Negrita (on/off)
- `GS V ` - Corte de papel

### Flujo
1. Backend recibe POST `/api/print`
2. Construye buffer ESC/POS con datos del pedido
3. Conecta TCP a `IMPRESORA_HOST:IMPRESORA_PORT`
4. Envía buffer binario
5. Impresora imprime automáticamente
6. Cierra conexión

---

## ⚙️ Configuración

### Variables de Entorno (`server/.env`)
```
MONGODB_URI=mongodb://localhost:27017/osaka_restaurant
PORT=3000
IMPRESORA_HOST=127.0.0.1          # IP de la impresora térmica
IMPRESORA_PORT=9100               # Puerto por defecto ESC/POS
```

### Frontend (variables en `vite.config.js`)
```javascript
VITE_API_URL=http://localhost:3000/api
VITE_SOCKET_URL=http://localhost:3000
```

---

## 🚀 Cómo Ejecutar

### 1. Backend
```bash
cd server
npm install
node server.js
```
- Puerto: 3000
- MongoDB: localhost:27017

### 2. Frontend
```bash
npm install --legacy-peer-deps
npm run dev
```
- Puerto: 5173 (o custom)

### 3. Impresora (simulador para testing)
```bash
cd server
node print-sim.js
```
- Puerto: 9100
- Muestra los datos recibidos en terminal

---

## 🔐 Seguridad y Mejoras Futuras

### Actual
- ✅ QR code para identificar mesas
- ✅ Sincronización en tiempo real (WebSocket)
- ✅ Validaciones básicas en servidor

### Pendiente (opcionales)
- [ ] Autenticación de staff (login)
- [ ] Administración de mesas (crear/editar)
- [ ] Historial de pedidos
- [ ] Reportes de ventas
- [ ] Control de precios por menú
- [ ] Gestión de estado de cocina
- [ ] Push notifications cuando pedir está listo

---

## 📊 Resumen Técnico

| Componente | Tecnología | Puerto |
|-----------|-----------|--------|
| Frontend | React 18 + Vite | 8080 |
| Backend | Node.js + Express | 3000 |
| Base de Datos | MongoDB | 27017 |
| Impresora | TCP ESC/POS | 9100 |
| Comunicación | REST + WebSocket (Socket.io) | 3000/ws |

---

## 📞 Preguntas Frecuentes

**P: ¿Qué pasa si se desconecta la impresora?**  
R: El endpoint responde con error 500, pero no bloquea el pedido. El frontend atrapa el error y permite que el pedido continúe.

**P: ¿Cómo se sincroniza entre múltiples mesas?**  
R: WebSocket emite eventos `cart-update` a todas las mesas conectadas cuando hay cambios.

**P: ¿Se puede usar otra impresora?**  
R: Sí, solo cambiar `IMPRESORA_HOST` y `IMPRESORA_PORT` en `.env`.

**P: ¿Cómo se garantiza que no se pierdan pedidos?**  
R: Se guardan en MongoDB antes de confirmar, y el backend valida todos los datos.

