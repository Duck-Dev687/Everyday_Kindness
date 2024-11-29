import React, { useState } from 'react';
import { useChallenges } from './context/ChallengesContext';


interface Challenge {
  id: number;
  text: string;
}


const challengesByLocation: Record<string, Challenge[]> = {
  home: [
    { id: 1, text: "Write a thank-you note to someone." },
    { id: 2, text: "Call a family member to check in." },
    { id: 3, text: "Do one chore that will make someone smile." },
    { id: 4, text: "Cook a meal for someone at home." },
    { id: 5, text: "Compliment each family member today." },
    { id: 6, text: "Share a funny story or joke to brighten the atmosphere." },
    { id: 7, text: "Donate unused items online or to charity." },
    { id: 8, text: "Plan a surprise activity for your household." },
    { id: 9, text: "Make a gratitude list and share it with your family." },
    { id: 10, text: "Organize a family game night." },
  ],
  transportation: [
    { id: 11, text: "Offer your seat to someone in need." },
    { id: 12, text: "Smile at a stranger." },
    { id: 13, text: "Help someone with their luggage or bags." },
    { id: 14, text: "Strike up a friendly conversation with a fellow passenger." },
    { id: 15, text: "Let someone go ahead of you in line." },
    { id: 16, text: "Share a positive story or experience." },
    { id: 17, text: "Pick up trash to keep the area clean." },
    { id: 18, text: "Say 'thank you' to your driver." },
    { id: 19, text: "Help someone navigate directions." },
    { id: 20, text: "Spread positive vibes by listening to uplifting music." },
  ],
  school: [
    { id: 21, text: "Compliment a teacher or staff member." },
    { id: 22, text: "Invite someone sitting alone to join your group." },
    { id: 23, text: "Help a classmate with homework." },
    { id: 24, text: "Write a thank-you note to a teacher or mentor." },
    { id: 25, text: "Encourage someone struggling with a subject." },
    { id: 26, text: "Organize or participate in a study group." },
    { id: 27, text: "Hold the door open for others." },
    { id: 28, text: "Pick up litter around the campus." },
    { id: 29, text: "Say something positive during a group discussion." },
    { id: 30, text: "Start a kindness challenge with friends." },
  ],
  park: [
    { id: 31, text: "Pick up litter to keep the park clean." },
    { id: 32, text: "Compliment a stranger on something nice." },
    { id: 33, text: "Share snacks with someone." },
    { id: 34, text: "Help someone carry items like picnic gear." },
    { id: 35, text: "Start a group activity, like a game or yoga session." },
    { id: 36, text: "Smile and greet passersby." },
    { id: 37, text: "Offer to take a photo for a family or group." },
    { id: 38, text: "Thank park staff for their work." },
    { id: 39, text: "Donate to park conservation efforts." },
    { id: 40, text: "Leave positive messages on rocks or benches." },
  ],
};

const LocationChallenges: React.FC= () => {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  
  const { incrementTaskCount } = useChallenges();


  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);
    setSelectedChallenge(null);
    setStatus(null);
  };

  const handleChallengeSelect = (challenge: Challenge) => {
    setSelectedChallenge(challenge);
    setStatus(null);
  };

  const handleDone = () => {
    setStatus('done');
    incrementTaskCount(); // Notify parent about challenge completion
  };

  return (
    <div className="location-challenges">
      <h2>Where are you now?</h2>
      <div className="location-buttons">
        {Object.keys(challengesByLocation).map((location) => (
          <button key={location} onClick={() => handleLocationSelect(location)}>
            {location.charAt(0).toUpperCase() + location.slice(1)}
          </button>
        ))}
      </div>

      {selectedLocation && (
        <div className="challenge-list">
          <h3>Challenges for {selectedLocation}:</h3>
          <ul>
            {challengesByLocation[selectedLocation].map((challenge) => (
              <li
                key={challenge.id}
                className={selectedChallenge?.id === challenge.id ? 'selected' : ''}
                onClick={() => handleChallengeSelect(challenge)}
              >
                {challenge.text}
              </li>
            ))}
          </ul>

          {status === 'done' && <p>Great job on completing the challenge!</p>}

          {selectedChallenge && (
            <div>
              <p>Selected Challenge: <strong>{selectedChallenge.text}</strong></p>
              <button onClick={handleDone}>Mark as Done</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LocationChallenges;
