import React, { useState } from 'react';
import UserSubmittedChallenges from './UserSubmittedChallenges';
import StreaksAndRewards from './StreaksAndRewards';

UserSubmittedChallenges
const ParentComponent: React.FC = () => {
  const [streak, setStreak] = useState<number>(0); // State to track the streak

  // Function to handle updating streak
  const handleStreakUpdate = (completedChallenges: number) => {
    setStreak(completedChallenges); // Update streak with the number of completed challenges
  };

  return (
    <div>
      <h2>Kindness Streaks</h2>
      {/* Pass the streak value and update function to both child components */}
      <UserSubmittedChallenges onStreakUpdate={handleStreakUpdate} />
      <StreaksAndRewards streak={streak} />
    </div>
  );
};

export default ParentComponent;
