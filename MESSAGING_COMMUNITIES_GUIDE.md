# TalentHub - Messaging & Community Creation Features

## 📋 New Features Overview

This update adds powerful community messaging and custom community creation capabilities to TalentHub.

### ✨ Features Added

1. **💬 Community Messaging System**
   - Real-time messaging between community members
   - Filter messages by community
   - Message history and timestamps
   - Community-specific discussions

2. **➕ Create Community Button**
   - One-click community creation form
   - Custom community categories
   - Community description
   - Save communities to backend

3. **👤 Enhanced User Menu**
   - Dropdown menu instead of single logout button
   - Profile option
   - Better user interaction

---

## 🎯 Frontend Components Created

### 1. Messaging Component

**Location:** `frontend/src/components/Messaging.js`

Features:

- Modal-based messaging interface
- Community filtering sidebar
- Real-time message display
- Message input form
- Automatic backend integration

```javascript
// Usage in App.js
<Messaging
  isOpen={isMessagingOpen}
  onClose={() => setIsMessagingOpen(false)}
  user={user}
/>
```

### 2. CreateCommunity Component

**Location:** `frontend/src/components/CreateCommunity.js`

Features:

- Modal-based form
- Community name input
- Description textarea
- Category dropdown
- Form validation
- Backend API integration

```javascript
// Usage in App.js
<CreateCommunity
  isOpen={isCreateCommunityOpen}
  onClose={() => setIsCreateCommunityOpen(false)}
  onCommunityCreated={handleCommunityCreated}
/>
```

### 3. Updated Header Component

**Location:** `frontend/src/components/Header.js`

New Features:

- **Messaging Button:** 💬 icon with unread message badge
- **Create Community Button:** ➕ Create Community button
- **User Dropdown:** Profile and Logout options
- Shows messaging and create buttons only when user is logged in

---

## 🔌 Backend Endpoints Created

### Community Endpoints

#### 1. Create Community

```
POST /api/communities
Headers: Content-Type: application/json
Body: {
  "name": "Python Developers",
  "description": "Community for Python enthusiasts",
  "category": "IT"
}
Response: CommunityDTO
```

#### 2. Get All Communities

```
GET /api/communities
Response: List<CommunityDTO>
```

#### 3. Get Community by Category

```
GET /api/communities/category/{category}
Response: List<CommunityDTO>
```

#### 4. Get Community by ID

```
GET /api/communities/{id}
Response: CommunityDTO
```

#### 5. Update Community

```
PUT /api/communities/{id}
Headers: Content-Type: application/json
Body: CommunityDTO
Response: CommunityDTO
```

#### 6. Delete Community (Soft Delete)

```
DELETE /api/communities/{id}
Response: Success message
```

### Message Endpoints

#### 1. Create Message

```
POST /api/messages
Headers: Content-Type: application/json
Body: {
  "communityId": 1,
  "senderId": 1,
  "senderName": "John Doe",
  "messageText": "Hello everyone!"
}
Response: CommunityMessageDTO
```

#### 2. Get All Messages

```
GET /api/messages
Response: List<CommunityMessageDTO>
```

#### 3. Get Messages by Community

```
GET /api/messages/community/{communityId}
Response: List<CommunityMessageDTO>
```

#### 4. Get Messages by Sender

```
GET /api/messages/sender/{senderId}
Response: List<CommunityMessageDTO>
```

#### 5. Delete Message

```
DELETE /api/messages/{id}
Response: Success message
```

---

## 🏗️ Backend Files Created

### Entities

#### Community.java

```
Location: src/main/java/com/codewith/firstApp/models/Community.java

Fields:
- id: Long (Primary Key)
- name: String (unique, max 100 chars)
- description: String (TEXT)
- category: String
- createdBy: Long (User ID)
- createdAt: LocalDateTime
- memberCount: Long
- isActive: Boolean
```

#### CommunityMessage.java

