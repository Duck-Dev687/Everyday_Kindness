import React, { useState } from 'react';

interface Resource {
  id: number;
  category: string;
  title: string;
  description: string;
  link: string;
}

const resourcesData: Resource[] = [
  {
    id: 1,
    category: 'Acts of Kindness',
    title: 'Random Acts of Kindness',
    description: 'Discover small ways to brighten someone\'s day.',
    link: 'https://www.randomactsofkindness.org/',
  },
  {
    id: 2,
    category: 'Stories',
    title: 'The Kindness Blog',
    description: 'Read inspiring stories of kindness from around the world.',
    link: 'https://kindnessblog.com/',
  },
  {
    id: 3,
    category: 'Quotes',
    title: 'Kindness Quotes',
    description: 'A collection of quotes to inspire kindness in your life.',
    link: 'https://www.goodreads.com/quotes/tag/kindness',
  },
  {
    id: 4,
    category: 'Challenges',
    title: 'The Kindness Challenge',
    description: 'Commit to spreading kindness daily with this fun challenge.',
    link: 'https://www.kindnesschallenge.com/',
  },
  {
    id: 5,
    category: 'Stories',
    title: 'Global Kindness Stories',
    description: 'Explore acts of kindness in different cultures.',
    link: 'https://kindness.org/stories/',
  },
];

const KindnessLibrary: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const uniqueCategories = ['All', ...new Set(resourcesData.map((resource) => resource.category))];

  const filteredResources = selectedCategory === 'All'
    ? resourcesData
    : resourcesData.filter((resource) => resource.category === selectedCategory);

  return (
    <div className="kindness-library">
      <h2>Kindness Library</h2>
      <p>Explore our curated collection of kindness resources by category.</p>
      
      {/* Category Filters */}
      <div className="categories">
        {uniqueCategories.map((category) => (
          <button
            key={category}
            className={`category-button ${category === selectedCategory ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Resources List */}
      <div className="resource-list">
        {filteredResources.map((resource) => (
          <div className="resource-item" key={resource.id}>
            <h3>{resource.title}</h3>
            <p>{resource.description}</p>
            <a href={resource.link} target="_blank" rel="noopener noreferrer">
              Learn More →
            </a>
          </div>
        ))}
      </div>

      {/* Fallback for No Resources */}
      {filteredResources.length === 0 && (
        <p className="no-resources">No resources available for this category yet. Check back later!</p>
      )}
    </div>
  );
};

export default KindnessLibrary;
