import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface StreaksAndRewardsProps {}

const StreaksAndRewards: React.FC<StreaksAndRewardsProps> = () => {
  const [streak, setStreak] = useState<number>(0);
  const [rewardMessage, setRewardMessage] = useState<string>(''); 
  const [currentBadge, setCurrentBadge] = useState<string>(''); 
  const [isLoading, setIsLoading] = useState<boolean>(false); // Loading state
  const [errorMessage, setErrorMessage] = useState<string>(''); // Error message state

  // Fetch streak data from backend
  useEffect(() => {
    axios.get('http://localhost:3001/streak')
      .then((response) => {
        const { streak, lastStreakDate } = response.data;
        const currentDate = new Date().toISOString().split('T')[0];

        if (lastStreakDate === currentDate) {
          setStreak(streak);
        } else if (lastStreakDate) {
          setStreak(1); // If streak date is different, reset to 1
        } else {
          setStreak(1); // If no data, start with streak 1
        }
      })
      .catch((error) => {
        console.error('Error fetching streak data:', error);
        setErrorMessage('Failed to load streak data.');
      });
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

  // Handle completion of action and updating streak
  const handleActionComplete = async () => {
    setIsLoading(true); // Set loading state
    setErrorMessage(''); // Clear any previous error message

    const currentDate = new Date().toISOString().split('T')[0];
    const lastStreakDate = localStorage.getItem('lastStreakDate') || ''; // Default to empty string if null
    let currentStreak = streak;

    // Check if the action was completed today
    if (lastStreakDate === currentDate) {
      setIsLoading(false); // Reset loading state if already done today
      return; // Action was already completed today, do nothing
    }

    if (lastStreakDate !== currentDate && streak > 0) {
      currentStreak = streak + 1; // Increment streak if action was completed today
    }

    const requestData = {
      currentStreak,
      lastStreakDate: currentDate, // Use current date for update
    };

    try {
      const response = await fetch('http://localhost:3001/streak', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();
      if (response.ok) {
        setStreak(data.data.streak); // Update streak in React state
        localStorage.setItem('lastStreakDate', currentDate); // Save the current date to localStorage
      } else {
        setErrorMessage(data.message || 'Something went wrong!'); // Handle API error message
      }
    } catch (error) {
      console.error('Error updating streak:', error);
      setErrorMessage('Failed to update streak. Please try again later.'); // Generic error message
    }

    setIsLoading(false); // Reset loading state after API call
  };

  return (
    <div className="streaks-rewards">
      <h2>Kindness Streaks & Rewards</h2>
      <div className="streak-display">
        <h3>Streak: {streak} {streak === 1 ? 'day' : 'days'}</h3>
        <p>{rewardMessage}</p>
        <div className="badge-display">{currentBadge}</div>
      </div>

      {/* Display error message if any */}
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {/* Button with loading and action completion */}
      <button onClick={handleActionComplete} disabled={isLoading}>
        {isLoading ? 'Updating...' : 'Complete a Good Action'}
      </button>
    </div>
  );
};

export default StreaksAndRewards;
