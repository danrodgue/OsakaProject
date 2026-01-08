# 🍱 Restaurante Japonés - Sistema de Gestión de Pedidos

Aplicación web completa para gestionar pedidos de un restaurante buffet libre de comida japonesa. Sistema de carta digital interactiva con diseño moderno tipo japonés.

## ✨ Características

### Tipos de Menú
- **Buffet de Día** (Lunes a Viernes) - Bebida obligatoria
- **Buffet de Noche** - Bebida obligatoria
- **Buffet de Fin de Semana, Festivos y Vísperas** - Bebida obligatoria
- **Menú del Día** (Lunes a Viernes) - Bebida opcional

### Funcionalidades Principales

1. **Carta Digital Interactiva**
   - Visualización de todos los platos con fotos, nombres y descripciones
   - Organización por categorías (Entrantes, Sushi, Makis, Hot Rolls, Yakitori, Tempura, Ramen, Postres)
   - Navegación fluida entre categorías
   - Diseño responsive para tablets

2. **Sistema de Pedidos**
   - Selección de tipo de buffet/menú y número de mesa
   - Selección obligatoria de bebida para buffets
   - Modal de personalización de platos con:
     - Selección de cantidad
     - Opciones de personalización (sin cebolla, sin picante, extra salsa, etc.)
     - Campo de comentarios especiales
   - Carrito flotante siempre visible con contador en tiempo real

3. **Ticket de Pedido**
   - Resumen completo del pedido
   - Información de mesa, tipo de menú y bebida
   - Lista detallada de platos con personalizaciones y comentarios
   - Fecha y hora del pedido
   - Función de impresión

4. **Diseño**
   - Estética japonesa moderna (colores rojos, negros, dorados)
   - Interfaz intuitiva y atractiva
   - Animaciones suaves
   - Totalmente responsive

## 🚀 Instalación y Uso

### Requisitos
- Node.js 16+ y npm

### Pasos de Instalación

1. Instalar dependencias:
```bash
npm install
```

2. Iniciar servidor de desarrollo:
```bash
npm run dev
```

3. Abrir en el navegador:
```
http://localhost:5173
```

### Build para Producción

```bash
npm run build
```

Los archivos optimizados se generarán en la carpeta `dist/`.

## 📁 Estructura del Proyecto

```
├── src/
│   ├── components/
│   │   ├── WelcomeScreen.jsx      # Pantalla inicial de selección
│   │   ├── DrinkSelection.jsx     # Selección de bebida
│   │   ├── MenuScreen.jsx         # Carta digital principal
│   │   ├── DishCard.jsx           # Tarjeta de plato
│   │   ├── DishModal.jsx          # Modal de personalización
│   │   ├── Cart.jsx               # Carrito flotante
│   │   └── OrderSummary.jsx       # Resumen y ticket
│   ├── data/
│   │   └── menuData.js            # Datos de platos y menús
│   ├── App.jsx                    # Componente principal
│   ├── main.jsx                   # Punto de entrada
│   └── index.css                  # Estilos globales
├── index.html
├── package.json
└── vite.config.js
```

## 🎨 Personalización

### Añadir/Editar Platos

Edita el archivo `src/data/menuData.js` para modificar los platos:

```javascript
{
  id: 1,
  number: 'E01',
  name: 'Nombre del Plato',
  category: 'entrantes',
  description: 'Descripción del plato',
  image: 'URL_de_la_imagen',
  customizations: ['Opción 1', 'Opción 2', 'Opción 3']
}
```

### Modificar Bebidas

Edita el array `drinks` en `src/data/menuData.js`:

```javascript
{ id: 1, name: 'Nombre de la Bebida', price: 0 }
```

### Cambiar Colores

Modifica las variables CSS en `src/index.css`:

```css
:root {
  --color-primary: #dc143c;      /* Rojo principal */
  --color-secondary: #1a1a1a;    /* Negro */
  --color-accent: #ffd700;        /* Dorado */
}
```

## 📱 Compatibilidad

- ✅ Tablets (iPad, Android tablets)
- ✅ Móviles
- ✅ Escritorio
- ✅ Navegadores modernos (Chrome, Firefox, Safari, Edge)

## 🛠️ Tecnologías Utilizadas

- **React 18** - Biblioteca de UI
- **Vite** - Build tool y dev server
- **React Icons** - Iconos
- **CSS3** - Estilos y animaciones

## 📝 Notas

- Las imágenes de los platos utilizan URLs de Unsplash como ejemplo. Reemplázalas con las imágenes reales de tu restaurante.
- El sistema está listo para integrarse con un backend si es necesario.
- Los datos están en formato JSON y pueden migrarse fácilmente a una base de datos.

## 📄 Licencia

Este proyecto está creado para uso del restaurante.

---

**Desarrollado con ❤️ para restaurantes japoneses**

