# House API Technical Documentation

## Introduction

The House API is a component of a Node.js application designed to manage information about houses. This documentation provides comprehensive information on how to use the House API to interact with house data, including retrieval, creation, updating, and deletion.

## Base URL

All endpoints described in this documentation are relative to the base URL of your application. The base URL for the House API is:

```
http://your-app-base-url/api/houses
```

## Authentication

The House API does not require authentication for public access. However, if you have implemented authentication in your application, ensure that authenticated users have the necessary permissions to perform actions on house data.

## Endpoints

### 1. Get All Houses

- **Endpoint:** `GET /houses`
- **Description:** Retrieves information about all houses.
- **Response:** Returns an array of house objects.

#### Example Request:

```http
GET /api/houses
```

#### Example Response (Success):

```json
HTTP/1.1 200 OK

[
  {
    "_id": "house-id-1",
    "address": "123 Main Street",
    "city": "Calgary",
    "province": "Alberta",
    "postalCode": "T1X 0X0",
    // Other house attributes...
  },
  {
    "_id": "house-id-2",
    "address": "456 Elm Street",
    "city": "Toronto",
    "province": "Ontario",
    "postalCode": "M1Y 2Z1",
    // Other house attributes...
  },
  // More house objects...
]
```

### 2. Get a Specific House by ID

- **Endpoint:** `GET /houses/:id`
- **Description:** Retrieves information about a specific house by its unique ID.
- **Request Parameters:** `id` (string) - The unique identifier of the house.
- **Response:** Returns the house object with the specified ID.

#### Example Request:

```http
GET /api/houses/house-id-1
```

#### Example Response (Success):

```json
HTTP/1.1 200 OK

{
  "_id": "house-id-1",
  "address": "123 Main Street",
  "city": "Calgary",
  "province": "Alberta",
  "postalCode": "T1X 0X0",
  // Other house attributes...
}
```

### 3. Create a New House

- **Endpoint:** `POST /houses`
- **Description:** Creates a new house record.
- **Request Body:** A JSON object representing the new house's attributes.
- **Response:** Returns the newly created house object.

#### Example Request:

```http
POST /api/houses
Content-Type: application/json

{
  "address": "789 Oak Avenue",
  "city": "Vancouver",
  "province": "British Columbia",
  "postalCode": "V6X 1B1",
  // Other house attributes...
}
```

#### Example Response (Success):

```json
HTTP/1.1 201 Created

{
  "_id": "new-house-id",
  "address": "789 Oak Avenue",
  "city": "Vancouver",
  "province": "British Columbia",
  "postalCode": "V6X 1B1",
  // Other house attributes...
}
```

### 4. Update a House by ID

- **Endpoint:** `PUT /houses/:id`
- **Description:** Updates an existing house by its unique ID.
- **Request Parameters:** `id` (string) - The unique identifier of the house to be updated.
- **Request Body:** A JSON object containing the updated house attributes.
- **Response:** Returns a message confirming the update and the updated house object.

#### Example Request:

```http
PUT /api/houses/house-id-1
Content-Type: application/json

{
  "address": "456 New Address",
  // Other updated house attributes...
}
```

#### Example Response (Success):

```json
HTTP/1.1 200 OK

{
  "message": "House with ID house-id-1 updated successfully.",
  "updatedHouse": {
    "_id": "house-id-1",
    "address": "456 New Address",
    // Other updated house attributes...
  }
}
```

### 5. Delete a House by ID

- **Endpoint:** `DELETE /houses/:id`
- **Description:** Deletes an existing house by its unique ID.
- **Request Parameters:** `id` (string) - The unique identifier of the house to be deleted.
- **Response:** Returns a message confirming the deletion.

#### Example Request:

```http
DELETE /api/houses/house-id-2
```

#### Example Response (Success):

```json
HTTP/1.1 200 OK

{
  "message": "House with ID house-id-2 deleted successfully."
}
```

## Error Handling

The API returns appropriate HTTP status codes and JSON response bodies for various scenarios, including successful requests and errors. Ensure that your client application handles these responses and provides appropriate feedback to users.

## Conclusion

This technical documentation provides an overview of the House API's endpoints and how to use them to manage house data. Be sure to include proper error handling and security measures when integrating this API into your application.