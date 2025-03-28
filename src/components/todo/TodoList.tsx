'use client';

import { useState, useEffect } from 'react';
import { Todo } from '@/types';
import TodoItem from './TodoItem';
import AddTodoForm from './AddTodoForm';
import { useAuth } from '@/contexts/AuthContext';
import { db } from '@/lib/firebase';
import { 
  collection, 
  query, 
  where, 
  orderBy, 
  onSnapshot, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc,
  Timestamp,
  FirestoreError,
  Firestore
} from 'firebase/firestore';

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<React.ReactNode | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { user } = useAuth();

  // Load todos from Firestore
  useEffect(() => {
    if (!user) {
      setIsLoading(false);
      return;
    }

    console.log('Setting up todos listener for user:', user.id);
    const todosRef = collection(db as Firestore, 'todos');
    const q = query(
      todosRef,
      where('userId', '==', user.id),
      orderBy('createAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        const todosData = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.title,
            completed: data.completed,
            createdAt: data.createAt?.toDate() || new Date(),
            userId: data.userId
          } as Todo;
        });
        
        console.log('Todos updated:', todosData);
        setTodos(todosData);
        setIsLoading(false);
        setError(null);
        setErrorMessage('');
      }, 
      (error: unknown) => {
        console.error('Error fetching todos:', error);
        setError('Error loading todos. Please try again later.');
        setIsLoading(false);
      }
    );

    return () => {
      console.log('Cleaning up todos listener');
      unsubscribe();
    };
  }, [user]);

  const addTodo = async (title: string) => {
    if (!user) return;
    
    try {
      const todosRef = collection(db, 'todos');
      await addDoc(todosRef, {
        title,
        completed: false,
        createAt: Timestamp.now(),
        userId: user.id,
      });
      console.log('Todo added successfully');
    } catch (error) {
      console.error('Error adding todo:', error);
      setError('Failed to add todo. Please try again.');
    }
  };

  const toggleTodo = async (id: string) => {
    if (!user) return;

    try {
      const todoRef = doc(db, 'todos', id);
      const todo = todos.find(t => t.id === id);
      if (!todo) return;

      await updateDoc(todoRef, {
        completed: !todo.completed
      });
      console.log('Todo toggled successfully');
    } catch (error) {
      console.error('Error toggling todo:', error);
      setError('Failed to update todo. Please try again.');
    }
  };

  const deleteTodo = async (id: string) => {
    if (!user) return;

    try {
      const todoRef = doc(db, 'todos', id);
      await deleteDoc(todoRef);
      console.log('Todo deleted successfully');
    } catch (error) {
      console.error('Error deleting todo:', error);
      setError('Failed to delete todo. Please try again.');
    }
  };

  const editTodo = async (id: string, title: string) => {
    if (!user) return;

    try {
      const todoRef = doc(db, 'todos', id);
      await updateDoc(todoRef, {
        title
      });
      console.log('Todo edited successfully');
    } catch (error) {
      console.error('Error editing todo:', error);
      setError('Failed to edit todo. Please try again.');
    }
  };

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto p-4 text-center text-gray-600 dark:text-gray-400">
        Please sign in to view your todos.
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto w-full px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-8 text-center">
        My Todo List
      </h1>
      
      <div className="space-y-6">
        <AddTodoForm onAdd={addTodo} />

        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--primary)]"></div>
          </div>
        ) : error ? (
          <div className="text-[var(--error)] text-center bg-red-50 dark:bg-red-900/20 p-4 rounded-md">
            {error}
          </div>
        ) : todos.length === 0 ? (
          <div className="text-center text-[var(--text-secondary)] py-8">
            No todos yet. Add one above!
          </div>
        ) : (
          <div className="space-y-2">
            {todos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onEdit={editTodo}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 