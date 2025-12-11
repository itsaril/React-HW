import { useState, useEffect } from 'react';

export function useFavorites(getFavorites, saveFavorites) {
  const [favorites, setFavorites] = useState(() => getFavorites());

  useEffect(() => {
    saveFavorites(favorites);
  }, [favorites, saveFavorites]);

  const addFavorite = (item) => {
    setFavorites((prev) => [...prev, item]);
  };

  const removeFavorite = (itemId) => {
    setFavorites((prev) => prev.filter((fav) => fav.id !== itemId));
  };

  const isFavorite = (itemId) => {
    return favorites.some((fav) => fav.id === itemId);
  };

  return { favorites, addFavorite, removeFavorite, isFavorite };
}