```
Location: src/main/java/com/codewith/firstApp/models/CommunityMessage.java

Fields:
- id: Long (Primary Key)
- communityId: Long
- senderId: Long
- senderName: String
- messageText: String (TEXT)
- sentAt: LocalDateTime
- isEdited: Boolean
```

### Repositories

#### CommunityRepository.java

```
Location: src/main/java/com/codewith/firstApp/repositories/CommunityRepository.java

Methods:
- findByIsActiveTrue()
- findByCategoryAndIsActiveTrue(String category)
- findByNameAndIsActiveTrue(String name)
- findByCreatedByAndIsActiveTrue(Long createdBy)
```

#### CommunityMessageRepository.java

```
Location: src/main/java/com/codewith/firstApp/repositories/CommunityMessageRepository.java

Methods:
- findByCommunityIdOrderBySentAtDesc(Long communityId)
- findBySenderIdOrderBySentAtDesc(Long senderId)
- findAllByOrderBySentAtDesc()
```

### DTOs

#### CommunityDTO.java

```
Location: src/main/java/com/codewith/firstApp/dtos/CommunityDTO.java
```

#### CommunityMessageDTO.java

```
Location: src/main/java/com/codewith/firstApp/dtos/CommunityMessageDTO.java
```

### Controllers

#### CommunityController.java

```
Location: src/main/java/com/codewith/firstApp/controllers/CommunityController.java

Endpoints:
- POST   /api/communities
- GET    /api/communities
- GET    /api/communities/{id}
- GET    /api/communities/category/{category}
- PUT    /api/communities/{id}
- DELETE /api/communities/{id}
```

#### CommunityMessageController.java

```
Location: src/main/java/com/codewith/firstApp/controllers/CommunityMessageController.java

Endpoints:
- POST   /api/messages
- GET    /api/messages
- GET    /api/messages/community/{communityId}
- GET    /api/messages/sender/{senderId}
- DELETE /api/messages/{id}
```

---

## 📊 Database Schema

### Communities Table

```sql
CREATE TABLE communities (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT NOT NULL,
    category VARCHAR(50) NOT NULL,
    created_by BIGINT NOT NULL,
    created_at TIMESTAMP NOT NULL,
    member_count BIGINT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE
);
```

### Community Messages Table

```sql
CREATE TABLE community_messages (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    community_id BIGINT NOT NULL,
    sender_id BIGINT NOT NULL,
    sender_name VARCHAR(100) NOT NULL,
    message_text TEXT NOT NULL,
    sent_at TIMESTAMP NOT NULL,
    is_edited BOOLEAN DEFAULT FALSE
);
```

---

## 🎨 UI/UX Updates

### Header Changes

- **Messaging Button:** Shows 💬 icon with red badge for unread messages
- **Create Community Button:** Shows ➕ icon with text
- **User Menu:** Dropdown with Profile and Logout options
- Both buttons only visible when user is logged in

### Messaging Modal

- Large modal window (900px wide)
- Community filter sidebar on left
- Messages list in center
- Message input at bottom
- Responsive design

### Create Community Modal

- Centered modal (500px wide)
- Form with validation
- Character counters for inputs
- Category dropdown
- Cancel and Create buttons

---

## 🔄 Data Flow

### Creating a Community

```
User clicks "Create Community" Button
    ↓
CreateCommunity Modal Opens
    ↓
User fills form (name, category, description)
    ↓
User clicks "Create Community"
    ↓
Frontend validates form
    ↓
Send POST to /api/communities
    ↓
Backend saves to database
    ↓
Returns CommunityDTO
    ↓
Frontend updates communities list
    ↓
Modal closes, success message shown
```

### Sending a Message

```
User clicks 💬 icon in header
    ↓
Messaging Modal Opens
    ↓
User selects community filter (optional)
    ↓
User types message in input box
    ↓
User clicks "Send"
    ↓
Frontend validates message
    ↓
Send POST to /api/messages
    ↓
Backend saves to database
    ↓
Returns CommunityMessageDTO
    ↓
Frontend adds message to list
    ↓
Input box clears
```

