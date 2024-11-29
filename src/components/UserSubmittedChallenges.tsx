import React from 'react';
import { useChallenges } from './context/ChallengesContext';
import KindnessCategories from './KindnessCategories';
import LocationChallenges from './LocationChallenges';



const UserSubmittedChallenges: React.FC = () => {
  const { completedTasksCount } = useChallenges();

  return (
    <div>
      <KindnessCategories />
      <LocationChallenges />
    </div>
  );
};

export default UserSubmittedChallenges;
