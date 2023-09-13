# User API Technical Documentation

## Introduction

The User API is a part of a Node.js application designed to manage user-related functionality, including user registration, authentication, and user management. This technical document provides comprehensive information on how to use the User API.

## Base URL

All endpoints described in this documentation are relative to the base URL of your application. The base URL for the User API is:

```
http://your-app-base-url/api/users
```

## Authentication

The User API uses JSON Web Tokens (JWT) for authentication. To access protected endpoints, clients must include a valid JWT token in the `Authorization` header of their HTTP requests.

## Endpoints

### 1. User Registration

- **Endpoint:** `POST /register`
- **Description:** Allows users to create a new account.
- **Request Body:**
    - `email` (string, required): The user's email address.
    - `password` (string, required): The user's password.

#### Example Request:

```http
POST /api/users/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

#### Example Response (Success):

```json
HTTP/1.1 201 Created

{
  "token": "your-jwt-token"
}
```

### 2. User Login

- **Endpoint:** `POST /login`
- **Description:** Allows users to log in to their existing account.
- **Request Body:**
    - `email` (string, required): The user's email address.
    - `password` (string, required): The user's password.

#### Example Request:

```http
POST /api/users/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

#### Example Response (Success):

```json
HTTP/1.1 200 OK

{
  "token": "your-jwt-token"
}
```

### 3. Update User Information

- **Endpoint:** `PUT /:id`
- **Description:** Allows authenticated users to update their email and password.
- **Request Parameters:**
    - `id` (string, required): The unique identifier of the user to be updated.
- **Request Body:**
    - `email` (string, optional): The updated email address.
    - `password` (string, optional): The updated password.

#### Example Request:

```http
PUT /api/users/12345
Content-Type: application/json
Authorization: Bearer your-jwt-token

{
  "email": "new-email@example.com",
  "password": "newSecurePassword456"
}
```

#### Example Response (Success):

```json
HTTP/1.1 200 OK

{
  "message": "User updated successfully"
}
```

### 4. Delete User

- **Endpoint:** `DELETE /:id`
- **Description:** Allows authenticated users to delete their own account.
- **Request Parameters:**
    - `id` (string, required): The unique identifier of the user to be deleted.

#### Example Request:

```http
DELETE /api/users/12345
Authorization: Bearer your-jwt-token
```

#### Example Response (Success):

```json
HTTP/1.1 200 OK

{
  "message": "User deleted successfully"
}
```

### 5. Get User Information

- **Endpoint:** `GET /:id`
- **Description:** Allows authenticated users to retrieve their own user information.
- **Request Parameters:**
    - `id` (string, required): The unique identifier of the user to be retrieved.

#### Example Request:

```http
GET /api/users/12345
Authorization: Bearer your-jwt-token
```

#### Example Response (Success):

```json
HTTP/1.1 200 OK

{
  "user": {
    "_id": "12345",
    "email": "user@example.com",
    "role": "user",
    "createdAt": "2023-09-13T00:00:00.000Z",
    "updatedAt": "2023-09-13T12:34:56.789Z"
  }
}
```

### 6. Get All Users Information

- **Endpoint:** `GET /`
- **Description:** Allows authenticated admin users to retrieve information about all registered users.

#### Example Request:

```http
GET /api/users/
Authorization: Bearer your-admin-jwt-token
```

#### Example Response (Success):

```json
HTTP/1.1 200 OK

{
  "users": [
    {
      "_id": "12345",
      "email": "user1@example.com",
      "role": "user",
      "createdAt": "2023-09-13T00:00:00.000Z",
      "updatedAt": "2023-09-13T12:34:56.789Z"
    },
    {
      "_id": "67890",
      "email": "user2@example.com",
      "role": "admin",
      "createdAt": "2023-09-14T00:00:00.000Z",
      "updatedAt": "2023-09-14T12:34:56.789Z"
    }
  ]
}
```

## Error Handling

The API returns appropriate HTTP status codes and JSON response bodies for various scenarios, including successful requests and errors. Be sure to check the status code and response body to handle errors gracefully in your client application.

## Conclusion

This technical documentation provides an overview of the User API's endpoints and how to use them for user registration, authentication, and management. Be sure to include proper error handling and security measures when integrating this API into your application.