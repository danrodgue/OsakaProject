import net from 'net'

const PORT = process.env.PRINTER_PORT || 9100
const HOST = process.env.PRINTER_HOST || '0.0.0.0'

const server = net.createServer((socket) => {
  console.log('Simulador: impresora conectada desde', socket.remoteAddress)

  socket.on('data', (data) => {
    console.log('\n--- Datos recibidos (utf8) ---')
    try {
      console.log(data.toString('utf8'))
    } catch (e) {
      console.log(data)
    }
    console.log('--- Fin datos ---\n')
  })

  socket.on('end', () => console.log('Simulador: conexión terminada'))
  socket.on('error', (err) => console.error('Simulador error:', err))
})

server.listen(PORT, HOST, () => {
  console.log(`Simulador de impresora escuchando en ${HOST}:${PORT}`)
})
