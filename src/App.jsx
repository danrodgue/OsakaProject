import { useState } from 'react'
import WelcomeScreen from './components/WelcomeScreen'
import DrinkSelection from './components/DrinkSelection'
import MenuScreen from './components/MenuScreen'
import OrderSummary from './components/OrderSummary'
import { menuTypes } from './data/menuData'
import './App.css'

function App() {
  const [currentStep, setCurrentStep] = useState('welcome')
  const [orderData, setOrderData] = useState({
    menuType: null,
    tableNumber: null,
    drink: null,
    items: []
  })

  const handleWelcomeComplete = (menuType, tableNumber) => {
    setOrderData(prev => ({ ...prev, menuType, tableNumber }))
    const menuTypeData = menuTypes[menuType]
    if (menuTypeData.requiresDrink) {
      setCurrentStep('drink')
    } else {
      setCurrentStep('menu')
    }
  }

  const handleDrinkSelected = (drink) => {
    setOrderData(prev => ({ ...prev, drink }))
    setCurrentStep('menu')
  }

  const handleOrderComplete = (items) => {
    setOrderData(prev => ({ ...prev, items }))
    setCurrentStep('summary')
  }

  const handleNewOrder = () => {
    setOrderData({
      menuType: null,
      tableNumber: null,
      drink: null,
      items: []
    })
    setCurrentStep('welcome')
  }

  return (
    <div className="app">
      {currentStep === 'welcome' && (
        <WelcomeScreen onComplete={handleWelcomeComplete} />
      )}
      {currentStep === 'drink' && (
        <DrinkSelection
          onSelect={handleDrinkSelected}
          onBack={() => setCurrentStep('welcome')}
        />
      )}
      {currentStep === 'menu' && (
        <MenuScreen
          orderData={orderData}
          onOrderComplete={handleOrderComplete}
          onBack={() => {
            if (orderData.menuType && menuTypes[orderData.menuType].requiresDrink) {
              setCurrentStep('drink')
            } else {
              setCurrentStep('welcome')
            }
          }}
        />
      )}
      {currentStep === 'summary' && (
        <OrderSummary
          orderData={orderData}
          onNewOrder={handleNewOrder}
        />
      )}
    </div>
  )
}

export default App

