// File: client/src/components/ai/ChatTopBar.tsx
'use client';

import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreVertical } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props {
  title?: string;
}

export default function ChatTopBar({ title = 'Bouncing Ball Test' }: Props) {
  return (
    <div className="flex items-center justify-between px-3 sm:px-4 lg:px-6 py-3 sm:py-4 border-b border-white/[0.07] bg-[#0f0f12] flex-shrink-0 w-full overflow-x-auto scrollbar-hide">
      {/* Left: title + status */}
      <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
        <h1 className="text-sm sm:text-base font-semibold text-white truncate">{title}</h1>
        <Badge
          variant="outline"
          className="gap-1.5 text-xs font-medium text-emerald-400 bg-emerald-400/10 border-emerald-400/20 rounded-full px-2.5 sm:px-3 py-1 flex-shrink-0"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="hidden xs:inline">Ready</span>
        </Badge>
      </div>

      {/* Right: action buttons */}
      <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0 ml-2">
        {['Rename', 'Export', 'Delete'].map((label) => (
          <Button
            key={label}
            variant="outline"
            size="sm"
            className="text-xs font-medium text-gray-400 hover:text-white bg-white/[0.05] hover:bg-white/[0.08] border-white/[0.08] px-2 sm:px-3 transition-all hidden sm:inline-flex"
          >
            {label}
          </Button>
        ))}

        <DropdownMenu>
          <DropdownMenuTrigger
            className={cn(
              buttonVariants({ variant: 'ghost', size: 'icon-sm' }),
              'text-gray-400 hover:text-white hover:bg-white/[0.05] h-8 w-8'
            )}
          >
            <MoreVertical className="size-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-[#1a1a1f] border-white/[0.07] text-gray-300">
            <DropdownMenuItem className="focus:bg-white/[0.05] focus:text-white text-xs">Pin Project</DropdownMenuItem>
            <DropdownMenuItem className="focus:bg-white/[0.05] focus:text-white text-xs">Duplicate</DropdownMenuItem>
            <DropdownMenuItem className="focus:bg-white/[0.05] focus:text-white text-red-400 focus:text-red-400 text-xs">Archive</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

