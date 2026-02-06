// src/data/mockListings.ts
import { Listing, User } from '@/src/types';

const mockUsers: User[] = [
  {
    id: '1',
    name: 'Ahmet Yılmaz',
    avatar: 'https://i.pravatar.cc/150?u=1',
    location: 'Kadıköy, İstanbul',
    rating: 4.8,
    memberSince: new Date('2023-01-15'),
  },
  {
    id: '2',
    name: 'Ayşe Demir',
    avatar: 'https://i.pravatar.cc/150?u=2',
    location: 'Çankaya, Ankara',
    rating: 4.5,
    memberSince: new Date('2023-03-20'),
  },
];

export const mockListings: Listing[] = [
  {
    id: '1',
    title: 'iPhone 14 Pro Max 256GB',
    description: 'Sıfır ayarında, garantili, kutulu. 2 ay kullanıldı.',
    price: 45000,
    category: 'Elektronik',
    images: ['https://picsum.photos/400/400?random=1'],
    location: 'Aksu, Antalya',
    createdAt: new Date('2024-01-10'),
    status: 'active',
    seller: mockUsers[0],
    viewCount: 245,
    isFavorite: false,
    stock: 3, // Sadece 3 adet var
  },
  {
    id: '2',
    title: 'Nike Air Jordan Spor Ayakkabı',
    description: '42 numara, orijinal kutusuyla birlikte.',
    price: 3200,
    category: 'Giyim',
    images: ['https://picsum.photos/400/400?random=2'],
    location: 'Aksu, Antalya',
    createdAt: new Date('2024-01-12'),
    status: 'active',
    seller: mockUsers[1],
    viewCount: 89,
    isFavorite: true,
    stock: 1, // Sadece 1 adet var
  },
  {
    id: '3',
    title: 'IKEA Mutfak Masası',
    description: '4 kişilik, ahşap, az kullanılmış.',
    price: 1500,
    category: 'Ev & Bahçe',
    images: ['https://picsum.photos/400/400?random=3'],
    location: 'Aksu, Antalya',
    createdAt: new Date('2024-01-08'),
    status: 'active',
    seller: mockUsers[0],
    viewCount: 156,
    isFavorite: false,
    stock: 10, // 10 adet var
  },
  {
    id: '4',
    title: 'MacBook Pro M2 16GB',
    description: '2023 model, garantili, çiziksiz.',
    price: 65000,
    category: 'Elektronik',
    images: ['https://picsum.photos/400/400?random=4'],
    location: 'Aksu, Antalya',
    createdAt: new Date('2024-01-15'),
    status: 'active',
    seller: mockUsers[1],
    viewCount: 532,
    isFavorite: false,
    stock: 2, // Sadece 2 adet var
  },
  {
    id: '5',
    title: 'Decathlon Koşu Bandı',
    description: 'Az kullanılmış, evde spor için ideal.',
    price: 8500,
    category: 'Spor',
    images: ['https://picsum.photos/400/400?random=5'],
    location: 'Aksu, Antalya',
    createdAt: new Date('2024-01-05'),
    status: 'active',
    seller: mockUsers[0],
    viewCount: 78,
    isFavorite: false,
    stock: 5, // 5 adet var
  },
];

export const getListingById = (id: string): Listing | undefined => {
  return mockListings.find(listing => listing.id === id);
};

export const getListingsByCategory = (category: string): Listing[] => {
  return mockListings.filter(listing => listing.category === category);
};