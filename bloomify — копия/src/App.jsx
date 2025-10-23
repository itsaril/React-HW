// src/App.jsx

// 1. Импортируем хуки
import { useState, useEffect } from 'react';

// 2. Импортируем дочерние компоненты
//...
import Search from "./components/Search.jsx";
import FlowerCard from "./components/FlowerCard.jsx";
import FlowerDetail from "./components/FlowerDetail.jsx";

// 3. Импортируем стили
import './App.css';

// === !!! ВАЖНО !!! ===
// ВСТАВЬ СЮДА СВОЙ КЛЮЧ, который ты получила с perenual.com
const API_KEY = "sk-NpyG68f8c75b17a6b13054"; 
// Например: const API_KEY = "sk-xxxx....";

function App() {
  
  // --- STATE (Состояние) ---
  // Используем useState из лекций
  
  // 1. Для списка цветов с API
  const [flowerList, setFlowerList] = useState([]);
  // 2. Для поискового запроса от пользователя
  const [searchQuery, setSearchQuery] = useState("rose");
  // 3. Для показа "страницы" с деталями (условный рендеринг)
  const [selectedFlower, setSelectedFlower] = useState(null);
  // 4. Для Loading... и Error... (из критериев)
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);

  // --- EFFECTS (Эффекты) ---
  
  // Этот useEffect будет загружать СПИСОК цветов
  // Он сработает, когда 'searchQuery' изменится
  useEffect(() => {
    // Не ищем, если ключ не вставлен
    if (API_KEY === "YOUR_KEY_HERE") {
      setIsError("Please add your API key to App.jsx");
      setIsLoading(false);
      return;
    }
    
    // Не ищем, если строка пустая
    if (!searchQuery) {
      setFlowerList([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true); // Показываем "Загрузка..."
    setIsError(null);   // Сбрасываем старую ошибку
    
    // Мы используем /api/... из-за proxy в vite.config.js
    const url = `/api/api/v2/species-list?key=${API_KEY}&q=${searchQuery}`;
    
    // Используем fetch (Promise) из лекций
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setFlowerList(data.data); // Сохраняем массив цветов в state
        setIsLoading(false); // Выключаем "Загрузка..."
      })
      .catch(error => {
        // Обработка ошибок (из критериев)
        console.error('Fetch error:', error);
        setIsError(error.message);
        setIsLoading(false);
      });
      
  }, [searchQuery]); // Массив зависимостей

  // --- HANDLERS (Обработчики событий) ---
  
  // Эту функцию мы передаем как prop в <Search>
  const handleSearch = (query) => {
    setSearchQuery(query); // Обновляем state
    setSelectedFlower(null); // Закрываем детали, если они были открыты
  };

  // Эту функцию мы передаем в <FlowerDetail>
  const handleBackClick = () => {
    setSelectedFlower(null); // Сбрасываем, чтобы вернуться к списку
  };

  // --- RENDER (Отрисовка) ---
  
  // Функция для рендера контента (загрузка, ошибка, список)
  const renderContent = () => {
    if (isLoading) {
      return <div className="message-container">Loading flowers... 🌸</div>;
    }
    
    if (isError) {
      return <div className="message-container">Error: {isError} 😢</div>;
    }
    
    if (flowerList.length === 0 && searchQuery) {
      return <div className="message-container">No flowers found. Try another search.</div>;
    }

    // Рендерим список, используя .map()
    return (
      <div className="flower-list">
        {flowerList.map(flower => (
          <FlowerCard
            key={flower.id}
            flower={flower}
            // Передаем функцию, которая запомнит, какой цветок выбрали
            onClick={() => setSelectedFlower(flower)}
          />
        ))}
      </div>
    );
  }

  // --- ГЛАВНЫЙ RETURN ---
  
  return (
    <>
      <header className="header">
        <h1>Bloomify</h1>
        <p>Find your next favorite flower</p>
      </header>

      {/* Условный рендеринг:
        - Если 'selectedFlower' НЕ null, показываем <FlowerDetail>
        - Иначе, показываем <Search> и список
      */}
      
      {selectedFlower ? (
        <FlowerDetail 
          flower={selectedFlower} 
          onBack={handleBackClick} 
        />
      ) : (
        <>
          <Search onSearch={handleSearch} />
          {renderContent()}
        </>
      )}
    </>
  );
}

export default App;