# Error Handling System

This backend application includes a comprehensive error handling system with dedicated error endpoints for testing and debugging purposes.

## Error Endpoints

The following endpoints are available for testing different error scenarios:

### Status Endpoint

- `GET /error/status` - Returns information about available error endpoints and error handling status

### Error Testing Endpoints

- `GET /error/500` - Triggers a 500 Internal Server Error
- `GET /error/400` - Triggers a 400 Bad Request (Validation Error)
- `GET /error/401` - Triggers a 401 Unauthorized Error
- `GET /error/403` - Triggers a 403 Forbidden Error
- `GET /error/408` - Triggers a 408 Request Timeout Error
- `GET /error/async` - Triggers an async operation error
- `GET /error/database` - Triggers a database connection error (503)

## Error Response Format

All errors follow a consistent response format:

```json
{
  "success": false,
  "error": {
    "message": "Error description",
    "code": "ERROR_CODE",
    "statusCode": 500,
    "timestamp": "2025-06-20T10:30:00.000Z",
    "path": "/error/500",
    "method": "GET",
    "stack": "Error stack trace (development only)"
  }
}
```

## Success Response Format

All successful responses follow this format:

```json
{
  "success": true,
  "data": {
    // Response data
  },
  "message": "Optional success message",
  "timestamp": "2025-06-20T10:30:00.000Z"
}
```

## Error Codes

The system uses predefined error codes for consistent error handling:

### Client Errors (4xx)

- `BAD_REQUEST` - 400
- `UNAUTHORIZED` - 401
- `FORBIDDEN` - 403
- `NOT_FOUND` - 404
- `METHOD_NOT_ALLOWED` - 405
- `REQUEST_TIMEOUT` - 408
- `CONFLICT` - 409
- `VALIDATION_ERROR` - 400
- `RATE_LIMIT_EXCEEDED` - 429

### Server Errors (5xx)

- `INTERNAL_SERVER_ERROR` - 500
- `NOT_IMPLEMENTED` - 501
- `BAD_GATEWAY` - 502
- `SERVICE_UNAVAILABLE` - 503
- `GATEWAY_TIMEOUT` - 504
- `DATABASE_ERROR` - 503
- `EXTERNAL_SERVICE_ERROR` - 502

## Components

### 1. Error Middleware (`/src/middleware/error-handler.ts`)

- `CustomError` class for creating custom errors with status codes and error codes
- `errorHandler` - Global error handling middleware
- `notFoundHandler` - 404 handler for unmatched routes
- `asyncHandler` - Wrapper for async route handlers to catch errors

### 2. Error Handlers (`/src/handler/error-handler.ts`)

- Collection of endpoint handlers that trigger specific error types
- Each handler demonstrates different error scenarios

### 3. Error Types (`/src/types/error-types.ts`)

- TypeScript definitions for error codes, response formats, and HTTP status codes
- Ensures type safety across the application

### 4. Response Utilities (`/src/utils/response-helpers.ts`)

- Helper functions for sending consistent success responses
- `sendSuccessResponse`, `sendCreatedResponse`, `sendAcceptedResponse`, `sendNoContentResponse`

## Usage Examples

### Creating Custom Errors in Route Handlers

```typescript
import { CustomError } from '../middleware/error-handler.js'
import { ErrorCodes, HTTP_STATUS_CODES } from '../types/error-types.js'

// Validation error
throw new CustomError(
  'Invalid email format',
  HTTP_STATUS_CODES.BAD_REQUEST,
  true,
  ErrorCodes.VALIDATION_ERROR,
)

// Database error
throw new CustomError(
  'Unable to connect to database',
  HTTP_STATUS_CODES.SERVICE_UNAVAILABLE,
  true,
  ErrorCodes.DATABASE_ERROR,
)
```

### Using Async Handler

```typescript
import { asyncHandler } from '../middleware/error-handler.js'

export const myAsyncRoute = asyncHandler(async (req, res, next) => {
  // Any errors thrown here will be automatically caught
  // and passed to the error handler middleware
  const data = await someAsyncOperation()
  res.json({ success: true, data })
})
```

### Using Response Helpers

```typescript
import {
  sendSuccessResponse,
  sendCreatedResponse,
} from '../utils/response-helpers.js'

// Success response
sendSuccessResponse(res, { user: userData }, 'User retrieved successfully')

// Created response
sendCreatedResponse(res, { user: newUser }, 'User created successfully')
```

## Testing

To test the error handling system:

1. Start the server
2. Visit `http://localhost:PORT/error/status` to see available endpoints
3. Try different error endpoints to see error responses
4. Check server logs to see error logging in action

## Error Logging

All errors are automatically logged with the following information:

- Error message and stack trace
- HTTP status code and error code
- Request details (method, URL, IP, user agent)
- Timestamp

The logging is handled by the configured logger and appears in the server console during development.
