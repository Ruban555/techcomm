# TalentHub Quick Start Guide

## 🚀 Getting Started

### Prerequisites

- Node.js and npm installed
- Java 8+ and Maven installed
- Spring Boot running on port 8080
- React running on port 3000

### Step 1: Start the Backend

```bash
# Navigate to project root
cd SpringBoot-Java

# Run Spring Boot
mvn spring-boot:run

# Or use the batch file (Windows)
run-all.bat
```

The backend will start on `http://localhost:8080`

### Step 2: Start the Frontend

```bash
# In a new terminal, navigate to frontend
cd SpringBoot-Java/frontend

# Install dependencies (first time only)
npm install

# Start the development server
npm start
```

The frontend will start on `http://localhost:3000`

---

## 📱 Site Navigation

### Header Navigation Menu

```
┌─ TalentHub ─────────────────────────────────────────────────── 👤 Username ─┐
│                                                                      [Logout]  │
│  [Home]  [Community]  [News]  [About]                                        │
└────────────────────────────────────────────────────────────────────────────┘
```

### Site Pages

#### 1️⃣ **Home Page** (`/`)

- **What you see:**
  - Hero section with welcome message
  - 4 featured communities overview
  - Benefits of joining TalentHub

- **Actions:**
  - Click "Join Community" to view communities
  - Browse without login

#### 2️⃣ **Community Page** (`/community`)

- **What you see:**
  - Professional communities sorted by industry
  - Job listings for each community
  - Discussion forums

- **Communities Available:**
  - 💻 **IT Community** - 1,250+ members
  - 🎨 **Designer Community** - 850+ members
  - 📱 **Marketing Community** - 620+ members
  - 💼 **Business Community** - 940+ members

- **Features:**
  - Job listings with salary info
  - Posted dates
  - Discussion topics
  - Member counts

#### 3️⃣ **News Page** (`/news`)

- **What you see:**
  - Featured news article
  - Grid of recent news
  - Trending topics sidebar

- **Features:**
  - News categorized by community
  - Read time estimates
  - Newsletter subscription
  - Topic filtering

#### 4️⃣ **About Page** (`/about`)

- **What you see:**
  - Company mission and vision
  - Team members
  - Core values
  - Contact information
  - Impact statistics

---

## 🔐 Authentication

### Logging In

1. Click **Login** in the header (top right)
2. Enter your email and password
3. Click **Login** button
4. You'll be redirected to Home page with your name in header

### Signing Up

1. On the Login page, click **"Sign Up"** link
2. Enter your name, email, and password
3. Click **Sign Up** button
4. You'll be logged in automatically

### Logging Out

1. Click **Logout** button in header (appears when logged in)
2. You'll be returned to Home page
3. Header will show **Login** button again

---

## 🎨 UI Features

### Header Highlights

- ✅ Persistent navigation across all pages
- ✅ Active page indicator (highlighted)
- ✅ User greeting when logged in
- ✅ One-click logout
- ✅ Responsive design (collapses on mobile)

### Community Cards

- Show community icon
- Display member count
- Provide description
- "Join Community" button

### Job Listings

- Job title
- Company name
- Salary range
- Posted date
- "View Details" button

### News Articles

- Featured article section
- Article grid layout
- Category badges
- Read time estimates

---

## 💻 Modern Design Elements

### Color Scheme

- **Primary Purple:** #667eea
- **Secondary Purple:** #764ba2
- **Background:** #f8f9fa
- **White Cards:** For content sections

### Typography

- **Headers:** Bold, large fonts
- **Body Text:** Clear, readable
- **Links:** Purple with underline

### Animations

- Hover effects on buttons
- Card elevation on hover
- Smooth fade-in transitions
- Active state indicators

---

## 📱 Mobile Responsive Features

✅ **Desktop View:**

- Full navigation menu
- 2-column layouts
- Sidebar support

✅ **Tablet View:**

- Adjusted font sizes
- Single column layouts
- Collapsible menu

✅ **Mobile View:**

- Vertical navigation
- Single column layout
- Touch-friendly buttons
- Full-width content

---

## 🔧 Troubleshooting

### Issue: Page won't load

- **Solution:** Check backend is running (http://localhost:8080)
- **Solution:** Check frontend is running (http://localhost:3000)

### Issue: Login not working

- **Solution:** Verify backend API is accessible
- **Solution:** Check browser console for errors

### Issue: Styling looks broken

- **Solution:** Clear browser cache (Ctrl+Shift+Delete)
- **Solution:** Restart the development server

### Issue: Header not showing

- **Solution:** Make sure Header.js and Header.css are loaded
- **Solution:** Check App.js imports are correct

---

## 🎯 Next Steps

1. **Explore Communities**
   - Navigate to Community page
   - Browse different industries
   - Check job listings

2. **Read News**
   - Go to News page
   - Subscribe to newsletter
   - Find trending topics

3. **Learn About**
   - Visit About page
   - Meet the team
   - Understand the mission

4. **Create Account**
   - Sign up with your email
   - Complete your profile
   - Start networking

---

## 📞 Contact & Support

For questions or support:

- **Email:** hello@talenthub.com
- **Website:** www.talenthub.com
- **Social:** Twitter • LinkedIn • Instagram

---

**Happy networking on TalentHub! 🚀**
