import React, { useState, useEffect } from 'react'; 
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
  const [selectedSign, setSelectedSign] = useState(zodiacSigns[0]);
  const [advice, setAdvice] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleFetchAdvice = () => {
    setIsLoading(true);
    setAdvice('');

    fetch('https://api.adviceslip.com/advice')
      .then(response => response.json())
      .then(data => {
        setAdvice(data.slip.advice);
      })
      .catch(error => {
        console.error("Error while fetching advice:", error);
        setAdvice('Failed to get advice. Please try again.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    handleFetchAdvice();
  }, [selectedSign]); 

  const handleSignChange = (event) => {
    const signName = event.target.value;
    const sign = zodiacSigns.find(s => s.name === signName);
    setSelectedSign(sign);
  };
  
  return (
    <div className="zodiac-container">
      <h1>Zodiac Advice Generator</h1>
      <div className="controls">
        <select onChange={handleSignChange} value={selectedSign.name}>
          {zodiacSigns.map(sign => (
            <option key={sign.name} value={sign.name}>
              {sign.emoji} {sign.name}
            </option>
          ))}
        </select>
        {}
        <button onClick={handleFetchAdvice} disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Get new advice'}
        </button>
      </div>

      {isLoading && !advice && <p className="loading-text">Seeking wisdom among the stars...</p>}
      
      <ul>
        <li>
            <ZodiacCard sign={selectedSign} advice={advice} />
        </li>
      </ul>
    </div>
  );
}

export default ZodiacList;