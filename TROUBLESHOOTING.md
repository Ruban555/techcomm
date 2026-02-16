# Troubleshooting & Testing Guide

## 🧪 Pre-Deployment Testing

### Before Starting

- [ ] Java JDK 8+ installed: `java -version`
- [ ] Maven installed: `mvn -version`
- [ ] Node.js installed: `node -v`
- [ ] npm installed: `npm -v`

### Database Verification

**Check if tables exist:**

```bash
# Open MySQL/Database CLI
mysql -u root -p
USE your_database_name;
SHOW TABLES;
```

You should see:

- `communities`
- `community_messages`

**Check column names:**

```sql
DESCRIBE communities;
DESCRIBE community_messages;
```

---

## 🔍 Common Issues & Solutions

### ❌ Issue: "CORS error in browser"

**Error Message:**

```
Access to XMLHttpRequest at 'http://localhost:8080/api/communities'
from origin 'http://localhost:3000' has been blocked by CORS policy
```

**Solutions:**

1. **Check CommunityController has @CrossOrigin:**

```java
@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class CommunityController {
```

2. **Restart Backend** (changes to annotations require restart)

```bash
mvn spring-boot:run
```

3. **Check frontend URL matches:**

```javascript
// Should be exactly this:
fetch("http://localhost:8080/api/communities");
```

---

### ❌ Issue: "404 Not Found" for API endpoints

**Error Message:**

```
{
  "timestamp": "2024-01-15T10:30:00.000+00:00",
  "status": 404,
  "error": "Not Found"
}
```

**Solutions:**

1. **Verify controller exists:**

```bash
ls src/main/java/com/codewith/firstApp/controllers/
```

Should show:

- `CommunityController.java`
- `CommunityMessageController.java`

2. **Check endpoint URL:**

```
POST /api/communities ✓
POST /api/message   ✗ (wrong)
POST /api/Messages  ✗ (case-sensitive)
```

3. **Verify @RequestMapping:**

```java
@RestController
@RequestMapping("/api/communities")  // Must match exactly
public class CommunityController {
```

4. **Rebuild and restart:**

```bash
mvn clean install
mvn spring-boot:run
```

---

### ❌ Issue: "Backend running but frontend can't connect"

**Symptoms:**

- Backend terminal shows requests: `[INFO] GET /api/communities`
- But frontend shows error

**Solutions:**

1. **Check localhost isn't blocking:**

```bash
# In Windows PowerShell
Test-NetConnection localhost -Port 8080
```

2. **Try IP instead of localhost:**

```javascript
// Instead of:
fetch("http://localhost:8080/api/communities");

// Try:
fetch("http://127.0.0.1:8080/api/communities");
```

3. **Check firewall:**

- Windows Firewall might block port 8080
- Add Java to Firewall exceptions

---

### ❌ Issue: "Browser shows 'no messages' but API returns data"

**Symptoms:**

- `GET /api/messages` works in Postman/browser
- But Messaging.js shows empty list

**Solutions:**

1. **Check state update:**

```javascript
const [messages, setMessages] = useState([]);

useEffect(() => {
  fetch("http://localhost:8080/api/messages")
    .then((r) => r.json())
    .then((data) => {
      console.log("Messages:", data); // Add this
      setMessages(data);
    });
}, []);
```

2. **Check console for errors (F12 → Console tab)**

3. **Verify data format matches:**

```javascript
// Expected format:
[
  {
    id: 1,
    communityId: 1,
    senderId: 1,
    senderName: "John",
    messageText: "Hello",
    sentAt: "2024-01-15T10:00:00",
    isEdited: false,
  },
];
```

---

### ❌ Issue: "Form submit doesn't save to database"

**Symptoms:**

- Form submits (no errors)
- Backend logs show nothing
- Data doesn't appear

**Solutions:**

1. **Check backend receives request:**

```java
@PostMapping
public ResponseEntity<?> createCommunity(@RequestBody CommunityDTO dto) {
  System.out.println("Received: " + dto.getName());  // Add logging
  // ...
}
```

