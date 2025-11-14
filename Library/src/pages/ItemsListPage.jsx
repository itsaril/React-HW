import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { itemsService } from '../services/itemsService';
import BookCard from '../components/BookCard';
import Spinner from '../components/Spinner';
import ErrorBox from '../components/ErrorBox';
import '../styles/items.css';

function ItemsListPage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || 'harry potter'; 
  const [searchTerm, setSearchTerm] = useState(query);

  useEffect(() => {

    if (query.trim() === '') {
        setBooks([]);
        return;
    }

    const fetchBooks = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const bookList = await itemsService.getAll(query);
        setBooks(bookList);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [query]); 

  const handleSearch = (e) => {
    e.preventDefault(); 
    setSearchParams({ q: searchTerm.trim() });
  };
  
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  }

  return (
    <div className="items-list-page">
      <h1>Search Books</h1>
      
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="search"
          placeholder="e.g., harry potter, dune, react"
          value={searchTerm}
          onChange={handleInputChange} 
          className="search-input"
        />
        <button type="submit" className="search-button">Search</button>
      </form>
      
      {loading && <Spinner />}
      
      {error && <ErrorBox message={error} />}
      
      {!loading && !error && (
        <>
          <p className="search-info">
            Showing results for: **{query}** ({books.length} books found)
          </p>
          <div className="books-grid">
            {books.length > 0 ? (
              books.map((book) => (
                <BookCard key={book.id} book={book} />
              ))
            ) : (
              <p className="no-results">No books found matching your search. Try a different query!</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default ItemsListPage;