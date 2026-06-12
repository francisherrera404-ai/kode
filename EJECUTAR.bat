@echo off
REM Execute KODE automation script
cd /d "%~dp0"
echo Iniciando automación KODE...
node kode-complete-v2.js
echo.
echo Presiona una tecla para continuar...
pause
