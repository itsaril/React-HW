import React from 'react';
function Search({ onSearch }) {

  const handleSubmit = (event) => {

    event.preventDefault(); 
    const formData = new FormData(event.target);
    const query = formData.get("search");
    onSearch(query);
  }

  return (
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