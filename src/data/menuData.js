// Platos del restaurante Osaka organizados por categorías y tipo de buffet
// buffetType puede ser: ['buffetDia'], ['buffetNoche'], ['buffetNoche', 'buffetFinSemana'], ['buffetNoche', 'complementarios']
export const menuItems = [
  // ========== BUFFET DE DÍA ==========
  // ENSALADAS
  { id: 1, number: '1', name: 'Ensalada de pepino', category: 'ensaladas', buffetType: ['buffetDia'], description: 'Ensalada fresca de pepino', image: 'https://recetasdecocina.elmundo.es/wp-content/uploads/2025/03/sunomono-1024x683.jpg', customizations: [] },
  { id: 2, number: '33T', name: 'Ensalada de tofu', category: 'ensaladas', buffetType: ['buffetDia'], description: 'Ensalada con tofu fresco', image: 'https://i.imgur.com/CAILSQa.jpg', customizations: [] },
  { id: 3, number: '33', name: 'Ensalada de algas', category: 'ensaladas', buffetType: ['buffetDia'], description: 'Ensalada de algas marinas', image: 'https://i.imgur.com/fzDPv5V.jpg', customizations: [] },
  { id: 4, number: '33A', name: 'Ensalada de wakame', category: 'ensaladas', buffetType: ['buffetDia'], description: 'Ensalada de algas wakame', image: 'https://harineraelmolino.com/wp-content/uploads/2025/02/delicious-wakame-seaweed-salad-on-a-plate-and-sesame-seeds-in-a-bowl-on-the-table.jpg', customizations: [] },
  
  // SOPAS
  { id: 5, number: '2', name: 'Sopa miso', category: 'sopas', buffetType: ['buffetDia'], description: 'Sopa tradicional de miso', image: 'https://i.imgur.com/GlmYWG4.jpg', customizations: [] },
  { id: 6, number: '7M', name: 'Sopa de marisco', category: 'sopas', buffetType: ['buffetDia'], description: 'Sopa de marisco', image: 'https://i.imgur.com/dOhWCzY.jpg', customizations: [] },
  { id: 7, number: '7T', name: 'Miso ramen de ternera', category: 'sopas', buffetType: ['buffetDia'], description: 'Ramen de ternera con miso', image: 'https://i.imgur.com/Av7ob0x.jpg', customizations: [] },
  
  // ARROCES Y FIDEOS
  { id: 8, number: '6', name: 'Arroz frito con ternera', category: 'arroces-fideos', buffetType: ['buffetDia'], description: 'Arroz frito con ternera', image: 'https://i.imgur.com/GoZJOSd.jpg', customizations: [] },
  { id: 9, number: '6P', name: 'Arroz frito con pollo', category: 'arroces-fideos', buffetType: ['buffetDia'], description: 'Arroz frito con pollo', image: 'https://i.imgur.com/ugWhGtT.jpg', customizations: [] },
  { id: 10, number: '6G', name: 'Arroz frito con gambas', category: 'arroces-fideos', buffetType: ['buffetDia'], description: 'Arroz frito con gambas', image: 'https://i.imgur.com/eki0U6U.jpg', customizations: [] },
  { id: 11, number: '7A', name: 'Udon frito con verduras', category: 'arroces-fideos', buffetType: ['buffetDia'], description: 'Fideos udon fritos con verduras', image: 'https://i.imgur.com/DS4f07I.jpg', customizations: [] },
  { id: 12, number: '7B', name: 'Fideos de arroz con pollo', category: 'arroces-fideos', buffetType: ['buffetDia'], description: 'Fideos de arroz con pollo', image: 'https://i.imgur.com/ZJcOw1z.jpg', customizations: [] },
  { id: 143, number: '7', name: 'Yakisoba de gambas', category: 'arroces-fideos', buffetType: ['buffetDia'], description: 'Yakisoba de gambas', image: 'https://i.imgur.com/uUE1AW3.jpg', customizations: [] },
  
  // EDAMAME
  { id: 13, number: '70', name: 'Edamame', category: 'entrantes', buffetType: ['buffetDia'], description: 'Vainas de soja tiernas', image: 'https://i.imgur.com/XCvn0iv.jpg', customizations: [] },
  { id: 14, number: '71', name: 'Edamame chili', category: 'entrantes', buffetType: ['buffetDia'], description: 'Edamame con chili', image: 'https://i.imgur.com/BVILJpk.jpg', customizations: [] },
  
  // PANES Y ROLLITOS
  { id: 15, number: '4A', name: 'Pan dulce', category: 'panes', buffetType: ['buffetDia'], description: 'Pan dulce japonés', image: 'https://i.imgur.com/n028sxX.jpg', customizations: [] },
  { id: 16, number: '4B', name: 'Pan Baozi', category: 'panes', buffetType: ['buffetDia'], description: 'Pan baozi al vapor', image: 'https://i.imgur.com/vTxQiAA.jpg', customizations: [] },
  { id: 17, number: '4V', name: 'Pan de verduras', category: 'panes', buffetType: ['buffetDia'], description: 'Pan relleno de verduras', image: 'https://i.imgur.com/xErdtjj.jpg', customizations: [] },
  { id: 18, number: '4G', name: 'Pan de langostino', category: 'panes', buffetType: ['buffetDia'], description: 'Pan relleno de langostino', image: 'https://i.imgur.com/ZjVzcFu.jpg', customizations: [] },
  { id: 19, number: '4C', name: 'Pan de Pollo', category: 'panes', buffetType: ['buffetDia'], description: 'Pan relleno de pollo', image: 'https://i.imgur.com/ebdPqod.jpg', customizations: [] },
  { id: 20, number: '4', name: 'Pan de la casa', category: 'panes', buffetType: ['buffetDia'], description: 'Pan especial de la casa', image: 'https://i.imgur.com/sko99Ye.jpg', customizations: [] },
  { id: 21, number: '5V', name: 'Rollitos de verduras', category: 'rollitos', buffetType: ['buffetDia'], description: 'Rollitos de verduras', image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500&h=500&fit=crop&q=90', customizations: [] },
  { id: 22, number: '5', name: 'Mini rollo', category: 'rollitos', buffetType: ['buffetDia'], description: 'Mini rollitos', image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500&h=500&fit=crop&q=90', customizations: [] },
  
  // EMPANADILLAS
  { id: 23, number: '3', name: 'Empanadilla de cerdo', category: 'empanadillas', buffetType: ['buffetDia'], description: 'Empanadillas de cerdo', image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500&h=500&fit=crop&q=90', customizations: [] },
  { id: 24, number: '48', name: 'Empanadilla a la plancha', category: 'empanadillas', buffetType: ['buffetDia'], description: 'Empanadillas a la plancha', image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500&h=500&fit=crop&q=90', customizations: [] },
  { id: 25, number: '48B', name: 'Empanadilla de verduras', category: 'empanadillas', buffetType: ['buffetDia'], description: 'Empanadillas de verduras', image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500&h=500&fit=crop&q=90', customizations: [] },
  { id: 26, number: '48C', name: 'Gyoza de pollo con curry', category: 'empanadillas', buffetType: ['buffetDia'], description: 'Gyoza de pollo con curry', image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500&h=500&fit=crop&q=90', customizations: [] },
  
  // TAKOYAKI
  { id: 27, number: '5T', name: 'Takoyaki', category: 'entrantes', buffetType: ['buffetDia'], description: 'Bolitas de pulpo', image: 'https://i.imgur.com/sOsIna6.jpg', customizations: [] },
  
  // PLATOS PRINCIPALES - POLLO
  { id: 28, number: '8', name: 'Chipirones', category: 'principales', buffetType: ['buffetDia'], description: 'Chipirones fritos', image: 'https://images.unsplash.com/photo-1598515214211-89d3c73c83b8?w=500&h=500&fit=crop&q=90', customizations: [] },
  { id: 29, number: '9', name: 'Pollo frito con sésamo', category: 'principales', buffetType: ['buffetDia'], description: 'Pollo frito con sésamo', image: 'https://images.unsplash.com/photo-1598515214211-89d3c73c83b8?w=500&h=500&fit=crop&q=90', customizations: [] },
  { id: 30, number: '10', name: 'Pollo con salsa Teriyaki', category: 'principales', buffetType: ['buffetDia'], description: 'Pollo con salsa teriyaki', image: 'https://images.unsplash.com/photo-1598515214211-89d3c73c83b8?w=500&h=500&fit=crop&q=90', customizations: [] },
  { id: 31, number: '10a', name: 'Pollo al limón', category: 'principales', buffetType: ['buffetDia'], description: 'Pollo al limón', image: 'https://images.unsplash.com/photo-1598515214211-89d3c73c83b8?w=500&h=500&fit=crop&q=90', customizations: [] },
  { id: 32, number: '11', name: 'Pollo con salsa japonesa', category: 'principales', buffetType: ['buffetDia'], description: 'Pollo con salsa japonesa', image: 'https://images.unsplash.com/photo-1598515214211-89d3c73c83b8?w=500&h=500&fit=crop&q=90', customizations: [] },
  { id: 33, number: '14', name: 'Pinchitos de pollo', category: 'principales', buffetType: ['buffetDia'], description: 'Brochetas de pollo', image: 'https://images.unsplash.com/photo-1598515214211-89d3c73c83b8?w=500&h=500&fit=crop&q=90', customizations: [] },
  { id: 34, number: '12', name: 'Alita de pollo', category: 'principales', buffetType: ['buffetDia'], description: 'Alitas de pollo', image: 'https://images.unsplash.com/photo-1598515214211-89d3c73c83b8?w=500&h=500&fit=crop&q=90', customizations: [] },
  { id: 35, number: '49', name: 'Nuggets de pollo', category: 'principales', buffetType: ['buffetDia'], description: 'Nuggets de pollo', image: 'https://images.unsplash.com/photo-1598515214211-89d3c73c83b8?w=500&h=500&fit=crop&q=90', customizations: [] },
  { id: 36, number: '41A', name: 'Pollo salteado con salsa jianbao sauce', category: 'principales', buffetType: ['buffetDia'], description: 'Pollo salteado con salsa jianbao', image: 'https://images.unsplash.com/photo-1598515214211-89d3c73c83b8?w=500&h=500&fit=crop&q=90', customizations: [] },
  
  // PLATOS PRINCIPALES - PESCADO Y MARISCO
  { id: 37, number: '16', name: 'Merluza con salsa teriyaki', category: 'principales', buffetType: ['buffetDia'], description: 'Merluza con salsa teriyaki', image: 'https://images.unsplash.com/photo-1598515214211-89d3c73c83b8?w=500&h=500&fit=crop&q=90', customizations: [] },
  { id: 38, number: '22', name: 'Langostino con sal y pimienta', category: 'principales', buffetType: ['buffetDia'], description: 'Langostinos con sal y pimienta', image: 'https://images.unsplash.com/photo-1598515214211-89d3c73c83b8?w=500&h=500&fit=crop&q=90', customizations: [] },
  { id: 39, number: '40', name: 'Pata de sepia con salsa agridulce', category: 'principales', buffetType: ['buffetDia'], description: 'Pata de sepia con salsa agridulce', image: 'https://images.unsplash.com/photo-1598515214211-89d3c73c83b8?w=500&h=500&fit=crop&q=90', customizations: [] },
  { id: 40, number: '40S', name: 'Pata de langostino con sal y pimienta', category: 'principales', buffetType: ['buffetDia'], description: 'Pata de langostino con sal y pimienta', image: 'https://images.unsplash.com/photo-1598515214211-89d3c73c83b8?w=500&h=500&fit=crop&q=90', customizations: [] },
  { id: 41, number: '51A', name: 'Gamba con salsa de Ostra', category: 'principales', buffetType: ['buffetDia'], description: 'Gambas con salsa de ostra', image: 'https://images.unsplash.com/photo-1598515214211-89d3c73c83b8?w=500&h=500&fit=crop&q=90', customizations: [] },
  
  // PLATOS PRINCIPALES - TERNERA Y PATO
  { id: 42, number: '19', name: 'Ternera con salsa teriyaki', category: 'principales', buffetType: ['buffetDia'], description: 'Ternera con salsa teriyaki', image: 'https://images.unsplash.com/photo-1598515214211-89d3c73c83b8?w=500&h=500&fit=crop&q=90', customizations: [] },
  { id: 43, number: '21', name: 'Pato con salsa Japonesa', category: 'principales', buffetType: ['buffetDia'], description: 'Pato con salsa japonesa', image: 'https://images.unsplash.com/photo-1598515214211-89d3c73c83b8?w=500&h=500&fit=crop&q=90', customizations: [] },
  { id: 44, number: '50', name: 'Costilla con salsa agridulce', category: 'principales', buffetType: ['buffetDia'], description: 'Costillas con salsa agridulce', image: 'https://images.unsplash.com/photo-1598515214211-89d3c73c83b8?w=500&h=500&fit=crop&q=90', customizations: [] },
  { id: 45, number: '50A', name: 'Costilla con sal y pimienta', category: 'principales', buffetType: ['buffetDia'], description: 'Costillas con sal y pimienta', image: 'https://images.unsplash.com/photo-1598515214211-89d3c73c83b8?w=500&h=500&fit=crop&q=90', customizations: [] },
  { id: 46, number: '44', name: 'Rollito de ternera con verduras', category: 'principales', buffetType: ['buffetDia'], description: 'Rollitos de ternera con verduras', image: 'https://images.unsplash.com/photo-1598515214211-89d3c73c83b8?w=500&h=500&fit=crop&q=90', customizations: [] },
  
  // TEMPURA
  { id: 47, number: '20', name: 'Tempura nomoriawase', category: 'tempura', buffetType: ['buffetDia'], description: 'Tempura variada', image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500&h=500&fit=crop&q=90', customizations: [] },
  
  // SUSHI - NIGIRI
  { id: 48, number: '29', name: 'Nigiri variado', category: 'sushi', buffetType: ['buffetDia'], description: 'Selección de nigiri variados', image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500&h=500&fit=crop&q=90', customizations: [] },
  { id: 49, number: '29a', name: 'Nigiri solo salmón', category: 'sushi', buffetType: ['buffetDia'], description: 'Nigiri de salmón', image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500&h=500&fit=crop&q=90', customizations: [] },
  { id: 50, number: '29f', name: 'Nigiri flameado', category: 'sushi', buffetType: ['buffetDia'], description: 'Nigiri flameado', image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500&h=500&fit=crop&q=90', customizations: [] },
  { id: 51, number: '41', name: 'Oshi sushi', category: 'sushi', buffetType: ['buffetDia'], description: 'Sushi prensado', image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500&h=500&fit=crop&q=90', customizations: [] },
  
  // SUSHI - SASHIMI
  { id: 52, number: '30', name: 'Sashimi variado (límite 1 plato/persona)', category: 'sushi', buffetType: ['buffetDia'], description: 'Sashimi variado', image: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=500&h=500&fit=crop&q=90', customizations: [] },
  
  // SUSHI - GUNKAN
  { id: 53, number: '81', name: 'Gunkan wakame', category: 'sushi', buffetType: ['buffetDia'], description: 'Gunkan con wakame', image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500&h=500&fit=crop&q=90', customizations: [] },
  
  // SUSHI - INARI
  { id: 54, number: '27', name: 'Inari sushi', category: 'sushi', buffetType: ['buffetDia'], description: 'Sushi inari', image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500&h=500&fit=crop&q=90', customizations: [] },
  
  // HOSOMAKI
  { id: 55, number: '24', name: 'Hosomaki de atún y salmón', category: 'makis', buffetType: ['buffetDia'], description: 'Hosomaki de atún y salmón', image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500&h=500&fit=crop&q=90', customizations: [] },
  { id: 56, number: '28', name: 'Hosomaki de plátano', category: 'makis', buffetType: ['buffetDia'], description: 'Hosomaki de plátano', image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500&h=500&fit=crop&q=90', customizations: [] },
  { id: 57, number: '32A', name: 'Hosomaki de aguacate y salmón', category: 'makis', buffetType: ['buffetDia'], description: 'Hosomaki de aguacate y salmón', image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500&h=500&fit=crop&q=90', customizations: [] },
  { id: 58, number: '32b', name: 'Hosomaki de aguacate pepino', category: 'makis', buffetType: ['buffetDia'], description: 'Hosomaki de aguacate y pepino', image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500&h=500&fit=crop&q=90', customizations: [] },
  { id: 59, number: '32s', name: 'Hosomaki de aguacate y palito de mar con cebolla crujiente', category: 'makis', buffetType: ['buffetDia'], description: 'Hosomaki de aguacate y palito de mar', image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500&h=500&fit=crop&q=90', customizations: [] },
  { id: 60, number: '32', name: 'Hosomaki de aguacate y palito de mar', category: 'makis', buffetType: ['buffetDia'], description: 'Hosomaki de aguacate y palito de mar', image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500&h=500&fit=crop&q=90', customizations: [] },
  { id: 61, number: '32Q', name: 'Hosomaki California', category: 'makis', buffetType: ['buffetDia'], description: 'Hosomaki California', image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500&h=500&fit=crop&q=90', customizations: [] },
  { id: 62, number: '32V', name: 'Hosomaki de Verdura con queso', category: 'makis', buffetType: ['buffetDia'], description: 'Hosomaki de verdura con queso', image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500&h=500&fit=crop&q=90', customizations: [] },
  
  // URAMAKI
  { id: 63, number: '25', name: 'Uramaki de salmon con queso crema', category: 'makis', buffetType: ['buffetDia'], description: 'Uramaki de salmón con queso crema', image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500&h=500&fit=crop&q=90', customizations: [] },
  { id: 64, number: '25C', name: 'California de salmon y aguacate', category: 'makis', buffetType: ['buffetDia'], description: 'California de salmón y aguacate', image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500&h=500&fit=crop&q=90', customizations: [] },
  { id: 65, number: '25Q', name: 'California con queso', category: 'makis', buffetType: ['buffetDia'], description: 'California con queso', image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500&h=500&fit=crop&q=90', customizations: [] },
  { id: 66, number: '26', name: 'Uramaki de Verduras', category: 'makis', buffetType: ['buffetDia'], description: 'Uramaki de verduras', image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500&h=500&fit=crop&q=90', customizations: [] },
  { id: 67, number: '26b', name: 'Uramaki de aguacate con queso', category: 'makis', buffetType: ['buffetDia'], description: 'Uramaki de aguacate con queso', image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500&h=500&fit=crop&q=90', customizations: [] },
  { id: 68, number: '95', name: 'Uramaki de aguacate con mango', category: 'makis', buffetType: ['buffetDia'], description: 'Uramaki de aguacate con mango', image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500&h=500&fit=crop&q=90', customizations: [] },
  { id: 69, number: '90', name: 'Uramaki de aguacate y pollo con queso', category: 'makis', buffetType: ['buffetDia'], description: 'Uramaki de aguacate y pollo con queso', image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500&h=500&fit=crop&q=90', customizations: [] },
  { id: 70, number: '46', name: 'Uramaki de pollo', category: 'makis', buffetType: ['buffetDia'], description: 'Uramaki de pollo', image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500&h=500&fit=crop&q=90', customizations: [] },
  { id: 71, number: '46c', name: 'Uramaki de pollo con wakame', category: 'makis', buffetType: ['buffetDia'], description: 'Uramaki de pollo con wakame', image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500&h=500&fit=crop&q=90', customizations: [] },
  { id: 72, number: '46q', name: 'Uramaki de pollo con queso', category: 'makis', buffetType: ['buffetDia'], description: 'Uramaki de pollo con queso', image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500&h=500&fit=crop&q=90', customizations: [] },
  { id: 73, number: '47', name: 'Uramaki de langostino', category: 'makis', buffetType: ['buffetDia'], description: 'Uramaki de langostino', image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500&h=500&fit=crop&q=90', customizations: [] },
  { id: 74, number: '47c', name: 'California con miga tempura', category: 'makis', buffetType: ['buffetDia'], description: 'California con miga tempura', image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500&h=500&fit=crop&q=90', customizations: [] },
  { id: 75, number: '47q', name: 'Uramaki de langostino con queso', category: 'makis', buffetType: ['buffetDia'], description: 'Uramaki de langostino con queso', image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500&h=500&fit=crop&q=90', customizations: [] },
  { id: 76, number: '60', name: 'Uramaki furikake', category: 'makis', buffetType: ['buffetDia'], description: 'Uramaki con furikake', image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500&h=500&fit=crop&q=90', customizations: [] },
  { id: 77, number: '63', name: 'California con queso flameado', category: 'makis', buffetType: ['buffetDia'], description: 'California con queso flameado', image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500&h=500&fit=crop&q=90', customizations: [] },
  { id: 78, number: '95A', name: 'Uramaki de arándano', category: 'makis', buffetType: ['buffetDia'], description: 'Uramaki de arándano', image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500&h=500&fit=crop&q=90', customizations: [] },
  { id: 79, number: '500', name: 'Combinado de sushi uramaki sashimi', category: 'makis', buffetType: ['buffetDia'], description: 'Combinado de sushi', image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500&h=500&fit=crop&q=90', customizations: [] },
  
  // POKÉ
  { id: 80, number: '88g', name: 'Poké de gamba', category: 'poke', buffetType: ['buffetDia'], description: 'Poké de gamba', image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500&h=500&fit=crop&q=90', customizations: [] },
  { id: 81, number: '88s', name: 'Poké de Salmón', category: 'poke', buffetType: ['buffetDia'], description: 'Poké de salmón', image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500&h=500&fit=crop&q=90', customizations: [] },
  { id: 82, number: '88a', name: 'Poké de Atún', category: 'poke', buffetType: ['buffetDia'], description: 'Poké de atún', image: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=500&h=500&fit=crop&q=90', customizations: [] },
  { id: 83, number: '88p', name: 'Poké de pollo', category: 'poke', buffetType: ['buffetDia'], description: 'Poké de pollo', image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500&h=500&fit=crop&q=90', customizations: [] },
  
  // PLATOS A LA PLANCHA
  { id: 84, number: '17', name: 'Salmón a la plancha', category: 'plancha', buffetType: ['buffetDia'], description: 'Salmón a la plancha', image: 'https://images.unsplash.com/photo-1598515214211-89d3c73c83b8?w=500&h=500&fit=crop&q=90', customizations: [] },
  { id: 85, number: '18', name: 'Entrecot a la plancha', category: 'plancha', buffetType: ['buffetDia'], description: 'Entrecot a la plancha', image: 'https://images.unsplash.com/photo-1598515214211-89d3c73c83b8?w=500&h=500&fit=crop&q=90', customizations: [] },
  { id: 86, number: '34', name: 'Navajas a la plancha', category: 'plancha', buffetType: ['buffetDia'], description: 'Navajas a la plancha', image: 'https://images.unsplash.com/photo-1598515214211-89d3c73c83b8?w=500&h=500&fit=crop&q=90', customizations: [] },
  { id: 87, number: '34a', name: 'Almeja a la plancha', category: 'plancha', buffetType: ['buffetDia'], description: 'Almejas a la plancha', image: 'https://images.unsplash.com/photo-1598515214211-89d3c73c83b8?w=500&h=500&fit=crop&q=90', customizations: [] },
  { id: 88, number: '52', name: 'Verduras mixtas a la plancha', category: 'plancha', buffetType: ['buffetDia'], description: 'Verduras mixtas a la plancha', image: 'https://images.unsplash.com/photo-1598515214211-89d3c73c83b8?w=500&h=500&fit=crop&q=90', customizations: [] },
  { id: 89, number: '56', name: 'Pincho de shiitake', category: 'plancha', buffetType: ['buffetDia'], description: 'Pincho de setas shiitake', image: 'https://images.unsplash.com/photo-1598515214211-89d3c73c83b8?w=500&h=500&fit=crop&q=90', customizations: [] },
  
  // ========== BUFFET DE NOCHE Y FIN DE SEMANA ==========
  // PLATOS PRINCIPALES - MARISCO Y PESCADO
  { id: 90, number: '15', name: 'Anca de rana con sal y pimienta', category: 'principales', buffetType: ['buffetNoche', 'buffetFinSemana'], description: 'Ancas de rana con sal y pimienta', image: 'https://images.unsplash.com/photo-1598515214211-89d3c73c83b8?w=500&h=500&fit=crop&q=90', customizations: [] },
  { id: 91, number: '22a', name: 'Langostino con sésamo', category: 'principales', buffetType: ['buffetNoche', 'buffetFinSemana'], description: 'Langostinos con sésamo', image: 'https://images.unsplash.com/photo-1598515214211-89d3c73c83b8?w=500&h=500&fit=crop&q=90', customizations: [] },
  { id: 92, number: '39', name: 'Pecho de cangrejo sal y pimiento', category: 'principales', buffetType: ['buffetNoche', 'buffetFinSemana'], description: 'Pecho de cangrejo con sal y pimienta', image: 'https://images.unsplash.com/photo-1598515214211-89d3c73c83b8?w=500&h=500&fit=crop&q=90', customizations: [] },
  { id: 93, number: '51', name: 'Gamba salteada con salsa jianbao', category: 'principales', buffetType: ['buffetNoche', 'buffetFinSemana'], description: 'Gambas salteadas con salsa jianbao', image: 'https://images.unsplash.com/photo-1598515214211-89d3c73c83b8?w=500&h=500&fit=crop&q=90', customizations: [] },
  { id: 94, number: '23', name: 'Tempura langostino', category: 'tempura', buffetType: ['buffetNoche', 'buffetFinSemana'], description: 'Langostinos en tempura', image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500&h=500&fit=crop&q=90', customizations: [] },
  
  // PLATOS PRINCIPALES - PATO Y POLLO
  { id: 95, number: '43', name: 'Pato aromatizado crujiente', category: 'principales', buffetType: ['buffetNoche', 'buffetFinSemana'], description: 'Pato aromatizado crujiente', image: 'https://images.unsplash.com/photo-1598515214211-89d3c73c83b8?w=500&h=500&fit=crop&q=90', customizations: [] },
  { id: 96, number: '4p', name: 'Pan de pato', category: 'panes', buffetType: ['buffetNoche', 'buffetFinSemana'], description: 'Pan relleno de pato', image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500&h=500&fit=crop&q=90', customizations: [] },
  
  // SHAOMAI
  { id: 97, number: '54', name: 'Shaomai frito', category: 'entrantes', buffetType: ['buffetNoche', 'buffetFinSemana'], description: 'Shaomai frito', image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500&h=500&fit=crop&q=90', customizations: [] },
  { id: 98, number: '54a', name: 'Shaomai al vapor', category: 'entrantes', buffetType: ['buffetNoche', 'buffetFinSemana'], description: 'Shaomai al vapor', image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500&h=500&fit=crop&q=90', customizations: [] },
  
  // PINCHOS
  { id: 99, number: '45', name: 'Pincho de gamba', category: 'principales', buffetType: ['buffetNoche', 'buffetFinSemana'], description: 'Pincho de gamba', image: 'https://images.unsplash.com/photo-1598515214211-89d3c73c83b8?w=500&h=500&fit=crop&q=90', customizations: [] },
  { id: 100, number: '53', name: 'Pincho de ternera', category: 'principales', buffetType: ['buffetNoche', 'buffetFinSemana'], description: 'Pincho de ternera', image: 'https://images.unsplash.com/photo-1598515214211-89d3c73c83b8?w=500&h=500&fit=crop&q=90', customizations: [] },
  { id: 101, number: '55', name: 'Pincho de salmón', category: 'principales', buffetType: ['buffetNoche', 'buffetFinSemana'], description: 'Pincho de salmón', image: 'https://images.unsplash.com/photo-1598515214211-89d3c73c83b8?w=500&h=500&fit=crop&q=90', customizations: [] },
  
  // EMPANADILLAS
  { id: 102, number: '57', name: 'Empanadilla de gamba', category: 'empanadillas', buffetType: ['buffetNoche', 'buffetFinSemana'], description: 'Empanadillas de gamba', image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500&h=500&fit=crop&q=90', customizations: [] },
  
  // URAMAKI ESPECIALES
  { id: 103, number: '25a', name: 'Uramaki de salmón con huevas', category: 'makis', buffetType: ['buffetNoche', 'buffetFinSemana'], description: 'Uramaki de salmón con huevas', image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500&h=500&fit=crop&q=90', customizations: [] },
  { id: 104, number: '25b', name: 'Uramaki de langostino con salmón', category: 'makis', buffetType: ['buffetNoche', 'buffetFinSemana'], description: 'Uramaki de langostino con salmón', image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500&h=500&fit=crop&q=90', customizations: [] },
  { id: 105, number: '93', name: 'Uramaki de salmón queso con aguacate', category: 'makis', buffetType: ['buffetNoche', 'buffetFinSemana'], description: 'Uramaki de salmón queso con aguacate', image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500&h=500&fit=crop&q=90', customizations: [] },
  { id: 106, number: '94', name: 'Uramaki de aguacate queso con salmón', category: 'makis', buffetType: ['buffetNoche', 'buffetFinSemana'], description: 'Uramaki de aguacate queso con salmón', image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500&h=500&fit=crop&q=90', customizations: [] },
  { id: 107, number: '94m', name: 'Uramaki de Aguacate salmón con salsa mango', category: 'makis', buffetType: ['buffetNoche', 'buffetFinSemana'], description: 'Uramaki de aguacate salmón con salsa mango', image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500&h=500&fit=crop&q=90', customizations: [] },
  { id: 108, number: '38', name: 'Uramaki de pescado', category: 'makis', buffetType: ['buffetNoche', 'buffetFinSemana'], description: 'Uramaki de pescado', image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500&h=500&fit=crop&q=90', customizations: [] },
  { id: 109, number: '46a', name: 'Ura estilo osaka', category: 'makis', buffetType: ['buffetNoche', 'buffetFinSemana'], description: 'Uramaki estilo Osaka', image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500&h=500&fit=crop&q=90', customizations: [] },
  { id: 110, number: '47a', name: 'Uramaki de Atún picante', category: 'makis', buffetType: ['buffetNoche', 'buffetFinSemana'], description: 'Uramaki de atún picante', image: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=500&h=500&fit=crop&q=90', customizations: [] },
  { id: 111, number: '47b', name: 'Uramaki salmón con cebolla crujiente', category: 'makis', buffetType: ['buffetNoche', 'buffetFinSemana'], description: 'Uramaki salmón con cebolla crujiente', image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500&h=500&fit=crop&q=90', customizations: [] },
  { id: 112, number: '93g', name: 'Uramaki dragon', category: 'makis', buffetType: ['buffetNoche', 'buffetFinSemana'], description: 'Uramaki dragon', image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500&h=500&fit=crop&q=90', customizations: [] },
  { id: 113, number: '61', name: 'Uramaki de pepino con gamba', category: 'makis', buffetType: ['buffetNoche', 'buffetFinSemana'], description: 'Uramaki de pepino con gamba', image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500&h=500&fit=crop&q=90', customizations: [] },
  { id: 114, number: '62', name: 'Uramaki de yukari', category: 'makis', buffetType: ['buffetNoche', 'buffetFinSemana'], description: 'Uramaki de yukari', image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500&h=500&fit=crop&q=90', customizations: [] },
  
  // HOSOMAKI ESPECIALES
  { id: 115, number: '26a', name: 'Hosomaki tempura con aguacate y espárrago', category: 'makis', buffetType: ['buffetNoche', 'buffetFinSemana'], description: 'Hosomaki tempura con aguacate y espárrago', image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500&h=500&fit=crop&q=90', customizations: [] },
  { id: 116, number: '28a', name: 'Hosomaki tempura con plátano rebozado', category: 'makis', buffetType: ['buffetNoche', 'buffetFinSemana'], description: 'Hosomaki tempura con plátano rebozado', image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500&h=500&fit=crop&q=90', customizations: [] },
  { id: 117, number: '28q', name: 'Hosomaki de plátano con queso', category: 'makis', buffetType: ['buffetNoche', 'buffetFinSemana'], description: 'Hosomaki de plátano con queso', image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500&h=500&fit=crop&q=90', customizations: [] },
  { id: 118, number: '47s', name: 'Hosomaki de langostino', category: 'makis', buffetType: ['buffetNoche', 'buffetFinSemana'], description: 'Hosomaki de langostino', image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500&h=500&fit=crop&q=90', customizations: [] },
  { id: 119, number: '58', name: 'Hosomaki tempura de langostino y aguacate', category: 'makis', buffetType: ['buffetNoche', 'buffetFinSemana'], description: 'Hosomaki tempura de langostino y aguacate', image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500&h=500&fit=crop&q=90', customizations: [] },
  { id: 120, number: '29', name: 'Hosomaki tempura de Salmón y espárrago', category: 'makis', buffetType: ['buffetNoche', 'buffetFinSemana'], description: 'Hosomaki tempura de salmón y espárrago', image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500&h=500&fit=crop&q=90', customizations: [] },
  
  // TEMAKI
  { id: 121, number: '87g', name: 'Temaki de gamba', category: 'makis', buffetType: ['buffetNoche', 'buffetFinSemana'], description: 'Temaki de gamba', image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500&h=500&fit=crop&q=90', customizations: [] },
  { id: 122, number: '87a', name: 'Temaki de atún', category: 'makis', buffetType: ['buffetNoche', 'buffetFinSemana'], description: 'Temaki de atún', image: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=500&h=500&fit=crop&q=90', customizations: [] },
  { id: 123, number: '87s', name: 'Temaki de salmón', category: 'makis', buffetType: ['buffetNoche', 'buffetFinSemana'], description: 'Temaki de salmón', image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500&h=500&fit=crop&q=90', customizations: [] },
  { id: 124, number: '87p', name: 'Temaki de pollo', category: 'makis', buffetType: ['buffetNoche', 'buffetFinSemana'], description: 'Temaki de pollo', image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500&h=500&fit=crop&q=90', customizations: [] },
  { id: 125, number: '89', name: 'Temaki de anguila', category: 'makis', buffetType: ['buffetNoche', 'buffetFinSemana'], description: 'Temaki de anguila', image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=500&h=500&fit=crop&q=90', customizations: [] },
  
  // FUTOMAKI
  { id: 126, number: '31', name: 'Futomaki', category: 'makis', buffetType: ['buffetNoche', 'buffetFinSemana'], description: 'Futomaki', image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500&h=500&fit=crop&q=90', customizations: [] },
  { id: 127, number: '31a', name: 'Futo maki rebozado', category: 'makis', buffetType: ['buffetNoche', 'buffetFinSemana'], description: 'Futomaki rebozado', image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500&h=500&fit=crop&q=90', customizations: [] },
  
  // GUNKAN ESPECIALES
  { id: 128, number: '85', name: 'Gunkan salmón', category: 'sushi', buffetType: ['buffetNoche', 'buffetFinSemana'], description: 'Gunkan de salmón', image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500&h=500&fit=crop&q=90', customizations: [] },
  { id: 129, number: '86', name: 'Gunkan atún', category: 'sushi', buffetType: ['buffetNoche', 'buffetFinSemana'], description: 'Gunkan de atún', image: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=500&h=500&fit=crop&q=90', customizations: [] },
  { id: 130, number: '82', name: 'Masago sushi', category: 'sushi', buffetType: ['buffetNoche', 'buffetFinSemana'], description: 'Sushi con masago', image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500&h=500&fit=crop&q=90', customizations: [] },
  { id: 131, number: '64', name: 'Unagi sushi', category: 'sushi', buffetType: ['buffetNoche', 'buffetFinSemana'], description: 'Sushi de anguila', image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=500&h=500&fit=crop&q=90', customizations: [] },
  
  // NIGIRI ESPECIALES
  { id: 132, number: '29p', name: 'Nigiri de Atún flameado', category: 'sushi', buffetType: ['buffetNoche', 'buffetFinSemana'], description: 'Nigiri de atún flameado', image: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=500&h=500&fit=crop&q=90', customizations: [] },
  { id: 133, number: '29q', name: 'Nigiri con queso flameado', category: 'sushi', buffetType: ['buffetNoche', 'buffetFinSemana'], description: 'Nigiri con queso flameado', image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500&h=500&fit=crop&q=90', customizations: [] },
  
  // PLATOS A LA PLANCHA ESPECIALES
  { id: 134, number: '35', name: 'Marisco a la plancha', category: 'plancha', buffetType: ['buffetNoche', 'buffetFinSemana'], description: 'Marisco a la plancha', image: 'https://images.unsplash.com/photo-1598515214211-89d3c73c83b8?w=500&h=500&fit=crop&q=90', customizations: [] },
  { id: 135, number: '42', name: 'Atún a la plancha', category: 'plancha', buffetType: ['buffetNoche', 'buffetFinSemana'], description: 'Atún a la plancha', image: 'https://images.unsplash.com/photo-1598515214211-89d3c73c83b8?w=500&h=500&fit=crop&q=90', customizations: [] },
  { id: 136, number: '36', name: 'Lubina a la plancha', category: 'plancha', buffetType: ['buffetNoche', 'buffetFinSemana'], description: 'Lubina a la plancha', image: 'https://images.unsplash.com/photo-1598515214211-89d3c73c83b8?w=500&h=500&fit=crop&q=90', customizations: [] },
  
  // ========== PLATOS COMPLEMENTARIOS (SOLO BUFFET NOCHE) ==========
  { id: 137, number: 'C92', name: 'Tartar de salmón y aguacate', category: 'complementarios', buffetType: ['buffetNoche', 'complementarios'], description: 'Tartar de salmón y aguacate', image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500&h=500&fit=crop&q=90', customizations: [] },
  { id: 138, number: 'C50', name: 'Uramaki de californiana flameado', category: 'complementarios', buffetType: ['buffetNoche', 'complementarios'], description: 'Uramaki californiana flameado', image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500&h=500&fit=crop&q=90', customizations: [] },
  { id: 139, number: 'C51', name: 'Uramaki de Jamón', category: 'complementarios', buffetType: ['buffetNoche', 'complementarios'], description: 'Uramaki de jamón', image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500&h=500&fit=crop&q=90', customizations: [] },
  { id: 140, number: 'C44', name: 'Uramaki de unagui y queso flameado', category: 'complementarios', buffetType: ['buffetNoche', 'complementarios'], description: 'Uramaki de unagi y queso flameado', image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=500&h=500&fit=crop&q=90', customizations: [] },
  { id: 141, number: 'C89', name: 'Berenjena con salsa Japonesa', category: 'complementarios', buffetType: ['buffetNoche', 'complementarios'], description: 'Berenjena con salsa japonesa', image: 'https://images.unsplash.com/photo-1598515214211-89d3c73c83b8?w=500&h=500&fit=crop&q=90', customizations: [] },
  { id: 142, number: '87', name: 'Vieira al vapor', category: 'complementarios', buffetType: ['buffetNoche', 'complementarios'], description: 'Vieira al vapor', image: 'https://images.unsplash.com/photo-1598515214211-89d3c73c83b8?w=500&h=500&fit=crop&q=90', customizations: [] },
];

export const menuTypes = {
  buffetDia: {
    id: 'buffetDia',
    name: 'Buffet de Día',
    description: 'Lunes a Viernes',
    requiresDrink: false
  },
  buffetNoche: {
    id: 'buffetNoche',
    name: 'Buffet de Noche',
    description: 'Cena',
    requiresDrink: false
  },
  buffetFinSemana: {
    id: 'buffetFinSemana',
    name: 'Buffet Fin de Semana',
    description: 'Sábados, Domingos, Festivos y Vísperas',
    requiresDrink: false
  },
  menuDia: {
    id: 'menuDia',
    name: 'Menú del Día',
    description: 'Lunes a Viernes',
    requiresDrink: false
  }
};

export const categories = [
  { id: 'ensaladas', name: 'Ensaladas', icon: '🥗' },
  { id: 'sopas', name: 'Sopas', icon: '🍲' },
  { id: 'arroces-fideos', name: 'Arroces y Fideos', icon: '🍚' },
  { id: 'entrantes', name: 'Entrantes', icon: '🥢' },
  { id: 'panes', name: 'Panes', icon: '🥟' },
  { id: 'rollitos', name: 'Rollitos', icon: '🌯' },
  { id: 'empanadillas', name: 'Empanadillas', icon: '🥟' },
  { id: 'principales', name: 'Platos Principales', icon: '🍽️' },
  { id: 'tempura', name: 'Tempura', icon: '🍤' },
  { id: 'sushi', name: 'Sushi', icon: '🍣' },
  { id: 'makis', name: 'Makis', icon: '🍱' },
  { id: 'poke', name: 'Poké', icon: '🥗' },
  { id: 'plancha', name: 'A la Plancha', icon: '🔥' },
  { id: 'complementarios', name: 'Complementarios', icon: '⭐' },
];

