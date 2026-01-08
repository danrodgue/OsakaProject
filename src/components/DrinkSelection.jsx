import { useState } from 'react'
import { drinks } from '../data/menuData'
import { FaArrowLeft } from 'react-icons/fa'
import './DrinkSelection.css'

const DrinkSelection = ({ onSelect, onBack }) => {
  const [selectedDrink, setSelectedDrink] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (selectedDrink) {
      onSelect(selectedDrink)
    }
  }

  return (
    <div className="drink-selection-screen">
      <div className="drink-container">
        <button className="back-button" onClick={onBack}>
          <FaArrowLeft /> Volver
        </button>

        <div className="drink-header">
          <h1 className="drink-title">🍶 Selecciona tu Bebida</h1>
          <p className="drink-subtitle">La selección de bebida es obligatoria para este buffet</p>
        </div>

        <form onSubmit={handleSubmit} className="drink-form">
          <div className="drinks-grid">
            {drinks.map((drink) => (
              <button
                key={drink.id}
                type="button"
                className={`drink-option ${selectedDrink?.id === drink.id ? 'selected' : ''}`}
                onClick={() => setSelectedDrink(drink)}
              >
                <div className="drink-icon">🥤</div>
                <h3>{drink.name}</h3>
              </button>
            ))}
          </div>

          <button
            type="submit"
            className="submit-button"
            disabled={!selectedDrink}
          >
            Continuar a la Carta
          </button>
        </form>
      </div>
    </div>
  )
}

export default DrinkSelection

