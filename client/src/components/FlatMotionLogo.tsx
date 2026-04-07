import { cn } from '@/lib/utils';

interface FlatMotionLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function FlatMotionLogo({ size = 'md', className }: FlatMotionLogoProps) {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-12 h-12 text-xl',
    lg: 'w-16 h-16 text-2xl',
  };

  return (
    <div
      className={cn(
        'rounded-xl bg-gradient-to-br from-[#7C3AED] to-[#06B6D4] flex items-center justify-center flex-shrink-0 font-bold text-white tracking-tight shadow-lg shadow-purple-500/20',
        sizeClasses[size],
        className,
      )}
      aria-label="FlatMotion"
    >
      F~
    </div>
  );
}
