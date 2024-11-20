import React, { useState } from 'react';

// Define props for the component
interface KindnessCategoriesProps {
  onTaskComplete: () => void;
}

const categories = [
  {
    id: 1,
    title: 'Acts of Kindness',
    description: 'Small everyday gestures that brighten someone’s day.',
    tasks: [
      'Compliment a friend or family member.',
      'Help someone carry their groceries.',
      'Offer your seat to someone in need.',
    ],
  },
  {
    id: 2,
    title: 'Volunteer Work',
    description: 'Give your time to help organizations and communities in need.',
    tasks: [
      'Volunteer at a local shelter.',
      'Donate clothes or toys to charity.',
      'Help clean up a local park.',
    ],
  },
  {
    id: 3,
    title: 'Words of Encouragement',
    description: 'Support and uplift others with kind and positive words.',
    tasks: [
      'Write a motivational message to someone.',
      'Send an uplifting text to a friend.',
      'Post a positive quote on social media.',
    ],
  },
  {
    id: 4,
    title: 'Donations',
    description: 'Share your resources with those who need them the most.',
    tasks: [
      'Donate money to a cause you care about.',
      'Donate food to a food bank.',
      'Give unwanted items to a charity shop.',
    ],
  },
  {
    id: 5,
    title: 'Random Acts of Kindness',
    description: 'Do something nice for someone without expecting anything in return.',
    tasks: [
      'Buy a coffee for the person behind you in line.',
      'Leave a kind note for a stranger.',
      'Pay for someone’s parking meter.',
    ],
  },
];

const KindnessCategories: React.FC<KindnessCategoriesProps> = ({ onTaskComplete }) => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [completedTasks, setCompletedTasks] = useState<number[]>([]);
  const [status, setStatus] = useState<string | null>(null);

  const handleCategoryClick = (id: number) => {
    setSelectedCategory(id);
    setCompletedTasks([]); // Reset completed tasks when changing category
    setStatus(null); // Reset status
  };

  const handleTaskCompletion = (taskIndex: number) => {
    if (!completedTasks.includes(taskIndex)) {
      setCompletedTasks((prev) => [...prev, taskIndex]);
      onTaskComplete(); // Notify the parent component
    }
  };

  const currentCategory = categories.find((category) => category.id === selectedCategory);

  const handleAllTasksCompleted = () => {
    if (completedTasks.length === currentCategory?.tasks.length) {
      setStatus('done');
    }
  };

  // Trigger completion status check after each task is completed
  React.useEffect(() => {
    if (currentCategory) {
      handleAllTasksCompleted();
    }
  }, [completedTasks, currentCategory]);

  return (
    <div className="kindness-categories">
      <h2>Choose a Kindness Category</h2>
      <div className="category-list">
        {categories.map((category) => (
          <div
            key={category.id}
            className={`category-item ${selectedCategory === category.id ? 'selected' : ''}`}
            onClick={() => handleCategoryClick(category.id)}
          >
            <h3>{category.title}</h3>
            <p>{category.description}</p>
          </div>
        ))}
      </div>

      {selectedCategory !== null && currentCategory && (
        <div className="category-details">
          <h3>Selected Category: {currentCategory.title}</h3>
          <p>{currentCategory.description}</p>

          <h4>Tasks to Complete:</h4>
          <ul>
            {currentCategory.tasks.map((task, index) => (
              <li
                key={index}
                className={completedTasks.includes(index) ? 'completed' : ''}
                onClick={() => handleTaskCompletion(index)}
                style={{ cursor: 'pointer' }}
              >
                {task}
                {completedTasks.includes(index) && <span> (Completed!)</span>}
              </li>
            ))}
          </ul>

          {status === 'done' && (
            <div className="congratulations-message">
              <h4>Congratulations! You've completed all tasks in this category!</h4>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default KindnessCategories;
