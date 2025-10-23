import React from 'react';

// Это тоже "глупый" компонент.
// Он получает список городов (cities) и функцию (onCityClick) через props.
// (Критерий 1)

function CityList({ cities, onCityClick, loading, selectedCountry }) {
  
  // Условный рендеринг (Лекция 4)
  if (loading) {
    return <p>Загрузка городов...</p>;
  }

  // Если страну еще не выбрали
  if (!selectedCountry) {
    return <p>Пожалуйста, сначала выберите страну.</p>;
  }

  // Если страна выбрана, но города (пока) не загружены
  if (cities.length === 0) {
    return <p>Для этой страны города не найдены или идет загрузка...</p>;
  }

  // Если все хорошо, показываем список
  return (
    <div className="city-list">
      <h3>2. Города в {selectedCountry}:</h3>
      <ul>
        {cities.map(city => (
          // Событие onClick (Критерий 2)
          // Мы используем стрелочную функцию, чтобы передать
          // конкретный 'city' в обработчик
          // (Лекция 6, Слайд 11 - Passing Arguments)
          <li key={city} onClick={() => onCityClick(city)}>
            {city}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CityList;