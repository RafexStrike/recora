'use client';

import { useAuth } from '@/components/AuthProvider';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useProjects } from '@/hooks/useProjects';
import { useAnimationJobs } from '@/hooks/useAnimationJobs';
import { useAPIKeyPersistence } from '@/hooks/useAPIKeyPersistence';
import ProjectSidebar from '@/components/ai/ProjectSidebar';
// import ChatTopBar from '@/components/ai/ChatTopBar';
import ChatComposer from '@/components/ai/ChatComposer';
import GenerationHistory from '@/components/ai/GenerationHistory';
import EmptyState from '@/components/ai/EmptyState';
import LoadingSpinner from '@/components/LoadingSpinner';
import { FolderPlus } from 'lucide-react';
import { getAIProviders, getAIModels } from '@/lib/api';

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  // state for composer providers/models
  const [providers, setProviders] = useState<any[]>([]);
  const [models, setModels] = useState<any[]>([]);
  const [provider, setProvider] = useState<string>('');
  const [model, setModel] = useState<string>('');
  const [prompt, setPrompt] = useState<string>('');
  const [apiKey, setApiKey] = useAPIKeyPersistence();

  const [loadingProviders, setLoadingProviders] = useState(false);
  const [loadingModels, setLoadingModels] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Hook states
  const {
    projects,
    selectedProjectId,
    setSelectedProjectId,
    addProject,
    removeProject
  } = useProjects();

  const {
    jobs,
    loading: jobsLoading,
    generate,
    regenerate,
    removeJob
  } = useAnimationJobs(selectedProjectId);

  // Auth guard
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  // Fetch Providers
  useEffect(() => {
    setLoadingProviders(true);
    setError(null);
    getAIProviders()
      .then((res) => {
        const raw = res?.data ?? [];
        const options = Array.isArray(raw)
          ? raw.map((p: any) => (typeof p === 'string' ? { id: p, label: p } : p))
          : typeof raw === 'object'
          ? Object.keys(raw).map((k) => ({ id: k, label: k }))
          : [];
        setProviders(options);
        if (options.length > 0) setProvider(options[0].id);
      })
      .catch((e) => {
        console.error('Failed to fetch providers:', e);
        setError('Failed to load AI providers. Please refresh the page.');
      })
      .finally(() => setLoadingProviders(false));
  }, []);

  // Fetch Models
  useEffect(() => {
    if (!provider) { setModels([]); return; }
    setLoadingModels(true);
    setError(null);
    getAIModels(provider)
      .then((res) => {
        const raw = res?.data ?? [];
        const options = Array.isArray(raw)
          ? raw.map((m: any) => (typeof m === 'string' ? { id: m, label: m } : m))
          : [];
        setModels(options);
        if (options.length > 0) setModel(options[0].id);
      })
      .catch((e) => {
        console.error('Failed to fetch models:', e);
        setError('Failed to load available models for this provider.');
      })
      .finally(() => setLoadingModels(false));
  }, [provider]);

  // Generation Action
  const handleGenerate = async () => {
    if (!provider || !model || !prompt.trim() || !selectedProjectId) return;
    setIsGenerating(true);
    setError(null);
    try {
      await generate(prompt, provider, model, apiKey || undefined);
      setPrompt('');
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to generate animation. Please try again.';
      console.error('Generation error:', err);
      setError(errorMessage);
    } finally {
      setIsGenerating(false);
    }
  };

  if (authLoading || !user) {
    return (
      <div className="h-[calc(100vh-64px)] flex items-center justify-center">
        <LoadingSpinner size="lg" message="Loading dashboard..." />
      </div>
    );
  }

  const selectedProject = projects.find(p => p.id === selectedProjectId);

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
        <div className="p-4 flex items-center mb-2">
          <h2 className="text-xl font-medium text-white">Hey {user.name || 'User'}, welcome to Recora</h2>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="flex-shrink-0 bg-red-500/10 border border-red-500/20 px-4 py-3 m-4 rounded-lg flex items-start gap-3">
            <div className="text-red-500 font-bold flex-shrink-0">⚠️</div>
            <div className="flex-1">
              <p className="text-red-300 text-sm font-medium">{error}</p>
            </div>
            <button
              onClick={() => setError(null)}
              className="text-red-400 hover:text-red-300 flex-shrink-0 font-bold"
            >
              ✕
            </button>
          </div>
        )}

        {/* Content Area */}
        {selectedProjectId ? (
          <>
            {jobs.length === 0 && !jobsLoading ? (
              <div className="flex-1 flex items-center justify-center w-full px-4">
                <EmptyState
                  title="No Animations Yet"
                  description="Enter a prompt below to generate your first 2D animation in this project."
                  icon={FolderPlus}
                />
              </div>
            ) : (
              <GenerationHistory
                jobs={jobs}
                loading={jobsLoading}
                onDeleteJob={removeJob}
                onRegenerateJob={regenerate}
              />
            )}
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center w-full px-4">
            <EmptyState
              title="No Project Selected"
              description="Select a project from the sidebar or click 'New Project' to start generating animations."
              icon={FolderPlus}
            />
          </div>
        )}

        {/* Composer - full width at bottom */}
        {selectedProjectId && (
          <ChatComposer
            providers={providers}
            providersLoading={loadingProviders}
            models={models}
            modelsLoading={loadingModels}
            provider={provider}
            onProviderChange={setProvider}
            model={model}
            onModelChange={setModel}
            apiKey={apiKey}
            onApiKeyChange={setApiKey}
            prompt={prompt}
            onPromptChange={setPrompt}
            onGenerate={handleGenerate}
            canGenerate={Boolean(provider && model && prompt.trim() && !isGenerating)}
            loading={isGenerating}
          />
        )}
      </div>
    </div>
  );
}
