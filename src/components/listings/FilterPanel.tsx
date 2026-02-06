// src/components/listings/FilterPanel.tsx
'use client';

import { Category } from '@/src/types';
import { Button } from '@/src/components/ui/Button';
import { cn, formatPrice } from '@/src/lib/utils';
import { 
  SlidersHorizontal, 
  X, 
  MapPin, 
  Package, 
  ChevronDown,
  Search
} from 'lucide-react';
import { useState } from 'react';

const categories: { name: Category; label: string }[] = [
  { name: 'Elektronik', label: 'Elektronik' },
  { name: 'Giyim', label: 'Giyim' },
  { name: 'Ev & Bahçe', label: 'Ev & Bahçe' },
  { name: 'Spor', label: 'Spor' },
  { name: 'Kitap', label: 'Kitap' },
  { name: 'Otomobil', label: 'Otomobil' },
  { name: 'Diğer', label: 'Diğer' },
];

const priceRanges = [
  { min: null, max: 1000, label: '0 - 1.000 TL' },
  { min: 1000, max: 5000, label: '1.000 - 5.000 TL' },
  { min: 5000, max: 10000, label: '5.000 - 10.000 TL' },
  { min: 10000, max: 50000, label: '10.000 - 50.000 TL' },
  { min: 50000, max: null, label: '50.000 TL+' },
];

interface FilterPanelProps {
  selectedCategory: Category | null;
  onSelectCategory: (category: Category | null) => void;
  minPrice: number | null;
  maxPrice: number | null;
  onPriceChange: (min: number | null, max: number | null) => void;
  location: string | null;
  onLocationChange: (location: string | null) => void;
  inStockOnly: boolean;
  onInStockChange: () => void;
  onClearFilters: () => void;
  activeFiltersCount: number;
  resultCount: number;
}

export function FilterPanel({
  selectedCategory,
  onSelectCategory,
  minPrice,
  maxPrice,
  onPriceChange,
  location,
  onLocationChange,
  inStockOnly,
  onInStockChange,
  onClearFilters,
  activeFiltersCount,
  resultCount,
}: FilterPanelProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white border-b border-gray-200">
      {/* Üst Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg border transition-all",
                isExpanded 
                  ? "border-orange-500 text-orange-500 bg-orange-50" 
                  : "border-gray-300 text-gray-700 hover:border-gray-400"
              )}
            >
              <SlidersHorizontal className="h-4 w-4" />
              <span className="font-medium">Filtreler</span>
              {activeFiltersCount > 0 && (
                <span className="bg-orange-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
              <ChevronDown className={cn("h-4 w-4 transition-transform", isExpanded && "rotate-180")} />
            </button>

            {activeFiltersCount > 0 && (
              <button
                onClick={onClearFilters}
                className="text-sm text-gray-500 hover:text-red-500 flex items-center gap-1 transition-colors"
              >
                <X className="h-4 w-4" />
                Temizle
              </button>
            )}

            <span className="text-gray-500 text-sm">
              {resultCount} sonuç bulundu
            </span>
          </div>
        </div>
      </div>

      {/* Genişletilmiş Filtreler */}
      {isExpanded && (
        <div className="border-t border-gray-200 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Kategoriler */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Kategori</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => onSelectCategory(null)}
                    className={cn(
                      "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors",
                      selectedCategory === null
                        ? "bg-orange-500 text-white"
                        : "bg-white text-gray-700 hover:bg-gray-100"
                    )}
                  >
                    Tümü
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.name}
                      onClick={() => onSelectCategory(cat.name)}
                      className={cn(
                        "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors",
                        selectedCategory === cat.name
                          ? "bg-orange-500 text-white"
                          : "bg-white text-gray-700 hover:bg-gray-100"
                      )}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Fiyat Aralığı */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Fiyat Aralığı</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => onPriceChange(null, null)}
                    className={cn(
                      "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors",
                      minPrice === null && maxPrice === null
                        ? "bg-orange-500 text-white"
                        : "bg-white text-gray-700 hover:bg-gray-100"
                    )}
                  >
                    Tüm Fiyatlar
                  </button>
                  {priceRanges.map((range, idx) => (
                    <button
                      key={idx}
                      onClick={() => onPriceChange(range.min, range.max)}
                      className={cn(
                        "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors",
                        minPrice === range.min && maxPrice === range.max
                          ? "bg-orange-500 text-white"
                          : "bg-white text-gray-700 hover:bg-gray-100"
                      )}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Konum */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Konum</h3>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Şehir ara..."
                    value={location || ''}
                    onChange={(e) => onLocationChange(e.target.value || null)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none text-sm"
                  />
                  {location && (
                    <button
                      onClick={() => onLocationChange(null)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Diğer Filtreler */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Diğer</h3>
                <label className="flex items-center gap-3 p-3 bg-white rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={onInStockChange}
                    className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                  />
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-700">Sadece stokta olanlar</span>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Aktif Filtreler */}
      {activeFiltersCount > 0 && (
        <div className="border-t border-gray-200 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm text-gray-500">Aktif Filtreler:</span>
              
              {selectedCategory && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">
                  {selectedCategory}
                  <button onClick={() => onSelectCategory(null)} className="hover:text-orange-900">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}

              {(minPrice !== null || maxPrice !== null) && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">
                  {formatPrice(minPrice || 0)} - {maxPrice ? formatPrice(maxPrice) : '∞'}
                  <button onClick={() => onPriceChange(null, null)} className="hover:text-orange-900">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}

              {location && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">
                  <MapPin className="h-3 w-3" />
                  {location}
                  <button onClick={() => onLocationChange(null)} className="hover:text-orange-900">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}

              {inStockOnly && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">
                  Stokta Var
                  <button onClick={onInStockChange} className="hover:text-orange-900">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}