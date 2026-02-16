# Project Documentation Index

## 📚 Documentation Files

### 1. **SETUP_GUIDE.md** - Complete Setup Instructions

- Prerequisites and installation steps
- Project structure explanation
- How to run frontend and backend
- API endpoints and environment configuration
- Troubleshooting guide
- **Start here for detailed setup!**

### 2. **API_DOCS.md** - REST API Documentation

- API base URL and endpoints
- Request/response examples
- Error handling
- cURL and JavaScript examples
- Postman testing guide

### 3. **README_FULLSTACK.md** - Quick Overview

- Quick start commands
- Project structure overview
- Features list
- Quick reference to other docs

## 🚀 Quick Start

### Windows - Run Everything in One Command:

```bash
run-all.bat
```

### All Platforms - Run Separately:

**Terminal 1 (Backend):**

```bash
mvn spring-boot:run
```

**Terminal 2 (Frontend):**

```bash
cd frontend
npm install
npm start
```

Then open: **http://localhost:3000**

## 📂 Project Structure

```
SpringBoot-Java/
├── backend/                      Spring Boot Application
│   ├── src/main/java/.../controllers/
│   │   ├── SignupController.java        (Traditional form handler)
│   │   └── SignupApiController.java     (REST API endpoints)
│   ├── src/main/resources/
│   │   ├── application.properties       (Database config)
│   │   └── templates/                   (HTML templates)
│   └── pom.xml
│
├── frontend/                      React Application
│   ├── src/components/
│   │   ├── SignupForm.js                (Main form component)
│   │   └── SignupForm.css
│   ├── src/services/
│   │   └── signupService.js             (API calls)
│   ├── App.js
│   ├── index.js
│   ├── package.json
│   └── .env                            (Configuration)
│
├── SETUP_GUIDE.md                ← Read this first!
├── API_DOCS.md                   REST API Reference
├── README_FULLSTACK.md           Quick overview
├── run-all.bat                   Windows batch script
└── run-all.sh                    Linux/Mac shell script
```

## 🔄 Architecture

```
┌─────────────────────────────────────────────────────┐
│                  React Frontend                      │
│              (http://localhost:3000)                 │
│           SignupForm.js + SignupForm.css            │
└────────────────────┬────────────────────────────────┘
                     │
                 REST API (JSON)
           signupService.js makes calls
                     │
┌────────────────────▼────────────────────────────────┐
│              Spring Boot Backend                     │
│              (http://localhost:8080)                 │
│         SignupApiController.java                   │
│         @RestController @CrossOrigin                │
│              /api/signup (POST)                     │
│              /api/users (GET)                       │
└────────────────────┬────────────────────────────────┘
                     │
                 JPA/Hibernate
                     │
┌────────────────────▼────────────────────────────────┐
│           PostgreSQL Database                       │
│        (configured in application.properties)       │
│              Person entity                          │
└─────────────────────────────────────────────────────┘
```

## 🛠️ Key Technologies

- **Frontend**: React 18, JavaScript, CSS3
- **Backend**: Spring Boot 3.5.5, Java 17
- **Database**: PostgreSQL
- **API**: REST with JSON
- **Communication**: Fetch API, HTTP
- **CORS**: Enabled for cross-origin requests

## ✨ Features Implemented

✅ HTML form converted to React component
✅ Form validation (name and email required)
✅ REST API endpoints for signup
✅ JSON request/response handling
✅ PostgreSQL persistence
✅ Success/error messages
✅ Responsive gradient UI
✅ CORS enabled for frontend-backend communication
✅ Separate frontend and backend folders
✅ Both applications run independently
✅ Easy-to-use setup scripts

## 🔌 API Endpoints

| Method | Endpoint      | Purpose         | Returns              |
| ------ | ------------- | --------------- | -------------------- |
| POST   | `/api/signup` | Create new user | Success message + ID |
| GET    | `/api/users`  | Get all users   | User array           |

## 🧪 Testing the Application

1. Navigate to **http://localhost:3000**
2. Fill in Name: "John Doe"
3. Fill in Email: "john@example.com"
4. Click "Sign Up"
5. See success message
6. Data saved to PostgreSQL
7. Check **http://localhost:8080/api/users** to verify

## 📋 Checklist for First Run

- [ ] Java JDK 17+ installed
- [ ] Node.js 16+ installed
- [ ] PostgreSQL running
- [ ] Backend runs with `mvn spring-boot:run`
- [ ] Frontend runs with `npm start`
- [ ] Both servers accessible on their ports
- [ ] Form submission successful
- [ ] Success message appears
- [ ] Data saved in database

## ❓ Need Help?

1. **Setup issues?** → See SETUP_GUIDE.md
2. **API questions?** → See API_DOCS.md
3. **Quick overview?** → See README_FULLSTACK.md
4. **Port conflicts?** → Check Troubleshooting in SETUP_GUIDE.md

## 🎯 Next Steps

After setup is working:

1. **Frontend enhancements**:
   - Add more form fields
   - Add client-side validation
   - Add loading states
   - Add error handling UI

2. **Backend enhancements**:
   - Add user authentication
   - Add email verification
   - Add user update/delete endpoints
   - Add input validation

3. **Database**:
   - Add indexes
   - Add constraints
   - Create backup strategy

4. **Deployment**:
   - Build Docker containers
   - Deploy to cloud platform
   - Set up CI/CD pipeline

## 📝 Notes

- CORS is configured for `http://localhost:3000` → update to your production domain
- Database credentials are in `application.properties` → use environment variables in production
- Frontend proxy is configured in `package.json` → change for different backend URL

---

**Ready to get started?** Go to [SETUP_GUIDE.md](SETUP_GUIDE.md)! 🚀
