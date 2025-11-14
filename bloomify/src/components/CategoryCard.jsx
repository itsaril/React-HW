import React from 'react';

function CategoryCard({ name, imageUrl, onClick }) {

  const handleImageError = (event) => {
    event.target.src = "https://via.placeholder.com/280x200?text=Category";
  };

  return (
    <div className="flower-card" onClick={onClick}>
      <img 
        src={imageUrl} 
        alt={name}
        onError={handleImageError} 
      />
      <div className="flower-card-content">
        <h3 style={{ fontSize: '1.5rem', textAlign: 'center' }}>{name}</h3>
      </div>
    </div>
  );
}

export default CategoryCard;