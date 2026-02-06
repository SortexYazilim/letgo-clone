// src/components/ui/Card.tsx
import { cn } from '@/src/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export function Card({ children, className, hover = false, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'bg-white rounded-xl overflow-hidden',
        'border border-gray-200',
        'transition-all duration-300',
        hover && [
          'cursor-pointer',
          'hover:shadow-xl hover:shadow-gray-200/50',
          'hover:-translate-y-1',
          'hover:border-orange-200',
        ],
        className
      )}
    >
      {children}
    </div>
  );
}

// Card alt bileşenleri
Card.Header = function CardHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('p-4', className)}>{children}</div>;
};

Card.Body = function CardBody({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('p-4 pt-0', className)}>{children}</div>;
};

Card.Footer = function CardFooter({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('p-4 pt-0 mt-auto', className)}>{children}</div>;
};