'use client';

import { Todo } from '@/types';
import { useState } from 'react';

export interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, title: string) => void;
}

export default function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [isHovered, setIsHovered] = useState(false);

  const handleEdit = () => {
    if (editTitle.trim() && editTitle !== todo.title) {
      onEdit(todo.id, editTitle.trim());
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(todo.title);
    setIsEditing(false);
  };

  return (
    <div 
      className="card group relative flex items-center min-h-[60px] p-4 mb-4 transition-all duration-200 hover:shadow-md"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center space-x-3 flex-1 min-w-0">
        <div className="relative flex-shrink-0">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => onToggle(todo.id)}
              className="absolute opacity-0 w-0 h-0 peer"
            />
            <div className="relative h-5 w-5 flex items-center justify-center border-2 border-[var(--text-secondary)] rounded transition-colors duration-200 peer-checked:bg-[var(--primary)] peer-checked:border-[var(--primary)] peer-focus:ring-2 peer-focus:ring-[var(--primary)] peer-focus:ring-offset-2 cursor-pointer hover:border-[var(--primary)]">
              <svg
                className="h-3 w-3 text-white absolute opacity-0 peer-checked:opacity-100 transition-opacity duration-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </label>
        </div>
        {isEditing ? (
          <div className="flex items-center space-x-2 flex-1 min-w-0">
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleEdit()}
              autoFocus
              className="input-field flex-1 min-w-0"
              placeholder="Edit todo..."
            />
            <div className="flex-shrink-0 flex space-x-2">
              <button
                onClick={handleEdit}
                className="btn-primary px-3 py-1 text-sm"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="btn-secondary px-3 py-1 text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between w-full min-w-0">
            <button
              onClick={() => onToggle(todo.id)}
              className={`flex-1 text-left truncate text-[var(--text-primary)] transition-all duration-200 hover:text-[var(--primary)] ${
                todo.completed ? 'line-through text-[var(--text-secondary)]' : ''
              }`}
            >
              {todo.title}
            </button>
            <div 
              className={`flex-shrink-0 flex space-x-2 transition-opacity duration-200 ${
                isHovered ? 'opacity-100' : 'opacity-0 sm:opacity-0'
              }`}
            >
              <button
                onClick={() => setIsEditing(true)}
                className="p-1 text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors duration-200"
                aria-label="Edit todo"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              <button
                onClick={() => onDelete(todo.id)}
                className="p-1 text-[var(--text-secondary)] hover:text-red-500 transition-colors duration-200"
                aria-label="Delete todo"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 