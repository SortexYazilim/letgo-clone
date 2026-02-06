// src/app/cart/page.tsx
'use client';

import { Header } from '@/src/components/layout/Header';
import { Footer } from '@/src/components/layout/Footer';
import { Button } from '@/src/components/ui/Button';
import { useCartContext } from '@/src/context/CartContext';
import { formatPrice } from '@/src/lib/utils';
import { ShoppingCart, Trash2, Minus, Plus, ArrowRight, Package } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function CartPage() {
  const { cart, totalItems, totalPrice, updateQuantity, removeFromCart, clearCart, isLoaded } = useCartContext();
  const [showCheckout, setShowCheckout] = useState(false);

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
        <h1 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
          <div className="p-3 bg-orange-100 rounded-xl">
            <ShoppingCart className="h-6 w-6 text-orange-500" />
          </div>
          Sepetim ({totalItems} ürün)
        </h1>

        {cart.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Ürün Listesi */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div key={item.listingId} className="bg-white rounded-xl p-4 border border-gray-200 flex gap-4">
                  <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                    <Image src={item.image} alt={item.title} fill className="object-cover" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate">{item.title}</h3>
                    <p className="text-lg font-bold text-orange-500 mt-1">{formatPrice(item.price)}</p>
                    
                    <div className="flex items-center gap-3 mt-3">
                      <div className="flex items-center gap-2 border border-gray-200 rounded-lg">
                        <button 
                          onClick={() => updateQuantity(item.listingId, item.quantity - 1)}
                          className="p-2 hover:bg-gray-100 rounded-l-lg"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.listingId, item.quantity + 1)}
                          className="p-2 hover:bg-gray-100 rounded-r-lg"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      
                      <button 
                        onClick={() => removeFromCart(item.listingId)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                </div>
              ))}

              <button 
                onClick={clearCart}
                className="text-red-500 hover:text-red-600 text-sm font-medium flex items-center gap-2"
              >
                <Trash2 className="h-4 w-4" />
                Sepeti Temizle
              </button>
            </div>

            {/* Özet */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl p-6 border border-gray-200 sticky top-24">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Sipariş Özeti</h2>
                
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Ürünler ({totalItems})</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Kargo</span>
                    <span className="text-green-600">Ücretsiz</span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-900">Toplam</span>
                    <span className="text-2xl font-bold text-orange-500">{formatPrice(totalPrice)}</span>
                  </div>
                </div>

                <Button 
                  className="w-full gap-2 bg-orange-500 hover:bg-orange-600 text-lg py-6"
                  onClick={() => setShowCheckout(true)}
                >
                  Ödemeye Geç
                  <ArrowRight className="h-5 w-5" />
                </Button>

                <div className="mt-4 flex items-center gap-2 text-sm text-gray-500 justify-center">
                  <Package className="h-4 w-4" />
                  <span>Kapıda ödeme mevcut</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-2xl border border-gray-200">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <ShoppingCart className="h-12 w-12 text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Sepetiniz boş</h2>
            <p className="text-gray-500 mb-6 max-w-sm">
              İlanları inceleyin ve beğendiklerinizi sepete ekleyin.
            </p>
            <Link href="/">
              <Button className="bg-orange-500 hover:bg-orange-600">
                Alışverişe Başla
              </Button>
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}