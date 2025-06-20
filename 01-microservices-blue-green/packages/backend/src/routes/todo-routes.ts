import { Router } from 'express'
import { todoController } from '../controllers/todo-controller.js'

const router = Router()

// GET /todos - Get all todos
router.get('/', todoController.getAllTodos.bind(todoController))

// GET /todos/:id - Get a specific todo by ID
router.get('/:id', todoController.getTodoById.bind(todoController))

// POST /todos - Create a new todo
router.post('/', todoController.createTodo.bind(todoController))

// PUT /todos/:id - Update a todo
router.put('/:id', todoController.updateTodo.bind(todoController))

// DELETE /todos/:id - Delete a todo
router.delete('/:id', todoController.deleteTodo.bind(todoController))

// PATCH /todos/:id/toggle - Toggle todo completion status
router.patch(
  '/:id/toggle',
  todoController.toggleTodoCompleted.bind(todoController),
)

export default router
