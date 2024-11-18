import React, { useState, useEffect } from 'react';

interface StreaksAndRewardsProps {
  // No need to pass streak as a prop anymore, it will be handled internally
}

const StreaksAndRewards: React.FC<StreaksAndRewardsProps> = () => {
  const [streak, setStreak] = useState<number>(0);
  const [rewardMessage, setRewardMessage] = useState<string>('');
  const [currentBadge, setCurrentBadge] = useState<string>('');

  // Handle streak logic inside the component
  useEffect(() => {
    const lastStreakDate = localStorage.getItem('lastStreakDate');
    const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format

    if (lastStreakDate === currentDate) {
      // User did something today, continue the streak
      const savedStreak = parseInt(localStorage.getItem('streak') || '0', 10);
      setStreak(savedStreak);
    } else if (lastStreakDate) {
      // User skipped a day, reset streak to 1
      setStreak(1);
    } else {
      // First time visiting, start with streak of 1
      setStreak(1);
    }
  }, []);

  // Update reward message and badge based on streak
  useEffect(() => {
    if (streak < 3) {
      setRewardMessage('Keep going! You’re just getting started!');
      setCurrentBadge('🌱 Kindness Sprout');
    } else if (streak < 7) {
      setRewardMessage('Amazing! You’re spreading kindness!');
      setCurrentBadge('🌟 Rising Star');
    } else if (streak < 14) {
      setRewardMessage('Incredible! Kindness is your superpower!');
      setCurrentBadge('💎 Kindness Gem');
    } else {
      setRewardMessage('Legendary! You’re inspiring the world!');
      setCurrentBadge('🏆 Kindness Legend');
    }
  }, [streak]);

  // Function to simulate completing an action and updating the streak
  const handleActionComplete = () => {
    const currentDate = new Date().toISOString().split('T')[0]; // Current date
    const lastStreakDate = localStorage.getItem('lastStreakDate');
    let newStreak = streak;

    if (lastStreakDate === currentDate) {
      // If the action was completed today, do nothing
      return;
    }

    // If the user completed something yesterday, increment the streak
    if (lastStreakDate) {
      const lastDate = new Date(lastStreakDate);
      const today = new Date(currentDate);
      const diffDays = Math.ceil((today.getTime() - lastDate.getTime()) / (1000 * 3600 * 24));

      if (diffDays === 1) {
        newStreak += 1;
      } else {
        newStreak = 1; // Reset streak if not consecutive
      }
    } else {
      newStreak = 1; // First streak
    }

    // Save the new streak and date in localStorage
    localStorage.setItem('streak', newStreak.toString());
    localStorage.setItem('lastStreakDate', currentDate);

    setStreak(newStreak); // Update state
  };

  return (
    <div className="streaks-rewards">
      <h2>Kindness Streaks & Rewards</h2>
      <div className="streak-display">
        <h3>Streak: {streak} {streak === 1 ? 'day' : 'days'}</h3>
        <p>{rewardMessage}</p>
        <div className="badge-display">{currentBadge}</div>
      </div>
      <button onClick={handleActionComplete}>Complete a Good Action</button>
    </div>
  );
};

export default StreaksAndRewards;
