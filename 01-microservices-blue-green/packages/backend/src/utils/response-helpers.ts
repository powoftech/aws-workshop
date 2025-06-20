import { Response } from 'express'
import { HTTP_STATUS_CODES, SuccessResponse } from '../types/error-types.js'

export const sendSuccessResponse = <T = any>(
  res: Response,
  data: T,
  message?: string,
  statusCode: number = HTTP_STATUS_CODES.OK,
): void => {
  const response: SuccessResponse<T> = {
    success: true,
    data,
    message,
    timestamp: new Date().toISOString(),
  }

  res.status(statusCode).json(response)
}

export const sendCreatedResponse = <T = any>(
  res: Response,
  data: T,
  message?: string,
): void => {
  sendSuccessResponse(res, data, message, HTTP_STATUS_CODES.CREATED)
}

export const sendAcceptedResponse = <T = any>(
  res: Response,
  data: T,
  message?: string,
): void => {
  sendSuccessResponse(res, data, message, HTTP_STATUS_CODES.ACCEPTED)
}

export const sendNoContentResponse = (res: Response): void => {
  res.status(HTTP_STATUS_CODES.NO_CONTENT).send()
}

export const successResponse = <T = any>(data: T, message?: string) => ({
  success: true,
  data,
  message,
  timestamp: new Date().toISOString(),
})

export const errorResponse = (message: string) => ({
  success: false,
  message,
  timestamp: new Date().toISOString(),
})
