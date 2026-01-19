# ⚠️ SI LAS TERMINALES NO RESPONDEN, SIGUE ESTOS PASOS MANUALES:

## 1. Abre una NUEVA terminal PowerShell (presiona Windows + X, luego "PowerShell" o "Terminal")

## 2. Ejecuta esto línea por línea:

```powershell
cd c:\Users\34652\Desktop\clonOsaka\OsakaProject
npm install --legacy-peer-deps
npm run dev
```

## 3. Espera a que veas:
```
VITE v5.0.0 running at:
  ➜  Local:   http://localhost:5173/
  ➜  press h + enter to show help
```

## 4. Abre tu navegador en:
- http://localhost:5173

---

## VERIFICACIÓN RÁPIDA:

En tu navegador, si ves:
- ✅ Página de bienvenida con opciones de menú
- ✅ Campo para número de mesa
- ✅ Selector de tipo de menú (Buffet día, Noche, etc.)

==> **¡LA APP FUNCIONA!**

---

## Si aún no funciona:

1. Verifica que MongoDB esté corriendo:
   ```
   netstat -ano | findstr :27017
   ```
   (Deberías ver algo escuchando en ese puerto)

2. Verifica que el backend está corriendo:
   ```
   netstat -ano | findstr :3000
   ```
   (Deberías ver algo escuchando en puerto 3000)

3. Si el backend no está corriendo, en otra terminal:
   ```
   cd c:\Users\34652\Desktop\clonOsaka\OsakaProject\server
   node server.js
   ```

---

## PRUEBA DE IMPRESIÓN:

Si quieres probar que la impresión funciona:

1. En otra terminal, arranca el simulador:
   ```
   cd c:\Users\34652\Desktop\clonOsaka\OsakaProject\server
   node print-sim.js
   ```

2. Cuando completes un pedido en la app, verás los datos del ticket en esa terminal.