---

## 🚀 How to Use

### 1. Start Backend

```bash
# Make sure you have Java 8+ and Maven installed
cd SpringBoot-Java
mvn clean install
mvn spring-boot:run
```

The backend starts on `http://localhost:8080`

### 2. Start Frontend

```bash
# In new terminal
cd SpringBoot-Java/frontend
npm install
npm start
```

The frontend starts on `http://localhost:3000`

### 3. Test Features

#### Create Community

1. Login to your account
2. Click "➕ Create Community" in header
3. Fill in community details
4. Click "Create Community"
5. Navigate to Community page to see new community

#### Send Message

1. Click 💬 icon in header (after login)
2. Select a community from sidebar
3. Type your message
4. Click "Send"
5. Message appears in the list

---

## 💾 State Management

### App.js State

```javascript
const [communities, setCommunities] = useState([]);
const [isMessagingOpen, setIsMessagingOpen] = useState(false);
const [isCreateCommunityOpen, setIsCreateCommunityOpen] = useState(false);
const [unreadMessages, setUnreadMessages] = useState(3);
```

### Props Passed to Components

```javascript
// Header
<Header
  user={user}
  onNavigate={handleNavigate}
  onLogout={handleLogout}
  onOpenMessaging={() => setIsMessagingOpen(true)}
  onOpenCreateCommunity={() => setIsCreateCommunityOpen(true)}
  unreadMessages={unreadMessages}
/>
```

---

## 🔐 Security Considerations

### Current Implementation

- JWT token stored in localStorage
- Backend validates token for protected endpoints
- Soft delete for communities (data not permanently removed)

### Future Enhancements

- Extract userId from JWT token in backend
- Implement message permissions (only community members can message)
- Add rate limiting for message creation
- Implement message moderation

---

## 📝 Example Usage

### Create Community Request

```json
POST /api/communities
{
  "name": "Web Development Experts",
  "description": "A community for advanced web developers to share knowledge",
  "category": "IT"
}
```

### Send Message Request

```json
POST /api/messages
{
  "communityId": 1,
  "senderId": 5,
  "senderName": "Alice Johnson",
  "messageText": "Anyone working on React Native projects?"
}
```

---

## 🐛 Troubleshooting

### Issue: Communities not saving

**Solution:** Check backend is running on port 8080 and database is connected

### Issue: Messages not showing

**Solution:** Ensure `/api/messages` endpoint is accessible

### Issue: Modal not opening

**Solution:** Check browser console for errors, ensure functions are passed correctly

### Issue: Button not visible

**Solution:** Make sure you're logged in, buttons only show for authenticated users

---

## 📚 Files Modified

### Frontend

- `App.js` - Added messaging and community state
- `Header.js` - Added messaging button and create community button
- `Header.css` - Added styles for new buttons and dropdown
- `Community.js` - Updated to accept communities prop

### Backend

- New files created for entities, repositories, DTOs, controllers
- No modifications to existing files

---

## 🎯 Next Steps

1. **Enhanced Messaging**
   - Real-time WebSocket support
   - Message reactions/emojis
   - Message threads/replies

2. **Community Management**
   - Community moderation tools
   - Member management
   - Community roles (admin, moderator, member)

3. **Search & Discovery**
   - Search communities by name
   - Search messages
   - Trending communities

4. **Notifications**
   - New message notifications
   - Community invitation notifications
   - Email notifications

---

## ✅ Testing Checklist

- [ ] Create community successfully
- [ ] View created community in list
- [ ] Send message in different communities
- [ ] Filter messages by community
- [ ] Delete message (if implemented)
- [ ] Test on mobile/responsive view
- [ ] Test logout and login flow
- [ ] Verify backend data persistence

---

**Your TalentHub now has full messaging and community creation capabilities! 🚀**
