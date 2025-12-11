// Handles profile picture upload and profile data
import { db } from '../firebase/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

// Store base64 or blob URL directly in Firestore
export async function uploadProfilePicture(uid, base64Url) {
  const userRef = doc(db, 'profiles', uid);
  await setDoc(userRef, { photoURL: base64Url }, { merge: true });
  return base64Url;
}

export async function getProfile(uid) {
  const userRef = doc(db, 'profiles', uid);
  const snap = await getDoc(userRef);
  return snap.exists() ? snap.data() : {};
}
