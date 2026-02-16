# Authentication & Login Feature Guide

## Overview

The application now includes a complete authentication system with login, signup, and user dashboard features.

## Features

✅ **User Signup** - Create new accounts with name, email, and password
✅ **User Login** - Authenticate with email and password  
✅ **Password Security** - Passwords are bcrypt encrypted
✅ **JWT Authentication** - Secure token-based authentication
✅ **User Dashboard** - View logged-in user profile and all registered users
✅ **Session Persistence** - Users stay logged in even after page refresh
✅ **Logout** - Securely logout and clear session

## Frontend Structure

### Pages

- **Login Page** (`LoginForm.js`) - Email/password login form
- **Signup Page** (`SignupForm.js`) - Registration with name, email, password
- **Dashboard** (`Dashboard.js`) - User profile and users list after login

### Services

- **authService.js** - Handles all API communication:
  - `signup()` - User registration
  - `login()` - User authentication
  - `getCurrentUser()` - Get active user info
  - `getAllUsers()` - Fetch all registered users
  - `logout()` - Clear session
  - `isAuthenticated()` - Check authentication status
  - `setAuthData()` - Store token and user in localStorage
  - `getStoredUser()` - Retrieve cached user info

## Backend API Endpoints

### Authentication Endpoints

#### 1. User Signup

```bash
POST /api/auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}

Response (201 Created):
{
  "token": "eyJhbGc...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  },
  "message": "Signup successful!"
}
```

#### 2. User Login

```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}

Response (200 OK):
{
  "token": "eyJhbGc...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  },
  "message": "Login successful!"
}
```

#### 3. Get Current User

```bash
GET /api/auth/me
Authorization: Bearer {token}

Response (200 OK):
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com"
}
```

### User Endpoints

#### Get All Users

```bash
GET /api/users

Response (200 OK):
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  },
  {
    "id": 2,
    "name": "Jane Smith",
    "email": "jane@example.com"
  }
]
```

## Database Schema

### Person Table (Updated)

```sql
CREATE TABLE person (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);
```

## User Flow

### Registration Flow

1. User clicks "Sign Up"
2. Fills in name, email, password, confirm password
3. Frontend validates:
   - Passwords match
   - Password at least 6 characters
4. Sends POST to `/api/auth/signup`
5. Backend:
   - Checks if email already exists
   - Encrypts password with BCrypt
   - Saves user to database
   - Generates JWT token
   - Returns token + user data
6. Frontend stores token and user in localStorage
7. Redirects to Dashboard

### Login Flow

1. User enters email and password
2. Sends POST to `/api/auth/login`
3. Backend:
   - Finds user by email
   - Verifies password with BCrypt
   - Generates JWT token
   - Returns token + user data
4. Frontend stores authentication data
5. Shows Dashboard with user info and all users

### Session Persistence

1. On app load, checks if token exists in localStorage
2. If token found, loads user data
3. Restores authenticated state automatically
4. User can refresh page without logging in again

### Logout Flow

1. User clicks "Logout" button
2. Frontend removes token and user data from localStorage
3. Redirects to Login page

## Security Features

### Password Encryption

- Uses **BCrypt** with Spring Security
- Passwords never stored in plain text
- Strength: 10 rounds of hashing

### JWT Tokens

- **Algorithm**: HS512 (HMAC SHA-512)
- **Expiration**: 24 hours
- **Storage**: Browser localStorage
- **Transmission**: Authorization header with "Bearer" prefix

### CORS

- Frontend: `http://localhost:3000`
- Backend: Allows cross-origin requests from frontend

## Error Handling

### Invalid Credentials

```json
{
  "message": "Invalid email or password"
}
Status: 401 Unauthorized
```

### User Already Exists

```json
{
  "message": "User with this email already exists"
}
Status: 400 Bad Request
```

### Password Mismatch (Frontend)

```json
{
  "message": "Passwords do not match"
}
```

### Weak Password (Frontend)

```json
{
  "message": "Password must be at least 6 characters"
}
```

## Testing with Postman

### 1. Sign Up

- Method: POST
- URL: `http://localhost:8080/api/auth/signup`
- Body:

```json
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123"
}
```

### 2. Login

- Method: POST
- URL: `http://localhost:8080/api/auth/login`
- Body:

```json
{
  "email": "test@example.com",
  "password": "password123"
}
```

### 3. Get Current User

- Method: GET
- URL: `http://localhost:8080/api/auth/me`
- Headers: `Authorization: Bearer {token_from_login}`

### 4. Get All Users

- Method: GET
- URL: `http://localhost:8080/api/users`

## Configuration

### JWT Secret Key

Located in: `JwtTokenProvider.java`

```java
private static final String SECRET_KEY = "your-super-secret-key-change-this-in-production-at-least-32-characters-long";
```

⚠️ **Important**: Change this key in production!

### Token Expiration

```java
private static final long EXPIRATION_TIME = 86400000; // 24 hours
```

## Frontend Environment Variables

File: `frontend/.env`

```
REACT_APP_API_BASE_URL=http://localhost:8080/api
REACT_APP_BACKEND_URL=http://localhost:8080
```

## Next Steps

1. **Email Verification** - Send confirmation email on signup
2. **Password Reset** - Allow users to reset forgotten passwords
3. **Refresh Tokens** - Implement long-lived refresh tokens
4. **Role-Based Access** - Add user roles (admin, user, etc.)
5. **User Profile Edit** - Allow users to update their profile
6. **User Delete** - Let users delete their accounts
7. **Activity Logging** - Track user login/logout activity

## Troubleshooting

### "Invalid Token" Error

- Token may have expired (24 hours)
- Clear localStorage and login again

### "User Not Found"

- User was deleted from database
- Clear localStorage and signup again

### Password Doesn't Match

- Check caps lock
- Ensure no extra spaces
- Minimum 6 characters required

### CORS Errors

- Confirm frontend running on `http://localhost:3000`
- Check @CrossOrigin annotation in controllers
- Clear browser cache

## Security Checklist

- [ ] Change JWT secret key in production
- [ ] Use HTTPS in production (not HTTP)
- [ ] Store JWT token securely (consider HttpOnly cookies)
- [ ] Add rate limiting to login attempts
- [ ] Implement password strength requirements
- [ ] Add email verification on signup
- [ ] Log authentication attempts
- [ ] Implement refresh token mechanism
- [ ] Add user password change endpoint
- [ ] Implement account lockout after failed attempts
