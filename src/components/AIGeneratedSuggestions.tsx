//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

import React, { useState } from 'react';
import axios from 'axios';

// Hugging Face API URL and Key
const API_URL = 'https://api-inference.huggingface.co/models/microsoft/Phi-3-mini-4k-instruct';
const API_KEY =  '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';


const AIGeneratedSuggestions: React.FC = () => {
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
  
    // Array of prompts to vary inputs
    const prompts = [
      'Generate creative acts of kindness for friends:',
      'Suggest unique ways to show kindness to strangers:',
      'What are some thoughtful ways to make someone smile today?',
      'Provide simple acts of kindness that anyone can do.',
      'List meaningful ways to spread positivity and kindness.',
    ];
  
    const fetchSuggestions = async () => {
      setIsLoading(true);
      setError(null);
  
      // Select a random prompt
      const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
  
      try {
        const response = await axios.post(
          API_URL,
          {
            inputs: randomPrompt, // Dynamic input for the AI
            parameters: {
              temperature: 0.8, // Adjusting randomness for varied results
            },
          },
          {
            headers: {
              Authorization: `Bearer ${API_KEY}`,
              'Content-Type': 'application/json',
              'Cache-Control': 'no-cache', // Prevent cached results
            },
          }
        );
  
        // Extract generated text from the response
        const content = response.data[0]?.generated_text || '';
        if (content) {
          // Split the response into individual suggestions
          const newSuggestions = content.trim().split('\n').filter(Boolean);
          setSuggestions(newSuggestions);
        } else {
          throw new Error('No content returned from AI.');
        }
      } catch (err: any) {
        setError(err.response?.data?.error || err.message || 'An unexpected error occurred.');
      } finally {
        setIsLoading(false);
      }
    };
  

  return (
    <div className="ai-generated-suggestions">
      <h2>✨ AI-Generated Kindness Suggestions ✨</h2>

      <button onClick={fetchSuggestions} disabled={isLoading}>
        {isLoading ? 'Generating...' : 'Get Kindness Ideas'}
      </button>

      {error && <p className="error-message">{error}</p>}

      <ul className="suggestions-list">
        {suggestions.map((suggestion, index) => (
          <li key={index}>
            <span className="suggestion-index">{index + 1}.</span> {suggestion}
          </li>
        ))}
      </ul>

    </div>
  );
};

export default AIGeneratedSuggestions;
