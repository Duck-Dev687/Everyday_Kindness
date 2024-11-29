import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { auth } from './firebase.ts';
import { AuthProvider } from './components/context/AuthContext.tsx'; // Import AuthProvider
// import Auth from './Auth'; // Import Auth component
// Importing necessary components for different features
import Signup from './components/Signup.tsx';
import NavBar from './components/NavBar';
import KindnessLibrary from './components/KindnessLibrary';
import UserSubmittedChallenges from './components/UserSubmittedChallenges';
import MoodBoosters from './components/MoodBoosters';
import AIGeneratedSuggestions from './components/AIGeneratedSuggestions';
import { ChallengesProvider } from './components/context/ChallengesContext';
import DashBoard from './components/DashBoard';
import Home from './components/Home';
import Login from './components/Login.tsx';
import { onAuthStateChanged, User } from 'firebase/auth';
import Streaks from './Streaks.tsx';
// App component

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser: User | null) => {
      setUser(currentUser);
    });
  
    return () => unsubscribe(); // Cleanup the subscription
  }, []);


  return (
    <AuthProvider>
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />

        <Route
          path="/dashboard"
          element={
            user ? (
              <ChallengesProvider>
                <DashBoard />
                <Streaks userId={auth.currentUser?.uid || ""} />
                <UserSubmittedChallenges />
              </ChallengesProvider>
            ) : (
              <Navigate to="/signup" replace />
            )
          }
        />

        {/* Public Routes */}
        <Route path="/home" element={<Home />} />
        <Route path="/suggestions" element={<AIGeneratedSuggestions />} />
        <Route path="/library" element={<KindnessLibrary />} />
        <Route path="/mood-boosters" element={<MoodBoosters />} />
        {/* <Route path="/auth" element={<Auth />} /> */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        
        {/* 404 Route */}
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </Router>
    </AuthProvider>
  );
};

export default App;
