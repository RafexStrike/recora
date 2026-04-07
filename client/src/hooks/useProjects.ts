import { useState, useEffect, useCallback } from 'react';
import { getProjects, createProject, deleteProject, updateProject } from '@/lib/api';
import { useAuth } from '@/components/AuthProvider';

export interface Project {
  id: string;
  title: string;
  description: string | null;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export function useProjects() {
  const { user, loading: authLoading } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = useCallback(async () => {
    if (!user?.id) return;
    setLoading(true);
    setError(null);
    try {
      const res = await getProjects(user.id);
      const data = res.data || [];
      setProjects(data);
      if (data.length > 0 && !selectedProjectId) {
        setSelectedProjectId(data[0].id);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to link projects');
    } finally {
      setLoading(false);
    }
  }, [user?.id, selectedProjectId]);

  useEffect(() => {
    if (!authLoading && user) {
      fetchProjects();
    }
  }, [authLoading, user, fetchProjects]);

  const addProject = async (title: string, description?: string) => {
    if (!user) return null;
    try {
      const res = await createProject({ title, description, userId: user.id });
      if (res.data) {
        setProjects(prev => [res.data, ...prev]);
        setSelectedProjectId(res.data.id);
        return res.data;
      }
    } catch (err: any) {
      throw err;
    }
  };

  const removeProject = async (id: string) => {
    try {
      await deleteProject(id);
      setProjects(prev => prev.filter(p => p.id !== id));
      if (selectedProjectId === id) {
        setSelectedProjectId(null); // Will auto-select first in fetch if we wanted
      }
    } catch (err: any) {
      throw err;
    }
  };

  const editProject = async (id: string, updates: { title?: string; description?: string }) => {
    try {
      const res = await updateProject(id, updates);
      if (res.data) {
        setProjects(prev => prev.map(p => p.id === id ? res.data : p));
        return res.data;
      }
    } catch (err: any) {
      throw err;
    }
  };

  return {
    projects,
    selectedProjectId,
    setSelectedProjectId,
    loading,
    error,
    addProject,
    removeProject,
    editProject,
    refreshProjects: fetchProjects
  };
}
