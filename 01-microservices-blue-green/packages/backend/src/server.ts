import app from './app.js'
import envConfig from './env-config.js'
import logger from './logger.js'

const port = envConfig.port

app.listen(port, () => {
  logger.info(`Server is running on http://localhost:${port}`)
})
