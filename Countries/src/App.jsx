import React, { useState, useEffect } from 'react';
// ИСПРАВЛЕНИЕ: Добавили .jsx в конце каждого импорта
import CountryList from './components/CountryList.jsx';
import CityList from './components/CityList.jsx';
import CityDetail from './components/CityDetail.jsx';
import './App.css'; // Подключаем стили

// App.jsx - это наш главный "умный" компонент (контейнер).
// Он хранит все основное состояние (state) и логику загрузки данных.
// Лекция 3: Компоненты, Props, State
// Лекция 7: Хуки useState, useEffect

function App() {
  // --- Состояния (State) ---
  // Используем useState для хранения данных (Лекция 7)
  const [countries, setCountries] = useState([]); // Для списка стран
  const [selectedCountry, setSelectedCountry] = useState(''); // Для выбранной страны (имя)
  
  const [cities, setCities] = useState([]); // Для списка городов
  const [selectedCity, setSelectedCity] = useState(null); // Для выбранного города (имя)
  
  const [cityDetails, setCityDetails] = useState(null); // Для деталей города (объект)

  // Состояния для отслеживания загрузки и ошибок (Критерий 3)
  const [loadingCountries, setLoadingCountries] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [error, setError] = useState(null); // Для хранения текста ошибки

  // --- Эффекты (Effects) ---

  // 1. Загрузка списка стран при первом рендере (Критерий 3, 4)
  // useEffect(..., []) - выполняется один раз при "монтировании" компонента
  useEffect(() => {
    setLoadingCountries(true); // Показываем загрузку
    setError(null); // Сбрасываем старые ошибки
    
    // Используем API, как в критериях
    fetch('https://countriesnow.space/api/v0.1/countries/iso')
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          throw new Error(data.msg);
        }
        setCountries(data.data); // data.data - это массив { name, iso2 }
        setLoadingCountries(false); // Убираем загрузку
      })
      .catch(err => {
        console.error("Ошибка загрузки стран:", err);
        setError("Не удалось загрузить список стран.");
        setLoadingCountries(false);
      });
  }, []); // Пустой массив зависимостей = запустить 1 раз (Лекция 7, Слайд 9)

  // 2. Загрузка городов при изменении selectedCountry (Критерий 3, 4)
  // useEffect(..., [selectedCountry]) - выполняется, когда меняется selectedCountry
  useEffect(() => {
    // Выполняем, только если страна выбрана
    if (selectedCountry) {
      setLoadingCities(true);
      setCities([]); // Очищаем старый список
      setSelectedCity(null); // Сбрасываем выбранный город
      setCityDetails(null); // Сбрасываем детали
      setError(null);

      // API требует POST-запрос
      fetch('https://countriesnow.space/api/v0.1/countries/cities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ country: selectedCountry })
      })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          throw new Error(data.msg);
        }
        setCities(data.data); // data.data - это массив [ 'Almaty', 'Astana', ... ]
        setLoadingCities(false);
      })
      .catch(err => {
        console.error("Ошибка загрузки городов:", err);
        setError(`Не удалось загрузить города для ${selectedCountry}.`);
        setLoadingCities(false);
      });
    }
  }, [selectedCountry]); // Зависимость - selectedCountry (Лекция 7, Слайд 9)

  // 3. Загрузка деталей города при изменении selectedCity
  useEffect(() => {
    if (selectedCity) {
      setLoadingDetails(true);
      setCityDetails(null);
      setError(null);
      
      // Нам нужно 2 запроса: один для населения, другой для фото
      // (Лекция 2: Promises)
      
      // Запрос 1: Население (из того же API)
      const fetchPopulation = fetch('https://countriesnow.space/api/v0.1/countries/population/cities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ city: selectedCity })
      }).then(res => res.json());

      // Запрос 2: Изображение (из Teleport API, как в критериях)
      // API Телепорта ожидает "slug" (город в-нижнем-регистре)
      const citySlug = selectedCity.toLowerCase().replace(/ /g, '-');
      const fetchImage = fetch(`https://api.teleport.org/api/urban_areas/slug:${citySlug}/images/`)
        .then(res => res.json());

      // Promise.all ждет выполнения обоих запросов (Лекция 2, Слайд 10)
      Promise.all([fetchPopulation, fetchImage])
        .then(([popData, imgData]) => {
          
          // Обрабатываем данные населения
          let population = 'N/A';
          if (!popData.error && popData.data.populationCounts) {
            // Берем последнюю (самую новую) запись о населении
            population = popData.data.populationCounts.slice(-1)[0].value;
          }

          // Обрабатываем данные изображения
          let imageUrl = 'https://placehold.co/600x400?text=No+Image+Found'; // Заглушка
          if (imgData.photos && imgData.photos[0]) {
            imageUrl = imgData.photos[0].image.web;
          }

          // Сохраняем все в state
          setCityDetails({
            name: selectedCity,
            population: new Intl.NumberFormat().format(population), // Форматируем число
            imageUrl: imageUrl
          });
          setLoadingDetails(false);
        })
        .catch(err => {
          console.error("Ошибка загрузки деталей:", err);
          setError("Не удалось загрузить детали города. (Возможно, его нет в Teleport API)");
          setCityDetails(null);
          setLoadingDetails(false);
        });
    }
  }, [selectedCity]); // Зависимость - selectedCity

  // --- Обработчики событий (Event Handlers) ---
  // (Критерий 2, Лекция 6)

  // Вызывается из CountryList при выборе из <select>
  const handleCountryChange = (event) => {
    // (Лекция 6, Слайд 13 - Controlled Inputs)
    setSelectedCountry(event.target.value);
  };

  // Вызывается из CityList при клике на <li>
  const handleCityClick = (city) => {
    // (Лекция 6, Слайд 8 - Basic Syntax)
    setSelectedCity(city);
  };

  // --- Рендер ---
  // (Лекция 4: JSX)
  return (
    <div className="App">
      <h1>World Cities Explorer</h1>
      
      {/* Условный рендеринг для ошибки (Лекция 4, Слайд 5)
        {error && <p>...} означает "если error существует, показать <p>"
      */}
      {error && <p className="error">{error}</p>}

      {/* 1. Компонент Списка Стран */}
      {/* Передаем данные и функции как props (Лекция 3, Слайд 11)
      */}
      <CountryList
        countries={countries}
        selectedCountry={selectedCountry}
        onCountryChange={handleCountryChange} // Передаем функцию-обработчик
        loading={loadingCountries}
      />
      
      {/* 2. Компонент Списка Городов */}
      <CityList
        cities={cities}
        onCityClick={handleCityClick} // Передаем функцию-обработчик
        loading={loadingCities}
        selectedCountry={selectedCountry}
      />
      
      {/* 3. Компонент Деталей Города */}
      <CityDetail
        details={cityDetails}
        loading={loadingDetails}
      />
    </div>
  );
}

export default App;