import { db } from '../firebase';
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  query,
  where,
  getDocs,
  Timestamp,
} from 'firebase/firestore';

const favCollection = collection(db, 'favorites');

export const addFavorite = async (userId: string, item: { name: string; image: string }) => {
  const data = {
    name: item.name,
    image: item.image,
    userId,
    date: Timestamp.now(),
  };
  const ref = await addDoc(favCollection, data);
  return ref.id;
};

export const removeFavorite = async (docId: string) => {
  await deleteDoc(doc(db, 'favorites', docId));
};

export const getFavoritesByUser = async (userId: string) => {
  const q = query(favCollection, where('userId', '==', userId));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};
