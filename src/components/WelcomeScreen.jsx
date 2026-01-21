import { useState, useEffect } from 'react'
import { menuTypes } from '../data/menuData'
import { getMesaByQR, getPedidoActivo, createPedido } from '../utils/api'
import './WelcomeScreen.css'

const WelcomeScreen = ({ onComplete }) => {
  const [selectedMenu, setSelectedMenu] = useState(null)
  const [numeroPersonas, setNumeroPersonas] = useState('')
  const [mesaData, setMesaData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Obtener mesa desde QR (el QR contiene ?mesa=QR1)
  useEffect(() => {
    const initMesa = async () => {
      try {
        const searchParams = new URLSearchParams(window.location.search)
        const qrCode = searchParams.get('mesa') || searchParams.get('qr')

        // if (!qrCode) {
        //   setError('Código QR no válido. Por favor, escanea el código QR de la mesa.')
        //   setLoading(false)
        //   return
        // }

        // Si no hay QR, usar una mesa “ficticia” para poder acceder sin escanear
        const mesa = qrCode
          ? await getMesaByQR(qrCode)
          : { id: 'DEV-MESA', numero_mesa: 'DEV' }
        setMesaData(mesa)

        // Verificar si ya existe un pedido activo para esta mesa
        const pedidoActivo = await getPedidoActivo(mesa.id)
        if (pedidoActivo) {
          // Si ya existe un pedido activo, continuar con ese pedido
          setLoading(false)
          return
        }

        setLoading(false)
      } catch (err) {
        console.error('Error al obtener mesa:', err)
        setError('Error al obtener información de la mesa. Por favor, intenta de nuevo.')
        setLoading(false)
      }
    }

    initMesa()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!selectedMenu || !numeroPersonas || numeroPersonas < 1) {
      return
    }

    if (!mesaData) {
      setError('No se pudo obtener la información de la mesa.')
      return
    }

    try {
      setLoading(true)

      // Verificar si ya existe un pedido activo
      let pedidoActivo = await getPedidoActivo(mesaData.id)

      if (!pedidoActivo) {
        // Crear nuevo pedido
        const nuevoPedido = await createPedido(mesaData.id, parseInt(numeroPersonas))
        pedidoActivo = { ...nuevoPedido, items: [] }
      }

      onComplete(selectedMenu, mesaData.numero_mesa, mesaData.id, pedidoActivo.id, parseInt(numeroPersonas))
    } catch (err) {
      console.error('Error al crear pedido:', err)
      setError('Error al crear pedido. Por favor, intenta de nuevo.')
      setLoading(false)
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
                  </div>
                </button>
              ))}
            </div>
          </div>

          {mesaData && (
            <div className="form-section">
              <p className="mesa-info">Mesa {mesaData.numero_mesa}</p>
            </div>
          )}

          <div className="form-section">
            <label htmlFor="numeroPersonas" className="input-label">
              Número de Personas
            </label>
            <input
              id="numeroPersonas"
              type="number"
              min="1"
              value={numeroPersonas}
              onChange={(e) => setNumeroPersonas(e.target.value)}
              placeholder="Ej: 2"
              className="table-input"
              required
              disabled={loading || !mesaData}
            />
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="submit-button"
            disabled={!selectedMenu || !numeroPersonas || numeroPersonas < 1 || loading || !mesaData}
          >
            {loading ? 'Cargando...' : 'Continuar'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default WelcomeScreen

