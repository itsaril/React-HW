import React from 'react';
import './ZodiacCard.css';

function ZodiacCard({ sign }) {
  return (
    <div className="zodiac-card">
      <div className="zodiac-icon">{sign.emoji}</div>
      <h2 className="zodiac-name">{sign.name}</h2>
      {}
    </div>
  );
}

export default ZodiacCard;