2. **Check request body is valid JSON:**

```javascript
// Console the data before sending:
console.log(JSON.stringify(formData));

fetch("...", {
  body: JSON.stringify(formData),
});
```

3. **Check database connection:**

```bash
# In backend logs look for:
[INFO] HikariPool-1 - Starting
# If you don't see this, database isn't connected
```

4. **Check entity mapping:**

```java
@Entity
@Table(name = "communities")  // Must match table name
public class Community {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  // ...
}
```

---

### ❌ Issue: "Unread message count shows but no messages appear"

**Symptoms:**

- Badge shows "3" on messaging button
- But Messaging component shows empty

**Solutions:**

1. **Check selectedCommunity state:**

```javascript
const [selectedCommunity, setSelectedCommunity] = useState("All");
console.log("Selected:", selectedCommunity); // Add logging
```

2. **Verify filter logic:**

```javascript
// Should work:
messages.filter((msg) => msg.community === selectedCommunity);

// Check message object structure:
console.log("Message structure:", messages[0]);
```

3. **Check community ID vs name:**

```javascript
// API returns:
{ id: 1, name: "Python", ... }

// But filter uses:
message.community === 'Python'  // Might be ID instead
```

---

### ❌ Issue: "Database tables not created"

**Symptoms:**

- Backend starts but tables don't appear in database
- Error: "Table 'communities' doesn't exist"

**Solutions:**

1. **Check application.properties:**

```properties
spring.jpa.hibernate.ddl-auto=create  # Must be "create", not "validate"
```

2. **Restart backend after changing configuration**

3. **Check logs for Hibernate activity:**

```
[INFO] HibernateJpaAutoConfiguration : Database has been initialized
[INFO] Hibernate: create table communities
```

4. **Manual table creation (fallback):**

```sql
CREATE TABLE communities (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT NOT NULL,
    category VARCHAR(50) NOT NULL,
    created_by BIGINT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    member_count BIGINT DEFAULT 1,
    is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE community_messages (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    community_id BIGINT NOT NULL,
    sender_id BIGINT NOT NULL,
    sender_name VARCHAR(100) NOT NULL,
    message_text TEXT NOT NULL,
    sent_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    is_edited BOOLEAN DEFAULT FALSE
);
```

---

## 🧪 Testing Workflows

### Test 1: Backend API (No Frontend)

**Objective:** Verify all API endpoints work

```bash
# 1. Start backend only
cd SpringBoot-Java
mvn spring-boot:run
```

```bash
# 2. In another terminal, test each endpoint
# Test create community
curl -X POST http://localhost:8080/api/communities \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","description":"Test","category":"IT"}'

# Should return community with ID (e.g., id: 1)
# Copy this ID for next test

# Test get all communities
curl http://localhost:8080/api/communities
# Should return array with your community

# Test create message (using community ID from above)
curl -X POST http://localhost:8080/api/messages \
  -H "Content-Type: application/json" \
  -d '{"communityId":1,"senderId":1,"senderName":"Test","messageText":"Hello"}'

# Should return message with ID

# Test get messages
curl http://localhost:8080/api/messages
curl http://localhost:8080/api/messages/community/1

# All should work!
```

---

### Test 2: Frontend Components (No Real API)

**Objective:** Verify UI works with mock data

```bash
# 1. Start frontend only (backend can be off)
cd SpringBoot-Java/frontend
npm start
```

**Check:**

- [ ] Header shows messaging button after login
- [ ] Header shows create community button after login
- [ ] Click "Create Community" - modal opens
- [ ] Click messaging button - modal opens
- [ ] Form validation works (try submitting empty form)

---

### Test 3: Full Integration

**Objective:** Verify frontend and backend work together

```bash
# Terminal 1 - Start backend
cd SpringBoot-Java
mvn spring-boot:run

# Terminal 2 - Start frontend
cd SpringBoot-Java/frontend
npm start
```

**Test Sequence:**

