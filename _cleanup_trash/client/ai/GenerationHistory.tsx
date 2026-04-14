import { AnimationJob } from '@/hooks/useAnimationJobs';
import JobStatusBadge from './JobStatusBadge';
import VideoPreview from './VideoPreview';
import { Button } from '@/components/ui/button';
import { Trash2, RotateCcw, AlertTriangle } from 'lucide-react';

interface Props {
  jobs: AnimationJob[];
  onDeleteJob: (id: string) => Promise<void>;
  onRegenerateJob: (id: string) => Promise<void>;
  loading: boolean;
}

export default function GenerationHistory({ jobs, onDeleteJob, onRegenerateJob, loading }: Props) {
  if (loading && jobs.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500">
        Loading animations...
      </div>
    );
  }

  if (jobs.length === 0) {
    return null; // the EmptyState handles this on the Dashboard level
  }

  return (
    <div className="flex-1 overflow-y-auto w-full scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10 scroll-smooth">
      <div className="w-full max-w-6xl mx-auto px-4 py-6 sm:py-8 space-y-5 sm:space-y-6">
        {jobs.map((job) => (
          <div key={job.id} className="group relative bg-gradient-to-br from-[#1a1a1f] to-[#0f0f14] border border-white/8 rounded-xl sm:rounded-2xl p-5 sm:p-7 shadow-lg hover:shadow-[0_0_40px_rgba(124,58,237,0.15)] transition-all duration-300 hover:border-white/15 hover:-translate-y-0.5 w-full overflow-hidden backdrop-blur-sm">
            <div className="flex flex-col sm:flex-row items-start justify-between gap-3 sm:gap-4 mb-5">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 flex-wrap">
                  <JobStatusBadge status={job.status} />
                  <span className="text-xs text-gray-500 truncate font-medium">
                    {new Date(job.createdAt).toLocaleString()}
                  </span>
                  <span className="text-xs px-3 py-1.5 rounded-full bg-gradient-to-r from-[#7C3AED]/10 to-[#06B6D4]/10 border border-white/10 text-gray-300 font-mono truncate hover:border-white/20 transition-all">
                    {job.model}
                  </span>
                </div>
                <p className="text-sm text-gray-100 leading-relaxed font-semibold break-words">
                  "{job.prompt}"
                </p>
              </div>

              <div className="flex gap-2 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onRegenerateJob(job.id)}
                  className="h-10 w-10 text-gray-400 hover:text-white hover:bg-gradient-to-br hover:from-cyan-500/20 hover:to-cyan-500/10 rounded-lg transition-all duration-200 hover:scale-110 flex-shrink-0"
                  title="Regenerate"
                >
                  <RotateCcw className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDeleteJob(job.id)}
                  className="h-10 w-10 text-gray-400 hover:text-red-400 hover:bg-gradient-to-br hover:from-red-500/20 hover:to-red-500/10 rounded-lg transition-all duration-200 hover:scale-110 flex-shrink-0"
                  title="Delete Job"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Active indicator */}
            {!['done', 'failed', 'expired'].includes(job.status) && (
              <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden mt-4 mb-5 relative">
                <div className="h-full bg-gradient-to-r from-[#7C3AED] via-[#06B6D4] to-[#7C3AED] w-full animate-pulse opacity-75 shadow-lg shadow-[#7C3AED]/50"></div>
              </div>
            )}

            {/* Error Message */}
            {job.status === 'failed' && (
              <div className="mt-5 p-4 sm:p-5 rounded-lg sm:rounded-xl bg-gradient-to-br from-red-500/10 to-red-500/5 border border-red-500/20 mb-5 backdrop-blur-sm">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5 animate-pulse" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-red-300 leading-relaxed font-medium">
                      {job.errorMessage || "Something went wrong while creating your animation. Please try again with a different prompt."}
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                      💡 Tip: Try using simpler descriptions or rephrasing your prompt.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Expired Message */}
            {job.status === 'expired' && (
              <div className="mt-5 p-4 sm:p-5 rounded-lg bg-gradient-to-br from-orange-500/10 to-orange-500/5 border border-orange-500/20 text-sm text-orange-300 mb-5 leading-relaxed backdrop-blur-sm font-medium">
                ⏰ This video has expired and been purged from storage. Click regenerate to run the prompt again.
              </div>
            )}

            {/* Video Player */}
            {job.status === 'done' && job.videoUrl && (
              <div className="mt-5 sm:mt-6 w-full overflow-hidden">
                <VideoPreview
                  url={job.videoUrl}
                  className="max-w-2xl"
                  onRegenerate={() => onRegenerateJob(job.id)}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
