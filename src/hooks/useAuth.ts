import { useEffect, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  User,
} from 'firebase/auth';
import { auth } from '../firebase';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        await AsyncStorage.setItem('user', u.uid);
      } else {
        await AsyncStorage.removeItem('user');
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const register = useCallback(async (email: string, password: string) => {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    return res.user;
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const res = await signInWithEmailAndPassword(auth, email, password);
    return res.user;
  }, []);

  const logout = useCallback(async () => {
    await signOut(auth);
  }, []);

  return { user, loading, register, login, logout };
};
