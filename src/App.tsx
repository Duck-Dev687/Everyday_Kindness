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
import AIGeneratedSuggestions from './components/AIGeneratedSuggestions';
import UserSubmittedChallenges from './components/UserSubmittedChallenges';
import KindnessMap from './components/KindnessMap';
import MoodBoosters from './components/MoodBoosters';
import EventCalendar from './components/EventCalendar';
import KindnessWishlist from './components/KindnessWishlist';
import SocialGoodPartners from './components/SocialGoodPartners';
import ChildrenFriendlyVersion from './components/ChildrenFriendlyVersion';
import OfflineMode from './components/OfflineMode';
import MultilingualSupport from './components/MultilingualSupport';

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
        {/* ////////////////////////////////////////// */}
        {/* ////////////////////////////////////////// */}
        {/* ////////////THE STREAKS IN 3 MUSST BE EDITED LATER TO NOT BE STATIC//////////////////// */}
        {/* ////////////////////////////////////////// */}
        {/* ////////////////////////////////////////// */}
        <StreaksAndRewards></StreaksAndRewards>
        <LocationChallenges></LocationChallenges>
        <KindnessCategories />
      
      </main>
      
    </div>
  );
}

export default App;
