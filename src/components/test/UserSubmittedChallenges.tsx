import React, { useState } from 'react';
import KindnessCategories from './KindnessCategories';
import LocationChallenges from './LocationChallenges';


interface UserSubmittedChallengesProps {
  onStreakUpdate: (completedChallenges: number) => void; // The prop function to update streak
}

const UserSubmittedChallenges: React.FC<UserSubmittedChallengesProps> = ({ onStreakUpdate }) => {
  const [totalCompletedChallenges, setTotalCompletedChallenges] = useState<number>(0); // Track completed challenges

  // Callback to handle challenge completion
  const handleChallengeComplete = () => {
    const updatedChallenges = totalCompletedChallenges + 1; // Increment completed challenges
    setTotalCompletedChallenges(updatedChallenges); // Update local state
    onStreakUpdate(updatedChallenges); // Call the parent function to update the streak
  };

  return (
    <div>
      <h1>Challenge Dashboard</h1>
      <p>Total Completed Challenges: {totalCompletedChallenges}</p>

      {/* These components will trigger handleChallengeComplete when a task is completed */}
      <KindnessCategories onTaskComplete={handleChallengeComplete} />
      <LocationChallenges onChallengeComplete={handleChallengeComplete} />
    </div>
  );
};

export default UserSubmittedChallenges;
