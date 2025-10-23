import React from 'react';
// Получаем 'flower' (объект) и 'onBack' (функцию)
function FlowerDetail({ flower, onBack }) {

  const imageUrl = flower.default_image
    ? flower.default_image.medium_url
    : "https://via.placeholder.com/300x300?text=No+Image";

  return (
    <div className="flower-detail-container">
      {/* Кнопка "Назад" с 'onClick' ивентом */}
      <button className="flower-detail-back-button" onClick={onBack}>
        &larr; Back to list
      </button>

      <div className="flower-detail-header">
        <img src={imageUrl} alt={flower.common_name} />
        <div>
          <h1>{flower.common_name}</h1>
          <div className="flower-detail-meta">
            <span>{flower.cycle}</span>
            <span>{flower.watering} Watering</span>
            <span>{flower.sunlight[0]}</span>
          </div>
          <p style={{ fontStyle: 'italic', color: '#888', marginTop: '1rem' }}>
            {flower.scientific_name[0]}
          </p>
        </div>
      </div>
      
      <div className="flower-detail-body">
        <h3>Description</h3>
        {/* В API нет описания, поэтому ставим заглушку */}
        <p>
          The {flower.common_name} is a beautiful {flower.cycle} plant
          that requires {flower.watering.toLowerCase()} watering and 
          {' '}{flower.sunlight[0].toLowerCase()} sunlight.
          Its scientific name is {flower.scientific_name[0]}.
        </p>
      </div>
    </div>
  );
}

export default FlowerDetail;