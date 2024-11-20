import React, { useState } from 'react';
import KindnessCategories from './KindnessCategories';
import LocationChallenges from './LocationChallenges';

const UserSubmittedChallenges: React.FC = () => {
  const [completedTasksCount, setCompletedTasksCount] = useState(0);

  // Function to increment the count of completed tasks
  const handleTaskCompletion = () => {
    setCompletedTasksCount((prevCount) => prevCount + 1);
  };

  return (
    <div>
      <h2>Kindness Challenges</h2>
      <p>Total Completed Tasks: {completedTasksCount}</p>

      {/* Pass the onTaskComplete prop to KindnessCategories */}
      <KindnessCategories onTaskComplete={handleTaskCompletion} />
      <LocationChallenges onChallengeComplete={handleTaskCompletion} />
    
    </div>
  );
};

export default UserSubmittedChallenges;
