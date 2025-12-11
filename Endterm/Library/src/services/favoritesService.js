// Handles favorites logic for both guests (localStorage) and logged-in users (Firestore)
import { db } from '../firebase/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const LOCAL_KEY = 'favorites';

export function getLocalFavorites() {
  try {
    const data = localStorage.getItem(LOCAL_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function setLocalFavorites(favorites) {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(favorites));
}

// Firestore favorites (for logged-in users)
export async function getUserFavorites(uid) {
  const ref = doc(db, 'favorites', uid);
  const snap = await getDoc(ref);
  return snap.exists() ? snap.data().items || [] : [];
}

export async function setUserFavorites(uid, items) {
  const ref = doc(db, 'favorites', uid);
  await setDoc(ref, { items }, { merge: true });
}

export function mergeFavorites(localIds, serverIds) {
  const set = new Set([...(localIds || []), ...(serverIds || [])]);
  return Array.from(set);
}
