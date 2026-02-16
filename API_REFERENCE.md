# API Reference - Messaging & Communities

## 📌 Base URL

```
http://localhost:8080
```

---

## 👥 Communities API

### 1. Create Community

```
POST /api/communities
```

**Request Body:**

```json
{
  "name": "Python Developers",
  "description": "A community for Python enthusiasts and developers",
  "category": "IT"
}
```

**Response (200):**

```json
{
  "id": 1,
  "name": "Python Developers",
  "description": "A community for Python enthusiasts and developers",
  "category": "IT",
  "createdBy": 1,
  "createdAt": "2024-01-15T10:30:00",
  "memberCount": 1,
  "isActive": true
}
```

**Available Categories:**

- IT
- Design
- Marketing
- Business
- Other

---

### 2. Get All Communities

```
GET /api/communities
```

**Response (200):**

```json
[
  {
    "id": 1,
    "name": "Python Developers",
    "description": "A community for Python enthusiasts...",
    "category": "IT",
    "createdBy": 1,
    "createdAt": "2024-01-15T10:30:00",
    "memberCount": 1,
    "isActive": true
  },
  {
    "id": 2,
    "name": "UI/UX Designers",
    "description": "Welcome designers...",
    "category": "Design",
    "createdBy": 2,
    "createdAt": "2024-01-15T11:00:00",
    "memberCount": 5,
    "isActive": true
  }
]
```

---

### 3. Get Communities by Category

```
GET /api/communities/category/{category}
```

**Example:**

```
GET /api/communities/category/IT
```

**Response (200):**

```json
[
  {
    "id": 1,
    "name": "Python Developers",
    ...
  },
  {
    "id": 3,
    "name": "React Experts",
    ...
  }
]
```

---

### 4. Get Community by ID

```
GET /api/communities/{id}
```

**Example:**

```
GET /api/communities/1
```

**Response (200):**

```json
{
  "id": 1,
  "name": "Python Developers",
  "description": "A community for Python enthusiasts...",
  "category": "IT",
  "createdBy": 1,
  "createdAt": "2024-01-15T10:30:00",
  "memberCount": 1,
  "isActive": true
}
```

**Response (404):**

```json
{
  "error": "Community not found"
}
```

---

### 5. Update Community

```
PUT /api/communities/{id}
```

**Request Body:**

```json
{
  "name": "Python & JavaScript Developers",
  "description": "Updated description",
  "category": "IT",
  "memberCount": 10
}
```

**Response (200):**

```json
{
  "id": 1,
  "name": "Python & JavaScript Developers",
  "description": "Updated description",
  "category": "IT",
  "createdBy": 1,
  "createdAt": "2024-01-15T10:30:00",
  "memberCount": 10,
  "isActive": true
}
```

---

### 6. Delete Community (Soft Delete)

```
DELETE /api/communities/{id}
```

**Response (200):**

```json
{
  "message": "Community deleted successfully",
  "id": 1
}
```

**Note:** Community is marked as inactive (isActive = false) but data remains in database

---

## 💬 Messages API

### 1. Create Message

```
POST /api/messages
```

**Request Body:**

```json
{
  "communityId": 1,
  "senderId": 5,
  "senderName": "Alice Johnson",
  "messageText": "Anyone working on Django projects?"
}
```

**Response (200):**

```json
{
  "id": 1,
  "communityId": 1,
  "senderId": 5,
  "senderName": "Alice Johnson",
  "messageText": "Anyone working on Django projects?",
  "sentAt": "2024-01-15T14:25:30",
  "isEdited": false
}
```

---

### 2. Get All Messages

```
GET /api/messages
```

**Response (200):**

```json
[
  {
    "id": 3,
    "communityId": 1,
    "senderId": 5,
    "senderName": "Alice Johnson",
    "messageText": "Anyone working on Django projects?",
    "sentAt": "2024-01-15T14:25:30",
    "isEdited": false
  },
  {
    "id": 2,
    "communityId": 1,
    "senderId": 3,
    "senderName": "Bob Smith",
    "messageText": "I'm using Flask",
    "sentAt": "2024-01-15T14:20:15",
    "isEdited": false
  }
]
```

**Note:** Messages are ordered by newest first (sentAt DESC)

---

### 3. Get Messages by Community

```
GET /api/messages/community/{communityId}
```

**Example:**

```
GET /api/messages/community/1
```

**Response (200):**

```json
[
  {
    "id": 3,
    "communityId": 1,
    "senderId": 5,
    "senderName": "Alice Johnson",
    "messageText": "Anyone working on Django projects?",
    "sentAt": "2024-01-15T14:25:30",
    "isEdited": false
  }
]
```

