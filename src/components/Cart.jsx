import { FaTimes, FaPlus, FaMinus, FaShoppingCart } from 'react-icons/fa'
import './Cart.css'

const Cart = ({ items, isOpen, onClose, onRemove, onUpdateQuantity, onConfirm, drink }) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  if (!isOpen) return null

  return (
    <div className="cart-overlay" onClick={onClose}>
      <div className="cart-panel" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h2 className="cart-title">
            <FaShoppingCart /> Carrito ({totalItems})
          </h2>
          <button className="cart-close" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <div className="cart-body">
          {items.length === 0 ? (
            <div className="cart-empty">
              <p>El carrito está vacío</p>
              <p className="cart-empty-subtitle">Añade platos desde la carta</p>
            </div>
          ) : (
            <>
              {drink && (
                <div className="cart-drink-info">
                  <strong>Bebida seleccionada:</strong> {drink.name}
                </div>
              )}
              <div className="cart-items">
                {items.map((item) => (
                  <div key={item.id} className="cart-item">
                    <div className="cart-item-image">
                      <img src={item.dish.image} alt={item.dish.name} />
                    </div>
                    <div className="cart-item-info">
                      <div className="cart-item-header">
                        <h4 className="cart-item-name">
                          {item.dish.number} - {item.dish.name}
                        </h4>
                        <button
                          className="cart-item-remove"
                          onClick={() => onRemove(item.id)}
                        >
                          <FaTimes />
                        </button>
                      </div>
                      {item.customizations && item.customizations.length > 0 && (
                        <div className="cart-item-customizations">
                          <strong>Personalizaciones:</strong>{' '}
                          {item.customizations.join(', ')}
                        </div>
                      )}
                      {item.comments && (
                        <div className="cart-item-comments">
                          <strong>Comentarios:</strong> {item.comments}
                        </div>
                      )}
                      <div className="cart-item-quantity">
                        <button
                          className="quantity-btn"
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        >
                          <FaMinus />
                        </button>
                        <span className="quantity-value">{item.quantity}</span>
                        <button
                          className="quantity-btn"
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        >
                          <FaPlus />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {items.length > 0 && (
          <div className="cart-footer">
            <button className="confirm-order-button" onClick={onConfirm}>
              Enviar Pedido a Cocina
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart

