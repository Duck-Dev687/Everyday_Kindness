import React, { useState } from 'react';
import '../index.css';

interface KindnessTrackerProps {
  completedActs: number; // Number of acts completed
  goal: number; // Monthly goal set by the user
  onGoalChange: (newGoal: number) => void; // Callback to update goal
}

const KindnessTracker: React.FC<KindnessTrackerProps> = ({ completedActs, goal, onGoalChange }) => {
  const [newGoal, setNewGoal] = useState(goal);

  const handleGoalChange = () => {
    if (newGoal > 0) {
      onGoalChange(newGoal); // Update the goal in parent state
    }
  };

  // Calculate progress percentage
  const progress = Math.min((completedActs / goal) * 100, 100);

  return (
    <div className="kindness-tracker">
      <h2>Kindness Tracker</h2>

      {/* Progress Stats */}
      <div className="stats">
        <p><strong>Acts Completed:</strong> {completedActs}</p>
        <p><strong>Monthly Goal:</strong> {goal}</p>
      </div>

      {/* Progress Bar */}
      <div className="progress-bar">
        <div
          className="progress"
          style={{ width: `${progress}%` }}
          aria-label={`Progress: ${Math.floor(progress)}%`}
        ></div>
      </div>
      <p>{Math.floor(progress)}% toward your goal!</p>

      {/* Update Goal Section */}
      <div className="goal-update">
        <label htmlFor="goal">Set New Goal:</label>
        <input
          type="number"
          id="goal"
          value={newGoal}
          onChange={(e) => setNewGoal(Number(e.target.value))}
          placeholder="Enter new goal"
        />
        <button onClick={handleGoalChange}>Update Goal</button>
      </div>
    </div>
  );
};

export default KindnessTracker;
