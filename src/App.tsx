import React, { useState, useEffect } from 'react';

// Importing necessary components for different features
import GratitudeReflection from './components/GratitudeReflection'; //✅
import KindnessTracker from './components/KindnessTracker';
import StreaksAndRewards from './components/StreaksAndRewards';
import LocationChallenges from './components/LocationChallenges';
import KindnessCategories from './components/KindnessCategories';
import RealTimeAlerts from './components/RealTimeAlerts';
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
    // State to store the user's gratitude reflection
    const [gratitude, setGratitude] = useState<string>('');

    // Function to log gratitude and update the state
    const logGratitude = (gratitudeText: string) => {
      setGratitude(gratitudeText); // Update the gratitude state with the new reflection
    };
  return (
    <div className="App">
      {/* <header>NEED TO MAKE NAV LATER</header> */}

      <main>
        <GratitudeReflection logGratitude={logGratitude} gratitude={gratitude} ></GratitudeReflection>
      </main>
    </div>
  );
}

export default App;
