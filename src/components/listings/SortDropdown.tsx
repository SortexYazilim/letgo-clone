// src/components/listings/SortDropdown.tsx
'use client';

import { SortOption } from '@/src/hooks/useFilters';
import { cn } from '@/src/lib/utils';
import { ChevronDown, ArrowUpDown, Clock, TrendingUp, ArrowUp, ArrowDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const sortOptions: { value: SortOption; label: string; icon: React.ReactNode }[] = [
  { value: 'newest', label: 'En Yeni', icon: <Clock className="h-4 w-4" /> },
  { value: 'popular', label: 'En Popüler', icon: <TrendingUp className="h-4 w-4" /> },
  { value: 'price-asc', label: 'Fiyat: Düşükten Yükseğe', icon: <ArrowUp className="h-4 w-4" /> },
  { value: 'price-desc', label: 'Fiyat: Yüksekten Düşüğe', icon: <ArrowDown className="h-4 w-4" /> },
];

interface SortDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export function SortDropdown({ value, onChange }: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = sortOptions.find((opt) => opt.value === value);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-all",
          isOpen
            ? "border-orange-500 text-orange-500 bg-orange-50"
            : "border-gray-300 text-gray-700 hover:border-gray-400 bg-white"
        )}
      >
        <ArrowUpDown className="h-4 w-4" />
        <span className="hidden sm:inline">{selectedOption?.label}</span>
        <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors",
                value === option.value
                  ? "bg-orange-50 text-orange-600 font-medium"
                  : "text-gray-700 hover:bg-gray-50"
              )}
            >
              {option.icon}
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}