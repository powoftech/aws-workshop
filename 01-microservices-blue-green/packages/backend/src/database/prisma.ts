import { PrismaClient } from '../generated/prisma/index.js'
import logger from '../logger.js'

const prisma = new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query',
    },
    {
      emit: 'event',
      level: 'error',
    },
    {
      emit: 'event',
      level: 'info',
    },
    {
      emit: 'event',
      level: 'warn',
    },
  ],
})

// Log Prisma queries
prisma.$on('query', (e: any) => {
  logger.debug('prisma:query', {
    query: e.query,
    params: e.params,
    duration: e.duration,
  })
})

prisma.$on('error', (e: any) => {
  logger.error('prisma:error', e)
})

prisma.$on('info', (e: any) => {
  logger.info('prisma:info', e)
})

prisma.$on('warn', (e: any) => {
  logger.warn('prisma:warn', e)
})

export default prisma
