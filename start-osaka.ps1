# Script para arrancar Osaka Restaurant en Windows

Write-Host "================================"
Write-Host "OSAKA RESTAURANT - Inicio"
Write-Host "================================"
Write-Host ""

# Rutas
$projectRoot = "c:\Users\34652\Desktop\clonOsaka\OsakaProject"
$serverDir = "$projectRoot\server"

Write-Host "[1] Instalando dependencias del frontend..."
Set-Location $projectRoot
& npm install --legacy-peer-deps

Write-Host ""
Write-Host "[2] Esperando a que npm termine..."
Start-Sleep -Seconds 5

Write-Host ""
Write-Host "[3] Abriendo frontend en nueva ventana..."
Start-Process -FilePath "cmd.exe" -ArgumentList "/k", "cd $projectRoot && npm run dev" -WorkingDirectory $projectRoot

Write-Host ""
Write-Host "========================================="
Write-Host "✓ Frontend iniciándose en puerto 5173"
Write-Host "✓ Backend ya está en http://localhost:3000"
Write-Host "✓ MongoDB escuchando en 27017"
Write-Host "========================================="
