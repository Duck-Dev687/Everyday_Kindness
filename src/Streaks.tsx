import { updateStreak } from "./utils/updateStreak"; // Path to streak logic
import React, { useEffect, useState } from "react";

interface StreaksProps {
  userId: string;
}

const Streaks: React.FC<StreaksProps> = ({ userId }) => {
  const [streak, setStreak] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStreak = async () => {
      try {
        const streakCount = await updateStreak(userId);
        setStreak(streakCount);
      } catch (err) {
        console.error("Error fetching streak:", err);
        setError("Failed to load streak.");
      }
    };

    fetchStreak();
  }, [userId]);

  return (
    <div>
      <h2>Your Current Streak</h2>
      {error ? (
        <p>{error}</p>
      ) : streak !== null ? (
        <p>{streak} day(s)</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Streaks;
