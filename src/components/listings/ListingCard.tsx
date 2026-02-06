// src/components/listings/ListingCard.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, Clock, Package, AlertCircle } from 'lucide-react';
import { Listing } from '@/src/types';
import { Badge } from '@/src/components/ui/Badge';
import { formatPrice, formatRelativeTime, cn } from '@/src/lib/utils';
import { useState } from 'react';
import { useFavoritesContext } from '@/src/context/FavoritesContext';

interface ListingCardProps {
  listing: Listing;
}

export function ListingCard({ listing }: ListingCardProps) {
  const { isFavorite, toggleFavorite } = useFavoritesContext();
  const [imageError, setImageError] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const favorite = isFavorite(listing.id);
  
  // Stok durumu kontrolü
  const isLowStock = listing.stock <= 3 && listing.stock > 0;
  const isOutOfStock = listing.stock === 0;

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(listing.id);
  };

  return (
    <Link href={`/listing/${listing.id}`}>
      <div 
        className={cn(
          "h-full flex flex-col bg-white rounded-xl overflow-hidden border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer",
          isOutOfStock ? "border-gray-200 opacity-75" : "border-gray-200 hover:border-orange-200"
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <Image
            src={imageError ? '/images/placeholder.jpg' : listing.images[0]}
            alt={listing.title}
            fill
            className="object-cover"
            style={{ 
              transform: isHovered ? 'scale(1.1)' : 'scale(1)',
              transition: 'transform 0.5s ease'
            }}
            onError={() => setImageError(true)}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Stok Durumu Badge'i */}
          {isOutOfStock && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <span className="bg-red-500 text-white px-4 py-2 rounded-lg font-bold text-lg transform -rotate-12">
                TÜKENDİ
              </span>
            </div>
          )}
          
          {isLowStock && !isOutOfStock && (
            <div className="absolute top-3 left-3">
              <Badge variant="warning" className="text-xs font-bold px-3 py-1 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                Son {listing.stock} adet
              </Badge>
            </div>
          )}

          {/* Favori Butonu */}
          {!isOutOfStock && (
            <>
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{ 
                  background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%, transparent 100%)',
                  opacity: isHovered ? 1 : 0,
                  transition: 'opacity 0.3s ease'
                }}
              />

              <button
                onClick={handleToggleFavorite}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: isHovered ? 'translate(-50%, -50%) scale(1)' : 'translate(-50%, -50%) scale(0.5)',
                  opacity: isHovered ? 1 : 0,
                  transition: 'all 0.3s ease'
                }}
                className={cn(
                  "flex items-center justify-center w-16 h-16 rounded-full",
                  favorite ? "bg-red-500 text-white" : "bg-white text-gray-600"
                )}
              >
                <Heart 
                  className={cn(
                    "h-8 w-8 transition-all duration-200",
                    favorite && "fill-current"
                  )} 
                />
              </button>

              {!isHovered && favorite && (
                <div 
                  className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full"
                  style={{ boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                >
                  <Heart className="h-4 w-4 fill-current" />
                </div>
              )}
            </>
          )}

          {/* Durum Badge'i */}
          {listing.status !== 'active' && !isOutOfStock && (
            <div className="absolute top-3 left-3">
              <Badge 
                variant={listing.status === 'sold' ? 'danger' : 'warning'}
                className="text-xs font-bold px-3 py-1"
              >
                {listing.status === 'sold' ? 'SATILDI' : 'REZERVE'}
              </Badge>
            </div>
          )}

          {/* Tarih Bilgisi */}
          {!isOutOfStock && (
            <div 
              className="absolute bottom-0 left-0 right-0 p-4 text-white"
              style={{
                transform: isHovered ? 'translateY(0)' : 'translateY(100%)',
                transition: 'transform 0.3s ease'
              }}
            >
              <div className="flex items-center gap-2 text-sm font-medium">
                <Clock className="h-4 w-4" />
                <span>{formatRelativeTime(listing.createdAt)}</span>
              </div>
            </div>
          )}
        </div>

        <div className="flex-1 p-4 flex flex-col">
          <h3 className={cn(
            "font-semibold mb-2 line-clamp-2",
            isOutOfStock ? "text-gray-400" : "text-gray-900"
          )}>
            {listing.title}
          </h3>

          <div className="mt-auto">
            <p className={cn(
              "text-2xl font-bold",
              isOutOfStock ? "text-gray-400" : "text-gray-900"
            )}>
              {isOutOfStock ? 'Satışta Değil' : formatPrice(listing.price)}
            </p>
            
            {/* Sadece Stok Bilgisi - Konum Yok */}
            <div className="flex items-center gap-2 mt-2">
              <Package className={cn(
                "h-4 w-4",
                isLowStock ? "text-orange-500" : "text-gray-400",
                isOutOfStock && "text-gray-300"
              )} />
              <span className={cn(
                "text-sm",
                isLowStock ? "text-orange-600 font-medium" : "text-gray-500",
                isOutOfStock && "text-gray-400"
              )}>
                {isOutOfStock 
                  ? 'Stokta yok' 
                  : isLowStock 
                    ? `Sadece ${listing.stock} adet kaldı` 
                    : `${listing.stock} adet stokta`
                }
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}