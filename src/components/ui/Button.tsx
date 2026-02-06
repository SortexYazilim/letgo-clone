// src/components/ui/Button.tsx
import { cn } from '@/src/lib/utils';
import { ButtonHTMLAttributes, forwardRef } from 'react';

// Buton varyantları için tip tanımı
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          // Temel stiller - tüm butonlarda ortak
          'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200',
          'focus:outline-none focus:ring-2 focus:ring-offset-2',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          
          // Varyantlara göre renkler
          variant === 'primary' && [
            'bg-orange-500 text-white hover:bg-orange-600',
            'focus:ring-orange-500',
            'shadow-lg shadow-orange-500/30',
          ],
          variant === 'secondary' && [
            'bg-gray-900 text-white hover:bg-gray-800',
            'focus:ring-gray-900',
          ],
          variant === 'outline' && [
            'border-2 border-gray-300 bg-transparent text-gray-700',
            'hover:border-orange-500 hover:text-orange-500',
            'focus:ring-orange-500',
          ],
          variant === 'ghost' && [
            'bg-transparent text-gray-600 hover:bg-gray-100',
            'focus:ring-gray-400',
          ],
          
          // Boyutlar
          size === 'sm' && 'px-3 py-1.5 text-sm',
          size === 'md' && 'px-4 py-2 text-base',
          size === 'lg' && 'px-6 py-3 text-lg',
          
          // Yükleniyor durumu
          isLoading && 'cursor-wait',
          
          className
        )}
        {...props}
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Yükleniyor...
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';