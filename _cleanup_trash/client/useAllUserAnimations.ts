import { useState, useEffect, useCallback, useRef } from 'react';
import { getUserAnimations, getAnimationJob } from '@/lib/api';
import { useAuth } from '@/components/AuthProvider';
import { AnimationJob } from './useAnimationJobs';

export function useAllUserAnimations() {
  const { user } = useAuth();
  const [animations, setAnimations] = useState<AnimationJob[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Poll references
  const pollIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const activeJobIdsRef = useRef<Set<string>>(new Set());

  const fetchAnimations = useCallback(async () => {
    if (!user?.id) {
      setAnimations([]);
      return;
    }
    setLoading(true);
    try {
      const res = await getUserAnimations(user.id);
      const data = res.data || [];

      // Filter out expired animations
      const filtered = data.filter((a: AnimationJob) => a.status !== 'expired');
      setAnimations(filtered);

      // Keep track of active tasks
      const activeIds = new Set<string>();
      filtered.forEach((a: AnimationJob) => {
        if (!['done', 'failed', 'expired'].includes(a.status)) {
          activeIds.add(a.id);
        }
      });
      activeJobIdsRef.current = activeIds;
    } catch (err: any) {
      setError(err.message || 'Failed to fetch animations');
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    fetchAnimations();
  }, [fetchAnimations]);

  // Poller logic - similar to useAnimationJobs
  useEffect(() => {
    const pollFn = async () => {
      if (activeJobIdsRef.current.size === 0) return;

      const updatedAnimations = [...animations];
      let changed = false;

      for (const jobId of Array.from(activeJobIdsRef.current)) {
        try {
          const res = await getAnimationJob(jobId);
          if (res.data) {
            const index = updatedAnimations.findIndex(a => a.id === jobId);
            if (index > -1) {
              if (updatedAnimations[index].status !== res.data.status) {
                updatedAnimations[index] = res.data;
                changed = true;
              }
              if (['done', 'failed', 'expired'].includes(res.data.status)) {
                activeJobIdsRef.current.delete(jobId);
                updatedAnimations[index] = res.data;
                changed = true;
              }
            }
          }
        } catch (e) {
          // ignore transient poll errors
        }
      }

      if (changed) {
        setAnimations(updatedAnimations);
      }
    };

    pollIntervalRef.current = setInterval(pollFn, 2000);
    return () => {
      if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
    };
  }, [animations]);

  return {
    animations,
    loading,
    error,
    refreshAnimations: fetchAnimations
  };
}
