import prisma from '../database/prisma.js'
import type { Todo } from '../types/todo-types.js'

export interface CreateTodoInput {
  title: string
  description?: string
}

export interface UpdateTodoInput {
  title?: string
  description?: string
  completed?: boolean
}

export class TodoService {
  async getAllTodos(): Promise<Todo[]> {
    return await prisma.todo.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })
  }

  async getTodoById(id: string): Promise<Todo | null> {
    return await prisma.todo.findUnique({
      where: { id },
    })
  }

  async createTodo(data: CreateTodoInput): Promise<Todo> {
    return await prisma.todo.create({
      data,
    })
  }

  async updateTodo(id: string, data: UpdateTodoInput): Promise<Todo | null> {
    try {
      return await prisma.todo.update({
        where: { id },
        data,
      })
    } catch (error) {
      // If todo doesn't exist, return null
      return null
    }
  }

  async deleteTodo(id: string): Promise<boolean> {
    try {
      await prisma.todo.delete({
        where: { id },
      })
      return true
    } catch (error) {
      // If todo doesn't exist, return false
      return false
    }
  }

  async toggleTodoCompleted(id: string): Promise<Todo | null> {
    try {
      const todo = await this.getTodoById(id)
      if (!todo) return null

      return await prisma.todo.update({
        where: { id },
        data: {
          completed: !todo.completed,
        },
      })
    } catch (error) {
      return null
    }
  }
}

export const todoService = new TodoService()
