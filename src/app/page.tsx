'use client';

import { useAuth } from '@/contexts/AuthContext';
import LoginForm from '@/components/auth/LoginForm';
import TodoList from '@/components/todo/TodoList';

export default function Home() {
  const { user, logout } = useAuth();

  if (!user) {
    return <LoginForm />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <nav className="bg-[var(--card-bg)] border-b border-[var(--card-border)] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-[var(--text-primary)]">
                Todo App
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-[var(--text-secondary)] hidden sm:block">
                {user.email}
              </span>
              <button
                onClick={logout}
                className="btn-secondary"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-7xl w-full mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <TodoList />
      </main>

      <footer className="bg-[var(--card-bg)] border-t border-[var(--card-border)] py-4 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-[var(--text-secondary)] text-sm">
            <p>Developed with ❤️ by{' '}
              <a
                href="https://lance28-beep.github.io/portfolio-website/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--primary)] hover:text-[var(--button-primary-hover)] transition-colors duration-200 font-medium"
              >
                Lance Valle
              </a>
            </p>
            <p className="mt-1 text-xs opacity-75">
              © {new Date().getFullYear()} All rights reserved
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
