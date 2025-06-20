import type { Todo, CreateTodoRequest, UpdateTodoRequest, ApiResponse } from '../types/todo';
import { config } from '../config/env';

const API_BASE_URL = config.API_BASE_URL;

export class TodoService {
  static async getAllTodos(): Promise<Todo[]> {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch todos');
    }
    const result: ApiResponse<Todo[]> = await response.json();
    return result.data;
  }

  static async getTodoById(id: string): Promise<Todo> {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch todo');
    }
    const result: ApiResponse<Todo> = await response.json();
    return result.data;
  }

  static async createTodo(todo: CreateTodoRequest): Promise<Todo> {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo),
    });
    if (!response.ok) {
      throw new Error('Failed to create todo');
    }
    const result: ApiResponse<Todo> = await response.json();
    return result.data;
  }

  static async updateTodo(id: string, updates: UpdateTodoRequest): Promise<Todo> {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });
    if (!response.ok) {
      throw new Error('Failed to update todo');
    }
    const result: ApiResponse<Todo> = await response.json();
    return result.data;
  }

  static async toggleTodo(id: string): Promise<Todo> {
    const response = await fetch(`${API_BASE_URL}/${id}/toggle`, {
      method: 'PATCH',
    });
    if (!response.ok) {
      throw new Error('Failed to toggle todo');
    }
    const result: ApiResponse<Todo> = await response.json();
    return result.data;
  }

  static async deleteTodo(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete todo');
    }
  }
}
