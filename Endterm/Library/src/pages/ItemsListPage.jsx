import React, { useState, useEffect } from 'react';
import { useDebounce } from '../useDebounce';
import { useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'; 
import { fetchItems } from '../features/items/itemsSlice'; 
import BookCard from '../components/BookCard';
import Spinner from '../components/Spinner';
import ErrorBox from '../components/ErrorBox';
import '../styles/items.css';

function ItemsListPage() {
  const dispatch = useDispatch();
  const { 
    list: books, 
    loadingList: loading, 
    errorList: error, 
    query: currentReduxQuery 
  } = useSelector((state) => state.items);

  const [searchParams, setSearchParams] = useSearchParams();

  const urlQuery = searchParams.get('q') || ''; 
  
  const [searchTerm, setSearchTerm] = useState(urlQuery || currentReduxQuery); 
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const pageParam = parseInt(searchParams.get('page') || '1', 10);
  const pageSizeParam = parseInt(searchParams.get('size') || '10', 10);
  const [page, setPage] = useState(pageParam);
  const [pageSize, setPageSize] = useState(pageSizeParam);

  useEffect(() => {

    if (debouncedSearchTerm.trim() === '') {
      return;
    }
    setSearchParams({ q: debouncedSearchTerm, page, size: pageSize });
    dispatch(fetchItems(debouncedSearchTerm));
  }, [debouncedSearchTerm, page, pageSize, dispatch, setSearchParams]);

  const handleSearch = (e) => {
    e.preventDefault(); 
    const trimmedTerm = searchTerm.trim();
    if (trimmedTerm) {
        setSearchParams({ q: trimmedTerm, page: 1, size: pageSize });
        setPage(1);
    } else {
        setSearchParams({ page: 1, size: pageSize });
        setPage(1);
    }
  };
    const handlePageChange = (newPage) => {
      setPage(newPage);
      setSearchParams({ q: debouncedSearchTerm, page: newPage, size: pageSize });
    };

    const handlePageSizeChange = (e) => {
      const newSize = parseInt(e.target.value, 10);
      setPageSize(newSize);
      setPage(1);
      setSearchParams({ q: debouncedSearchTerm, page: 1, size: newSize });
    };
  
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  }

  const displayQuery = urlQuery || currentReduxQuery;

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
        <button type="submit" className="search-button" disabled={loading}> Search </button>
        <select value={pageSize} onChange={handlePageSizeChange} className="page-size-select" style={{ marginLeft: '10px' }} >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          </select>
      </form>
      
      {loading && <Spinner />}
      
      {error && <ErrorBox message={error} />}
      
      {!loading && !error && (
        <div className='results-container'>
          <p className="search-info">
            Showing results for: <strong>{displayQuery}</strong> ({books.length} books found)
          </p>
          <div className="books-grid">
            {books.length > 0 ? (
              books
                .slice((page - 1) * pageSize, page * pageSize)
                .map((book) => (
                  <BookCard key={book.id} book={book} />
                ))
            ) : (
                <p>No books found for. Try a different search term.</p>
            )}
          </div>
          <div className="pagination-container" style={{marginTop: '20px', textAlign: 'center'}}>
          <button onClick={() => handlePageChange(page - 1)} disabled={page <= 1}>Prev</button>
          <span style={{margin: '0 10px'}}>Page {page} / {Math.ceil(books.length / pageSize)}</span>
          <button onClick={() => handlePageChange(page + 1)} disabled={page >= Math.ceil(books.length / pageSize)}>Next</button>
        </div>
        </div>
      )}
    </div>
  );
}

export default ItemsListPage;