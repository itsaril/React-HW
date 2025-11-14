import React from 'react';

function FlowerCard({ flower }) {

  const imageUrl = flower.default_image && flower.default_image.medium_url 
    ? flower.default_image.medium_url 
    : "https://via.placeholder.com/280x200?text=No+Image";
  
  const placeholderUrl = "https://via.placeholder.com/280x200?text=No+Image";

  const handleImageError = (event) => {
    event.target.src = placeholderUrl;
  };

  return (
    <div className="flower-card"> 
      <img 
        src={imageUrl} 
        alt={flower.common_name}
        onError={handleImageError}
      />
      <div className="flower-card-content">
        <h3>{flower.common_name}</h3>
        <p>{flower.scientific_name[0]}</p>
      </div>
    </div>
  );
}

export default FlowerCard;