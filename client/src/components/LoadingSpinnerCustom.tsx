import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'dots' | 'ring' | 'pulse';
  label?: string;
  className?: string;
}

export default function LoadingSpinner({
  size = 'md',
  variant = 'ring',
  label = 'Loading',
  className,
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
  };

  const dotSizeClasses = {
    sm: 'w-1.5 h-1.5',
    md: 'w-2 h-2',
    lg: 'w-3 h-3',
  };

  return (
    <div className={cn('flex flex-col items-center justify-center gap-3', className)}>
      {variant === 'ring' && (
        <div className={cn('relative', sizeClasses[size])}>
          {/* Outer rotating ring */}
          <div
            className={cn(
              'absolute inset-0 rounded-full border-2 border-transparent border-t-[#7C3AED] border-r-[#06B6D4] animate-spin',
              sizeClasses[size],
            )}
          />
          {/* Inner pulsing glow */}
          <div
            className={cn(
              'absolute inset-1 rounded-full bg-gradient-to-r from-[#7C3AED]/20 to-[#06B6D4]/20 animate-pulse',
              'shadow-lg shadow-purple-500/30',
            )}
          />
        </div>
      )}

      {variant === 'dots' && (
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={cn(
                'rounded-full bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] animate-bounce',
                dotSizeClasses[size],
              )}
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      )}

      {variant === 'pulse' && (
        <div
          className={cn(
            'rounded-full bg-gradient-to-br from-[#7C3AED] to-[#06B6D4]',
            'animate-pulse shadow-lg shadow-purple-500/40',
            sizeClasses[size],
          )}
        />
      )}

      {label && <p className="text-sm text-gray-400 font-medium">{label}</p>}
    </div>
  );
}
