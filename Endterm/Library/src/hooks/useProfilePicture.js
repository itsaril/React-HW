// Custom hook for profile picture URL
import { useEffect, useState } from 'react';
import { getProfile } from '../services/profileService';

export function useProfilePicture(uid) {
  const [photoURL, setPhotoURL] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!uid) return;
    setLoading(true);
    getProfile(uid)
      .then((profile) => {
        setPhotoURL(profile.photoURL || null);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [uid]);

  return { photoURL, loading, error };
}
