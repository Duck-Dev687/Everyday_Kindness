// AuthWrapper.tsx
import React, { useState, useEffect } from 'react';
import { auth } from './firebase'; // Import auth from firebase.ts
import firebase from 'firebase/compat/app'; // Importing compat Firebase
import 'firebase/compat/auth'; // Importing compat Firebase Auth
type UserType = User | null;

// Type for Firebase user
type User = firebase.User | null;

const AuthWrapper = () => {
  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = auth.onAuthStateChanged(setUser);

    return () => unsubscribe(); // Clean up on unmount
  }, []);

  return (
    <div>
      {user ? (
        <div>
          <h1>Welcome, {user.displayName || user.email}!</h1>
          <button onClick={() => auth.signOut()}>Sign Out</button>
        </div>
      ) : (
        <div>Please log in or sign up</div>
      )}
    </div>
  );
};

export default AuthWrapper;
