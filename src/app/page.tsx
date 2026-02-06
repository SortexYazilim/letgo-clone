// src/app/page.tsx
'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Header } from '@/src/components/layout/Header';
import { Footer } from '@/src/components/layout/Footer';
import { CategoryFilter } from '@/src/components/listings/CategoryFilter';
import { ListingGrid } from '@/src/components/listings/ListingGrid';
import { mockListings } from '@/src/data/mockListings';
import { Category } from '@/src/types';
import { Search, X } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const searchParams = useSearchParams();
  const urlQuery = searchParams.get('q') || '';
  
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  // Arama ve kategori filtrelemesi
  const filteredListings = useMemo(() => {
    let result = [...mockListings];

    // URL'den gelen arama sorgusu
    if (urlQuery.trim()) {
      const query = urlQuery.toLowerCase();
      result = result.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query)
      );
    }

    // Kategori filtresi
    if (selectedCategory) {
      result = result.filter((item) => item.category === selectedCategory);
    }

    return result;
  }, [urlQuery, selectedCategory]);

  // Arama sonucu başlığı
  const getPageTitle = () => {
    if (urlQuery && selectedCategory) {
      return `"${urlQuery}" - ${selectedCategory}`;
    }
    if (urlQuery) {
      return `"${urlQuery}" arama sonuçları`;
    }
    if (selectedCategory) {
      return `${selectedCategory} İlanları`;
    }
    return 'Tüm İlanlar';
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1">
        {/* Kategori Filtreleme */}
        <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
          <CategoryFilter
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>

        {/* İlan Listesi */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Başlık ve Sonuç Sayısı */}
          <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                {urlQuery && <Search className="h-5 w-5 text-orange-500" />}
                {getPageTitle()}
              </h2>
              {urlQuery && (
                <p className="text-sm text-gray-500 mt-1">
                  "{urlQuery}" için {filteredListings.length} sonuç bulundu
                </p>
              )}
            </div>
            
            <div className="flex items-center gap-4">
              {/* Arama temizleme butonu */}
              {urlQuery && (
                <Link 
                  href="/"
                  className="flex items-center gap-1 text-sm text-gray-500 hover:text-red-500 transition-colors"
                >
                  <X className="h-4 w-4" />
                  Aramayı Temizle
                </Link>
              )}
              <span className="text-sm text-gray-500">
                {filteredListings.length} ilan
              </span>
            </div>
          </div>

          {/* Boş durum */}
          {filteredListings.length === 0 && (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Sonuç bulunamadı
              </h3>
              <p className="text-gray-500 mb-6">
                {urlQuery 
                  ? `"${urlQuery}" için sonuç bulunamadı. Farklı bir arama deneyin.`
                  : 'Bu kategoride ilan bulunmuyor.'
                }
              </p>
              {urlQuery && (
                <Link href="/">
                  <span className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-600 font-medium">
                    Tüm ilanları gör
                  </span>
                </Link>
              )}
            </div>
          )}

          {/* Grid */}
          {filteredListings.length > 0 && (
            <ListingGrid
              listings={filteredListings}
              emptyMessage="İlan bulunamadı."
            />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}