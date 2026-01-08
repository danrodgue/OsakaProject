# 🚀 Inicio Rápido

## Instalación en 3 pasos

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Iniciar el servidor:**
   ```bash
   npm run dev
   ```

3. **Abrir en el navegador:**
   ```
   http://localhost:5173
   ```

## ✅ ¡Listo!

La aplicación estará funcionando y podrás:
- Seleccionar tipo de buffet/menú
- Elegir número de mesa
- Seleccionar bebida (obligatoria para buffets)
- Ver la carta digital completa
- Añadir platos al pedido
- Personalizar cada plato
- Ver el carrito en tiempo real
- Confirmar y generar el ticket

## 📝 Personalizar los Platos

Para añadir o modificar platos, edita el archivo:
```
src/data/menuData.js
```

Cada plato tiene esta estructura:
```javascript
{
  id: 1,
  number: 'E01',                    // Número identificador
  name: 'Gyozas de Cerdo',          // Nombre del plato
  category: 'entrantes',            // Categoría
  description: 'Descripción...',    // Descripción breve
  image: 'URL_de_imagen',           // URL de la foto
  customizations: ['Opción 1', 'Opción 2']  // Opciones de personalización
}
```

## 🎨 Cambiar Colores

Edita las variables en `src/index.css`:
```css
--color-primary: #dc143c;      /* Rojo */
--color-secondary: #1a1a1a;    /* Negro */
--color-accent: #ffd700;       /* Dorado */
```

## 📱 Probar en Tablet/Móvil

1. Inicia el servidor con `npm run dev`
2. En tu dispositivo, conecta a la misma red WiFi
3. Abre la IP que muestra Vite (ej: http://192.168.1.100:5173)

---

**¡Disfruta de tu sistema de pedidos!** 🍱

