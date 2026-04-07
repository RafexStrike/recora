// Standardize BASE_URL: ensure it ends with /api if not present
let rawBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
if (!rawBaseUrl.endsWith('/api')) {
  rawBaseUrl = rawBaseUrl.replace(/\/$/, '') + '/api';
}
export const BASE_URL = rawBaseUrl;

export async function fetchApi(endpoint: string, options: RequestInit = {}) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  console.log(`[fetchApi] Request: ${options.method || 'GET'} ${rawBaseUrl}${endpoint}`, {
    credentials: 'include',
    hasToken: !!token
  });

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
    credentials: 'include', // Required for cross-origin cookies (auth)
  });

  console.log(`[fetchApi] Response: ${res.status} ${res.statusText}`, {
    url: res.url,
    headers: Object.fromEntries(res.headers.entries())
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(data?.message || 'Something went wrong');
  }

  return data;
}

export const loginUser = (credentials: any) => fetchApi('/auth/sign-in/email', { method: 'POST', body: JSON.stringify(credentials) });
export const registerUser = (userData: any) => fetchApi('/auth/sign-up/email', { method: 'POST', body: JSON.stringify(userData) });
export const getCurrentUser = () => fetchApi('/auth/get-session');


// AI provider endpoints
export const getAIProviders = () => fetchApi('/ai/providers');
export const getAIModels = (provider: string) => fetchApi(`/ai/models?provider=${encodeURIComponent(provider)}`);

export interface AIChatPayload {
  prompt: string;
  provider: string;
  model: string;
  apiKey: string;
  temperature?: number;
  systemPrompt?: string;
}

export const generateAIChat = (payload: AIChatPayload) =>
  fetchApi('/ai/chat', { method: 'POST', body: JSON.stringify(payload) });

// --- Project Endpoints ---
export interface CreateProjectPayload {
  title: string;
  description?: string;
  userId: string;
}

export const createProject = (payload: CreateProjectPayload) => 
  fetchApi('/projects', { method: 'POST', body: JSON.stringify(payload) });

export const getProjects = (userId: string) => 
  fetchApi(`/projects/user/${userId}`);

export const getProject = (projectId: string) => 
  fetchApi(`/projects/${projectId}`);

export const updateProject = (projectId: string, payload: { title?: string; description?: string }) => 
  fetchApi(`/projects/${projectId}`, { method: 'PATCH', body: JSON.stringify(payload) });

export const deleteProject = (projectId: string) => 
  fetchApi(`/projects/${projectId}`, { method: 'DELETE' });

// --- Animation Endpoints ---
export interface GenerateAnimationPayload {
  prompt: string;
  projectId: string;
  userId: string;
  provider: string;
  model: string;
  apiKey?: string;
}

export const generateAnimation = (payload: GenerateAnimationPayload) => 
  fetchApi('/animations/generate', { method: 'POST', body: JSON.stringify(payload) });

export const getAnimationJob = (jobId: string) =>
  fetchApi(`/animations/${jobId}`);

export const getProjectAnimations = (projectId: string) =>
  fetchApi(`/animations/project/${projectId}`);

export const getUserAnimations = (userId: string) =>
  fetchApi(`/animations/user/${userId}`);

export const deleteAnimationJob = (jobId: string) => 
  fetchApi(`/animations/${jobId}`, { method: 'DELETE' });

export const regenerateAnimationJob = (jobId: string) => 
  fetchApi(`/animations/${jobId}/regenerate`, { method: 'PATCH' });

// --- Donation / Payment Endpoints ---
export interface InitDonationPayload {
  amount: number;
  currency?: string;
  name: string;
  email: string;
  userId?: string;
}

export const initDonation = (payload: InitDonationPayload) =>
  fetchApi('/payment', { method: 'POST', body: JSON.stringify(payload) });

// --- Admin Endpoints ---
export const getAdminStats = () => fetchApi('/admin/stats');
export const getAdminUsers = () => fetchApi('/admin/users');
export const getAdminProjects = () => fetchApi('/admin/projects');
export const deleteAdminUser = (userId: string) => fetchApi(`/admin/users/${userId}`, { method: 'DELETE' });
export const deleteAdminProject = (projectId: string) => fetchApi(`/admin/projects/${projectId}`, { method: 'DELETE' });
