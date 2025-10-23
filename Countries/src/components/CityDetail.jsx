import React from 'react';

// И это "глупый" компонент.
// Он получает 'details' (объект с данными) и 'loading' (флаг)
// (Критерий 1)

function CityDetail({ details, loading }) {

  // Условный рендеринг (Лекция 4)
  if (loading) {
    return <p className="loading-details">Загрузка деталей города...</p>;
  }

  // Если details === null (ничего не выбрано или сброшено)
  if (!details) {
    return <p>Выберите город, чтобы увидеть детали.</p>;
  }
  
  // Если 'details' существуют, показываем карточку
  return (
    <div className="city-detail-card">
      <h2>{details.name}</h2>
      <img 
        src={details.imageUrl} 
        alt={`Фото ${details.name}`} 
        onError={(e) => { e.target.src = 'https://placehold.co/600x400?text=Error+Loading+Image'; }} // Заглушка на случай битой ссылки
      />
      <p>Население: {details.population}</p>
    </div>
  );
}

export default CityDetail;
