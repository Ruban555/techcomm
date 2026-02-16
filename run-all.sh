#!/bin/bash
# Script to run both frontend and backend simultaneously on Linux/Mac

echo "Starting Spring Boot Backend..."
mvn spring-boot:run &

sleep 5

echo "Starting React Frontend..."
cd frontend
npm start

echo "Both applications are starting..."
echo "Backend: http://localhost:8080"
echo "Frontend: http://localhost:3000"
