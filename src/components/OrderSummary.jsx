import { FaPrint, FaCheckCircle, FaUtensils } from 'react-icons/fa'
import { menuTypes } from '../data/menuData'
import './OrderSummary.css'

const OrderSummary = ({ orderData, onNewOrder }) => {
  const menuTypeName = menuTypes[orderData.menuType]?.name || 'Menú'
  const orderDate = new Date().toLocaleString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })

  const totalItems = orderData.items.reduce((sum, item) => sum + item.quantity, 0)

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="order-summary-screen">
      <div className="summary-container">
        <div className="summary-header">
          <div className="success-icon">
            <FaCheckCircle />
          </div>
          <h1 className="summary-title">Pedido Confirmado</h1>
          <p className="summary-subtitle">Tu pedido ha sido enviado a cocina</p>
        </div>

        <div className="ticket" id="ticket">
          <div className="ticket-header">
            <div className="restaurant-logo">
              <FaUtensils />
            </div>
            <h2 className="restaurant-name">Restaurante Japonés</h2>
            <p className="ticket-type">{menuTypeName}</p>
          </div>

          <div className="ticket-info">
            <div className="info-row">
              <span className="info-label">Mesa:</span>
              <span className="info-value">{orderData.tableNumber}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Fecha y Hora:</span>
              <span className="info-value">{orderDate}</span>
            </div>
            {orderData.drink && (
              <div className="info-row highlight">
                <span className="info-label">Bebida:</span>
                <span className="info-value">{orderData.drink.name}</span>
              </div>
            )}
          </div>

          <div className="ticket-items">
            <h3 className="items-title">Pedido:</h3>
            <div className="items-list">
              {orderData.items.map((item, index) => (
                <div key={item.id} className="ticket-item">
                  <div className="item-header">
                    <span className="item-number">{item.dish.number}</span>
                    <span className="item-name">{item.dish.name}</span>
                    <span className="item-quantity">x{item.quantity}</span>
                  </div>
                  {item.customizations && item.customizations.length > 0 && (
                    <div className="item-customizations">
                      <strong>Personalizaciones:</strong> {item.customizations.join(', ')}
                    </div>
                  )}
                  {item.comments && (
                    <div className="item-comments">
                      <strong>Comentarios:</strong> {item.comments}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="ticket-footer">
            <div className="total-items">
              <strong>Total de platos: {totalItems}</strong>
            </div>
            <div className="ticket-note">
              <p>Gracias por su pedido</p>
              <p>El pedido será preparado y servido en breve</p>
            </div>
          </div>
        </div>

        <div className="summary-actions">
          <button className="print-button" onClick={handlePrint}>
            <FaPrint /> Imprimir Ticket
          </button>
          <button className="new-order-button" onClick={onNewOrder}>
            Nuevo Pedido
          </button>
        </div>
      </div>
    </div>
  )
}

export default OrderSummary

