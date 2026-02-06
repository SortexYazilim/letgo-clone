// src/app/favorites/page.tsx
'use client';

import { Header } from '@/src/components/layout/Header';
import { Footer } from '@/src/components/layout/Footer';
import { ListingGrid } from '@/src/components/listings/ListingGrid';
import { Button } from '@/src/components/ui/Button';
import { useFavoritesContext } from '@/src/context/FavoritesContext';
import { mockListings } from '@/src/data/mockListings';
import { Heart, Trash2 } from 'lucide-react';
import Link from 'next/link';

export default function FavoritesPage() {
  const { favorites, clearFavorites, isLoaded } = useFavoritesContext();

  // Favori ilanları filtrele
  const favoriteListings = mockListings.filter((listing) => 
    favorites.includes(listing.id)
  );

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Başlık */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-100 rounded-xl">
              <Heart className="h-6 w-6 text-red-500 fill-current" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Favorilerim</h1>
              <p className="text-gray-500">{favorites.length} ilan</p>
            </div>
          </div>

          {favorites.length > 0 && (
            <Button 
              variant="outline" 
              className="gap-2 text-red-500 hover:bg-red-50 hover:text-red-600"
              onClick={clearFavorites}
            >
              <Trash2 className="h-4 w-4" />
              <span className="hidden sm:inline">Tümünü Temizle</span>
            </Button>
          )}
        </div>

        {/* İlanlar */}
        {favoriteListings.length > 0 ? (
          <ListingGrid 
            listings={favoriteListings}
            emptyMessage="Favorilerinizde ilan bulunmuyor."
          />
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-2xl border border-gray-200">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <Heart className="h-12 w-12 text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Henüz favori ilanınız yok
            </h2>
            <p className="text-gray-500 mb-6 max-w-sm">
              Beğendiğiniz ilanları favorilere ekleyerek daha sonra kolayca ulaşabilirsiniz.
            </p>
            <Link href="/"> 
              <Button className="bg-orange-500 hover:bg-orange-600">
                İlanlara Göz At
              </Button>
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}