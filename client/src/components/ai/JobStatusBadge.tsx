import { 
  CheckCircle2, 
  CircleDashed, 
  Code2, 
  Loader2, 
  MonitorPlay, 
  AlertCircle, 
  Clock, 
  UploadCloud 
} from 'lucide-react';
import { AnimationJob } from '@/hooks/useAnimationJobs';

interface Props {
  status: AnimationJob['status'];
  className?: string;
}

export default function JobStatusBadge({ status, className = '' }: Props) {
  const config = {
    pending: {
      label: 'Queued',
      icon: Clock,
      colorClass: 'text-gray-400 bg-gray-500/10 border-gray-500/20'
    },
    processing: {
      label: 'Starting',
      icon: CircleDashed,
      colorClass: 'text-[#06B6D4] bg-[#06B6D4]/10 border-[#06B6D4]/20 animate-pulse'
    },
    generating_code: {
      label: 'Generating code',
      icon: Code2,
      colorClass: 'text-purple-400 bg-purple-500/10 border-purple-500/20'
    },
    rendering: {
      label: 'Rendering video',
      icon: MonitorPlay,
      colorClass: 'text-[#7C3AED] bg-[#7C3AED]/10 border-[#7C3AED]/20'
    },
    uploading: {
      label: 'Uploading',
      icon: UploadCloud,
      colorClass: 'text-blue-400 bg-blue-500/10 border-blue-500/20'
    },
    done: {
      label: 'Ready',
      icon: CheckCircle2,
      colorClass: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
    },
    failed: {
      label: 'Failed',
      icon: AlertCircle,
      colorClass: 'text-red-400 bg-red-500/10 border-red-500/20'
    },
    expired: {
      label: 'Expired',
      icon: AlertCircle,
      colorClass: 'text-orange-400 bg-orange-500/10 border-orange-500/20'
    }
  };

  const { label, icon: Icon, colorClass } = config[status] || config.pending;

  const isSpinning = ['processing', 'generating_code', 'rendering', 'uploading'].includes(status);

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium border rounded-full ${colorClass} ${className}`}>
      <Icon className={`w-3.5 h-3.5 ${isSpinning && status !== 'processing' ? 'animate-spin' : ''}`} />
      {label}
    </span>
  );
}
