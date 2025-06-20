import bodyParser from 'body-parser'
import compression from 'compression'
import cors from 'cors'
import express from 'express'
import { rateLimit } from 'express-rate-limit'
import helmet from 'helmet'
import morgan from 'morgan'
import {
  errorStatus,
  triggerAsyncError,
  triggerDatabaseError,
  triggerError,
  triggerForbiddenError,
  triggerTimeoutError,
  triggerUnauthorizedError,
  triggerValidationError,
} from './handler/error-handler.js'
import logger from './logger.js'
import { errorHandler, notFoundHandler } from './middleware/error-handler.js'
import todoRoutes from './routes/todo-routes.js'

const app = express()

// app.set('trust proxy', true) // Trust the first proxy for secure headers

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // store: ... , // Redis, Memcached, etc. See below.
})

// Middleware
app
  .disable('x-powered-by') // Disable 'X-Powered-By' header for security
  .use(helmet())
  .use(cors())
  .use(compression())
  .use(limiter) // Apply rate limiting middleware
  .use(
    morgan(
      function (tokens, req, res) {
        return JSON.stringify({
          ip: tokens['remote-addr'](req, res),
          method: tokens.method(req, res),
          path: tokens.url(req, res),
          status: Number.parseFloat(tokens.status(req, res) || '0'),
          content_length: tokens.res(req, res, 'content-length'),
          response_time: Number.parseFloat(
            tokens['response-time'](req, res) || '0',
          ),
        })
      },
      {
        stream: {
          // Configure Morgan to use our custom logger with the http severity
          write: (message) => {
            const data = JSON.parse(message)
            logger.http('incoming-request', data)
          },
        },
      },
    ),
  )
  .use(bodyParser.json({ limit: '10mb' })) // Limit JSON body size to 10MB
  .use(bodyParser.urlencoded({ extended: true }))

// Routes
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    data: { message: 'Backend API is running!' },
    timestamp: new Date().toISOString(),
  })
})

app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    data: { status: 'OK' },
    timestamp: new Date().toISOString(),
  })
})

// API Routes
app.use('/api/todos', todoRoutes)

// Error testing endpoints
app.get('/error/status', errorStatus)
app.get('/error/500', triggerError)
app.get('/error/400', triggerValidationError)
app.get('/error/401', triggerUnauthorizedError)
app.get('/error/403', triggerForbiddenError)
app.get('/error/408', triggerTimeoutError)
app.get('/error/async', triggerAsyncError)
app.get('/error/database', triggerDatabaseError)

// 404 handler for unmatched routes (must be after all route definitions)
app.use(notFoundHandler)

// Global error handler (must be last middleware)
app.use(errorHandler)

export default app
