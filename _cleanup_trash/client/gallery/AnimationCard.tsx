import { AnimationJob } from '@/hooks/useAnimationJobs';
import JobStatusBadge from '@/components/ai/JobStatusBadge';
import VideoPreview from '@/components/ai/VideoPreview';
import { Button } from '@/components/ui/button';
import { Play, ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface AnimationCardProps {
  animation: AnimationJob;
  onOpenInChat: (animation: AnimationJob) => void;
}

export default function AnimationCard({ animation, onOpenInChat }: AnimationCardProps) {
  const formattedDate = new Date(animation.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="group relative bg-gradient-to-br from-[#1a1a1f] to-[#0f0f14] border border-white/8 rounded-xl overflow-hidden shadow-lg hover:shadow-[0_0_40px_rgba(124,58,237,0.15)] transition-all duration-300 hover:border-white/15 h-full flex flex-col backdrop-blur-sm">
      {/* Video Preview Thumbnail */}
      {animation.status === 'done' && animation.videoUrl ? (
        <div className="relative w-full aspect-video bg-black overflow-hidden">
          <video
            src={animation.videoUrl}
            className="w-full h-full object-cover"
            muted
            preload="metadata"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-[#7C3AED]/80 flex items-center justify-center">
              <Play className="w-5 h-5 text-white fill-white ml-0.5" />
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full aspect-video bg-gradient-to-br from-[#0f0f14] to-[#0a0a0d] flex items-center justify-center border-b border-white/8">
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-[#7C3AED]/10 flex items-center justify-center mx-auto mb-2">
              <div className="w-8 h-8 border-2 border-[#7C3AED] border-t-transparent rounded-full animate-spin" />
            </div>
            <p className="text-xs text-gray-500 font-medium">
              {animation.status === 'failed' ? 'Generation Failed' : 'Generating...'}
            </p>
          </div>
        </div>
      )}

      {/* Card Content */}
      <div className="p-4 flex flex-col flex-1">
        {/* Status and Date */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <JobStatusBadge status={animation.status} />
          <span className="text-xs text-gray-500 flex-shrink-0">{formattedDate}</span>
        </div>

        {/* Prompt Title */}
        <p className="text-sm text-gray-100 leading-relaxed font-medium mb-4 flex-1 line-clamp-2">
          {animation.prompt}
        </p>

        {/* Model Badge */}
        <div className="mb-4">
          <span className="text-xs px-2.5 py-1 rounded-full bg-gradient-to-r from-[#7C3AED]/10 to-[#06B6D4]/10 border border-white/10 text-gray-300 font-mono inline-block truncate hover:border-white/20 transition-all">
            {animation.model}
          </span>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-3 border-t border-white/8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onOpenInChat(animation)}
            className="flex-1 text-xs text-gray-400 hover:text-white hover:bg-gradient-to-br hover:from-purple-500/20 hover:to-purple-500/10 rounded-lg transition-all duration-200"
          >
            <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
            Open in Chat
          </Button>
        </div>
      </div>
    </div>
  );
}
