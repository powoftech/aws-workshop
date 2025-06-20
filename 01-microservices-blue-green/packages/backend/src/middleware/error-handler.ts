import { NextFunction, Request, Response } from 'express'
import logger from '../logger.js'
import {
  ErrorCodes,
  ErrorResponse,
  HTTP_STATUS_CODES,
} from '../types/error-types.js'

export interface AppError extends Error {
  statusCode?: number
  isOperational?: boolean
  code?: ErrorCodes
}

export class CustomError extends Error implements AppError {
  statusCode: number
  isOperational: boolean
  code?: ErrorCodes

  constructor(
    message: string,
    statusCode: number = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
    isOperational: boolean = true,
    code?: ErrorCodes,
  ) {
    super(message)
    this.statusCode = statusCode
    this.isOperational = isOperational
    this.code = code
    this.name = this.constructor.name

    // Capture stack trace
    Error.captureStackTrace(this, this.constructor)
  }
}

// Global error handler middleware
export const errorHandler = (
  error: AppError,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const statusCode = error.statusCode || HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
  const message = error.message || 'Internal Server Error'

  // Log error details
  logger.error('Error occurred', {
    error: {
      message: error.message,
      stack: error.stack,
      statusCode,
      code: error.code,
      isOperational: error.isOperational,
    },
    request: {
      method: req.method,
      url: req.url,
      ip: req.ip,
      userAgent: req.get('User-Agent'),
    },
  })

  // Send error response
  const errorResponse: ErrorResponse = {
    success: false,
    error: {
      message,
      code: error.code,
      statusCode,
      timestamp: new Date().toISOString(),
      path: req.url,
      method: req.method,
      ...(process.env.NODE_ENV === 'development' && {
        stack: error.stack,
      }),
    },
  }

  res.status(statusCode).json(errorResponse)
}

// 404 handler for unmatched routes
export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const error = new CustomError(
    `Route ${req.method} ${req.url} not found`,
    HTTP_STATUS_CODES.NOT_FOUND,
    true,
    ErrorCodes.NOT_FOUND,
  )
  next(error)
}

// Async error wrapper to catch errors in async route handlers
export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next)
  }
}
