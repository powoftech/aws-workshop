import 'dotenv/config'
import joi from 'joi'
import { env } from 'process'
import logger from './logger.js'

const envVarsSchema = joi
  .object()
  .keys({
    PORT: joi.number().positive().default(8000), // Default port 8000
    DATABASE_URL: joi.string().required(),
  })
  .unknown()

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: 'key' } })
  .validate(process.env)

if (error) {
  logger.error(`Config validation error: ${error.message}`)
}

const envConfig = {
  port: envVars.PORT,
  databaseUrl: envVars.DATABASE_URL,
}

export default envConfig
