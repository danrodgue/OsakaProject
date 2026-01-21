import { useState, useEffect } from 'react'
import { menuItems, categories, menuTypes } from '../data/menuData'
import { FaShoppingCart, FaArrowLeft } from 'react-icons/fa'
import DishCard from './DishCard'
import DishModal from './DishModal'
import Cart from './Cart'
import { getPedido, addItemToPedido, updateItemInPedido, deleteItemFromPedido, confirmarPedido, imprimirPedido } from '../utils/api'
import { joinMesa, onCartUpdate, leaveMesa, connectSocket } from '../utils/socket'
import './MenuScreen.css'

const MenuScreen = ({ orderData, onOrderComplete, onBack }) => {
  const [selectedCategory, setSelectedCategory] = useState('ensaladas')
  const [selectedDish, setSelectedDish] = useState(null)
  const [cartItems, setCartItems] = useState([])
  const [showCart, setShowCart] = useState(false)
  const [loading, setLoading] = useState(true)

  // Cargar pedido desde la API y configurar WebSocket
  useEffect(() => {
    const loadPedido = async () => {
      if (!orderData.pedidoId) {
        setLoading(false)
        return
      }

      try {
        // Conectar WebSocket
        connectSocket()
        
        // Unirse a la sala de la mesa
        if (orderData.mesaId) {
          joinMesa(orderData.mesaId)
        }

        // Cargar pedido desde la API
        const pedido = await getPedido(orderData.pedidoId)
        
        // Convertir items de la base de datos al formato del carrito
        const itemsConvertidos = pedido.items.map(item => {
          const dish = menuItems.find(d => d.id === item.plato_id)
          return {
            id: item.id,
            dish: dish || { id: item.plato_id, name: 'Plato no encontrado' },
            quantity: item.cantidad,
            customizations: item.personalizaciones ? JSON.parse(item.personalizaciones) : [],
            comments: item.comentarios || null
          }
        })
        
        setCartItems(itemsConvertidos)
        setLoading(false)
      } catch (error) {
        console.error('Error al cargar pedido:', error)
        setLoading(false)
      }
    }

    loadPedido()

    // Configurar listener de WebSocket para actualizaciones en tiempo real
    const unsubscribe = onCartUpdate((updatedPedido) => {
      if (updatedPedido && updatedPedido.items) {
        const itemsConvertidos = updatedPedido.items.map(item => {
          const dish = menuItems.find(d => d.id === item.plato_id)
          return {
            id: item.id,
            dish: dish || { id: item.plato_id, name: 'Plato no encontrado' },
            quantity: item.cantidad,
            customizations: item.personalizaciones ? JSON.parse(item.personalizaciones) : [],
            comments: item.comentarios || null
          }
        })
        setCartItems(itemsConvertidos)
      }
    })

    // Limpiar al desmontar
    return () => {
      if (orderData.mesaId) {
        leaveMesa(orderData.mesaId)
      }
      if (unsubscribe) {
        unsubscribe()
      }
    }
  }, [orderData.pedidoId, orderData.mesaId])

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

  const handleAddToCart = async (dish, quantity, customizations, comments) => {
    if (!orderData.pedidoId) {
      alert('Error: No hay un pedido activo')
      return
    }

    try {
      const newItem = await addItemToPedido(orderData.pedidoId, {
        dish,
        quantity,
        customizations,
        comments
      })

      // Convertir el item de la base de datos al formato del carrito
      const cartItem = {
        id: newItem.id,
        dish,
        quantity: newItem.cantidad,
        customizations: newItem.personalizaciones ? JSON.parse(newItem.personalizaciones) : [],
        comments: newItem.comentarios || null
      }

      // Recargar el pedido completo para sincronizar
      const pedido = await getPedido(orderData.pedidoId)
      const itemsConvertidos = pedido.items.map(item => {
        const dishItem = menuItems.find(d => d.id === item.plato_id)
        return {
          id: item.id,
          dish: dishItem || { id: item.plato_id, name: 'Plato no encontrado' },
          quantity: item.cantidad,
          customizations: item.personalizaciones ? JSON.parse(item.personalizaciones) : [],
          comments: item.comentarios || null
        }
      })
      setCartItems(itemsConvertidos)
      
      setSelectedDish(null)
    } catch (error) {
      console.error('Error al agregar item:', error)
      alert('Error al agregar item al carrito. Por favor, intenta de nuevo.')
    }
  }

  const handleRemoveFromCart = async (itemId) => {
    if (!orderData.pedidoId) {
      alert('Error: No hay un pedido activo')
      return
    }

    try {
      await deleteItemFromPedido(orderData.pedidoId, itemId)

      // Recargar el pedido completo para sincronizar
      const pedido = await getPedido(orderData.pedidoId)
      const itemsConvertidos = pedido.items.map(item => {
        const dish = menuItems.find(d => d.id === item.plato_id)
        return {
          id: item.id,
          dish: dish || { id: item.plato_id, name: 'Plato no encontrado' },
          quantity: item.cantidad,
          customizations: item.personalizaciones ? JSON.parse(item.personalizaciones) : [],
          comments: item.comentarios || null
        }
      })
      setCartItems(itemsConvertidos)
    } catch (error) {
      console.error('Error al eliminar item:', error)
      alert('Error al eliminar item. Por favor, intenta de nuevo.')
    }
  }

  const handleUpdateQuantity = async (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveFromCart(itemId)
      return
    }

    if (!orderData.pedidoId) {
      alert('Error: No hay un pedido activo')
      return
    }

    try {
      const item = cartItems.find(i => i.id === itemId)
      if (!item) return

      await updateItemInPedido(orderData.pedidoId, itemId, {
        quantity: newQuantity,
        customizations: item.customizations,
        comments: item.comments
      })

      // Recargar el pedido completo para sincronizar
      const pedido = await getPedido(orderData.pedidoId)
      const itemsConvertidos = pedido.items.map(item => {
        const dish = menuItems.find(d => d.id === item.plato_id)
        return {
          id: item.id,
          dish: dish || { id: item.plato_id, name: 'Plato no encontrado' },
          quantity: item.cantidad,
          customizations: item.personalizaciones ? JSON.parse(item.personalizaciones) : [],
          comments: item.comentarios || null
        }
      })
      setCartItems(itemsConvertidos)
    } catch (error) {
      console.error('Error al actualizar cantidad:', error)
      alert('Error al actualizar cantidad. Por favor, intenta de nuevo.')
    }
  }

  const handleConfirmOrder = async () => {
    if (cartItems.length === 0) {
      alert('El carrito está vacío. Añade al menos un plato.')
      return
    }

    if (!orderData.pedidoId) {
      alert('Error: No hay un pedido activo')
      return
    }

    try {
      const pedidoConfirmado = await confirmarPedido(orderData.pedidoId)
      
      // Convertir items al formato esperado por OrderSummary
      const itemsConfirmados = pedidoConfirmado.items.map(item => {
        const dish = menuItems.find(d => d.id === item.plato_id)
        return {
          id: item.id,
          dish: dish || { id: item.plato_id, name: 'Plato no encontrado' },
          quantity: item.cantidad,
          customizations: item.personalizaciones ? JSON.parse(item.personalizaciones) : [],
          comments: item.comentarios || null
        }
      })

      // Send to thermal printer (best-effort) via backend
      try {
        const payloadImpresion = {
          restaurantName: 'Osaka',
          mesaNumber: orderData.tableNumber,
          pedidoId: orderData.pedidoId,
          numero_personas: orderData.numeroPersonas,
          items: itemsConfirmados.map(i => ({
            name: i.dish.name,
            quantity: i.quantity,
            personalizaciones: i.customizations && i.customizations.length ? JSON.stringify(i.customizations) : null,
            comentarios: i.comments || null
          }))
        }
        await imprimirPedido(payloadImpresion)
      } catch (errImpresion) {
        console.error('Impresión fallida:', errImpresion)
      }

      onOrderComplete(itemsConfirmados)
    } catch (error) {
      console.error('Error al confirmar pedido:', error)
      alert('Error al confirmar pedido. Por favor, intenta de nuevo.')
    }
  }

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  if (loading) {
    return (
      <div className="menu-screen">
        <div style={{ padding: '50px', textAlign: 'center', color: 'var(--color-text)' }}>
          <p>Cargando pedido...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="menu-screen">
      <header className="menu-header">
        {/* <button className="back-button" onClick={onBack}>
          <FaArrowLeft /> Volver
        </button> */}
        <div className="header-info">
          <h1 className="menu-title">🍱 Carta Digital</h1>
          <p className="menu-subtitle">
            {menuTypeName}
            {/*  - Mesa {orderData.tableNumber} */}
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
