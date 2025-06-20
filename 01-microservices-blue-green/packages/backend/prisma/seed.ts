import prisma from '../src/database/prisma.js'
import logger from '../src/logger.js'

async function main() {
  logger.info('Starting database seed...')

  // Create some sample todos
  const todos = await Promise.all([
    prisma.todo.create({
      data: {
        title: 'Complete project setup',
        description: 'Set up PostgreSQL with Prisma and create CRUD endpoints',
        completed: false,
      },
    }),
    prisma.todo.create({
      data: {
        title: 'Write API documentation',
        description: 'Document all the todo endpoints for the API',
        completed: false,
      },
    }),
    prisma.todo.create({
      data: {
        title: 'Setup database',
        description: 'Configure PostgreSQL database connection',
        completed: true,
      },
    }),
  ])

  logger.info(`Created ${todos.length} todos`)
  logger.info('Database seed completed successfully')
}

main()
  .catch((e) => {
    logger.error('Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
