'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/src/components/ui/Button';
import { Search, Menu, X, User, Heart, ShoppingCart } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useFavoritesContext } from '@/src/context/FavoritesContext';
import { useCartContext } from '@/src/context/CartContext';
import { useAuth } from '@/src/context/AuthContext';
import { AuthModal } from '@/src/components/auth/AuthModal';

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  const { favoritesCount } = useFavoritesContext();
  const { totalItems } = useCartContext();
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    if (typeof window !== 'undefined' && pathname === '/') {
      const params = new URLSearchParams(window.location.search);
      const q = params.get('q');
      if (q) setInputValue(q);
    }
  }, [pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = inputValue.trim();
    if (query) {
      router.push(`/?q=${encodeURIComponent(query)}`);
    } else {
      router.push('/');
    }
    setIsMenuOpen(false);
  };

  const clearSearch = () => {
    setInputValue('');
    router.push('/');
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            
            <Link href="/" className="shrink-0">
              <h1 className="text-2xl font-bold text-orange-500 tracking-tight">
                letgo<span className="text-gray-900">clone</span>
              </h1>
            </Link>

            <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-2xl mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ürün ara..."
                  className="w-full pl-10 pr-24 py-2.5 border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
                />
                {inputValue && (
                  <button type="button" onClick={clearSearch} className="absolute right-20 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    <X className="h-5 w-5" />
                  </button>
                )}
                <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 bg-orange-500 text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-orange-600">
                  Ara
                </button>
              </div>
            </form>

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
              
              {isAuthenticated && user ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-sm">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="hidden lg:inline text-sm font-medium">{user.name.split(' ')[0]}</span>
                  </button>
                  
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="font-semibold text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                      <button
                        onClick={() => {
                          logout();
                          setShowUserMenu(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 text-sm"
                      >
                        Çıkış Yap
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Button variant="ghost" size="sm" className="gap-2" onClick={() => setShowAuthModal(true)}>
                  <User className="h-5 w-5" />
                  <span className="hidden lg:inline">Giriş</span>
                </Button>
              )}

              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 rounded-lg hover:bg-gray-100">
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-4 pt-4 pb-6 space-y-4">
              <form onSubmit={handleSearch}>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Ürün ara..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="w-full pl-10 pr-20 py-3 border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:outline-none"
                  />
                  <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 bg-orange-500 text-white px-4 py-1.5 rounded-lg text-sm">
                    Ara
                  </button>
                </div>
              </form>

              <div className="space-y-2">
                <Link href="/favorites" onClick={() => setIsMenuOpen(false)}>
                  <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50">
                    <Heart className="h-5 w-5 text-gray-600" />
                    <span>Favoriler</span>
                    {favoritesCount > 0 && <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">{favoritesCount}</span>}
                  </button>
                </Link>
                <Link href="/cart" onClick={() => setIsMenuOpen(false)}>
                  <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50">
                    <ShoppingCart className="h-5 w-5 text-gray-600" />
                    <span>Sepet</span>
                    {totalItems > 0 && <span className="ml-auto bg-orange-500 text-white text-xs px-2 py-1 rounded-full">{totalItems}</span>}
                  </button>
                </Link>
                {isAuthenticated ? (
                  <button onClick={() => { logout(); setIsMenuOpen(false); }} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 text-red-600">
                    <User className="h-5 w-5" />
                    <span>Çıkış Yap ({user?.name.split(' ')[0]})</span>
                  </button>
                ) : (
                  <button onClick={() => { setShowAuthModal(true); setIsMenuOpen(false); }} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50">
                    <User className="h-5 w-5 text-gray-600" />
                    <span>Giriş Yap</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </>
  );
}