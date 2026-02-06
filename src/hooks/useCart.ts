// src/hooks/useCart.ts
'use client';

import { useState, useEffect, useCallback } from 'react';

export interface CartItem {
  listingId: string;
  quantity: number;
  price: number;
  title: string;
  image: string;
  stock: number; // Ürünün maksimum stok bilgisi
}

const STORAGE_KEY = 'letgo-cart';

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          setCart(JSON.parse(stored));
        } catch (e) {
          console.error('Cart parse error:', e);
        }
      }
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    }
  }, [cart, isLoaded]);

  const addToCart = useCallback((item: Omit<CartItem, 'quantity'>, quantity: number = 1) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.listingId === item.listingId);
      
      if (existing) {
        const newQuantity = Math.min(existing.quantity + quantity, item.stock);
        
        if (existing.quantity >= item.stock) {
          alert(`Bu üründen en fazla ${item.stock} adet ekleyebilirsiniz!`);
          return prev;
        }
        
        if (existing.quantity + quantity > item.stock) {
          alert(`Stok limiti ${item.stock} adet! Mevcut sepet: ${existing.quantity}, eklenecek: ${newQuantity - existing.quantity}`);
        }
        
        return prev.map((i) =>
          i.listingId === item.listingId
            ? { ...i, quantity: newQuantity }
            : i
        );
      }
      
      const finalQuantity = Math.min(quantity, item.stock);
      if (quantity > item.stock) {
        alert(`Bu üründen en fazla ${item.stock} adet ekleyebilirsiniz!`);
      }
      
      return [...prev, { ...item, quantity: finalQuantity }];
    });
  }, []);

  const removeFromCart = useCallback((listingId: string) => {
    setCart((prev) => prev.filter((i) => i.listingId !== listingId));
  }, []);

  const updateQuantity = useCallback((listingId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(listingId);
      return;
    }
    
    setCart((prev) => {
      const item = prev.find((i) => i.listingId === listingId);
      if (!item) return prev;
      
      const finalQuantity = Math.min(quantity, item.stock);
      
      return prev.map((i) => 
        i.listingId === listingId 
          ? { ...i, quantity: finalQuantity } 
          : i
      );
    });
  }, [removeFromCart]);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const isInCart = useCallback((listingId: string) => {
    return cart.some((i) => i.listingId === listingId);
  }, [cart]);

  const getCartQuantity = useCallback((listingId: string) => {
    const item = cart.find((i) => i.listingId === listingId);
    return item?.quantity || 0;
  }, [cart]);

  const getItemStock = useCallback((listingId: string) => {
    const item = cart.find((i) => i.listingId === listingId);
    return item?.stock || 0;
  }, [cart]);

  return {
    cart,
    totalItems,
    totalPrice,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isInCart,
    getCartQuantity,
    getItemStock,
    isLoaded,
  };
}