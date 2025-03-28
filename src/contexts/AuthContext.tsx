'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/types';
import { auth, db } from '@/lib/firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User as FirebaseUser,
  AuthError,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('Setting up auth state listener');
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      console.log('Auth state changed:', firebaseUser ? 'User logged in' : 'User logged out');
      if (firebaseUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            console.log('User data loaded:', { ...userData, email: firebaseUser.email });
            setUser({
              id: firebaseUser.uid,
              email: userData.email || firebaseUser.email || '',
              name: userData.name
            });
          } else {
            console.log('No user document found for:', firebaseUser.uid);
          }
        } catch (error) {
          console.error('Error loading user data:', error);
        }
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const getErrorMessage = (error: unknown): string => {
    if (error instanceof Error) {
      console.error('Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
      
      // Check if it's a Firebase Auth error
      if ('code' in error) {
        const authError = error as AuthError;
        switch (authError.code) {
          case 'auth/invalid-credential':
            return 'Invalid email or password. Please try again.';
          case 'auth/user-not-found':
            return 'No account found with this email. Please sign up first.';
          case 'auth/wrong-password':
            return 'Incorrect password. Please try again.';
          case 'auth/email-already-in-use':
            return 'An account with this email already exists. Please sign in instead.';
          case 'auth/weak-password':
            return 'Password should be at least 6 characters long.';
          case 'auth/invalid-email':
            return 'Please enter a valid email address.';
          case 'auth/popup-closed-by-user':
            return 'Login was cancelled. Please try again.';
          case 'auth/popup-blocked':
            return 'Login popup was blocked. Please allow popups for this site.';
          case 'auth/cancelled-popup-request':
            return 'Login was cancelled. Please try again.';
          case 'auth/account-exists-with-different-credential':
            return 'An account already exists with the same email but different sign-in credentials. Please try signing in with a different method.';
          case 'auth/operation-not-allowed':
            return 'This sign-in method is not enabled. Please contact the administrator.';
          default:
            return authError.message || 'An error occurred. Please try again.';
        }
      }
      return error.message;
    }
    return 'An unexpected error occurred. Please try again.';
  };

  const createOrUpdateUserDocument = async (firebaseUser: FirebaseUser, name?: string) => {
    const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
    if (!userDoc.exists()) {
      await setDoc(doc(db, 'users', firebaseUser.uid), {
        email: firebaseUser.email || null,
        name: name || firebaseUser.displayName || 'User',
        createdAt: new Date().toISOString()
      });
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      console.log('Attempting login for:', email);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('Login successful:', userCredential.user.email);
    } catch (error) {
      console.error('Login error:', error);
      throw new Error(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    try {
      console.log('Attempting registration for:', email);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('Registration successful:', user.email);
      
      await createOrUpdateUserDocument(user, name);
      console.log('User document created in Firestore');
    } catch (error) {
      console.error('Registration error:', error);
      throw new Error(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
      console.log('Attempting Google login');
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      console.log('Google login successful:', result.user.email);
      
      await createOrUpdateUserDocument(result.user);
    } catch (error) {
      console.error('Google login error:', error);
      throw new Error(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      console.log('Attempting logout');
      await signOut(auth);
      console.log('Logout successful');
    } catch (error) {
      console.error('Logout error:', error);
      throw new Error('Failed to sign out. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      register, 
      logout, 
      loginWithGoogle,
      isLoading 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 