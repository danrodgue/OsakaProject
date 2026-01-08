// Datos de ejemplo de platos japoneses
export const menuItems = [
  // ENTRANTES
  { id: 1, number: 'E01', name: 'Gyozas de Cerdo', category: 'entrantes', description: 'Empanadillas japonesas rellenas de cerdo y verduras, fritas y al vapor', image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400', customizations: ['Sin cebolla', 'Sin picante', 'Extra salsa'] },
  { id: 2, number: 'E02', name: 'Edamame', category: 'entrantes', description: 'Vainas de soja tiernas salteadas con sal marina', image: 'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=400', customizations: ['Sin sal', 'Extra sal'] },
  { id: 3, number: 'E03', name: 'Ensalada de Algas Wakame', category: 'entrantes', description: 'Algas marinas frescas con vinagreta de sésamo', image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400', customizations: ['Sin sésamo', 'Extra vinagreta'] },
  { id: 4, number: 'E04', name: 'Sopa de Miso', category: 'entrantes', description: 'Sopa tradicional japonesa con pasta de miso, tofu y alga wakame', image: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=400', customizations: ['Sin tofu', 'Sin alga', 'Extra miso'] },
  
  // SUSHI
  { id: 5, number: 'S01', name: 'Salmón', category: 'sushi', description: 'Nigiri de salmón fresco sobre arroz', image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400', customizations: ['Sin wasabi', 'Extra wasabi', 'Sin jengibre'] },
  { id: 6, number: 'S02', name: 'Atún', category: 'sushi', description: 'Nigiri de atún rojo premium sobre arroz', image: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=400', customizations: ['Sin wasabi', 'Extra wasabi'] },
  { id: 7, number: 'S03', name: 'Anguila', category: 'sushi', description: 'Nigiri de anguila a la brasa con salsa unagi', image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=400', customizations: ['Sin salsa', 'Extra salsa unagi'] },
  { id: 8, number: 'S04', name: 'Pulpo', category: 'sushi', description: 'Nigiri de pulpo tierno sobre arroz', image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400', customizations: ['Sin wasabi'] },
  { id: 9, number: 'S05', name: 'Langostino', category: 'sushi', description: 'Nigiri de langostino fresco sobre arroz', image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400', customizations: ['Sin wasabi'] },
  
  // MAKIS
  { id: 10, number: 'M01', name: 'Maki Salmón', category: 'makis', description: 'Roll de salmón fresco con arroz y alga nori', image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400', customizations: ['Sin wasabi', 'Sin jengibre', 'Extra salsa'] },
  { id: 11, number: 'M02', name: 'Maki Atún', category: 'makis', description: 'Roll de atún con arroz y alga nori', image: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=400', customizations: ['Sin wasabi'] },
  { id: 12, number: 'M03', name: 'Maki Pepino', category: 'makis', description: 'Roll vegetal de pepino fresco', image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400', customizations: ['Sin jengibre'] },
  { id: 13, number: 'M04', name: 'Maki Aguacate', category: 'makis', description: 'Roll vegetal de aguacate cremoso', image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400', customizations: ['Sin jengibre'] },
  
  // HOT ROLLS
  { id: 14, number: 'H01', name: 'Hot Roll Salmón', category: 'hot-rolls', description: 'Roll de salmón empanado y frito con salsa especial', image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400', customizations: ['Sin picante', 'Extra salsa', 'Sin cebolla'] },
  { id: 15, number: 'H02', name: 'Hot Roll Atún', category: 'hot-rolls', description: 'Roll de atún empanado y frito crujiente', image: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=400', customizations: ['Sin picante', 'Extra salsa'] },
  { id: 16, number: 'H03', name: 'Hot Roll Tempura', category: 'hot-rolls', description: 'Roll de verduras tempura con salsa agridulce', image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400', customizations: ['Sin picante', 'Extra salsa'] },
  
  // YAKITORI
  { id: 17, number: 'Y01', name: 'Yakitori Pollo', category: 'yakitori', description: 'Brochetas de pollo a la parrilla con salsa teriyaki', image: 'https://images.unsplash.com/photo-1598515214211-89d3c73c83b8?w=400', customizations: ['Sin salsa', 'Extra salsa', 'Sin picante'] },
  { id: 18, number: 'Y02', name: 'Yakitori Cerdo', category: 'yakitori', description: 'Brochetas de cerdo marinado a la parrilla', image: 'https://images.unsplash.com/photo-1598515214211-89d3c73c83b8?w=400', customizations: ['Sin salsa', 'Extra salsa'] },
  { id: 19, number: 'Y03', name: 'Yakitori Verduras', category: 'yakitori', description: 'Brochetas de verduras mixtas a la parrilla', image: 'https://images.unsplash.com/photo-1598515214211-89d3c73c83b8?w=400', customizations: ['Sin salsa', 'Extra salsa'] },
  
  // TEMPURA
  { id: 20, number: 'T01', name: 'Tempura Verduras', category: 'tempura', description: 'Verduras variadas rebozadas y fritas ligeras', image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400', customizations: ['Sin salsa', 'Extra salsa tempura'] },
  { id: 21, number: 'T02', name: 'Tempura Langostino', category: 'tempura', description: 'Langostinos grandes rebozados y fritos', image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400', customizations: ['Sin salsa', 'Extra salsa tempura'] },
  { id: 22, number: 'T03', name: 'Tempura Mixta', category: 'tempura', description: 'Mezcla de verduras y langostinos tempura', image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400', customizations: ['Sin salsa', 'Extra salsa tempura'] },
  
  // RAMEN
  { id: 23, number: 'R01', name: 'Ramen de Cerdo', category: 'ramen', description: 'Fideos ramen con cerdo, huevo y verduras en caldo tonkotsu', image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400', customizations: ['Sin cebolla', 'Sin picante', 'Sin huevo', 'Extra caldo'] },
  { id: 24, number: 'R02', name: 'Ramen de Pollo', category: 'ramen', description: 'Fideos ramen con pollo, huevo y verduras en caldo shoyu', image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400', customizations: ['Sin cebolla', 'Sin picante', 'Sin huevo'] },
  { id: 25, number: 'R03', name: 'Ramen Vegetal', category: 'ramen', description: 'Fideos ramen con verduras en caldo miso vegetal', image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400', customizations: ['Sin picante', 'Extra caldo'] },
  
  // POSTRES
  { id: 26, number: 'P01', name: 'Mochi de Fresa', category: 'postres', description: 'Bola de arroz glutinoso rellena de helado de fresa', image: 'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=400', customizations: ['Sin azúcar', 'Extra cobertura'] },
  { id: 27, number: 'P02', name: 'Mochi de Vainilla', category: 'postres', description: 'Bola de arroz glutinoso rellena de helado de vainilla', image: 'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=400', customizations: ['Sin azúcar'] },
  { id: 28, number: 'P03', name: 'Dorayaki', category: 'postres', description: 'Panqueques japoneses rellenos de anko (pasta de judías dulces)', image: 'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=400', customizations: ['Sin azúcar'] },
  { id: 29, number: 'P04', name: 'Tarta de Té Verde', category: 'postres', description: 'Tarta cremosa de matcha con base de galleta', image: 'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=400', customizations: ['Sin azúcar'] },
];

export const drinks = [
  { id: 1, name: 'Agua', price: 0 },
  { id: 2, name: 'Refresco (Coca-Cola, Fanta, Sprite)', price: 0 },
  { id: 3, name: 'Cerveza', price: 0 },
  { id: 4, name: 'Sake', price: 0 },
  { id: 5, name: 'Té Verde', price: 0 },
  { id: 6, name: 'Té Negro', price: 0 },
  { id: 7, name: 'Zumo de Naranja', price: 0 },
  { id: 8, name: 'Zumo de Piña', price: 0 },
];

export const menuTypes = {
  buffetDia: {
    id: 'buffetDia',
    name: 'Buffet de Día',
    description: 'Lunes a Viernes',
    requiresDrink: true
  },
  buffetNoche: {
    id: 'buffetNoche',
    name: 'Buffet de Noche',
    description: 'Cena',
    requiresDrink: true
  },
  buffetFinSemana: {
    id: 'buffetFinSemana',
    name: 'Buffet Fin de Semana',
    description: 'Sábados, Domingos, Festivos y Vísperas',
    requiresDrink: true
  },
  menuDia: {
    id: 'menuDia',
    name: 'Menú del Día',
    description: 'Lunes a Viernes',
    requiresDrink: false
  }
};

export const categories = [
  { id: 'entrantes', name: 'Entrantes', icon: '🥢' },
  { id: 'sushi', name: 'Sushi', icon: '🍣' },
  { id: 'makis', name: 'Makis', icon: '🍱' },
  { id: 'hot-rolls', name: 'Hot Rolls', icon: '🔥' },
  { id: 'yakitori', name: 'Yakitori', icon: '🍢' },
  { id: 'tempura', name: 'Tempura', icon: '🍤' },
  { id: 'ramen', name: 'Ramen', icon: '🍜' },
  { id: 'postres', name: 'Postres', icon: '🍡' },
];

