import React, { useState, useEffect } from 'react';

interface GratitudeReflectionProps {
  logGratitude: (gratitudeText: string) => void;
  gratitude: string;
}

const GratitudeReflection: React.FC<GratitudeReflectionProps> = ({ logGratitude, gratitude }) => {
  const [gratitudeInput, setGratitudeInput] = useState<string>(''); // For holding the user's input
  const [isInputDisabled, setIsInputDisabled] = useState<boolean>(false); // To manage input disabled state
  const [lastSubmissionDate, setLastSubmissionDate] = useState<string>(''); // Track the last submission date
  const [isEditing, setIsEditing] = useState<boolean>(false); // Track whether the user is editing the gratitude

  // Handle input changes
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGratitudeInput(event.target.value);
  };

  // Handle form submission to log or update gratitude
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    logGratitude(gratitudeInput); // Pass the input to the parent component
    setIsInputDisabled(true); // Disable input after submission
    setLastSubmissionDate(new Date().toLocaleDateString()); // Store the current date
    setIsEditing(false); // Disable editing after submission
    setGratitudeInput(''); // Reset input field after submission
  };

  // Check if it's a new day and reset the input field
  useEffect(() => {
    const today = new Date().toLocaleDateString();
    if (lastSubmissionDate && lastSubmissionDate !== today) {
      setIsInputDisabled(false); // Enable the input for the new day
      setGratitudeInput(''); // Clear input field for the new day
    }
  }, [lastSubmissionDate]);

  // Handle editing of gratitude
  const handleEdit = () => {
    setIsEditing(true); // Allow the user to edit the gratitude
    setGratitudeInput(gratitude); // Pre-fill the input with the existing gratitude text
    setIsInputDisabled(false); // Enable input for editing
  };

  return (
    <div className="gratitude-reflection">
      <h2>Daily Gratitude Reflection</h2>

      {/* Display the current gratitude if available */}
      {gratitude && !isEditing && <p><strong>Your Gratitude:</strong> {gratitude}</p>}

      {/* Form for gratitude input */}
      {!isInputDisabled && (
        <form onSubmit={handleSubmit}>
          <label htmlFor="gratitude">What are you grateful for today?</label>
          <input
            type="text"
            id="gratitude"
            value={gratitudeInput}
            onChange={handleInputChange}
            placeholder="Enter your gratitude..."
          />
          <button type="submit">Log Gratitude</button>
        </form>
      )}

      {/* If the user has already logged gratitude and it's not being edited */}
      {gratitude && !isEditing && isInputDisabled && (
        <div className="gratitude-preview">
          <h3>Your Gratitude for Today:</h3>
          <p>{gratitude}</p>
          <button onClick={handleEdit}>Edit Gratitude</button> {/* Allow the user to edit */}
        </div>
      )}

      {/* Show the current gratitude reflection as preview if the input box is disabled */}
      {gratitudeInput && !isInputDisabled && (
        <div className="gratitude-preview">
          <h3>Your Reflection:</h3>
          <p>{gratitudeInput}</p>
        </div>
      )}

      {/* If input is disabled (i.e., gratitude has been logged), show a message */}
      {isInputDisabled && !gratitude && (
        <p>You have already logged your gratitude for today. Come back tomorrow!</p>
      )}
    </div>
  );
};

export default GratitudeReflection;
