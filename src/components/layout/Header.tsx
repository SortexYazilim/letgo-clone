// src/components/layout/Header.tsx
'use client';

import { useState, useEffect } from 'react';  
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/src/components/ui/Button';
import { Search, Menu, X, User, Heart, ShoppingCart } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useFavoritesContext } from '@/src/context/FavoritesContext';
import { useCartContext } from '@/src/context/CartContext';

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const { favoritesCount } = useFavoritesContext();
  const { totalItems } = useCartContext();

  // Ana sayfadaysak ve URL'de query varsa, input'a yansıt
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const q = params.get('q');
      if (q) {
        setInputValue(q);
      }
    }
  }, [pathname]);

  // Arama işlemi - Her zaman ana sayfaya yönlendir
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = inputValue.trim();
    
    if (query) {
      // Ana sayfaya yönlendir ve query parametresi ekle
      router.push(`/?q=${encodeURIComponent(query)}`);
    } else {
      // Boşsa ana sayfaya git (query olmadan)
      router.push('/');
    }
    
    // Mobil menüyü kapat
    setIsMenuOpen(false);
  };

  // Input değiştiğinde
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // Aramayı temizle
  const clearSearch = () => {
    setInputValue('');
    router.push('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo */}
          <Link href="/" className="shrink-0">
            <h1 className="text-2xl font-bold text-orange-500 tracking-tight">
              letgo<span className="text-gray-900">clone</span>
            </h1>
          </Link>

          {/* Arama Formu - Her zaman göster */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Ürün ara..."
                className={cn(
                  'block w-full pl-10 pr-24 py-2.5',
                  'border-2 border-gray-300 rounded-xl',
                  'focus:border-orange-500 focus:ring-2 focus:ring-orange-200',
                  'transition-all duration-200',
                  'placeholder:text-gray-400'
                )}
              />
              {inputValue && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute inset-y-0 right-20 flex items-center pr-2 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
              <button
                type="submit"
                className="absolute inset-y-0 right-0 pr-2 flex items-center"
              >
                <span className="bg-orange-500 text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors">
                  Ara
                </span>
              </button>
            </div>
          </form>

          {/* Sağ Menü */}
          <div className="flex items-center gap-2">
            <Link href="/favorites">
              <Button variant="ghost" size="sm" className="gap-2 relative">
                <Heart className="h-5 w-5" />
                <span className="hidden lg:inline">Favoriler</span>
                {favoritesCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {favoritesCount > 9 ? '9+' : favoritesCount}
                  </span>
                )}
              </Button>
            </Link>

            <Link href="/cart">
              <Button variant="ghost" size="sm" className="gap-2 relative">
                <ShoppingCart className="h-5 w-5" />
                <span className="hidden lg:inline">Sepet</span>
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {totalItems > 9 ? '9+' : totalItems}
                  </span>
                )}
              </Button>
            </Link>
            
            <Button variant="ghost" size="sm" className="gap-2 hidden sm:flex">
              <User className="h-5 w-5" />
              <span className="hidden lg:inline">Giriş</span>
            </Button>

            {/* Mobil Menü Butonu */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobil Menü */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-4 pt-4 pb-6 space-y-4">
            {/* Mobil Arama */}
            <form onSubmit={handleSearch}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Ürün ara..."
                  value={inputValue}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-20 py-3 border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:outline-none"
                />
                {inputValue && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="absolute right-20 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-orange-500 text-white px-4 py-1.5 rounded-lg text-sm font-medium"
                >
                  Ara
                </button>
              </div>
            </form>

            <div className="space-y-2">
              <Link href="/favorites" onClick={() => setIsMenuOpen(false)}>
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors">
                  <Heart className="h-5 w-5 text-gray-600" />
                  <span className="font-medium">Favoriler</span>
                  {favoritesCount > 0 && (
                    <span className="ml-auto bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {favoritesCount}
                    </span>
                  )}
                </button>
              </Link>

              <Link href="/cart" onClick={() => setIsMenuOpen(false)}>
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors">
                  <ShoppingCart className="h-5 w-5 text-gray-600" />
                  <span className="font-medium">Sepet</span>
                  {totalItems > 0 && (
                    <span className="ml-auto bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {totalItems}
                    </span>
                  )}
                </button>
              </Link>

              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors">
                <User className="h-5 w-5 text-gray-600" />
                <span className="font-medium">Giriş Yap</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}