// src/hooks/useFilters.ts
'use client';

import { useState, useMemo, useCallback } from 'react';
import { Listing, Category } from '@/src/types';

export type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'popular';

export interface FilterState {
  category: Category | null;
  minPrice: number | null;
  maxPrice: number | null;
  location: string | null;
  searchQuery: string;
  sortBy: SortOption;
  inStockOnly: boolean;
}

export function useFilters(listings: Listing[]) {
  const [filters, setFilters] = useState<FilterState>({
    category: null,
    minPrice: null,
    maxPrice: null,
    location: null,
    searchQuery: '',
    sortBy: 'newest',
    inStockOnly: false,
  });

  // Filtreleme fonksiyonu
  const filteredListings = useMemo(() => {
    let result = [...listings];

    // Arama sorgusu
    if (filters.searchQuery.trim()) {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.location.toLowerCase().includes(query)
      );
    }

    // Kategori filtresi
    if (filters.category) {
      result = result.filter((item) => item.category === filters.category);
    }

    // Fiyat aralığı
    if (filters.minPrice !== null) {
      result = result.filter((item) => item.price >= filters.minPrice!);
    }
    if (filters.maxPrice !== null) {
      result = result.filter((item) => item.price <= filters.maxPrice!);
    }

    // Konum filtresi
    if (filters.location) {
      result = result.filter((item) =>
        item.location.toLowerCase().includes(filters.location!.toLowerCase())
      );
    }

    // Sadece stokta olanlar
    if (filters.inStockOnly) {
      result = result.filter((item) => item.stock > 0);
    }

    // Sıralama
    switch (filters.sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        break;
      case 'popular':
        result.sort((a, b) => b.viewCount - a.viewCount);
        break;
    }

    return result;
  }, [listings, filters]);

  // Filtre güncelleme fonksiyonları
  const setCategory = useCallback((category: Category | null) => {
    setFilters((prev) => ({ ...prev, category }));
  }, []);

  const setPriceRange = useCallback((min: number | null, max: number | null) => {
    setFilters((prev) => ({ ...prev, minPrice: min, maxPrice: max }));
  }, []);

  const setLocation = useCallback((location: string | null) => {
    setFilters((prev) => ({ ...prev, location }));
  }, []);

  const setSearchQuery = useCallback((query: string) => {
    setFilters((prev) => ({ ...prev, searchQuery: query }));
  }, []);

  const setSortBy = useCallback((sort: SortOption) => {
    setFilters((prev) => ({ ...prev, sortBy: sort }));
  }, []);

  const toggleInStockOnly = useCallback(() => {
    setFilters((prev) => ({ ...prev, inStockOnly: !prev.inStockOnly }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({
      category: null,
      minPrice: null,
      maxPrice: null,
      location: null,
      searchQuery: '',
      sortBy: 'newest',
      inStockOnly: false,
    });
  }, []);

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.category) count++;
    if (filters.minPrice !== null || filters.maxPrice !== null) count++;
    if (filters.location) count++;
    if (filters.inStockOnly) count++;
    return count;
  }, [filters]);

  return {
    filters,
    filteredListings,
    setCategory,
    setPriceRange,
    setLocation,
    setSearchQuery,
    setSortBy,
    toggleInStockOnly,
    clearFilters,
    activeFiltersCount,
  };
}