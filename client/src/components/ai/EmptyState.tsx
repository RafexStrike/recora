import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ElementType;
}

export default function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
  icon: Icon = AlertCircle
}: EmptyStateProps) {
  return (
    <div className="flex flex-1 items-center justify-center w-full px-4">
      <div className="flex flex-col items-center justify-center text-center bg-gradient-to-br from-[#1a1a1f] via-[#0f0f14] to-[#0a0a0d] border border-white/10 rounded-2xl max-w-md w-full mx-4 shadow-2xl shadow-[#7C3AED]/20 p-8 sm:p-10 backdrop-blur-md hover:border-white/20 transition-all duration-300 hover:shadow-[#7C3AED]/30">
        <div className="relative mb-6 sm:mb-8">
          <div className="absolute inset-0 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#06B6D4] opacity-10 animate-pulse"></div>
          <div className="relative flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0">
            <Icon className="w-10 h-10 sm:w-12 sm:h-12 text-[#7C3AED] animate-bounce" />
          </div>
        </div>
        <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#7C3AED] via-white to-[#06B6D4] bg-clip-text text-transparent mb-3">{title}</h3>
        <p className="text-sm sm:text-base text-gray-300 mb-8 sm:mb-10 max-w-sm leading-relaxed font-medium">
          {description}
        </p>
        {actionLabel && onAction && (
          <Button
            onClick={onAction}
            className="bg-gradient-to-r from-[#7C3AED] to-[#5B21B6] hover:from-[#7C3AED]/90 hover:to-[#5B21B6]/90 text-white shadow-[0_0_20px_rgba(124,58,237,0.4)] hover:shadow-[0_0_30px_rgba(124,58,237,0.6)] transition-all duration-300 text-sm font-semibold hover:scale-105 active:scale-95"
          >
            {actionLabel}
          </Button>
        )}
      </div>
    </div>
  );
}
