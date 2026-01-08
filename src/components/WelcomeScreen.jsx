import { useState } from 'react'
import { menuTypes } from '../data/menuData'
import './WelcomeScreen.css'

const WelcomeScreen = ({ onComplete }) => {
  const [selectedMenu, setSelectedMenu] = useState(null)
  const [tableNumber, setTableNumber] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (selectedMenu && tableNumber.trim()) {
      onComplete(selectedMenu, tableNumber.trim())
    }
  }

  return (
    <div className="welcome-screen">
      <div className="welcome-container">
        <div className="welcome-header">
          <h1 className="welcome-title">🍱 Restaurante Japonés</h1>
          <p className="welcome-subtitle">Carta Digital - Buffet Libre</p>
        </div>

        <form onSubmit={handleSubmit} className="welcome-form">
          <div className="form-section">
            <h2 className="section-title">Selecciona el tipo de menú</h2>
            <div className="menu-options">
              {Object.values(menuTypes).map((menu) => (
                <button
                  key={menu.id}
                  type="button"
                  className={`menu-option ${selectedMenu === menu.id ? 'selected' : ''}`}
                  onClick={() => setSelectedMenu(menu.id)}
                >
                  <div className="menu-option-content">
                    <h3>{menu.name}</h3>
                    <p>{menu.description}</p>
                    {menu.requiresDrink && (
                      <span className="drink-required">* Bebida obligatoria</span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="form-section">
            <label htmlFor="tableNumber" className="input-label">
              Número de Mesa
            </label>
            <input
              id="tableNumber"
              type="number"
              min="1"
              value={tableNumber}
              onChange={(e) => setTableNumber(e.target.value)}
              placeholder="Ej: 5"
              className="table-input"
              required
            />
          </div>

          <button
            type="submit"
            className="submit-button"
            disabled={!selectedMenu || !tableNumber.trim()}
          >
            Continuar
          </button>
        </form>
      </div>
    </div>
  )
}

export default WelcomeScreen

