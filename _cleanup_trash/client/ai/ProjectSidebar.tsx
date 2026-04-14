// File: client/src/components/ai/ProjectSidebar.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { User, useAuth } from '@/components/AuthProvider';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Plus, ChevronRight, SquarePen, Copy, Trash2, ChevronLeft, Menu, X, Image as ImageIcon, Loader2 } from 'lucide-react';
import { Project } from '@/hooks/useProjects';
import ProjectCreateDialog from './ProjectCreateDialog';
import Link from 'next/link';

interface Props {
  user: User;
  projects: Project[];
  selectedProjectId: string | null;
  onSelectProject: (id: string) => void;
  onAddProject: (title: string, description: string) => Promise<void>;
  onRemoveProject: (id: string) => Promise<void>;
}

export default function ProjectSidebar({
  user, projects, selectedProjectId, onSelectProject, onAddProject, onRemoveProject
}: Props) {
  const { logout } = useAuth();
  const pathname = usePathname();
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [loadingProjectId, setLoadingProjectId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const userInitials = (user.name?.[0] ?? 'U').toUpperCase();
  const isGalleryPage = pathname === '/gallery';

  const handleCreateProject = async (title: string, description: string) => {
    setIsCreating(true);
    setError(null);
    try {
      await onAddProject(title, description);
    } catch (err: any) {
      const errorMessage = err?.message || 'Failed to create project. Please try again.';
      console.error('Project creation error:', err);
      setError(errorMessage);
    } finally {
      setIsCreating(false);
      setIsMobileOpen(false);
    }
  };

  const handleSelectProject = (id: string) => {
    setLoadingProjectId(id);
    setError(null);
    // Simulate brief loading state for UX
    setTimeout(() => {
      onSelectProject(id);
      setLoadingProjectId(null);
      setIsMobileOpen(false);
    }, 300);
  };

  const handleDeleteProject = async (id: string) => {
    setError(null);
    try {
      await onRemoveProject(id);
    } catch (err: any) {
      const errorMessage = err?.message || 'Failed to delete project. Please try again.';
      console.error('Project deletion error:', err);
      setError(errorMessage);
    }
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Header with Logo and Collapse Toggle */}
      <div className="flex items-center justify-between px-4 py-4 min-h-[64px] lg:min-h-auto flex-shrink-0">
        {!isCollapsed && (
          <div className="flex items-center gap-2.5 flex-1 min-w-0">
            {/* <Image
              src="/logo.png"
              alt="FlatMotion"
              width={220}
              height={55}
              className="h-8 w-auto"
            /> */}
            <span className="font-semibold ml-4 text-white text-md truncate">Projects</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="h-8 w-8 text-gray-400 hover:text-white hover:bg-white/5 transition-colors flex-shrink-0 hidden lg:flex"
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMobileOpen(false)}
          className="h-8 w-8 text-gray-400 hover:text-white hover:bg-white/5 transition-colors flex-shrink-0 lg:hidden"
          title="Close sidebar"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {!isCollapsed && <Separator className="bg-white/[0.07]" />}

      {/* Error Alert */}
      {error && !isCollapsed && (
        <div className="px-4 py-3 mx-2 my-2 rounded-lg bg-red-500/10 border border-red-500/20 text-xs">
          <p className="text-red-300 font-medium mb-2 flex items-start gap-2">
            <span className="flex-shrink-0">⚠️</span>
            <span className="flex-1">{error}</span>
          </p>
          <button
            onClick={() => setError(null)}
            className="text-red-400 hover:text-red-300 text-xs font-medium"
          >
            Dismiss
          </button>
        </div>
      )}

      {!isCollapsed && <Separator className="bg-white/[0.07]" />}

      {/* New Project Button */}
      <div className={`px-4 flex-shrink-0 ${isCollapsed ? 'py-2' : 'pt-4 pb-3'}`}>
        <ProjectCreateDialog
          open={createDialogOpen}
          onOpenChange={setCreateDialogOpen}
          onSubmit={handleCreateProject}
          loading={isCreating}
        >
          <Button
            className={`w-full bg-gradient-to-r from-[#7C3AED] to-[#5B21B6] text-white font-semibold hover:opacity-90 shadow-[0_0_20px_rgba(124,58,237,0.25)] border-none rounded-xl transition-all ${isCollapsed ? 'h-8 p-0' : 'text-sm h-10'}`}
            title={isCollapsed ? 'New Project' : ''}
          >
            {isCollapsed ? (
              <Plus className="size-4" strokeWidth={2.5} />
            ) : (
              <>
                <Plus className="mr-1 size-4" strokeWidth={2.5} />
                New Project
              </>
            )}
          </Button>
        </ProjectCreateDialog>
      </div>

      {/* Gallery Link */}
      {!isCollapsed && (
        <div className="px-4 pb-4 flex-shrink-0">
          <Link href="/gallery" className="w-full block">
            <Button
              className={`w-full justify-start px-3 py-3 text-sm transition-all rounded-lg border-none font-medium ${
                isGalleryPage
                  ? 'bg-white/[0.08] text-white hover:bg-white/[0.1]'
                  : 'text-gray-400 hover:bg-white/[0.04] hover:text-gray-200'
              }`}
            >
              <ImageIcon className="size-4 mr-2 flex-shrink-0" />
              <span>Gallery</span>
            </Button>
          </Link>
        </div>
      )}

      {/* Project list */}
      {!isCollapsed && (
        <div className="flex-1 flex flex-col min-h-0">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-500 mb-2 px-3 flex items-center justify-between flex-shrink-0">
            PROJECTS
            <ChevronRight className="size-3.5 text-gray-600" />
          </p>
          {projects.length === 0 ? (
            <p className="text-xs text-center text-gray-500 py-4 px-2 flex-shrink-0">No projects yet. Create one to start animating!</p>
          ) : (
            <ul className="flex-1 overflow-y-auto scrollbar-thin scrollbar-track-white/2 scrollbar-thumb-white/10 hover:scrollbar-thumb-white/20">
              {projects.map((p) => {
                const active = p.id === selectedProjectId;
                const isLoading = loadingProjectId === p.id;
                return (
                  <li key={p.id} className="group flex items-center flex-shrink-0">
                    <Button
                      onClick={() => handleSelectProject(p.id)}
                      disabled={isLoading}
                      variant="ghost"
                      title={p.title}
                      className={`w-full justify-start px-3 py-6 h-auto rounded-lg text-sm transition-all text-left block flex-1 ${
                        active
                          ? 'bg-white/[0.08] text-white font-medium hover:bg-white/[0.1]'
                          : 'text-gray-400 hover:bg-white/[0.04] hover:text-gray-200'
                      } ${isLoading ? 'opacity-60' : ''}`}
                    >
                      <div className="flex items-center gap-2 w-full">
                        {isLoading && <Loader2 className="size-3 animate-spin flex-shrink-0" />}
                        <div className={`flex-1 min-w-0 ${isLoading ? 'opacity-50' : ''}`}>
                          <span className="block truncate">{p.title}</span>
                          <span className="block text-[10px] text-gray-500 mt-0.5 font-normal truncate">
                            {p.description || 'No description'}
                          </span>
                        </div>
                      </div>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => { e.stopPropagation(); handleDeleteProject(p.id); }}
                      disabled={isLoading}
                      className="h-8 w-8 ml-1 opacity-0 group-hover:opacity-100 text-gray-500 hover:text-red-400 hover:bg-red-400/10 transition-all rounded-md"
                      title="Delete Project"
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}

      {!isCollapsed && (
        <>
          <Separator className="bg-white/[0.07] flex-shrink-0" />

          {/* User strip */}
          <div className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-white/5 transition-colors flex-shrink-0" onClick={logout}>
            <Avatar className="size-8 border-none bg-gradient-to-br from-[#7C3AED] to-[#06B6D4] flex-shrink-0">
              <AvatarFallback className="bg-transparent text-white text-xs font-bold">
                {userInitials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-white truncate">{user.name}</p>
              <p className="text-[10px] text-gray-500 truncate">Log out</p>
            </div>
          </div>
        </>
      )}

      {/* Collapsed state - User avatar only */}
      {isCollapsed && (
        <>
          <Separator className="bg-white/[0.07] flex-shrink-0" />
          <div className="px-4 py-3 cursor-pointer hover:bg-white/5 transition-colors flex justify-center flex-shrink-0" onClick={logout} title={user.name}>
            <Avatar className="size-8 border-none bg-gradient-to-br from-[#7C3AED] to-[#06B6D4]">
              <AvatarFallback className="bg-transparent text-white text-xs font-bold">
                {userInitials}
              </AvatarFallback>
            </Avatar>
          </div>
        </>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className={`hidden lg:flex flex-shrink-0 flex-col h-full bg-[#0d0d0f] border-r border-white/[0.07] transition-all duration-300 rounded-r-3xl ${isCollapsed ? 'w-20' : 'w-60'}`}>
        <SidebarContent />
      </aside>

      {/* Mobile toggle button */}
      <div className="lg:hidden flex-shrink-0 border-r border-white/[0.07] bg-[#0d0d0f]">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMobileOpen(true)}
          className="h-16 w-16 text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
          title="Open sidebar"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {/* Mobile drawer */}
      {isMobileOpen && (
        <>
          {/* Backdrop */}
          <div
            className="lg:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            onClick={() => setIsMobileOpen(false)}
          />
          {/* Drawer */}
          <aside className="lg:hidden fixed left-0 top-0 bottom-0 z-50 w-60 bg-[#0d0d0f] border-r border-white/[0.07] flex flex-col overflow-hidden">
            <SidebarContent />
          </aside>
        </>
      )}
    </>
  );
}


