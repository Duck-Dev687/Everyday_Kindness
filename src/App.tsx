import React, { useState, useEffect } from 'react';

// Importing necessary components for different features
//❗📌⚠️🚨add save history❗📌⚠️🚨
import GratitudeReflection from './components/GratitudeReflection'; //✅😊
import KindnessTracker from './components/KindnessTracker';//✅😊
import StreaksAndRewards from './components/StreaksAndRewards';//😊😊make it saves the acts to let it be a streak❗📌⚠️🚨
import LocationChallenges from './components/LocationChallenges';//😊😊put it in another parent component that displays such things❗📌⚠️🚨
import KindnessCategories from './components/KindnessCategories';//😊😊
import RealTimeAlerts from './components/RealTimeAlerts';//❗📌⚠️🚨
import KindnessLibrary from './components/KindnessLibrary';
// import AIGeneratedSuggestions from './components/AIGeneratedSuggestions';❗📌⚠️🚨
import UserSubmittedChallenges from './components/UserSubmittedChallenges';
import KindnessMap from './components/KindnessMap';
import MoodBoosters from './components/MoodBoosters';
import KindnessWishlist from './components/KindnessWishlist';
import AIGeneratedSuggestions from './components/AIGeneratedSuggestions';


// App component
const App: React.FC = () => {
    // 1111111111111111111111111111111111
    const [gratitude, setGratitude] = useState<string>('');

    // Function to log gratitude and update the state
    const logGratitude = (gratitudeText: string) => {
      setGratitude(gratitudeText); // Update the gratitude state with the new reflection
    };
    ///////////////////////////////////////
    //2222222222222222222222222222222222222
    const [completedActs, setCompletedActs] = useState(10);
    const [goal, setGoal] = useState(20);
    
    const handleGoalChange = (newGoal: number) => {
      setGoal(newGoal);
    };
    ///////////////////////////////////////
    const [streak, setStreak] = useState<number>(19);
    ///////////////////////////////////////
    




    const [completedChallenges, setCompletedChallenges] = useState<number>(0);  // Tracks the number of completed challenges
    // const [streak, setStreak] = useState<number>(0);  // Tracks the current streak
    const [awards, setAwards] = useState<string[]>([]);  // Tracks the awards
  
    // Handle task completion
    const handleTaskCompletion = () => {
      setCompletedChallenges((prev) => prev + 1);
      setStreak((prev) => prev + 1);  // Increment streak
      checkAwards();
    };
  
    // Check for streak milestones and awards
    const checkAwards = () => {
      // Example award logic: 10 challenges = "Challenge Master" award
      if (completedChallenges >= 10 && !awards.includes('Challenge Master')) {
        setAwards((prevAwards) => [...prevAwards, 'Challenge Master']);
      }
  
      // Example streak logic: 5 days = "Streak Star" award
      if (streak >= 5 && !awards.includes('Streak Star')) {
        setAwards((prevAwards) => [...prevAwards, 'Streak Star']);
      }
    };


  return (
    <div className="App">
      {/* <header>NEED TO MAKE NAV LATER</header> */}

      <main>
        <GratitudeReflection logGratitude={logGratitude} gratitude={gratitude} ></GratitudeReflection>
        {/* ////////////////////////////////////////// */}
        <KindnessTracker
        completedActs={completedActs}
        goal={goal}
        onGoalChange={handleGoalChange}
        />

        <AIGeneratedSuggestions></AIGeneratedSuggestions>

        <StreaksAndRewards></StreaksAndRewards>
        <UserSubmittedChallenges></UserSubmittedChallenges>
        <KindnessLibrary />

        <MoodBoosters></MoodBoosters>
        <KindnessWishlist></KindnessWishlist>

      </main>
      
    </div>
  );
}

export default App;
