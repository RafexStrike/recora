import { useState, useEffect, useCallback } from 'react';

const API_KEY_STORAGE_KEY = 'apiKey';

export function useAPIKeyPersistence(): [string, (value: string) => void, () => void] {
  const [apiKey, setApiKeyState] = useState<string>('');
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const storedKey = localStorage.getItem(API_KEY_STORAGE_KEY) || '';
    setApiKeyState(storedKey);
    setIsInitialized(true);
  }, []);

  // Save to localStorage whenever apiKey changes
  const setApiKey = useCallback((value: string) => {
    setApiKeyState(value);
    if (value) {
      localStorage.setItem(API_KEY_STORAGE_KEY, value);
    } else {
      localStorage.removeItem(API_KEY_STORAGE_KEY);
    }
  }, []);

  // Clear the API key
  const clearApiKey = useCallback(() => {
    setApiKeyState('');
    localStorage.removeItem(API_KEY_STORAGE_KEY);
  }, []);

  return [apiKey, setApiKey, clearApiKey];
}
