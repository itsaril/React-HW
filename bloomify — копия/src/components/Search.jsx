import React from 'react';
// 'props' тут - это { onSearch }
function Search({ onSearch }) {

  // Обработчик события 'onSubmit' для формы
  const handleSubmit = (event) => {
    // Останавливаем перезагрузку страницы
    event.preventDefault(); 
    
    // Достаем значение из инпута
    const formData = new FormData(event.target);
    const query = formData.get("search");
    
    // Вызываем функцию 'onSearch', которую получили из App.jsx
    onSearch(query);
  }

  return (
    // Используем onSubmit для всей формы,
    // это позволяет искать и по Enter, и по кнопке
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="search"
        placeholder="Search for a flower (e.g., rose, sunflower...)"
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default Search;