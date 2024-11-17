import React, { useState } from "react";

// Props type
type FormProps = {
  onSuccess: (name: string) => void; // Callback to pass validated name back to the parent
};

const Form: React.FC<FormProps> = ({ onSuccess }) => {
  // State for form and validation
  const [formStep, setFormStep] = useState<"name" | "age">("name");
  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Handle name submission
  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      setErrorMessage("");
      setFormStep("age");
    } else {
      setErrorMessage("Please enter your name.");
    }
  };

  // Handle age submission
  const handleAgeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (age === null || isNaN(age)) {
      setErrorMessage("Please enter a valid age.");
      return;
    }
    if (age > 18) {
      setErrorMessage("");
      onSuccess(name); // Pass the name back to the parent
    } else {
      setErrorMessage("Our app is designed for users above 18 years old.");
    }
  };

  return (
    <div>
      {formStep === "name" && (
        <form onSubmit={handleNameSubmit}>
          <h1>Welcome to Everyday Kindness!</h1>
          <p>First, please tell us your name.</p>
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          <button type="submit">Next</button>
        </form>
      )}

      {formStep === "age" && (
        <form onSubmit={handleAgeSubmit}>
          <h1>Hello, {name}!</h1>
          <p>How old are you?</p>
          <input
            type="number"
            placeholder="Your age"
            value={age || ""}
            onChange={(e) => setAge(parseInt(e.target.value))}
          />
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          <button type="submit">Next</button>
        </form>
      )}
    </div>
  );
};

export default Form;
