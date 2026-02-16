@echo off
REM Script to run both frontend and backend simultaneously on Windows

echo Starting Spring Boot Backend...
start cmd /k "cd . && mvn spring-boot:run"

timeout /t 5 /nobreak

echo Starting React Frontend...
start cmd /k "cd frontend && npm start"

echo Both applications are starting...
echo Backend: http://localhost:8080
echo Frontend: http://localhost:3000
