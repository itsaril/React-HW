import { useState, useEffect } from 'react';
import Search from "./components/Search.jsx"; 
import CategoryCard from "./components/CategoryCard.jsx";
import FlowerCard from "./components/FlowerCard.jsx";
import './App.css';

const API_KEY = "sk-NpyG68f8c75b17a6b13054"; 
const categories = [
  { name: "Rose", imageUrl: "https://avatars.mds.yandex.net/i?id=3a037329cc70b7f88e4a8d498b00c53cadb4f955-5312795-images-thumbs&n=13" },
  { name: "Peony", imageUrl: "https://avatars.mds.yandex.net/i?id=258c2be1f0f31a412a282ddb9213b9e1cbdacc75-4504463-images-thumbs&n=13" },
  { name: "Sunflower", imageUrl: "https://i.pinimg.com/originals/f5/26/15/f52615f3e8b12f6d1e416966ac4d29e5.jpg" },
  { name: "Tulip", imageUrl: "https://i.pinimg.com/736x/1d/c4/e8/1dc4e8bca4c2627c8c6d69dba8094c97.jpg" },
];

function App() {

  const [flowerList, setFlowerList] = useState([]);
  const [activeQuery, setActiveQuery] = useState(null); 
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);

  useEffect(() => {
    if (!activeQuery) {
      setFlowerList([]); 
      return;
    }

    setIsLoading(true); 
    setIsError(null);   

    const url = `/api/api/v2/species-list?key=${API_KEY}&q=${activeQuery}`;
    
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setFlowerList(data.data); 
        setIsLoading(false); 
      })
      .catch(error => {
        setIsError(error.message);
        setIsLoading(false);
      });
      
  }, [activeQuery]); 
  
  const handleSearch = (query) => {
    setActiveQuery(query); 
  };

  const handleCategoryClick = (categoryName) => {
    setActiveQuery(categoryName); 
  };
  
  const handleBack = () => {
    setActiveQuery(null);
  };

  if (!activeQuery) {
    return (
      <>
        <header className="header">
          <h1>Bloomify</h1>
          <p>Find your favorite flower</p>
        </header>
        
        <Search onSearch={handleSearch} />
        
        <div className="flower-list">
          {categories.map(category => (
            <CategoryCard
              key={category.name}
              name={category.name}
              imageUrl={category.imageUrl}
              onClick={() => handleCategoryClick(category.name)}
            />
          ))}
        </div>
      </>
    );
  }
  
  return (
    <>
      <header className="header">
        <h1>Bloomify</h1>
        <p>Results for "{activeQuery}"</p>
      </header>
      
      <button 
        className="back-to-categories-button"
        onClick={handleBack}
      >
        &larr; Back 
      </button>

      {}
      {isLoading && <div className="message-container">Loading...</div>}
      
      {isError && <div className="message-container">Error: {isError} </div>}
      
      {!isLoading && !isError && (
        <div className="flower-list">
          {flowerList.length === 0 && (
            <div className="message-container">No flowers found.</div>
          )}
          {flowerList.map(flower => (
            <FlowerCard key={flower.id} flower={flower} />
          ))}
        </div>
      )}
    </>
  );
}

export default App;