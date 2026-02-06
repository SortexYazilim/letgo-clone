// src/types/index.ts

export interface User {
  id: string;
  name: string;
  avatar: string;
  location: string;
  rating: number;
  memberSince: Date;
}

export type Category = 
  | 'Elektronik'
  | 'Giyim'
  | 'Ev & Bahçe'
  | 'Spor'
  | 'Kitap'
  | 'Otomobil'
  | 'Diğer';

export type ListingStatus = 'active' | 'sold' | 'reserved';

export interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  category: Category;
  images: string[];
  location: string;
  createdAt: Date;
  status: ListingStatus;
  seller: User;
  viewCount: number;
  isFavorite?: boolean;
  stock: number; // Maksimum stok miktarı eklendi
}

export interface FilterOptions {
  category?: Category;
  minPrice?: number;
  maxPrice?: number;
  location?: string;
  sortBy?: 'newest' | 'price-asc' | 'price-desc';
}