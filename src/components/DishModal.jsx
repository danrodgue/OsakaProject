import { useState } from 'react'
import { FaTimes, FaPlus, FaMinus } from 'react-icons/fa'
import './DishModal.css'

const DishModal = ({ dish, onClose, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1)
  const [selectedCustomizations, setSelectedCustomizations] = useState([])
  const [comments, setComments] = useState('')

  const handleCustomizationToggle = (customization) => {
    setSelectedCustomizations(prev =>
      prev.includes(customization)
        ? prev.filter(c => c !== customization)
        : [...prev, customization]
    )
  }

  const handleAddToCart = () => {
    onAddToCart(dish, quantity, selectedCustomizations, comments)
  }

  const handleQuantityChange = (delta) => {
    setQuantity(prev => Math.max(1, prev + delta))
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <FaTimes />
        </button>

        <div className="modal-header">
          <div className="modal-image-container">
            <img src={dish.image} alt={dish.name} className="modal-image" />
            <div className="modal-number">{dish.number}</div>
          </div>
          <div className="modal-title-section">
            <h2 className="modal-title">{dish.name}</h2>
            <p className="modal-description">{dish.description}</p>
          </div>
        </div>

        <div className="modal-body">
          <div className="quantity-section">
            <label className="section-label">Cantidad</label>
            <div className="quantity-controls">
              <button
                className="quantity-button"
                onClick={() => handleQuantityChange(-1)}
              >
                <FaMinus />
              </button>
              <span className="quantity-value">{quantity}</span>
              <button
                className="quantity-button"
                onClick={() => handleQuantityChange(1)}
              >
                <FaPlus />
              </button>
            </div>
          </div>

          {dish.customizations && dish.customizations.length > 0 && (
            <div className="customizations-section">
              <label className="section-label">Personalización</label>
              <div className="customizations-list">
                {dish.customizations.map((customization, index) => (
                  <button
                    key={index}
                    className={`customization-button ${
                      selectedCustomizations.includes(customization) ? 'selected' : ''
                    }`}
                    onClick={() => handleCustomizationToggle(customization)}
                  >
                    {customization}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="comments-section">
            <label htmlFor="comments" className="section-label">
              Comentarios Especiales
            </label>
            <textarea
              id="comments"
              className="comments-textarea"
              placeholder="Ej: Sin cebolla, sin picante, extra salsa, etc."
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              rows="3"
            />
          </div>
        </div>

        <div className="modal-footer">
          <button className="add-to-cart-button" onClick={handleAddToCart}>
            Añadir al Pedido ({quantity})
          </button>
        </div>
      </div>
    </div>
  )
}

export default DishModal

