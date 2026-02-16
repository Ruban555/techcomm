# Frontend Setup and Installation Guide

## Project Structure

```
SpringBoot-Java/
├── backend/                    (Spring Boot Java Application)
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/codewith/firstApp/
│   │   │   │   ├── controllers/        (REST API controllers)
│   │   │   │   │   ├── SignupController.java        (Original form controller)
│   │   │   │   │   └── SignupApiController.java     (REST API endpoints)
│   │   │   │   ├── models/
│   │   │   │   ├── repositories/
│   │   │   │   └── FirstAppApplication.java
│   │   │   └── resources/
│   │   │       ├── application.properties
│   │   │       └── templates/          (Original HTML templates)
│   │   └── test/
│   └── pom.xml
│
└── frontend/                   (React Application)
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── SignupForm.js          (Signup form component)
    │   │   ├── SignupForm.css
    │   ├── services/
    │   │   └── signupService.js       (API communication layer)
    │   ├── App.js
    │   ├── App.css
    │   └── index.js
    ├── package.json
    ├── .env                   (Environment variables)
    └── .gitignore
```

## Prerequisites

- **Java JDK 17+** - for Spring Boot backend
- **Node.js 16+** - for React frontend
- **npm** - Node package manager (comes with Node.js)
- **PostgreSQL** - Database (already configured in application.properties)

## Installation & Setup

### Backend Setup (Spring Boot)

1. Navigate to the backend directory:

   ```bash
   cd path\to\SpringBoot-Java
   ```

2. Build the project:

   ```bash
   mvn clean install
   ```

3. Run the Spring Boot application:

   ```bash
   mvn spring-boot:run
   ```

   OR use the Maven wrapper:

   ```bash
   ./mvnw spring-boot:run
   ```

The backend will start on **http://localhost:8080**

**Backend Endpoints:**

- REST API: `POST http://localhost:8080/api/signup` (JSON request)
- REST API: `GET http://localhost:8080/api/users` (Get all users)
- Traditional Form: `GET http://localhost:8080/signup` (HTML form)
- Traditional Form: `POST http://localhost:8080/signup` (Form submission)

### Frontend Setup (React)

1. Navigate to the frontend directory:

   ```bash
   cd path\to\SpringBoot-Java\frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The frontend will start on **http://localhost:3000**

## Running Both Simultaneously

### Option 1: In Separate Terminal Windows

**Terminal 1 - Backend:**

```bash
cd path\to\SpringBoot-Java
mvn spring-boot:run
```

**Terminal 2 - Frontend:**

```bash
cd path\to\SpringBoot-Java\frontend
npm start
```

Both applications will run concurrently:

- Backend: http://localhost:8080
- Frontend: http://localhost:3000

### Option 2: Using Concurrently (Windows)

1. Install concurrently in frontend folder:

   ```bash
   npm install --save-dev concurrently
   ```

2. Update `frontend/package.json` scripts:

   ```json
   "scripts": {
     "start": "react-scripts start",
     "build": "react-scripts build",
     "test": "react-scripts test",
     "eject": "react-scripts eject",
     "dev:all": "concurrently \"cd .. && mvn spring-boot:run\" \"npm start\""
   }
   ```

3. Run both from frontend directory:
   ```bash
   npm run dev:all
   ```

## API Communication

The React frontend communicates with the Spring Boot backend via REST API:

### Signup Request

```javascript
// Frontend sends:
POST http://localhost:8080/api/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com"
}

// Backend responds:
{
  "message": "Signup successful! Welcome John Doe",
  "id": "1"
}
```

### CORS Configuration

CORS is enabled in `SignupApiController.java` with:

```java
@CrossOrigin(origins = "http://localhost:3000")
```

The frontend proxy is configured in `package.json`:

```json
"proxy": "http://localhost:8080"
```

## Building for Production

### Build Frontend

```bash
cd frontend
npm run build
```

This creates an optimized build in `frontend/build/` directory.

### Build Backend with Frontend Integration

After building the frontend, the build files should be served from the backend.
Copy the build files to `src/main/resources/static/` in the backend.

Then build the backend:

```bash
mvn clean package
```

The JAR file will include both backend and frontend.

## Testing the Application

1. Open http://localhost:3000 in your browser
2. Fill in the signup form with name and email
3. Click "Sign Up"
4. You should see a success message
5. Data will be saved in the PostgreSQL database

You can verify the data was saved by:

- Checking the browser console for network requests
- Accessing http://localhost:8080/api/users to see all saved users

## Troubleshooting

### "Port 8080 already in use"

Change the port in `application.properties`:

```properties
server.port=8081
```

And update the frontend API URL in `.env`:

```
REACT_APP_API_BASE_URL=http://localhost:8081/api
```

### "Port 3000 already in use"

```bash
npm start -- --port 3001
```

### CORS Errors

Ensure:

1. Backend has `@CrossOrigin(origins = "http://localhost:3000")`
2. Frontend `.env` has correct backend URL
3. Both servers are running

### Database Connection Errors

Check that PostgreSQL is running and the connection string in `application.properties` is correct.

## Development Workflow

1. **Backend changes**: Edit files in `src/main/java/` → Spring Boot auto-reloads with devtools
2. **Frontend changes**: Edit files in `frontend/src/` → React dev server auto-refreshes
3. **Database schema changes**: Hibernate will auto-update with `ddl-auto=update`

## Project Endpoints Summary

| Endpoint        | Method | Type | Description               |
| --------------- | ------ | ---- | ------------------------- |
| /api/signup     | POST   | REST | Create new user (JSON)    |
| /api/users      | GET    | REST | Get all users             |
| /signup         | GET    | Form | Display signup form       |
| /signup         | POST   | Form | Submit form (traditional) |
| /signup-success | GET    | Form | Show success page         |

Enjoy your full-stack application! 🚀
