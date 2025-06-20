# Todo API Documentation

This document describes the CRUD endpoints for the Todo API built with Express.js, Prisma, and PostgreSQL.

## Base URL

```
http://localhost:8000/api/todos
```

## Endpoints

### 1. Get All Todos

**GET** `/api/todos`

Returns all todos ordered by creation date (newest first).

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": "cmc4lhd2d00005amrbtwhtfb2",
      "title": "Setup database",
      "description": "Configure PostgreSQL database connection",
      "completed": true,
      "createdAt": "2025-06-20T09:15:44.869Z",
      "updatedAt": "2025-06-20T09:15:44.869Z"
    }
  ],
  "message": "Todos retrieved successfully",
  "timestamp": "2025-06-20T09:16:09.956Z"
}
```

### 2. Get Todo by ID

**GET** `/api/todos/:id`

Returns a specific todo by its ID.

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "cmc4lhd2d00005amrbtwhtfb2",
    "title": "Setup database",
    "description": "Configure PostgreSQL database connection",
    "completed": true,
    "createdAt": "2025-06-20T09:15:44.869Z",
    "updatedAt": "2025-06-20T09:15:44.869Z"
  },
  "message": "Todo retrieved successfully",
  "timestamp": "2025-06-20T09:16:59.376Z"
}
```

### 3. Create Todo

**POST** `/api/todos`

Creates a new todo.

**Request Body:**

```json
{
  "title": "Todo title (required, 1-255 characters)",
  "description": "Todo description (optional, max 1000 characters)"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "cmc4licxu00005aawguq6t0p4",
    "title": "Test new todo",
    "description": "This is a test todo created via API",
    "completed": false,
    "createdAt": "2025-06-20T09:16:31.361Z",
    "updatedAt": "2025-06-20T09:16:31.361Z"
  },
  "message": "Todo created successfully",
  "timestamp": "2025-06-20T09:16:31.367Z"
}
```

### 4. Update Todo

**PUT** `/api/todos/:id`

Updates an existing todo. At least one field must be provided.

**Request Body:**

```json
{
  "title": "Updated title (optional)",
  "description": "Updated description (optional)",
  "completed": true
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "cmc4licxu00005aawguq6t0p4",
    "title": "Updated test todo",
    "description": "This is a test todo created via API",
    "completed": true,
    "createdAt": "2025-06-20T09:16:31.361Z",
    "updatedAt": "2025-06-20T09:16:39.054Z"
  },
  "message": "Todo updated successfully",
  "timestamp": "2025-06-20T09:16:39.058Z"
}
```

### 5. Toggle Todo Completion

**PATCH** `/api/todos/:id/toggle`

Toggles the completion status of a todo.

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "cmc4licxu00005aawguq6t0p4",
    "title": "Updated test todo",
    "description": "This is a test todo created via API",
    "completed": false,
    "createdAt": "2025-06-20T09:16:31.361Z",
    "updatedAt": "2025-06-20T09:16:52.480Z"
  },
  "message": "Todo completion status toggled successfully",
  "timestamp": "2025-06-20T09:16:52.483Z"
}
```

### 6. Delete Todo

**DELETE** `/api/todos/:id`

Deletes a todo by its ID.

**Response:**

```json
{
  "success": true,
  "data": null,
  "message": "Todo deleted successfully",
  "timestamp": "2025-06-20T09:17:06.015Z"
}
```

## Error Responses

All endpoints return error responses in the following format:

```json
{
  "success": false,
  "message": "Error message",
  "timestamp": "2025-06-20T09:17:06.015Z"
}
```

### Common Status Codes

- `200 OK` - Successful GET, PUT, PATCH requests
- `201 Created` - Successful POST requests
- `400 Bad Request` - Validation errors or malformed requests
- `404 Not Found` - Todo not found
- `500 Internal Server Error` - Server errors

## Example Usage

### Create a todo

```bash
curl -X POST http://localhost:8000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title": "Learn Prisma", "description": "Study Prisma ORM documentation"}'
```

### Get all todos

```bash
curl -X GET http://localhost:8000/api/todos
```

### Update a todo

```bash
curl -X PUT http://localhost:8000/api/todos/YOUR_TODO_ID \
  -H "Content-Type: application/json" \
  -d '{"completed": true}'
```

### Delete a todo

```bash
curl -X DELETE http://localhost:8000/api/todos/YOUR_TODO_ID
```

## Database Schema

The Todo model has the following structure:

```prisma
model Todo {
  id          String   @id @default(cuid())
  title       String
  description String?
  completed   Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@map("todos")
}
```

## Setup Instructions

1. Install dependencies:

   ```bash
   npm install
   ```

2. Set up your PostgreSQL database and update the `DATABASE_URL` in `.env`

3. Run database migration:

   ```bash
   npx prisma migrate dev
   ```

4. (Optional) Seed the database:

   ```bash
   npm run db:seed
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

The API will be available at `http://localhost:8000`.
