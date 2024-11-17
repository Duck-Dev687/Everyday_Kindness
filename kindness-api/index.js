const express = require('express');
const cors = require('cors'); // Allow cross-origin requests
const app = express();
const port = 3001;

app.use(cors());
// List of over 100 kindness challenges
const challenges = [
    { id: 1, text: "Compliment a stranger", type: "Compliment" },
    { id: 2, text: "Donate to a local charity", type: "Donation" },
    { id: 3, text: "Write a thank-you note to someone", type: "Gratitude" },
    { id: 4, text: "Help a neighbor with a task", type: "Help" },
    { id: 5, text: "Plant a tree or flower", type: "Environmental" },
    { id: 6, text: "Give a friend an unexpected call", type: "Connection" },
    { id: 7, text: "Buy coffee for the person behind you in line", type: "Kindness" },
    { id: 8, text: "Volunteer at a local shelter", type: "Volunteer" },
    { id: 9, text: "Make a homemade meal for someone", type: "Kindness" },
    { id: 10, text: "Send a care package to a friend", type: "Thoughtfulness" },
    { id: 11, text: "Leave a generous tip for a service worker", type: "Gratitude" },
    { id: 12, text: "Help someone carry their groceries", type: "Help" },
    { id: 13, text: "Give a book you loved to someone else", type: "Sharing" },
    { id: 14, text: "Hold the door open for someone", type: "Courtesy" },
    { id: 15, text: "Write a positive review for a local business", type: "Support" },
    { id: 16, text: "Give away clothes you no longer need", type: "Donation" },
    { id: 17, text: "Send a kind email to a colleague", type: "Gratitude" },
    { id: 18, text: "Tell someone you appreciate them", type: "Gratitude" },
    { id: 19, text: "Donate blood", type: "Health" },
    { id: 20, text: "Give a sincere compliment to someone", type: "Compliment" },
    { id: 21, text: "Help a student with their studies", type: "Help" },
    { id: 22, text: "Lend someone your headphones when they forget theirs", type: "Help" },
    { id: 23, text: "Share a motivational quote with someone who needs it", type: "Encouragement" },
    { id: 24, text: "Invite someone to lunch or coffee", type: "Connection" },
    { id: 25, text: "Buy someone a book they’ll enjoy", type: "Gift" },
    { id: 26, text: "Walk someone's dog for them", type: "Help" },
    { id: 27, text: "Give someone your seat on the bus or train", type: "Courtesy" },
    { id: 28, text: "Support a small local business", type: "Support" },
    { id: 29, text: "Smile at strangers", type: "Kindness" },
    { id: 30, text: "Leave an uplifting note on someone’s car", type: "Thoughtfulness" },
    { id: 31, text: "Offer to babysit for a friend", type: "Help" },
    { id: 32, text: "Offer to help someone with their project or work", type: "Help" },
    { id: 33, text: "Send flowers to someone without any reason", type: "Kindness" },
    { id: 34, text: "Volunteer at a food bank", type: "Volunteer" },
    { id: 35, text: "Pay for someone's parking meter", type: "Kindness" },
    { id: 36, text: "Share a funny meme to brighten someone's day", type: "Encouragement" },
    { id: 37, text: "Offer your help to someone who looks lost", type: "Help" },
    { id: 38, text: "Send an inspiring text message to a loved one", type: "Encouragement" },
    { id: 39, text: "Give someone a warm hug", type: "Kindness" },
    { id: 40, text: "Leave a kind message on a colleague’s desk", type: "Gratitude" },
    { id: 41, text: "Send an anonymous donation to a charity", type: "Donation" },
    { id: 42, text: "Give a handmade gift to someone special", type: "Gift" },
    { id: 43, text: "Offer a ride to someone who doesn't have transportation", type: "Help" },
    { id: 44, text: "Give up your time to tutor or mentor someone", type: "Help" },
    { id: 45, text: "Donate pet food or toys to an animal shelter", type: "Donation" },
    { id: 46, text: "Send a text to a friend you haven't talked to in a while", type: "Connection" },
    { id: 47, text: "Start a gratitude journal and share it with others", type: "Encouragement" },
    { id: 48, text: "Help someone with a DIY project", type: "Help" },
    { id: 49, text: "Offer to run an errand for a busy friend", type: "Help" },
    { id: 50, text: "Plant flowers in a community garden", type: "Environmental" },
    { id: 51, type: 'kindness', text: "Compliment a stranger" },
    { id: 52, type: 'kindness', text: "Donate to a local charity" },
    { id: 53, type: 'kindness', text: "Write a thank-you note to someone" },
    { id: 54, type: 'kindness', text: "Help a neighbor with a task" },
    { id: 55, type: 'kindness', text: "Plant a tree or flower" },
    { id: 56, type: 'kindness', text: "Give a friend an unexpected call" },
    { id: 57, type: 'kindness', text: "Buy coffee for the person behind you in line" },
    { id: 58, type: 'kindness', text: "Volunteer at a local shelter" },
    { id: 59, type: 'kindness', text: "Make a homemade meal for someone" },
    { id: 60, type: 'kindness', text: "Send a care package to a friend" },
    { id: 61, type: 'kindness', text: "Leave a generous tip for a service worker" },
    { id: 62, type: 'kindness', text: "Help someone carry their groceries" },
    { id: 63, type: 'kindness', text: "Give a book you loved to someone else" },
    { id: 64, type: 'kindness', text: "Hold the door open for someone" },
    { id: 65, type: 'kindness', text: "Write a positive review for a local business" },
    { id: 66, type: 'kindness', text: "Give away clothes you no longer need" },
    { id: 67, type: 'kindness', text: "Send a kind email to a colleague" },
    { id: 68, type: 'kindness', text: "Tell someone you appreciate them" },
    { id: 69, type: 'kindness', text: "Donate blood" },
    { id: 70, type: 'kindness', text: "Give a sincere compliment to someone" },
    { id: 71, type: 'kindness', text: "Help a student with their studies" },
    { id: 72, type: 'kindness', text: "Lend someone your headphones when they forget theirs" },
    { id: 73, type: 'kindness', text: "Share a motivational quote with someone who needs it" },
    { id: 74, type: 'kindness', text: "Invite someone to lunch or coffee" },
    { id: 75, type: 'kindness', text: "Buy someone a book they’ll enjoy" },
    { id: 76, type: 'kindness', text: "Walk someone's dog for them" },
    { id: 77, type: 'kindness', text: "Give someone your seat on the bus or train" },
    { id: 78, type: 'kindness', text: "Support a small local business" },
    { id: 79, type: 'kindness', text: "Smile at strangers" },
    { id: 80, type: 'kindness', text: "Leave an uplifting note on someone’s car" },
    { id: 81, type: 'kindness', text: "Offer to babysit for a friend" },
    { id: 82, type: 'kindness', text: "Offer to help someone with their project or work" },
    { id: 83, type: 'kindness', text: "Send flowers to someone without any reason" },
    { id: 84, type: 'kindness', text: "Volunteer at a food bank" },
    { id: 85, type: 'kindness', text: "Pay for someone's parking meter" },
    { id: 86, type: 'kindness', text: "Share a funny meme to brighten someone's day" },
    { id: 87, type: 'kindness', text: "Offer your help to someone who looks lost" },
    { id: 88, type: 'kindness', text: "Send an inspiring text message to a loved one" },
    { id: 89, type: 'kindness', text: "Give someone a warm hug" },
    { id: 90, type: 'kindness', text: "Leave a kind message on a colleague’s desk" },
    { id: 91, type: 'kindness', text: "Send an anonymous donation to a charity" },
    { id: 92, type: 'kindness', text: "Give a handmade gift to someone special" },
    { id: 93, type: 'kindness', text: "Offer a ride to someone who doesn't have transportation" },
    { id: 94, type: 'kindness', text: "Give up your time to tutor or mentor someone" },
    { id: 95, type: 'kindness', text: "Donate pet food or toys to an animal shelter" },
    { id: 96, type: 'kindness', text: "Send a text to a friend you haven't talked to in a while" },
    { id: 97, type: 'kindness', text: "Start a gratitude journal and share it with others" },
    { id: 98, type: 'kindness', text: "Help someone with a DIY project" },
    { id: 99, type: 'kindness', text: "Offer to run an errand for a busy friend" },
    { id: 100, type: 'kindness', text: "Plant flowers in a community garden" }

  ];
  
// Function to generate a random challenge
const generateChallenge = () => {
    const randomIndex = Math.floor(Math.random() * challenges.length);
    const newChallenge = challenges[randomIndex];
    return newChallenge; // Directly return the challenge object
  };
  
  // Endpoint to get a random challenge
  app.get('/api/challenge', (req, res) => {
    const randomChallenge = generateChallenge();
    res.json(randomChallenge); // Return the full challenge object directly
  });
  
  app.listen(port, () => {
    console.log(`API is running on http://localhost:${port}`);
  });