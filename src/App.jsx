import { useState } from 'react'
import WelcomeScreen from './components/WelcomeScreen'
import MenuScreen from './components/MenuScreen'
import OrderSummary from './components/OrderSummary'
import './App.css'

function App() {
  const [currentStep, setCurrentStep] = useState('welcome')
  const [orderData, setOrderData] = useState({
    menuType: null,
    tableNumber: null,
    items: []
  })

  const handleWelcomeComplete = (menuType, tableNumber) => {
    setOrderData(prev => ({ ...prev, menuType, tableNumber }))
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
      items: []
    })
    setCurrentStep('welcome')
  }

  return (
    <div className="app">
      {currentStep === 'welcome' && (
        <WelcomeScreen onComplete={handleWelcomeComplete} />
      )}
      {currentStep === 'menu' && (
        <MenuScreen
          orderData={orderData}
          onOrderComplete={handleOrderComplete}
          onBack={() => setCurrentStep('welcome')}
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

