'use client';

import { useAuth } from '@/components/AuthProvider';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAllUserAnimations } from '@/hooks/useAllUserAnimations';
import ProjectSidebar from '@/components/ai/ProjectSidebar';
import AnimationGrid from '@/components/gallery/AnimationGrid';
import { useProjects } from '@/hooks/useProjects';

export default function GalleryPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { animations, loading: animationsLoading } = useAllUserAnimations();

  // Get projects for sidebar
  const {
    projects,
    selectedProjectId,
    setSelectedProjectId,
    addProject,
    removeProject
  } = useProjects();

  // Auth guard
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  if (authLoading || !user) {
    return (
      <div className="h-[calc(100vh-64px)] flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-[#7C3AED] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex h-full w-full overflow-hidden bg-gradient-to-br from-[#0a0a0d] via-[#0d0d12] to-[#0a0a0d] relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full rounded-full bg-gradient-to-br from-[#7C3AED]/5 to-transparent blur-3xl animate-pulse" />
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full rounded-full bg-gradient-to-br from-[#06B6D4]/5 to-transparent blur-3xl animate-pulse" />
      </div>

      {/* Left sidebar */}
      <ProjectSidebar
        user={user}
        projects={projects}
        selectedProjectId={selectedProjectId}
        onSelectProject={setSelectedProjectId}
        onAddProject={addProject}
        onRemoveProject={removeProject}
      />

      {/* Main panel */}
      <div className="flex flex-col flex-1 overflow-hidden w-full relative z-10">
        {/* Header */}
        <div className="flex-shrink-0 border-b border-white/10 bg-gradient-to-b from-[#0f0f12] via-[#0d0d10] to-[#0a0a0d] px-4 sm:px-6 lg:px-8 py-5 sm:py-6 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Your Animations</h1>
            <p className="text-sm text-gray-400">
              {animations.length === 0
                ? 'Create your first animation to get started'
                : `${animations.length} animation${animations.length !== 1 ? 's' : ''} in your gallery`}
            </p>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto w-full scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10 scroll-smooth">
          <div className="w-full max-w-6xl mx-auto px-4 py-6 sm:py-8">
            <AnimationGrid animations={animations} loading={animationsLoading} />
          </div>
        </div>
      </div>
    </div>
  );
}
