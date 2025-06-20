import type { Request, Response } from 'express'
import logger from '../logger.js'
import { todoService } from '../services/todo-service.js'
import { errorResponse, successResponse } from '../utils/response-helpers.js'
import {
  createTodoSchema,
  todoIdSchema,
  updateTodoSchema,
} from '../validation/todo-validation.js'

export class TodoController {
  async getAllTodos(req: Request, res: Response): Promise<void> {
    try {
      const todos = await todoService.getAllTodos()
      res.json(successResponse(todos, 'Todos retrieved successfully'))
    } catch (error) {
      logger.error('Error getting todos', error)
      res.status(500).json(errorResponse('Internal server error'))
    }
  }

  async getTodoById(req: Request, res: Response): Promise<void> {
    try {
      const { error } = todoIdSchema.validate(req.params)
      if (error) {
        res.status(400).json(errorResponse(error.details[0].message))
        return
      }

      const todo = await todoService.getTodoById(req.params.id)
      if (!todo) {
        res.status(404).json(errorResponse('Todo not found'))
        return
      }

      res.json(successResponse(todo, 'Todo retrieved successfully'))
    } catch (error) {
      logger.error('Error getting todo by id', error)
      res.status(500).json(errorResponse('Internal server error'))
    }
  }

  async createTodo(req: Request, res: Response): Promise<void> {
    try {
      const { error, value } = createTodoSchema.validate(req.body)
      if (error) {
        res.status(400).json(errorResponse(error.details[0].message))
        return
      }

      const todo = await todoService.createTodo(value)
      res.status(201).json(successResponse(todo, 'Todo created successfully'))
    } catch (error) {
      logger.error('Error creating todo', error)
      res.status(500).json(errorResponse('Internal server error'))
    }
  }

  async updateTodo(req: Request, res: Response): Promise<void> {
    try {
      const { error: paramsError } = todoIdSchema.validate(req.params)
      if (paramsError) {
        res.status(400).json(errorResponse(paramsError.details[0].message))
        return
      }

      const { error: bodyError, value } = updateTodoSchema.validate(req.body)
      if (bodyError) {
        res.status(400).json(errorResponse(bodyError.details[0].message))
        return
      }

      const todo = await todoService.updateTodo(req.params.id, value)
      if (!todo) {
        res.status(404).json(errorResponse('Todo not found'))
        return
      }

      res.json(successResponse(todo, 'Todo updated successfully'))
    } catch (error) {
      logger.error('Error updating todo', error)
      res.status(500).json(errorResponse('Internal server error'))
    }
  }

  async deleteTodo(req: Request, res: Response): Promise<void> {
    try {
      const { error } = todoIdSchema.validate(req.params)
      if (error) {
        res.status(400).json(errorResponse(error.details[0].message))
        return
      }

      const deleted = await todoService.deleteTodo(req.params.id)
      if (!deleted) {
        res.status(404).json(errorResponse('Todo not found'))
        return
      }

      res.json(successResponse(null, 'Todo deleted successfully'))
    } catch (error) {
      logger.error('Error deleting todo', error)
      res.status(500).json(errorResponse('Internal server error'))
    }
  }

  async toggleTodoCompleted(req: Request, res: Response): Promise<void> {
    try {
      const { error } = todoIdSchema.validate(req.params)
      if (error) {
        res.status(400).json(errorResponse(error.details[0].message))
        return
      }

      const todo = await todoService.toggleTodoCompleted(req.params.id)
      if (!todo) {
        res.status(404).json(errorResponse('Todo not found'))
        return
      }

      res.json(
        successResponse(todo, 'Todo completion status toggled successfully'),
      )
    } catch (error) {
      logger.error('Error toggling todo completion', error)
      res.status(500).json(errorResponse('Internal server error'))
    }
  }
}

export const todoController = new TodoController()
