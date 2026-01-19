# 🚀 Cómo ejecutar Osaka Restaurant

## Backend ✅ (Ya está corriendo en http://localhost:3000)

El servidor está en ejecución en tu terminal. MongoDB está conectado y las mesas se inicializaron correctamente.

## Frontend (Este sí necesitas ejecutar en otra terminal)

Abre **otra terminal PowerShell** y ejecuta:

```powershell
cd c:\Users\34652\Desktop\clonOsaka\OsakaProject
npm install
npm run dev
```

Esto arrancará el frontend en http://localhost:5173 (o similar).

## URLs importantes

- **Backend API**: http://localhost:3000/api
- **Frontend**: http://localhost:5173 (o el puerto que muestre npm)
- **WebSocket**: ws://localhost:3000

## Prueba la app

1. Abre http://localhost:5173 en tu navegador
2. Escanea un QR (o ve a la URL con `?mesa=QR1`, `?mesa=QR2`, etc.)
3. Selecciona número de personas y tipo de menú
4. Agrega platos al carrito
5. Confirma pedido
6. El ticket se enviará a la impresora térmica en 127.0.0.1:9100

## Prueba impresión

Si aún tienes el simulador de impresora corriendo (terminal con `print-sim.js`), verás los datos del ticket en esa terminal.

---

**¿Necesitas ayuda con algo más?**