1. **Create Community via UI**
   - Login
   - Click "Create Community"
   - Fill form with:
     - Name: "Test Community"
     - Category: "IT"
     - Description: "Testing integration"
   - Click "Create"
   - Check: Success message appears

2. **Verify in Database**
   - Open MySQL CLI
   - `SELECT * FROM communities;`
   - Should see your community

3. **Send Message via UI**
   - Click messaging button
   - Select "Test Community" from sidebar
   - Type: "Integration test message"
   - Click Send
   - Check: Message appears (or error appears)

4. **Verify in Database**
   - `SELECT * FROM community_messages;`
   - Should see your message with correct community_id

---

## 🐛 Debug Mode Setup

### Enable Debug Logging

**File:** `src/main/resources/application.properties`

```properties
# Add these lines:
logging.level.com.codewith.firstApp=DEBUG
logging.level.org.springframework.web=DEBUG
logging.level.org.hibernate.SQL=DEBUG
logging.level.org.hibernate.type.descriptor.sql.BasicBinder=TRACE
```

**Backend logs will now show:**

```
[DEBUG] SQL: insert into communities ...
[DEBUG] SQL: select * from community_messages where ...
```

---

### Browser Developer Tools

**Open DevTools:** Press `F12` or right-click → Inspect

**Tabs to Check:**

1. **Console Tab** - JavaScript errors

```
❌ TypeError: Cannot read property 'communityId' of undefined
✓ If empty, frontend code is OK
```

2. **Network Tab** - API requests

```
✓ Look for:
  POST /api/communities - Status 200, Response shows JSON
  GET /api/messages - Status 200, Response shows array
✗ If Status 404 or 500, API endpoint issue
```

3. **Storage Tab** - JWT token

```
localStorage.authToken
Should contain JWT token (starts with eyJ...)
```

---

## ✅ Validation Checklist

### Before Deploying

- [ ] Can create community via form
- [ ] Community appears in database
- [ ] Can send message via form
- [ ] Message appears in database
- [ ] Message shows in Messaging modal
- [ ] Can filter messages by community
- [ ] Logout and login works
- [ ] No console errors (F12)
- [ ] No 404/500 errors
- [ ] Database inserts work
- [ ] Timestamps are correct
- [ ] Can view old messages after refresh

### Browser Compatibility

Tested on:

- [ ] Chrome 90+
- [ ] Firefox 88+
- [ ] Edge 90+
- [ ] Safari 14+

### Performance

- [ ] Form loads in <1 second
- [ ] Messages load in <2 seconds
- [ ] No memory leaks (DevTools Memory tab)
- [ ] No excessive API calls (Network tab)

---

## 🆘 Emergency Fixes

### If Everything Breaks

```bash
# 1. Clear caches
rm -rf SpringBoot-Java/target
rm -rf SpringBoot-Java/frontend/node_modules
rm -rf SpringBoot-Java/frontend/.cache

# 2. Reinstall
cd SpringBoot-Java/frontend
npm install

# 3. Rebuild
cd SpringBoot-Java
mvn clean install

# 4. Start fresh
# Terminal 1:
mvn spring-boot:run
# Terminal 2:
npm start
```

### If Database Corrupted

```bash
# 1. Drop tables (careful!)
DROP TABLE community_messages;
DROP TABLE communities;

# 2. Backend auto-creates on start
mvn spring-boot:run

# 3. Tables should be created fresh
```

---

## 📞 Getting Help

**Check these in order:**

1. **Console Errors** - F12 → Console tab
2. **Backend Logs** - Terminal where Maven runs
3. **Network Requests** - F12 → Network tab
4. **Database** - MySQL CLI to verify data
5. **API Response** - Postman/curl to test endpoint directly

---

## 🎓 Learning Resources

If integrating JWT extraction or other advanced features:

- Spring Security: https://spring.io/projects/spring-security
- JWT Libraries: jwt.io
- React Hooks: https://react.dev/reference/react/useState
- REST Best Practices: restfulapi.net

---

**Version:** 1.0  
**Last Updated:** 2024-01-15  
**Support Status:** Community-maintained
