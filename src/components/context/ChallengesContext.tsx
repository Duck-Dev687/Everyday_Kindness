import React, { createContext, useContext, useState } from 'react';

// Define the shape of the context
type ChallengesContextType = {
  completedTasksCount: number;
  incrementTaskCount: () => void;
};

// Create the context
const ChallengesContext = createContext<ChallengesContextType | undefined>(undefined);

// Custom hook to access the context
export const useChallenges = () => {
  const context = useContext(ChallengesContext);
  if (!context) throw new Error('useChallenges must be used within a ChallengesProvider');
  return context;
};

// Provider component
export const ChallengesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [completedTasksCount, setCompletedTasksCount] = useState(0);

  const incrementTaskCount = () => {
    setCompletedTasksCount((prev) => prev + 1);
  };

  return (
    <ChallengesContext.Provider value={{ completedTasksCount, incrementTaskCount }}>
      {children}
    </ChallengesContext.Provider>
  );
};
