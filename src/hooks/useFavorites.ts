// src/hooks/useFavorites.ts
'use client';

import { useState, useEffect, useCallback } from 'react';
import { Listing } from '@/src/types';

const STORAGE_KEY = 'letgo-favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // LocalStorage'dan yükle
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          setFavorites(JSON.parse(stored));
        } catch (e) {
          console.error('Favorites parse error:', e);
        }
      }
      setIsLoaded(true);
    }
  }, []);

  // LocalStorage'a kaydet
  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    }
  }, [favorites, isLoaded]);

  // Favoriye ekle/çıkar
  const toggleFavorite = useCallback((listingId: string) => {
    setFavorites((prev) => {
      if (prev.includes(listingId)) {
        return prev.filter((id) => id !== listingId);
      }
      return [...prev, listingId];
    });
  }, []);

  // Favoriden çıkar
  const removeFavorite = useCallback((listingId: string) => {
    setFavorites((prev) => prev.filter((id) => id !== listingId));
  }, []);

  // Favori mi kontrolü
  const isFavorite = useCallback((listingId: string) => {
    return favorites.includes(listingId);
  }, [favorites]);

  // Tümünü temizle
  const clearFavorites = useCallback(() => {
    setFavorites([]);
  }, []);

  return {
    favorites,
    favoritesCount: favorites.length,
    toggleFavorite,
    removeFavorite,
    isFavorite,
    clearFavorites,
    isLoaded,
  };
}