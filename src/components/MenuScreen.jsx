import { useState } from 'react'
import { menuItems, categories, menuTypes } from '../data/menuData'
import { FaShoppingCart, FaArrowLeft } from 'react-icons/fa'
import DishCard from './DishCard'
import DishModal from './DishModal'
import Cart from './Cart'
import './MenuScreen.css'

const MenuScreen = ({ orderData, onOrderComplete, onBack }) => {
  const [selectedCategory, setSelectedCategory] = useState('ensaladas')
  const [selectedDish, setSelectedDish] = useState(null)
  const [cartItems, setCartItems] = useState([])
  const [showCart, setShowCart] = useState(false)

  // Filtrar por categoría y tipo de buffet
  const filteredItems = menuItems.filter(item => {
    const categoryMatch = item.category === selectedCategory
    if (!categoryMatch) return false
    
    // Filtrar por tipo de buffet
    const currentMenuType = orderData.menuType
    if (!currentMenuType) return true
    
    // Si es buffet de día, solo mostrar platos de buffetDia
    if (currentMenuType === 'buffetDia') {
      return item.buffetType?.includes('buffetDia')
    }
    
    // Si es buffet de noche, mostrar platos de buffetDia, buffetNoche y complementarios
    if (currentMenuType === 'buffetNoche') {
      return item.buffetType?.includes('buffetDia') || item.buffetType?.includes('buffetNoche') || item.buffetType?.includes('complementarios')
    }
    
    // Si es buffet fin de semana, mostrar platos de buffetDia, buffetNoche y buffetFinSemana
    if (currentMenuType === 'buffetFinSemana') {
      return item.buffetType?.includes('buffetDia') || item.buffetType?.includes('buffetNoche') || item.buffetType?.includes('buffetFinSemana')
    }
    
    // Para menú del día, mostrar todos
    return true
  })
  const menuTypeName = menuTypes[orderData.menuType]?.name || 'Menú'

  const handleAddToCart = (dish, quantity, customizations, comments) => {
    const cartItem = {
      id: Date.now(),
      dish,
      quantity,
      customizations,
      comments
    }
    setCartItems(prev => [...prev, cartItem])
    setSelectedDish(null)
  }

  const handleRemoveFromCart = (itemId) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId))
  }

  const handleUpdateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveFromCart(itemId)
      return
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    )
  }

  const handleConfirmOrder = () => {
    if (cartItems.length === 0) {
      alert('El carrito está vacío. Añade al menos un plato.')
      return
    }
    onOrderComplete(cartItems)
  }

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="menu-screen">
      <header className="menu-header">
        <button className="back-button" onClick={onBack}>
          <FaArrowLeft /> Volver
        </button>
        <div className="header-info">
          <h1 className="menu-title">🍱 Carta Digital</h1>
          <p className="menu-subtitle">
            {menuTypeName} - Mesa {orderData.tableNumber}
          </p>
        </div>
        <button
          className="cart-toggle"
          onClick={() => setShowCart(!showCart)}
        >
          <FaShoppingCart />
          <span className="cart-badge">{totalItems}</span>
        </button>
      </header>

      <div className="menu-content">
        <aside className="categories-sidebar">
          <h2 className="categories-title">Categorías</h2>
          <div className="categories-list">
            {categories.map(category => (
              <button
                key={category.id}
                className={`category-button ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <span className="category-icon">{category.icon}</span>
                <span className="category-name">{category.name}</span>
              </button>
            ))}
          </div>
        </aside>

        <main className="dishes-section">
          <h2 className="section-category-title">
            {categories.find(c => c.id === selectedCategory)?.icon}{' '}
            {categories.find(c => c.id === selectedCategory)?.name}
          </h2>
          <div className="dishes-grid">
            {filteredItems.map(dish => (
              <DishCard
                key={dish.id}
                dish={dish}
                onClick={() => setSelectedDish(dish)}
              />
            ))}
          </div>
        </main>
      </div>

      {selectedDish && (
        <DishModal
          dish={selectedDish}
          onClose={() => setSelectedDish(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      <Cart
        items={cartItems}
        isOpen={showCart}
        onClose={() => setShowCart(false)}
        onRemove={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateQuantity}
        onConfirm={handleConfirmOrder}
      />
    </div>
  )
}

export default MenuScreen

