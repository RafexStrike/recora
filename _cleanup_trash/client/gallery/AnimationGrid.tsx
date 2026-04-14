import { AnimationJob } from '@/hooks/useAnimationJobs';
import AnimationCard from './AnimationCard';
import { useRouter } from 'next/navigation';

interface AnimationGridProps {
  animations: AnimationJob[];
  loading: boolean;
  onOpenInChat?: (animation: AnimationJob) => void;
}

export default function AnimationGrid({
  animations,
  loading,
  onOpenInChat,
}: AnimationGridProps) {
  const router = useRouter();

  const handleOpenInChat = (animation: AnimationJob) => {
    if (onOpenInChat) {
      onOpenInChat(animation);
    } else {
      // Default behavior: navigate to dashboard with project parameter
      router.push(`/dashboard?project=${animation.projectId}`);
    }
  };

  if (loading && animations.length === 0) {
    // Loading skeleton
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="bg-gradient-to-br from-[#1a1a1f] to-[#0f0f14] border border-white/8 rounded-xl overflow-hidden animate-pulse"
          >
            <div className="w-full aspect-video bg-white/5" />
            <div className="p-4 space-y-3">
              <div className="h-3 bg-white/5 rounded w-3/4" />
              <div className="h-3 bg-white/5 rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (animations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4">
        <div className="w-16 h-16 rounded-full bg-[#7C3AED]/10 flex items-center justify-center mb-4">
          <svg
            className="w-8 h-8 text-[#7C3AED]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M7 4v16m10-16v16M4 7h16M4 17h16"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">No animations yet</h3>
        <p className="text-sm text-gray-400 text-center max-w-sm">
          Create your first animation on the dashboard to see it here.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
      {animations.map((animation) => (
        <AnimationCard
          key={animation.id}
          animation={animation}
          onOpenInChat={handleOpenInChat}
        />
      ))}
    </div>
  );
}
