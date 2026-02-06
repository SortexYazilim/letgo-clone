// src/lib/utils.ts
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * clsx ve tailwind-merge birleşimi
 * Örnek: cn("text-red-500", condition && "bg-blue-500", "text-red-600")
 * Sonuç: "bg-blue-500 text-red-600" (çakışan sınıfları son yazılan kazanır)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Fiyatı TL formatında gösterir
 * Örnek: formatPrice(45000) → "45.000 TL"
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
    minimumFractionDigits: 0,
  }).format(price);
}

/**
 * Tarihi "2 saat önce", "3 gün önce" formatında gösterir
 */
export function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return 'Az önce';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} dakika önce`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} saat önce`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} gün önce`;
  
  return date.toLocaleDateString('tr-TR');
}