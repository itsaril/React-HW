import React from 'react';
import './ZodiacCard.css'; 

function ZodiacCard({ sign, advice }) {
  
  if (!advice) {
    return null;
  }

  return (
    <div className="zodiac-card">
      <div className="zodiac-icon">{sign.emoji}</div>
      <h2 className="zodiac-name">{sign.name}</h2>
      <p className="zodiac-advice">"{advice}"</p>
    </div>
  );
}

export default ZodiacCard;