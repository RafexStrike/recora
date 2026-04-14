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



