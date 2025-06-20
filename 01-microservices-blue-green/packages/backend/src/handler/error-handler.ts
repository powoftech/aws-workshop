import { NextFunction, Request, Response } from 'express'
import { CustomError, asyncHandler } from '../middleware/error-handler.js'
import {
  ErrorCodes,
  HTTP_STATUS_CODES,
  SuccessResponse,
} from '../types/error-types.js'

// Test error endpoint - triggers a 500 error
export const triggerError = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    throw new CustomError(
      'This is a test error endpoint',
      HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
      true,
      ErrorCodes.INTERNAL_SERVER_ERROR,
    )
  },
)

// Test validation error - triggers a 400 error
export const triggerValidationError = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    throw new CustomError(
      'Invalid request parameters',
      HTTP_STATUS_CODES.BAD_REQUEST,
      true,
      ErrorCodes.VALIDATION_ERROR,
    )
  },
)

// Test unauthorized error - triggers a 401 error
export const triggerUnauthorizedError = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    throw new CustomError(
      'Unauthorized access',
      HTTP_STATUS_CODES.UNAUTHORIZED,
      true,
      ErrorCodes.UNAUTHORIZED,
    )
  },
)

// Test forbidden error - triggers a 403 error
export const triggerForbiddenError = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    throw new CustomError(
      'Forbidden resource',
      HTTP_STATUS_CODES.FORBIDDEN,
      true,
      ErrorCodes.FORBIDDEN,
    )
  },
)

// Test timeout error - simulates a timeout
export const triggerTimeoutError = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // Simulate a long operation that times out
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(
          new CustomError(
            'Request timeout',
            HTTP_STATUS_CODES.REQUEST_TIMEOUT,
            true,
            ErrorCodes.REQUEST_TIMEOUT,
          ),
        )
      }, 100)
    })
  },
)

// Test async error - triggers an async error
export const triggerAsyncError = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // Simulate an async operation that fails
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(
          new CustomError(
            'Async operation failed',
            HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
            true,
            ErrorCodes.INTERNAL_SERVER_ERROR,
          ),
        )
      }, 50)
    })
  },
)

// Test database error - simulates a database connection error
export const triggerDatabaseError = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    throw new CustomError(
      'Database connection failed',
      HTTP_STATUS_CODES.SERVICE_UNAVAILABLE,
      true,
      ErrorCodes.DATABASE_ERROR,
    )
  },
)

// Error status endpoint - returns current error handling status
export const errorStatus = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const response: SuccessResponse = {
      success: true,
      data: {
        message: 'Error handling is active',
        availableErrorEndpoints: [
          'GET /error/500 - Triggers a 500 internal server error',
          'GET /error/400 - Triggers a 400 validation error',
          'GET /error/401 - Triggers a 401 unauthorized error',
          'GET /error/403 - Triggers a 403 forbidden error',
          'GET /error/408 - Triggers a 408 timeout error',
          'GET /error/async - Triggers an async error',
          'GET /error/database - Triggers a database error',
          'GET /error/status - Shows this status message',
        ],
        errorCodes: ErrorCodes,
        httpStatusCodes: HTTP_STATUS_CODES,
      },
      timestamp: new Date().toISOString(),
    }

    res.status(HTTP_STATUS_CODES.OK).json(response)
  },
)