**Note:** Only returns messages from specified community, ordered newest first

---

### 4. Get Messages by Sender

```
GET /api/messages/sender/{senderId}
```

**Example:**

```
GET /api/messages/sender/5
```

**Response (200):**

```json
[
  {
    "id": 5,
    "communityId": 2,
    "senderId": 5,
    "senderName": "Alice Johnson",
    "messageText": "Great design work!",
    "sentAt": "2024-01-15T15:00:00",
    "isEdited": false
  },
  {
    "id": 3,
    "communityId": 1,
    "senderId": 5,
    "senderName": "Alice Johnson",
    "messageText": "Anyone working on Django projects?",
    "sentAt": "2024-01-15T14:25:30",
    "isEdited": false
  }
]
```

**Note:** Returns all messages from specified sender, ordered newest first

---

### 5. Delete Message

```
DELETE /api/messages/{id}
```

**Example:**

```
DELETE /api/messages/3
```

**Response (200):**

```json
{
  "message": "Message deleted successfully",
  "id": 3
}
```

**Response (404):**

```json
{
  "error": "Message not found"
}
```

---

## 🔒 Authentication

**Currently:** All endpoints are public (⚠️ TODO: Add JWT protection)

**Future:** Add JWT header:

```
Headers: {
  "Authorization": "Bearer {jwt_token}"
}
```

---

## 📊 Field Specifications

### Community Fields

| Field       | Type          | Max Length | Required | Notes                                  |
| ----------- | ------------- | ---------- | -------- | -------------------------------------- |
| id          | Long          | -          | Auto     | Auto-generated                         |
| name        | String        | 100        | Yes      | Must be unique                         |
| description | String        | -          | Yes      | Can contain any text                   |
| category    | String        | 50         | Yes      | IT, Design, Marketing, Business, Other |
| createdBy   | Long          | -          | Yes      | User ID                                |
| createdAt   | LocalDateTime | -          | Auto     | Current timestamp                      |
| memberCount | Long          | -          | No       | Default: 0                             |
| isActive    | Boolean       | -          | Auto     | Default: true                          |

### Message Fields

| Field       | Type          | Max Length | Required | Notes                             |
| ----------- | ------------- | ---------- | -------- | --------------------------------- |
| id          | Long          | -          | Auto     | Auto-generated                    |
| communityId | Long          | -          | Yes      | Must reference existing community |
| senderId    | Long          | -          | Yes      | User ID                           |
| senderName  | String        | 100        | Yes      | Display name                      |
| messageText | String        | -          | Yes      | Can contain any text              |
| sentAt      | LocalDateTime | -          | Auto     | Current timestamp                 |
| isEdited    | Boolean       | -          | Auto     | Default: false                    |

---

## 🧪 Example cURL Requests

### Create Community

```bash
curl -X POST http://localhost:8080/api/communities \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Web Development",
    "description": "Learn web development with others",
    "category": "IT"
  }'
```

### Get All Communities

```bash
curl http://localhost:8080/api/communities
```

### Create Message

```bash
curl -X POST http://localhost:8080/api/messages \
  -H "Content-Type: application/json" \
  -d '{
    "communityId": 1,
    "senderId": 1,
    "senderName": "John Doe",
    "messageText": "Hello everyone!"
  }'
```

### Get Community 1 Messages

```bash
curl http://localhost:8080/api/messages/community/1
```

### Delete Message 1

```bash
curl -X DELETE http://localhost:8080/api/messages/1
```

---

## ⚠️ Error Responses

### 400 Bad Request

```json
{
  "error": "Invalid request data",
  "details": "Field validation failed"
}
```

### 404 Not Found

```json
{
  "error": "Resource not found"
}
```

### 500 Internal Server Error

```json
{
  "error": "An error occurred while processing your request",
  "message": "..."
}
```

---

## 🔄 HTTP Status Codes

| Code | Meaning                            |
| ---- | ---------------------------------- |
| 200  | OK - Request successful            |
| 201  | Created - Resource created         |
| 400  | Bad Request - Invalid data         |
| 404  | Not Found - Resource doesn't exist |
| 500  | Server Error - Internal error      |

---

## 🚀 Quick Reference

**Create Community:**

```
POST http://localhost:8080/api/communities
Body: { name, description, category }
```

**Send Message:**

```
POST http://localhost:8080/api/messages
Body: { communityId, senderId, senderName, messageText }
```

**Get Messages in Community:**

```
GET http://localhost:8080/api/messages/community/{communityId}
```

**List All Communities:**

```
GET http://localhost:8080/api/communities
```

---

**Version:** 1.0  
**Last Updated:** 2024-01-15  
**Status:** Ready for Integration Testing
