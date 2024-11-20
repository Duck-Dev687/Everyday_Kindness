const express = require('express');
const fs = require('fs');
const cors = require('cors'); // Import cors

const app = express();
const port = 3001;

// Use CORS middleware to allow requests from the React frontend
app.use(cors()); // Allow all domains (you can restrict it for production)

// Middleware to parse JSON bodies
app.use(express.json()); // Use built-in Express JSON parser

// File to store streak data
const streaksFile = './streaks.json';

// Load current streak data from file
// Load current streak data from file
const loadStreakData = () => {
    try {
      const data = fs.readFileSync(streaksFile, 'utf8');
      
      if (!data) {
        // Return default data if file is empty
        return { streak: 0, lastStreakDate: '' };
      }
  
      return JSON.parse(data);
    } catch (err) {
      console.error('Error reading streak file:', err);
      
      // If there is an error parsing, return default data
      return { streak: 0, lastStreakDate: '' };
    }
  };
  

// Save streak data to file
const saveStreakData = (streakData) => {
  try {
    fs.writeFileSync(streaksFile, JSON.stringify(streakData, null, 2));
  } catch (err) {
    console.error('Error saving streak data:', err);
  }
};

// GET route to retrieve streak data
app.get('/streak', (req, res) => {
  const streakData = loadStreakData();
  res.json(streakData); // Respond with the streak data in JSON format
});

// POST route to update streak data
app.post('/streak', (req, res) => {
  const { currentStreak, lastStreakDate } = req.body;
  const currentDate = new Date().toISOString().split('T')[0]; // Current date in YYYY-MM-DD format

  let newStreak = currentStreak;

  if (lastStreakDate === currentDate) {
    // If the action was completed today, do nothing, just return current streak
    return res.json({ message: 'Streak remains the same', streak: newStreak });
  } else {
    const lastDate = new Date(lastStreakDate);
    const today = new Date(currentDate);
    const diffDays = Math.ceil((today.getTime() - lastDate.getTime()) / (1000 * 3600 * 24));

    if (diffDays === 1) {
      newStreak += 1; // Increment streak
    } else {
      newStreak = 1; // Reset streak if not consecutive (skipped a day)
    }
  }

  // Save the updated streak data to the file
  const streakData = { streak: newStreak, lastStreakDate: currentDate };
  saveStreakData(streakData);

  // Send the updated streak data back to the client
  res.json({ message: 'Streak data updated successfully', data: streakData });
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
