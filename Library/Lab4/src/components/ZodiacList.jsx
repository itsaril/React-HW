import React, { useState } from 'react';
import ZodiacCard from './ZodiacCard';
import './ZodiacList.css';

const zodiacSigns = [
  { name: 'Aries', emoji: '♈' },
  { name: 'Taurus', emoji: '♉' },
  { name: 'Gemini', emoji: '♊' },
  { name: 'Cancer', emoji: '♋' },
  { name: 'Leo', emoji: '♌' },
  { name: 'Virgo', emoji: '♍' }, 
  { name: 'Libra', emoji: '♎' },
  { name: 'Scorpio', emoji: '♏' },
  { name: 'Sagittarius', emoji: '♐' },
  { name: 'Capricorn', emoji: '♑' },
  { name: 'Aquarius', emoji: '♒' },
  { name: 'Pisces', emoji: '♓' },
];

function ZodiacList() {

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const filteredSigns = zodiacSigns.filter(sign =>
    sign.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="zodiac-container">
      <h1>Zodiac Signs</h1>
      <div className="controls">
        {}
        <input
          type="text"
          placeholder="Search by title..."
          value={searchQuery}
          onChange={handleSearchChange}
          style={{ flexGrow: 2, padding: '1rem', fontSize: '1rem', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.5)', backgroundColor: 'rgba(0, 0, 0, 0.3)', color: 'white' }}
        />
        {}
        <button onClick={handleClearSearch}>Clear</button>
      </div>

      {}
      <ul>
        {filteredSigns.map(sign => (
          <li key={sign.name} style={{ marginBottom: '1rem' }}>
            <ZodiacCard sign={sign} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ZodiacList;