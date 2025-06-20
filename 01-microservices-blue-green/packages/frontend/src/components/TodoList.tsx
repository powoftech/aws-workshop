import React from 'react';
import type { Todo } from '../types/todo';
import { TodoItem } from './TodoItem';
import type { UpdateTodoRequest } from '../types/todo';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onUpdate: (id: string, updates: UpdateTodoRequest) => void;
  onDelete: (id: string) => void;
  isLoading?: boolean;
}

export const TodoList: React.FC<TodoListProps> = ({ 
  todos, 
  onToggle, 
  onUpdate, 
  onDelete, 
  isLoading = false 
}) => {
  if (todos.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-500 text-lg">No todos yet!</div>
        <div className="text-gray-400 text-sm mt-2">Add your first todo above to get started.</div>
      </div>
    );
  }

  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;

  return (
    <div>
      <div className="mb-4 text-sm text-gray-600">
        {completedCount} of {totalCount} todos completed
      </div>
      
      <div className="space-y-3">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={onToggle}
            onUpdate={onUpdate}
            onDelete={onDelete}
            isLoading={isLoading}
          />
        ))}
      </div>
    </div>
  );
};
