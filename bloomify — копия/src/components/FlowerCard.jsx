import React from 'react';

// Получаем 'flower' (объект) и 'onClick' (функцию) через props
function FlowerCard({ flower, onClick }) {

  // Эта логика остается, как в прошлый раз
  const imageUrl = flower.default_image && flower.default_image.medium_url 
    ? flower.default_image.medium_url 
    : "https://via.placeholder.com/280x200?text=No+Image";
  
  const placeholderUrl = "https://via.placeholder.com/280x200?text=No+Image";

  // === ВОТ НОВОЕ РЕШЕНИЕ ===
  // Эта функция сработает, если 'imageUrl' не загрузится
  const handleImageError = (event) => {
    // event.target - это и есть наш <img>
    event.target.src = placeholderUrl;
  };

  return (
    <div className="flower-card" onClick={onClick}>
      <img 
        src={imageUrl} 
        alt={flower.common_name}
        onError={handleImageError} // <-- МЫ ДОБАВИЛИ ЭТОТ ОБРАБОТЧИК
      />
      <div className="flower-card-content">
        <h3>{flower.common_name}</h3>
        <p>{flower.scientific_name[0]}</p>
      </div>
    </div>
  );
}

export default FlowerCard;