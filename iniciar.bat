@echo off
echo ========================================
echo OSAKA RESTAURANT - Instalacion y Setup
echo ========================================
echo.

REM Cambiar a directorio del proyecto
cd /d c:\Users\34652\Desktop\clonOsaka\OsakaProject

echo [1/3] Instalando dependencias del frontend...
call npm install

echo.
echo [2/3] Esperando 10 segundos...
timeout /t 10

echo.
echo [3/3] Iniciando frontend (npm run dev)...
echo.
echo ========================================
echo Frontend iniciara en http://localhost:5173
echo Backend ya esta corriendo en http://localhost:3000
echo ========================================
echo.

call npm run dev

pause
