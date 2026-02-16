# API Documentation

## Overview

This is a REST API for managing user signups. The API is built with Spring Boot and uses PostgreSQL for persistence.

## Base URL

```
http://localhost:8080/api
```

## Authentication

Currently, no authentication is required.

## Endpoints

### 1. Create User (Signup)

Create a new user account with name and email.

**Request:**

```
POST /api/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com"
}
```

**Response (201 Created):**

```json
{
  "message": "Signup successful! Welcome John Doe",
  "id": "1"
}
```

**Error Response (400 Bad Request):**

```json
{
  "message": "Error during signup: [error details]"
}
```

### 2. Get All Users

Retrieve a list of all registered users.

**Request:**

```
GET /api/users
```

**Response (200 OK):**

```json
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

**Error Response (400 Bad Request):**

```json
{
  "message": "Error fetching users: [error details]"
}
```

## Request/Response Details

### User Object

```json
{
  "id": 1,
  "name": "string",
  "email": "string"
}
```

### Fields

- `id` (number, auto-generated): Unique identifier
- `name` (string, required): User's full name
- `email` (string, required): User's email address

## Status Codes

| Code | Description                             |
| ---- | --------------------------------------- |
| 200  | OK - Request successful                 |
| 201  | Created - Resource created successfully |
| 400  | Bad Request - Invalid request           |
| 500  | Internal Server Error                   |

## CORS

The API has CORS enabled for `http://localhost:3000` to allow cross-origin requests from the React frontend.

## Examples

### Using cURL

```bash
# Create user
curl -X POST http://localhost:8080/api/signup \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"John Doe\",\"email\":\"john@example.com\"}"

# Get all users
curl http://localhost:8080/api/users
```

### Using JavaScript/React

```javascript
// Create user
const response = await fetch("http://localhost:8080/api/signup", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ name: "John Doe", email: "john@example.com" }),
});
const data = await response.json();

// Get all users
const usersResponse = await fetch("http://localhost:8080/api/users");
const users = await usersResponse.json();
```

### Using Postman

1. Create new Request
2. Set method to POST
3. URL: `http://localhost:8080/api/signup`
4. Headers: `Content-Type: application/json`
5. Body (raw JSON):

```json
{
  "name": "John Doe",
  "email": "john@example.com"
}
```

## Error Handling

### Common Errors

**Missing Fields:**

- Ensure both `name` and `email` are provided

**Invalid Email:**

- Check email format

**Database Connection:**

- Verify PostgreSQL is running
- Check connection string in `application.properties`

## Rate Limiting

Currently, no rate limiting is implemented.

## Future Enhancements

- [ ] Add user validation (minimum name length, email format validation)
- [ ] Add delete user endpoint
- [ ] Add update user endpoint
- [ ] Add authentication/authorization
- [ ] Add rate limiting
- [ ] Add API versioning (v1, v2, etc.)
