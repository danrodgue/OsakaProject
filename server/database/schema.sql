-- Base de datos para sistema de pedidos con QR
CREATE DATABASE IF NOT EXISTS osaka_restaurant;
USE osaka_restaurant;

-- Tabla de mesas (cada mesa tiene un QR único)
CREATE TABLE IF NOT EXISTS mesas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  numero_mesa INT NOT NULL UNIQUE,
  qr_code VARCHAR(50) NOT NULL UNIQUE,
  estado ENUM('disponible', 'ocupada', 'reservada') DEFAULT 'disponible',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla de pedidos
CREATE TABLE IF NOT EXISTS pedidos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  mesa_id INT NOT NULL,
  numero_personas INT NOT NULL,
  estado ENUM('edicion', 'confirmado', 'en_preparacion', 'listo', 'entregado', 'cancelado') DEFAULT 'edicion',
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  fecha_confirmacion TIMESTAMP NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (mesa_id) REFERENCES mesas(id) ON DELETE CASCADE,
  INDEX idx_mesa_estado (mesa_id, estado)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla de items del pedido
CREATE TABLE IF NOT EXISTS items_pedido (
  id INT AUTO_INCREMENT PRIMARY KEY,
  pedido_id INT NOT NULL,
  plato_id INT NOT NULL,
  cantidad INT NOT NULL DEFAULT 1,
  personalizaciones TEXT NULL,
  comentarios TEXT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (pedido_id) REFERENCES pedidos(id) ON DELETE CASCADE,
  INDEX idx_pedido (pedido_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insertar algunas mesas de ejemplo (cada mesa tiene su QR único)
INSERT INTO mesas (numero_mesa, qr_code, estado) VALUES
(1, 'QR1', 'disponible'),
(2, 'QR2', 'disponible'),
(3, 'QR3', 'disponible'),
(4, 'QR4', 'disponible'),
(5, 'QR5', 'disponible'),
(6, 'QR6', 'disponible'),
(7, 'QR7', 'disponible'),
(8, 'QR8', 'disponible'),
(9, 'QR9', 'disponible'),
(10, 'QR10', 'disponible')
ON DUPLICATE KEY UPDATE numero_mesa=numero_mesa;
