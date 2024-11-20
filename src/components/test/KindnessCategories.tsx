// KindnessCategories.tsx
import React from 'react';

interface KindnessCategoriesProps {
  onTaskComplete: () => void; // Function to call when task is completed
}

const KindnessCategories: React.FC<KindnessCategoriesProps> = ({ onTaskComplete }) => {
  const handleCompletion = () => {
    onTaskComplete(); // Trigger the callback function passed via props
  };

  return (
    <div>
      <h3>Kindness Categories</h3>
      <button onClick={handleCompletion}>Complete a Kindness Task</button>
    </div>
  );
};

export default KindnessCategories;
