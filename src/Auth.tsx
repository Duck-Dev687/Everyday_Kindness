// Auth.tsx
import React, { useState } from 'react';
import { useAuth } from './components/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {auth} from './firebase'

const Auth: React.FC = () => {
  const { signInWithGoogle, signInWithApple, user,signOut } = useAuth();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(); // Call signOut from the context
      setMessage('You have been signed out.');
    } catch (error) {
      setMessage('Error signing out');
    }
  };

  // Handle email/password sign-in
  // const handleEmailSignIn = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   try {
  //     await signInWithEmail(email, password);
  //   } catch (err: any) {
  //     setError(err.message);
  //   }
  // };
  const signInWithEmail = async (email: string, password: string): Promise<void> => {
    try {
      const userCredential = await auth.signInWithEmailAndPassword(email, password);
      console.log('Signed in user:', userCredential.user);
    } catch (error: any) {
      console.error('Error during sign-in:', error.message);
      throw error; // Forward the error to handle it in the UI
    }
  };
  

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form submission from reloading the page
    if (!email || !password) {
      setMessage('Email and Password are required.');
      return;
    }

    if (password.length < 6) {
      setMessage('Password must be at least 6 characters.');
      return;
    }

    await signInWithEmail(email, password);
  };

  return (
    <div>
      {user ? (
        <div>
          <h1>Welcome, {user.displayName || user.email}</h1>
          <button onClick={signOut}>Sign Out</button>
        </div>
      ) : (
        <div>
          <h2>Sign In / Sign Up</h2>
          <form onSubmit={handleSignIn}>
            <div>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit">Sign In</button>
          </form>
          {message && <p>{message}</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button onClick={signInWithGoogle}>Sign In with Google</button>
        </div>
      )}
    </div>
  );
};

export default Auth;
