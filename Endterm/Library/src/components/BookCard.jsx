import React from 'react';
import { Link } from 'react-router-dom'; 
import { useSelector, useDispatch } from 'react-redux';
import { addFavorite, removeFavorite } from '../features/favoritesSlice';
import '../styles/items.css';

function BookCard({ book }) {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.items);
  const isFavorite = favorites.includes(book.id);

  const handleFavoriteClick = () => {
    if (isFavorite) {
      dispatch(removeFavorite(book.id));
    } else {
      dispatch(addFavorite(book.id));
    }
  };

  return (
    <div className="book-card">
      <div className="book-cover-container">
        <img 
          src={book.coverUrl} 
          alt={`Cover of ${book.title}`} 
          className="book-cover"
          onError={(e) => { e.target.onerror = null; e.target.src = '/no-cover.png'; }}
        />
      </div>
      <div className="card-content">
        <h3>{book.title}</h3>
        <p className="card-author">By: {book.author}</p>
        <p className="card-description">{book.shortDescription}</p>

        <Link to={`/items/${book.id.replace('/works/', '')}`} className="card-link">
          View Details
        </Link>

        <button onClick={handleFavoriteClick} className="favorite-button" style={{marginTop:'10px'}}>
          {isFavorite ? <span role="img" aria-label="remove">💔</span> : <span role="img" aria-label="add">❤️</span>}
          {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        </button>
      </div>
    </div>
  );
}

export default BookCard;