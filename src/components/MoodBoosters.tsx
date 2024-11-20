import React, { useState } from 'react';

const MoodBoosters: React.FC = () => {
  const [feeling, setFeeling] = useState<string | null>(null);

  // Function to handle emoji click
  const handleEmojiClick = (feeling: string) => {
    setFeeling(feeling);
  };

  // Suggestions for each feeling
  const suggestions: { [key: string]: string[] } = {
    down: [
      'Take a walk outside for fresh air.',
      'Talk to a friend or loved one.',
      'Try doing something creative like drawing or writing.',
      'Practice mindfulness or meditate for a few minutes.',
      "Write down what’s been bothering you to release your feelings.",
    ],
    neutral: [
      'Write down 3 things you are grateful for.',
      'Go for a short exercise or stretch.',
      'Try a new hobby or activity.',
      'Call or message someone you care about.',
    ],
    ok: [
      'Enjoy a warm cup of tea or coffee.',
      'Spend 10 minutes reading something inspiring.',
      'Take a break and relax for a few minutes.',
    ],
    good: [
      'Go outside and enjoy the sunshine.',
      'Do something kind for someone else.',
    ],
    great: [
      'Spread this happiness by sharing a compliment with someone.',
    ],
  };
  

  return (
    <div className="mood-selector">
      <h2>How are you feeling right now?</h2>

      <div className="emoji-container">
        <span
          role="img"
          aria-label="Feeling down"
          className={`emoji ${feeling === 'down' ? 'selected' : ''}`}
          onClick={() => handleEmojiClick('down')}
        >
          😢
        </span>
        <span
          role="img"
          aria-label="Feeling neutral"
          className={`emoji ${feeling === 'neutral' ? 'selected' : ''}`}
          onClick={() => handleEmojiClick('neutral')}
        >
          😐
        </span>
        <span
          role="img"
          aria-label="Feeling okay"
          className={`emoji ${feeling === 'ok' ? 'selected' : ''}`}
          onClick={() => handleEmojiClick('ok')}
        >
          😌
        </span>
        <span
          role="img"
          aria-label="Feeling good"
          className={`emoji ${feeling === 'good' ? 'selected' : ''}`}
          onClick={() => handleEmojiClick('good')}
        >
          🙂 
        </span>
        <span
          role="img"
          aria-label="Feeling great"
          className={`emoji ${feeling === 'great' ? 'selected' : ''}`}
          onClick={() => handleEmojiClick('great')}
        >
          😊
        </span>
      </div>

      {feeling && (
        <>
          <p className="feeling-message">
            You are feeling <strong>{feeling}</strong> right now.
          </p>

          <div className="suggestions">
            <h3>Suggestions to feel better:</h3>
            <ul>
              {suggestions[feeling].map((suggestion, index) => (
                <li key={index}>{suggestion}</li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default MoodBoosters;
