import React, { useEffect, useState } from 'react';

interface StreaksAndRewardsProps {
  streak: number; // Streak value passed from the parent component
}

const StreaksAndRewards: React.FC<StreaksAndRewardsProps> = ({ streak }) => {
  const [rewardMessage, setRewardMessage] = useState<string>(''); // Reward message
  const [currentBadge, setCurrentBadge] = useState<string>(''); // Badge based on streak

  // Update the reward message and badge based on the streak value
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
  }, [streak]); // Recalculate whenever streak changes

  return (
    <div className="streaks-rewards">
      <h2>Kindness Streaks & Rewards</h2>
      <div className="streak-display">
        <h3>Streak: {streak} {streak === 1 ? 'day' : 'days'}</h3>
        <p>{rewardMessage}</p>
        <div className="badge-display">{currentBadge}</div>
      </div>
    </div>
  );
};

export default StreaksAndRewards;
