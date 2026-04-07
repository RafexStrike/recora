import { useState, useEffect, useCallback, useRef } from 'react';
import { generateAnimation, getAnimationJob, getProjectAnimations, deleteAnimationJob, regenerateAnimationJob } from '@/lib/api';
import { useAuth } from '@/components/AuthProvider';

export interface AnimationJob {
  id: string;
  projectId: string;
  userId: string;
  prompt: string;
  status: 'pending' | 'processing' | 'generating_code' | 'rendering' | 'uploading' | 'done' | 'failed' | 'expired';
  provider: string;
  model: string;
  generatedCode: string | null;
  videoUrl: string | null;
  errorMessage: string | null;
  createdAt: string;
  updatedAt: string;
  expiresAt: string | null;
}

export function useAnimationJobs(projectId: string | null) {
  const { user } = useAuth();
  const [jobs, setJobs] = useState<AnimationJob[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Poll references
  const pollIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const activeJobIdsRef = useRef<Set<string>>(new Set());

  const fetchJobs = useCallback(async () => {
    if (!projectId) {
      setJobs([]);
      return;
    }
    setLoading(true);
    try {
      const res = await getProjectAnimations(projectId);
      const data = res.data || [];
      setJobs(data);
      
      // Keep track of active tasks implicitly from the DB
      const activeIds = new Set<string>();
      data.forEach((j: AnimationJob) => {
        if (!['done', 'failed', 'expired'].includes(j.status)) {
          activeIds.add(j.id);
        }
      });
      activeJobIdsRef.current = activeIds;
    } catch (err: any) {
      setError(err.message || 'Failed to fetch jobs');
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  // Poller logic
  useEffect(() => {
    const pollFn = async () => {
      if (activeJobIdsRef.current.size === 0) return;

      const updatedJobs = [...jobs];
      let changed = false;

      for (const jid of Array.from(activeJobIdsRef.current)) {
        try {
          const res = await getAnimationJob(jid);
          if (res.data) {
            const index = updatedJobs.findIndex(j => j.id === jid);
            if (index > -1) {
              if (updatedJobs[index].status !== res.data.status) {
                updatedJobs[index] = res.data;
                changed = true;
              }
              if (['done', 'failed', 'expired'].includes(res.data.status)) {
                activeJobIdsRef.current.delete(jid);
                updatedJobs[index] = res.data;
                changed = true;
              }
            }
          }
        } catch (e) {
          // ignore transient poll errors
        }
      }

      if (changed) {
        setJobs(updatedJobs);
      }
    };

    pollIntervalRef.current = setInterval(pollFn, 2000);
    return () => {
      if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
    };
  }, [jobs]); // Re-bind closure when state changes so it has fresh copy

  const generate = async (prompt: string, provider: string, model: string, apiKey?: string) => {
    if (!projectId || !user?.id) throw new Error('No project or user active');
    try {
      const res = await generateAnimation({
        prompt, projectId, userId: user.id, provider, model, apiKey
      });
      if (res.data) {
        setJobs(prev => [res.data, ...prev]);
        activeJobIdsRef.current.add(res.data.id);
        return res.data;
      }
    } catch (err: any) {
      throw err;
    }
  };

  const regenerate = async (jobId: string) => {
    try {
      const res = await regenerateAnimationJob(jobId);
      if (res.data) {
        setJobs(prev => [res.data, ...prev]); // regeneration creates a NEW pipeline job, prepend it
        activeJobIdsRef.current.add(res.data.id);
        return res.data;
      }
    } catch (err: any) {
      throw err;
    }
  };

  const removeJob = async (jobId: string) => {
    try {
      await deleteAnimationJob(jobId);
      setJobs(prev => prev.filter(j => j.id !== jobId));
      activeJobIdsRef.current.delete(jobId);
    } catch (err: any) {
      throw err;
    }
  };

  return {
    jobs,
    loading,
    error,
    generate,
    regenerate,
    removeJob,
    refreshJobs: fetchJobs
  };
}
