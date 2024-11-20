// LocationChallenges.tsx
import React from 'react';

interface LocationChallengesProps {
  onChallengeComplete: () => void; // Function to call when challenge is completed
}

const LocationChallenges: React.FC<LocationChallengesProps> = ({ onChallengeComplete }) => {
  const handleCompletion = () => {
    onChallengeComplete(); // Trigger the callback function passed via props
  };

  return (
    <div>
      <h3>Location Challenges</h3>
      <button onClick={handleCompletion}>Complete a Location Task</button>
    </div>
  );
};

export default LocationChallenges;
