// src/components/listings/CategoryFilter.tsx
'use client';

import { Category } from '@/src/types';
import { cn } from '@/src/lib/utils';
import { 
  Smartphone, 
  Shirt, 
  Home, 
  Dumbbell, 
  BookOpen, 
  Car, 
  MoreHorizontal 
} from 'lucide-react';

const categories: { name: Category; icon: React.ElementType; color: string }[] = [
  { name: 'Elektronik', icon: Smartphone, color: 'bg-blue-100 text-blue-600' },
  { name: 'Giyim', icon: Shirt, color: 'bg-pink-100 text-pink-600' },
  { name: 'Ev & Bahçe', icon: Home, color: 'bg-green-100 text-green-600' },
  { name: 'Spor', icon: Dumbbell, color: 'bg-orange-100 text-orange-600' },
  { name: 'Kitap', icon: BookOpen, color: 'bg-yellow-100 text-yellow-600' },
  { name: 'Otomobil', icon: Car, color: 'bg-purple-100 text-purple-600' },
  { name: 'Diğer', icon: MoreHorizontal, color: 'bg-gray-100 text-gray-600' },
];

interface CategoryFilterProps {
  selectedCategory: Category | null;
  onSelectCategory: (category: Category | null) => void;
}

export function CategoryFilter({ selectedCategory, onSelectCategory }: CategoryFilterProps) {
  return (
    <div className="py-6 overflow-x-auto">
      {/* justify-center: Ortala | justify-end: Sağa yasla | justify-start: Sola yasla (varsayılan) */}
      <div className="flex gap-4 min-w-max px-4 sm:px-6 lg:px-8 justify-center">
        
        {/* Tümü butonu */}
        <button
          onClick={() => onSelectCategory(null)}
          className={cn(
            'flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-200',
            'hover:scale-105 active:scale-95',
            selectedCategory === null
              ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
              : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
          )}
        >
          <div className={cn(
            'w-12 h-12 rounded-full flex items-center justify-center',
            selectedCategory === null ? 'bg-white/20' : 'bg-gray-100'
          )}>
            <MoreHorizontal className="h-6 w-6" />
          </div>
          <span className="text-sm font-medium whitespace-nowrap">Tümü</span>
        </button>

        {/* Kategori butonları */}
        {categories.map((category) => {
          const Icon = category.icon;
          const isSelected = selectedCategory === category.name;
          
          return (
            <button
              key={category.name}
              onClick={() => onSelectCategory(category.name)}
              className={cn(
                'flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-200',
                'hover:scale-105 active:scale-95',
                isSelected
                  ? 'bg-gray-900 text-white shadow-lg shadow-gray-900/30'
                  : 'bg-white hover:bg-gray-50 border border-gray-200'
              )}
            >
              <div className={cn(
                'w-12 h-12 rounded-full flex items-center justify-center',
                isSelected ? 'bg-white/20' : category.color
              )}>
                <Icon className="h-6 w-6" />
              </div>
              <span className={cn(
                'text-sm font-medium whitespace-nowrap',
                isSelected ? 'text-white' : 'text-gray-700'
              )}>
                {category.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}