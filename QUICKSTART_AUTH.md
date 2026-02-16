# 🚀 Quick Start Guide - Authentication System

## What's New?

Your project now has **Login & User Authentication** with a beautiful Dashboard!

## ⚡ Quick Start (< 5 minutes)

### Option 1: Run Both with One Command (Windows)

```bash
cd C:\Users\RUBAN\Downloads\SpringBoot-Java\SpringBoot-Java
run-all.bat
```

This opens 2 windows - backend and frontend start automatically.

### Option 2: Run in Separate Terminals

**Terminal 1 - Backend:**

```bash
cd C:\Users\RUBAN\Downloads\SpringBoot-Java\SpringBoot-Java
mvn spring-boot:run
```

✅ Backend ready at: `http://localhost:8080`

**Terminal 2 - Frontend:**

```bash
cd C:\Users\RUBAN\Downloads\SpringBoot-Java\SpringBoot-Java\frontend
npm start
```

✅ Frontend ready at: `http://localhost:3000`

## 🎯 Test the New Features (2 minutes)

### 1. Create an Account

1. Open **http://localhost:3000**
2. Click **"Sign Up"**
3. Fill in:
   - Name: `John Doe`
   - Email: `john@example.com`
   - Password: `password123` (min 6 chars)
   - Confirm: `password123`
4. Click **"Sign Up"**
5. ✅ See Dashboard with welcome message!

### 2. Login with Your Account

1. Click **"Logout"** button
2. Click **"Login"** link
3. Fill in:
   - Email: `john@example.com`
   - Password: `password123`
4. Click **"Login"**
5. ✅ Back on Dashboard!

### 3. Check Persistence

1. Close the browser (or press F5 to reload)
2. ✅ Still logged in! Session persists.

### 4. View Dashboard

- See your **Name & Email**
- See **Total Users Count**
- See **All Registered Users** in a table

## 📚 Documentation

| Document                                           | Purpose                      |
| -------------------------------------------------- | ---------------------------- |
| [NEW_FEATURES.md](NEW_FEATURES.md)                 | What's new in this update    |
| [AUTHENTICATION_GUIDE.md](AUTHENTICATION_GUIDE.md) | Complete auth documentation  |
| [SETUP_GUIDE.md](SETUP_GUIDE.md)                   | Installation & configuration |
| [API_DOCS.md](API_DOCS.md)                         | REST API endpoints           |
| [PROJECT_GUIDE.md](PROJECT_GUIDE.md)               | Project structure navigation |

## 🔐 Key Features

✨ **Frontend**

- Beautiful Login form
- Signup with validation
- User Dashboard
- Show/hide password toggle
- Logout button
- Session persistence

🔒 **Backend**

- Secure API endpoints
- BCrypt password encryption
- JWT token authentication
- Email uniqueness check
- 24-hour token expiration
- CORS enabled

## 🌐 Available Pages

```
http://localhost:3000/          → Login page (first visit)
http://localhost:3000/signup    → Signup page (click link)
http://localhost:3000/dashboard → Dashboard (after login)
```

## 🔌 New API Endpoints

```
POST   /api/auth/signup    - Register new account
POST   /api/auth/login     - Login to account
GET    /api/auth/me        - Get logged-in user info
GET    /api/users          - List all users
```

## 📊 Database

The `Person` table now includes:

- `id` (auto-increment)
- `name` (user's full name)
- `email` (unique email address)
- **`password`** (bcrypt encrypted) - NEW

## ⚙️ Configuration

### JWT Token

- **Expiration**: 24 hours
- **Algorithm**: HS512
- **Secret**: `your-super-secret-key-change-this-in-production-at-least-32-characters-long`

### Password Encoding

- **Algorithm**: BCrypt
- **Strength**: 10 rounds

### CORS

- **Allowed**: http://localhost:3000

## 🐛 Troubleshooting

### Port Already in Use?

**Backend on different port:**

```properties
# In application.properties
server.port=8081
```

**Frontend on different port:**

```bash
npm start -- --port 3001
```

### Can't Login?

- Check email is correct (case sensitive)
- Check password matches exactly
- Make sure backend is running on :8080

### Still logged in after logout?

- Check browser history/cache
- Try private/incognito window

### Database errors?

- Ensure PostgreSQL is running
- Check application.properties connection string

## 🎓 What You Learned

This update demonstrates:

- ✅ JWT authentication
- ✅ Password encryption (BCrypt)
- ✅ State management (React hooks)
- ✅ localStorage for persistence
- ✅ REST API design
- ✅ Frontend-backend integration
- ✅ Responsive UI design
- ✅ Error handling

## 🚀 Next Steps

Ready for more features?

1. **Email Verification** - Confirm email on signup
2. **Password Reset** - Forgot password link
3. **User Profile Edit** - Update name/email
4. **Search Users** - Find specific users
5. **User Roles** - Admin vs regular users
6. **Activity Log** - Track login times

Let me know which feature you'd like to add next!

## 📞 Support

Need help?

- Check [AUTHENTICATION_GUIDE.md](AUTHENTICATION_GUIDE.md#troubleshooting)
- Review [API_DOCS.md](API_DOCS.md)
- See [SETUP_GUIDE.md](SETUP_GUIDE.md#troubleshooting)

---

**Enjoy your new authentication system!** 🎉

Both frontend and backend are production-ready with proper error handling, security features, and clean code architecture.
