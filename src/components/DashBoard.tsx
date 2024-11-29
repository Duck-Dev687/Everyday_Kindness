import React, { useEffect, useState } from 'react';
import { useChallenges } from './context/ChallengesContext';

const DashBoard: React.FC = () => {
  // State with explicit User type
  const { completedTasksCount, incrementTaskCount } = useChallenges();

  return (
    <div className="dashboard-container">
      {/* <div className="dashboard-header">
        <h1>Welcome, {user.username || user.email}!</h1>
        <p>Email: {user.email}</p>
      </div> */}

      <div className="dashboard-content">
        {/* Display Completed Tasks */}
        <div className="task-summary">
          <h3>Completed Tasks</h3>
          <div className="task-count">
            <span>{completedTasksCount}</span>
          </div>
        </div>

        {/* Example of a Simple Responsive Chart */}
        <div className="task-chart">
          <h3>Task Completion Over Time</h3>
          <div className="chart-placeholder">
            <p>Graph Placeholder</p>
          </div>
        </div>

        {/* Example button to increment task count */}
      </div>

      <div className="dashboard-footer">
        <p>© 2024 Everyday Kindness</p>
      </div>
    </div>
  );
};

export default DashBoard;
