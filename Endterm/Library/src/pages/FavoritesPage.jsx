import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth } from '../contexts/AuthContext';
import { loadFavorites, mergeFavorites } from '../features/favoritesSlice';
import BookCard from '../components/BookCard';
import Spinner from '../components/Spinner';
import ErrorBox from '../components/ErrorBox';

function FavoritesPage() {
  const dispatch = useDispatch();
  const { currentUser, userLoggedIn } = useAuth();
  const { items, loading, error, merged } = useSelector((state) => state.favorites);
  const [mergeMessage, setMergeMessage] = useState('');
  const [books, setBooks] = useState([]);

  useEffect(() => {
    dispatch(loadFavorites(currentUser?.uid || null));

    if (userLoggedIn && !merged) {
      const localFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');

      if (localFavorites.length > 0) {
        dispatch(mergeFavorites({ uid: currentUser.uid, localFavorites }));
        setMergeMessage('Your local favorites were merged with your account.');
      }
    }
  }, [dispatch, currentUser, userLoggedIn, merged]);

  useEffect(() => {
    const fetchBooks = async () => {
      if (items.length === 0) {
        setBooks([]);
        return;
      }

      const fetchedBooks = await Promise.all(
        items.map(async (id) => {
          try {
            const response = await fetch(`https://openlibrary.org/works/${id}.json`);
            if (!response.ok) throw new Error(`Failed to fetch work ${id}`);

            const work = await response.json();
            let authorName = "Unknown Author";
            const authorEntry = work?.authors?.[0];

            if (authorEntry?.author?.key) {
              const authorKey = authorEntry.author.key;
              const authorRes = await fetch(`https://openlibrary.org${authorKey}.json`);
              if (authorRes.ok) {
                const authorData = await authorRes.json();
                authorName = authorData.name || "Unknown Author";
              }
            }

            return {
              id: work.key,
              title: work.title,
              author: authorName,
              coverUrl: work.covers
                ? `https://covers.openlibrary.org/b/id/${work.covers[0]}-M.jpg`
                : '/no-cover.png',
            };
          } catch (error) {
            console.error(error);
            return null;
          }
        })
      );

      setBooks(fetchedBooks.filter(Boolean));
    };

    fetchBooks();
  }, [items]);

  return (
    <div className="favorites-page">
      <h1>Favorites</h1>

      {mergeMessage && (
        <div className="banner">{mergeMessage}</div>
      )}

      {loading && <Spinner />}
      {error && <ErrorBox message={error} />}

      {!loading && !error && (
        books.length === 0 ? (
          <p>No favorites yet.</p>
        ) : (
          <div className="books-grid">
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        )
      )}
    </div>
  );
}

export default FavoritesPage;
