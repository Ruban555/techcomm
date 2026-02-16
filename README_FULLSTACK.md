# Full Stack Signup Application

A modern full-stack signup application with:

- **Frontend**: React (http://localhost:3000)
- **Backend**: Spring Boot REST API (http://localhost:8080)
- **Database**: PostgreSQL

## Quick Start

### Option 1: Run Both Simultaneously (Windows)

```bash
run-all.bat
```

### Option 2: Run Separately

**Terminal 1 - Run Backend:**

```bash
mvn spring-boot:run
```

**Terminal 2 - Run Frontend:**

```bash
cd frontend
npm install
npm start
```

### Option 3: Deploy Frontend to Backend

```bash
cd frontend
npm run build
```

Then access at: http://localhost:8080

## Project Structure

- **backend/** - Spring Boot REST API
  - Controllers: `/api/signup`, `/api/users`
  - Models: Person entity with JPA
  - Database: PostgreSQL (configured in application.properties)

- **frontend/** - React SPA
  - Components: SignupForm component
  - Services: API integration (signupService.js)
  - Styling: Custom CSS with gradient UI

## Features

✅ User signup form with name and email validation
✅ REST API with JSON request/response
✅ PostgreSQL database persistence
✅ CORS enabled for frontend-backend communication
✅ Success message feedback
✅ Error handling
✅ Responsive design with gradient UI

## API Endpoints

| Method | Endpoint      | Description        |
| ------ | ------------- | ------------------ |
| POST   | `/api/signup` | Create new user    |
| GET    | `/api/users`  | Retrieve all users |

## For Detailed Setup Guide

See [SETUP_GUIDE.md](SETUP_GUIDE.md)
