import { auth } from '../../firebase';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

type User = firebase.User | null;

interface AuthContextType {
  user: User;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithApple: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(null);

  // Sign-in methods
  const signInWithEmail = async (email: string, password: string) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (error:any) {
      console.error(error.message);
    }
  };

  const signInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      await firebase.auth().signInWithPopup(provider);
    } catch (error:any) {
      console.error(error.message);
    }
  };

  const signInWithApple = async () => {
    const provider = new firebase.auth.OAuthProvider('apple.com');
    try {
      await firebase.auth().signInWithPopup(provider);
    } catch (error:any) {
      console.error(error.message);
    }
  };

  const signOut = async () => {
    try {
      await firebase.auth().signOut();
    } catch (error:any) {
      console.error(error.message);
    }
  };

  // Monitor user state
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user: User | null) => {
      setUser(user);  // Correct callback that matches onAuthStateChanged signature
    });
    return () => unsubscribe();  // Clean up on unmount
  }, []);

  return (
    <AuthContext.Provider value={{ user, signInWithEmail, signInWithGoogle, signInWithApple, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
