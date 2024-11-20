const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors'); // Import cors

const app = express();
const port = 3001;

// Use CORS middleware to allow requests from the React frontend
app.use(cors()); // Allow all domains (you can restrict it for production)

// Middleware to parse JSON bodies
app.use(bodyParser.json());

app.use(express.json()); // Middleware to parse JSON request bodies
// File to store streak data
const streaksFile = './streaks.json';

// Load current streak data
const loadStreakData = () => {
  try {
    const data = fs.readFileSync(streaksFile, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return { streak: 0, lastStreakDate: '' }; // Default if file doesn't exist
  }
};

// Save streak data to file
const saveStreakData = (streakData) => {
  fs.writeFileSync(streaksFile, JSON.stringify(streakData, null, 2));
};

// Update streak data
app.post('/streak', (req, res) => {
  const { streak, lastStreakDate } = req.body;
  const streakData = { streak, lastStreakDate };
  saveStreakData(streakData);
  res.json(streakData);
  res.send({ message: 'Streak data saved successfully' });
});

// Get streak data
app.get('/streak', (req, res) => {
  const streakData = loadStreakData();
  res.json(streakData);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
