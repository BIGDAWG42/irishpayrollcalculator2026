@echo off
echo =============================================
echo Irish Payroll Calculator - Setup & Launch
echo =============================================
echo.

echo Checking Python...
python --version || (echo Python not found! Please install Python and add to PATH. & pause & exit)

echo Installing dependencies...
pip install -r requirements.txt --quiet

echo.
echo Starting server on http://localhost:5000
echo.
echo Press Ctrl+C to stop the server later.
echo.

python app.py
pause
